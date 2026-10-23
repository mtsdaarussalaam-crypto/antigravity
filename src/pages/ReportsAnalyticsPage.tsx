import React, { useState } from 'react';
import { StorageService } from '../services/storageService';
import { ExportService } from '../services/exportService';
import { useAuth } from '../features/auth/AuthContext';
import { PancaCintaValue } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { PancaCintaBadge } from '../components/common/PancaCintaBadge';
import { 
  BarChart3, 
  FileDown, 
  Printer, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Users, 
  FileText,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

export const ReportsAnalyticsPage: React.FC = () => {
  const { schoolProfile } = useAuth();
  const documents = StorageService.getDocuments();
  const users = StorageService.getUsers().filter(u => u.role === 'guru');

  // Metrics
  const totalDocs = documents.length;
  const approvedDocs = documents.filter(d => d.status === 'approved').length;
  const reviewDocs = documents.filter(d => d.status === 'ready_for_review' || d.status === 'under_review').length;
  const revisionDocs = documents.filter(d => d.status === 'needs_revision').length;
  const draftDocs = documents.filter(d => d.status === 'draft').length;

  // Teacher breakdown
  const teacherStats = users.map(u => {
    const userDocs = documents.filter(d => d.authorId === u.id || d.authorName.includes(u.fullName.split(' ')[0]));
    const completed = userDocs.filter(d => d.status === 'approved').length;
    const pending = userDocs.filter(d => d.status === 'ready_for_review' || d.status === 'under_review').length;
    const rate = userDocs.length > 0 ? Math.round((completed / userDocs.length) * 100) : 0;
    return {
      teacherName: u.fullName,
      nip: u.nip || u.nuptk || 'Non-NIP',
      total: userDocs.length,
      completed,
      pending,
      rate,
    };
  });

  // Panca Cinta coverage
  const pancaCintaCounts: Record<PancaCintaValue, number> = {
    'Cinta Allah dan Rasul-Nya': 0,
    'Cinta Ilmu': 0,
    'Cinta Lingkungan': 0,
    'Cinta Diri dan Sesama Manusia': 0,
    'Cinta Tanah Air': 0,
  };

  documents.forEach(doc => {
    doc.pancaCintaValues?.forEach(val => {
      if (pancaCintaCounts[val] !== undefined) {
        pancaCintaCounts[val]++;
      }
    });
  });

  const handleExportXLSX = () => {
    const headers = [
      'Nama Pendidik',
      'NIP / NUPTK',
      'Total Perangkat Disusun',
      'Dokumen Disetujui (Sah)',
      'Menunggu Telaah',
      'Persentase Kelengkapan (%)',
    ];
    const rows = teacherStats.map(t => [
      t.teacherName,
      t.nip,
      t.total,
      t.completed,
      t.pending,
      `${t.rate}%`,
    ]);
    ExportService.downloadXlsx(
      `Rekap_Perangkat_Pembelajaran_${schoolProfile.officialName.replace(/\s+/g, '_')}`,
      'Rekapitulasi Madrasah',
      headers,
      rows
    );
  };

  const handleExportCSV = () => {
    const headers = ['Nama Pendidik', 'NIP', 'Total Dokumen', 'Disetujui', 'Menunggu', 'Ketercapaian'];
    const rows = teacherStats.map(t => [
      t.teacherName,
      t.nip,
      t.total,
      t.completed,
      t.pending,
      `${t.rate}%`,
    ]);
    ExportService.downloadCsv('Rekapitulasi_KBC_Madrasah', headers, rows);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Laporan & Rekapitulasi Pembelajaran Madrasah</h2>
          <p className="text-xs text-slate-500 mt-1">
            Rekap agregat kelengkapan perangkat ajar, status supervisi, dan sebaran integrasi Panca Cinta (Section T Master Prompt).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => window.print()} icon={<Printer className="w-4 h-4" />}>
            Cetak Laporan
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportCSV} icon={<FileDown className="w-4 h-4" />}>
            Ekspor CSV
          </Button>
          <Button variant="primary" size="sm" onClick={handleExportXLSX} icon={<FileDown className="w-4 h-4" />}>
            Ekspor XLSX Resmi
          </Button>
        </div>
      </div>

      {/* METRIC KPI CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-4 rounded-xl bg-white border border-slate-200">
          <p className="text-[11px] font-semibold text-slate-400 uppercase">Total Perangkat</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{totalDocs}</h3>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200">
          <p className="text-[11px] font-semibold text-emerald-600 uppercase">Telah Disahkan</p>
          <h3 className="text-2xl font-bold text-emerald-700 mt-1">{approvedDocs}</h3>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200">
          <p className="text-[11px] font-semibold text-amber-600 uppercase">Menunggu Telaah</p>
          <h3 className="text-2xl font-bold text-amber-700 mt-1">{reviewDocs}</h3>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200">
          <p className="text-[11px] font-semibold text-rose-600 uppercase">Perlu Revisi</p>
          <h3 className="text-2xl font-bold text-rose-700 mt-1">{revisionDocs}</h3>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200">
          <p className="text-[11px] font-semibold text-slate-500 uppercase">Draf Guru</p>
          <h3 className="text-2xl font-bold text-slate-700 mt-1">{draftDocs}</h3>
        </div>
      </div>

      {/* TWO COLUMNS: REKAP GURU VS SEBARAN PANCA CINTA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* REKAP KELENGKAPAN PER GURU (2 COLS) */}
        <div className="lg:col-span-2">
          <Card title="Rekapitulasi Kesiapan Perangkat per Pendidik">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-y border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Nama Pendidik</th>
                    <th className="py-3 px-4">NIP / NUPTK</th>
                    <th className="py-3 px-4 text-center">Disusun</th>
                    <th className="py-3 px-4 text-center">Disetujui</th>
                    <th className="py-3 px-4 text-center">Status Telaah</th>
                    <th className="py-3 px-4 text-right">Ketercapaian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {teacherStats.map((t, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4 font-bold text-slate-800">{t.teacherName}</td>
                      <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">{t.nip}</td>
                      <td className="py-3.5 px-4 text-center font-bold text-slate-800">{t.total}</td>
                      <td className="py-3.5 px-4 text-center font-bold text-emerald-700">{t.completed}</td>
                      <td className="py-3.5 px-4 text-center font-medium text-amber-700">
                        {t.pending > 0 ? `${t.pending} Dokumen` : '-'}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="font-bold text-madrasah-800 bg-madrasah-50 px-2 py-0.5 rounded border border-madrasah-200">
                          {t.rate}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* SEBARAN INTEGRASI PANCA CINTA (1 COL) */}
        <div>
          <Card title="Cakupan Integrasi Panca Cinta" subtitle="Sebaran nilai pada seluruh berkas perangkat">
            <div className="space-y-3 pt-1">
              {(
                [
                  'Cinta Allah dan Rasul-Nya',
                  'Cinta Ilmu',
                  'Cinta Lingkungan',
                  'Cinta Diri dan Sesama Manusia',
                  'Cinta Tanah Air',
                ] as PancaCintaValue[]
              ).map((val) => {
                const count = pancaCintaCounts[val];
                const pct = totalDocs > 0 ? Math.min(100, Math.round((count / totalDocs) * 100)) : 0;
                return (
                  <div key={val} className="p-3 rounded-xl border border-slate-100 bg-slate-50/60 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <PancaCintaBadge value={val} size="sm" />
                      <span className="font-bold text-slate-700">{count} Dokumen</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-madrasah-700 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
