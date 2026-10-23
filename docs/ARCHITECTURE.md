# ARSITEKTUR SISTEM: MADRASAH KBC LEARNING SUITE

## 1. Ringkasan Eksekutif
**Madrasah KBC Learning Suite** adalah platform web terpadu untuk perencanaan, pelaksanaan, asesmen, supervisi, dan refleksi pembelajaran di madrasah Indonesia berbasis:
1. **KMA Nomor 1503 Tahun 2025** (Perubahan atas KMA No 450 Tahun 2024 tentang Pedoman Implementasi Kurikulum pada RA, MI, MTs, MA, dan MAK).
2. **Keputusan Direktur Jenderal Pendidikan Islam Nomor 6077 Tahun 2025** tentang Panduan Kurikulum Berbasis Cinta (KBC).
3. **Prinsip Pembelajaran Mendalam (Deep Learning in Education)**: Mindful, Meaningful, Joyful (Memahami, Mengaplikasi, Merefleksi).

## 2. Prinsip Desain & Kepatuhan Regulasi
- **Regulatory Integrity**: Data kurikulum resmi (CP, struktur, alokasi waktu) dipisahkan dari usulan AI. Hasil generator AI selalu ditandai dengan status draft dan verifikasi.
- **Panca Cinta Integration**: Mengintegrasikan lima nilai Panca Cinta secara konkret dan teramati:
  1. Cinta Allah dan Rasul-Nya
  2. Cinta Ilmu
  3. Cinta Lingkungan
  4. Cinta Diri dan Sesama Manusia
  5. Cinta Tanah Air
- **Multi-Tenancy & Data Isolation**: Setiap madrasah (organization) memiliki data terisolasi menggunakan PostgreSQL Row Level Security (RLS).
- **Least Privilege Access Control**: Peran Super Admin, Admin Madrasah, Kepala Madrasah, Wakamad Kurikulum, Guru, Pengawas Madrasah, dan Kolaborator dibatasi sesuai kewenangan resmi.
- **Zero-Lockin / Offline-Resilient**: Aplikasi mendukung koneksi Supabase di cloud serta fallback storage lokal/mock terstruktur sehingga operasional tidak terhenti jika koneksi terputus.

## 3. Tech Stack
- **Frontend Core**: React 18, TypeScript 5, Vite 6
- **Styling & UI**: Tailwind CSS 3, Lucide Icons, Modern Islamic-EdTech Palette (Emerald, Deep Teal, Warm Gold, Clean Slate)
- **Backend & Database**: PostgreSQL 15+, Supabase (Auth, RLS, Storage, Functions)
- **State Management & Data Layer**: Modular Store & Repository Pattern dengan fallback offline engine
- **Testing**: Vitest untuk unit dan integrasi tes
- **Ekspor Dokumen**: DOCX, PDF, XLSX, CSV, JSON

## 4. Struktur Modul & Navigasi
```
Madrasah KBC Learning Suite
├── Modul 1: Autentikasi & Multi-Tenancy (RBAC, Multi-Madrasah, RLS)
├── Modul 2: Onboarding & Profil Madrasah (Kop, NSM, NPSN, Legalitas)
├── Modul 3: Manajemen Akademik (Tahun Ajaran, Semester, Kelas, Rombel, Guru)
├── Modul 4: Pusat Referensi Regulasi (KMA 1503/2025, SK Dirjen Pendis 6077/2025)
├── Modul 5: Dashboard Terpadu (KPI, Tracker Dokumen, Kalender, Notifikasi)
├── Modul 6: Kurikulum & CP/TP/ATP (Terstruktur sesuai Jenjang RA-MAK)
├── Modul 7: Generator KBC & Deep Learning (Integrasi Panca Cinta konkret)
├── Modul 8: Editor & Workflow Persetujuan (Supervisi Kepala Madrasah/Wakamad)
└── Modul 9: Laporan & Ekspor Berkas (DOCX, PDF, XLSX)
```
