import { getDatabase, COLLECTIONS } from '@/app/lib/db';
import { Article } from '@/app/types/article';
import { ObjectId } from 'mongodb';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const db = await getDatabase();
  const article = await db
    .collection(COLLECTIONS.ARTICLES)
    .findOne({ slug: slug, published: true }) as any;

  if (!article) {
    notFound();
  }

  // Get category
  const category = await db
    .collection(COLLECTIONS.ARTICLE_CATEGORIES)
    .findOne({ _id: new ObjectId(article.categoryId) });

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      {article.coverImageUrl && (
        <img
          src={article.coverImageUrl}
          alt={article.title}
          className="w-full h-96 object-cover rounded-lg mb-8"
        />
      )}

      <div className="mb-6">
        <span className="text-sm text-blue-600 font-medium">
          {category?.name || 'Uncategorized'}
        </span>
      </div>

      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

      <div className="flex items-center gap-4 text-gray-600 mb-8">
        {article.publishedAt && (
          <time>{new Date(article.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}</time>
        )}
        {article.tags && article.tags.length > 0 && (
          <div className="flex gap-2">
            {article.tags.map((tag: string, index: number) => (
              <span key={index} className="bg-gray-100 px-2 py-1 rounded text-sm">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="prose prose-lg max-w-none">
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </div>
    </article>
  );
}
