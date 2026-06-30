import { Seo } from '@/components/seo/Seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { Offering } from '@/components/sections/Offering';
import { Faq } from '@/components/sections/Faq';

export function PricingPage() {
  return (
    <>
      <Seo
        title="Pricing"
        description="Three ways to work with us — Basic, Standard, and Bespoke. Plans scale with verified contact volume, channels, and dedicated support."
        path="/pricing"
      />
      <PageHeader
        eyebrow="Plans"
        title="Pricing that scales with your pipeline"
        highlight="your pipeline"
        dek="Pick the tier that matches your stage. Every plan books qualified meetings straight to your calendar — no long-term lock-in."
      />
      <Offering />
      <Faq />
    </>
  );
}
