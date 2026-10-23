// MADRASAH KBC LEARNING SUITE: STORAGE & LOCAL REPOSITORY SERVICE
// Menyediakan penyimpanan lokal terstruktur & sinkronisasi database

import { 
  SchoolProfile, 
  Organization, 
  UserProfile, 
  AcademicYear, 
  Semester, 
  ClassRoom, 
  Subject, 
  TeacherAssignment, 
  RegulatoryReference, 
  LearningDocument,
  DocumentVersion,
  AuditLog
} from '../types';

const STORAGE_KEYS = {
  ORGANIZATION: 'kbc_organization',
  SCHOOL_PROFILE: 'kbc_school_profile',
  CURRENT_USER: 'kbc_current_user',
  USERS_LIST: 'kbc_users_list',
  ACADEMIC_YEARS: 'kbc_academic_years',
  SEMESTERS: 'kbc_semesters',
  CLASSES: 'kbc_classes',
  SUBJECTS: 'kbc_subjects',
  ASSIGNMENTS: 'kbc_teacher_assignments',
  REGULATIONS: 'kbc_regulatory_references',
  DOCUMENTS: 'kbc_learning_documents',
  AUDIT_LOGS: 'kbc_audit_logs',
  ONBOARDED: 'kbc_onboarded',
};

// DEMO DATA DEFAULT (Berlabel DEMO sesuai instruksi Section AA)
const DEFAULT_ORG: Organization = {
  id: 'org-demo-1',
  name: 'MTs Cinta Madani (DEMO)',
  slug: 'mts-cinta-madani-demo',
  isActive: true,
  createdAt: '2026-07-01T08:00:00Z',
  updatedAt: '2026-10-23T08:00:00Z',
};

const DEFAULT_SCHOOL_PROFILE: SchoolProfile = {
  id: 'profile-demo-1',
  organizationId: 'org-demo-1',
  officialName: 'Madrasah Tsanawiyah Cinta Madani (DEMO)',
  level: 'MTs',
  status: 'swasta',
  nsm: '121232010099',
  npsn: '69987654',
  address: 'Jl. Moderasi Beragama No. 1945, Kompleks Pendidikan Terpadu',
  village: 'Sukamaju',
  district: 'Cilandak',
  regencyCity: 'Jakarta Selatan',
  province: 'DKI Jakarta',
  postalCode: '12430',
  phone: '(021) 7890123',
  email: 'info@mtscintamadani.sch.id',
  website: 'https://mtscintamadani.sch.id',
  headmasterName: 'Dr. H. Ahmad Fauzi, M.Pd.I',
  headmasterNip: '197508172002121003',
  docNumberFormat: '{nomor}/MTs-CM/KBC/{bulan}/{tahun}',
  letterheadTemplate: 'KEMENAG_STANDARD',
  createdAt: '2026-07-01T08:00:00Z',
  updatedAt: '2026-10-23T08:00:00Z',
};

export const DEFAULT_USERS: UserProfile[] = [
  {
    id: 'user-superadmin',
    email: 'superadmin@kemenag.go.id',
    fullName: 'Ust. H. Abdurrahman, M.Ed (DEMO)',
    role: 'super_admin',
    organizationId: 'org-demo-1',
    organizationName: 'Kementerian Agama / Sistem Global',
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-10-23T00:00:00Z',
  },
  {
    id: 'user-admin',
    email: 'admin@mtscintamadani.sch.id',
    fullName: 'M. Wildan Kurniawan, S.Kom (DEMO)',
    role: 'admin_madrasah',
    organizationId: 'org-demo-1',
    organizationName: 'MTs Cinta Madani',
    isActive: true,
    createdAt: '2026-07-01T00:00:00Z',
    updatedAt: '2026-10-23T00:00:00Z',
  },
  {
    id: 'user-kepala',
    email: 'kamad@mtscintamadani.sch.id',
    fullName: 'Dr. H. Ahmad Fauzi, M.Pd.I (DEMO)',
    nip: '197508172002121003',
    role: 'kepala_madrasah',
    organizationId: 'org-demo-1',
    organizationName: 'MTs Cinta Madani',
    isActive: true,
    createdAt: '2026-07-01T00:00:00Z',
    updatedAt: '2026-10-23T00:00:00Z',
  },
  {
    id: 'user-wakamad',
    email: 'kurikulum@mtscintamadani.sch.id',
    fullName: 'Hj. Siti Aminah, M.Pd (DEMO)',
    nip: '198004122005012004',
    role: 'wakamad_kurikulum',
    organizationId: 'org-demo-1',
    organizationName: 'MTs Cinta Madani',
    isActive: true,
    createdAt: '2026-07-01T00:00:00Z',
    updatedAt: '2026-10-23T00:00:00Z',
  },
  {
    id: 'user-guru1',
    email: 'guru.matematika@mtscintamadani.sch.id',
    fullName: 'Ustadzah Nurul Hidayati, S.Pd (DEMO)',
    nuptk: '4567891234567890',
    role: 'guru',
    organizationId: 'org-demo-1',
    organizationName: 'MTs Cinta Madani',
    isActive: true,
    createdAt: '2026-07-01T00:00:00Z',
    updatedAt: '2026-10-23T00:00:00Z',
  },
  {
    id: 'user-pengawas',
    email: 'pengawas.dki@kemenag.go.id',
    fullName: 'Drs. H. Mulyadi, M.Si (DEMO)',
    nip: '196811201994031002',
    role: 'pengawas',
    organizationId: 'org-demo-1',
    organizationName: 'Kemenag Kota Jakarta Selatan',
    isActive: true,
    createdAt: '2026-07-01T00:00:00Z',
    updatedAt: '2026-10-23T00:00:00Z',
  },
];

const DEFAULT_ACADEMIC_YEARS: AcademicYear[] = [
  {
    id: 'ay-2026-2027',
    organizationId: 'org-demo-1',
    name: '2026/2027',
    startDate: '2026-07-13',
    endDate: '2027-06-25',
    isActive: true,
  },
  {
    id: 'ay-2025-2026',
    organizationId: 'org-demo-1',
    name: '2025/2026',
    startDate: '2025-07-14',
    endDate: '2026-06-26',
    isActive: false,
  },
];

const DEFAULT_SEMESTERS: Semester[] = [
  {
    id: 'sem-2026-1',
    organizationId: 'org-demo-1',
    academicYearId: 'ay-2026-2027',
    semesterType: 'ganjil',
    name: 'Semester Ganjil 2026/2027',
    startDate: '2026-07-13',
    endDate: '2026-12-18',
    isActive: true,
  },
  {
    id: 'sem-2026-2',
    organizationId: 'org-demo-1',
    academicYearId: 'ay-2026-2027',
    semesterType: 'genap',
    name: 'Semester Genap 2026/2027',
    startDate: '2027-01-04',
    endDate: '2027-06-25',
    isActive: false,
  },
];

const DEFAULT_CLASSES: ClassRoom[] = [
  { id: 'cls-7a', organizationId: 'org-demo-1', academicYearId: 'ay-2026-2027', gradeLevel: 7, name: 'Kelas 7-A (Unggulan)', phase: 'D', homeroomTeacherId: 'user-guru1', homeroomTeacherName: 'Ustadzah Nurul Hidayati, S.Pd', studentCount: 32 },
  { id: 'cls-7b', organizationId: 'org-demo-1', academicYearId: 'ay-2026-2027', gradeLevel: 7, name: 'Kelas 7-B', phase: 'D', studentCount: 30 },
  { id: 'cls-8a', organizationId: 'org-demo-1', academicYearId: 'ay-2026-2027', gradeLevel: 8, name: 'Kelas 8-A', phase: 'D', studentCount: 32 },
  { id: 'cls-9a', organizationId: 'org-demo-1', academicYearId: 'ay-2026-2027', gradeLevel: 9, name: 'Kelas 9-A', phase: 'D', studentCount: 28 },
];

const DEFAULT_SUBJECTS: Subject[] = [
  { id: 'sub-qurhad', organizationId: 'org-demo-1', code: 'QH-D', name: "Al-Qur'an Hadis", category: 'PAI', weeklyHours: 2, phase: 'D', isActive: true },
  { id: 'sub-akhlak', organizationId: 'org-demo-1', code: 'AA-D', name: 'Akidah Akhlak', category: 'PAI', weeklyHours: 2, phase: 'D', isActive: true },
  { id: 'sub-fiqih', organizationId: 'org-demo-1', code: 'FQ-D', name: 'Fiqih', category: 'PAI', weeklyHours: 2, phase: 'D', isActive: true },
  { id: 'sub-ski', organizationId: 'org-demo-1', code: 'SKI-D', name: 'Sejarah Kebudayaan Islam (SKI)', category: 'PAI', weeklyHours: 2, phase: 'D', isActive: true },
  { id: 'sub-arab', organizationId: 'org-demo-1', code: 'ARB-D', name: 'Bahasa Arab', category: 'Bahasa Arab', weeklyHours: 3, phase: 'D', isActive: true },
  { id: 'sub-mat', organizationId: 'org-demo-1', code: 'MAT-D', name: 'Matematika', category: 'Umum', weeklyHours: 4, phase: 'D', isActive: true },
  { id: 'sub-ipa', organizationId: 'org-demo-1', code: 'IPA-D', name: 'Ilmu Pengetahuan Alam (IPA)', category: 'Umum', weeklyHours: 4, phase: 'D', isActive: true },
  { id: 'sub-indo', organizationId: 'org-demo-1', code: 'IND-D', name: 'Bahasa Indonesia', category: 'Umum', weeklyHours: 4, phase: 'D', isActive: true },
  { id: 'sub-inggris', organizationId: 'org-demo-1', code: 'ING-D', name: 'Bahasa Inggris', category: 'Umum', weeklyHours: 3, phase: 'D', isActive: true },
];

const DEFAULT_ASSIGNMENTS: TeacherAssignment[] = [
  {
    id: 'asg-1',
    organizationId: 'org-demo-1',
    academicYearId: 'ay-2026-2027',
    teacherId: 'user-guru1',
    teacherName: 'Ustadzah Nurul Hidayati, S.Pd',
    subjectId: 'sub-mat',
    subjectName: 'Matematika',
    classId: 'cls-7a',
    className: 'Kelas 7-A (Unggulan)',
  },
  {
    id: 'asg-2',
    organizationId: 'org-demo-1',
    academicYearId: 'ay-2026-2027',
    teacherId: 'user-guru1',
    teacherName: 'Ustadzah Nurul Hidayati, S.Pd',
    subjectId: 'sub-mat',
    subjectName: 'Matematika',
    classId: 'cls-7b',
    className: 'Kelas 7-B',
  },
];

const DEFAULT_REGULATIONS: RegulatoryReference[] = [
  {
    id: 'reg-kma-1503-2025',
    title: 'Perubahan atas KMA Nomor 450 Tahun 2024 tentang Pedoman Implementasi Kurikulum pada RA, MI, MTs, MA, dan MAK',
    regulationNumber: 'KMA Nomor 1503 Tahun 2025',
    year: 2025,
    publisher: 'Kementerian Agama Republik Indonesia',
    version: '1.0 Resmi',
    verificationStatus: 'terverifikasi',
    sourceUrl: 'https://jdih.kemenag.go.id/regulation/keputusan-menteri-agama-nomor-1503-tahun-2025',
    category: 'KMA',
    verifiedAt: '2026-01-15T10:00:00Z',
    notes: 'Rujukan utama struktur kurikulum, alokasi JP, dan prinsip diferensiasi madrasah.',
    isOfficial: true,
  },
  {
    id: 'reg-kbc-6077-2025',
    title: 'Panduan Kurikulum Berbasis Cinta (KBC)',
    regulationNumber: 'Keputusan Direktur Jenderal Pendidikan Islam Nomor 6077 Tahun 2025',
    year: 2025,
    publisher: 'Direktorat Jenderal Pendidikan Islam Kementerian Agama RI',
    version: '1.0 Resmi',
    verificationStatus: 'terverifikasi',
    sourceUrl: 'https://cdn.kemenag.go.id/storage/archives/panduan-kurikulum-berbasis-cinta.pdf',
    category: 'Dirjen Pendis',
    verifiedAt: '2026-01-15T10:00:00Z',
    notes: 'Pedoman integrasi Panca Cinta (Cinta Allah & Rasul, Ilmu, Lingkungan, Diri & Sesama, Tanah Air).',
    isOfficial: true,
  },
  {
    id: 'reg-ppa-2025',
    title: 'Panduan Pembelajaran dan Asesmen (PPA) Madrasah',
    regulationNumber: 'Panduan PPA KSKK Madrasah 2025',
    year: 2025,
    publisher: 'Direktorat KSKK Madrasah Kemenag RI',
    version: '2025 Revisi',
    verificationStatus: 'terverifikasi',
    sourceUrl: 'https://pendis.kemenag.go.id/',
    category: 'Panduan PPA',
    verifiedAt: '2026-02-01T09:00:00Z',
    notes: 'Pedoman asesmen diagnostik, formatif, sumatif, dan penyusunan rubrik autentik.',
    isOfficial: true,
  },
  {
    id: 'reg-kokurikuler-2025',
    title: 'Panduan Pelaksanaan Kokurikuler Berbasis Proyek Penguatan Karakter Madrasah',
    regulationNumber: 'Pedoman Kokurikuler Ditjen Pendis 2025',
    year: 2025,
    publisher: 'Direktorat KSKK Madrasah Kemenag RI',
    version: '1.0 Resmi',
    verificationStatus: 'terverifikasi',
    sourceUrl: 'https://pendis.kemenag.go.id/',
    category: 'Kokurikuler',
    verifiedAt: '2026-02-10T11:00:00Z',
    notes: 'Panduan tema kokurikuler, pemetaan dimensi profil pelajar, dan rubrik asesmen proyek.',
    isOfficial: true,
  },
];

const DEFAULT_DOCUMENTS: LearningDocument[] = [
  {
    id: 'doc-demo-1',
    organizationId: 'org-demo-1',
    academicYearId: 'ay-2026-2027',
    semesterId: 'sem-2026-1',
    subjectId: 'sub-mat',
    subjectName: 'Matematika',
    classId: 'cls-7a',
    className: 'Kelas 7-A (Unggulan)',
    authorId: 'user-guru1',
    authorName: 'Ustadzah Nurul Hidayati, S.Pd',
    docType: 'modul_ajar',
    title: 'Modul Ajar KBC: Pengolahan Data & Konservasi Air Bersih Madrasah',
    topic: 'Statistika Data Tunggal & Konservasi Sumber Daya Air',
    timeAllocation: '2 Pertemuan (4 JP @ 40 menit)',
    status: 'approved',
    versionNumber: 2,
    pancaCintaValues: ['Cinta Lingkungan', 'Cinta Ilmu', 'Cinta Allah dan Rasul-Nya'],
    deepLearningExperiences: ['memahami', 'mengaplikasi', 'merefleksi'],
    isAiGenerated: false,
    isVerifiedByTeacher: true,
    content: {
      tujuanPembelajaran: 'Peserta didik mampu menganalisis data penggunaan air wudhu madrasah untuk merancang solusi hemat air.',
      kegiatanInti: 'Penyelidikan lapangan debit air, pemodelan data diagram batang, dan refleksi rasa syukur atas nikmat air.',
    },
    createdAt: '2026-08-01T09:00:00Z',
    updatedAt: '2026-08-15T14:30:00Z',
  },
  {
    id: 'doc-demo-2',
    organizationId: 'org-demo-1',
    academicYearId: 'ay-2026-2027',
    semesterId: 'sem-2026-1',
    subjectId: 'sub-mat',
    subjectName: 'Matematika',
    classId: 'cls-7a',
    className: 'Kelas 7-A (Unggulan)',
    authorId: 'user-guru1',
    authorName: 'Ustadzah Nurul Hidayati, S.Pd',
    docType: 'asesmen',
    title: 'Rubrik & Asesmen Formatif: Literasi Numerasi Kontekstual KBC',
    topic: 'Asesmen Formatif Siklus 1',
    timeAllocation: '1 Pertemuan (2 JP)',
    status: 'ready_for_review',
    versionNumber: 1,
    pancaCintaValues: ['Cinta Ilmu', 'Cinta Diri dan Sesama Manusia'],
    deepLearningExperiences: ['mengaplikasi', 'merefleksi'],
    isAiGenerated: false,
    isVerifiedByTeacher: true,
    content: {
      rubrikKriteria: 'Kejujuran pengambilan data, ketepatan perhitungan rata-rata, kerja sama kelompok.',
    },
    createdAt: '2026-09-10T10:00:00Z',
    updatedAt: '2026-09-12T11:00:00Z',
  },
  {
    id: 'doc-demo-3',
    organizationId: 'org-demo-1',
    academicYearId: 'ay-2026-2027',
    semesterId: 'sem-2026-1',
    subjectId: 'sub-mat',
    subjectName: 'Matematika',
    classId: 'cls-7b',
    className: 'Kelas 7-B',
    authorId: 'user-guru1',
    authorName: 'Ustadzah Nurul Hidayati, S.Pd',
    docType: 'lkpd',
    title: 'LKPD Berbasis Kasus: Hemat Air untuk Madrasah Hijau (Green Madrasah)',
    topic: 'Lembar Kerja Peserta Didik Kolaboratif',
    timeAllocation: '2 JP',
    status: 'draft',
    versionNumber: 1,
    pancaCintaValues: ['Cinta Lingkungan'],
    deepLearningExperiences: ['memahami', 'mengaplikasi'],
    isAiGenerated: true,
    isVerifiedByTeacher: false,
    content: {},
    createdAt: '2026-10-01T08:00:00Z',
    updatedAt: '2026-10-05T09:30:00Z',
  },
];

// Storage adapter fallback untuk lingkungan Node.js / Testing / Browser
class MemoryStorage {
  private store: Record<string, string> = {};
  getItem(key: string): string | null {
    return this.store[key] ?? null;
  }
  setItem(key: string, value: string): void {
    this.store[key] = value;
  }
  removeItem(key: string): void {
    delete this.store[key];
  }
  clear(): void {
    this.store = {};
  }
}

const memoryStorageInstance = new MemoryStorage();

const getSafeStorage = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage;
  }
  return memoryStorageInstance;
};

export class StorageService {
  private static isInitialized = false;

  public static initialize(): void {
    if (this.isInitialized) return;
    const storage = getSafeStorage();
    
    if (!storage.getItem(STORAGE_KEYS.ORGANIZATION)) {
      storage.setItem(STORAGE_KEYS.ORGANIZATION, JSON.stringify(DEFAULT_ORG));
    }
    if (!storage.getItem(STORAGE_KEYS.SCHOOL_PROFILE)) {
      storage.setItem(STORAGE_KEYS.SCHOOL_PROFILE, JSON.stringify(DEFAULT_SCHOOL_PROFILE));
    }
    if (!storage.getItem(STORAGE_KEYS.USERS_LIST)) {
      storage.setItem(STORAGE_KEYS.USERS_LIST, JSON.stringify(DEFAULT_USERS));
    }
    if (!storage.getItem(STORAGE_KEYS.CURRENT_USER)) {
      storage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEFAULT_USERS[4])); // Default Guru
    }
    if (!storage.getItem(STORAGE_KEYS.ACADEMIC_YEARS)) {
      storage.setItem(STORAGE_KEYS.ACADEMIC_YEARS, JSON.stringify(DEFAULT_ACADEMIC_YEARS));
    }
    if (!storage.getItem(STORAGE_KEYS.SEMESTERS)) {
      storage.setItem(STORAGE_KEYS.SEMESTERS, JSON.stringify(DEFAULT_SEMESTERS));
    }
    if (!storage.getItem(STORAGE_KEYS.CLASSES)) {
      storage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(DEFAULT_CLASSES));
    }
    if (!storage.getItem(STORAGE_KEYS.SUBJECTS)) {
      storage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(DEFAULT_SUBJECTS));
    }
    if (!storage.getItem(STORAGE_KEYS.ASSIGNMENTS)) {
      storage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(DEFAULT_ASSIGNMENTS));
    }
    if (!storage.getItem(STORAGE_KEYS.REGULATIONS)) {
      storage.setItem(STORAGE_KEYS.REGULATIONS, JSON.stringify(DEFAULT_REGULATIONS));
    }
    if (!storage.getItem(STORAGE_KEYS.DOCUMENTS)) {
      storage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(DEFAULT_DOCUMENTS));
    }
    if (!storage.getItem(STORAGE_KEYS.ONBOARDED)) {
      storage.setItem(STORAGE_KEYS.ONBOARDED, 'true');
    }
    
    this.isInitialized = true;
  }

  // --- Organisasi & Profil Madrasah ---
  public static getOrganization(): Organization {
    this.initialize();
    const data = getSafeStorage().getItem(STORAGE_KEYS.ORGANIZATION);
    return data ? JSON.parse(data) : DEFAULT_ORG;
  }

  public static getSchoolProfile(): SchoolProfile {
    this.initialize();
    const data = getSafeStorage().getItem(STORAGE_KEYS.SCHOOL_PROFILE);
    return data ? JSON.parse(data) : DEFAULT_SCHOOL_PROFILE;
  }

  public static saveSchoolProfile(profile: Partial<SchoolProfile>): SchoolProfile {
    const current = this.getSchoolProfile();
    const updated: SchoolProfile = {
      ...current,
      ...profile,
      updatedAt: new Date().toISOString(),
    };
    getSafeStorage().setItem(STORAGE_KEYS.SCHOOL_PROFILE, JSON.stringify(updated));
    this.logAudit('UPDATE_PROFILE', 'school_profiles', updated.id, { officialName: updated.officialName });
    return updated;
  }

  // --- Autentikasi & Pengguna ---
  public static getCurrentUser(): UserProfile {
    this.initialize();
    const data = getSafeStorage().getItem(STORAGE_KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : DEFAULT_USERS[4];
  }

  public static setCurrentUser(user: UserProfile): void {
    getSafeStorage().setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  }

  public static getUsers(): UserProfile[] {
    this.initialize();
    const data = getSafeStorage().getItem(STORAGE_KEYS.USERS_LIST);
    return data ? JSON.parse(data) : DEFAULT_USERS;
  }

  public static saveUser(user: UserProfile): void {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx >= 0) {
      users[idx] = { ...user, updatedAt: new Date().toISOString() };
    } else {
      users.push({ ...user, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    getSafeStorage().setItem(STORAGE_KEYS.USERS_LIST, JSON.stringify(users));
  }

  // --- Tahun Ajaran & Semester ---
  public static getAcademicYears(): AcademicYear[] {
    this.initialize();
    const data = getSafeStorage().getItem(STORAGE_KEYS.ACADEMIC_YEARS);
    return data ? JSON.parse(data) : DEFAULT_ACADEMIC_YEARS;
  }

  public static saveAcademicYear(year: AcademicYear): void {
    const list = this.getAcademicYears();
    const idx = list.findIndex(y => y.id === year.id);
    if (idx >= 0) list[idx] = year;
    else list.push(year);
    getSafeStorage().setItem(STORAGE_KEYS.ACADEMIC_YEARS, JSON.stringify(list));
  }

  public static getSemesters(): Semester[] {
    this.initialize();
    const data = getSafeStorage().getItem(STORAGE_KEYS.SEMESTERS);
    return data ? JSON.parse(data) : DEFAULT_SEMESTERS;
  }

  // --- Kelas & Mata Pelajaran ---
  public static getClasses(): ClassRoom[] {
    this.initialize();
    const data = getSafeStorage().getItem(STORAGE_KEYS.CLASSES);
    return data ? JSON.parse(data) : DEFAULT_CLASSES;
  }

  public static saveClass(cls: ClassRoom): void {
    const list = this.getClasses();
    const idx = list.findIndex(c => c.id === cls.id);
    if (idx >= 0) list[idx] = cls;
    else list.push(cls);
    getSafeStorage().setItem(STORAGE_KEYS.CLASSES, JSON.stringify(list));
  }

  public static getSubjects(): Subject[] {
    this.initialize();
    const data = getSafeStorage().getItem(STORAGE_KEYS.SUBJECTS);
    return data ? JSON.parse(data) : DEFAULT_SUBJECTS;
  }

  public static saveSubject(subj: Subject): void {
    const list = this.getSubjects();
    const idx = list.findIndex(s => s.id === subj.id);
    if (idx >= 0) list[idx] = subj;
    else list.push(subj);
    getSafeStorage().setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(list));
  }

  public static getAssignments(): TeacherAssignment[] {
    this.initialize();
    const data = getSafeStorage().getItem(STORAGE_KEYS.ASSIGNMENTS);
    return data ? JSON.parse(data) : DEFAULT_ASSIGNMENTS;
  }

  public static saveAssignment(asg: TeacherAssignment): void {
    const list = this.getAssignments();
    const idx = list.findIndex(a => a.id === asg.id);
    if (idx >= 0) list[idx] = asg;
    else list.push(asg);
    getSafeStorage().setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(list));
  }

  // --- Referensi Regulasi ---
  public static getRegulations(): RegulatoryReference[] {
    this.initialize();
    const data = getSafeStorage().getItem(STORAGE_KEYS.REGULATIONS);
    return data ? JSON.parse(data) : DEFAULT_REGULATIONS;
  }

  public static saveRegulation(reg: RegulatoryReference): void {
    const list = this.getRegulations();
    const idx = list.findIndex(r => r.id === reg.id);
    if (idx >= 0) list[idx] = reg;
    else list.push(reg);
    getSafeStorage().setItem(STORAGE_KEYS.REGULATIONS, JSON.stringify(list));
  }

  // --- Dokumen Pembelajaran ---
  public static getDocuments(organizationId?: string): LearningDocument[] {
    this.initialize();
    const data = getSafeStorage().getItem(STORAGE_KEYS.DOCUMENTS);
    const docs: LearningDocument[] = data ? JSON.parse(data) : DEFAULT_DOCUMENTS;
    if (organizationId) {
      return docs.filter(d => d.organizationId === organizationId);
    }
    return docs;
  }

  public static getDocumentById(id: string): LearningDocument | undefined {
    const list = this.getDocuments();
    return list.find(d => d.id === id);
  }

  public static saveDocument(doc: LearningDocument): void {
    const list = this.getDocuments();
    const idx = list.findIndex(d => d.id === doc.id);
    if (idx >= 0) {
      list[idx] = { ...doc, updatedAt: new Date().toISOString() };
    } else {
      list.push({ ...doc, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    getSafeStorage().setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(list));
    this.logAudit('SAVE_DOCUMENT', 'learning_documents', doc.id, { title: doc.title, status: doc.status });
  }

  // --- Snapshot Versioning ---
  public static getVersions(documentId: string): DocumentVersion[] {
    const data = getSafeStorage().getItem(`doc_versions_${documentId}`);
    return data ? JSON.parse(data) : [];
  }

  public static saveVersion(version: DocumentVersion): void {
    const versions = this.getVersions(version.documentId);
    versions.unshift(version);
    getSafeStorage().setItem(`doc_versions_${version.documentId}`, JSON.stringify(versions));
  }

  // --- Audit Log ---
  public static logAudit(action: string, resourceType: string, resourceId?: string, details?: Record<string, any>): void {
    const user = this.getCurrentUser();
    const storage = getSafeStorage();
    const logs: AuditLog[] = JSON.parse(storage.getItem(STORAGE_KEYS.AUDIT_LOGS) || '[]');
    const newLog: AuditLog = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      organizationId: user.organizationId,
      userId: user.id,
      userName: user.fullName,
      action,
      resourceType,
      resourceId,
      details,
      createdAt: new Date().toISOString(),
    };
    logs.unshift(newLog);
    // keep latest 100 logs
    if (logs.length > 100) logs.pop();
    storage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(logs));
  }

  public static getAuditLogs(): AuditLog[] {
    return JSON.parse(getSafeStorage().getItem(STORAGE_KEYS.AUDIT_LOGS) || '[]');
  }

  // --- Reset ke Data Demo ---
  public static resetToDemo(): void {
    getSafeStorage().clear();
    this.isInitialized = false;
    this.initialize();
  }

  // --- Clear All Storage (Untuk Audit / Testing) ---
  public static clearAll(): void {
    getSafeStorage().clear();
    this.isInitialized = false;
  }
}
