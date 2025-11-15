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
        {/* Vertical timeline line */}
        <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-blue-500"></div>

        {sortedExperiences.map((exp, index) => {
          const isLeft = index % 2 === 0;
          const endYear = exp.current ? 'Present' : exp.endDate;
          
          return (
            <div key={exp._id} className="mb-12 relative">
              <div className={`flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'} gap-8`}>
                {/* Content card */}
                <div className={`w-5/12 ${isLeft ? 'text-right' : 'text-left'}`}>
                  <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-700">
                    {/* Year badge */}
                    <div className={`inline-block mb-2 ${isLeft ? '' : ''}`}>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        exp.current 
                          ? 'bg-cyan-500 text-white' 
                          : index === 0
                          ? 'bg-yellow-500 text-black'
                          : 'bg-orange-500 text-white'
                      }`}>
                        {exp.startDate} - {endYear}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-1">
                      {exp.title}
                    </h3>

                    {/* Company */}
                    <p className="text-orange-400 font-medium mb-3">
                      {exp.company}
                    </p>

                    {/* Description */}
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-gray-900 z-10"></div>

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
