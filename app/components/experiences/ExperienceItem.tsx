import { Experience } from '@/app/types/experience';

export default function ExperienceItem({ experience, index }: { experience: Experience; index?: number }) {
  return (
    <div className="relative pl-8 md:pl-0">
      {/* Timeline dot */}
      <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>
      
      {/* Content card */}
      <div className={`bg-white rounded-xl shadow-lg p-6 md:w-5/12 ${index && index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
        <div className="mb-2">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
            {experience.startDate} - {experience.current ? 'Present' : experience.endDate}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-1">{experience.title}</h3>
        <p className="text-blue-600 font-semibold mb-1">{experience.company}</p>
        {experience.location && (
          <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {experience.location}
          </p>
        )}
        
        <p className="text-gray-700 mb-4 leading-relaxed">{experience.description}</p>
        
        {experience.skills && experience.skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {experience.skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
