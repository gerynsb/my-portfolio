import ExperienceTimeline from '../experiences/ExperienceTimeline';

export default function ExperienceSection({ experiences }: any) {
  return (
    <section id="experience" className="py-20 bg-black content-auto">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            My professional journey and career highlights
          </p>
        </div>
        
        {experiences.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No experiences yet.</p>
          </div>
        ) : (
          <ExperienceTimeline experiences={experiences} />
        )}
      </div>
    </section>
  );
}
