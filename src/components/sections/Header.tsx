import { useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { Logo } from '@/components/icons/Logo';
import { MenuIcon } from '@/components/icons/Menu';
import { MobileMenu } from '@/components/MobileMenu';
import { navLinks, NAV_CTA } from '@/data/navigation';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { ROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Header() {
  const { isScrolled } = useScrollDirection();
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-colors duration-300',
          isScrolled
            ? 'border-b border-border-subtle bg-bg/80 backdrop-blur-lg'
            : 'bg-transparent',
        )}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-8 lg:px-12">
          <Link to={ROUTES.home} aria-label="Leads In The Pipe — home">
            <Logo />
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-8 lg:flex"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                end={link.href === ROUTES.home}
                className={({ isActive }) =>
                  cn(
                    'text-sm tracking-tight transition-colors hover:text-accent',
                    isActive ? 'text-accent' : 'text-text-secondary',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to={NAV_CTA.href}
              className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-bg transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:shadow-glow motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none"
            >
              {NAV_CTA.label}
            </NavLink>
          </nav>

          {/* Mobile menu trigger */}
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="rounded-full border border-border bg-bg-card/80 p-2.5 text-text-primary backdrop-blur transition-colors hover:border-accent-dim hover:text-accent lg:hidden"
          >
            <MenuIcon />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} triggerRef={triggerRef} />
    </>
  );
}
