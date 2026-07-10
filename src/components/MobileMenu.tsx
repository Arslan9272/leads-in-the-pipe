import { useRef } from 'react';
import type { RefObject } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';

import { navLinks, NAV_CTA } from '@/data/navigation';
import { socialLinks } from '@/data/social';
import { CloseIcon } from '@/components/icons/Menu';
import { SocialIcon } from '@/components/icons/SocialIcons';
import { Logo } from '@/components/icons/Logo';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { ROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}

export function MobileMenu({ open, onClose, triggerRef }: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();

  useFocusTrap({
    active: open,
    onClose,
    containerRef: overlayRef,
    returnFocusRef: triggerRef,
  });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex flex-col bg-bg/95 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between px-4 py-5 md:px-8 lg:px-12">
            <Link to={ROUTES.home} onClick={onClose} className="focus-visible:rounded">
              <Logo />
            </Link>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="rounded-full p-2 text-text-primary hover:text-accent"
            >
              <CloseIcon />
            </button>
          </div>

          <nav
            aria-label="Primary"
            className="flex flex-1 flex-col items-center justify-center gap-6"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={prefersReduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i, duration: 0.3 }}
              >
                <NavLink
                  to={link.href}
                  end={link.href === ROUTES.home}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'font-display text-4xl font-semibold tracking-tightest transition-colors hover:text-accent md:text-6xl',
                      isActive ? 'text-accent' : 'text-text-primary',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
            <NavLink
              to={NAV_CTA.href}
              onClick={onClose}
              className="mt-4 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg transition-colors hover:bg-accent"
            >
              {NAV_CTA.label}
            </NavLink>
          </nav>

          <div className="flex items-center justify-center gap-5 pb-10">
            {socialLinks.map((s) => (
              <a
                key={s.platform}
                href={s.href}
                aria-label={s.label}
                className="rounded-full border border-border p-3 text-text-secondary transition-colors hover:border-accent-dim hover:text-accent"
              >
                <SocialIcon platform={s.platform} />
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
