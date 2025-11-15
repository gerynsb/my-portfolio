'use client';

import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const [settings, setSettings] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/site-settings');
      const data = await response.json();
      console.log('Settings loaded:', data);
      console.log('Image URL:', data.heroImageUrl);
      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Please upload an image file' });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'Image size should be less than 5MB' });
      return;
    }

    setUploading(true);
    setMessage({ type: '', text: '' });

    try {
      // Step 1: Upload to Cloudinary
      const formData = new FormData();
      formData.append('file', file);

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload image');
      }

      const { url } = await uploadResponse.json();

      // Step 2: Update site settings with new image URL
      const updateResponse = await fetch('/api/site-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...settings,
          heroImageUrl: url,
        }),
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to update settings');
      }

      const updatedSettings = await updateResponse.json();
      setSettings(updatedSettings);
      setMessage({ type: 'success', text: 'Profile photo updated successfully!' });
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage({ type: 'error', text: 'Failed to upload image. Please try again.' });
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = async () => {
    if (!confirm('Are you sure you want to remove your profile photo?')) {
      return;
    }

    setUploading(true);
    setMessage({ type: '', text: '' });

    try {
      const updateResponse = await fetch('/api/site-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...settings,
          heroImageUrl: '',
        }),
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to update settings');
      }

      const updatedSettings = await updateResponse.json();
      setSettings(updatedSettings);
      setMessage({ type: 'success', text: 'Profile photo removed successfully!' });
    } catch (error) {
      console.error('Error removing image:', error);
      setMessage({ type: 'error', text: 'Failed to remove image. Please try again.' });
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Profile Photo</h1>

      {message.text && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Profile Photo Preview */}
          <div className="relative flex justify-center">
            {settings?.heroImageUrl ? (
              <div className="relative group">
                <img
                  src={settings.heroImageUrl}
                  alt="Profile"
                  className="w-48 h-48 rounded-full object-cover shadow-lg"
                  loading="eager"
                />
                <div className="absolute inset-0 group-hover:bg-opacity-50 rounded-full transition-all flex items-center justify-center">
                  <button
                    onClick={handleRemoveImage}
                    disabled={uploading}
                    className="opacity-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-opacity disabled:opacity-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                <svg
                  className="w-24 h-24 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Upload Button */}
          <div className="text-center space-y-4">
            <label
              htmlFor="profilePhoto"
              className={`inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium cursor-pointer transition-colors ${
                uploading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {uploading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Uploading...
                </span>
              ) : (
                <>
                  {settings?.heroImageUrl ? 'Change Photo' : 'Upload Photo'}
                </>
              )}
            </label>
            <input
              id="profilePhoto"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <p className="text-sm text-gray-300">
              Recommended: Square image, at least 400x400px, max 5MB
              <br />
              Supported formats: JPG, PNG, WebP
            </p>
          </div>

          {/* Info */}
          {settings?.heroImageUrl && (
            <div className="w-full bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-blue-600 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Your profile photo is live!</p>
                  <p>This image is displayed on your homepage hero section.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
