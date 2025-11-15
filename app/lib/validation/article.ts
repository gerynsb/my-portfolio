import { z } from 'zod';

export const articleSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  excerpt: z.string().min(1, 'Excerpt is required').max(500),
  content: z.string().min(1, 'Content is required'),
  coverImageUrl: z.string().url().optional().or(z.literal('')),
  categoryId: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional(),
});

export type ArticleFormData = z.infer<typeof articleSchema>;
