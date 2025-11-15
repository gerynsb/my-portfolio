'use client';

import { Project } from '@/app/types/project';
import { useState } from 'react';

interface ProjectCardProps {
  project: Project;
  onViewDetail?: (project: Project) => void;
}

export default function ProjectCard({ project, onViewDetail }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  
  return (
    <div className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl overflow-hidden shadow-xl shadow-blue-500/10 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 transform hover:-translate-y-2 backdrop-blur-sm border border-gray-700/50">
      {project.thumbnailUrl && !imageError ? (
        <div className="relative h-48 overflow-hidden bg-gray-900">
          <img
            src={project.thumbnailUrl}
            alt={project.title}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500"></div>
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-blue-500/80 to-purple-600/80 flex items-center justify-center">
          <span className="text-white text-4xl font-bold drop-shadow-lg">{project.title.charAt(0)}</span>
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-300 mb-4 line-clamp-2">{project.description}</p>
        
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-blue-300 text-xs font-medium px-3 py-1 rounded-full border border-blue-500/30"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="bg-gray-700/50 text-gray-300 text-xs font-medium px-3 py-1 rounded-full border border-gray-600">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        )}
        
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => onViewDetail?.(project)}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all text-sm font-medium px-4 py-2 rounded-lg shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Detail
          </button>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-gray-700/80 text-white hover:bg-gray-600 transition-colors text-sm font-medium px-4 py-2 rounded-lg shadow-lg shadow-gray-700/20 hover:shadow-gray-600/40"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
