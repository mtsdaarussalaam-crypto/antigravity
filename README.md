# MADRASAH KBC LEARNING SUITE
**Perangkat Pembelajaran Lengkap, Bermakna, Mendalam, dan Berbasis Cinta**

Aplikasi web modern terpadu untuk perencanaan, pelaksanaan, asesmen, supervisi, dan refleksi pembelajaran di madrasah Indonesia (**RA, MI, MTs, MA, MAK**) berdasarkan standar regulasi resmi Kementerian Agama Republik Indonesia.

---

## 🏛️ Landasan Regulasi & Kebijakan Resmi

Aplikasi dibangun dengan landasan hukum resmi yang dapat diverifikasi:
1. **KMA Nomor 1503 Tahun 2025** tentang Perubahan atas KMA Nomor 450 Tahun 2024 mengenai Pedoman Implementasi Kurikulum pada RA, MI, MTs, MA, dan MAK.
2. **Keputusan Direktur Jenderal Pendidikan Islam Nomor 6077 Tahun 2025** tentang Panduan Kurikulum Berbasis Cinta (KBC).
3. **Panduan Pembelajaran dan Asesmen (PPA) Madrasah 2025** (Ditjen Pendis / KSKK Madrasah).
4. **Panduan Kokurikuler Berbasis Proyek Penguatan Karakter Madrasah (P5-PPRA KBC) 2025**.

> [!IMPORTANT]
> **Prinsip Integritas Regulasi**: Seluruh ketentuan kurikulum resmi berstatus `isOfficial: true` dan `isVerified: true` dipisahkan secara tegas dari rekomendasi pedagogis AI (`isAiGenerated: true`, `isVerified: false`). Rekomendasi AI wajib ditelaah oleh pendidik profesional sebelum disahkan.

---

## 🌟 5 Nilai Inti Panca Cinta (SK Dirjen Pendis 6077/2025)
1. **Cinta Allah dan Rasul-Nya**: Kesadaran tauhid, ibadah berkesadaran (*mindful*), dan keteladanan akhlak karimah.
2. **Cinta Ilmu**: Bernalar kritis, literasi kontekstual, rasa ingin tahu mendalam, dan kejujuran akademis.
3. **Cinta Lingkungan**: Kepedulian ekologis, konservasi sumber daya alam (air, energi), dan madrasah hijau (*Green Madrasah*).
4. **Cinta Diri dan Sesama Manusia**: Empati sosial, toleransi (*tasamuh*), adab pergaulan, dan kolaborasi bermakna.
5. **Cinta Tanah Air**: Moderasi beragama, komitmen kebangsaan, dan persatuan dalam keberagaman Indonesia.

---

## 🧩 Pendekatan Pembelajaran Mendalam (Deep Learning in Education)
- **Mindful Learning**: Pembelajaran berkesadaran penuh, fokus, dan hadir seutuhnya.
- **Meaningful Learning**: Pembelajaran bermakna yang kontekstual dan menjawab tantangan nyata.
- **Joyful Learning**: Pembelajaran menyenangkan yang menumbuhkan motivasi intrinsik santri.
- **Siklus Pengalaman Kognitif**: Memahami ➔ Mengaplikasikan ➔ Merefleksikan.

---

## 🛠️ Tech Stack & Arsitektur
- **Frontend Core**: React 18, TypeScript 5, Vite 6
- **Styling**: Tailwind CSS 3 (Nuansa Hijau Madrasah, Emas Edukatif, dan Slate Modern)
- **Icons**: Lucide React
- **Basis Data**: PostgreSQL 15+ / Supabase (40 tabel, Row Level Security terisolasi per `organization_id`)
- **Resilient Engine**: Zero-Lockin local storage repository sehingga sistem dapat dijalankan seketika tanpa koneksi database eksternal.
- **Layanan Ekspor**: WordprocessingML (.docx) dengan Kop Resmi Kemenag, SpreadsheetML (.xlsx) bergaris & berwarna, RFC 4180 CSV dengan UTF-8 BOM, dan Layout PDF siap cetak.
- **Testing & Quality Assurance**: Vitest & ESLint 9 (28/28 Unit & Integration Tests Passed).

---

## 🧭 Peta Situs & 14 Modul Navigasi Lengkap

1. **Dashboard Terpadu**: Metrik madrasah, status perangkat, dan indikator Panca Cinta.
2. **Pusat Regulasi Kemenag**: Repositori KMA 1503/2025 dan SK Dirjen Pendis 6077/2025.
3. **Capaian Pembelajaran (CP)**: Database CP resmi terverifikasi Fase A–F per mata pelajaran.
4. **Alur Tujuan Pembelajaran (ATP)**: Penurunan CP menjadi TP terstruktur dan alokasi jam.
5. **Generator Modul Ajar**: Generator otomatis berbasis Panca Cinta & Deep Learning.
6. **Program Tahunan (Prota)**: Distribusi materi dan pekan efektif per semester.
7. **Program Semester (Promes)**: Matriks pekanan pembelajaran madrasah.
8. **Daftar Perangkat Saya**: Manajemen dokumen modul ajar yang telah dibuat.
9. **Editor Dokumen**: Ruang penyuntingan interaktif, autosave, snapshot versioning (`v1.0`, `v2.0`).
10. **Bahan Ajar & LKPD**: Lembar kerja peserta didik kontekstual berbasis studi kasus nyata.
11. **Bank Soal & Asesmen**: Butir soal HOTS (PG, PG Kompleks, Uraian) terhubung pilar cinta.
12. **Kokurikuler (P5-PPRA)**: 5 tahapan proyek karakter dengan rubrik 4 jenjang capaian.
13. **Supervisi & Persetujuan**: Skoring instrumen KMA 1503 dan tanda tangan digital Kepala Madrasah.
14. **Laporan & Analitik**: Statistik agregat kurikulum dan ekspor rekapitulasi data.

---

## 🚀 Panduan Menjalankan Aplikasi Secara Lokal

### 1. Prasyarat
- Node.js versi 18+ atau 22+
- npm versi 9+

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Menjalankan Server Pengembangan (Dev Server)
```bash
npm run dev
```
Buka browser pada: `http://localhost:5173`.

### 4. Menjalankan Seluruh Pengujian Otomatis (Vitest)
```bash
npm test
```
*Hasil: 28 pengujian lolos (100% Passed) mencakup Foundation, Kurikulum KBC, Ekspor Dokumen Fisik, RLS, dan Isolasi Multi-Tenant.*

### 5. Menjalankan Linter
```bash
npm run lint
```
*Hasil: 0 error.*

### 6. Melakukan Build Produksi
```bash
npm run build
```
Bundle produksi tersimpan pada direktori `dist/` (teroptimasi gzip ~106 kB).

---

## 📖 Dokumentasi Lanjutan

- [Panduan Konfigurasi Sistem (docs/CONFIGURATION_GUIDE.md)](docs/CONFIGURATION_GUIDE.md)
- [Panduan Deployment Produksi (docs/DEPLOYMENT.md)](docs/DEPLOYMENT.md)
- [Panduan Pencadangan & Pemulihan Bencana (docs/BACKUP_AND_RECOVERY.md)](docs/BACKUP_AND_RECOVERY.md)
- [Arsitektur Sistem (docs/ARCHITECTURE.md)](docs/ARCHITECTURE.md)
- [Spesifikasi Skema Basis Data 40 Tabel (docs/DATABASE_SCHEMA.md)](docs/DATABASE_SCHEMA.md)
- [Matriks Hak Akses Peran RBAC (docs/RBAC_MATRIX.md)](docs/RBAC_MATRIX.md)
- [Skema Migrasi PostgreSQL Supabase (supabase/migrations/20261023000001_initial_schema.sql)](supabase/migrations/20261023000001_initial_schema.sql)

---

## 👥 Pengujian 7 Peran Pengguna (RBAC Switcher)
Gunakan dropdown pemilih peran di bilah atas aplikasi untuk beralih peran seketika:
- **Super Admin**: Konfigurasi global sistem & tenant madrasah.
- **Admin Madrasah**: Pengaturan profil madrasah, kop surat, data guru, rombel, dan mapel.
- **Kepala Madrasah**: Supervisi, telaah, catatan pimpinan, skoring KMA 1503, dan pengesahan digital.
- **Wakamad Kurikulum**: Pemeriksaan kelengkapan kurikulum, kalender akademik, dan rekapitulasi.
- **Guru Mata Pelajaran**: Penyusunan modul ajar KBC, LKPD, bank soal, dan evaluasi pembelajaran.
- **Pengawas Madrasah**: Supervisi pembinaan eksternal dan rekomendasi tindak lanjut.
- **Kolaborator**: Pembelajaran kolaboratif antar-guru madrasah.
