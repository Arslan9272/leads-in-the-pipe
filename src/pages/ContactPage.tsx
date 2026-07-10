import { Seo } from '@/components/seo/Seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { PipelineAuditForm } from '@/components/sections/PipelineAuditForm';

export function ContactPage() {
  return (
    <>
      <Seo
        title="Contact"
        description="Book a free pipeline audit. Tell us where you are and we'll reply with a short questionnaire and a calendar link."
        path="/contact"
      />
      <PageHeader
        eyebrow="Let's talk"
        title="Book your free pipeline audit"
        highlight="free pipeline audit"
        dek="No commitment. We'll review your outbound, find where pipeline is leaking, and send a short questionnaire plus a calendar link."
      />
      <PipelineAuditForm />
    </>
  );
}
