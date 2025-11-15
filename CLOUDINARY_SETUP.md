# Panduan Lengkap Setup Cloudinary

## 📝 Langkah-langkah Mendapatkan Cloudinary Credentials

### 1. Buat Akun Cloudinary (GRATIS)

1. Kunjungi https://cloudinary.com/users/register_free
2. Isi form registrasi:
   - Email
   - Password
   - Nama
3. Klik **"Sign Up"**
4. Verifikasi email Anda

### 2. Login ke Dashboard

1. Login di https://console.cloudinary.com/
2. Anda akan langsung masuk ke Dashboard

### 3. Dapatkan API Credentials

Di halaman Dashboard, Anda akan melihat:

```
Cloud name: your_cloud_name_here
API Key: 123456789012345
API Secret: sET6TRmybcIsT1siuLTu69h2hFo (HIDE/SHOW button)
```

**PENTING**: 
- **Cloud Name** - terlihat di bagian atas (contoh: `dxyz1234`)
- **API Key** - angka panjang (contoh: `123456789012345`)
- **API Secret** - klik tombol "Reveal" untuk melihat (sudah Anda dapatkan: `sET6TRmybcIsT1siuLTu69h2hFo`)

### 4. Copy Credentials ke .env.local

Update file `.env.local` Anda:

```env
CLOUDINARY_CLOUD_NAME=dxyz1234
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=sET6TRmybcIsT1siuLTu69h2hFo
```

## 🖼️ Cara Upload Gambar

### Metode 1: Manual Upload (Recommended untuk sekarang)

1. Login ke Cloudinary Dashboard
2. Klik **"Media Library"** di sidebar kiri
3. Klik tombol **"Upload"**
4. Pilih gambar dari komputer Anda
5. Setelah upload selesai, klik gambar tersebut
6. Copy **"Secure URL"** - contoh:
   ```
   https://res.cloudinary.com/dxyz1234/image/upload/v1234567890/sample.jpg
   ```
7. Paste URL ini di form admin (Hero Image URL, Project Thumbnail, Article Cover, dll)

### Metode 2: Upload via API (Advanced - Coming Soon)

File API upload sudah tersedia di `/api/upload`, tapi belum ada UI button di admin panel.

**Untuk menambahkan tombol upload di form:**

1. Tambahkan input file di form component
2. Convert image ke base64
3. Kirim ke `/api/upload`
4. Dapatkan URL hasil upload
5. Set URL ke field yang diinginkan

## 📁 Struktur Folder di Cloudinary

Cloudinary secara otomatis akan membuat folder:
- `portfolio/` - untuk semua gambar portfolio
- `portfolio/projects/` - khusus untuk project images
- `portfolio/articles/` - khusus untuk article covers

Anda bisa atur ini di code atau manual di dashboard.

## 💡 Tips & Best Practices

1. **Optimize Images Before Upload**
   - Resize ke ukuran yang sesuai (jangan upload 5MB untuk thumbnail)
   - Recommended sizes:
     - Hero Image: 1920x1080px
     - Project Thumbnail: 800x600px
     - Article Cover: 1200x630px

2. **Use Descriptive Filenames**
   - ❌ Bad: `IMG_1234.jpg`
   - ✅ Good: `project-kotlin-app-thumbnail.jpg`

3. **Free Plan Limits**
   - 25 GB storage
   - 25 GB bandwidth/month
   - Unlimited transformations
   - Ini cukup untuk portfolio personal!

## 🔧 Transformasi URL (Advanced)

Cloudinary bisa transform gambar langsung dari URL:

```
Original:
https://res.cloudinary.com/demo/image/upload/sample.jpg

Resize to 300x300:
https://res.cloudinary.com/demo/image/upload/w_300,h_300,c_fill/sample.jpg

Blur:
https://res.cloudinary.com/demo/image/upload/e_blur:300/sample.jpg
```

Dokumentasi lengkap: https://cloudinary.com/documentation/image_transformations

## ❓ Troubleshooting

### Error: "Invalid API credentials"
- Pastikan tidak ada spasi di `.env.local`
- Pastikan `CLOUDINARY_CLOUD_NAME` benar (cek dashboard)
- Restart development server (`npm run dev`)

### Gambar tidak muncul di website
- Cek URL sudah benar (harus `https://`)
- Pastikan gambar di Cloudinary sudah public
- Buka URL di browser untuk test

### Upload gagal
- Cek format file (JPG, PNG, GIF, WEBP supported)
- Cek ukuran file (max 10MB untuk free plan)
- Cek API Secret sudah benar

## 🎯 Next Steps

Setelah setup Cloudinary:

1. ✅ Upload hero image untuk homepage
2. ✅ Upload beberapa project thumbnails
3. ✅ Test di admin panel → Settings → Hero Image URL
4. ✅ Lihat hasilnya di homepage!

---

**Need Help?**
- Cloudinary Docs: https://cloudinary.com/documentation
- Support: https://support.cloudinary.com/
