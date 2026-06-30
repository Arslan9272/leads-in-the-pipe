import { Seo } from '@/components/seo/Seo';
import { Hero } from '@/components/sections/Hero';
import { FunnelMarquee } from '@/components/sections/FunnelMarquee';
import { CommonSymptoms } from '@/components/sections/CommonSymptoms';
import { ToolStack } from '@/components/sections/ToolStack';
import { RecipeForSuccess } from '@/components/sections/RecipeForSuccess';
import { Faq } from '@/components/sections/Faq';
import { faqHomeItems } from '@/data/faq';

export function HomePage() {
  return (
    <>
      <Seo
        title="Quality B2B Leads, Delivered"
        description="We build outbound revenue systems that fill your pipeline with qualified meetings — ICP research, infrastructure, messaging, outreach, and CRM."
        path="/"
      />
      <Hero />
      <FunnelMarquee />
      <CommonSymptoms />
      <ToolStack />
      <RecipeForSuccess />
      <Faq items={faqHomeItems} />
    </>
  );
}
