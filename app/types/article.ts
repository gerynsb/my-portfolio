export interface Article {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown content
  coverImageUrl?: string;
  categoryId: string;
  categoryName?: string; // For display purposes
  tags?: string[];
  published?: boolean;
  publishedAt?: Date;
  views?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ArticleInput {
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl?: string;
  categoryId: string;
  tags?: string[];
  published?: boolean;
}
