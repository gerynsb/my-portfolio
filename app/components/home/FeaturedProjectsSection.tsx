'use client';

import { useState } from 'react';
import ProjectCard from '../projects/ProjectCard';
import { Project } from '@/app/types/project';

export default function FeaturedProjectsSection({ projectsByCategory }: any) {
  const [currentPages, setCurrentPages] = useState<{ [key: string]: number }>({});
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const itemsPerPage = 3;

  const setPage = (categoryId: string, page: number) => {
    setCurrentPages(prev => ({ ...prev, [categoryId]: page }));
  };

  const getCurrentPage = (categoryId: string) => currentPages[categoryId] || 0;

  const handleViewDetail = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Here are some of my best works across different technologies and domains
          </p>
        </div>
        
        {projectsByCategory.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects yet. Add some in the admin panel!</p>
          </div>
        ) : (
          <div className="space-y-16">
            {projectsByCategory.map((group: any) => {
              const categoryId = group.category._id;
              const currentPage = getCurrentPage(categoryId);
              const totalPages = Math.ceil(group.projects.length / itemsPerPage);
              const currentProjects = group.projects.slice(
                currentPage * itemsPerPage,
                (currentPage + 1) * itemsPerPage
              );

              const nextPage = () => {
                setPage(categoryId, (currentPage + 1) % totalPages);
              };

              const prevPage = () => {
                setPage(categoryId, (currentPage - 1 + totalPages) % totalPages);
              };

              return (
                <div key={categoryId}>
                  {/* Category Title with Horizontal Lines */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gray-300"></div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 whitespace-nowrap">{group.category.name}</h3>
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gray-300"></div>
                  </div>

                  {/* Projects Grid - Dynamic centering */}
                  <div className="mb-8">
                    <div className={`grid gap-8 ${
                      currentProjects.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
                      currentProjects.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' :
                      'md:grid-cols-2 lg:grid-cols-3'
                    }`}>
                      {currentProjects.map((project: any) => (
                        <ProjectCard key={project._id} project={project} onViewDetail={handleViewDetail} />
                      ))}
                    </div>
                  </div>

                  {/* Navigation Controls */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-6">
                      {/* Previous Button */}
                      <button
                        onClick={prevPage}
                        className="p-3 rounded-lg bg-white border border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all"
                        aria-label="Previous"
                      >
                        <svg
                          className="w-6 h-6 text-gray-700"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>

                      {/* Pagination Dots */}
                      <div className="flex gap-2">
                        {Array.from({ length: totalPages }).map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setPage(categoryId, index)}
                            className={`h-3 rounded-full transition-all ${
                              currentPage === index
                                ? 'w-8 bg-gradient-to-r from-blue-600 to-purple-600'
                                : 'w-3 bg-gray-300 hover:bg-gray-400'
                            }`}
                            aria-label={`Go to page ${index + 1}`}
                          />
                        ))}
                      </div>

                      {/* Next Button */}
                      <button
                        onClick={nextPage}
                        className="p-3 rounded-lg bg-white border border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all"
                        aria-label="Next"
                      >
                        <svg
                          className="w-6 h-6 text-gray-700"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">{selectedProject.title}</h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {selectedProject.thumbnailUrl && (
                <img src={selectedProject.thumbnailUrl} alt={selectedProject.title} className="w-full h-64 object-cover rounded-lg mb-6" />
              )}
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-600">{selectedProject.description}</p>
                </div>

                {selectedProject.features && selectedProject.features.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Features</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <span key={index} className="bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-gray-800 text-white hover:bg-gray-900 transition-colors px-6 py-3 rounded-lg font-medium"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      View on GitHub
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors px-6 py-3 rounded-lg font-medium"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
