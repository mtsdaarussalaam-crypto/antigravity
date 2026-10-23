// MADRASAH KBC LEARNING SUITE: ASSESSMENT & QUESTION BANK SERVICE
// KMA 1503/2025 & Panduan Asesmen Madrasah 2025

import { QuestionItem, AssessmentPackage, QuestionItemType, DifficultyLevel } from '../types';

export const INITIAL_QUESTIONS: QuestionItem[] = [
  {
    id: 'soal-mat-1',
    subjectCode: 'MAT-D',
    subjectName: 'Matematika',
    phase: 'D',
    gradeLevel: 'Kelas VII MTs',
    topic: 'Statistika Data Tunggal & Konservasi Air',
    itemType: 'pilihan_ganda',
    stimulus: 'Santri kelas VII melakukan pengamatan konsumsi air wudhu di madrasah selama 5 hari (Senin s.d. Jumat). Diperoleh data volume air yang digunakan (dalam liter): 120, 150, 110, 140, 130.',
    questionText: 'Berapakah rata-rata (mean) volume air wudhu yang digunakan per hari di madrasah tersebut?',
    options: ['A. 125 Liter', 'B. 130 Liter', 'C. 135 Liter', 'D. 140 Liter'],
    correctAnswer: 'B. 130 Liter',
    explanation: 'Rata-rata = (120 + 150 + 110 + 140 + 130) / 5 = 650 / 5 = 130 Liter.',
    scoringGuide: 'Skor 10 jika memilih B dengan langkah perhitungan tepat.',
    difficulty: 'sedang',
    cognitiveLevel: 'C3',
    pancaCintaValue: 'Cinta Lingkungan',
    isVerified: true,
  },
  {
    id: 'soal-mat-2',
    subjectCode: 'MAT-D',
    subjectName: 'Matematika',
    phase: 'D',
    gradeLevel: 'Kelas VII MTs',
    topic: 'Analisis Data & Pemecahan Masalah Ekologis',
    itemType: 'uraian',
    stimulus: 'Berdasarkan data audit air madrasah, jika satu kran bocor meneteskan 200 ml air per jam dan terdapat 5 kran bocor yang tidak diperbaiki selama 24 jam.',
    questionText: 'Hitunglah total volume air yang terbuang sia-sia dalam 24 jam (dalam satuan liter), dan jelaskan 2 tindakan nyata yang dapat kalian lakukan sebagai wujud nilai Cinta Lingkungan!',
    correctAnswer: 'Total terbuang = 5 kran x 200 ml x 24 jam = 24.000 ml = 24 Liter. Tindakan nyata: 1) Melaporkan kebocoran kepada pihak sarpras madrasah, 2) Menampung tetesan air sementara untuk menyiram tanaman madrasah.',
    explanation: 'Soal menguji kemampuan perkalian kontekstual dan komitmen menjaga lingkungan dari perilaku israf.',
    scoringGuide: 'Perhitungan benar: skor 10; Solusi Panca Cinta bernalar logis: skor 10 (Total 20 poin).',
    difficulty: 'hots',
    cognitiveLevel: 'C4',
    pancaCintaValue: 'Cinta Lingkungan',
    isVerified: true,
  },
  {
    id: 'soal-fq-1',
    subjectCode: 'FQ-D',
    subjectName: 'Fiqih',
    phase: 'D',
    gradeLevel: 'Kelas VII MTs',
    topic: 'Thaharah Berkesadaran (Mindful Thaharah)',
    itemType: 'pilihan_ganda',
    stimulus: 'Rasulullah Saw. pernah berwudhu dengan menggunakan satu mud air (sekitar 0,6 liter) dan melarang berlebih-lebihan meskipun berada di sungai yang mengalir.',
    questionText: 'Sikap yang mencerminkan keteladanan hadis tersebut saat berwudhu di tempat wudhu madrasah adalah...',
    options: [
      'A. Membuka kran sebesar-besarnya agar kotoran cepat hilang',
      'B. Membuka kran secukupnya dan mematikan saat membasuh anggota wudhu dengan tertib',
      'C. Berwudhu sambil mengobrol dengan santri lain',
      'D. Mengulang basuhan lebih dari tiga kali agar lebih suci'
    ],
    correctAnswer: 'B. Membuka kran secukupnya dan mematikan saat membasuh anggota wudhu dengan tertib',
    explanation: 'Islam melarang sikap israf (berlebih-lebihan) dalam beribadah, termasuk saat menggunakan air wudhu.',
    scoringGuide: 'Skor 10 untuk jawaban tepat B.',
    difficulty: 'mudah',
    cognitiveLevel: 'C2',
    pancaCintaValue: 'Cinta Allah dan Rasul-Nya',
    isVerified: true,
  },
  {
    id: 'soal-aa-1',
    subjectCode: 'AA-D',
    subjectName: 'Akidah Akhlak',
    phase: 'D',
    gradeLevel: 'Kelas VII MTs',
    topic: 'Adab Sosial & Pencegahan Bullying',
    itemType: 'kompleks',
    stimulus: 'Di era digital, santri madrasah sering berinteraksi di grup media sosial. Islam mengajarkan prinsip tabayyun (klarifikasi) dan larangan mencela.',
    questionText: 'Pilihlah pernyataan yang BENAR terkait penerapan nilai Cinta Diri dan Sesama Manusia dalam bermedia sosial (Jawaban benar lebih dari satu):',
    options: [
      '1. Memverifikasi kebenaran berita sebelum membagikannya (Tabayyun)',
      '2. Menuliskan komentar apresiatif yang menyejukkan hati sesama teman',
      '3. Membagikan tangkapan layar percakapan pribadi teman tanpa izin',
      '4. Menegur rekan yang keliru dengan santun melalui pesan pribadi bukan mempermalukannya di ruang publik'
    ],
    correctAnswer: 'Pernyataan 1, 2, dan 4 BENAR; Pernyataan 3 SALAH.',
    explanation: 'Adab islami melarang ghibah, namimah, dan membuka aib sesama di ruang publik.',
    scoringGuide: 'Skor 15 jika memilih 1, 2, dan 4 dengan tepat.',
    difficulty: 'sedang',
    cognitiveLevel: 'C4',
    pancaCintaValue: 'Cinta Diri dan Sesama Manusia',
    isVerified: true,
  },
];

const ASSESSMENT_STORAGE_KEY = 'kbc_question_bank';

export class AssessmentBankService {
  private static getStorage(): Storage | { getItem: (k: string) => string | null; setItem: (k: string, v: string) => void } {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage;
    }
    return {
      getItem: (k: string) => null,
      setItem: (k: string, v: string) => {},
    };
  }

  public static getQuestions(): QuestionItem[] {
    const data = this.getStorage().getItem(ASSESSMENT_STORAGE_KEY);
    return data ? JSON.parse(data) : INITIAL_QUESTIONS;
  }

  public static saveQuestion(item: QuestionItem): QuestionItem {
    const list = this.getQuestions();
    const idx = list.findIndex(q => q.id === item.id);
    if (idx >= 0) list[idx] = item;
    else list.push(item);
    this.getStorage().setItem(ASSESSMENT_STORAGE_KEY, JSON.stringify(list));
    return item;
  }

  public static deleteQuestion(id: string): void {
    const list = this.getQuestions().filter(q => q.id !== id);
    this.getStorage().setItem(ASSESSMENT_STORAGE_KEY, JSON.stringify(list));
  }
}
