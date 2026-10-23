// MADRASAH KBC LEARNING SUITE: COCURRICULAR PROGRAM SERVICE (P5-PPRA KBC)
// Panduan Kokurikuler Madrasah 2025 & SK Dirjen Pendis Nomor 6077 Tahun 2025

import { CocurricularProject } from '../types';

export const INITIAL_PROJECTS: CocurricularProject[] = [
  {
    id: 'proj-1',
    title: 'Madrasah Hijau (Green Madrasah): Audit Konservasi Air & Pengolahan Sampah Mandiri',
    academicYear: '2026/2027',
    theme: 'Gaya Hidup Berkelanjutan',
    targetPhase: 'D',
    durationWeeks: 4,
    dimensions: [
      'Beriman, Bertakwa kepada Tuhan YME, dan Berakhlak Mulia',
      'Gotong Royong',
      'Bernalar Kritis',
      'Berkeadaban (Ta’addub)',
      'Keteladanan (Qudwah)',
    ],
    pancaCintaFocus: ['Cinta Lingkungan', 'Cinta Allah dan Rasul-Nya'],
    objectives: [
      'Santri mampu mengidentifikasi titik pemborosan air dan sampah di lingkungan madrasah.',
      'Santri mampu merancang instalasi sederhana daur ulang air wudhu atau komposter organik.',
      'Santri membiasakan gaya hidup anti-israf dan menjaga kelestarian alam sebagai wujud syukur.',
    ],
    stages: [
      {
        stageName: 'Tahap 1: Pengenalan & Mindful Discovery (Pekan 1)',
        activities: [
          'Tadabbur ayat-ayat kelestarian alam dan hadis larangan berbuat kerusakan di bumi.',
          'Eksplorasi isu krisis air bersih dan pencemaran sampah plastik global dan lokal.',
        ],
        allocatedHours: 12,
      },
      {
        stageName: 'Tahap 2: Kontekstualisasi & Investigasi Lapangan (Pekan 2)',
        activities: [
          'Audit lapangan debit air tempat wudhu dan timbulan sampah kantin madrasah.',
          'Wawancara dengan pengelola sarana prasarana madrasah.',
        ],
        allocatedHours: 16,
      },
      {
        stageName: 'Tahap 3: Aksi Nyata & Pembuatan Purwarupa (Pekan 3)',
        activities: [
          'Merakit model filter air wudhu sederhana menggunakan ijuk, arang, pasir silika, dan kerikil.',
          'Pembuatan tempat sampah terpilah dan poster edukasi hemat air.',
        ],
        allocatedHours: 20,
      },
      {
        stageName: 'Tahap 4: Refleksi, Gelar Karya & Tindak Lanjut (Pekan 4)',
        activities: [
          'Gelar Karya (Exhibition) di hadapan guru, pimpinan madrasah, dan orang tua santri.',
          'Penilaian antarteman dan penandatanganan komitmen bersama Madrasah Hijau.',
        ],
        allocatedHours: 12,
      },
    ],
    rubric: [
      {
        dimension: 'Kepedulian Lingkungan (Cinta Lingkungan)',
        mulaiBerkembang: 'Masih membutuhkan teguran untuk tidak membuang sampah sembarangan atau menutup kran air.',
        sedangBerkembang: 'Menjaga kebersihan dan hemat air jika diingatkan dalam kegiatan terjadwal.',
        berkembangSesuaiHarapan: 'Secara mandiri memilah sampah, menutup kran air bocor, dan menjaga keasrian madrasah.',
        sangatBerkembang: 'Menjadi inisiator kampanye lingkungan, mengajak rekan lain, dan memelihara sarana konservasi secara konsisten.',
      },
      {
        dimension: 'Kolaborasi & Kerja Sama (Ta’awun)',
        mulaiBerkembang: 'Kurang aktif berkontribusi dalam kelompok kerja.',
        sedangBerkembang: 'Melaksanakan tugas kelompok sesuai arahan ketua tim.',
        berkembangSesuaiHarapan: 'Bekerja sama secara aktif, saling menghargai pendapat, dan berbagi peran secara adil.',
        sangatBerkembang: 'Mampu memimpin tim dengan adab islami, memediasi perbedaan, dan menyemangati anggota tim.',
      },
    ],
    coordinatorName: 'Hj. Siti Aminah, M.Pd (Wakamad Kurikulum)',
    createdAt: '2026-08-01T08:00:00Z',
  },
  {
    id: 'proj-2',
    title: 'Santri Berkeadaban: Deklarasi Madrasah Ramah Anak & Anti-Perundungan',
    academicYear: '2026/2027',
    theme: 'Bangunlah Jiwa dan Raganya',
    targetPhase: 'D',
    durationWeeks: 3,
    dimensions: [
      'Mandiri',
      'Kreatif',
      'Toleransi (Tasamuh)',
      'Kewarganegaraan dan Kebangsaan (Muwathanah)',
    ],
    pancaCintaFocus: ['Cinta Diri dan Sesama Manusia', 'Cinta Tanah Air'],
    objectives: [
      'Santri memahami dampak negatif perundungan verbal, fisik, dan siber (cyberbullying).',
      'Santri mempraktikkan komunikasi asertif berlandaskan adab santun islami.',
    ],
    stages: [
      {
        stageName: 'Tahap 1: Refleksi Diri & Empati Sosial',
        activities: ['Menonton film pendek edukatif anti-perundungan dan refleksi hening.'],
        allocatedHours: 10,
      },
      {
        stageName: 'Tahap 2: Kampanye Kreatif & Role Playing',
        activities: ['Latihan simulasi penanganan konflik dan pembuatan komik/poster digital anti-bullying.'],
        allocatedHours: 14,
      },
      {
        stageName: 'Tahap 3: Deklarasi & Komitmen Bersama',
        activities: ['Pembacaan ikrar santri bersaudara dan pembentukan duta konselor sebaya madrasah.'],
        allocatedHours: 8,
      },
    ],
    rubric: [
      {
        dimension: 'Adab Sosial & Empati',
        mulaiBerkembang: 'Kadang masih melontarkan panggilan yang kurang pantas kepada teman.',
        sedangBerkembang: 'Menghindari perkataan kasar dan mampu meminta maaf jika bersalah.',
        berkembangSesuaiHarapan: 'Bertutur kata santun, mendengarkan rekan, dan membela teman yang disudutkan.',
        sangatBerkembang: 'Menjadi teladan akhlak terpuji di madrasah, pelopor pertemanan inklusif tanpa sekat.',
      },
    ],
    coordinatorName: 'M. Wildan Kurniawan, S.Kom',
    createdAt: '2026-09-01T08:00:00Z',
  },
];

const COCURRICULAR_STORAGE_KEY = 'kbc_cocurricular_projects';

export class CocurricularService {
  private static getStorage(): Storage | { getItem: (k: string) => string | null; setItem: (k: string, v: string) => void } {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage;
    }
    return {
      getItem: (k: string) => null,
      setItem: (k: string, v: string) => {},
    };
  }

  public static getProjects(): CocurricularProject[] {
    const data = this.getStorage().getItem(COCURRICULAR_STORAGE_KEY);
    return data ? JSON.parse(data) : INITIAL_PROJECTS;
  }

  public static saveProject(project: CocurricularProject): CocurricularProject {
    const list = this.getProjects();
    const idx = list.findIndex(p => p.id === project.id);
    if (idx >= 0) list[idx] = project;
    else list.push(project);
    this.getStorage().setItem(COCURRICULAR_STORAGE_KEY, JSON.stringify(list));
    return project;
  }
}
