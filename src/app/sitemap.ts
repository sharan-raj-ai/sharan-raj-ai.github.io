import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://sharan.voxels.in',
            lastModified: new Date('2026-02-27'),
            changeFrequency: 'monthly',
            priority: 1.0,
        },
    ]
}
