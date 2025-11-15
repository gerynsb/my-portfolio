'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { skillSchema } from '@/app/lib/validation/skill';

export default function SkillForm({ skill }: { skill?: any }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: skill?.title || '',
    description: skill?.description || '',
  });
  const [errors, setErrors] = useState<any>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      skillSchema.parse(formData);

      const url = skill 
        ? `/api/skills/${skill._id}`
        : '/api/skills';
      
      const method = skill ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to save skill');
      }

      router.push('/gerynsbanps/skills');
      router.refresh();
    } catch (error: any) {
      if (error.errors) {
        const formattedErrors: any = {};
        error.errors.forEach((err: any) => {
          formattedErrors[err.path[0]] = err.message;
        });
        setErrors(formattedErrors);
      } else {
        alert(error.message || 'Failed to save skill');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600 placeholder:text-gray-500"
          placeholder="e.g., React & Next.js"
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600 placeholder:text-gray-500"
          placeholder="e.g., Building modern web applications with React ecosystem and Next.js framework"
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {skill ? 'Update Skill' : 'Create Skill'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
