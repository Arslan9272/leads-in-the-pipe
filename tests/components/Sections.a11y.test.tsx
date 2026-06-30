import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { MemoryRouter } from 'react-router-dom';

import { QualityLeads } from '@/components/sections/QualityLeads';
import { RecipeForSuccess } from '@/components/sections/RecipeForSuccess';
import { WhatWeDo } from '@/components/sections/WhatWeDo';
import { Articles } from '@/components/sections/Articles';
import { LetsTalk } from '@/components/sections/LetsTalk';

describe('Section accessibility', () => {
  it('QualityLeads has no axe violations', async () => {
    const { container } = render(<QualityLeads />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('RecipeForSuccess has no axe violations', async () => {
    const { container } = render(<RecipeForSuccess />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('WhatWeDo has no axe violations', async () => {
    const { container } = render(<WhatWeDo />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('Articles has no axe violations', async () => {
    const { container } = render(<Articles />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('LetsTalk has no axe violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <LetsTalk />
      </MemoryRouter>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
