'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Experience } from '@/app/types/experience';

interface ExperienceFormProps {
  experience?: Experience;
}

export default function ExperienceForm({ experience }: ExperienceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: experience?.title || '',
    company: experience?.company || '',
    startDate: experience?.startDate || '',
    endDate: experience?.endDate || '',
    current: experience?.current || false,
    description: experience?.description || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = experience?._id 
        ? `/api/experiences/${experience._id}`
        : '/api/experiences';
      
      const method = experience?._id ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to save experience');
      }

      router.push('/admin/experiences');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white border rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold mb-4 text-black">Basic Information</h3>
        
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Job Title / Position *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 placeholder:text-gray-500"
            placeholder="e.g., Head Mobile App Division"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Company / Institution *</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 placeholder:text-gray-500"
            placeholder="e.g., Coder Institute, Universitas Hasanuddin"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 placeholder:text-gray-500"
            placeholder="Describe your role, responsibilities, and achievements..."
          />
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold mb-4 text-black">Timeline</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Start Year *</label>
            <input
              type="text"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 placeholder:text-gray-500"
              placeholder="e.g., 2023"
              maxLength={4}
            />
            <p className="text-xs text-gray-700 mt-1">Format: YYYY (e.g., 2023)</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">End Year</label>
            <input
              type="text"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              disabled={formData.current}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 placeholder:text-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="e.g., 2024"
              maxLength={4}
            />
            <p className="text-xs text-gray-700 mt-1">Leave empty if current position</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="current"
            checked={formData.current}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label className="text-sm font-medium text-gray-700">
            I currently work here (will show as "Present")
          </label>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : experience ? 'Update Experience' : 'Create Experience'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
