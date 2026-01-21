export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  link: string;
  embedUrl?: string;
  category?: 'Web' | 'Video' | 'Design';
}

export interface Skill {
  name: string;
  level: number;
  category: 'Development' | 'Design' | 'Creative (Video Editing & Motion Graphics)' | 'Other';
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string[];
  skills?: string[];
  link?: { text: string; url: string };
  image?: string;
  logo?: string;
  color: 'cyan' | 'purple' | 'green' | 'red';
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  grade?: string;
  description?: string;
  activities?: string;
  skills?: string[];
  logo?: string;
  image?: string;
  attachmentTitle?: string;
  color: 'cyan' | 'purple' | 'green' | 'red';
}

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  link: string;
  credentialId?: string;
  skills?: string[];
}