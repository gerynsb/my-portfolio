import { getDatabase, COLLECTIONS } from '@/app/lib/db';
import ArticleCard from '@/app/components/articles/ArticleCard';

export default async function ArticlesPage() {
  const db = await getDatabase();
  const articles = await db
    .collection(COLLECTIONS.ARTICLES)
    .find({ published: true })
    .sort({ createdAt: -1 })
    .toArray() as any[];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Articles
            </span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about web development and technology
          </p>
        </div>

        {/* Articles Grid */}
        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No articles published yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article: any) => (
              <ArticleCard key={article._id.toString()} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
