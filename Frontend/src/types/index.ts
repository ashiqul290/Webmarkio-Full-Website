export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  category: string;
  features: string[];
  benefits: string[];
  process: { step: number; title: string; description: string }[];
  price: string;
  image: string;
}

export interface Portfolio {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  result: string;
  technologies: string[];
  image: string;
  gallery: string[];
  stats: { label: string; value: string }[];
  stackHighlights: { label: string; value: string }[];
  year: string;
  url?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  authorImage: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    facebook?: string;
    linkedin?: string;
    whatsapp?: string;
    twitter?: string;
    github?: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  video?: string;
  rating: number;
  text: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  notIncluded: string[];
  popular: boolean;
  cta: string;
  color: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  duration: string;
  problem: string;
  solution: string;
  strategy: string[];
  results: string;
  stats: { label: string; value: string; change: string }[];
  image: string;
  screenshots: string[];
  testimonial: { text: string; author: string; role: string };
}
