---
name: component-patterns
description: Project-specific React patterns for sections, forms, animations, and accessibility on Leads In The Pipe. Read before building or refactoring a section component.
---

# Component Patterns — Leads In The Pipe

How sections are structured in this codebase. Read before adding or refactoring a section. Pair with [[frontend-design]] (visual standards) and [[accessibility-patterns]] (a11y patterns).

## Section Skeleton

Every section component in `src/components/sections/` follows this shape:

```tsx
import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';

export function ExampleSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="example"
      aria-labelledby="example-heading"
      className="py-16 md:py-24 lg:py-32"
    >
      <Container>
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            id="example-heading"
            className="font-display text-3xl tracking-tight text-text-primary md:text-5xl"
          >
            Section Heading
          </h2>
          {/* ... */}
        </motion.div>
      </Container>
    </section>
  );
}
```

### Required structural elements

- `<section id="…">` for anchor links
- `aria-labelledby` pointing at the section's `<h2>` id
- `Container` wraps inner content for max-width + horizontal padding
- Mobile-first padding (`py-16`) scaled up with `md:` / `lg:`
- Framer Motion wrapper with `whileInView` for scroll-triggered reveal

## Data, Never Magic Strings

Section copy and lists live in `src/data/*.ts`. Sections import and map.

```tsx
import { services } from '@/data/services';

{services.map((s) => (
  <Card key={s.title}>{/* render */}</Card>
))}
```

If you find yourself writing JSX with inline copy, stop and extract it.

## Animation Wiring

- **Use `useReducedMotion()` and short-circuit `initial`** when reduced motion is on (`initial={prefersReduced ? false : { ... }}`)
- **`whileInView`** with `viewport={{ once: true, margin: '-10%' }}` for scroll reveals (no re-fire flicker)
- **Stagger children** via parent variants + `staggerChildren: 0.08`
- For continuous loops (marquee, sun-star), use **CSS keyframes** (Tailwind `animate-*`) not Framer Motion

See [[animation-patterns]] for variants and details.

## Form Pattern

Use the `useFormspree` hook. Never call `fetch` directly from a section.

```tsx
import { useFormspree } from '@/hooks/useFormspree';

const { email, setEmail, isValid, isSubmitting, submit } = useFormspree();

<form onSubmit={(e) => { e.preventDefault(); void submit(); }}>
  <Input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    aria-label="Your email address"
    required
  />
  <Button type="submit" disabled={!isValid || isSubmitting}>
    {isSubmitting ? 'Sending…' : 'Get a Quote'}
  </Button>
</form>
```

Behavior when `VITE_FORMSPREE_ENDPOINT` is missing: shows a "Form setup pending" toast in dev and prod, no crash.

## Accessibility per Section

- Every section needs a single `<h2>` (only Hero has `<h1>`)
- `<section>` must have `aria-labelledby`
- Icon-only buttons need `aria-label`
- Decorative SVGs (pipe-bubble, sun-star) need `aria-hidden="true"`

See [[accessibility-patterns]] for keyboard nav, focus management, and the form a11y pattern.

## Testing Pattern

Every section gets a Vitest test in `tests/components/`. Test behavior, not implementation.

```tsx
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { ExampleSection } from '@/components/sections/ExampleSection';

describe('ExampleSection', () => {
  it('renders the heading', () => {
    render(<ExampleSection />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<ExampleSection />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
```

## When NOT to Add a Section

- The section isn't in PRD §5 → talk to the PM agent first
- The section requires a new dependency → check [[performance-budget]] and discuss with PM
- The section repeats an existing pattern → extract a sub-component into `src/components/ui/` first
