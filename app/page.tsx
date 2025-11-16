import { getHomeData } from './lib/home-data';
import HeroSection from './components/home/HeroSection';
import AboutSection from './components/home/AboutSection';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import dynamic from 'next/dynamic';

// Lazy load below-the-fold sections
const SkillsSection = dynamic(() => import('./components/home/SkillsSection'), {
  loading: () => <div className="min-h-screen bg-black" />,
});
const FeaturedProjectsSection = dynamic(() => import('./components/home/FeaturedProjectsSection'), {
  loading: () => <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black" />,
});
const ExperienceSection = dynamic(() => import('./components/home/ExperienceSection'), {
  loading: () => <div className="min-h-screen bg-black" />,
});
const ContactSection = dynamic(() => import('./components/home/ContactSection'), {
  loading: () => <div className="min-h-screen bg-gradient-to-b from-black to-gray-900" />,
});

// Enable ISR for faster page loads - revalidate every 60 seconds for fresh data
export const revalidate = 60; // Revalidate every minute

export default async function Home() {
  const { settings, profileImageUrl, projectsByCategory, experiences, skills } = await getHomeData();

  return (
    <>
      <Navbar />
      <main>
        <HeroSection settings={settings} profileImageUrl={profileImageUrl} />
        <AboutSection settings={settings} />
        <SkillsSection skills={skills} />
        <FeaturedProjectsSection projectsByCategory={projectsByCategory} />
        <ExperienceSection experiences={experiences} />
        <ContactSection settings={settings} />
      </main>
      <Footer />
    </>
  );
}

