import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  FolderGit2,
  Building2,
  Mail,
  Users,
  ShieldAlert,
  LogOut,
  PlusCircle,
  CheckCircle2,
  XCircle,
  Trash2,
  Edit,
  ExternalLink,
  Download,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { AuthService, AdminUser } from '../../services/authService';
import { StorageService } from '../../services/storageService';
import { Article, Project, DirectoryListing, ContactSubmission, NewsletterSubscriber, AuditLog } from '../../types';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'articles' | 'projects' | 'directories' | 'messages' | 'newsletter' | 'audit'>('overview');

  // Datasets
  const [articles, setArticles] = useState<Article[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [directories, setDirectories] = useState<DirectoryListing[]>([]);
  const [messages, setMessages] = useState<ContactSubmission[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  // Modals for editing/creating
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);

  // Authentication check
  useEffect(() => {
    if (!AuthService.isAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    setUser(AuthService.getSession());
    refreshData();
  }, [navigate]);

  const refreshData = () => {
    setArticles(StorageService.getArticles());
    setProjects(StorageService.getProjects());
    setDirectories(StorageService.getDirectories());
    setMessages(StorageService.getContactMessages());
    setSubscribers(StorageService.getSubscribers());
    setAuditLogs(StorageService.getAuditLogs());
  };

  const handleLogout = () => {
    AuthService.logout();
    navigate('/admin/login');
  };

  // --- ARTICLE OPERATIONS ---
  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle?.title || !editingArticle?.content) return;

    const slug = editingArticle.slug || editingArticle.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const toSave: Article = {
      id: editingArticle.id || `art-${Date.now()}`,
      slug,
      title: editingArticle.title,
      category: editingArticle.category || 'Industry',
      excerpt: editingArticle.excerpt || editingArticle.content.slice(0, 150) + '...',
      content: editingArticle.content,
      tags: editingArticle.tags || ['Electronics'],
      coverImage: editingArticle.coverImage || '/assets/images/project-iot.jpg',
      publishedAt: editingArticle.publishedAt || new Date().toISOString().split('T')[0],
      readingTime: editingArticle.readingTime || '5 min read',
      author: editingArticle.author || 'Tushar Chand Gupta',
      status: editingArticle.status || 'published',
    };

    StorageService.saveArticle(toSave);
    setEditingArticle(null);
    refreshData();
  };

  const handleDeleteArticle = (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      StorageService.deleteArticle(id);
      refreshData();
    }
  };

  // --- PROJECT OPERATIONS ---
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title || !editingProject?.description) return;

    const slug = editingProject.slug || editingProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const toSave: Project = {
      id: editingProject.id || `proj-${Date.now()}`,
      slug,
      title: editingProject.title,
      category: editingProject.category || 'Embedded & IoT',
      description: editingProject.description,
      image: editingProject.image || '/assets/images/hero-pcb.jpg',
      technologies: editingProject.technologies || ['C++', 'Altium'],
      specs: editingProject.specs || [{ label: 'Status', value: 'Production Ready' }],
      features: editingProject.features || ['Full schematic and layout files available.'],
      githubUrl: editingProject.githubUrl,
      demoUrl: editingProject.demoUrl,
      status: editingProject.status || 'published',
    };

    StorageService.saveProject(toSave);
    setEditingProject(null);
    refreshData();
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      StorageService.deleteProject(id);
      refreshData();
    }
  };

  // --- DIRECTORY OPERATIONS ---
  const handleApproveDirectory = (id: string) => {
    StorageService.approveDirectory(id);
    refreshData();
  };

  const handleRejectDirectory = (id: string) => {
    StorageService.rejectDirectory(id);
    refreshData();
  };

  const handleDeleteDirectory = (id: string) => {
    if (window.confirm('Delete this directory listing?')) {
      StorageService.deleteDirectory(id);
      refreshData();
    }
  };

  // --- NEWSLETTER EXPORT ---
  const exportNewsletterCsv = () => {
    const csvContent = 'data:text/csv;charset=utf-8,' + ['Email,SubscribedAt,Status', ...subscribers.map((s) => `${s.email},${s.subscribedAt},${s.status}`)].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'newsletter_subscribers.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const pendingDirectoriesCount = directories.filter((d) => d.status === 'pending').length;
  const unreadMessagesCount = messages.filter((m) => m.status === 'unread').length;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center font-bold text-sm">
            TCG
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight">Admin CMS Console</h1>
            <span className="text-[10px] text-orange-400 font-mono">
              Authenticated: {user?.email || 'admin'} ({user?.role || 'superadmin'})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            target="_blank"
            className="text-xs text-slate-300 hover:text-white flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1.5 bg-red-950/40 border border-red-800/60 px-3 py-1.5 rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 pb-4">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'overview' ? 'bg-orange-600 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('articles')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'articles' ? 'bg-orange-600 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Articles ({articles.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'projects' ? 'bg-orange-600 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Projects ({projects.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('directories')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 relative ${
              activeTab === 'directories' ? 'bg-orange-600 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Directories Moderation</span>
            {pendingDirectoriesCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-bold">
                {pendingDirectoriesCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'messages' ? 'bg-orange-600 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Contact Messages</span>
            {unreadMessagesCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-600 text-white text-[10px] flex items-center justify-center font-bold">
                {unreadMessagesCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('newsletter')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'newsletter' ? 'bg-orange-600 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Newsletter ({subscribers.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'audit' ? 'bg-orange-600 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Audit Trail</span>
          </button>
        </div>

        {/* --- TAB 1: OVERVIEW METRICS --- */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Total Articles</span>
                <div className="text-3xl font-extrabold text-slate-900 mt-1">{articles.length}</div>
                <span className="text-xs text-emerald-600 font-medium">Published on blog</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Hardware Projects</span>
                <div className="text-3xl font-extrabold text-slate-900 mt-1">{projects.length}</div>
                <span className="text-xs text-blue-600 font-medium">In portfolio</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Pending Moderation</span>
                <div className="text-3xl font-extrabold text-amber-600 mt-1">{pendingDirectoriesCount}</div>
                <span className="text-xs text-slate-500">Directory submissions</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Subscribers</span>
                <div className="text-3xl font-extrabold text-orange-600 mt-1">{subscribers.length}</div>
                <span className="text-xs text-slate-500">Active email dispatches</span>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-base font-bold text-slate-900 mb-4">Quick Management Actions</h2>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('articles');
                    setEditingArticle({ title: '', content: '', category: 'Industry', tags: ['Hardware'] });
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-600 text-white text-xs font-semibold hover:bg-orange-700"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Draft New Article</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('projects');
                    setEditingProject({ title: '', description: '', category: 'Embedded & IoT', technologies: ['STM32'] });
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add New Project</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('directories')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Review Submissions ({pendingDirectoriesCount})</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: ARTICLES CMS --- */}
        {activeTab === 'articles' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900">Articles Management</h2>
              <button
                type="button"
                onClick={() => setEditingArticle({ title: '', content: '', category: 'Industry', tags: ['Electronics'] })}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-600 text-white text-xs font-semibold rounded-xl hover:bg-orange-700"
              >
                <PlusCircle className="w-4 h-4" />
                <span>New Article</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Published Date</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {articles.map((art) => (
                    <tr key={art.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-semibold text-slate-900">{art.title}</td>
                      <td className="py-3 px-4 font-mono text-slate-500">{art.category}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          art.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {art.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500">{art.publishedAt}</td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => setEditingArticle(art)}
                          className="p-1 hover:text-orange-600"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteArticle(art.id)}
                          className="p-1 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Article Edit/Create Modal */}
            {editingArticle && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    {editingArticle.id ? 'Edit Article' : 'Draft New Article'}
                  </h3>
                  <form onSubmit={handleSaveArticle} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Title</label>
                      <input
                        type="text"
                        required
                        value={editingArticle.title || ''}
                        onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Category</label>
                        <select
                          value={editingArticle.category || 'Industry'}
                          onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value as any })}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-sm bg-white"
                        >
                          <option value="Industry">Industry</option>
                          <option value="Embedded Systems">Embedded Systems</option>
                          <option value="PCB Design">PCB Design</option>
                          <option value="Tutorials">Tutorials</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Status</label>
                        <select
                          value={editingArticle.status || 'published'}
                          onChange={(e) => setEditingArticle({ ...editingArticle, status: e.target.value as any })}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-sm bg-white"
                        >
                          <option value="published">Published</option>
                          <option value="draft">Draft</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Excerpt</label>
                      <textarea
                        rows={2}
                        value={editingArticle.excerpt || ''}
                        onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Content (Markdown Supported)</label>
                      <textarea
                        rows={8}
                        required
                        value={editingArticle.content || ''}
                        onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-mono"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingArticle(null)}
                        className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-orange-600 text-white font-semibold"
                      >
                        Save Article
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- TAB 3: PROJECTS CMS --- */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900">Projects Portfolio Management</h2>
              <button
                type="button"
                onClick={() => setEditingProject({ title: '', description: '', category: 'Embedded & IoT', technologies: ['STM32'] })}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl hover:bg-emerald-700"
              >
                <PlusCircle className="w-4 h-4" />
                <span>New Project</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Technologies</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {projects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-semibold text-slate-900">{proj.title}</td>
                      <td className="py-3 px-4 font-mono text-slate-500">{proj.category}</td>
                      <td className="py-3 px-4 text-slate-500">{proj.technologies.slice(0, 3).join(', ')}</td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => setEditingProject(proj)}
                          className="p-1 hover:text-orange-600"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-1 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Project Edit/Create Modal */}
            {editingProject && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    {editingProject.id ? 'Edit Project' : 'Create New Project'}
                  </h3>
                  <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Project Title</label>
                      <input
                        type="text"
                        required
                        value={editingProject.title || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Category</label>
                      <select
                        value={editingProject.category || 'Embedded & IoT'}
                        onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-sm bg-white"
                      >
                        <option value="Automation & AI">Automation & AI</option>
                        <option value="Embedded & IoT">Embedded & IoT</option>
                        <option value="Power Electronics">Power Electronics</option>
                        <option value="High-Speed">High-Speed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Description</label>
                      <textarea
                        rows={3}
                        required
                        value={editingProject.description || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">GitHub URL (Optional)</label>
                      <input
                        type="url"
                        value={editingProject.githubUrl || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                        placeholder="https://github.com/..."
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-sm"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingProject(null)}
                        className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-semibold"
                      >
                        Save Project
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- TAB 4: DIRECTORIES MODERATION --- */}
        {activeTab === 'directories' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-900">
              Directory Listings & Public Submissions Moderation
            </h2>

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Website</th>
                    <th className="py-3 px-4 text-right">Moderation Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {directories.map((dir) => (
                    <tr key={dir.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        {dir.name}
                        {dir.verified && (
                          <span className="ml-1 text-[10px] text-emerald-600 font-bold">✓ Verified</span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-500">{dir.category}</td>
                      <td className="py-3 px-4 text-slate-600">{dir.location}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            dir.status === 'approved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : dir.status === 'pending'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {dir.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <a href={dir.website} target="_blank" rel="noopener noreferrer" className="text-orange-600 underline">
                          Visit
                        </a>
                      </td>
                      <td className="py-3 px-4 text-right space-x-1.5">
                        {dir.status !== 'approved' && (
                          <button
                            type="button"
                            onClick={() => handleApproveDirectory(dir.id)}
                            className="p-1 text-emerald-600 hover:text-emerald-700"
                            title="Approve & Verify Listing"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}
                        {dir.status !== 'rejected' && (
                          <button
                            type="button"
                            onClick={() => handleRejectDirectory(dir.id)}
                            className="p-1 text-amber-600 hover:text-amber-700"
                            title="Reject Listing"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleDeleteDirectory(dir.id)}
                          className="p-1 text-red-500 hover:text-red-700"
                          title="Delete Listing"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- TAB 5: CONTACT MESSAGES --- */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-900">
              Contact Form Inquiries ({messages.length})
            </h2>

            <div className="space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`bg-white p-5 rounded-2xl border transition-all ${
                    msg.status === 'unread' ? 'border-amber-400 bg-amber-50/20 shadow-sm' : 'border-slate-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{msg.name}</h4>
                      <a href={`mailto:${msg.email}`} className="text-xs text-orange-600 hover:underline">
                        {msg.email}
                      </a>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 font-mono block">{msg.submittedAt}</span>
                      {msg.status === 'unread' && (
                        <button
                          type="button"
                          onClick={() => {
                            StorageService.markMessageRead(msg.id);
                            refreshData();
                          }}
                          className="text-[11px] font-bold text-amber-700 hover:underline mt-1 inline-block"
                        >
                          Mark as Read
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="font-semibold text-xs text-slate-700 mb-1">Subject: {msg.subject}</div>
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 6: NEWSLETTER --- */}
        {activeTab === 'newsletter' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900">
                Newsletter Subscribers ({subscribers.length})
              </h2>
              <button
                type="button"
                onClick={exportNewsletterCsv}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Subscriber Email</th>
                    <th className="py-3 px-4">Subscribed At</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {subscribers.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-semibold text-slate-800">{sub.email}</td>
                      <td className="py-3 px-4 text-slate-500">{sub.subscribedAt}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {sub.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- TAB 7: AUDIT TRAIL --- */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-900">
              System Audit Logs & Security Events
            </h2>

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-xs text-left font-mono">
                <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 font-sans">
                  <tr>
                    <th className="py-3 px-4">Action</th>
                    <th className="py-3 px-4">Target / Entity</th>
                    <th className="py-3 px-4">Timestamp</th>
                    <th className="py-3 px-4">Operator</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-4 font-bold text-orange-600">{log.action}</td>
                      <td className="py-2.5 px-4 text-slate-700">{log.target}</td>
                      <td className="py-2.5 px-4 text-slate-400 text-[11px]">{log.timestamp}</td>
                      <td className="py-2.5 px-4 text-slate-500">{log.user}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

