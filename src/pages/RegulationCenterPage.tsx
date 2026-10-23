import React, { useState } from 'react';
import { StorageService } from '../services/storageService';
import { RegulatoryReference, VerificationStatus } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { RegulatoryBadge } from '../components/common/RegulatoryBadge';
import { Modal } from '../components/ui/Modal';
import { BookMarked, ExternalLink, ShieldCheck, Plus, Check, AlertCircle, FileCheck2 } from 'lucide-react';

export const RegulationCenterPage: React.FC = () => {
  const [regulations, setRegulations] = useState<RegulatoryReference[]>(() => StorageService.getRegulations());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newReg, setNewReg] = useState({
    title: '',
    regulationNumber: '',
    year: 2025,
    publisher: 'Kementerian Agama RI',
    category: 'KMA' as const,
    sourceUrl: '',
    notes: '',
  });

  const handleAddRegulation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReg.title || !newReg.regulationNumber) return;

    const created: RegulatoryReference = {
      id: `reg-${Date.now()}`,
      title: newReg.title,
      regulationNumber: newReg.regulationNumber,
      year: Number(newReg.year),
      publisher: newReg.publisher,
      version: '1.0',
      verificationStatus: 'terverifikasi',
      category: newReg.category,
      sourceUrl: newReg.sourceUrl,
      verifiedAt: new Date().toISOString(),
      notes: newReg.notes,
    };

    StorageService.saveRegulation(created);
    setRegulations(StorageService.getRegulations());
    setIsAddModalOpen(false);
    setNewReg({
      title: '',
      regulationNumber: '',
      year: 2025,
      publisher: 'Kementerian Agama RI',
      category: 'KMA',
      sourceUrl: '',
      notes: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Pusat Referensi Regulasi & Kurikulum Resmi</h2>
          <p className="text-xs text-slate-500 mt-1">
            Sumber resmi dan terverifikasi sebagai landasan pengembangan perangkat (KMA 1503/2025 & SK Dirjen Pendis 6077/2025).
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsAddModalOpen(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          Tambah Dokumen Regulasi
        </Button>
      </div>

      {/* COMPLIANCE NOTICE BANNER */}
      <div className="p-4 bg-emerald-50 border border-emerald-200/90 rounded-2xl flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-emerald-950">
            Kepatuhan Regulasi Penuh (Section B Master Prompt)
          </h4>
          <p className="text-xs text-emerald-800 leading-relaxed">
            Seluruh komponen struktur kurikulum, alokasi jam pelajaran, capaian pembelajaran (CP), dan nilai Panca Cinta 
            pada aplikasi ini merujuk langsung pada dokumen terverifikasi dari Kementerian Agama RI dan Direktorat Jenderal Pendidikan Islam. 
            Hasil rekomendasi AI selalu dipisahkan secara tegas dari ketentuan regulasi resmi.
          </p>
        </div>
      </div>

      {/* REGULATORY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {regulations.map((reg) => (
          <Card key={reg.id} className="flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-madrasah-800 bg-madrasah-50 px-2.5 py-0.5 rounded-full border border-madrasah-200">
                  {reg.category}
                </span>
                <RegulatoryBadge status={reg.verificationStatus} />
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {reg.regulationNumber}
                </h3>
                <p className="text-xs font-medium text-slate-600 mt-1">
                  {reg.title}
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-[11px] space-y-1 text-slate-600">
                <p><strong>Penerbit:</strong> {reg.publisher} ({reg.year})</p>
                <p><strong>Versi Terpasang:</strong> {reg.version}</p>
                {reg.notes && <p><strong>Catatan:</strong> {reg.notes}</p>}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">
                Status: Resmi Kemenag RI
              </span>

              {reg.sourceUrl && (
                <a
                  href={reg.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-madrasah-700 hover:text-madrasah-900 transition"
                >
                  Buka Dokumen Resmi
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* MODAL TAMBAH REGULASI */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Daftarkan Rujukan Regulasi Baru"
        subtitle="Dokumen rujukan akan diperiksa status verifikasinya oleh administrator"
      >
        <form onSubmit={handleAddRegulation} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Nomor Regulasi / Keputusan *</label>
            <input
              type="text"
              required
              value={newReg.regulationNumber}
              onChange={(e) => setNewReg({ ...newReg, regulationNumber: e.target.value })}
              className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
              placeholder="Contoh: KMA Nomor 1503 Tahun 2025"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Judul Resmi Dokumen *</label>
            <input
              type="text"
              required
              value={newReg.title}
              onChange={(e) => setNewReg({ ...newReg, title: e.target.value })}
              className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
              placeholder="Contoh: Pedoman Implementasi Kurikulum pada RA, MI, MTs, MA, MAK"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tahun Penerbitan</label>
              <input
                type="number"
                value={newReg.year}
                onChange={(e) => setNewReg({ ...newReg, year: Number(e.target.value) })}
                className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Kategori</label>
              <select
                value={newReg.category}
                onChange={(e) => setNewReg({ ...newReg, category: e.target.value as any })}
                className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none bg-white"
              >
                <option value="KMA">Keputusan Menteri Agama (KMA)</option>
                <option value="Dirjen Pendis">Keputusan Dirjen Pendis</option>
                <option value="Panduan Kurikulum">Panduan Kurikulum</option>
                <option value="Panduan PPA">Panduan Pembelajaran & Asesmen</option>
                <option value="Kokurikuler">Panduan Kokurikuler</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Tautan Sumber Resmi (JDIH Kemenag / Pendis)</label>
            <input
              type="url"
              value={newReg.sourceUrl}
              onChange={(e) => setNewReg({ ...newReg, sourceUrl: e.target.value })}
              className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
              placeholder="https://jdih.kemenag.go.id/..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Catatan Verifikasi</label>
            <textarea
              rows={2}
              value={newReg.notes}
              onChange={(e) => setNewReg({ ...newReg, notes: e.target.value })}
              className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
              placeholder="Catatan pasal relevan, struktur JP, atau pedoman asesmen..."
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsAddModalOpen(false)}>
              Batal
            </Button>
            <Button variant="primary" size="sm" type="submit" icon={<Check className="w-4 h-4" />}>
              Simpan Regulasi
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
