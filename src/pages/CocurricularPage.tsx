import React, { useState } from 'react';
import { CocurricularService } from '../services/cocurricularService';
import { ExportService } from '../services/exportService';
import { useAuth } from '../features/auth/AuthContext';
import { CocurricularProject, CocurricularTheme, PancaCintaValue } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { PancaCintaBadge } from '../components/common/PancaCintaBadge';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  Plus, 
  Check, 
  FileDown, 
  Printer, 
  Users, 
  Target,
  Layers
} from 'lucide-react';

export const CocurricularPage: React.FC = () => {
  const { schoolProfile } = useAuth();
  const [projects, setProjects] = useState<CocurricularProject[]>(() => CocurricularService.getProjects());
  const [selectedProject, setSelectedProject] = useState<CocurricularProject>(projects[0]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Project Form
  const [newProj, setNewProj] = useState({
    title: '',
    theme: 'Gaya Hidup Berkelanjutan' as CocurricularTheme,
    durationWeeks: 4,
    coordinatorName: '',
  });

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProj.title) return;

    const created: CocurricularProject = {
      id: `proj-${Date.now()}`,
      title: newProj.title,
      academicYear: '2026/2027',
      theme: newProj.theme,
      targetPhase: 'D',
      durationWeeks: Number(newProj.durationWeeks),
      dimensions: ['Beriman dan Bertakwa', 'Gotong Royong', 'Bernalar Kritis', 'Berkeadaban (Ta’addub)'],
      pancaCintaFocus: ['Cinta Lingkungan', 'Cinta Ilmu'],
      objectives: ['Membangun karakter santri peduli sesama dan berakhlak mulia.'],
      stages: [
        {
          stageName: 'Tahap 1: Pengenalan & Mindful Reflection',
          activities: ['Tadabbur makna dan observasi isu.'],
          allocatedHours: 12,
        },
        {
          stageName: 'Tahap 2: Aksi Nyata Kolaboratif',
          activities: ['Pembuatan produk dan kampanye madrasah.'],
          allocatedHours: 20,
        },
      ],
      rubric: [
        {
          dimension: 'Dimensi Karakter KBC',
          mulaiBerkembang: 'Masih membutuhkan bimbingan langsung.',
          sedangBerkembang: 'Mampu melaksanakan tugas terjadwal.',
          berkembangSesuaiHarapan: 'Menunjukkan inisiatif secara mandiri.',
          sangatBerkembang: 'Menjadi teladan bagi rekan madrasah lainnya.',
        },
      ],
      coordinatorName: newProj.coordinatorName || 'Koordinator Tim Kokurikuler',
      createdAt: new Date().toISOString(),
    };

    CocurricularService.saveProject(created);
    const updatedList = CocurricularService.getProjects();
    setProjects(updatedList);
    setSelectedProject(created);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Program Kokurikuler Penguatan Karakter Madrasah (P5-PPRA KBC)</h2>
          <p className="text-xs text-slate-500 mt-1">
            Panduan proyek berbasis pengalaman nyata terintegrasi Profil Pelajar Rahmatan lil 'Alamin dan Panca Cinta (KMA 1503/2025).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => window.print()} icon={<Printer className="w-4 h-4" />}>
            Cetak Panduan Proyek
          </Button>
          <Button variant="primary" size="sm" onClick={() => setIsAddModalOpen(true)} icon={<Plus className="w-4 h-4" />}>
            Rancang Proyek Baru
          </Button>
        </div>
      </div>

      {/* PROJECT SELECTOR PILLS */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {projects.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedProject(p)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
              selectedProject.id === p.id
                ? 'bg-madrasah-700 text-white border-madrasah-700 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {p.theme}: {p.title.substring(0, 35)}...
          </button>
        ))}
      </div>

      {/* ACTIVE PROJECT CARD */}
      <Card
        title={selectedProject.title}
        subtitle={`Tema: ${selectedProject.theme} • Durasi: ${selectedProject.durationWeeks} Pekan • Koordinator: ${selectedProject.coordinatorName}`}
      >
        <div className="space-y-6 text-xs">
          {/* BADGES & PANCA CINTA */}
          <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="emerald">Fase {selectedProject.targetPhase}</Badge>
              <Badge variant="gold">Tahun {selectedProject.academicYear}</Badge>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {selectedProject.pancaCintaFocus.map((val) => (
                <PancaCintaBadge key={val} value={val} size="sm" />
              ))}
            </div>
          </div>

          {/* OBJECTIVES */}
          <div>
            <h4 className="font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-madrasah-700" />
              Tujuan Pembelajaran Kokurikuler:
            </h4>
            <ul className="list-disc list-inside space-y-1 text-slate-700 pl-2">
              {selectedProject.objectives.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </div>

          {/* STAGES & TIMELINE */}
          <div>
            <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-madrasah-700" />
              Tahapan Alur Pelaksanaan Kegiatan Proyek:
            </h4>
            <div className="space-y-3">
              {selectedProject.stages.map((stage, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{stage.stageName}</span>
                    <span className="text-[11px] font-semibold text-slate-500">{stage.allocatedHours} JP</span>
                  </div>
                  <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                    {stage.activities.map((act, aIdx) => (
                      <li key={aIdx}>{act}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* RUBRIC */}
          <div>
            <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-madrasah-700" />
              Rubrik Penilaian Proyek Kokurikuler (4 Level Berkembang):
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] border border-slate-200">
                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    <th className="p-2 border">Dimensi Karakter KBC</th>
                    <th className="p-2 border">Mulai Berkembang (MB)</th>
                    <th className="p-2 border">Sedang Berkembang (SB)</th>
                    <th className="p-2 border">Berkembang Sesuai Harapan (BSH)</th>
                    <th className="p-2 border">Sangat Berkembang (SAB)</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProject.rubric.map((r, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-2 border font-bold text-slate-800">{r.dimension}</td>
                      <td className="p-2 border text-slate-600">{r.mulaiBerkembang}</td>
                      <td className="p-2 border text-slate-600">{r.sedangBerkembang}</td>
                      <td className="p-2 border text-slate-700 font-medium">{r.berkembangSesuaiHarapan}</td>
                      <td className="p-2 border text-emerald-800 font-bold bg-emerald-50/50">{r.sangatBerkembang}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>

      {/* MODAL TAMBAH PROYEK */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Rancang Program Kokurikuler Madrasah (P5-PPRA KBC)"
        subtitle="Sesuai Panduan Kokurikuler Madrasah KMA 1503/2025"
      >
        <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Judul Kegiatan Proyek *</label>
            <input
              type="text"
              required
              value={newProj.title}
              onChange={(e) => setNewProj({ ...newProj, title: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-1.5 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
              placeholder="Contoh: Audit Konservasi Air & Pengolahan Sampah Mandiri"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tema Resmi Kemenag</label>
              <select
                value={newProj.theme}
                onChange={(e) => setNewProj({ ...newProj, theme: e.target.value as CocurricularTheme })}
                className="w-full rounded-lg border border-slate-300 px-3 py-1.5 bg-white focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
              >
                <option value="Gaya Hidup Berkelanjutan">Gaya Hidup Berkelanjutan</option>
                <option value="Kearifan Lokal">Kearifan Lokal</option>
                <option value="Bhinneka Tunggal Ika">Bhinneka Tunggal Ika</option>
                <option value="Bangunlah Jiwa dan Raganya">Bangunlah Jiwa dan Raganya</option>
                <option value="Rekayasa dan Teknologi">Rekayasa dan Teknologi</option>
                <option value="Kewirausahaan">Kewirausahaan</option>
                <option value="Suara Demokrasi">Suara Demokrasi</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Durasi Pelaksanaan</label>
              <input
                type="number"
                min="1"
                max="12"
                value={newProj.durationWeeks}
                onChange={(e) => setNewProj({ ...newProj, durationWeeks: Number(e.target.value) })}
                className="w-full rounded-lg border border-slate-300 px-3 py-1.5 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Koordinator / Penanggung Jawab</label>
            <input
              type="text"
              value={newProj.coordinatorName}
              onChange={(e) => setNewProj({ ...newProj, coordinatorName: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-1.5 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
              placeholder="Nama koordinator tim fasilitator proyek"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsAddModalOpen(false)}>
              Batal
            </Button>
            <Button variant="primary" size="sm" type="submit" icon={<Check className="w-4 h-4" />}>
              Simpan Rencana Proyek
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
