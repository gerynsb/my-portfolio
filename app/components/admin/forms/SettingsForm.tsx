'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SiteSettings } from '@/app/types/settings';

export default function SettingsForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<Partial<SiteSettings>>({
    heroGreeting: '',
    heroTitle: '',
    heroSubtitle: '',
    heroImageUrl: '',
    aboutTitle: '',
    aboutBody: '',
    interests: [],
    contactEmail: '',
    contactWhatsapp: '',
    contactGithub: '',
    contactLinkedin: '',
    contactInstagram: '',
    contactFacebook: '',
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/site-settings');
      const data = await res.json();
      setFormData(data);
    } catch (err) {
      console.error('Error fetching settings:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/site-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to save settings');
      }

      alert('Settings saved successfully!');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-black">Hero Section</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Hero Greeting *</label>
            <input
              type="text"
              name="heroGreeting"
              value={formData.heroGreeting || ''}
              onChange={handleChange}
              required
              placeholder="e.g., Hi, I'm"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 placeholder:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Hero Title *</label>
            <input
              type="text"
              name="heroTitle"
              value={formData.heroTitle || ''}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Hero Subtitle *</label>
            <input
              type="text"
              name="heroSubtitle"
              value={formData.heroSubtitle || ''}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Hero Image URL</label>
            <input
              type="url"
              name="heroImageUrl"
              value={formData.heroImageUrl || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-black">About Section</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">About Title *</label>
            <input
              type="text"
              name="aboutTitle"
              value={formData.aboutTitle || ''}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">About Body *</label>
            <textarea
              name="aboutBody"
              value={formData.aboutBody || ''}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Interests & Soft Skills</label>
            <div className="space-y-2">
              {(formData.interests || []).map((interest, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={interest}
                    onChange={(e) => {
                      const newInterests = [...(formData.interests || [])];
                      newInterests[index] = e.target.value;
                      setFormData({ ...formData, interests: newInterests });
                    }}
                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                    placeholder="e.g., Leadership, Problem Solving"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newInterests = formData.interests?.filter((_, i) => i !== index) || [];
                      setFormData({ ...formData, interests: newInterests });
                    }}
                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  setFormData({ ...formData, interests: [...(formData.interests || []), ''] });
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add Interest
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-black">Contact Information</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Email *</label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail || ''}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">WhatsApp</label>
            <input
              type="text"
              name="contactWhatsapp"
              value={formData.contactWhatsapp || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">GitHub URL</label>
            <input
              type="url"
              name="contactGithub"
              value={formData.contactGithub || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">LinkedIn URL</label>
            <input
              type="url"
              name="contactLinkedin"
              value={formData.contactLinkedin || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Instagram</label>
            <input
              type="text"
              name="contactInstagram"
              value={formData.contactInstagram || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 placeholder:text-gray-500"
              placeholder="username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Facebook URL</label>
            <input
              type="url"
              name="contactFacebook"
              value={formData.contactFacebook || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 placeholder:text-gray-500"
              placeholder="https://facebook.com/username"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Save Settings'}
      </button>
    </form>
  );
}
