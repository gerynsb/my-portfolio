import ProjectCard from '../projects/ProjectCard';

export default function FeaturedProjectsSection({ projectsByCategory }: any) {
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
            {projectsByCategory.map((group: any) => (
              <div key={group.category._id}>
                <div className="flex items-center gap-4 mb-8">
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">{group.category.name}</h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {group.projects.map((project: any) => (
                    <ProjectCard key={project._id} project={project} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
