'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminHeader from '@/app/components/admin/AdminHeader';

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await fetch('/api/experiences');
      const data = await res.json();
      setExperiences(data);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;

    try {
      const res = await fetch(`/api/experiences/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchExperiences();
      } else {
        alert('Failed to delete experience');
      }
    } catch (error) {
      alert('Failed to delete experience');
    }
  };

  return (
    <div>
      <AdminHeader title="Experiences" />
      
      <div className="p-8">
        <div className="mb-6">
          <Link
            href="/gerynsbanps/experiences/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base inline-block"
          >
            + Add New Experience
          </Link>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : experiences.length === 0 ? (
          <p className="text-gray-500">No experiences yet.</p>
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
                    Company
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Period
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {experiences.map((exp) => (
                  <tr key={exp._id}>
                    <td className="px-4 sm:px-6 py-4 font-medium text-gray-900">
                      <div className="max-w-xs truncate" title={exp.title}>{exp.title}</div>
                      <div className="text-sm text-gray-500 md:hidden">{exp.company}</div>
                      <div className="text-xs text-gray-400 lg:hidden">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-gray-900 hidden md:table-cell">
                      <div className="max-w-xs truncate" title={exp.company}>{exp.company}</div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 hidden lg:table-cell whitespace-nowrap">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/gerynsbanps/experiences/${exp._id}`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(exp._id)}
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
