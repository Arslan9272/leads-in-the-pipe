# Leads In The Pipe — Email Backend

A minimal FastAPI service that receives website form submissions and emails them
to the business. **It stores nothing** — every request is turned into an email
and sent over SMTP.

## Endpoints

| Method | Path         | Used by                          |
| ------ | ------------ | -------------------------------- |
| GET    | `/health`    | liveness probe                   |
| POST   | `/api/audit` | Contact page pipeline-audit form |
| POST   | `/api/lead`  | Hero email-capture form          |

## Local development

```bash
cd backend
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env                # fill in SMTP creds (or leave SMTP_HOST blank to log)
# load env vars, then run:
set -a && source .env && set +a
uvicorn main:app --reload --port 8010
```

With `SMTP_HOST` blank, submissions are printed to the console instead of being
emailed — convenient for testing without credentials.

## Connecting the frontend

Set in the site's `.env.local`:

```
VITE_API_BASE_URL=http://localhost:8010
```

In production point it at the deployed backend URL, e.g.
`VITE_API_BASE_URL=https://api.leadsinthepipe.com`.

## Email providers

Any SMTP provider works. Common choices:

- **Microsoft 365 / Outlook**: `smtp.office365.com`, port `587`, `SMTP_USE_TLS=true`
- **Gmail / Google Workspace**: `smtp.gmail.com`, port `587` (use an App Password)
- **SendGrid**: `smtp.sendgrid.net`, port `587`, user `apikey`
- **Mailgun / Postmark / Amazon SES**: see their SMTP docs

`MAIL_TO` is where submissions are delivered; `MAIL_FROM` is the envelope sender
(must be an address your SMTP provider is allowed to send as).

## Deploy

The site itself is a static build (Vercel). This backend is a separate Python
service — deploy it anywhere that runs ASGI apps (Railway, Render, Fly.io, a VM,
etc.) with:

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```
