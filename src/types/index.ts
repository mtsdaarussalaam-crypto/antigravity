// Master Type Definitions: MADRASAH KBC LEARNING SUITE
// Sesuai KMA No. 1503 Tahun 2025 & SK Dirjen Pendis No. 6077 Tahun 2025

export type EducationLevel = 'RA' | 'MI' | 'MTs' | 'MA' | 'MAK';
export type SchoolStatus = 'negeri' | 'swasta';
export type CurriculumPhase = 'Fondasi' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export type UserRole = 
  | 'super_admin'
  | 'admin_madrasah'
  | 'kepala_madrasah'
  | 'wakamad_kurikulum'
  | 'guru'
  | 'pengawas'
  | 'kolaborator';

export type VerificationStatus = 'terverifikasi' | 'perlu_verifikasi' | 'tidak_berlaku';

export type DocumentStatus = 
  | 'draft'
  | 'in_progress'
  | 'ready_for_review'
  | 'under_review'
  | 'needs_revision'
  | 'approved'
  | 'archived';

export type PancaCintaValue = 
  | 'Cinta Allah dan Rasul-Nya'
  | 'Cinta Ilmu'
  | 'Cinta Lingkungan'
  | 'Cinta Diri dan Sesama Manusia'
  | 'Cinta Tanah Air';

export type DeepLearningDimension = 'mindful' | 'meaningful' | 'joyful';
export type CognitiveExperience = 'memahami' | 'mengaplikasi' | 'merefleksi';
export type LearningStrategy = 
  | 'Inkuiri'
  | 'Pembelajaran Berbasis Masalah (PBL)'
  | 'Pembelajaran Berbasis Proyek (PjBL)'
  | 'Diskusi Kolaboratif'
  | 'Eksperimen & Investigasi'
  | 'Studi Kasus Kontekstual'
  | 'Pembelajaran Berdiferensiasi';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SchoolProfile {
  id: string;
  organizationId: string;
  officialName: string;
  level: EducationLevel;
  status: SchoolStatus;
  nsm?: string;
  npsn?: string;
  address: string;
  village: string;
  district: string;
  regencyCity: string;
  province: string;
  postalCode?: string;
  phone?: string;
  email: string;
  website?: string;
  headmasterName: string;
  headmasterNip?: string;
  headmasterSignatureUrl?: string;
  madrasahLogoUrl?: string;
  letterheadTemplate?: string;
  docNumberFormat: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationSettings {
  id: string;
  organizationId: string;
  activeAcademicYearId?: string;
  activeSemesterId?: string;
  timezone: string;
  language: string;
  aiProvider: string;
  aiEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  nip?: string;
  nuptk?: string;
  phone?: string;
  avatarUrl?: string;
  isActive: boolean;
  role: UserRole;
  organizationId: string;
  organizationName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AcademicYear {
  id: string;
  organizationId: string;
  name: string; // e.g. "2026/2027"
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface Semester {
  id: string;
  organizationId: string;
  academicYearId: string;
  semesterType: 'ganjil' | 'genap';
  name: string; // e.g. "Semester 1 (Ganjil)"
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface ClassRoom {
  id: string;
  organizationId: string;
  academicYearId: string;
  gradeLevel: number; // 1-12
  name: string; // e.g. "7-A", "10-MIPA-1"
  phase: CurriculumPhase;
  homeroomTeacherId?: string;
  homeroomTeacherName?: string;
  studentCount?: number;
}

export interface Subject {
  id: string;
  organizationId: string;
  code: string;
  name: string;
  category: 'PAI' | 'Bahasa Arab' | 'Umum' | 'Pilihan' | 'Mulok';
  weeklyHours: number;
  phase?: CurriculumPhase;
  isActive: boolean;
}

export interface TeacherAssignment {
  id: string;
  organizationId: string;
  academicYearId: string;
  teacherId: string;
  teacherName: string;
  subjectId: string;
  subjectName: string;
  classId: string;
  className: string;
}

export interface RegulatoryReference {
  id: string;
  title: string;
  regulationNumber: string;
  year: number;
  publisher: string;
  version: string;
  verificationStatus: VerificationStatus;
  sourceUrl?: string;
  filePath?: string;
  verifiedBy?: string;
  verifiedAt?: string;
  notes?: string;
  category: 'KMA' | 'Dirjen Pendis' | 'Panduan Kurikulum' | 'Panduan PPA' | 'Kokurikuler';
  isOfficial?: boolean;
}

// ====================================================================
// KURIKULUM RESMI: CAPAIAN PEMBELAJARAN (CP), TUJUAN PEMBELAJARAN (TP), ATP
// ====================================================================

export interface LearningOutcome {
  id: string;
  subjectCode: string;
  subjectName: string;
  category: 'PAI' | 'Bahasa Arab' | 'Umum';
  phase: CurriculumPhase;
  gradeLevel: string; // misal "Kelas VII - IX"
  element: string; // misal "Al-Qur'an", "Bilangan", "Zat dan Perubahannya"
  outcomeText: string;
  referenceId: string;
  regulationTitle: string;
  isOfficial: boolean; // TRUE: Dokumen Resmi Kemenag; FALSE: Hasil Usulan AI
  isVerified: boolean;
}

export interface LearningObjective {
  id: string;
  outcomeId: string;
  code: string; // e.g. "TP.MAT.7.1"
  objectiveText: string;
  competency: string; // Kompetensi inti
  materialScope: string; // Lingkup materi
  pancaCintaValue: PancaCintaValue;
  cognitiveLevel: 'C1' | 'C2' | 'C3' | 'C4' | 'C5' | 'C6';
  isAiGenerated: boolean;
  isVerified: boolean;
  notes?: string;
}

export interface ATPStep {
  stepNumber: number;
  objectiveCode: string;
  objectiveText: string;
  semester: 1 | 2;
  allocatedHours: number;
  pancaCintaFocus: PancaCintaValue;
  assessmentPlan: string;
}

export interface LearningObjectiveFlow {
  id: string;
  organizationId: string;
  subjectId: string;
  subjectName: string;
  phase: CurriculumPhase;
  title: string;
  steps: ATPStep[];
  totalHours: number;
  academicYear: string;
  authorName: string;
  isVerified: boolean;
  createdAt: string;
}

// ====================================================================
// INTEGRASI PANCA CINTA & PEMBELAJARAN MENDALAM
// ====================================================================

export interface PancaCintaIntegrationDetail {
  value: PancaCintaValue;
  rationale: string; // Alasan pemilihan nilai
  characterTarget: string; // Tujuan karakter
  concreteActivity: string; // Kegiatan pembelajaran konkret
  observableIndicator: string; // Perilaku/indikator teramati
  teacherRole: string; // Peran pendidik
  studentRole: string; // Peran peserta didik
  learningEvidence: string; // Bukti belajar / artefak
  reflectionMethod: string; // Cara refleksi
}

export interface DeepLearningDesign {
  principles: DeepLearningDimension[]; // Mindful, Meaningful, Joyful
  cognitiveExperiences: CognitiveExperience[]; // Memahami, Mengaplikasi, Merefleksi
  strategy: LearningStrategy;
  triggerQuestion: string; // Pertanyaan pemantik
  contextualProblem: string; // Konteks masalah nyata
  understandingActivity: string; // Aktivitas memahami (mindful exploration)
  applyingActivity: string; // Aktivitas mengaplikasi (meaningful collaboration/creation)
  reflectingActivity: string; // Aktivitas merefleksi (joyful reflection & feedback)
  differentiation: {
    content: string; // Diferensiasi konten
    process: string; // Diferensiasi proses
    product: string; // Diferensiasi produk
  };
  scaffoldingSupport: string; // Dukungan bagi santri yang membutuhkan
}

// ====================================================================
// DOKUMEN PERANGKAT PEMBELAJARAN LENGKAP
// ====================================================================

export interface ModulAjarContent {
  identitas: {
    penyusun: string;
    instansi: string;
    tahunAjaran: string;
    jenjang: string;
    fase: CurriculumPhase;
    kelas: string;
    mataPelajaran: string;
    alokasiWaktu: string;
    jumlahPertemuan: number;
  };
  kompetensiAwal: string[];
  profilPelajarKBC: PancaCintaValue[];
  saranaPrasarana: string[];
  targetPesertaDidik: string;
  modelPembelajaran: LearningStrategy;
  tujuanPembelajaran: string[];
  pemahamanBermakna: string;
  pertanyaanPemantik: string[];
  kegiatanPembelajaran: {
    pertemuan: number;
    pendahuluan: string;
    inti: {
      memahami: string;
      mengaplikasi: string;
      merefleksi: string;
    };
    penutup: string;
    alokasiMenit: number;
  }[];
  pancaCintaDetail: PancaCintaIntegrationDetail[];
  deepLearningDetail: DeepLearningDesign;
  asesmen: {
    diagnostik: string;
    formatif: string;
    sumatif: string;
    rubrik: {
      kriteria: string;
      baruBerkembang: string;
      layak: string;
      cakap: string;
      mahir: string;
    }[];
  };
  lembarKerja: {
    judul: string;
    tujuan: string;
    instruksi: string[];
    pertanyaanDiskusi: string[];
  };
  remedialPengayaan: {
    remedial: string;
    pengayaan: string;
  };
  refleksiGuru: string[];
  refleksiSiswa: string[];
}

export interface LearningDocument {
  id: string;
  organizationId: string;
  academicYearId: string;
  semesterId: string;
  subjectId: string;
  subjectName: string;
  classId?: string;
  className?: string;
  authorId: string;
  authorName: string;
  docType: 'modul_ajar' | 'rpp' | 'prota' | 'promes' | 'lkpd' | 'asesmen' | 'kokurikuler';
  title: string;
  topic?: string;
  timeAllocation?: string;
  status: DocumentStatus;
  versionNumber: number;
  content: Record<string, any>; // ModulAjarContent or other doc structure
  pancaCintaValues: PancaCintaValue[];
  deepLearningExperiences: CognitiveExperience[];
  isAiGenerated: boolean;
  isVerifiedByTeacher: boolean;
  updatedAt: string;
  createdAt: string;
}

export interface DocumentReview {
  id: string;
  documentId: string;
  reviewerId: string;
  reviewerName: string;
  reviewerRole: string;
  comments: string;
  complianceScore?: number;
  pancacintaScore?: number;
  deepLearningScore?: number;
  suggestedAction: 'approve' | 'request_revision';
  createdAt: string;
}

export interface DocumentApproval {
  id: string;
  documentId: string;
  approvedBy: string;
  approverName: string;
  approverNip?: string;
  approvalDate: string;
  officialNotes: string;
  signatureHash: string;
  createdAt: string;
}

export interface DocumentVersion {
  id: string;
  documentId: string;
  versionNumber: number;
  content: Record<string, any>;
  changedBy: string;
  changeSummary: string;
  createdAt: string;
}

// ====================================================================
// BANK SOAL, ASESMEN & BAHAN AJAR
// ====================================================================

export type QuestionItemType = 
  | 'pilihan_ganda'
  | 'kompleks'
  | 'benar_salah'
  | 'uraian'
  | 'menjodohkan';

export type DifficultyLevel = 'mudah' | 'sedang' | 'sukar' | 'hots';

export interface QuestionItem {
  id: string;
  subjectCode: string;
  subjectName: string;
  phase: CurriculumPhase;
  gradeLevel: string;
  topic: string;
  itemType: QuestionItemType;
  stimulus?: string;
  questionText: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  scoringGuide: string;
  difficulty: DifficultyLevel;
  pancaCintaValue?: PancaCintaValue;
  cognitiveLevel: 'C1' | 'C2' | 'C3' | 'C4' | 'C5' | 'C6';
  isVerified: boolean;
}

export interface AssessmentPackage {
  id: string;
  title: string;
  subjectId: string;
  subjectName: string;
  classId?: string;
  className?: string;
  type: 'diagnostik' | 'formatif' | 'sumatif';
  targetTP: string;
  totalScore: number;
  durationMinutes: number;
  questions: QuestionItem[];
  rubricCriteria?: {
    criteria: string;
    baruBerkembang: string;
    layak: string;
    cakap: string;
    mahir: string;
  }[];
  authorName: string;
  createdAt: string;
}

export interface TeachingMaterial {
  id: string;
  title: string;
  subjectName: string;
  phase: CurriculumPhase;
  gradeLevel: string;
  topic: string;
  summary: string;
  contentBody: string;
  pancaCintaFocus: PancaCintaValue;
  deepLearningDimension: DeepLearningDimension;
  authorName: string;
  createdAt: string;
}

// ====================================================================
// PROGRAM KOKURIKULER (P5-PPRA KBC)
// ====================================================================

export type CocurricularTheme = 
  | 'Gaya Hidup Berkelanjutan'
  | 'Kearifan Lokal'
  | 'Bhinneka Tunggal Ika'
  | 'Bangunlah Jiwa dan Raganya'
  | 'Rekayasa dan Teknologi'
  | 'Kewirausahaan'
  | 'Suara Demokrasi';

export interface CocurricularProject {
  id: string;
  title: string;
  academicYear: string;
  theme: CocurricularTheme;
  targetPhase: CurriculumPhase;
  durationWeeks: number;
  dimensions: string[];
  pancaCintaFocus: PancaCintaValue[];
  objectives: string[];
  stages: {
    stageName: string;
    activities: string[];
    allocatedHours: number;
  }[];
  rubric: {
    dimension: string;
    mulaiBerkembang: string;
    sedangBerkembang: string;
    berkembangSesuaiHarapan: string;
    sangatBerkembang: string;
  }[];
  coordinatorName: string;
  createdAt: string;
}

// ====================================================================
// LAPORAN & ANALITIK
// ====================================================================

export interface TeacherCompletionStats {
  teacherId: string;
  teacherName: string;
  nip?: string;
  subjects: string[];
  totalAssigned: number;
  completedDocs: number;
  reviewPendingDocs: number;
  revisionRequiredDocs: number;
  complianceRate: number;
}

export interface MadrasahAnalytics {
  totalDocuments: number;
  approvedCount: number;
  reviewCount: number;
  revisionCount: number;
  draftCount: number;
  teacherStats: TeacherCompletionStats[];
  pancaCintaCoverage: Record<PancaCintaValue, number>;
}

export interface AuditLog {
  id: string;
  organizationId?: string;
  userId?: string;
  userName?: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  details?: Record<string, any>;
  createdAt: string;
}
