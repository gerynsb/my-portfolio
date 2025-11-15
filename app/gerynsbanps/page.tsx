import AdminHeader from '../components/admin/AdminHeader';
import Link from 'next/link';

export default function AdminDashboard() {
  const quickActions = [
    { title: 'Site Settings', href: '/gerynsbanps/settings', icon: '⚙️' },
    { title: 'Projects', href: '/gerynsbanps/projects', icon: '💼' },
    { title: 'Articles', href: '/gerynsbanps/articles', icon: '📝' },
    { title: 'Experiences', href: '/gerynsbanps/experiences', icon: '🏢' },
  ];

  return (
    <div>
      <AdminHeader title="Dashboard" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {quickActions.map((link) => (
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

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Welcome to Admin Panel</h2>
        <p className="text-gray-600">
          Use the sidebar to navigate and manage your portfolio content.
        </p>
      </div>
    </div>
  );
}
