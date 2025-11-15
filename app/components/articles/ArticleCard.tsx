import Link from 'next/link';
import { Article } from '@/app/types/article';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const defaultImage = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=450&fit=crop'; // Default typewriter/article image
  
  // Truncate content to show preview
  const contentPreview = article.content.length > 150 
    ? article.content.substring(0, 150) + '...' 
    : article.content;

  // Format date
  const formattedDate = article.createdAt 
    ? new Date(article.createdAt).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : '';

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
      {/* Featured Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={article.featuredImageUrl || defaultImage}
          alt={article.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
            {article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Date */}
        <p className="text-gray-400 text-sm mb-2">{formattedDate}</p>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 hover:text-blue-400 transition-colors">
          {article.title}
        </h3>

        {/* Subtitle */}
        <p className="text-gray-300 text-sm mb-3 font-medium">
          {article.subtitle}
        </p>

        {/* Content Preview */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          {contentPreview.replace(/[#*`\[\]]/g, '')} {/* Remove markdown syntax */}
        </p>

        {/* Read More Link */}
        <Link
          href={`/articles/${article.slug}`}
          className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors group"
        >
          Lihat Selengkapnya
          <svg
            className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
