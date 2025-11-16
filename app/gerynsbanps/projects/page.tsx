'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminHeader from '@/app/components/admin/AdminHeader';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchProjects();
      } else {
        alert('Failed to delete project');
      }
    } catch (error) {
      alert('Failed to delete project');
    }
  };

  return (
    <div>
      <AdminHeader title="Projects" />
      
      <div className="p-8">
        <div className="mb-6">
          <Link
            href="/gerynsbanps/projects/new"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base"
          >
            + Add New Project
          </Link>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : projects.length === 0 ? (
          <p className="text-gray-500">No projects yet.</p>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Category
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Featured
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project._id}>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 max-w-xs truncate" title={project.title}>
                        {project.title}
                      </div>
                      <div className="text-sm text-gray-500 line-clamp-2">
                        {project.description?.substring(0, 60)}...
                      </div>
                      <div className="md:hidden mt-1">
                        <span className="text-xs text-gray-400">{project.categoryName || 'N/A'}</span>
                        {project.featured && (
                          <span className="ml-2 px-2 py-1 text-xs rounded bg-green-100 text-green-800">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 hidden md:table-cell">
                      <div className="max-w-xs truncate" title={project.categoryName}>{project.categoryName || 'N/A'}</div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                      {project.featured ? (
                        <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">
                          Yes
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-800">
                          No
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/gerynsbanps/projects/${project._id}`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(project._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
