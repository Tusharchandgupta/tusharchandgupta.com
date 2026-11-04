import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, Cpu, CheckCircle2, Layers } from 'lucide-react';
import { StorageService } from '../services/storageService';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = StorageService.getProjectBySlug(slug || '');

  if (!project) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Project Not Found</h2>
        <Link to="/projects" className="mt-4 inline-block text-emerald-600 font-semibold underline">
          Return to Projects Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-600 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>

        <article className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm space-y-8 p-6 sm:p-10">
          <div>
            <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 uppercase">
              {project.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              {project.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Project Featured Image */}
          <div className="rounded-2xl overflow-hidden aspect-[16/9] bg-slate-900 border border-slate-200">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Electrical & System Specifications */}
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              System Specifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.specs.map((spec, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">{spec.label}:</span>
                  <span className="font-mono font-bold text-slate-800">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Engineering Features */}
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Key Engineering Features & Architectures
            </h2>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              {project.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies Used */}
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Toolchains & Components Used
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>View on GitHub</span>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Interactive Hardware Demo</span>
              </a>
            )}
          </div>
        </article>
      </div>
    </div>
  );
};

