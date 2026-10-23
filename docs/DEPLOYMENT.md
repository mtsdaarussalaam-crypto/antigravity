# MADRASAH KBC LEARNING SUITE — PANDUAN DEPLOYMENT PRODUKSI
**Platform:** Web App (React 18 + TypeScript + Vite + Supabase PostgreSQL)  
**Versi:** 1.0.0  

---

## 1. Persiapan Database (Supabase)

1. Buat proyek baru di [Supabase Dashboard](https://supabase.com).
2. Buka menu **SQL Editor**.
3. Buka berkas migrasi:
   [`supabase/migrations/20261023000001_initial_schema.sql`](file:///e:/MY%20DATA/APLIKASI/ANTIGRAVITY/BELAJAR/GENERATOR%20KBC/supabase/migrations/20261023000001_initial_schema.sql)
4. Salin seluruh isi skema dan jalankan (*Run*).
5. Konfirmasi tabel terbuat (40 tabel), ENUM terdefinisi, RLS policies aktif, dan seed data regulasi resmi (KMA 1503/2025 dan SK 6077/2025) berhasil dimasukkan.
6. Catat `Project URL` dan `Project API Anon Key` dari menu **Settings > API**.

---

## 2. Opsi Deployment Frontend

### Opsi A: Deployment ke Vercel (Rekomendasi Cepat)

1. Hubungkan repositori Git Anda ke dashboard [Vercel](https://vercel.com).
2. Konfigurasi proyek:
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Tambahkan Environment Variables di Vercel:
   - `VITE_SUPABASE_URL` = `https://<project-ref>.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `<anon-key>`
4. Klik **Deploy**.

Konfigurasi rewrite SPA di `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

### Opsi B: Deployment ke Docker & Nginx (On-Premise / VPS Madrasah)

Buat berkas `Dockerfile`:
```dockerfile
# Tahap 1: Build Aplikasi
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Tahap 2: Serving dengan Nginx Alpine
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Buat berkas `nginx.conf`:
```nginx
server {
    listen 80;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}
```

Jalankan container:
```bash
docker build -t madrasah-kbc-suite:1.0 .
docker run -d -p 80:80 --name kbc-suite madrasah-kbc-suite:1.0
```

---

## 3. Checklist Verifikasi Pasca-Deployment

- [ ] Laman utama dapat diakses dengan responsif di browser desktop dan ponsel.
- [ ] Fitur Switcher Peran (Super Admin, Kepala Madrasah, Wakamad, Guru) berjalan lancar.
- [ ] Generator Modul Ajar menghasilkan RPP/Modul dengan Panca Cinta & Deep Learning.
- [ ] Ekspor DOCX mengunduh dokumen WordprocessingML ber-Kop Madrasah resmi.
- [ ] Ekspor XLSX dan CSV terbuka dengan format tabel rapi di Microsoft Excel.
- [ ] Riwayat versi dokumen (*versioning*) dan fitur *Autosave* berjalan normal.
