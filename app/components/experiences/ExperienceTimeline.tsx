import { Experience } from '@/app/types/experience';

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  // Sort by startDate descending (newest first/top)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const yearA = parseInt(a.startDate) || 0;
    const yearB = parseInt(b.startDate) || 0;
    return yearB - yearA; // Descending order (newest first)
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="relative">
        {/* Vertical timeline line with gradient - Desktop */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500"></div>
        {/* Vertical timeline line - Mobile */}
        <div className="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500"></div>

        {sortedExperiences.map((exp, index) => {
          const isLeft = index % 2 === 0;
          const endYear = exp.current ? 'Present' : exp.endDate;
          
          return (
            <div key={exp._id} className="mb-8 md:mb-12 relative">
              {/* Mobile Layout */}
              <div className="md:hidden flex gap-6">
                <div className="relative flex flex-col items-center">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 border-4 border-gray-900 shadow-lg shadow-blue-500/50"></div>
                </div>
                
                <div className="flex-1 pb-4">
                  <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-lg p-4 shadow-xl shadow-blue-500/10 backdrop-blur-sm border border-gray-700/50">
                    <div className="mb-2">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${
                        exp.current 
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' 
                          : index === 0
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black'
                          : 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                      }`}>
                        {exp.startDate} - {endYear}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 font-semibold mb-2 text-sm">
                      {exp.company}
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className={`hidden md:flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'} gap-8`}>
                {/* Content card with glassmorphism */}
                <div className={`w-5/12 ${isLeft ? 'text-right' : 'text-left'}`}>
                  <div className="relative group bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-lg p-6 shadow-xl shadow-blue-500/10 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/30">
                    {/* Year badge with gradient */}
                    <div className={`inline-block mb-3 ${isLeft ? '' : ''}`}>
                      <span className={`px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg ${
                        exp.current 
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' 
                          : index === 0
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black'
                          : 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                      }`}>
                        {exp.startDate} - {endYear}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-1">
                      {exp.title}
                    </h3>

                    {/* Company with gradient text */}
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 font-semibold mb-3">
                      {exp.company}
                    </p>

                    {/* Description */}
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>

                {/* Center dot with glow effect */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 border-4 border-gray-900 z-10 shadow-lg shadow-blue-500/50 group-hover:shadow-purple-500/70 transition-shadow"></div>

                {/* Empty space for alternating layout */}
                <div className="w-5/12"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
