import React, { useState } from 'react';
import { useAuth } from '../features/auth/AuthContext';
import { StorageService } from '../services/storageService';
import { CurriculumService } from '../services/curriculumService';
import { KBCGeneratorService, GeneratorParameters } from '../services/kbcGeneratorService';
import { 
  LearningDocument, 
  ModulAjarContent, 
  PancaCintaValue, 
  LearningStrategy, 
  CurriculumPhase 
} from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { KopMadrasah } from '../components/common/KopMadrasah';
import { PancaCintaBadge } from '../components/common/PancaCintaBadge';
import { 
  Sparkles, 
  Save, 
  Printer, 
  FileCheck2, 
  Heart, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  HelpCircle,
  FileText,
  RotateCcw
} from 'lucide-react';

export const GeneratorPerangkatPage: React.FC = () => {
  const { user, schoolProfile } = useAuth();
  const verifiedTPs = CurriculumService.getAllTP();
  const subjects = StorageService.getSubjects();

  // Generator Form State
  const [params, setParams] = useState<GeneratorParameters>({
    jenjang: schoolProfile.level,
    kelas: 'Kelas 7-A (Unggulan)',
    fase: 'D',
    mataPelajaran: 'Matematika',
    materiPokok: 'Statistika Data Tunggal & Konservasi Sumber Daya Air',
    tujuanPembelajaran: 'Peserta didik mampu mengumpulkan, menyajikan, dan menganalisis data konsumsi air wudhu madrasah dalam diagram batang untuk merancang solusi efisiensi air.',
    alokasiWaktu: '2 Pertemuan (4 JP @ 40 menit)',
    jumlahPertemuan: 2,
    karakteristikSantri: 'Santri aktif, antusias dalam kegiatan investigasi kontekstual, dengan variasi kesiapan literasi numerasi.',
    kondisiMadrasah: 'Madrasah memiliki masjid dengan tempat wudhu aktif, koneksi internet, dan LCD proyektor.',
    pancaCintaPrioritas: ['Cinta Lingkungan', 'Cinta Ilmu', 'Cinta Allah dan Rasul-Nya'],
    strategiPembelajaran: 'Pembelajaran Berbasis Masalah (PBL)',
    isAiMode: true,
  });

  const [generatedDoc, setGeneratedDoc] = useState<LearningDocument | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activePreviewSection, setActivePreviewSection] = useState<'kegiatan' | 'pancacinta' | 'asesmen' | 'lkpd'>('kegiatan');

  const pancaCintaOptions: PancaCintaValue[] = [
    'Cinta Allah dan Rasul-Nya',
    'Cinta Ilmu',
    'Cinta Lingkungan',
    'Cinta Diri dan Sesama Manusia',
    'Cinta Tanah Air',
  ];

  const handleTogglePancaCinta = (val: PancaCintaValue) => {
    setParams(prev => {
      const exists = prev.pancaCintaPrioritas.includes(val);
      if (exists) {
        if (prev.pancaCintaPrioritas.length <= 1) return prev; // Minimal 1
        return { ...prev, pancaCintaPrioritas: prev.pancaCintaPrioritas.filter(v => v !== val) };
      } else {
        if (prev.pancaCintaPrioritas.length >= 3) return prev; // Maksimal 3 agar terarah
        return { ...prev, pancaCintaPrioritas: [...prev.pancaCintaPrioritas, val] };
      }
    });
  };

  const handleSelectTP = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tpId = e.target.value;
    const matched = verifiedTPs.find(t => t.id === tpId);
    if (matched) {
      setParams(prev => ({
        ...prev,
        tujuanPembelajaran: matched.objectiveText,
        materiPokok: matched.materialScope,
        pancaCintaPrioritas: [matched.pancaCintaValue],
      }));
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const doc = KBCGeneratorService.generateModulAjar(
        params,
        user.fullName,
        schoolProfile.officialName
      );
      setGeneratedDoc(doc);
      setIsGenerating(false);
      setSaveSuccess(false);
    }, 400);
  };

  const handleSaveToBank = () => {
    if (!generatedDoc) return;
    StorageService.saveDocument(generatedDoc);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  const handleSubmitForReview = () => {
    if (!generatedDoc) return;
    const submittedDoc: LearningDocument = {
      ...generatedDoc,
      status: 'ready_for_review',
      updatedAt: new Date().toISOString(),
    };
    StorageService.saveDocument(submittedDoc);
    setGeneratedDoc(submittedDoc);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  const content = generatedDoc?.content as ModulAjarContent | undefined;

  return (
    <div className="space-y-6">
      {/* TITLE & HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Generator Perangkat Pembelajaran KBC & Deep Learning</h2>
          <p className="text-xs text-slate-500 mt-1">
            Modul Ajar, RPP, LKPD, dan Asesmen terstandar KMA 1503/2025 dan SK Dirjen Pendis 6077/2025.
          </p>
        </div>

        {generatedDoc && (
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              icon={<Printer className="w-4 h-4" />}
            >
              Cetak / Ekspor PDF
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSaveToBank}
              icon={<Save className="w-4 h-4" />}
            >
              Simpan ke Bank Dokumen
            </Button>
            <Button
              variant="gold"
              size="sm"
              onClick={handleSubmitForReview}
              icon={<FileCheck2 className="w-4 h-4" />}
            >
              Ajukan Telaah / Supervisi
            </Button>
          </div>
        )}
      </div>

      {saveSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Perangkat pembelajaran berhasil disimpan ke Bank Dokumen Madrasah dengan riwayat versi!
        </div>
      )}

      {/* TWO COLUMN GRID: INPUT PARAMETERS VS LIVE PREVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: PARAMETER CONFIGURATION (5 COLS) */}
        <div className="lg:col-span-5 space-y-4">
          <Card title="Konfigurasi Perangkat Pembelajaran">
            <div className="space-y-4 text-xs">
              {/* Quick Select from Verified TP Bank */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Pilih dari Bank Tujuan Pembelajaran (TP) Terverifikasi
                </label>
                <select
                  onChange={handleSelectTP}
                  className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 bg-white focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
                >
                  <option value="">-- Ketik manual atau pilih TP terverifikasi --</option>
                  {verifiedTPs.map((t) => (
                    <option key={t.id} value={t.id}>
                      [{t.code}] {t.objectiveText.substring(0, 70)}...
                    </option>
                  ))}
                </select>
              </div>

              {/* Mata Pelajaran & Kelas */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mata Pelajaran *</label>
                  <select
                    value={params.mataPelajaran}
                    onChange={(e) => setParams({ ...params, mataPelajaran: e.target.value })}
                    className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 bg-white focus:ring-2 focus:ring-madrasah-600 focus:outline-none font-semibold"
                  >
                    {subjects.map((s) => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kelas & Rombel *</label>
                  <input
                    type="text"
                    value={params.kelas}
                    onChange={(e) => setParams({ ...params, kelas: e.target.value })}
                    className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Materi Pokok */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Materi Pokok / Topik Pembelajaran *</label>
                <input
                  type="text"
                  required
                  value={params.materiPokok}
                  onChange={(e) => setParams({ ...params, materiPokok: e.target.value })}
                  className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
                />
              </div>

              {/* Tujuan Pembelajaran */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Rumusan Tujuan Pembelajaran (TP) *</label>
                <textarea
                  rows={3}
                  required
                  value={params.tujuanPembelajaran}
                  onChange={(e) => setParams({ ...params, tujuanPembelajaran: e.target.value })}
                  className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
                />
              </div>

              {/* Alokasi Waktu & Pertemuan */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Alokasi Waktu</label>
                  <input
                    type="text"
                    value={params.alokasiWaktu}
                    onChange={(e) => setParams({ ...params, alokasiWaktu: e.target.value })}
                    className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Jumlah Pertemuan</label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={params.jumlahPertemuan}
                    onChange={(e) => setParams({ ...params, jumlahPertemuan: Number(e.target.value) })}
                    className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Strategi Pembelajaran Mendalam */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Strategi Pembelajaran Mendalam (Deep Learning) *</label>
                <select
                  value={params.strategiPembelajaran}
                  onChange={(e) => setParams({ ...params, strategiPembelajaran: e.target.value as LearningStrategy })}
                  className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 bg-white focus:ring-2 focus:ring-madrasah-600 focus:outline-none font-semibold text-slate-800"
                >
                  <option value="Pembelajaran Berbasis Masalah (PBL)">Pembelajaran Berbasis Masalah (PBL)</option>
                  <option value="Pembelajaran Berbasis Proyek (PjBL)">Pembelajaran Berbasis Proyek (PjBL)</option>
                  <option value="Inkuiri">Inkuiri & Penyelidikan Terarah</option>
                  <option value="Studi Kasus Kontekstual">Studi Kasus Kontekstual Madrasah</option>
                  <option value="Diskusi Kolaboratif">Diskusi Kolaboratif</option>
                  <option value="Pembelajaran Berdiferensiasi">Pembelajaran Berdiferensiasi</option>
                </select>
              </div>

              {/* Panca Cinta Prioritas Selector */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Fokus Nilai Panca Cinta (Pilih 1 - 3 Nilai Prioritas) *
                </label>
                <div className="space-y-1.5">
                  {pancaCintaOptions.map((opt) => {
                    const isSelected = params.pancaCintaPrioritas.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleTogglePancaCinta(opt)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between border transition ${
                          isSelected
                            ? 'bg-madrasah-50/80 border-madrasah-600 text-madrasah-900 font-semibold'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Heart className={`w-3.5 h-3.5 ${isSelected ? 'text-madrasah-700 fill-madrasah-700' : 'text-slate-400'}`} />
                          {opt}
                        </span>
                        {isSelected && <span className="text-[10px] bg-madrasah-700 text-white px-2 py-0.5 rounded-full">Aktif</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mode Pembuatan */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={params.isAiMode}
                    onChange={(e) => setParams({ ...params, isAiMode: e.target.checked })}
                    className="rounded border-slate-300 text-madrasah-700 focus:ring-madrasah-600"
                  />
                  <span className="font-semibold text-slate-800">
                    Gunakan Engine KBC Cerdas (Rekomendasi Berbasis Cinta)
                  </span>
                </label>
              </div>

              {/* GENERATE BUTTON */}
              <Button
                variant="primary"
                size="md"
                className="w-full mt-2"
                isLoading={isGenerating}
                onClick={handleGenerate}
                icon={<Sparkles className="w-4 h-4 text-gold-300" />}
              >
                {isGenerating ? 'Menyusun Perangkat Pembelajaran...' : 'Generate Perangkat Pembelajaran KBC'}
              </Button>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: LIVE INTERACTIVE PREVIEW (7 COLS) */}
        <div className="lg:col-span-7 space-y-4">
          {!generatedDoc ? (
            <Card className="text-center py-16 border-dashed border-2 border-slate-300">
              <div className="w-16 h-16 rounded-full bg-madrasah-50 text-madrasah-700 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-madrasah-600" />
              </div>
              <h3 className="text-base font-bold text-slate-800">Pratinjau Dokumen Belum Dibuat</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                Lengkapi konfigurasi parameter di panel sebelah kiri lalu klik tombol 
                <strong> "Generate Perangkat Pembelajaran KBC"</strong> untuk melihat dokumen lengkap terstruktur.
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {/* STATUS & AI DISCLAIMER BANNER */}
              <div className={`p-4 rounded-2xl border text-xs flex items-start gap-3 ${
                generatedDoc.isAiGenerated 
                  ? 'bg-amber-50 border-amber-200 text-amber-900' 
                  : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              }`}>
                {generatedDoc.isAiGenerated ? (
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                )}
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">
                      {generatedDoc.isAiGenerated 
                        ? 'Status: Hasil Usulan AI (Pedagogical Engine KBC)' 
                        : 'Status: Dokumen Mandiri Diverifikasi Guru'}
                    </span>
                    <Badge variant={generatedDoc.status === 'ready_for_review' ? 'warning' : 'default'}>
                      {generatedDoc.status === 'ready_for_review' ? 'Diajukan Supervisi' : 'Draf Guru'}
                    </Badge>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    {generatedDoc.isAiGenerated 
                      ? 'Rancangan ini dihasilkan sebagai usulan pedagogis terarah. Guru berwenang penuh menyunting, menguji keselarasan, dan memvalidasi sebelum disahkan oleh Kepala Madrasah.'
                      : 'Perangkat pembelajaran telah diverifikasi dan siap digunakan dalam kegiatan belajar mengajar.'}
                  </p>
                </div>
              </div>

              {/* DOCUMENT VIEW CONTAINER (READY FOR PRINT) */}
              <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden p-6 space-y-6">
                {/* 1. KOP RESMI MADRASAH */}
                <KopMadrasah profile={schoolProfile} />

                {/* 2. JUDUL DOKUMEN */}
                <div className="text-center space-y-1 pb-4 border-b border-slate-200">
                  <h2 className="text-lg font-bold uppercase text-slate-900 tracking-wide font-serif">
                    MODUL AJAR KURIKULUM BERBASIS CINTA (KBC)
                  </h2>
                  <p className="text-xs text-slate-600 font-semibold">
                    Pedoman KMA Nomor 1503 Tahun 2025 & SK Dirjen Pendis Nomor 6077 Tahun 2025
                  </p>
                  <p className="text-xs font-mono text-slate-400">
                    Nomor: {schoolProfile.docNumberFormat.replace('{nomor}', '042').replace('{kode}', 'MODUL').replace('{bulan}', 'X').replace('{tahun}', '2026')}
                  </p>
                </div>

                {/* 3. IDENTITAS MODUL */}
                <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div><strong>Penyusun:</strong> {content?.identitas.penyusun}</div>
                  <div><strong>Mata Pelajaran:</strong> {content?.identitas.mataPelajaran}</div>
                  <div><strong>Satuan Pendidikan:</strong> {content?.identitas.instansi}</div>
                  <div><strong>Fase / Kelas:</strong> Fase {content?.identitas.fase} / {content?.identitas.kelas}</div>
                  <div><strong>Tahun Ajaran:</strong> 2026/2027 (Semester Ganjil)</div>
                  <div><strong>Alokasi Waktu:</strong> {content?.identitas.alokasiWaktu}</div>
                  <div className="col-span-2 pt-1 border-t border-slate-200">
                    <strong>Model Pembelajaran:</strong> {content?.modelPembelajaran}
                  </div>
                </div>

                {/* 4. PREVIEW SECTION TABS */}
                <div className="flex border-b border-slate-200 gap-1 text-xs">
                  {[
                    { id: 'kegiatan', label: 'Kegiatan Pembelajaran (3 Tahap)' },
                    { id: 'pancacinta', label: 'Integrasi Panca Cinta Konkret' },
                    { id: 'asesmen', label: 'Asesmen & Rubrik 4 Level' },
                    { id: 'lkpd', label: 'Lembar Kerja Peserta Didik (LKPD)' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setActivePreviewSection(t.id as any)}
                      className={`py-2 px-3 font-semibold border-b-2 transition ${
                        activePreviewSection === t.id
                          ? 'border-madrasah-700 text-madrasah-800'
                          : 'border-transparent text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* SECTION: KEGIATAN PEMBELAJARAN (DEEP LEARNING) */}
                {activePreviewSection === 'kegiatan' && (
                  <div className="space-y-4 text-xs">
                    <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200">
                      <p className="font-bold text-emerald-950">Pemahaman Bermakna:</p>
                      <p className="text-emerald-900 mt-0.5">{content?.pemahamanBermakna}</p>
                      <p className="font-bold text-emerald-950 mt-2">Pertanyaan Pemantik:</p>
                      <ul className="list-disc list-inside text-emerald-900 mt-0.5">
                        {content?.pertanyaanPemantik.map((q, i) => (
                          <li key={i}>{q}</li>
                        ))}
                      </ul>
                    </div>

                    {content?.kegiatanPembelajaran.map((pertemuan) => (
                      <div key={pertemuan.pertemuan} className="border border-slate-200 rounded-xl p-4 space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                          <span className="font-bold text-slate-800 text-sm">
                            Pertemuan {pertemuan.pertemuan} ({pertemuan.alokasiMenit} Menit)
                          </span>
                          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            Mindful • Meaningful • Joyful
                          </span>
                        </div>

                        <div className="space-y-2">
                          <p><strong>A. Pendahuluan:</strong> {pertemuan.pendahuluan}</p>
                          <div className="space-y-1.5 pl-3 border-l-2 border-madrasah-600">
                            <p className="font-bold text-madrasah-900">B. Kegiatan Inti:</p>
                            <p><strong>1. Pengalaman Memahami (Mindful):</strong> {pertemuan.inti.memahami}</p>
                            <p><strong>2. Pengalaman Mengaplikasi (Meaningful):</strong> {pertemuan.inti.mengaplikasi}</p>
                            <p><strong>3. Pengalaman Merefleksi (Joyful):</strong> {pertemuan.inti.merefleksi}</p>
                          </div>
                          <p><strong>C. Penutup & Refleksi:</strong> {pertemuan.penutup}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* SECTION: PANCA CINTA KONKRET */}
                {activePreviewSection === 'pancacinta' && (
                  <div className="space-y-4 text-xs">
                    <p className="text-slate-500">
                      Rincian penerapan 5 Nilai Panca Cinta (SK Dirjen Pendis 6077/2025) secara konkret dan teramati:
                    </p>

                    {content?.pancaCintaDetail.map((detail) => (
                      <div key={detail.value} className="border border-slate-200 rounded-xl p-4 space-y-2.5 bg-slate-50/50">
                        <div className="flex items-center justify-between">
                          <PancaCintaBadge value={detail.value} size="md" />
                          <span className="text-[10px] text-slate-400">Teramati & Terukur</span>
                        </div>

                        <div className="space-y-1.5 text-slate-700">
                          <p><strong>Rasional Pemilihan:</strong> {detail.rationale}</p>
                          <p><strong>Tujuan Karakter:</strong> {detail.characterTarget}</p>
                          <p><strong>Kegiatan Pembelajaran Konkret:</strong> {detail.concreteActivity}</p>
                          <p className="p-2 bg-emerald-50 rounded-lg text-emerald-900">
                            <strong>Indikator Perilaku Teramati:</strong> {detail.observableIndicator}
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                            <div><strong>Peran Pendidik:</strong> {detail.teacherRole}</div>
                            <div><strong>Peran Peserta Didik:</strong> {detail.studentRole}</div>
                          </div>
                          <p><strong>Bukti Belajar (Artefak):</strong> {detail.learningEvidence}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* SECTION: ASESMEN & RUBRIK */}
                {activePreviewSection === 'asesmen' && (
                  <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <p className="font-bold text-slate-800">Asesmen Awal (Diagnostik)</p>
                        <p className="text-slate-600 mt-1">{content?.asesmen.diagnostik}</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <p className="font-bold text-slate-800">Asesmen Proses (Formatif)</p>
                        <p className="text-slate-600 mt-1">{content?.asesmen.formatif}</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <p className="font-bold text-slate-800">Asesmen Akhir (Sumatif)</p>
                        <p className="text-slate-600 mt-1">{content?.asesmen.sumatif}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-800 mb-2">Rubrik Penilaian Autentik (Kriteria KBC)</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-[11px] border border-slate-200">
                          <thead className="bg-slate-100 text-slate-700">
                            <tr>
                              <th className="p-2 border">Kriteria Penilaian</th>
                              <th className="p-2 border">Baru Berkembang</th>
                              <th className="p-2 border">Layak</th>
                              <th className="p-2 border">Cakap</th>
                              <th className="p-2 border">Mahir</th>
                            </tr>
                          </thead>
                          <tbody>
                            {content?.asesmen.rubrik.map((r, idx) => (
                              <tr key={idx} className="border-t">
                                <td className="p-2 border font-bold text-slate-800">{r.kriteria}</td>
                                <td className="p-2 border text-slate-600">{r.baruBerkembang}</td>
                                <td className="p-2 border text-slate-600">{r.layak}</td>
                                <td className="p-2 border text-slate-600">{r.cakap}</td>
                                <td className="p-2 border text-emerald-800 bg-emerald-50/50">{r.mahir}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* SECTION: LKPD */}
                {activePreviewSection === 'lkpd' && (
                  <div className="space-y-4 text-xs border p-4 rounded-xl bg-slate-50/40">
                    <div className="text-center border-b pb-2">
                      <h3 className="font-bold text-sm text-slate-900">{content?.lembarKerja.judul}</h3>
                      <p className="text-slate-500">{content?.lembarKerja.tujuan}</p>
                    </div>

                    <div>
                      <p className="font-bold text-slate-800 mb-1">Petunjuk Kerja:</p>
                      <ol className="list-decimal list-inside space-y-1 text-slate-700">
                        {content?.lembarKerja.instruksi.map((ins, i) => (
                          <li key={i}>{ins}</li>
                        ))}
                      </ol>
                    </div>

                    <div className="pt-2 border-t">
                      <p className="font-bold text-slate-800 mb-1">Pertanyaan Pemantik Diskusi & Refleksi:</p>
                      <ul className="list-disc list-inside space-y-1 text-slate-700">
                        {content?.lembarKerja.pertanyaanDiskusi.map((q, i) => (
                          <li key={i}>{q}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* 5. TANDA TANGAN PENGESAHAN RESMI */}
                <div className="pt-8 grid grid-cols-2 text-center text-xs text-slate-800">
                  <div>
                    <p>Mengetahui,</p>
                    <p className="font-bold">Kepala Madrasah</p>
                    <div className="h-16 flex items-center justify-center">
                      <span className="text-[10px] text-slate-400 italic">[Tanda Tangan & Cap Madrasah]</span>
                    </div>
                    <p className="font-bold underline">{schoolProfile.headmasterName}</p>
                    <p className="text-[11px] text-slate-500 font-mono">
                      {schoolProfile.headmasterNip ? `NIP. ${schoolProfile.headmasterNip}` : '(Non-PNS)'}
                    </p>
                  </div>

                  <div>
                    <p>{schoolProfile.regencyCity}, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    <p className="font-bold">Guru Mata Pelajaran</p>
                    <div className="h-16 flex items-center justify-center">
                      <span className="text-[10px] text-slate-400 italic">[Tanda Tangan Guru Pengampu]</span>
                    </div>
                    <p className="font-bold underline">{user.fullName}</p>
                    <p className="text-[11px] text-slate-500 font-mono">
                      {user.nip ? `NIP. ${user.nip}` : user.nuptk ? `NUPTK. ${user.nuptk}` : 'Guru Mata Pelajaran'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
