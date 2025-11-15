export interface Category {
  _id?: string;
  name: string;
  slug: string;
  description?: string;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoryInput {
  name: string;
  description?: string;
  order?: number;
}

export type ProjectCategory = Category;
export type ArticleCategory = Category;
