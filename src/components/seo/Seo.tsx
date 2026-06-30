import { SITE_NAME, SITE_URL } from '@/lib/constants';

interface SeoProps {
  /** Page title without the brand suffix. */
  title: string;
  description: string;
  /** Path beginning with a slash, e.g. "/services". */
  path: string;
}

/**
 * Per-page document metadata. React 19 hoists <title>/<meta>/<link> rendered
 * anywhere in the tree into <head>, so no Helmet dependency is needed.
 */
export function Seo({ title, description, path }: SeoProps) {
  const fullTitle = `${title} — ${SITE_NAME}`;
  const canonical = `${SITE_URL}${path === '/' ? '' : path}`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </>
  );
}
