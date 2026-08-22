import { MetadataRoute } from 'next'
import { projects } from '@/lib/projects'

const baseUrl = 'https://luistls.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date()

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/agendar`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...projects.map((project) => ({
      url: `${baseUrl}/projetos/${project.slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
