import { getHomeData } from './lib/home-data';
import HeroSection from './components/home/HeroSection';
import AboutSection from './components/home/AboutSection';
import SkillsSection from './components/home/SkillsSection';
import FeaturedProjectsSection from './components/home/FeaturedProjectsSection';
import ExperienceSection from './components/home/ExperienceSection';
import ContactSection from './components/home/ContactSection';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

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

