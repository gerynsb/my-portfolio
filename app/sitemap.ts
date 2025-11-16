import { getDatabase, COLLECTIONS } from '@/app/lib/db';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://deangerypasamba.site';
  const db = await getDatabase();

  // Get all published articles
  const articles = await db
    .collection(COLLECTIONS.ARTICLES)
    .find({ published: true })
    .toArray();

  const articleUrls = articles.map((article: any) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.updatedAt || article.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    ...articleUrls,
  ];
}
