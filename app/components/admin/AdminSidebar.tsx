import Link from 'next/link';

const menuItems = [
  { label: 'Dashboard', href: '/admin', icon: '📊' },
  { label: 'Profile Photo', href: '/admin/profile', icon: '👤' },
  { label: 'Settings', href: '/admin/settings', icon: '⚙️' },
  { separator: true },
  { label: 'Project Categories', href: '/admin/project-categories', icon: '📂' },
  { label: 'Projects', href: '/admin/projects', icon: '💼' },
  { separator: true },
  { label: 'Experiences', href: '/admin/experiences', icon: '🏢' },
  { separator: true },
  { label: 'Article Categories', href: '/admin/article-categories', icon: '📂' },
  { label: 'Articles', href: '/admin/articles', icon: '📝' },
];

export default function AdminSidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-6">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </div>
      
      <nav className="px-4">
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
      
      <div className="p-4 mt-auto border-t border-gray-700">
        <Link 
          href="/" 
          className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors"
        >
          <span>←</span>
          <span>Back to Site</span>
        </Link>
      </div>
    </div>
  );
}
