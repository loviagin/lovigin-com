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
    {
      url: 'https://lovigin.com/portfolio',
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1,
      images: ['https://lovigin.com/favicon.ico'],
    },
    {
      url: 'https://lovigin.com/portfolio/irisprophoto',
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1,
      images: ['https://lovigin.com/favicon.ico'],
    },
    {
      url: 'https://lovigin.com/privacy-policy',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      images: ['https://lovigin.com/favicon.ico'],
    },

    {
      url: 'https://lovigin.com/terms-of-service',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      images: ['https://lovigin.com/favicon.ico'],
    },

    {
      url: 'https://lovigin.com/cookie-policy',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      images: ['https://lovigin.com/favicon.ico'],
    },
  ]
}