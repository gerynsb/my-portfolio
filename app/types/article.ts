export interface Article {
  _id?: string;
  title: string;
  subtitle: string;
  slug: string;
  category: string; // User inputs category name directly
  featuredImageUrl?: string;
  content: string; // Markdown content
  published?: boolean;
  views?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ArticleInput {
  title: string;
  subtitle: string;
  category: string;
  featuredImageUrl?: string;
  content: string;
  published?: boolean;
}
