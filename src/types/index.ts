export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Industry' | 'Embedded Systems' | 'PCB Design' | 'IoT & AI' | 'Tutorials';
  tags: string[];
  coverImage: string;
  publishedAt: string;
  readingTime: string;
  author: string;
  status: 'published' | 'draft';
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: 'High-Speed' | 'Power Electronics' | 'Embedded & IoT' | 'Automation & AI';
  image: string;
  technologies: string[];
  specs: { label: string; value: string }[];
  features: string[];
  githubUrl?: string;
  demoUrl?: string;
  status: 'published' | 'draft';
}

export interface EngineeringTool {
  id: string;
  name: string;
  slug: string;
  category: 'Electrical' | 'PCB Design' | 'Power & Energy' | 'Signals & RF';
  description: string;
  formula: string;
  iconName: string;
  tags: string[];
}

export interface WikiEntry {
  id: string;
  slug: string;
  title: string;
  category: 'Microcontrollers' | 'Sensors & Modules' | 'ICs & Power' | 'Communication Protocols';
  summary: string;
  pinout?: { pin: string; name: string; type: string; desc: string }[];
  specifications: { key: string; val: string }[];
  content: string;
  sampleCode?: string;
  datasheetUrl?: string;
}

export interface LabExperiment {
  id: string;
  slug: string;
  title: string;
  category: 'Circuit Basics' | 'Digital Electronics' | 'Microcontroller & IoT' | 'AC Analysis';
  objective: string;
  theory: string;
  componentsNeeded: string[];
  procedure: string[];
  interactiveType: 'oscilloscope' | 'ohms-law' | 'logic-gates' | 'voltage-divider' | 'rc-filter';
}

export interface DirectoryListing {
  id: string;
  name: string;
  category: 'Electronics Companies' | 'PCB Manufacturers' | 'PCB Designers' | 'Embedded & IoT' | 'Component Distributors';
  location: string;
  city: string;
  state: string;
  country: string;
  description: string;
  specialization: string[];
  website: string;
  contactEmail?: string;
  contactPhone?: string;
  verified: boolean;
  status: 'approved' | 'pending' | 'rejected';
  submittedAt: string;
}

export interface DownloadItem {
  id: string;
  title: string;
  category: 'Study Notes' | 'Lab Manuals' | 'Datasheets' | 'Source Code' | 'GATE ECE';
  format: 'PDF' | 'ZIP' | 'HEX' | 'SCH';
  size: string;
  description: string;
  downloadUrl: string;
  license: string;
}

export interface BookRecommendation {
  id: string;
  title: string;
  author: string;
  category: 'Circuit Design' | 'Embedded Systems' | 'Semiconductor' | 'RF & High Speed';
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  coverImage: string;
  link: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  status: 'active' | 'unsubscribed';
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  submittedAt: string;
  status: 'unread' | 'read' | 'archived';
}

export interface AuditLog {
  id: string;
  action: string;
  target: string;
  timestamp: string;
  user: string;
}

