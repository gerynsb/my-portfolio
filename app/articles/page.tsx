import { getDatabase, COLLECTIONS } from '@/app/lib/db';
import { Article } from '@/app/types/article';
import { ObjectId } from 'mongodb';
import Link from 'next/link';

export default async function ArticlesPage() {
  const db = await getDatabase();
  const articles = await db
    .collection(COLLECTIONS.ARTICLES)
    .find({ published: true })
    .sort({ publishedAt: -1 })
    .toArray() as any[];

  // Populate categories
  const articlesWithCategories = await Promise.all(
    articles.map(async (article) => {
      const category = await db
        .collection(COLLECTIONS.ARTICLE_CATEGORIES)
        .findOne({ _id: new ObjectId(article.categoryId) });
      return {
        ...article,
        categoryName: category?.name || 'Uncategorized',
      };
    })
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Articles</h1>

      {articlesWithCategories.length === 0 ? (
        <p className="text-gray-500">No articles published yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articlesWithCategories.map((article: any) => (
            <Link
              key={article._id}
              href={`/articles/${article.slug}`}
              className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {article.coverImageUrl && (
                <img
                  src={article.coverImageUrl}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <span className="text-xs text-blue-600 font-medium">
                  {article.categoryName}
                </span>
                <h2 className="text-xl font-bold mt-2 mb-2">{article.title}</h2>
                <p className="text-gray-600 line-clamp-3">{article.excerpt}</p>
                <div className="mt-4 text-sm text-gray-500">
                  {article.publishedAt && new Date(article.publishedAt).toLocaleDateString()}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
