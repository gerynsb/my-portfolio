export interface Experience {
  _id?: string;
  title: string;
  company: string;
  location?: string;
  startDate: string; // YYYY-MM format or full date
  endDate?: string; // YYYY-MM format or 'Present'
  current?: boolean;
  description: string;
  skills?: string[];
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ExperienceInput {
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description: string;
  skills?: string[];
  order?: number;
}
