import React, { useState } from 'react';
import { CurriculumService } from '../services/curriculumService';
import { 
  LearningOutcome, 
  LearningObjective, 
  LearningObjectiveFlow, 
  CurriculumPhase,
  PancaCintaValue 
} from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { PancaCintaBadge } from '../components/common/PancaCintaBadge';
import { 
  BookMarked, 
  ShieldCheck, 
  Plus, 
  Check, 
  Filter, 
  Search, 
  Sparkles, 
  Layers, 
  FileCheck2, 
  AlertCircle 
} from 'lucide-react';

export const CurriculumCPTPPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cp' | 'tp' | 'atp'>('cp');
  const [selectedPhase, setSelectedPhase] = useState<CurriculumPhase | 'all'>('D');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'PAI' | 'Bahasa Arab' | 'Umum'>('all');
  const [search, setSearch] = useState('');

  const [outcomes, setOutcomes] = useState<LearningOutcome[]>(() => CurriculumService.getAllCP());
  const [objectives, setObjectives] = useState<LearningObjective[]>(() => CurriculumService.getAllTP());
  const [atpList, setAtpList] = useState<LearningObjectiveFlow[]>(() => CurriculumService.getAllATP());

  // Modal State for New TP
  const [isAddTPModalOpen, setIsAddTPModalOpen] = useState(false);
  const [selectedCPForTP, setSelectedCPForTP] = useState<LearningOutcome | null>(null);
  const [newTP, setNewTP] = useState({
    code: '',
    objectiveText: '',
    competency: '',
    materialScope: '',
    pancaCintaValue: 'Cinta Ilmu' as PancaCintaValue,
    cognitiveLevel: 'C3' as const,
    isAiGenerated: false,
  });

  const filteredCP = outcomes.filter((cp) => {
    const matchesPhase = selectedPhase === 'all' || cp.phase === selectedPhase;
    const matchesCategory = selectedCategory === 'all' || cp.category === selectedCategory;
    const matchesSearch = cp.subjectName.toLowerCase().includes(search.toLowerCase()) ||
                          cp.element.toLowerCase().includes(search.toLowerCase()) ||
                          cp.outcomeText.toLowerCase().includes(search.toLowerCase());
    return matchesPhase && matchesCategory && matchesSearch;
  });

  const filteredTP = objectives.filter((tp) => {
    const matchesSearch = tp.code.toLowerCase().includes(search.toLowerCase()) ||
                          tp.objectiveText.toLowerCase().includes(search.toLowerCase()) ||
                          tp.materialScope.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const handleOpenAddTP = (cp?: LearningOutcome) => {
    const targetCP = cp || outcomes[0];
    setSelectedCPForTP(targetCP);
    const existingCount = objectives.filter(o => o.outcomeId === targetCP.id).length;
    setNewTP({
      code: `TP.${targetCP.subjectCode.replace('-D', '')}.7.${existingCount + 1}`,
      objectiveText: '',
      competency: '',
      materialScope: targetCP.element,
      pancaCintaValue: 'Cinta Ilmu',
      cognitiveLevel: 'C3',
      isAiGenerated: false,
    });
    setIsAddTPModalOpen(true);
  };

  const handleSaveTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCPForTP || !newTP.objectiveText) return;

    const created: LearningObjective = {
      id: `tp-${Date.now()}`,
      outcomeId: selectedCPForTP.id,
      code: newTP.code,
      objectiveText: newTP.objectiveText,
      competency: newTP.competency || 'Kompetensi terukur',
      materialScope: newTP.materialScope,
      pancaCintaValue: newTP.pancaCintaValue,
      cognitiveLevel: newTP.cognitiveLevel,
      isAiGenerated: newTP.isAiGenerated,
      isVerified: !newTP.isAiGenerated, // Manual = otomatis verified; AI = perlu verifikasi
      notes: newTP.isAiGenerated ? 'Usulan AI - Perlu telaah guru' : 'Diverifikasi langsung oleh guru pengampu',
    };

    CurriculumService.saveTP(created);
    setObjectives(CurriculumService.getAllTP());
    setIsAddTPModalOpen(false);
  };

  const handleVerifyTP = (tpId: string) => {
    CurriculumService.verifyTP(tpId, 'Telah ditelaah & disetujui guru pengampu');
    setObjectives(CurriculumService.getAllTP());
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Pusat Data Kurikulum Madrasah (CP, TP & ATP)</h2>
          <p className="text-xs text-slate-500 mt-1">
            Data resmi Capaian Pembelajaran KMA 1503/2025 dengan diferensiasi jelas terhadap usulan rekomendasi AI.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleOpenAddTP()}
            icon={<Plus className="w-4 h-4" />}
          >
            Rumuskan Tujuan Pembelajaran (TP)
          </Button>
        </div>
      </div>

      {/* REGULATORY NOTICE */}
      <div className="p-4 bg-emerald-50 border border-emerald-200/90 rounded-2xl flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-emerald-950">
            Jaminan Integritas Regulasi (KMA 1503/2025 & Panduan KBC 6077/2025)
          </h4>
          <p className="text-xs text-emerald-800 leading-relaxed">
            Seluruh teks Capaian Pembelajaran (CP) di bawah ini bersumber langsung dari lampiran Keputusan Menteri Agama Nomor 1503 Tahun 2025. 
            Tujuan Pembelajaran (TP) yang dihasilkan oleh AI selalu ditandai dengan label <strong>"Usulan AI - Perlu Verifikasi"</strong> dan tidak otomatis berstatus resmi sebelum disetujui pendidik.
          </p>
        </div>
      </div>

      {/* TABS NAVIGATION */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          onClick={() => setActiveTab('cp')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 font-medium text-xs transition ${
            activeTab === 'cp'
              ? 'border-madrasah-700 text-madrasah-800 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <BookMarked className="w-4 h-4" />
          <span>Capaian Pembelajaran (CP Resmi)</span>
          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded-full font-bold">
            {outcomes.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('tp')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 font-medium text-xs transition ${
            activeTab === 'tp'
              ? 'border-madrasah-700 text-madrasah-800 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Tujuan Pembelajaran (TP)</span>
          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded-full font-bold">
            {objectives.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('atp')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 font-medium text-xs transition ${
            activeTab === 'atp'
              ? 'border-madrasah-700 text-madrasah-800 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>Alur Tujuan Pembelajaran (ATP)</span>
          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded-full font-bold">
            {atpList.length}
          </span>
        </button>
      </div>

      {/* TAB 1: CAPAIAN PEMBELAJARAN (CP RESMI) */}
      {activeTab === 'cp' && (
        <div className="space-y-4">
          {/* FILTER CONTROLS */}
          <Card>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari mata pelajaran, elemen, atau CP..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-madrasah-600"
                />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap">
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-500 font-medium">Fase:</span>
                  <select
                    value={selectedPhase}
                    onChange={(e) => setSelectedPhase(e.target.value as any)}
                    className="text-xs rounded-lg border border-slate-300 px-2.5 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-madrasah-600 font-semibold"
                  >
                    <option value="all">Semua Fase</option>
                    <option value="Fondasi">Fase Fondasi (RA)</option>
                    <option value="A">Fase A (Kelas 1-2 MI)</option>
                    <option value="B">Fase B (Kelas 3-4 MI)</option>
                    <option value="C">Fase C (Kelas 5-6 MI)</option>
                    <option value="D">Fase D (Kelas 7-9 MTs)</option>
                    <option value="E">Fase E (Kelas 10 MA)</option>
                    <option value="F">Fase F (Kelas 11-12 MA)</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-500 font-medium">Kategori:</span>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as any)}
                    className="text-xs rounded-lg border border-slate-300 px-2.5 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-madrasah-600 font-semibold"
                  >
                    <option value="all">Semua Kategori</option>
                    <option value="PAI">Pendidikan Agama Islam (PAI)</option>
                    <option value="Bahasa Arab">Bahasa Arab</option>
                    <option value="Umum">Mata Pelajaran Umum</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>

          {/* LIST CP */}
          <div className="grid grid-cols-1 gap-4">
            {filteredCP.map((cp) => (
              <Card key={cp.id} className="hover:border-madrasah-400 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-madrasah-900 bg-madrasah-50 px-2.5 py-0.5 rounded-full border border-madrasah-200">
                      {cp.subjectName}
                    </span>
                    <Badge variant="emerald">Fase {cp.phase}</Badge>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {cp.gradeLevel}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Resmi KMA 1503/2025
                    </span>
                  </div>
                </div>

                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700">Elemen Capaian:</span>
                    <span className="text-xs font-semibold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                      {cp.element}
                    </span>
                  </div>

                  <p className="text-xs text-slate-800 leading-relaxed bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/70 font-serif">
                    "{cp.outcomeText}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400">
                    Sumber: {cp.regulationTitle}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenAddTP(cp)}
                    icon={<Plus className="w-3.5 h-3.5" />}
                  >
                    Rumuskan TP dari CP ini
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: TUJUAN PEMBELAJARAN (TP) */}
      {activeTab === 'tp' && (
        <div className="space-y-4">
          <Card
            title="Daftar Tujuan Pembelajaran (TP) Terstruktur"
            subtitle="Menampilkan keterkaitan CP, Kompetensi, Level Kognitif, dan Integrasi Panca Cinta"
            action={
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleOpenAddTP()}
                icon={<Plus className="w-4 h-4" />}
              >
                Rumuskan TP Baru
              </Button>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-y border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Kode TP</th>
                    <th className="py-3 px-4">Rumusan Tujuan Pembelajaran</th>
                    <th className="py-3 px-4">Lingkup Materi & Kognitif</th>
                    <th className="py-3 px-4">Nilai Panca Cinta</th>
                    <th className="py-3 px-4">Status Verifikasi</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTP.map((tp) => (
                    <tr key={tp.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-madrasah-800">{tp.code}</td>
                      <td className="py-3.5 px-4 font-medium text-slate-800 max-w-md">
                        {tp.objectiveText}
                        {tp.notes && (
                          <p className="text-[10px] text-slate-400 mt-0.5">{tp.notes}</p>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-700">{tp.materialScope}</div>
                        <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded mt-0.5 inline-block">
                          Level {tp.cognitiveLevel}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <PancaCintaBadge value={tp.pancaCintaValue} size="sm" />
                      </td>
                      <td className="py-3.5 px-4">
                        {tp.isVerified ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <Check className="w-3 h-3 text-emerald-600" />
                            Diverifikasi Guru
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            <AlertCircle className="w-3 h-3 text-amber-600" />
                            Usulan AI (Perlu Verifikasi)
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {!tp.isVerified && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleVerifyTP(tp.id)}
                            className="text-[11px] py-1 text-emerald-700 hover:bg-emerald-50"
                          >
                            Setujui TP
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 3: ALUR TUJUAN PEMBELAJARAN (ATP) */}
      {activeTab === 'atp' && (
        <div className="space-y-4">
          {atpList.map((atp) => (
            <Card key={atp.id} title={atp.title} subtitle={`Tahun Ajaran ${atp.academicYear} • Penyusun: ${atp.authorName}`}>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span>Mata Pelajaran: <strong>{atp.subjectName}</strong> (Fase {atp.phase})</span>
                  <span>Total Alokasi Waktu: <strong>{atp.totalHours} JP</strong></span>
                  <Badge variant="success">ATP Diverifikasi</Badge>
                </div>

                <div className="space-y-3">
                  {atp.steps.map((step) => (
                    <div key={step.stepNumber} className="p-3.5 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white hover:border-madrasah-400 transition">
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-madrasah-700 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                          {step.stepNumber}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-madrasah-800">{step.objectiveCode}</span>
                            <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.2 rounded font-semibold">
                              Semester {step.semester}
                            </span>
                            <span className="text-[10px] text-slate-500 font-medium">
                              ({step.allocatedHours} JP)
                            </span>
                          </div>
                          <p className="text-xs text-slate-800 font-medium">{step.objectiveText}</p>
                          <p className="text-[11px] text-slate-500">Rencana Asesmen: {step.assessmentPlan}</p>
                        </div>
                      </div>

                      <div className="flex-shrink-0">
                        <PancaCintaBadge value={step.pancaCintaFocus} size="sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* MODAL PERUMUSAN TUJUAN PEMBELAJARAN (TP) */}
      <Modal
        isOpen={isAddTPModalOpen}
        onClose={() => setIsAddTPModalOpen(false)}
        title="Perumusan Tujuan Pembelajaran (TP)"
        subtitle="Rumuskan TP berbasis Capaian Pembelajaran (CP) dan integrasi Panca Cinta"
        maxWidth="2xl"
      >
        <form onSubmit={handleSaveTP} className="space-y-4">
          {selectedCPForTP && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <span className="font-bold text-slate-700">Rujukan CP: </span>
              <span className="font-semibold text-madrasah-900">{selectedCPForTP.subjectName} ({selectedCPForTP.element})</span>
              <p className="text-slate-600 mt-1 italic text-[11px]">"{selectedCPForTP.outcomeText}"</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Kode TP *</label>
              <input
                type="text"
                required
                value={newTP.code}
                onChange={(e) => setNewTP({ ...newTP, code: e.target.value })}
                className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 font-mono focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
                placeholder="Contoh: TP.MAT.7.3"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tingkat Berpikir (Bloom/HOTS)</label>
              <select
                value={newTP.cognitiveLevel}
                onChange={(e) => setNewTP({ ...newTP, cognitiveLevel: e.target.value as any })}
                className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 bg-white focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
              >
                <option value="C1">C1 - Mengingat</option>
                <option value="C2">C2 - Memahami</option>
                <option value="C3">C3 - Menerapkan / Mengaplikasi</option>
                <option value="C4">C4 - Menganalisis (HOTS)</option>
                <option value="C5">C5 - Mengevaluasi (HOTS)</option>
                <option value="C6">C6 - Mengkreasi (HOTS)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Rumusan Tujuan Pembelajaran (ABCD/Kompetensi + Konten) *</label>
            <textarea
              rows={3}
              required
              value={newTP.objectiveText}
              onChange={(e) => setNewTP({ ...newTP, objectiveText: e.target.value })}
              className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
              placeholder="Peserta didik mampu menganalisis data ... secara cermat dan bertanggung jawab."
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Lingkup Materi Esensial</label>
              <input
                type="text"
                value={newTP.materialScope}
                onChange={(e) => setNewTP({ ...newTP, materialScope: e.target.value })}
                className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Integrasi Nilai Panca Cinta</label>
              <select
                value={newTP.pancaCintaValue}
                onChange={(e) => setNewTP({ ...newTP, pancaCintaValue: e.target.value as PancaCintaValue })}
                className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 bg-white focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
              >
                <option value="Cinta Allah dan Rasul-Nya">Cinta Allah dan Rasul-Nya</option>
                <option value="Cinta Ilmu">Cinta Ilmu</option>
                <option value="Cinta Lingkungan">Cinta Lingkungan</option>
                <option value="Cinta Diri dan Sesama Manusia">Cinta Diri dan Sesama Manusia</option>
                <option value="Cinta Tanah Air">Cinta Tanah Air</option>
              </select>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={newTP.isAiGenerated}
                onChange={(e) => setNewTP({ ...newTP, isAiGenerated: e.target.checked })}
                className="rounded border-amber-400 text-madrasah-700 focus:ring-madrasah-600"
              />
              <span className="font-semibold">Tandai sebagai Rumusan Usulan AI (Bukan kutipan baku Kemenag)</span>
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsAddTPModalOpen(false)}>
              Batal
            </Button>
            <Button variant="primary" size="sm" type="submit" icon={<Check className="w-4 h-4" />}>
              Simpan Tujuan Pembelajaran
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
