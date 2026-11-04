import React from 'react';
import { Link } from 'react-router-dom';
import { FolderGit2, Github, ExternalLink, ArrowRight, Cpu, Layers } from 'lucide-react';
import { StorageService } from '../../services/storageService';

export const FeaturedProjects: React.FC = () => {
  const projects = StorageService.getProjects().slice(0, 4);

  return (
    <section className="py-14 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-orange-600 tracking-wider uppercase">
              Engineered Systems
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Featured Hardware Projects
            </h2>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 hover:text-orange-700 hover:underline"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-orange-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Project Image */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-semibold text-white bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors mb-2 leading-tight">
                    <Link to={`/projects/${project.slug}`}>{project.title}</Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs mb-4">
                    {project.specs.slice(0, 4).map((spec, sIdx) => (
                      <div key={sIdx} className="overflow-hidden">
                        <span className="text-slate-400 block text-[10px] uppercase font-medium">{spec.label}</span>
                        <span className="font-semibold text-slate-800 text-[11px] truncate block">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {project.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer with Links */}
              <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={`/projects/${project.slug}`}
                  className="text-xs font-semibold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1.5"
                >
                  <span>Project Deep Dive</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="flex items-center gap-3 text-slate-400">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
                      title="View GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
                      title="Live Interactive Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

