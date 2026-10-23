// MADRASAH KBC LEARNING SUITE: CURRICULUM SERVICE (CP, TP, ATP)
// Berdasarkan KMA Nomor 1503 Tahun 2025 & SK Dirjen Pendis Nomor 6077 Tahun 2025

import { 
  LearningOutcome, 
  LearningObjective, 
  LearningObjectiveFlow, 
  CurriculumPhase,
  RegulatoryReference
} from '../types';
import { StorageService } from './storageService';

// DATA RESMI CAPAIAN PEMBELAJARAN (KMA 1503/2025)
// isOfficial = true, isVerified = true
export const OFFICIAL_CAPAIAN_PEMBELAJARAN: LearningOutcome[] = [
  // --- AL-QUR'AN HADIS (FASE D) ---
  {
    id: 'cp-qh-d-1',
    subjectCode: 'QH-D',
    subjectName: "Al-Qur'an Hadis",
    category: 'PAI',
    phase: 'D',
    gradeLevel: 'Kelas VII - IX MTs',
    element: "Ilmu Tajwid & Tilawah Al-Qur'an",
    outcomeText: "Peserta didik memahami hukum bacaan Mad Thabi'i, Mad Far'i, hukum bacaan Ra dan Lam Jalalah secara mendalam, serta mampu mempraktikkannya dengan fasih dan tartil dalam tilawah Al-Qur'an sehari-hari sebagai wujud kecintaan kepada kalam ilahi.",
    referenceId: 'reg-kma-1503-2025',
    regulationTitle: 'KMA Nomor 1503 Tahun 2025 (Lampiran PAI Fase D)',
    isOfficial: true,
    isVerified: true,
  },
  {
    id: 'cp-qh-d-2',
    subjectCode: 'QH-D',
    subjectName: "Al-Qur'an Hadis",
    category: 'PAI',
    phase: 'D',
    gradeLevel: 'Kelas VII - IX MTs',
    element: 'Pemahaman Ayat & Hadis Tematik',
    outcomeText: "Peserta didik mampu menganalisis kandungan ayat Al-Qur'an dan hadis nabi tentang optimisme, toleransi, kelestarian alam dan lingkungan hidup, serta meneladaninya dalam kehidupan bermasyarakat dan berbangsa.",
    referenceId: 'reg-kma-1503-2025',
    regulationTitle: 'KMA Nomor 1503 Tahun 2025 (Lampiran PAI Fase D)',
    isOfficial: true,
    isVerified: true,
  },

  // --- AKIDAH AKHLAK (FASE D) ---
  {
    id: 'cp-aa-d-1',
    subjectCode: 'AA-D',
    subjectName: 'Akidah Akhlak',
    category: 'PAI',
    phase: 'D',
    gradeLevel: 'Kelas VII - IX MTs',
    element: 'Akidah & Asmaul Husna',
    outcomeText: "Peserta didik mampu memahami hakikat akidah Islamiyah, sifat-sifat wajib, mustahil, dan jaiz bagi Allah Swt., serta menghayati Asmaul Husna (Al-Ghaffar, Al-Bashir, As-Sami', Al-Adl) sebagai landasan spiritual penanaman Panca Cinta dalam berpikir dan bertindak.",
    referenceId: 'reg-kma-1503-2025',
    regulationTitle: 'KMA Nomor 1503 Tahun 2025 (Lampiran PAI Fase D)',
    isOfficial: true,
    isVerified: true,
  },
  {
    id: 'cp-aa-d-2',
    subjectCode: 'AA-D',
    subjectName: 'Akidah Akhlak',
    category: 'PAI',
    phase: 'D',
    gradeLevel: 'Kelas VII - IX MTs',
    element: 'Akhlak Terpuji (Mahmudah) & Adab Sosial',
    outcomeText: "Peserta didik terbiasa menerapkan akhlak terpuji kepada Allah Swt., sesama manusia, dan alam lingkungan (ikhlas, taubat, sabar, syukur, tawadhu', adab bermedia sosial) serta menjauhi akhlak tercela (riya', hasad, fitnah, perusakan lingkungan).",
    referenceId: 'reg-kma-1503-2025',
    regulationTitle: 'KMA Nomor 1503 Tahun 2025 (Lampiran PAI Fase D)',
    isOfficial: true,
    isVerified: true,
  },

  // --- FIQIH (FASE D) ---
  {
    id: 'cp-fq-d-1',
    subjectCode: 'FQ-D',
    subjectName: 'Fiqih',
    category: 'PAI',
    phase: 'D',
    gradeLevel: 'Kelas VII - IX MTs',
    element: 'Thaharah & Ibadah Mahdhah',
    outcomeText: "Peserta didik memahami ketentuan bersuci (thaharah) dari hadats dan najis menggunakan air mutlak secara bijak dan hemat, tata cara shalat fardhu dan sunnah, sujud, zakat, puasa, dan haji/umrah sesuai sunnah Rasulullah Saw. dengan penuh kesadaran (mindful).",
    referenceId: 'reg-kma-1503-2025',
    regulationTitle: 'KMA Nomor 1503 Tahun 2025 (Lampiran PAI Fase D)',
    isOfficial: true,
    isVerified: true,
  },
  {
    id: 'cp-fq-d-2',
    subjectCode: 'FQ-D',
    subjectName: 'Fiqih',
    category: 'PAI',
    phase: 'D',
    gradeLevel: 'Kelas VII - IX MTs',
    element: 'Muamalah & Makanan Halal-Thayyib',
    outcomeText: "Peserta didik menganalisis ketentuan jual beli, khiyar, riba, serta prinsip konsumsi halal dan thayyib yang menyehatkan diri dan tidak merusak lingkungan sekitar.",
    referenceId: 'reg-kma-1503-2025',
    regulationTitle: 'KMA Nomor 1503 Tahun 2025 (Lampiran PAI Fase D)',
    isOfficial: true,
    isVerified: true,
  },

  // --- SEJARAH KEBUDAYAAN ISLAM (FASE D) ---
  {
    id: 'cp-ski-d-1',
    subjectCode: 'SKI-D',
    subjectName: 'Sejarah Kebudayaan Islam (SKI)',
    category: 'PAI',
    phase: 'D',
    gradeLevel: 'Kelas VII - IX MTs',
    element: 'Peradaban Islam Klasik & Keteladanan Khulafaur Rasyidin',
    outcomeText: "Peserta didik mampu menganalisis misi dakwah Nabi Muhammad Saw. di Makkah dan Madinah, kepemimpinan Khulafaur Rasyidin, serta perkembangan ilmu pengetahuan pada masa Dinasti Umayyah dan Abbasiyah secara kritis dan kontekstual.",
    referenceId: 'reg-kma-1503-2025',
    regulationTitle: 'KMA Nomor 1503 Tahun 2025 (Lampiran PAI Fase D)',
    isOfficial: true,
    isVerified: true,
  },

  // --- BAHASA ARAB (FASE D) ---
  {
    id: 'cp-arb-d-1',
    subjectCode: 'ARB-D',
    subjectName: 'Bahasa Arab',
    category: 'Bahasa Arab',
    phase: 'D',
    gradeLevel: 'Kelas VII - IX MTs',
    element: 'Menyimak (Istima) & Berbicara (Kalam)',
    outcomeText: "Peserta didik mampu mengeksplorasi informasi dan berkomunikasi secara lisan dalam Bahasa Arab tentang ta'aruf, fasilitas madrasah, keluarga, dan lingkungan hidup dengan lafal dan intonasi yang fasih dan santun.",
    referenceId: 'reg-kma-1503-2025',
    regulationTitle: 'KMA Nomor 1503 Tahun 2025 (Lampiran Bahasa Arab)',
    isOfficial: true,
    isVerified: true,
  },

  // --- MATEMATIKA (FASE D) ---
  {
    id: 'cp-mat-d-1',
    subjectCode: 'MAT-D',
    subjectName: 'Matematika',
    category: 'Umum',
    phase: 'D',
    gradeLevel: 'Kelas VII - IX MTs',
    element: 'Analisis Data dan Peluang (Statistika)',
    outcomeText: "Peserta didik dapat merumuskan pertanyaan, mengumpulkan, menyajikan, dan menganalisis data menggunakan diagram batang, garis, lingkaran, dan diagram titik; serta menggunakan ukuran pemusatan (mean, median, modus) untuk mengambil keputusan logis dan bertanggung jawab.",
    referenceId: 'reg-kma-1503-2025',
    regulationTitle: 'KMA Nomor 1503 Tahun 2025 & BSKAP Kurikulum Madrasah',
    isOfficial: true,
    isVerified: true,
  },
  {
    id: 'cp-mat-d-2',
    subjectCode: 'MAT-D',
    subjectName: 'Matematika',
    category: 'Umum',
    phase: 'D',
    gradeLevel: 'Kelas VII - IX MTs',
    element: 'Bilangan & Aljabar',
    outcomeText: "Peserta didik dapat membaca, menulis, dan membandingkan bilangan bulat, pecahan, desimal, persen, serta menyelesaikan persamaan dan pertidaksamaan linier satu variabel dalam pemecahan masalah kontekstual madrasah.",
    referenceId: 'reg-kma-1503-2025',
    regulationTitle: 'KMA Nomor 1503 Tahun 2025 & BSKAP Kurikulum Madrasah',
    isOfficial: true,
    isVerified: true,
  },

  // --- IPA (FASE D) ---
  {
    id: 'cp-ipa-d-1',
    subjectCode: 'IPA-D',
    subjectName: 'Ilmu Pengetahuan Alam (IPA)',
    category: 'Umum',
    phase: 'D',
    gradeLevel: 'Kelas VII - IX MTs',
    element: 'Ekologi & Keanekaragaman Hayati',
    outcomeText: "Peserta didik mampu mengidentifikasi interaksi antarmakhluk hidup dan lingkungannya, menganalisis dampak aktivitas manusia terhadap pencemaran lingkungan dan perubahan iklim, serta merancang upaya pelestarian lingkungan hidup berbasis kearifan lokal madrasah.",
    referenceId: 'reg-kma-1503-2025',
    regulationTitle: 'KMA Nomor 1503 Tahun 2025 & BSKAP Kurikulum Madrasah',
    isOfficial: true,
    isVerified: true,
  },

  // --- BAHASA INDONESIA (FASE D) ---
  {
    id: 'cp-ind-d-1',
    subjectCode: 'IND-D',
    subjectName: 'Bahasa Indonesia',
    category: 'Umum',
    phase: 'D',
    gradeLevel: 'Kelas VII - IX MTs',
    element: 'Menulis & Mempresentasikan Teks Argumentasi',
    outcomeText: "Peserta didik mampu menulis gagasan, pikiran, pandangan, arahan atau pesan tertulis dalam bentuk teks argumentasi dan eksposisi tentang isu-isu sosial dan lingkungan hidup dengan etika berbahasa yang santun, logis, dan dapat dipertanggungjawabkan.",
    referenceId: 'reg-kma-1503-2025',
    regulationTitle: 'KMA Nomor 1503 Tahun 2025 & BSKAP Kurikulum Madrasah',
    isOfficial: true,
    isVerified: true,
  },
];

// DATA CONTOH FORMULASI TUJUAN PEMBELAJARAN (TP)
// Menampilkan diferensiasi mana yang telah diverifikasi guru vs hasil usulan AI
export const INITIAL_TUJUAN_PEMBELAJARAN: LearningObjective[] = [
  {
    id: 'tp-mat-7-1',
    outcomeId: 'cp-mat-d-1',
    code: 'TP.MAT.7.1',
    objectiveText: 'Peserta didik mampu mengumpulkan data penggunaan debit air harian di madrasah, menyajikannya dalam bentuk diagram batang dan garis secara cermat dan jujur.',
    competency: 'Mengumpulkan dan menyajikan data statistik',
    materialScope: 'Penyajian Data Statistika (Tabel & Diagram)',
    pancaCintaValue: 'Cinta Lingkungan',
    cognitiveLevel: 'C3',
    isAiGenerated: false,
    isVerified: true,
    notes: 'Diverifikasi oleh Guru Matematika MTs Cinta Madani.',
  },
  {
    id: 'tp-mat-7-2',
    outcomeId: 'cp-mat-d-1',
    code: 'TP.MAT.7.2',
    objectiveText: 'Peserta didik mampu menghitung dan membandingkan nilai rata-rata (mean), median, dan modus dari data konsumsi energi madrasah untuk menyimpulkan rekomendasi penghematan.',
    competency: 'Menganalisis ukuran pemusatan data',
    materialScope: 'Ukuran Pemusatan Data Tunggal',
    pancaCintaValue: 'Cinta Ilmu',
    cognitiveLevel: 'C4',
    isAiGenerated: false,
    isVerified: true,
    notes: 'Kombinasi literasi numerasi dan kepedulian energi madrasah.',
  },
  {
    id: 'tp-fq-7-1',
    outcomeId: 'cp-fq-d-1',
    code: 'TP.FQ.7.1',
    objectiveText: 'Peserta didik mampu mendemonstrasikan tata cara wudhu dan tayamum secara sempurna sesuai rukun dan sunnah, dengan menggunakan air secara efisien (tidak berlebih-lebihan/israf).',
    competency: 'Mempraktikkan thaharah berkesadaran',
    materialScope: 'Ketentuan Bersuci (Thaharah) & Hemat Air',
    pancaCintaValue: 'Cinta Allah dan Rasul-Nya',
    cognitiveLevel: 'C3',
    isAiGenerated: false,
    isVerified: true,
    notes: 'Meneladani hadis Rasulullah Saw. tentang larangan israf dalam berwudhu.',
  },
  {
    id: 'tp-ipa-7-1',
    outcomeId: 'cp-ipa-d-1',
    code: 'TP.IPA.7.1',
    objectiveText: 'Peserta didik mampu melakukan investigasi uji kualitas air di lingkungan sekitar madrasah serta merumuskan aksi nyata konservasi air bersih.',
    competency: 'Investigasi ilmiah ekosistem air',
    materialScope: 'Pencemaran Lingkungan & Ekosistem Akuatik',
    pancaCintaValue: 'Cinta Lingkungan',
    cognitiveLevel: 'C5',
    isAiGenerated: false,
    isVerified: true,
  },
  {
    id: 'tp-ind-7-1',
    outcomeId: 'cp-ind-d-1',
    code: 'TP.IND.7.1',
    objectiveText: 'Peserta didik mampu menyusun teks argumentasi kritis bertema "Moderasi Beragama dan Kerukunan Santri" menggunakan kosakata baku dan rujukan data yang valid.',
    competency: 'Menulis teks argumentasi kritis',
    materialScope: 'Teks Argumentasi & Fakta Opini',
    pancaCintaValue: 'Cinta Tanah Air',
    cognitiveLevel: 'C4',
    isAiGenerated: true, // Ditandai jelas sebagai hasil usulan AI
    isVerified: false, // Perlu verifikasi guru
    notes: 'Rekomendasi usulan pedagogis AI - Perlu telaah guru mata pelajaran.',
  },
];

// DATA CONTOH ALUR TUJUAN PEMBELAJARAN (ATP)
export const INITIAL_ATP_LIST: LearningObjectiveFlow[] = [
  {
    id: 'atp-mat-7',
    organizationId: 'org-demo-1',
    subjectId: 'sub-mat',
    subjectName: 'Matematika',
    phase: 'D',
    title: 'Alur Tujuan Pembelajaran (ATP) Matematika Fase D Kelas VII KBC',
    academicYear: '2026/2027',
    authorName: 'Ustadzah Nurul Hidayati, S.Pd',
    totalHours: 72,
    isVerified: true,
    createdAt: '2026-07-20T08:00:00Z',
    steps: [
      {
        stepNumber: 1,
        objectiveCode: 'TP.MAT.7.1',
        objectiveText: 'Pengumpulan dan penyajian data konsumsi air wudhu madrasah dalam diagram batang dan garis.',
        semester: 1,
        allocatedHours: 8,
        pancaCintaFocus: 'Cinta Lingkungan',
        assessmentPlan: 'Asesmen Formatif Kinerja & Proyek Mini Observasi Debit Air',
      },
      {
        stepNumber: 2,
        objectiveCode: 'TP.MAT.7.2',
        objectiveText: 'Analisis ukuran pemusatan data (mean, median, modus) untuk rekomendasi efisiensi sumber daya.',
        semester: 1,
        allocatedHours: 10,
        pancaCintaFocus: 'Cinta Ilmu',
        assessmentPlan: 'Tes Tertulis Penalaran Numerasi & LKPD Analisis Data',
      },
    ],
  },
];

const CURRICULUM_STORAGE_KEYS = {
  CP: 'kbc_learning_outcomes',
  TP: 'kbc_learning_objectives',
  ATP: 'kbc_learning_objective_flows',
};

export class CurriculumService {
  private static isInitialized = false;

  private static getStorage(): Storage | { getItem: (k: string) => string | null; setItem: (k: string, v: string) => void } {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage;
    }
    // In-memory fallback
    return {
      getItem: (k: string) => null,
      setItem: (k: string, v: string) => {},
    };
  }

  public static initialize(): void {
    if (this.isInitialized) return;
    const storage = this.getStorage();
    if (!storage.getItem(CURRICULUM_STORAGE_KEYS.CP)) {
      storage.setItem(CURRICULUM_STORAGE_KEYS.CP, JSON.stringify(OFFICIAL_CAPAIAN_PEMBELAJARAN));
    }
    if (!storage.getItem(CURRICULUM_STORAGE_KEYS.TP)) {
      storage.setItem(CURRICULUM_STORAGE_KEYS.TP, JSON.stringify(INITIAL_TUJUAN_PEMBELAJARAN));
    }
    if (!storage.getItem(CURRICULUM_STORAGE_KEYS.ATP)) {
      storage.setItem(CURRICULUM_STORAGE_KEYS.ATP, JSON.stringify(INITIAL_ATP_LIST));
    }
    this.isInitialized = true;
  }

  // --- Capaian Pembelajaran (CP) ---
  public static getAllCP(): LearningOutcome[] {
    this.initialize();
    const storage = this.getStorage();
    const data = storage.getItem(CURRICULUM_STORAGE_KEYS.CP);
    return data ? JSON.parse(data) : OFFICIAL_CAPAIAN_PEMBELAJARAN;
  }

  public static getCPBySubject(subjectCode: string): LearningOutcome[] {
    return this.getAllCP().filter(cp => cp.subjectCode === subjectCode);
  }

  public static getCPByPhase(phase: CurriculumPhase): LearningOutcome[] {
    return this.getAllCP().filter(cp => cp.phase === phase);
  }

  public static getCPById(id: string): LearningOutcome | undefined {
    return this.getAllCP().find(cp => cp.id === id);
  }

  // --- Tujuan Pembelajaran (TP) ---
  public static getAllTP(): LearningObjective[] {
    this.initialize();
    const storage = this.getStorage();
    const data = storage.getItem(CURRICULUM_STORAGE_KEYS.TP);
    return data ? JSON.parse(data) : INITIAL_TUJUAN_PEMBELAJARAN;
  }

  public static getTPByOutcomeId(outcomeId: string): LearningObjective[] {
    return this.getAllTP().filter(tp => tp.outcomeId === outcomeId);
  }

  public static saveTP(tp: LearningObjective): LearningObjective {
    const list = this.getAllTP();
    const idx = list.findIndex(item => item.id === tp.id);
    if (idx >= 0) {
      list[idx] = tp;
    } else {
      list.push(tp);
    }
    this.getStorage().setItem(CURRICULUM_STORAGE_KEYS.TP, JSON.stringify(list));
    return tp;
  }

  public static verifyTP(tpId: string, teacherNotes?: string): void {
    const list = this.getAllTP();
    const item = list.find(tp => tp.id === tpId);
    if (item) {
      item.isVerified = true;
      if (teacherNotes) item.notes = teacherNotes;
      this.getStorage().setItem(CURRICULUM_STORAGE_KEYS.TP, JSON.stringify(list));
    }
  }

  // --- Alur Tujuan Pembelajaran (ATP) ---
  public static getAllATP(): LearningObjectiveFlow[] {
    this.initialize();
    const storage = this.getStorage();
    const data = storage.getItem(CURRICULUM_STORAGE_KEYS.ATP);
    return data ? JSON.parse(data) : INITIAL_ATP_LIST;
  }

  public static saveATP(atp: LearningObjectiveFlow): LearningObjectiveFlow {
    const list = this.getAllATP();
    const idx = list.findIndex(item => item.id === atp.id);
    if (idx >= 0) {
      list[idx] = atp;
    } else {
      list.push(atp);
    }
    this.getStorage().setItem(CURRICULUM_STORAGE_KEYS.ATP, JSON.stringify(list));
    return atp;
  }

  // --- Info Regulasi, Panca Cinta & Deep Learning ---
  public static getPancaCintaInfo(key: string): { label: string; deskripsi: string } {
    const map: Record<string, { label: string; deskripsi: string }> = {
      cinta_allah_rasul: {
        label: 'Cinta Allah Swt. dan Rasul-Nya',
        deskripsi: 'Menumbuhkan kesadaran tauhid, ibadah ikhlas, dan meneladani akhlak mulia Nabi Muhammad Saw.'
      },
      cinta_ilmu: {
        label: 'Cinta Ilmu Pengetahuan',
        deskripsi: 'Membangkitkan daya kritis, rasa ingin tahu ilmiah, cinta literasi, dan ketekunan belajar.'
      },
      cinta_diri_sesama: {
        label: 'Cinta Diri Sendiri dan Sesama',
        deskripsi: 'Menghargai martabat insani, menjaga kesehatan jasmani rohani, toleransi, empati, dan ukhuwah.'
      },
      cinta_lingkungan: {
        label: 'Cinta Lingkungan dan Kelestarian Alam',
        deskripsi: 'Merawat bumi sebagai amanah khalifah, hemat sumber daya air dan energi, serta menjaga kebersihan madrasah.'
      },
      cinta_tanah_air: {
        label: 'Cinta Tanah Air dan Bangsa',
        deskripsi: 'Menjunjung tinggi persatuan NKRI, moderasi beragama, kepatuhan hukum, dan kontribusi bagi bangsa.'
      }
    };
    return map[key] || { label: key, deskripsi: 'Pilar pembentukan karakter kurikulum berbasis cinta madrasah.' };
  }

  public static getDeepLearningInfo(key: string): { title: string; description: string; principles: string[] } {
    const map: Record<string, { title: string; description: string; principles: string[] }> = {
      mindful: {
        title: 'Mindful Learning (Berkesadaran Penuh)',
        description: 'Pembelajaran dengan atensi terpusat, kesadaran emosional, dan kehadiran utuh.',
        principles: ['Fokus perhatian', 'Ketenangan batin', 'Refleksi diri']
      },
      meaningful: {
        title: 'Meaningful Learning (Pembelajaran Bermakna)',
        description: 'Koneksi pengetahuan baru dengan pengalaman nyata dan pemecahan masalah autentik.',
        principles: ['Relevansi kehidupan nyata', 'Integrasi ilmu', 'Dampak sosial']
      },
      joyful: {
        title: 'Joyful Learning (Menyenangkan & Menggembirakan)',
        description: 'Suasana belajar yang aman, penuh optimisme, kolaboratif, dan membangkitkan kebahagiaan.',
        principles: ['Rasa ingin tahu', 'Kolaborasi positif', 'Apresiasi karya']
      }
    };
    return map[key] || {
      title: key,
      description: 'Pendekatan pembelajaran mendalam',
      principles: ['Memahami', 'Mengaplikasikan', 'Merefleksikan']
    };
  }

  public static getOfficialReferences(): RegulatoryReference[] {
    return StorageService.getRegulations();
  }

  public static getOfficialLearningOutcomes(phase?: string, subject?: string): LearningOutcome[] {
    let list = this.getAllCP().filter(cp => cp.isOfficial && cp.isVerified);
    if (phase) {
      const cleanPhase = phase.replace('fase_', '').toUpperCase();
      list = list.filter(cp => cp.phase.toUpperCase() === cleanPhase);
    }
    if (subject) {
      list = list.filter(cp => cp.subjectName.toLowerCase().includes(subject.toLowerCase()));
    }
    return list;
  }
}
