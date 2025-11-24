# Panduan Mengatur Urutan Kategori & Project di Homepage

## 🎯 Dua Level Pengaturan Urutan

Portfolio Anda memiliki **dua level** pengaturan urutan yang sudah tersedia:

### Level 1: Urutan SECTION Kategori (Utama) ⭐
Mengatur urutan tampilan section kategori di homepage (Web Development, Mobile Development, dll)

### Level 2: Urutan Project dalam Kategori (Opsional)
Mengatur urutan individual project dalam setiap kategori

---

## 📋 LEVEL 1: Mengatur Urutan Section Kategori

### Cara Pertama: Menggunakan Tombol ↑↓ (Paling Mudah)

1. Login ke admin panel di `/gerynsbanps/login`
2. Pergi ke menu **Project Categories**
3. Gunakan tombol **↑ Up** dan **↓ Down** untuk memindahkan kategori:
   - Klik **↑ Up** untuk memindahkan kategori ke atas
   - Klik **↓ Down** untuk memindahkan kategori ke bawah
4. Perubahan langsung tersimpan!

**Contoh:**
- Jika Anda ingin **Mobile Development** tampil sebelum **Web Development**:
  1. Cari kategori "Mobile Development" di list
  2. Klik tombol **↑ Up** sampai berada di posisi paling atas
  3. Selesai! Section Mobile akan tampil duluan di homepage

### Cara Kedua: Edit Manual Order Number

1. Login ke admin panel di `/gerynsbanps/login`
2. Pergi ke menu **Project Categories**
3. Klik **Edit** pada kategori yang ingin diatur
4. Ubah field **Order (Display Priority)**:
   - **0** = Section tampil paling awal
   - **1** = Section tampil kedua
   - **2** = Section tampil ketiga
   - Dan seterusnya...
5. Klik **Save**

**Contoh Pengaturan:**
```
Web Development → Order: 0   (Tampil pertama)
Mobile Development → Order: 1   (Tampil kedua)
Desktop Apps → Order: 2   (Tampil ketiga)
```

**Hasil di Homepage:**
```
[Section: Web Development]
  - Project Web 1
  - Project Web 2
  
[Section: Mobile Development]
  - Project Mobile 1
  - Project Mobile 2
  
[Section: Desktop Apps]
  - Project Desktop 1
```

---

## 📋 LEVEL 2: Mengatur Urutan Project dalam Kategori (Opsional)

Jika Anda ingin project tertentu tampil duluan **dalam kategorinya**, ikuti langkah ini:

1. Login ke admin panel di `/gerynsbanps/login`
2. Pergi ke menu **Projects**
3. Klik **Edit** pada project yang ingin diatur
4. Di bagian **Links & Settings**, ubah field **Display Order**:
   - **0** = Tampil paling awal dalam kategori
   - **1** = Tampil kedua dalam kategori
   - **2** = Tampil ketiga dalam kategori
5. Klik **Save**

**Contoh:**
Dalam kategori "Web Development":
```
E-commerce Website → Order: 0   (Tampil pertama)
Portfolio Website → Order: 1    (Tampil kedua)
Blog Platform → Order: 2         (Tampil ketiga)
```

---

## 🔍 Cara Kerja Sistem

### Urutan Tampilan di Homepage:
1. **Pertama:** Diurutkan berdasarkan **Order Kategori** (Web duluan atau Mobile duluan)
2. **Kedua:** Dalam setiap kategori, project diurutkan berdasarkan **Order Project**
3. **Ketiga:** Jika order sama, diurutkan berdasarkan tanggal pembuatan (terbaru duluan)

### Visual di Homepage:
```
Homepage
├── [Section Order 0: Web Development]
│   ├── Project (Order 0)
│   ├── Project (Order 1)
│   └── Project (Order 2)
│
├── [Section Order 1: Mobile Development]
│   ├── Project (Order 0)
│   ├── Project (Order 1)
│   └── Project (Order 2)
│
└── [Section Order 2: Desktop Apps]
    ├── Project (Order 0)
    └── Project (Order 1)
```

---

## ✅ Catatan Penting

### Untuk Section Kategori:
- ✅ Tombol ↑↓ hanya terlihat di desktop (kolom Order)
- ✅ Di mobile, tombol "↑ Up" dan "↓ Down" muncul di bawah nama kategori
- ✅ Perubahan order otomatis memicu revalidasi homepage
- ✅ Section yang tidak punya project featured tidak akan tampil di homepage

### Untuk Project:
- ✅ Hanya project yang ditandai **Featured** yang tampil di homepage
- ✅ Project otomatis masuk ke section sesuai **kategorinya**
- ✅ Order project bersifat opsional (default: 0)

---

## 💡 Tips & Best Practices

1. **Gunakan Kelipatan 10** untuk order kategori:
   - Web: 0, Mobile: 10, Desktop: 20
   - Memudahkan jika ingin menyisipkan kategori baru di antaranya

2. **Untuk Kategori**, gunakan tombol ↑↓ lebih praktis daripada edit manual

3. **Untuk Project**, hanya atur order jika perlu menampilkan project tertentu lebih dulu

4. **Testing:** Setelah mengatur order, buka homepage di browser baru untuk melihat hasilnya

---

## 🐛 Troubleshooting

**Q: Section kategori tidak berubah urutannya?**
A: 
1. Pastikan kategori sudah memiliki minimal 1 project yang **Featured**
2. Refresh halaman homepage (Ctrl+F5)
3. Cek di admin apakah order sudah tersimpan dengan benar

**Q: Tombol ↑↓ tidak muncul?**
A: 
- Di desktop: Lihat kolom **Order** di sebelah kiri
- Di mobile: Scroll ke bawah nama kategori, ada tombol "↑ Up" dan "↓ Down"

**Q: Project tidak tampil di homepage?**
A:
1. Pastikan project ditandai sebagai **Featured** ✓
2. Pastikan kategori project sudah benar
3. Refresh homepage

---

## 📝 Ringkasan Singkat

**Untuk mengatur urutan section (Web duluan/Mobile duluan):**
→ Pergi ke **Project Categories** → Gunakan tombol **↑** dan **↓**

**Untuk mengatur urutan project dalam section:**
→ Edit project → Ubah **Display Order** di bagian Links & Settings

---

*Terakhir diupdate: 16 November 2025*
