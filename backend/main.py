"""
Leads In The Pipe — email backend.

A tiny FastAPI service whose only job is to take a form submission from the
website and email it to the business. It does NOT store anything.

Endpoints
---------
GET  /health        -> liveness probe
POST /api/audit     -> pipeline-audit (contact page) form
POST /api/lead      -> hero email-capture form

Email delivery uses plain SMTP (stdlib) so there are no heavy dependencies.
Configure it with the environment variables documented in .env.example. If SMTP
is not configured the message is logged to stdout instead (handy for local dev).
"""

from __future__ import annotations

import logging
import os
import re
import smtplib
import ssl
from email.message import EmailMessage
from html import escape

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator

# Simple email shape check — mirrors the frontend validation and keeps the
# backend dependency-free (no email-validator / EmailStr needed).
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("leads-mailer")

# --------------------------------------------------------------------------- #
# Configuration (from environment)                                            #
# --------------------------------------------------------------------------- #

SMTP_HOST = os.getenv("SMTP_HOST", "")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
SMTP_USE_TLS = os.getenv("SMTP_USE_TLS", "true").lower() in {"1", "true", "yes"}

MAIL_FROM = os.getenv("MAIL_FROM", SMTP_USER or "no-reply@leadsinthepipe.com")
MAIL_TO = os.getenv("MAIL_TO", "umair@leadsinthepipe.com")

ALLOWED_ORIGINS = [
    o.strip()
    for o in os.getenv(
        "ALLOWED_ORIGINS",
        "http://localhost:5173,http://localhost:4173,"
        "https://leadsinthepipe.com,https://www.leadsinthepipe.com",
    ).split(",")
    if o.strip()
]

# --------------------------------------------------------------------------- #
# App                                                                         #
# --------------------------------------------------------------------------- #

app = FastAPI(title="Leads In The Pipe — Mailer", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["*"],
)


# --------------------------------------------------------------------------- #
# Schemas                                                                     #
# --------------------------------------------------------------------------- #


def _check_email(value: str) -> str:
    value = value.strip()
    if not EMAIL_RE.match(value):
        raise ValueError("Enter a valid email address.")
    return value


class AuditSubmission(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    email: str = Field(..., max_length=320)
    company: str = Field(..., min_length=1, max_length=200)
    website: str = Field("", max_length=300)
    role: str = Field("", max_length=200)
    revenue: str = Field("", max_length=100)
    meetings: str = Field("", max_length=100)
    channels: list[str] = Field(default_factory=list)
    challenge: str = Field("", max_length=4000)
    source: str = Field("pipeline-audit", max_length=100)

    _validate_email = field_validator("email")(_check_email)


class LeadSubmission(BaseModel):
    email: str = Field(..., max_length=320)
    source: str = Field("hero-form", max_length=100)

    _validate_email = field_validator("email")(_check_email)


# --------------------------------------------------------------------------- #
# Email helpers                                                               #
# --------------------------------------------------------------------------- #


def _rows(fields: list[tuple[str, str]]) -> tuple[str, str]:
    """Build (plain-text, html) bodies from a list of (label, value) pairs."""
    text_lines = []
    html_rows = []
    for label, value in fields:
        value = value or "—"
        text_lines.append(f"{label}: {value}")
        html_rows.append(
            f"<tr>"
            f'<td style="padding:6px 16px 6px 0;color:#6b7280;'
            f'font-family:Arial,sans-serif;font-size:13px;vertical-align:top;">{escape(label)}</td>'
            f'<td style="padding:6px 0;color:#111827;'
            f'font-family:Arial,sans-serif;font-size:14px;">{escape(value)}</td>'
            f"</tr>"
        )
    text = "\n".join(text_lines)
    html = (
        '<div style="background:#0a0a0a;padding:24px;">'
        '<table style="max-width:560px;margin:auto;background:#ffffff;border-radius:12px;'
        'padding:24px 28px;border-collapse:collapse;">'
        '<tr><td colspan="2" style="padding-bottom:12px;border-bottom:2px solid #5BB85F;">'
        '<span style="font-family:Arial,sans-serif;font-size:18px;font-weight:700;color:#111827;">'
        "Leads In The Pipe</span></td></tr>"
        f'<tr><td colspan="2" style="height:8px;"></td></tr>{"".join(html_rows)}'
        "</table></div>"
    )
    return text, html


def send_email(subject: str, text_body: str, html_body: str, reply_to: str | None = None) -> None:
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = MAIL_FROM
    msg["To"] = MAIL_TO
    if reply_to:
        msg["Reply-To"] = reply_to
    msg.set_content(text_body)
    msg.add_alternative(html_body, subtype="html")

    if not SMTP_HOST or (SMTP_USER and not SMTP_PASSWORD):
        # Dev fallback: SMTP not (fully) configured — just log it.
        logger.warning(
            "SMTP not configured; logging email instead.\n"
            "Subject: %s\nTo: %s\n\n%s",
            subject,
            MAIL_TO,
            text_body,
        )
        return

    try:
        if SMTP_USE_TLS:
            context = ssl.create_default_context()
            with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
                server.starttls(context=context)
                if SMTP_USER:
                    server.login(SMTP_USER, SMTP_PASSWORD)
                server.send_message(msg)
        else:
            with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT) as server:
                if SMTP_USER:
                    server.login(SMTP_USER, SMTP_PASSWORD)
                server.send_message(msg)
    except Exception as exc:  # noqa: BLE001 - surface a clean 502 to the client
        logger.exception("Failed to send email")
        raise HTTPException(status_code=502, detail="Failed to send email") from exc


# --------------------------------------------------------------------------- #
# Routes                                                                      #
# --------------------------------------------------------------------------- #


@app.get("/health")
def health() -> dict[str, bool]:
    return {"ok": True}


@app.post("/api/audit")
def submit_audit(payload: AuditSubmission) -> dict[str, bool]:
    fields = [
        ("Name", payload.name),
        ("Email", str(payload.email)),
        ("Company", payload.company),
        ("Website", payload.website),
        ("Role", payload.role),
        ("Revenue range", payload.revenue),
        ("Meetings booked now", payload.meetings),
        ("Active channels", ", ".join(payload.channels)),
        ("Primary challenge", payload.challenge),
        ("Source", payload.source),
    ]
    text_body, html_body = _rows(fields)
    send_email(
        subject=f"New pipeline audit request — {payload.company}",
        text_body=text_body,
        html_body=html_body,
        reply_to=str(payload.email),
    )
    return {"ok": True}


@app.post("/api/lead")
def submit_lead(payload: LeadSubmission) -> dict[str, bool]:
    fields = [("Email", str(payload.email)), ("Source", payload.source)]
    text_body, html_body = _rows(fields)
    send_email(
        subject=f"New lead — {payload.email}",
        text_body=text_body,
        html_body=html_body,
        reply_to=str(payload.email),
    )
    return {"ok": True}
