import { z } from 'zod';

export const skillSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().min(1, 'Description is required').max(500),
  order: z.number().optional(),
});

export type SkillFormData = z.infer<typeof skillSchema>;
