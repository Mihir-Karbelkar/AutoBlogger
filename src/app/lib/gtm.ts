export const GTM_ID = process.env.GOOGLE_ANALYTICS_ID || '';

export const pageview = (url: string) => {
  window.dataLayer.push({
    event: 'pageview',
    page: url,
  });
};
