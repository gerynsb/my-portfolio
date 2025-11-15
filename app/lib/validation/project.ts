import { z } from 'zod';

export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().min(1, 'Description is required').max(500),
  longDescription: z.string().optional().or(z.literal('')),
  features: z.array(z.string()).optional(),
  categoryId: z.string().min(1, 'Category is required'),
  thumbnailUrl: z.string().url().optional().or(z.literal('')),
  imageUrls: z.array(z.string().url()).optional(),
  technologies: z.array(z.string()).optional(),
  githubUrl: z.string().url().optional().or(z.literal('')),
  liveUrl: z.string().url().optional().or(z.literal('')),
  featured: z.boolean().optional(),
  order: z.number().int().min(0).optional(),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
