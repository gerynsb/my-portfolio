'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { articleSchema } from '@/app/lib/validation/article';
import { slugify } from '@/app/lib/slugify';

export default function ArticleForm({ article }: { article?: any }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: article?.title || '',
    subtitle: article?.subtitle || '',
    category: article?.category || '',
    featuredImageUrl: article?.featuredImageUrl || '',
    content: article?.content || '',
    published: article?.published || false,
  });
  const [errors, setErrors] = useState<any>({});
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(article?.featuredImageUrl || '');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      if (!res.ok) throw new Error('Upload failed');

      const data = await res.json();
      setFormData(prev => ({ ...prev, featuredImageUrl: data.url }));
      setPreviewImage(data.url);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      articleSchema.parse(formData);

      const slug = article?.slug || slugify(formData.title);
      const url = article 
        ? `/api/articles/${article._id}`
        : '/api/articles';
      
      const method = article ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, slug }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to save article');
      }

      router.push('/gerynsbanps/articles');
      router.refresh();
    } catch (error: any) {
      if (error.errors) {
        const formattedErrors: any = {};
        error.errors.forEach((err: any) => {
          formattedErrors[err.path[0]] = err.message;
        });
        setErrors(formattedErrors);
      } else {
        alert(error.message || 'Failed to save article');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
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
          placeholder="e.g., Getting Started with Next.js"
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
      </div>

      {/* Subtitle */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subtitle
        </label>
        <input
          type="text"
          value={formData.subtitle}
          onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600 placeholder:text-gray-500"
          placeholder="e.g., A comprehensive guide to modern web development"
        />
        {errors.subtitle && <p className="mt-1 text-sm text-red-600">{errors.subtitle}</p>}
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <input
          type="text"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600 placeholder:text-gray-500"
          placeholder="e.g., Web Development, Tutorial, Technology"
        />
        {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
      </div>

      {/* Featured Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Featured Image
        </label>
        <div className="space-y-3">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600"
          />
          {uploading && <p className="text-sm text-blue-600">Uploading...</p>}
          {previewImage && (
            <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-300">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <input
            type="text"
            value={formData.featuredImageUrl}
            onChange={(e) => {
              setFormData({ ...formData, featuredImageUrl: e.target.value });
              setPreviewImage(e.target.value);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600 placeholder:text-gray-500"
            placeholder="Or paste image URL"
          />
        </div>
        {errors.featuredImageUrl && <p className="mt-1 text-sm text-red-600">{errors.featuredImageUrl}</p>}
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content (Markdown)
        </label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={20}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm text-gray-600 placeholder:text-gray-500"
          placeholder="Write your article content in Markdown format..."
        />
        {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
        
        {/* Markdown Guide */}
        <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">📝 Panduan Menulis Markdown</h4>
          <div className="text-xs text-blue-800 space-y-2">
            <div>
              <strong>Paragraf:</strong> Pisahkan dengan baris kosong (2x Enter)
              <pre className="mt-1 bg-white p-2 rounded border border-blue-200 text-gray-700">
Ini paragraf pertama.

Ini paragraf kedua.</pre>
            </div>
            
            <div>
              <strong>Heading:</strong>
              <pre className="mt-1 bg-white p-2 rounded border border-blue-200 text-gray-700">
# Heading 1
## Heading 2
### Heading 3</pre>
            </div>
            
            <div>
              <strong>Bold & Italic:</strong>
              <pre className="mt-1 bg-white p-2 rounded border border-blue-200 text-gray-700">
**teks bold**
*teks italic*
***bold dan italic***</pre>
            </div>
            
            <div>
              <strong>Inline Code:</strong> Gunakan backtick (`)
              <pre className="mt-1 bg-white p-2 rounded border border-blue-200 text-gray-700">
Gunakan fungsi `console.log()` untuk debug.</pre>
            </div>
            
            <div>
              <strong>Code Block:</strong> Gunakan triple backtick (```) dengan nama bahasa
              <pre className="mt-1 bg-white p-2 rounded border border-blue-200 text-gray-700">
```javascript
function hello() {'{'}
  console.log("Hello World!");
{'}'}
```

```python
def hello():
    print("Hello World!")
```

```tsx
export default function App() {'{'}
  return &lt;div&gt;Hello&lt;/div&gt;;
{'}'}
```</pre>
            </div>
            
            <div>
              <strong>List:</strong>
              <pre className="mt-1 bg-white p-2 rounded border border-blue-200 text-gray-700">
- Item 1
- Item 2
  - Sub item

1. Numbered item 1
2. Numbered item 2</pre>
            </div>
            
            <div>
              <strong>Link & Image:</strong>
              <pre className="mt-1 bg-white p-2 rounded border border-blue-200 text-gray-700">
[Teks link](https://example.com)
![Alt text gambar](https://image-url.jpg)</pre>
            </div>
            
            <div>
              <strong>Quote:</strong>
              <pre className="mt-1 bg-white p-2 rounded border border-blue-200 text-gray-700">
&gt; Ini adalah quote atau kutipan</pre>
            </div>
            
            <div>
              <strong>Table:</strong>
              <pre className="mt-1 bg-white p-2 rounded border border-blue-200 text-gray-700">
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |</pre>
            </div>
            
            <div>
              <strong>Horizontal Line:</strong>
              <pre className="mt-1 bg-white p-2 rounded border border-blue-200 text-gray-700">
---</pre>
            </div>
          </div>
          
          <p className="mt-3 text-xs text-blue-700">
            <strong>💡 Tips:</strong> Untuk membuat paragraf baru, tekan Enter 2x (baris kosong di antara paragraf).
          </p>
        </div>
      </div>

      {/* Published */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="published"
          checked={formData.published}
          onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
          Publish this article
        </label>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
        >
          {article ? 'Update Article' : 'Create Article'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="w-full sm:w-auto px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
