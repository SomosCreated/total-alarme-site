import Script from "next/script";

export function ConsentInit() {
  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document -- App Router: hoists before GTM
    <Script id="consent-init" strategy="beforeInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('consent', 'default', {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          analytics_storage: 'denied',
          wait_for_update: 500
        });
        try {
          if (localStorage.getItem('ta-consent') === 'granted') {
            gtag('consent', 'update', {
              ad_storage: 'granted', ad_user_data: 'granted',
              ad_personalization: 'granted', analytics_storage: 'granted'
            });
          }
        } catch (e) {}
      `}
    </Script>
  );
}
