import AdminHeader from '../components/admin/AdminHeader';
import Link from 'next/link';

export default function AdminDashboard() {
  const quickLinks = [
    { title: 'Site Settings', href: '/admin/settings', icon: '⚙️' },
    { title: 'Projects', href: '/admin/projects', icon: '💼' },
    { title: 'Articles', href: '/admin/articles', icon: '📝' },
    { title: 'Experiences', href: '/admin/experiences', icon: '🏢' },
  ];

  return (
    <div>
      <AdminHeader title="Dashboard" />
      
      <div className="p-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-3">{link.icon}</div>
              <h3 className="text-lg font-semibold">{link.title}</h3>
            </Link>
          ))}
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Welcome to Admin Panel</h2>
          <p className="text-gray-600">
            Use the sidebar to navigate and manage your portfolio content.
          </p>
        </div>
      </div>
    </div>
  );
}
