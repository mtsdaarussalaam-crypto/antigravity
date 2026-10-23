import React, { useState } from 'react';
import { AssessmentBankService } from '../services/assessmentBankService';
import { ExportService } from '../services/exportService';
import { QuestionItem, QuestionItemType, DifficultyLevel, PancaCintaValue } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { PancaCintaBadge } from '../components/common/PancaCintaBadge';
import { 
  FileQuestion, 
  Plus, 
  Search, 
  Filter, 
  Check, 
  FileDown, 
  ShieldCheck, 
  CheckCircle2,
  BookOpen
} from 'lucide-react';

export const AssessmentBankPage: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionItem[]>(() => AssessmentBankService.getQuestions());
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Question Form
  const [newQ, setNewQ] = useState({
    subjectName: 'Matematika',
    subjectCode: 'MAT-D',
    topic: '',
    itemType: 'pilihan_ganda' as QuestionItemType,
    difficulty: 'sedang' as DifficultyLevel,
    stimulus: '',
    questionText: '',
    optionsText: 'A. \nB. \nC. \nD. ',
    correctAnswer: '',
    explanation: '',
    pancaCintaValue: 'Cinta Lingkungan' as PancaCintaValue,
  });

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch = q.questionText.toLowerCase().includes(search.toLowerCase()) ||
                          q.topic.toLowerCase().includes(search.toLowerCase()) ||
                          q.subjectName.toLowerCase().includes(search.toLowerCase());
    const matchesDiff = difficultyFilter === 'all' || q.difficulty === difficultyFilter;
    const matchesType = typeFilter === 'all' || q.itemType === typeFilter;
    return matchesSearch && matchesDiff && matchesType;
  });

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQ.questionText || !newQ.correctAnswer) return;

    const options = newQ.itemType === 'pilihan_ganda' || newQ.itemType === 'kompleks'
      ? newQ.optionsText.split('\n').filter(Boolean)
      : undefined;

    const created: QuestionItem = {
      id: `soal-${Date.now()}`,
      subjectCode: newQ.subjectCode,
      subjectName: newQ.subjectName,
      phase: 'D',
      gradeLevel: 'Kelas VII MTs',
      topic: newQ.topic || 'Topik Pembelajaran',
      itemType: newQ.itemType,
      stimulus: newQ.stimulus || undefined,
      questionText: newQ.questionText,
      options,
      correctAnswer: newQ.correctAnswer,
      explanation: newQ.explanation,
      scoringGuide: 'Skor 10 untuk jawaban tepat.',
      difficulty: newQ.difficulty,
      pancaCintaValue: newQ.pancaCintaValue,
      cognitiveLevel: newQ.difficulty === 'hots' ? 'C4' : 'C3',
      isVerified: true,
    };

    AssessmentBankService.saveQuestion(created);
    setQuestions(AssessmentBankService.getQuestions());
    setIsAddModalOpen(false);
  };

  const handleExportCSV = () => {
    const headers = ['Kode Soal', 'Mata Pelajaran', 'Bentuk Soal', 'Tingkat Kesukaran', 'Pertanyaan', 'Kunci Jawaban', 'Nilai KBC'];
    const rows = filteredQuestions.map(q => [
      q.id,
      q.subjectName,
      q.itemType,
      q.difficulty.toUpperCase(),
      q.questionText,
      q.correctAnswer,
      q.pancaCintaValue || '-'
    ]);
    ExportService.downloadCsv('Bank_Soal_Madrasah_KBC', headers, rows);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Bank Soal & Asesmen Pembelajaran Madrasah</h2>
          <p className="text-xs text-slate-500 mt-1">
            Paket butir soal (PG, Uraian, Kompleks, HOTS) terintegrasi stimulus kontekstual dan nilai Panca Cinta.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportCSV} icon={<FileDown className="w-4 h-4" />}>
            Ekspor CSV
          </Button>
          <Button variant="primary" size="sm" onClick={() => setIsAddModalOpen(true)} icon={<Plus className="w-4 h-4" />}>
            Tambah Butir Soal
          </Button>
        </div>
      </div>

      {/* FILTER & SEARCH */}
      <Card>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari butir soal, mapel, atau topik..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-madrasah-600"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="text-xs rounded-lg border border-slate-300 px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-madrasah-600"
            >
              <option value="all">Semua Bentuk Soal</option>
              <option value="pilihan_ganda">Pilihan Ganda</option>
              <option value="kompleks">Pilihan Ganda Kompleks</option>
              <option value="uraian">Uraian / Kasus</option>
            </select>

            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="text-xs rounded-lg border border-slate-300 px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-madrasah-600"
            >
              <option value="all">Semua Kesukaran</option>
              <option value="mudah">Mudah</option>
              <option value="sedang">Sedang</option>
              <option value="sukar">Sukar</option>
              <option value="hots">Penalaran Tinggi (HOTS)</option>
            </select>
          </div>
        </div>

        {/* QUESTIONS LIST */}
        <div className="divide-y divide-slate-100 mt-2">
          {filteredQuestions.map((q, idx) => (
            <div key={q.id} className="py-4 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-madrasah-900 bg-madrasah-50 px-2 py-0.5 rounded border border-madrasah-200">
                    #{idx + 1} • {q.subjectName}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    {q.itemType.replace('_', ' ').toUpperCase()}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    q.difficulty === 'hots' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {q.difficulty.toUpperCase()}
                  </span>
                </div>

                {q.pancaCintaValue && (
                  <PancaCintaBadge value={q.pancaCintaValue} size="sm" />
                )}
              </div>

              {q.stimulus && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 font-serif leading-relaxed">
                  <strong>Stimulus:</strong> {q.stimulus}
                </div>
              )}

              <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                {q.questionText}
              </p>

              {q.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  {q.options.map((opt, i) => (
                    <div key={i} className="p-2 rounded-lg border border-slate-200 bg-white">
                      {opt}
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-2 text-[11px] text-emerald-800 bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <strong>Kunci Jawaban:</strong> {q.correctAnswer}
                </div>
                {q.explanation && (
                  <div className="text-slate-600">
                    <strong>Pembahasan:</strong> {q.explanation}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* MODAL TAMBAH SOAL */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Tambah Butir Soal ke Bank Soal Madrasah"
        subtitle="Rancang butir soal berkarakter KBC dan berbasis penalaran kontekstual"
        maxWidth="2xl"
      >
        <form onSubmit={handleCreateQuestion} className="space-y-4 text-xs">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Mata Pelajaran</label>
              <input
                type="text"
                value={newQ.subjectName}
                onChange={(e) => setNewQ({ ...newQ, subjectName: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-1.5 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Bentuk Soal</label>
              <select
                value={newQ.itemType}
                onChange={(e) => setNewQ({ ...newQ, itemType: e.target.value as QuestionItemType })}
                className="w-full rounded-lg border border-slate-300 px-3 py-1.5 bg-white focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
              >
                <option value="pilihan_ganda">Pilihan Ganda</option>
                <option value="kompleks">Pilihan Ganda Kompleks</option>
                <option value="uraian">Uraian / Studi Kasus</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tingkat Kesukaran</label>
              <select
                value={newQ.difficulty}
                onChange={(e) => setNewQ({ ...newQ, difficulty: e.target.value as DifficultyLevel })}
                className="w-full rounded-lg border border-slate-300 px-3 py-1.5 bg-white focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
              >
                <option value="mudah">Mudah</option>
                <option value="sedang">Sedang</option>
                <option value="sukar">Sukar</option>
                <option value="hots">Penalaran Tinggi (HOTS)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Stimulus Kontekstual (Opsional)</label>
            <textarea
              rows={2}
              value={newQ.stimulus}
              onChange={(e) => setNewQ({ ...newQ, stimulus: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-1.5 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
              placeholder="Deskripsi fenomena riil, tabel data, atau narasi hadis/ayat..."
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Pertanyaan / Pokok Soal *</label>
            <textarea
              rows={2}
              required
              value={newQ.questionText}
              onChange={(e) => setNewQ({ ...newQ, questionText: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-1.5 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
            />
          </div>

          {(newQ.itemType === 'pilihan_ganda' || newQ.itemType === 'kompleks') && (
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Pilihan Jawaban (Satu baris per opsi)</label>
              <textarea
                rows={4}
                value={newQ.optionsText}
                onChange={(e) => setNewQ({ ...newQ, optionsText: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-1.5 focus:ring-2 focus:ring-madrasah-600 focus:outline-none font-mono"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Kunci Jawaban Tepat *</label>
              <input
                type="text"
                required
                value={newQ.correctAnswer}
                onChange={(e) => setNewQ({ ...newQ, correctAnswer: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-1.5 focus:ring-2 focus:ring-madrasah-600 focus:outline-none font-semibold text-emerald-800"
                placeholder="Contoh: B. 130 Liter"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nilai Panca Cinta</label>
              <select
                value={newQ.pancaCintaValue}
                onChange={(e) => setNewQ({ ...newQ, pancaCintaValue: e.target.value as PancaCintaValue })}
                className="w-full rounded-lg border border-slate-300 px-3 py-1.5 bg-white focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
              >
                <option value="Cinta Allah dan Rasul-Nya">Cinta Allah dan Rasul-Nya</option>
                <option value="Cinta Ilmu">Cinta Ilmu</option>
                <option value="Cinta Lingkungan">Cinta Lingkungan</option>
                <option value="Cinta Diri dan Sesama Manusia">Cinta Diri dan Sesama Manusia</option>
                <option value="Cinta Tanah Air">Cinta Tanah Air</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Pembahasan / Rasional Jawaban</label>
            <textarea
              rows={2}
              value={newQ.explanation}
              onChange={(e) => setNewQ({ ...newQ, explanation: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-1.5 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsAddModalOpen(false)}>
              Batal
            </Button>
            <Button variant="primary" size="sm" type="submit" icon={<Check className="w-4 h-4" />}>
              Simpan ke Bank Soal
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
