export interface Project {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  features?: string[]; // Project features list
  categoryId: string;
  categoryName?: string; // For display purposes
  thumbnailUrl?: string;
  imageUrls?: string[];
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProjectInput {
  title: string;
  description: string;
  longDescription?: string;
  features?: string[];
  categoryId: string;
  thumbnailUrl?: string;
  imageUrls?: string[];
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  order?: number;
}
