import { z } from 'zod';

export const experienceSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  company: z.string().min(1, 'Company is required').max(200),
  location: z.string().optional().or(z.literal('')),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional().or(z.literal('')),
  current: z.boolean().optional(),
  description: z.string().min(1, 'Description is required'),
  skills: z.array(z.string()).optional(),
  order: z.number().int().min(0).optional(),
});

export type ExperienceFormData = z.infer<typeof experienceSchema>;
