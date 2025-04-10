import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://lovigin.com',
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1,
      images: ['https://lovigin.com/favicon.ico'],
    },
    {
      url: 'https://lovigin.com/contacts',
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1,
      images: ['https://lovigin.com/favicon.ico'],
    },
  ]
}