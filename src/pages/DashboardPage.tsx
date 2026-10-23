import React from 'react';
import { useAuth } from '../features/auth/AuthContext';
import { StorageService } from '../services/storageService';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { PancaCintaBadge } from '../components/common/PancaCintaBadge';
import { RegulatoryBadge } from '../components/common/RegulatoryBadge';
import { 
  FileText, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Heart, 
  BookOpen, 
  ShieldCheck, 
  Calendar, 
  ArrowUpRight,
  Plus,
  Users,
  Building2,
  FileCheck
} from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (tab: string) => void;
  onOpenOnboarding: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigate,
  onOpenOnboarding,
}) => {
  const { user, role, schoolProfile } = useAuth();
  const documents = StorageService.getDocuments();
  const academicYears = StorageService.getAcademicYears();
  const semesters = StorageService.getSemesters();
  const activeYear = academicYears.find(y => y.isActive) || academicYears[0];
  const activeSem = semesters.find(s => s.isActive) || semesters[0];
  const users = StorageService.getUsers();

  // Metrics
  const totalDocs = documents.length;
  const readyReviewDocs = documents.filter(d => d.status === 'ready_for_review' || d.status === 'under_review').length;
  const revisionDocs = documents.filter(d => d.status === 'needs_revision').length;
  const approvedDocs = documents.filter(d => d.status === 'approved').length;

  return (
    <div className="space-y-6">
      {/* WELCOME BANNER WITH MADRASAH IDENTITY */}
      <div className="bg-gradient-to-r from-madrasah-900 via-madrasah-800 to-emerald-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 transform skew-x-12 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gold-400/20 text-gold-300 border border-gold-400/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-300" />
                Madrasah KBC Learning Suite • KMA 1503/2025
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
                Jenjang {schoolProfile.level}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Assalamu'alaikum, {user.fullName}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-2xl">
              Selamat datang di sistem perencanaan & perangkat pembelajaran berbasis Kurikulum Berbasis Cinta (KBC) dan Pembelajaran Mendalam di {schoolProfile.officialName}.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="gold"
              size="sm"
              onClick={() => onNavigate('generator')}
              icon={<Sparkles className="w-4 h-4 text-slate-950" />}
            >
              Buka Generator KBC
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('curriculum')}
              icon={<BookOpen className="w-4 h-4" />}
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
            >
              Kurikulum & CP
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenOnboarding}
              icon={<Building2 className="w-4 h-4" />}
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
            >
              Konfigurasi Madrasah
            </Button>
          </div>
        </div>

        {/* ACADEMIC STATUS STRIP */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-emerald-200">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gold-400" />
              Tahun Ajaran: <strong>{activeYear?.name || '2026/2027'}</strong>
            </span>
            <span>•</span>
            <span>
              Semester: <strong>{activeSem?.name || 'Semester Ganjil'}</strong>
            </span>
            <span>•</span>
            <span>
              Kepala Madrasah: <strong>{schoolProfile.headmasterName}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-emerald-200">KMA 1503/2025 Aktif</span>
          </div>
        </div>
      </div>

      {/* KPI METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:border-slate-300 transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Total Perangkat Ajar</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{totalDocs}</h3>
              <p className="text-[11px] text-slate-400 mt-1">Modul Ajar, RPP, LKPD & Asesmen</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-madrasah-50 text-madrasah-700 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card className="hover:border-slate-300 transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Siap Ditinjau / Supervisi</p>
              <h3 className="text-2xl font-bold text-amber-600 mt-1">{readyReviewDocs}</h3>
              <p className="text-[11px] text-amber-600/80 mt-1">Menunggu telaah Kamad/Wakamad</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card className="hover:border-slate-300 transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Perlu Revisi</p>
              <h3 className="text-2xl font-bold text-rose-600 mt-1">{revisionDocs}</h3>
              <p className="text-[11px] text-rose-600/80 mt-1">Catatan masukan pimpinan</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card className="hover:border-slate-300 transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Telah Disetujui (Sah)</p>
              <h3 className="text-2xl font-bold text-emerald-600 mt-1">{approvedDocs}</h3>
              <p className="text-[11px] text-emerald-600/80 mt-1">Siap pakai & diarsipkan</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
        </Card>
      </div>

      {/* TWO COLUMN GRID: PANCA CINTA & RECENT DOCUMENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT 2 COLS: RECENT DOCUMENTS & QUICK ACTIONS */}
        <div className="lg:col-span-2 space-y-6">
          <Card
            title="Perangkat Pembelajaran Terkini"
            subtitle="Daftar dokumen perencanaan pembelajaran yang terdaftar di sistem madrasah"
            action={
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('documents')}
                icon={<ArrowUpRight className="w-4 h-4" />}
              >
                Semua Dokumen
              </Button>
            }
          >
            <div className="divide-y divide-slate-100">
              {documents.slice(0, 4).map((doc) => (
                <div key={doc.id} className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold text-slate-800 hover:text-madrasah-700 cursor-pointer">
                        {doc.title}
                      </span>
                      <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        {doc.subjectName}
                      </span>
                      {doc.className && (
                        <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                          {doc.className}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">
                      Penyusun: <strong>{doc.authorName}</strong> • Alokasi: {doc.timeAllocation || '4 JP'}
                    </p>
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      {doc.pancaCintaValues.map((val) => (
                        <PancaCintaBadge key={val} value={val} size="sm" />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {doc.status === 'approved' && <Badge variant="success">Disetujui Sah</Badge>}
                    {doc.status === 'ready_for_review' && <Badge variant="warning">Siap Ditinjau</Badge>}
                    {doc.status === 'needs_revision' && <Badge variant="danger">Perlu Revisi</Badge>}
                    {doc.status === 'draft' && <Badge variant="default">Draf Awal</Badge>}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* QUICK SHORTCUTS CARD */}
          <Card title="Aksi Cepat Perangkat Pembelajaran & Manajemen">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <button
                onClick={() => onNavigate('generator')}
                className="p-3 rounded-xl border border-gold-300 bg-gold-50/50 hover:bg-gold-100/70 transition text-left group"
              >
                <Sparkles className="w-5 h-5 text-gold-700 mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-semibold text-slate-800">Generator KBC</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Modul Ajar KMA 1503</p>
              </button>

              <button
                onClick={() => onNavigate('curriculum')}
                className="p-3 rounded-xl border border-slate-200 hover:border-madrasah-500 hover:bg-madrasah-50/50 transition text-left group"
              >
                <BookOpen className="w-5 h-5 text-madrasah-700 mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-semibold text-slate-800">Kurikulum & CP</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Rumusan TP & ATP</p>
              </button>

              <button
                onClick={() => onNavigate('pancacinta')}
                className="p-3 rounded-xl border border-slate-200 hover:border-madrasah-500 hover:bg-madrasah-50/50 transition text-left group"
              >
                <Heart className="w-5 h-5 text-rose-600 mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-semibold text-slate-800">KBC & Deep Learn</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Matriks Panca Cinta</p>
              </button>

              <button
                onClick={() => onNavigate('school-profile')}
                className="p-3 rounded-xl border border-slate-200 hover:border-madrasah-500 hover:bg-madrasah-50/50 transition text-left group"
              >
                <Building2 className="w-5 h-5 text-madrasah-700 mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-semibold text-slate-800">Profil & Kop</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Edit kop & pimpinan</p>
              </button>

              <button
                onClick={() => onNavigate('academic')}
                className="p-3 rounded-xl border border-slate-200 hover:border-madrasah-500 hover:bg-madrasah-50/50 transition text-left group"
              >
                <Calendar className="w-5 h-5 text-madrasah-700 mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-semibold text-slate-800">Kelas & Rombel</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Tingkat 7-9 / 10-12</p>
              </button>

              <button
                onClick={() => onNavigate('regulations')}
                className="p-3 rounded-xl border border-slate-200 hover:border-madrasah-500 hover:bg-madrasah-50/50 transition text-left group"
              >
                <ShieldCheck className="w-5 h-5 text-madrasah-700 mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-semibold text-slate-800">Pusat Regulasi</p>
                <p className="text-[10px] text-slate-400 mt-0.5">KMA 1503 & KBC 6077</p>
              </button>
            </div>
          </Card>
        </div>

        {/* RIGHT COL: REGULATORY & PANCA CINTA INTEGRATION STATS */}
        <div className="space-y-6">
          {/* REGULATORY COMPLIANCE CARD */}
          <Card title="Landasan Regulasi Resmi" subtitle="Kepatuhan Section B Master Prompt">
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-slate-800">KMA No. 1503 Tahun 2025</span>
                  <RegulatoryBadge status="terverifikasi" />
                </div>
                <p className="text-[11px] text-slate-500">
                  Perubahan KMA 450/2024: Pedoman Implementasi Kurikulum RA, MI, MTs, MA, MAK.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-slate-800">SK Dirjen Pendis 6077/2025</span>
                  <RegulatoryBadge status="terverifikasi" />
                </div>
                <p className="text-[11px] text-slate-500">
                  Panduan Kurikulum Berbasis Cinta (KBC): Integrasi Panca Cinta pada proses pembelajaran.
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                onClick={() => onNavigate('regulations')}
              >
                Buka Pusat Referensi Lengkap
              </Button>
            </div>
          </Card>

          {/* PANCA CINTA CORE VALUES CARD */}
          <Card title="Integrasi Panca Cinta" subtitle="SK Dirjen Pendis Nomor 6077 Tahun 2025">
            <div className="space-y-2.5">
              {[
                { title: 'Cinta Allah dan Rasul-Nya', desc: 'Fondasi keimanan & keteladanan akhlak', count: 4 },
                { title: 'Cinta Ilmu', desc: 'Semangat bernalar kritis, literasi & rasa ingin tahu', count: 6 },
                { title: 'Cinta Lingkungan', desc: 'Kepedulian ekologis, konservasi & madrasah hijau', count: 5 },
                { title: 'Cinta Diri dan Sesama Manusia', desc: 'Empati, toleransi, adab & kolaborasi', count: 5 },
                { title: 'Cinta Tanah Air', desc: 'Moderasi beragama & komitmen kebangsaan', count: 3 },
              ].map((item) => (
                <div key={item.title} className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-xs font-semibold text-slate-800">{item.title}</p>
                    <p className="text-[10px] text-slate-500">{item.desc}</p>
                  </div>
                  <span className="text-xs font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-madrasah-800 shadow-2xs">
                    {item.count} dok
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
