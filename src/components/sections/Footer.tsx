import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/icons/Logo';
import { SocialIcon } from '@/components/icons/SocialIcons';
import { footerNavLinks } from '@/data/navigation';
import { socialLinks } from '@/data/social';
import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  SITE_NAME,
} from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-surface py-16 md:py-20">
      <Container>
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-text-secondary">
              Quality B2B leads, delivered.
            </p>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-text-muted">Address</h3>
            <p className="mt-4 text-sm text-text-secondary">
              {ADDRESS_LINE_1}
              <br />
              {ADDRESS_LINE_2}
            </p>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-text-muted">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-text-secondary">
              <li>
                <a href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, '')}`} className="hover:text-accent">
                  {CONTACT_PHONE}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-accent">
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-text-muted">Sitemap</h3>
            <ul className="mt-4 space-y-2 text-sm text-text-secondary">
              {footerNavLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-accent">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-border-subtle pt-8 md:flex-row md:items-center">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <ul className="flex items-center gap-3">
            {socialLinks.map((s) => (
              <li key={s.platform}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-secondary transition-colors hover:border-accent hover:text-accent"
                >
                  <SocialIcon platform={s.platform} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
