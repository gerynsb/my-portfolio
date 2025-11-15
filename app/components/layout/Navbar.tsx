'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Portfolio
          </Link>
          
          <div className="flex items-center gap-8">
            <button onClick={() => scrollToSection('home')} className="text-gray-300 hover:text-white transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-white transition-colors">
              About
            </button>
            <button onClick={() => scrollToSection('skills')} className="text-gray-300 hover:text-white transition-colors">
              Skills
            </button>
            <button onClick={() => scrollToSection('projects')} className="text-gray-300 hover:text-white transition-colors">
              Featured
            </button>
            <button onClick={() => scrollToSection('experience')} className="text-gray-300 hover:text-white transition-colors">
              Experience
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-white transition-colors">
              Contact
            </button>
            <Link href="/articles" className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold px-6 py-2 rounded-full hover:from-yellow-500 hover:to-yellow-700 transition-all shadow-lg hover:shadow-yellow-500/50">
              Articles
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
