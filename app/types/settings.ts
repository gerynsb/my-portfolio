export interface SiteSettings {
  _id?: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl?: string;
  aboutTitle: string;
  aboutBody: string;
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
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl?: string;
  aboutTitle: string;
  aboutBody: string;
  contactEmail: string;
  contactWhatsapp?: string;
  contactGithub?: string;
  contactLinkedin?: string;
  contactInstagram?: string;
  contactFacebook?: string;
}
