# MATRIKS ROLE DAN HAK AKSES (RBAC)
## MADRASAH KBC LEARNING SUITE

| Fitur / Modul | Super Admin | Admin Madrasah | Kepala Madrasah | Wakamad Kurikulum | Guru | Pengawas | Kolaborator |
|---|---|---|---|---|---|---|---|
| Konfigurasi Global & Multi-Tenant | RW | - | - | - | - | - | - |
| Pengaturan Profil Madrasah & Kop | RW | RW | R | R | R | - | - |
| Manajemen Pengguna & Penugasan | RW | RW | R | R | - | - | - |
| Kalender & Tahun Ajaran | RW | RW | R | RW | R | R | - |
| Pusat Referensi Regulasi | RW | RW | R | R | R | R | R |
| Dashboard Madrasah (Agregat) | RW | RW | RW | RW | - | R | - |
| Dashboard Guru (Personal) | - | - | - | - | RW | - | - |
| Buat & Sunting Perangkat Sendiri | - | - | - | - | RW | - | - |
| Generator KBC & Deep Learning | - | - | - | - | RW | - | R* |
| Bank Soal & Asesmen Sendiri | - | - | - | - | RW | - | - |
| Ajukan Dokumen untuk Review | - | - | - | - | RW | - | - |
| Review & Beri Catatan Supervisi | - | - | RW | RW | - | RW (catatan) | - |
| Persetujuan Dokumen (Approval) | - | RW | RW | R | - | - | - |
| Pengarsipan Dokumen | RW | RW | R | R | R | - | - |
| Laporan & Rekapitulasi Pembelajaran | RW | RW | RW | RW | R (pribadi) | R | - |

*Keterangan*:
- **RW**: Read & Write (Akses penuh baca, buat, edit, hapus)
- **R**: Read Only (Akses baca / tinjau)
- **-**: Tidak memiliki akses
- **R\***: Kolaborator tamu hanya bisa melihat/mengedit dokumen yang secara spesifik dibagikan kepadanya.
