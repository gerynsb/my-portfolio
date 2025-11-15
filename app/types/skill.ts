export interface SubSkill {
  name: string;
  rating: number; // 1-5 stars
}

export interface Skill {
  _id?: string;
  title: string; // Category name (e.g., "Frontend", "Backend")
  description: string;
  skills: SubSkill[]; // Array of sub-skills with ratings
  rating?: number; // Deprecated - kept for backward compatibility
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SkillInput {
  title: string;
  description: string;
  skills: SubSkill[];
  rating?: number;
  order?: number;
}
