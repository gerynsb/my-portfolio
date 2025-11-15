'use client';

import { useState } from 'react';
import { Skill } from '@/app/types/skill';

interface SkillsSectionProps {
  skills: Skill[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(skills.length / itemsPerPage);

  const currentSkills = skills.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  if (skills.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {currentSkills.map((skill) => (
            <div
              key={skill._id}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 flex flex-col items-center"
              style={{ minHeight: '280px', maxHeight: '320px' }}
            >
              {/* Icon/Logo */}
              <div className="w-16 h-16 mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-3 text-center line-clamp-2 flex-shrink-0">
                {skill.title}
              </h3>
              <div className="flex-1 w-full overflow-hidden flex items-center justify-center">
                <p 
                  className="text-gray-600 text-center leading-relaxed w-full px-2"
                  style={{
                    fontSize: 'clamp(0.75rem, 0.85rem, 0.95rem)',
                    display: '-webkit-box',
                    WebkitLineClamp: '8',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    wordBreak: 'break-word',
                    hyphens: 'auto',
                  }}
                >
                  {skill.description}
                </p>
              </div>
            </div>
          ))}
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
                  onClick={() => setCurrentPage(index)}
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
    </section>
  );
}
