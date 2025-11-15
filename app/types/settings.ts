export interface SiteSettings {
  _id?: string;
  heroGreeting: string; // e.g., "Hi, I'm"
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl?: string;
  aboutTitle: string;
  aboutBody: string;
  interests?: string[]; // Interest & Soft Skills
  contactEmail: string;
  contactWhatsapp?: string;
  contactGithub?: string;
  contactLinkedin?: string;
  contactInstagram?: string;
  contactFacebook?: string;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface SiteSettingsInput {
  heroGreeting: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl?: string;
  aboutTitle: string;
  aboutBody: string;
  interests?: string[];
  contactEmail: string;
  contactWhatsapp?: string;
  contactGithub?: string;
  contactLinkedin?: string;
  contactInstagram?: string;
  contactFacebook?: string;
}
