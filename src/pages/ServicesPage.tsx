import { Seo } from '@/components/seo/Seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { Services } from '@/components/sections/Services';
import { FunnelMarquee } from '@/components/sections/FunnelMarquee';

export function ServicesPage() {
  return (
    <>
      <Seo
        title="Services"
        description="Every stage of B2B lead generation, working in sequence — targeted prospecting, multi-channel outreach, appointment setting, and campaign optimization."
        path="/services"
      />
      <PageHeader
        eyebrow="What we deliver"
        title="Every stage of your pipeline, run as one system"
        highlight="one system"
        dek="Targeted prospecting, multi-channel outreach, and qualified meetings — built and operated end to end so your funnel is never dry."
        metrics={[
          { value: '6', label: 'Core services' },
          { value: '3', label: 'Outbound channels' },
          { value: '24/7', label: 'Pipeline coverage' },
          { value: '100%', label: 'Done for you' },
        ]}
      />
      <Services />
      <FunnelMarquee reverse />
    </>
  );
}
