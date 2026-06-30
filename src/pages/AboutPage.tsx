import { Seo } from '@/components/seo/Seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { WhatWeDo } from '@/components/sections/WhatWeDo';
import { RevenueSystems } from '@/components/sections/RevenueSystems';

export function AboutPage() {
  return (
    <>
      <Seo
        title="About"
        description="How Leads In The Pipe builds revenue systems — our process from ICP and infrastructure through messaging, outreach, optimization, and qualified meetings."
        path="/about"
      />
      <PageHeader
        eyebrow="How it works"
        title="We build revenue systems, not campaigns"
        highlight="revenue systems"
        dek="A team that delivers quality B2B leads, on time, every time — by engineering the whole pipeline instead of running disconnected campaigns."
        metrics={[
          { value: '60+', label: 'Clients served' },
          { value: '100+', label: 'Projects delivered' },
          { value: '230%', label: 'Avg pipeline growth' },
          { value: '6', label: 'Step process' },
        ]}
      />
      <WhatWeDo />
      <RevenueSystems />
    </>
  );
}
