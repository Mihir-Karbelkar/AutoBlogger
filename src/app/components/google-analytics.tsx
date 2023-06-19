'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';
import { pageview } from '../lib/gtm';

export default function GoogleAnalytics({
  googleAnalyticsId,
}: {
  googleAnalyticsId: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      pageview(pathname);
    }
  }, [pathname, searchParams]);

  return (
    <>
      <Script
        src={'https://www.googletagmanager.com/gtag/js?id=' + googleAnalyticsId}
      ></Script>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: ` window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${googleAnalyticsId}');`,
        }}
      ></Script>
    </>
  );
}
