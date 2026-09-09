export const site = {
  name: 'Relay',
  description:
    'Relay collects what everyone shipped, what is blocked, and what is next into one short daily digest.',
  url: import.meta.env.VITE_SITE_URL as string | undefined,
}

export function pageMeta(title: string, description: string, path: string) {
  const url = site.url ? new URL(path, site.url).href : undefined

  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: site.name },
      { name: 'twitter:card', content: 'summary' },
      ...(url ? [{ property: 'og:url', content: url }] : []),
    ],
    links: url ? [{ rel: 'canonical', href: url }] : [],
  }
}
