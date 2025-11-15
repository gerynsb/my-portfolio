import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().optional().or(z.literal('')),
  order: z.number().int().min(0).optional(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
