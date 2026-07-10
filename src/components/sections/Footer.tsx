import { NavLink } from 'react-router-dom';

import { Container } from '@/components/ui/Container';
import { SocialIcon } from '@/components/icons/SocialIcons';
import { footerNavLinks } from '@/data/navigation';
import { socialLinks } from '@/data/social';
import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  ROUTES,
  SITE_NAME,
} from '@/lib/constants';

const legalLinks = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Cookies', href: '#' },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border-subtle bg-bg-surface pt-16 md:pt-20">
      <Container>
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <NavLink to={ROUTES.home} className="font-display text-2xl font-semibold text-text-primary">
              {SITE_NAME}
            </NavLink>
            <p className="mt-4 max-w-xs text-sm text-text-secondary">
              Built to ship pipeline. Quality B2B leads, delivered.
            </p>
            <ul className="mt-6 flex items-center gap-3">
              {socialLinks.map((s) => (
                <li key={s.platform}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-secondary transition-colors hover:border-accent-dim hover:text-accent"
                  >
                    <SocialIcon platform={s.platform} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">Sitemap</h3>
            <ul className="mt-4 space-y-2 text-sm text-text-secondary">
              {footerNavLinks.map((link) => (
                <li key={link.href}>
                  <NavLink
                    to={link.href}
                    end={link.href === ROUTES.home}
                    className="transition-colors hover:text-accent"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-text-secondary">
              <li className="text-text-muted">
                {ADDRESS_LINE_1}
                <br />
                {ADDRESS_LINE_2}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">Legal</h3>
            <ul className="mt-4 space-y-2 text-sm text-text-secondary">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition-colors hover:text-accent">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border-subtle py-8 md:flex-row md:items-center">
          <p className="font-mono text-xs text-text-muted">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-text-muted">Built to ship pipeline.</p>
        </div>
      </Container>

      {/* Oversized wordmark watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none overflow-hidden text-center"
      >
        <span className="block whitespace-nowrap font-display text-[18vw] font-semibold leading-[0.8] tracking-tightest text-text-primary/[0.03]">
          Leads In The Pipe
        </span>
      </div>
    </footer>
  );
}
