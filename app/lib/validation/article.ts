import { z } from 'zod';

export const articleSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  subtitle: z.string().min(1, 'Subtitle is required').max(300),
  category: z.string().min(1, 'Category is required').max(100),
  featuredImageUrl: z.string().url().optional().or(z.literal('')),
  content: z.string().min(1, 'Content is required'),
  published: z.boolean().optional(),
});

export type ArticleFormData = z.infer<typeof articleSchema>;
