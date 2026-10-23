import React, { useState } from 'react';
import { StorageService } from '../services/storageService';
import { AcademicYear, Semester, ClassRoom, Subject, TeacherAssignment } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { GraduationCap, Calendar, BookOpen, UserCheck, Plus, Check } from 'lucide-react';

export const AcademicStructurePage: React.FC = () => {
  const [tab, setTab] = useState<'classes' | 'subjects' | 'years' | 'assignments'>('classes');
  const [classes, setClasses] = useState<ClassRoom[]>(() => StorageService.getClasses());
  const [subjects, setSubjects] = useState<Subject[]>(() => StorageService.getSubjects());
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>(() => StorageService.getAcademicYears());
  const [assignments, setAssignments] = useState<TeacherAssignment[]>(() => StorageService.getAssignments());

  const [isAddClassModalOpen, setIsAddClassModalOpen] = useState(false);
  const [newClass, setNewClass] = useState({
    name: '',
    gradeLevel: 7,
    phase: 'D' as 'A' | 'B' | 'C' | 'D' | 'E' | 'F',
    studentCount: 30,
  });

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClass.name) return;
    const created: ClassRoom = {
      id: `cls-${Date.now()}`,
      organizationId: 'org-demo-1',
      academicYearId: 'ay-2026-2027',
      name: newClass.name,
      gradeLevel: Number(newClass.gradeLevel),
      phase: newClass.phase,
      studentCount: Number(newClass.studentCount),
    };
    StorageService.saveClass(created);
    setClasses(StorageService.getClasses());
    setIsAddClassModalOpen(false);
    setNewClass({ name: '', gradeLevel: 7, phase: 'D', studentCount: 30 });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Struktur Akademik, Kelas & Penugasan</h2>
          <p className="text-xs text-slate-500 mt-1">
            Pengorganisasian tahun ajaran, rombongan belajar (rombel), mata pelajaran, dan penugasan mengajar (Section R Master Prompt).
          </p>
        </div>
      </div>

      {/* TABS */}
      <div className="flex border-b border-slate-200 gap-2">
        {[
          { id: 'classes', label: 'Rombongan Belajar (Kelas)', count: classes.length, icon: <GraduationCap className="w-4 h-4" /> },
          { id: 'subjects', label: 'Mata Pelajaran (Struktur)', count: subjects.length, icon: <BookOpen className="w-4 h-4" /> },
          { id: 'assignments', label: 'Penugasan Guru', count: assignments.length, icon: <UserCheck className="w-4 h-4" /> },
          { id: 'years', label: 'Tahun Ajaran & Semester', count: academicYears.length, icon: <Calendar className="w-4 h-4" /> },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as any)}
            className={`flex items-center gap-2 py-3 px-4 border-b-2 font-medium text-xs transition ${
              tab === t.id
                ? 'border-madrasah-700 text-madrasah-800 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {t.icon}
            <span>{t.label}</span>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded-full font-bold">
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* TAB 1: KELAS & ROMBEL */}
      {tab === 'classes' && (
        <Card
          title="Daftar Rombongan Belajar (Kelas Aktif)"
          subtitle="Tahun Ajaran 2026/2027"
          action={
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsAddClassModalOpen(true)}
              icon={<Plus className="w-4 h-4" />}
            >
              Tambah Rombel
            </Button>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {classes.map((c) => (
              <div key={c.id} className="p-4 rounded-xl border border-slate-200/90 bg-white hover:border-madrasah-400 transition-all shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="emerald">Fase {c.phase}</Badge>
                  <span className="text-[11px] font-semibold text-slate-400">Tingkat {c.gradeLevel}</span>
                </div>
                <h4 className="text-base font-bold text-slate-900">{c.name}</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Wali Kelas: <strong>{c.homeroomTeacherName || 'Belum Ditugaskan'}</strong>
                </p>
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Kapasitas:</span>
                  <span className="font-semibold text-slate-800">{c.studentCount || 30} Santri</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB 2: MATA PELAJARAN */}
      {tab === 'subjects' && (
        <Card title="Struktur Kurikulum & Mata Pelajaran" subtitle="Kesesuaian KMA 1503 Tahun 2025">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-y border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Kode</th>
                  <th className="py-3 px-4">Nama Mata Pelajaran</th>
                  <th className="py-3 px-4">Kategori Regulasi</th>
                  <th className="py-3 px-4">Beban Belajar</th>
                  <th className="py-3 px-4">Fase</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subjects.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-4 font-mono font-bold text-madrasah-800">{s.code}</td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{s.name}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        s.category === 'PAI' ? 'bg-emerald-100 text-emerald-800' :
                        s.category === 'Bahasa Arab' ? 'bg-gold-100 text-gold-900' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {s.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-700">{s.weeklyHours} Jam Pelajaran (JP) / Pekan</td>
                    <td className="py-3 px-4">Fase {s.phase || 'D'}</td>
                    <td className="py-3 px-4">
                      <span className="text-emerald-700 font-medium">Aktif</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* TAB 3: PENUGASAN GURU */}
      {tab === 'assignments' && (
        <Card title="Matriks Penugasan Mengajar Guru" subtitle="Pemetaan Guru, Mata Pelajaran, dan Rombel">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-y border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Nama Guru</th>
                  <th className="py-3 px-4">Mata Pelajaran</th>
                  <th className="py-3 px-4">Kelas / Rombel</th>
                  <th className="py-3 px-4">Tahun Ajaran</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {assignments.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-4 font-semibold text-slate-800">{a.teacherName}</td>
                    <td className="py-3 px-4">{a.subjectName}</td>
                    <td className="py-3 px-4 font-medium text-madrasah-800">{a.className}</td>
                    <td className="py-3 px-4 text-slate-500 font-mono">2026/2027</td>
                    <td className="py-3 px-4 text-right">
                      <Badge variant="success">Ditugaskan</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* TAB 4: TAHUN AJARAN & SEMESTER */}
      {tab === 'years' && (
        <Card title="Pengaturan Kalender & Periode Pembelajaran" subtitle="KMA 1503/2025">
          <div className="space-y-4">
            {academicYears.map((ay) => (
              <div key={ay.id} className="p-4 rounded-xl border border-slate-200 flex items-center justify-between bg-white">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-800">Tahun Ajaran {ay.name}</h4>
                    {ay.isActive && <Badge variant="success">Aktif Berjalan</Badge>}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Rentang Periode: {ay.startDate} s/d {ay.endDate}
                  </p>
                </div>
                <div className="text-xs text-slate-600 font-medium">
                  Semester 1 (Ganjil) & Semester 2 (Genap)
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* MODAL TAMBAH KELAS */}
      <Modal
        isOpen={isAddClassModalOpen}
        onClose={() => setIsAddClassModalOpen(false)}
        title="Tambah Rombongan Belajar (Kelas)"
        subtitle="Buat rombel baru untuk jenjang madrasah aktif"
      >
        <form onSubmit={handleCreateClass} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Rombel / Kelas *</label>
            <input
              type="text"
              required
              value={newClass.name}
              onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
              className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
              placeholder="Contoh: 7-C (Tahfidz) atau 10-IPA-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tingkat Kelas (1-12)</label>
              <input
                type="number"
                min="1"
                max="12"
                value={newClass.gradeLevel}
                onChange={(e) => setNewClass({ ...newClass, gradeLevel: Number(e.target.value) })}
                className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Fase Kurikulum</label>
              <select
                value={newClass.phase}
                onChange={(e) => setNewClass({ ...newClass, phase: e.target.value as any })}
                className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none bg-white"
              >
                <option value="A">Fase A (Kelas 1-2 MI)</option>
                <option value="B">Fase B (Kelas 3-4 MI)</option>
                <option value="C">Fase C (Kelas 5-6 MI)</option>
                <option value="D">Fase D (Kelas 7-9 MTs)</option>
                <option value="E">Fase E (Kelas 10 MA/MAK)</option>
                <option value="F">Fase F (Kelas 11-12 MA/MAK)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Jumlah Santri / Siswa</label>
            <input
              type="number"
              value={newClass.studentCount}
              onChange={(e) => setNewClass({ ...newClass, studentCount: Number(e.target.value) })}
              className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsAddClassModalOpen(false)}>
              Batal
            </Button>
            <Button variant="primary" size="sm" type="submit" icon={<Check className="w-4 h-4" />}>
              Simpan Rombel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
