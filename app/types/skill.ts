export interface Skill {
  _id?: string;
  title: string;
  description: string;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SkillInput {
  title: string;
  description: string;
  order?: number;
}
