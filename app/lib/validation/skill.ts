import { z } from 'zod';

export const subSkillSchema = z.object({
  name: z.string().min(1, 'Skill name is required').max(100),
  rating: z.number().min(1).max(5),
});

export const skillSchema = z.object({
  title: z.string().min(1, 'Category title is required').max(100),
  description: z.string().max(500).optional().default(''),
  skills: z.array(subSkillSchema).min(1, 'At least one skill is required'),
  rating: z.number().min(1).max(5).optional().default(3),
  order: z.number().optional(),
});

export type SkillFormData = z.infer<typeof skillSchema>;
