import {
  Article,
  Project,
  EngineeringTool,
  WikiEntry,
  LabExperiment,
  DirectoryListing,
  DownloadItem,
  BookRecommendation,
  NewsletterSubscriber,
  ContactSubmission,
  AuditLog,
} from '../types';
import {
  INITIAL_ARTICLES,
  INITIAL_PROJECTS,
  INITIAL_TOOLS,
  INITIAL_WIKI,
  INITIAL_EXPERIMENTS,
  INITIAL_DIRECTORIES,
  INITIAL_DOWNLOADS,
  INITIAL_BOOKS,
} from '../data/initialData';

const STORAGE_KEYS = {
  ARTICLES: 'tcg_articles_v1',
  PROJECTS: 'tcg_projects_v1',
  TOOLS: 'tcg_tools_v1',
  WIKI: 'tcg_wiki_v1',
  EXPERIMENTS: 'tcg_experiments_v1',
  DIRECTORIES: 'tcg_directories_v1',
  DOWNLOADS: 'tcg_downloads_v1',
  BOOKS: 'tcg_books_v1',
  SUBSCRIBERS: 'tcg_subscribers_v1',
  CONTACT_MESSAGES: 'tcg_contact_messages_v1',
  AUDIT_LOGS: 'tcg_audit_logs_v1',
};

// Generic local storage helper with fallback initial seeding
function getStoredItem<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`Error reading localStorage for key ${key}:`, err);
    return defaultValue;
  }
}

function setStoredItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving to localStorage for key ${key}:`, err);
  }
}

export const StorageService = {
  // --- ARTICLES ---
  getArticles(): Article[] {
    return getStoredItem<Article[]>(STORAGE_KEYS.ARTICLES, INITIAL_ARTICLES);
  },
  getArticleBySlug(slug: string): Article | undefined {
    return this.getArticles().find(a => a.slug === slug);
  },
  saveArticle(article: Article): void {
    const articles = this.getArticles();
    const index = articles.findIndex(a => a.id === article.id);
    if (index >= 0) {
      articles[index] = article;
      this.addAuditLog('Update Article', `Updated "${article.title}"`);
    } else {
      articles.unshift(article);
      this.addAuditLog('Create Article', `Created "${article.title}"`);
    }
    setStoredItem(STORAGE_KEYS.ARTICLES, articles);
  },
  deleteArticle(id: string): void {
    const articles = this.getArticles().filter(a => a.id !== id);
    setStoredItem(STORAGE_KEYS.ARTICLES, articles);
    this.addAuditLog('Delete Article', `Deleted article ID: ${id}`);
  },

  // --- PROJECTS ---
  getProjects(): Project[] {
    return getStoredItem<Project[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  },
  getProjectBySlug(slug: string): Project | undefined {
    return this.getProjects().find(p => p.slug === slug);
  },
  saveProject(project: Project): void {
    const projects = this.getProjects();
    const index = projects.findIndex(p => p.id === project.id);
    if (index >= 0) {
      projects[index] = project;
      this.addAuditLog('Update Project', `Updated "${project.title}"`);
    } else {
      projects.unshift(project);
      this.addAuditLog('Create Project', `Created "${project.title}"`);
    }
    setStoredItem(STORAGE_KEYS.PROJECTS, projects);
  },
  deleteProject(id: string): void {
    const projects = this.getProjects().filter(p => p.id !== id);
    setStoredItem(STORAGE_KEYS.PROJECTS, projects);
    this.addAuditLog('Delete Project', `Deleted project ID: ${id}`);
  },

  // --- ENGINEERING TOOLS ---
  getTools(): EngineeringTool[] {
    return getStoredItem<EngineeringTool[]>(STORAGE_KEYS.TOOLS, INITIAL_TOOLS);
  },
  getToolBySlug(slug: string): EngineeringTool | undefined {
    return this.getTools().find(t => t.slug === slug);
  },

  // --- HARDWARE WIKI ---
  getWikiEntries(): WikiEntry[] {
    return getStoredItem<WikiEntry[]>(STORAGE_KEYS.WIKI, INITIAL_WIKI);
  },
  getWikiEntryBySlug(slug: string): WikiEntry | undefined {
    return this.getWikiEntries().find(w => w.slug === slug);
  },
  saveWikiEntry(entry: WikiEntry): void {
    const entries = this.getWikiEntries();
    const idx = entries.findIndex(e => e.id === entry.id);
    if (idx >= 0) {
      entries[idx] = entry;
      this.addAuditLog('Update Wiki', `Updated entry "${entry.title}"`);
    } else {
      entries.unshift(entry);
      this.addAuditLog('Create Wiki', `Created entry "${entry.title}"`);
    }
    setStoredItem(STORAGE_KEYS.WIKI, entries);
  },

  // --- VIRTUAL LAB EXPERIMENTS ---
  getExperiments(): LabExperiment[] {
    return getStoredItem<LabExperiment[]>(STORAGE_KEYS.EXPERIMENTS, INITIAL_EXPERIMENTS);
  },
  getExperimentBySlug(slug: string): LabExperiment | undefined {
    return this.getExperiments().find(e => e.slug === slug);
  },

  // --- DIRECTORIES & MODERATION ---
  getDirectories(): DirectoryListing[] {
    return getStoredItem<DirectoryListing[]>(STORAGE_KEYS.DIRECTORIES, INITIAL_DIRECTORIES);
  },
  getApprovedDirectories(): DirectoryListing[] {
    return this.getDirectories().filter(d => d.status === 'approved');
  },
  getPendingDirectories(): DirectoryListing[] {
    return this.getDirectories().filter(d => d.status === 'pending');
  },
  submitDirectory(listing: Omit<DirectoryListing, 'id' | 'status' | 'verified' | 'submittedAt'>): DirectoryListing {
    const directories = this.getDirectories();
    const newEntry: DirectoryListing = {
      ...listing,
      id: `dir-${Date.now()}`,
      status: 'pending', // Requires admin moderation
      verified: false,
      submittedAt: new Date().toISOString().split('T')[0],
    };
    directories.unshift(newEntry);
    setStoredItem(STORAGE_KEYS.DIRECTORIES, directories);
    return newEntry;
  },
  approveDirectory(id: string): void {
    const directories = this.getDirectories();
    const item = directories.find(d => d.id === id);
    if (item) {
      item.status = 'approved';
      item.verified = true;
      setStoredItem(STORAGE_KEYS.DIRECTORIES, directories);
      this.addAuditLog('Approve Listing', `Approved "${item.name}"`);
    }
  },
  rejectDirectory(id: string): void {
    const directories = this.getDirectories();
    const item = directories.find(d => d.id === id);
    if (item) {
      item.status = 'rejected';
      setStoredItem(STORAGE_KEYS.DIRECTORIES, directories);
      this.addAuditLog('Reject Listing', `Rejected "${item.name}"`);
    }
  },
  deleteDirectory(id: string): void {
    const directories = this.getDirectories().filter(d => d.id !== id);
    setStoredItem(STORAGE_KEYS.DIRECTORIES, directories);
    this.addAuditLog('Delete Listing', `Deleted listing ID: ${id}`);
  },

  // --- DOWNLOADS & BOOKS ---
  getDownloads(): DownloadItem[] {
    return getStoredItem<DownloadItem[]>(STORAGE_KEYS.DOWNLOADS, INITIAL_DOWNLOADS);
  },
  getBooks(): BookRecommendation[] {
    return getStoredItem<BookRecommendation[]>(STORAGE_KEYS.BOOKS, INITIAL_BOOKS);
  },

  // --- NEWSLETTER ---
  getSubscribers(): NewsletterSubscriber[] {
    return getStoredItem<NewsletterSubscriber[]>(STORAGE_KEYS.SUBSCRIBERS, [
      { id: 'sub-1', email: 'aarav.sharma@iitd.ac.in', subscribedAt: '2026-10-15', status: 'active' },
      { id: 'sub-2', email: 'priya.nair@isro.gov.in', subscribedAt: '2026-10-22', status: 'active' },
    ]);
  },
  subscribeNewsletter(email: string): { success: boolean; message: string } {
    const trimmed = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    const subscribers = this.getSubscribers();
    if (subscribers.some(s => s.email === trimmed)) {
      return { success: false, message: 'This email is already subscribed to updates.' };
    }
    subscribers.unshift({
      id: `sub-${Date.now()}`,
      email: trimmed,
      subscribedAt: new Date().toISOString().split('T')[0],
      status: 'active',
    });
    setStoredItem(STORAGE_KEYS.SUBSCRIBERS, subscribers);
    return { success: true, message: 'Thank you for subscribing! You will receive the monthly engineering newsletter.' };
  },

  // --- CONTACT SUBMISSIONS ---
  getContactMessages(): ContactSubmission[] {
    return getStoredItem<ContactSubmission[]>(STORAGE_KEYS.CONTACT_MESSAGES, [
      {
        id: 'msg-1',
        name: 'Dr. Ramesh Kumar',
        email: 'r.kumar@ti.com',
        subject: 'High-speed SerDes Bringup Collaboration',
        message: 'Interested in reviewing your FPGA PCIe Gen4 carrier schematic and SI simulation results.',
        submittedAt: '2026-11-02 14:32',
        status: 'unread',
      },
    ]);
  },
  submitContactMessage(msg: { name: string; email: string; subject?: string; message: string }): { success: boolean; message: string } {
    if (!msg.name || !msg.email || !msg.message) {
      return { success: false, message: 'Please fill out all required fields.' };
    }
    const messages = this.getContactMessages();
    messages.unshift({
      id: `msg-${Date.now()}`,
      name: msg.name.trim(),
      email: msg.email.trim(),
      subject: msg.subject?.trim() || 'General Inquiry',
      message: msg.message.trim(),
      submittedAt: new Date().toLocaleString(),
      status: 'unread',
    });
    setStoredItem(STORAGE_KEYS.CONTACT_MESSAGES, messages);
    return { success: true, message: 'Your message has been delivered to Tushar Chand Gupta.' };
  },
  markMessageRead(id: string): void {
    const messages = this.getContactMessages();
    const item = messages.find(m => m.id === id);
    if (item) {
      item.status = 'read';
      setStoredItem(STORAGE_KEYS.CONTACT_MESSAGES, messages);
    }
  },

  // --- AUDIT LOGS ---
  getAuditLogs(): AuditLog[] {
    return getStoredItem<AuditLog[]>(STORAGE_KEYS.AUDIT_LOGS, [
      { id: 'log-1', action: 'System Init', target: 'Platform Boot', timestamp: '2026-10-24 10:00:00', user: 'system' },
      { id: 'log-2', action: 'Publish Article', target: 'Top Electronics Companies in India', timestamp: '2026-10-24 11:20:00', user: 'admin' },
    ]);
  },
  addAuditLog(action: string, target: string, user = 'admin'): void {
    const logs = this.getAuditLogs();
    logs.unshift({
      id: `log-${Date.now()}`,
      action,
      target,
      timestamp: new Date().toLocaleString(),
      user,
    });
    setStoredItem(STORAGE_KEYS.AUDIT_LOGS, logs.slice(0, 100)); // retain last 100
  },
};

