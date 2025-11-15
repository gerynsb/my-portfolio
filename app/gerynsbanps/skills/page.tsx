'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SkillsPage() {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await fetch('/api/skills');
      const data = await res.json();
      setSkills(data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      const res = await fetch(`/api/skills/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchSkills();
      } else {
        alert('Failed to delete skill');
      }
    } catch (error) {
      alert('Failed to delete skill');
    }
  };

  return (
    <div>
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4 text-black">Skills & Technologies</h1>
          <Link
            href="/gerynsbanps/skills/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base inline-block"
          >
            Add New Skill
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : skills.length === 0 ? (
          <p className="text-gray-600">No skills yet. Create one to get started!</p>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full min-w-[640px] divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Skills
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {skills.map((skill) => (
                  <tr key={skill._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{skill.title}</div>
                      {skill.description && (
                        <div className="text-sm text-gray-500 mt-1 line-clamp-2">{skill.description}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {skill.skills && skill.skills.length > 0 ? (
                          skill.skills.map((subSkill: any, idx: number) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              {subSkill.name}
                              <span className="text-yellow-600">{'⭐'.repeat(subSkill.rating)}</span>
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400 text-sm">No skills added</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/gerynsbanps/skills/${skill._id}`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(skill._id)}
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
