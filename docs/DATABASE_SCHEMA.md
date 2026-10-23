# DOKUMENTASI STRUKTUR BASIS DATA POSTGRESQL / SUPABASE
## MADRASAH KBC LEARNING SUITE

### 1. Entitas Organisasi & Profil Madrasah
- `organizations`: Menyimpan identitas tenant (madrasah atau institusi pengelola).
- `school_profiles`: Data detail madrasah (NSM, NPSN, nama resmi, jenjang RA/MI/MTs/MA/MAK, status negeri/swasta, alamat lengkap, kop surat, logo, kontak).
- `organization_settings`: Konfigurasi lokal madrasah (zona waktu, format penomoran dokumen, preferensi kurikulum aktif).

### 2. Pengguna, Hak Akses & Personalia
- `user_profiles`: Data pengguna (NIP, gelar, nama lengkap, kontak, status aktif).
- `roles`: Master peran (super_admin, admin_madrasah, kepala_madrasah, wakamad_kurikulum, guru, pengawas, kolaborator).
- `permissions`: Daftar izin granular per aksi.
- `organization_members`: Pemetaan akun pengguna ke madrasah dan role yang dipegang.
- `teacher_assignments`: Penugasan mengajar guru berdasarkan kelas, mata pelajaran, dan tahun ajaran.

### 3. Kalender Akademik & Pengorganisasian Kelas
- `academic_years`: Tahun ajaran (contoh: 2026/2027) dengan status aktif/arsip.
- `semesters`: Semester (Ganjil / Genap) dan rentang tanggal aktif.
- `classes`: Rombongan belajar (tingkat 1-12, nama rombel, wali kelas).
- `subjects`: Mata pelajaran (PAI, Bahasa Arab, Umum, Pilihan/Kejuruan) dengan alokasi JP per minggu.

### 4. Kurikulum Resmi & Capaian Pembelajaran
- `curriculum_versions`: Versi kurikulum (misal: "KMA 1503/2025 - Kurikulum Madrasah").
- `curriculum_references`: Metadata regulasi resmi (KMA 1503/2025, SK Dirjen Pendis 6077/2025).
- `learning_outcomes`: Capaian Pembelajaran (CP) per fase dan mata pelajaran.
- `learning_objectives`: Tujuan Pembelajaran (TP) hasil perumusan.
- `learning_objective_flows`: Alur Tujuan Pembelajaran (ATP) dan urutan capaian.

### 5. Dokumen Pembelajaran & Perangkat Ajar
- `learning_documents`: Berkas dokumen (Modul Ajar, RPP, Prota, Promes, LKPD, Asesmen, dsb).
- `learning_document_versions`: Riwayat versi dokumen untuk audit dan pemulihan.
- `document_templates`: Template terstandar per jenis dokumen.
- `learning_activities`: Rincian kegiatan pembelajaran (pendahuluan, inti, penutup).
- `pancacinta_mappings`: Pemetaan integrasi Panca Cinta per dokumen / kegiatan.
- `deep_learning_mappings`: Pemetaan prinsip Deep Learning (mindful, meaningful, joyful).

### 6. Asesmen, Bank Soal & Bahan Ajar
- `assessments`: Paket asesmen (diagnostik, formatif, sumatif).
- `assessment_items`: Butir-butir soal (PG, Uraian, Menjodohkan, dsb).
- `answer_keys`: Kunci jawaban dan pembahasan butir soal.
- `assessment_rubrics`: Kriteria dan skala penskoran.
- `worksheets`: Lembar Kerja Peserta Didik (LKPD).
- `teaching_materials`: Bahan ajar / materi pendukung.
- `cocurricular_programs`: Perencanaan program kokurikuler madrasah.

### 7. Supervisi, Refleksi & Log Audit
- `document_reviews`: Catatan supervisi oleh Kepala Madrasah / Wakamad.
- `document_approvals`: Rekam jejak persetujuan resmi dokumen dengan timestamp dan catatan.
- `reflection_records`: Jurnal refleksi guru pasca-pembelajaran.
- `follow_up_plans`: Rencana tindak lanjut (remedial, pengayaan).
- `regulation_files`: File dokumen resmi (PDF/DOCX) Kemenag.
- `regulation_metadata`: Metadata ekstraksi dan status verifikasi regulasi.
- `ai_generation_logs`: Rekam jejak pembuatan dokumen oleh AI untuk transparansi & audit.
- `notifications`: Notifikasi sistem internal untuk pengingat dan status peninjauan.
- `audit_logs`: Log keamanan dan aktivitas penting sistem.
- `student_learning_records`: Catatan agregat perkembangan (anonim / terproteksi).
