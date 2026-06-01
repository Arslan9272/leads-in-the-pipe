import { useRef, useState } from 'react';

import { Logo } from '@/components/icons/Logo';
import { MenuIcon } from '@/components/icons/Menu';
import { MobileMenu } from '@/components/MobileMenu';
import { useScrollDirection } from '@/hooks/useScrollDirection';
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
          <a href="#hero" aria-label="Leads In The Pipe — home">
            <Logo />
          </a>
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="rounded-full border border-border bg-bg-card/80 p-2.5 text-text-primary backdrop-blur transition-colors hover:border-accent hover:text-accent"
          >
            <MenuIcon />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} triggerRef={triggerRef} />
    </>
  );
}
