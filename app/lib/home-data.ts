import { getDatabase, COLLECTIONS } from '@/app/lib/db';
import { SiteSettings } from '@/app/types/settings';
import { Project } from '@/app/types/project';
import { Experience } from '@/app/types/experience';

export async function getHomeData() {
  const db = await getDatabase();

  // Fetch site settings
  const settings = await db.collection(COLLECTIONS.SITE_SETTINGS).findOne({}) as SiteSettings | null;

  // Fetch featured projects with categories
  const projects = await db
    .collection(COLLECTIONS.PROJECTS)
    .find({ featured: true })
    .sort({ order: 1 })
    .toArray() as any[];

  // Get project categories
  const projectCategories = await db
    .collection(COLLECTIONS.PROJECT_CATEGORIES)
    .find({})
    .sort({ order: 1 })
    .toArray();

  // Group projects by category
  const projectsByCategory = projectCategories.map((category: any) => ({
    category,
    projects: projects.filter(p => p.categoryId === category._id?.toString()),
  })).filter((group: any) => group.projects.length > 0);

  // Fetch experiences
  const experiences = await db
    .collection(COLLECTIONS.EXPERIENCES)
    .find({})
    .sort({ order: 1, startDate: -1 })
    .limit(5)
    .toArray() as any[];

  return {
    settings: settings || {
      heroTitle: 'Welcome to My Portfolio',
      heroSubtitle: 'Full Stack Developer',
      aboutTitle: 'About Me',
      aboutBody: 'Add your about content in admin settings.',
      contactEmail: 'your@email.com',
    },
    projectsByCategory,
    experiences,
  };
}
