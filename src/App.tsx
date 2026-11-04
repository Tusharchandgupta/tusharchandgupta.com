import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { VirtualLabPage } from './pages/VirtualLabPage';
import { ToolsDirectoryPage } from './pages/ToolsDirectoryPage';
import { ToolDetailPage } from './pages/ToolDetailPage';
import { HardwareWikiPage } from './pages/HardwareWikiPage';
import { WikiDetailPage } from './pages/WikiDetailPage';
import { PcbDesignPage } from './pages/PcbDesignPage';
import { DirectoriesPage } from './pages/DirectoriesPage';
import { DownloadsPage } from './pages/DownloadsPage';
import { BooksPage } from './pages/BooksPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';

// Scroll to top upon route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout Wrapper
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdmin && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isAdmin && <Footer />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <AppLayout>
        <Routes>
          {/* Public Platform Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/virtual-lab" element={<VirtualLabPage />} />
          <Route path="/tools" element={<ToolsDirectoryPage />} />
          <Route path="/tools/:slug" element={<ToolDetailPage />} />
          <Route path="/wiki" element={<HardwareWikiPage />} />
          <Route path="/wiki/:slug" element={<WikiDetailPage />} />
          <Route path="/pcb-design" element={<PcbDesignPage />} />
          <Route path="/directories" element={<DirectoriesPage />} />
          <Route path="/downloads" element={<DownloadsPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default App;

