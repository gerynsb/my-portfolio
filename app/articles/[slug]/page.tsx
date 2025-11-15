import { getDatabase, COLLECTIONS } from '@/app/lib/db';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import Footer from '@/app/components/layout/Footer';

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const db = await getDatabase();
  const article = await db
    .collection(COLLECTIONS.ARTICLES)
    .findOne({ slug: slug, published: true }) as any;

  if (!article) {
    notFound();
  }

  // Get previous and next articles
  const previousArticle = await db
    .collection(COLLECTIONS.ARTICLES)
    .findOne(
      { published: true, createdAt: { $lt: article.createdAt } },
      { sort: { createdAt: -1 } }
    ) as any;

  const nextArticle = await db
    .collection(COLLECTIONS.ARTICLES)
    .findOne(
      { published: true, createdAt: { $gt: article.createdAt } },
      { sort: { createdAt: 1 } }
    ) as any;

  const formattedDate = new Date(article.createdAt).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const defaultImage = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=600&fit=crop';

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col">
      {/* Featured Image */}
      <div className="relative w-full h-96 overflow-hidden">
        <img
          src={article.featuredImageUrl || defaultImage}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-4 -mt-32 relative z-10 flex-grow pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl p-8 mb-8 border border-gray-700">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">
                {article.category}
              </span>
            </div>

            {/* Title & Subtitle */}
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              {article.title}
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              {article.subtitle}
            </p>

            {/* Date */}
            <div className="flex items-center gap-4 text-gray-400">
              <time className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formattedDate}
              </time>
            </div>
          </div>

          {/* Article Content */}
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl p-8 mb-8 border border-gray-700">
            <div className="prose prose-invert prose-lg max-w-none
              prose-headings:text-white
              prose-p:text-gray-300
              prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
              prose-strong:text-white
              prose-code:text-blue-400 prose-code:bg-gray-900 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700
              prose-img:rounded-lg prose-img:border prose-img:border-gray-700
              prose-blockquote:border-blue-500 prose-blockquote:text-gray-300
              prose-ul:text-gray-300
              prose-ol:text-gray-300
              prose-li:text-gray-300">
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </div>
          </div>

          {/* Previous/Next Navigation */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Previous Article */}
            {previousArticle ? (
              <Link
                href={`/articles/${previousArticle.slug}`}
                className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition-all group"
              >
                <p className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Artikel Sebelumnya
                </p>
                <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors">
                  {previousArticle.title}
                </h3>
              </Link>
            ) : (
              <div></div>
            )}

            {/* Next Article */}
            {nextArticle && (
              <Link
                href={`/articles/${nextArticle.slug}`}
                className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition-all group text-right"
              >
                <p className="text-gray-400 text-sm mb-2 flex items-center justify-end gap-2">
                  Artikel Selanjutnya
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </p>
                <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors">
                  {nextArticle.title}
                </h3>
              </Link>
            )}
          </div>

          {/* Back to Articles */}
          <div className="text-center mb-16">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 hover:border-blue-500 hover:text-blue-400 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Kembali ke Artikel
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
}
