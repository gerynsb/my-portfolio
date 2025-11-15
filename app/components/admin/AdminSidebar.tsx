'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

const menuItems = [
  { label: 'Dashboard', href: '/gerynsbanps', icon: '📊' },
  { label: 'Profile Photo', href: '/gerynsbanps/profile', icon: '👤' },
  { label: 'Settings', href: '/gerynsbanps/settings', icon: '⚙️' },
  { separator: true },
  { label: 'Skills', href: '/gerynsbanps/skills', icon: '🎯' },
  { separator: true },
  { label: 'Project Categories', href: '/gerynsbanps/project-categories', icon: '📂' },
  { label: 'Projects', href: '/gerynsbanps/projects', icon: '💼' },
  { separator: true },
  { label: 'Experiences', href: '/gerynsbanps/experiences', icon: '🏢' },
  { separator: true },
  { label: 'Articles', href: '/gerynsbanps/articles', icon: '📝' },
];

export default function AdminSidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/gerynsbanps/login');
    router.refresh();
  };

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="p-6">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </div>
      
      <nav className="px-4 flex-1">
        {menuItems.map((item, index) => {
          if (item.separator) {
            return <div key={index} className="border-t border-gray-700 my-2" />;
          }
          
          return (
            <Link
              key={item.href}
              href={item.href!}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors mb-1"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-gray-700 space-y-2">
        <Link 
          href="/" 
          className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
        >
          <span>←</span>
          <span>Back to Site</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 transition-colors rounded-lg hover:bg-gray-800"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
