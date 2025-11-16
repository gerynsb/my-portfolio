import { getDatabase, COLLECTIONS } from '@/app/lib/db';
import { SiteSettings } from '@/app/types/settings';
import { Project } from '@/app/types/project';
import { Experience } from '@/app/types/experience';
import { Skill } from '@/app/types/skill';

export async function getHomeData() {
  const db = await getDatabase();

  // Fetch site settings
  const settingsData = await db.collection(COLLECTIONS.SITE_SETTINGS).findOne({}) as SiteSettings | null;

  // Serialize settings
  const settings = settingsData ? {
    ...settingsData,
    _id: settingsData._id?.toString(),
  } : {
    heroGreeting: "Hi, I'm",
    heroTitle: 'Welcome to My Portfolio',
    heroSubtitle: 'Full Stack Developer',
    aboutTitle: 'About Me',
    aboutBody: 'Add your about content in admin settings.',
    contactEmail: 'your@email.com',
  };

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
    category: {
      ...category,
      _id: category._id.toString(),
    },
    projects: projects
      .filter(p => p.categoryId === category._id?.toString())
      .map(project => ({
        ...project,
        _id: project._id.toString(),
        categoryId: project.categoryId?.toString(),
      })),
  })).filter((group: any) => group.projects.length > 0);

  // Fetch experiences
  const experiences = await db
    .collection(COLLECTIONS.EXPERIENCES)
    .find({})
    .sort({ order: 1, startDate: -1 })
    .toArray() as any[];

  // Convert MongoDB ObjectIds to strings for client components
  const serializedExperiences = experiences.map(exp => ({
    ...exp,
    _id: exp._id.toString(),
  }));

  // Fetch skills
  const skills = await db
    .collection(COLLECTIONS.SKILLS)
    .find({})
    .sort({ order: 1, createdAt: -1 })
    .toArray() as any[];

  // Convert MongoDB ObjectIds to strings for client components
  const serializedSkills = skills.map(skill => ({
    ...skill,
    _id: skill._id.toString(),
    rating: skill.rating || 3, // Default rating if not set (backward compatibility)
    skills: skill.skills || [], // Default to empty array if not set
  }));

  return {
    settings,
    profileImageUrl: settingsData?.heroImageUrl || null,
    projectsByCategory,
    experiences: serializedExperiences,
    skills: serializedSkills,
  };
}
