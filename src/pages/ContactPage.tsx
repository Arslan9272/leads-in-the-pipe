import { Seo } from '@/components/seo/Seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { PipelineAuditForm } from '@/components/sections/PipelineAuditForm';
import { CONTACT_EMAIL, CONTACT_PHONE } from '@/lib/constants';

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

      <section className="border-t border-border-subtle py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:flex-row sm:gap-16 md:px-8 lg:px-12">
          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">Email</h2>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-2 block text-lg text-text-primary transition-colors hover:text-accent"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">Phone</h2>
            <a
              href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, '')}`}
              className="mt-2 block text-lg text-text-primary transition-colors hover:text-accent"
            >
              {CONTACT_PHONE}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
