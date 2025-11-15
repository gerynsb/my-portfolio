'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { skillSchema } from '@/app/lib/validation/skill';

interface SubSkill {
  name: string;
  rating: number;
}

export default function SkillForm({ skill }: { skill?: any }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: skill?.title || '',
    description: skill?.description || '',
    skills: skill?.skills || [] as SubSkill[],
  });
  const [errors, setErrors] = useState<any>({});
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillRating, setNewSkillRating] = useState(3);

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

  const addSubSkill = () => {
    if (!newSkillName.trim()) {
      alert('Please enter a skill name');
      return;
    }
    
    setFormData({
      ...formData,
      skills: [...formData.skills, { name: newSkillName.trim(), rating: newSkillRating }]
    });
    setNewSkillName('');
    setNewSkillRating(3);
  };

  const removeSubSkill = (index: number) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_: SubSkill, i: number) => i !== index)
    });
  };

  const updateSubSkillRating = (index: number, rating: number) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index].rating = rating;
    setFormData({ ...formData, skills: updatedSkills });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {/* Title (Category Name) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category Name
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600 placeholder:text-gray-500"
          placeholder="e.g., Frontend, Backend, Mobile Development"
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
      </div>

      {/* Description (Optional) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description (Optional)
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={2}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600 placeholder:text-gray-500"
          placeholder="Brief description of this skill category"
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>

      {/* Skills List */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Skills
        </label>
        
        {/* Add New Skill */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
          <div className="flex gap-3 items-end flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Skill Name
              </label>
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSubSkill())}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-600"
                placeholder="e.g., Next.js, React, TypeScript"
              />
            </div>
            
            <div className="min-w-[180px]">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Rating
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewSkillRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <svg
                      className={`w-7 h-7 ${
                        star <= newSkillRating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300 fill-gray-300'
                      }`}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
            
            <button
              type="button"
              onClick={addSubSkill}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Skill
            </button>
          </div>
        </div>

        {/* Skills List */}
        {formData.skills.length === 0 ? (
          <p className="text-gray-500 text-sm italic py-4">No skills added yet. Add at least one skill above.</p>
        ) : (
          <div className="space-y-2">
            {formData.skills.map((subSkill: SubSkill, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-gray-900 font-medium">{subSkill.name}</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => updateSubSkillRating(index, star)}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <svg
                          className={`w-5 h-5 ${
                            star <= subSkill.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300 fill-gray-300'
                          }`}
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">({subSkill.rating}/5)</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeSubSkill(index)}
                  className="text-red-600 hover:text-red-800 px-3 py-1 hover:bg-red-50 rounded transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        {errors.skills && <p className="mt-1 text-sm text-red-600">{errors.skills}</p>}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          disabled={formData.skills.length === 0}
        >
          {skill ? 'Update Category' : 'Create Category'}
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
