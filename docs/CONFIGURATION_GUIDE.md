# MADRASAH KBC LEARNING SUITE — PANDUAN KONFIGURASI SISTEM
**Kepatuhan:** KMA No. 1503 Tahun 2025 & SK Dirjen Pendis No. 6077 Tahun 2025  
**Versi:** 1.0.0 Production Ready  

---

## 1. Arsitektur Konfigurasi Hybrid

Aplikasi dirancang dengan paradigma **Zero-Failure Hybrid Architecture**:
- **Mode Resilient Offline (Default)**: Jika Supabase belum dikonfigurasi atau koneksi internet terputus, aplikasi otomatis mengaktifkan repository lokal browser yang persisten. Seluruh fitur penyusunan perangkat, editor dokumen, bank soal, asesmen, skoring supervisi, dan ekspor berkas (DOCX, XLSX, CSV, PDF) tetap berfungsi 100%.
- **Mode Cloud Supabase (Enterprise)**: Ketika variabel `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` diisi dengan kredensial aktif, aplikasi otomatis mensinkronisasikan data ke database PostgreSQL dengan Row Level Security (RLS).

---

## 2. Variabel Lingkungan (.env)

Salin berkas `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```

Isi parameter konfigurasi berikut:

```ini
# ====================================================================
# SUPABASE BACKEND CONFIGURATION
# ====================================================================
# URL instans Supabase Anda
VITE_SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxx.supabase.co

# Kunci Anonim Publik (Client-Safe)
# PERINGATAN KEAMANAN: HANYA gunakan Anon Key. JANGAN PERNAH meletakkan service_role key di frontend!
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ====================================================================
# KONFIGURASI AI BACKEND
# ====================================================================
# Sesuai regulasi keamanan Section D: API Key AI diwajibkan dikelola pada Edge Function backend
VITE_AI_PROVIDER=default
```

---

## 3. Konfigurasi Row Level Security (RLS) & Multi-Tenant

Setiap tabel data madrasah pada database PostgreSQL dilindungi oleh aturan RLS per `organization_id`:

```sql
-- Memastikan pengguna hanya dapat melihat dan memodifikasi data organisasinya sendiri
CREATE POLICY documents_org_isolation ON learning_documents
    FOR ALL USING (organization_id IN (
        SELECT organization_id FROM organization_members WHERE user_id = auth.uid()
    ));
```

Tabel yang telah memiliki isolasi RLS aktif:
- `organizations`
- `school_profiles`
- `organization_settings`
- `organization_members`
- `academic_years`
- `semesters`
- `classes`
- `subjects`
- `teacher_assignments`
- `learning_documents`
- `assessments`
- `notifications`
- `audit_logs`

---

## 4. Konfigurasi Kop Surat Madrasah & Tanda Tangan

Kop surat resmi kementerian agama dan tanda tangan digital Kepala Madrasah diatur melalui:
1. Masuk sebagai **Admin Madrasah** atau **Kepala Madrasah**.
2. Buka menu **Profil Madrasah & Kop**.
3. Lengkapi Nomor Statistik Madrasah (NSM), NPSN, Kantor Kemenag Kabupaten/Kota, Alamat, dan Pejabat Penandatangan (Nama & NIP).
4. Hasil konfigurasi langsung tercermin pada cetak preview dan ekspor berkas Microsoft Word (.docx).
