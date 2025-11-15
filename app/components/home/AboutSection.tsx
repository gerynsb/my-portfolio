export default function AboutSection({ settings }: { settings: any }) {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {settings.aboutTitle || 'About Me'}
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-2xl border border-gray-700/50">
            <p className="text-gray-300 leading-relaxed text-lg">
              {settings.aboutBody || 'Add your about content in admin settings.'}
            </p>
          </div>

          {/* Interests & Soft Skills */}
          {settings.interests && settings.interests.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-center mb-6 text-white">
                Interests & Soft Skills
              </h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {settings.interests.map((interest: string, index: number) => (
                  <span
                    key={index}
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition-all cursor-default"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
