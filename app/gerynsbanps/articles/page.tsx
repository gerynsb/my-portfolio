'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminHeader from '@/app/components/admin/AdminHeader';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/articles');
      const data = await res.json();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;

    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchArticles();
      } else {
        alert('Failed to delete article');
      }
    } catch (error) {
      alert('Failed to delete article');
    }
  };

  return (
    <div>
      <AdminHeader title="Articles" />
      
      <div className="p-8">
        <div className="mb-6">
          <Link
            href="/gerynsbanps/articles/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Add New Article
          </Link>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : articles.length === 0 ? (
          <p className="text-gray-500">No articles yet.</p>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {articles.map((article) => (
                  <tr key={article._id}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-600">
                        {article.title}
                      </div>
                      <div className="text-sm text-gray-600">
                        {article.excerpt?.substring(0, 60)}...
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {article.categoryName || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {article.published ? (
                        <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">
                          Published
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/gerynsbanps/articles/${article._id}`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(article._id)}
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
        )}
      </div>
    </div>
  );
}
