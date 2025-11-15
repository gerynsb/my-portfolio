import { z } from 'zod';

export const settingsSchema = z.object({
  heroGreeting: z.string().min(1, 'Hero greeting is required').max(50),
  heroTitle: z.string().min(1, 'Hero title is required').max(200),
  heroSubtitle: z.string().min(1, 'Hero subtitle is required').max(500),
  heroImageUrl: z.string().url().optional().or(z.literal('')),
  aboutTitle: z.string().min(1, 'About title is required').max(200),
  aboutBody: z.string().min(1, 'About body is required'),
  interests: z.array(z.string()).optional(),
  contactEmail: z.string().email('Invalid email address'),
  contactWhatsapp: z.string().optional().or(z.literal('')),
  contactGithub: z.string().url().optional().or(z.literal('')),
  contactLinkedin: z.string().url().optional().or(z.literal('')),
  contactInstagram: z.string().optional().or(z.literal('')),
  contactFacebook: z.string().url().optional().or(z.literal('')),
});

export type SettingsFormData = z.infer<typeof settingsSchema>;
