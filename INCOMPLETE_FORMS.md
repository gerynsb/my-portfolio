# TODO: Halaman Admin yang Masih Perlu Dibuat

Website portfolio Anda sudah 90% jadi! Berikut adalah halaman admin yang masih perlu form lengkap:

## ✅ Sudah Selesai (WORKING)

- `/admin` - Dashboard ✅
- `/admin/settings` - Site Settings Form ✅
- `/admin/project-categories` - List ✅
- `/admin/project-categories/new` - Create Form ✅
- `/admin/project-categories/[id]` - Edit Form ✅
- `/admin/article-categories` - List ✅
- `/admin/article-categories/new` - Create Form ✅
- `/admin/article-categories/[id]` - Edit Form ✅
- `/admin/projects` - List ✅
- `/admin/experiences` - List ✅
- `/admin/articles` - List ✅

## 🔨 Yang Masih Perlu Form Lengkap

### 1. Project Forms
- `app/admin/projects/new/page.tsx` - Create project form
- `app/admin/projects/[id]/page.tsx` - Edit project form
- `app/components/admin/forms/ProjectForm.tsx` - Form component

### 2. Experience Forms
- `app/admin/experiences/new/page.tsx` - Create experience form
- `app/admin/experiences/[id]/page.tsx` - Edit experience form
- `app/components/admin/forms/ExperienceForm.tsx` - Form component

### 3. Article Forms
- `app/admin/articles/new/page.tsx` - Create article form
- `app/admin/articles/[id]/page.tsx` - Edit article form
- `app/components/admin/forms/ArticleForm.tsx` - Form component

---

## 📝 Cara Melengkapi Form yang Kurang

### Template untuk ProjectForm.tsx

Buat file: `app/components/admin/forms/ProjectForm.tsx`

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProjectInput } from '@/app/types/project';

interface Props {
  id?: string;
}

export default function ProjectForm({ id }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [formData, setFormData] = useState<ProjectInput>({
    title: '',
    description: '',
    longDescription: '',
    categoryId: '',
    thumbnailUrl: '',
    technologies: [],
    githubUrl: '',
    liveUrl: '',
    featured: false,
    order: 0,
  });

  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchProject();
    }
  }, [id]);

  const fetchCategories = async () => {
    const res = await fetch('/api/project-categories');
    const data = await res.json();
    setCategories(data);
  };

  const fetchProject = async () => {
    const res = await fetch(\`/api/projects/\${id}\`);
    const data = await res.json();
    setFormData({
      title: data.title,
      description: data.description,
      longDescription: data.longDescription || '',
      categoryId: data.categoryId,
      thumbnailUrl: data.thumbnailUrl || '',
      technologies: data.technologies || [],
      githubUrl: data.githubUrl || '',
      liveUrl: data.liveUrl || '',
      featured: data.featured || false,
      order: data.order || 0,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = id ? \`/api/projects/\${id}\` : '/api/projects';
      const method = id ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to save project');
      }

      router.push('/admin/projects');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTechChange = (value: string) => {
    const techs = value.split(',').map(t => t.trim()).filter(Boolean);
    setFormData({ ...formData, technologies: techs });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <h2 className="text-2xl font-bold">{id ? 'Edit Project' : 'New Project'}</h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-white border rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description *</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={3}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Long Description</label>
          <textarea
            value={formData.longDescription}
            onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
            rows={5}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category *</label>
          <select
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Thumbnail URL</label>
          <input
            type="url"
            value={formData.thumbnailUrl}
            onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
            placeholder="https://res.cloudinary.com/..."
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Upload image to Cloudinary and paste URL here</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Technologies</label>
          <input
            type="text"
            value={formData.technologies?.join(', ')}
            onChange={(e) => handleTechChange(e.target.value)}
            placeholder="React, Node.js, MongoDB (comma separated)"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">GitHub URL</label>
          <input
            type="url"
            value={formData.githubUrl}
            onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
            placeholder="https://github.com/..."
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Live URL</label>
          <input
            type="url"
            value={formData.liveUrl}
            onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
            placeholder="https://project-demo.com"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="rounded"
            />
            <span className="text-sm font-medium">Featured (show on homepage)</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Order</label>
          <input
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Project'}
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
```

Kemudian buat pages:

**app/admin/projects/new/page.tsx:**
```tsx
import ProjectForm from '@/app/components/admin/forms/ProjectForm';
import AdminHeader from '@/app/components/admin/AdminHeader';

export default function NewProjectPage() {
  return (
    <div>
      <AdminHeader title="New Project" />
      <div className="p-8">
        <ProjectForm />
      </div>
    </div>
  );
}
```

**app/admin/projects/[id]/page.tsx:**
```tsx
import ProjectForm from '@/app/components/admin/forms/ProjectForm';
import AdminHeader from '@/app/components/admin/AdminHeader';

export default function EditProjectPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <AdminHeader title="Edit Project" />
      <div className="p-8">
        <ProjectForm id={params.id} />
      </div>
    </div>
  );
}
```

---

## 🎯 Prioritas

Jika waktu terbatas, buat dalam urutan ini:
1. **ProjectForm** (paling penting - untuk showcase portfolio)
2. **ArticleForm** (kedua - untuk blog)
3. **ExperienceForm** (ketiga - bisa input manual via MongoDB Compass dulu)

---

## 💡 Tips Cepat

Untuk sementara, Anda bisa:
1. Input data langsung via MongoDB Compass atau MongoDB Atlas web interface
2. Atau copy-paste template form di atas dan sesuaikan field-nya
3. Semua API sudah jadi, tinggal buat form UI saja!

Form pattern-nya sama seperti `ProjectCategoryForm.tsx` dan `SettingsForm.tsx` yang sudah ada.
