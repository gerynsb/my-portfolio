# 📝 Panduan Lengkap Menulis Artikel dengan Markdown

## 🎯 Jawaban Singkat

### ✅ Apakah bisa menulis kode?
**YA!** Anda bisa menulis kode dengan syntax highlighting yang cantik.

### ✅ Apakah Enter = paragraf baru?
**Tidak langsung.** Untuk membuat paragraf baru, tekan **Enter 2 kali** (baris kosong di antara paragraf).

---

## 📖 Panduan Lengkap Markdown

### 1. Paragraf & Baris Baru

#### ❌ Salah (1x Enter - tidak membuat paragraf baru):
```
Ini kalimat pertama.
Ini kalimat kedua.
```

**Hasil:** Ini kalimat pertama. Ini kalimat kedua. (dalam 1 paragraf)

#### ✅ Benar (2x Enter - membuat paragraf baru):
```
Ini paragraf pertama.

Ini paragraf kedua.

Ini paragraf ketiga.
```

**Hasil:** 
Ini paragraf pertama.

Ini paragraf kedua.

Ini paragraf ketiga.

---

### 2. Menulis Kode

#### A. Inline Code (kode dalam kalimat)

**Cara menulis:** Gunakan backtick `` ` ``

```
Gunakan fungsi `console.log()` untuk debugging.
Variabel `userName` menyimpan nama user.
```

**Hasil:** Gunakan fungsi `console.log()` untuk debugging.

---

#### B. Code Block (blok kode lengkap dengan syntax highlighting)

**Cara menulis:** Gunakan triple backtick ` ``` ` dengan nama bahasa

##### JavaScript:
````
```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
  return true;
}

greet("Dean");
```
````

##### Python:
````
```python
def calculate_sum(a, b):
    result = a + b
    print(f"Sum: {result}")
    return result

calculate_sum(5, 10)
```
````

##### TypeScript/React:
````
```tsx
import React from 'react';

export default function Button({ label, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      {label}
    </button>
  );
}
```
````

##### HTML:
````
```html
<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1>Hello World</h1>
  <p>This is a paragraph.</p>
</body>
</html>
```
````

##### CSS:
````
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.button {
  background-color: #3b82f6;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
}
```
````

##### SQL:
````
```sql
SELECT users.name, orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id
WHERE orders.status = 'completed'
ORDER BY orders.total DESC;
```
````

##### JSON:
````
```json
{
  "name": "Dean Gery Pasamba",
  "role": "Full Stack Developer",
  "skills": ["React", "Node.js", "Flutter"],
  "experience": 3
}
```
````

---

### 3. Heading (Judul)

```
# Heading 1 (Paling Besar)
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6 (Paling Kecil)
```

---

### 4. Formatting Teks

```
**Teks Bold (Tebal)**
*Teks Italic (Miring)*
***Bold dan Italic***
~~Strikethrough (Coret)~~
```

**Hasil:**
- **Teks Bold (Tebal)**
- *Teks Italic (Miring)*
- ***Bold dan Italic***
- ~~Strikethrough~~

---

### 5. List (Daftar)

#### Unordered List (Bullet Points):
```
- Item pertama
- Item kedua
  - Sub item 1
  - Sub item 2
- Item ketiga
```

**Hasil:**
- Item pertama
- Item kedua
  - Sub item 1
  - Sub item 2
- Item ketiga

#### Ordered List (Numbering):
```
1. Langkah pertama
2. Langkah kedua
3. Langkah ketiga
   1. Sub langkah 3.1
   2. Sub langkah 3.2
4. Langkah keempat
```

**Hasil:**
1. Langkah pertama
2. Langkah kedua
3. Langkah ketiga

---

### 6. Link & Gambar

#### Link:
```
[Teks yang diklik](https://example.com)
[Kunjungi GitHub saya](https://github.com/gerynsb)
```

**Hasil:** [Kunjungi GitHub saya](https://github.com/gerynsb)

#### Gambar:
```
![Alt text gambar](https://example.com/image.jpg)
![Logo React](https://react.dev/logo.png)
```

---

### 7. Quote (Kutipan)

```
> Ini adalah kutipan atau quote.
> Bisa beberapa baris.
> 
> — Dean Gery Pasamba
```

**Hasil:**
> Ini adalah kutipan atau quote.
> Bisa beberapa baris.
> 
> — Dean Gery Pasamba

---

### 8. Table (Tabel)

```
| Nama       | Role              | Skill        |
|------------|-------------------|--------------|
| Dean       | Full Stack Dev    | React, Node  |
| Alice      | Flutter Dev       | Dart, Mobile |
| Bob        | Data Analyst      | Python, SQL  |
```

**Hasil:**

| Nama  | Role           | Skill       |
|-------|----------------|-------------|
| Dean  | Full Stack Dev | React, Node |
| Alice | Flutter Dev    | Dart, Mobile|
| Bob   | Data Analyst   | Python, SQL |

---

### 9. Horizontal Line (Garis Pemisah)

```
---
```

**Hasil:**

---

### 10. Kombinasi Fitur

Anda bisa menggabungkan berbagai fitur:

````
## Tutorial: Membuat API dengan Node.js

Dalam tutorial ini, kita akan belajar membuat REST API sederhana.

### Langkah 1: Setup Project

Pertama, buat folder baru dan install dependencies:

```bash
mkdir my-api
cd my-api
npm init -y
npm install express
```

### Langkah 2: Buat Server

Buat file `server.js` dengan kode berikut:

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Route GET
app.get('/api/users', (req, res) => {
  res.json({ users: ['Dean', 'Alice', 'Bob'] });
});

// Route POST
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  res.status(201).json({ message: 'User created', user: newUser });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Langkah 3: Jalankan Server

```bash
node server.js
```

> **Tips:** Gunakan `nodemon` untuk auto-restart saat development.

**Fitur yang sudah dibuat:**
- ✅ GET endpoint untuk list users
- ✅ POST endpoint untuk create user
- ✅ JSON parsing middleware

---

## Kesimpulan

API sederhana sudah jadi! Selanjutnya bisa ditambah:
1. Database connection (MongoDB/PostgreSQL)
2. Authentication (JWT)
3. Validation (express-validator)
````

---

## 🎨 Bahasa Pemrograman yang Didukung

Syntax highlighting tersedia untuk:

- `javascript` / `js`
- `typescript` / `ts`
- `jsx` / `tsx`
- `python` / `py`
- `java`
- `cpp` / `c++`
- `c`
- `csharp` / `cs`
- `php`
- `ruby`
- `go`
- `rust`
- `swift`
- `kotlin`
- `dart`
- `html`
- `css`
- `scss` / `sass`
- `json`
- `xml`
- `yaml`
- `sql`
- `bash` / `shell`
- `powershell`
- `markdown` / `md`
- Dan banyak lagi!

---

## 💡 Tips & Best Practices

### 1. Gunakan Baris Kosong
- **Selalu** pisahkan paragraf dengan baris kosong
- Pisahkan section dengan baris kosong untuk readability

### 2. Konsisten dengan Heading
```
# Judul Artikel (H1) - Hanya 1x
## Section Utama (H2)
### Sub-section (H3)
#### Detail (H4)
```

### 3. Gunakan Code Block untuk Semua Kode
- ❌ Jangan: Paste kode tanpa formatting
- ✅ Lakukan: Gunakan ` ``` ` dengan bahasa yang sesuai

### 4. Tambahkan Alt Text pada Gambar
```
![Deskripsi gambar yang jelas](url)
```

### 5. Preview Sebelum Publish
- Tulis di editor
- Preview hasilnya
- Cek format kode, link, gambar
- Baru publish

---

## ⚠️ Kesalahan Umum

### ❌ 1. Lupa Baris Kosong
```
Paragraf 1
Paragraf 2
```
Kedua baris akan jadi 1 paragraf!

### ❌ 2. Lupa Bahasa di Code Block
````
```
function hello() {
  console.log("Hello");
}
```
````
Tidak ada syntax highlighting!

### ❌ 3. Heading Tanpa Spasi
```
#Heading Salah
## Heading Benar
```

### ❌ 4. Nested Backticks
Jangan gunakan ` ``` ` di dalam inline code.

---

## 🚀 Contoh Artikel Lengkap

````
# Membangun Portfolio dengan Next.js dan TypeScript

Dalam artikel ini, saya akan berbagi pengalaman membangun portfolio website menggunakan Next.js 14 dengan TypeScript.

## Mengapa Next.js?

Next.js menawarkan beberapa keunggulan:

- **Server-Side Rendering (SSR)** untuk SEO yang lebih baik
- **Static Site Generation (SSG)** untuk performa maksimal
- **API Routes** untuk backend sederhana
- **Image Optimization** otomatis
- **TypeScript support** out of the box

## Setup Project

Pertama, buat project Next.js baru:

```bash
npx create-next-app@latest my-portfolio --typescript
cd my-portfolio
npm install
```

## Struktur Folder

Saya menggunakan struktur folder seperti ini:

```
app/
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ProjectCard.tsx
├── lib/
│   └── db.ts
├── types/
│   └── project.ts
└── page.tsx
```

## Membuat Component

Contoh component `ProjectCard`:

```tsx
interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
}

export default function ProjectCard({ 
  title, 
  description, 
  imageUrl, 
  technologies 
}: ProjectCardProps) {
  return (
    <div className="border rounded-lg p-6 hover:shadow-lg transition">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover rounded" />
      <h3 className="text-xl font-bold mt-4">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
      <div className="flex gap-2 mt-4">
        {technologies.map((tech) => (
          <span key={tech} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
```

## Database dengan MongoDB

Untuk menyimpan data project, saya gunakan MongoDB:

```typescript
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);

export async function getDatabase() {
  await client.connect();
  return client.db('portfolio');
}
```

## Kesimpulan

Dengan Next.js, TypeScript, dan MongoDB, kita bisa membuat portfolio yang:

1. ✅ Fast & SEO-friendly
2. ✅ Type-safe dengan TypeScript
3. ✅ Dynamic content dari database
4. ✅ Professional & modern design

> **Source code:** [GitHub Repository](https://github.com/gerynsb/my-portfolio)

---

**Tags:** #NextJS #TypeScript #MongoDB #Portfolio #WebDev
````

---

## 📚 Resources Tambahan

- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Flavored Markdown](https://github.github.com/gfm/)
- [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

---

*Happy Writing! 🎉*
