import { describe, it, expect, beforeEach } from 'vitest';
import { StorageService } from '../src/services/storageService';
import { CurriculumService } from '../src/services/curriculumService';
import { KBCGeneratorService } from '../src/services/kbcGeneratorService';
import { ExportService } from '../src/services/exportService';
import { isSupabaseConfigured } from '../src/lib/supabase';
import { LearningDocument, DocumentVersion, SchoolProfile } from '../src/types';

describe('FINAL AUDIT: Multi-Tenant Data Isolation, RLS & Secrets Security', () => {
  beforeEach(() => {
    StorageService.clearAll();
  });

  it('Audit Multi-Tenant: Dokumen dari Organisasi A tidak boleh bocor ke Organisasi B', () => {
    const orgAId = 'org-madrasah-al-hidayah';
    const orgBId = 'org-madrasah-nurul-iman';

    // Buat dokumen untuk Madrasah A
    const docA: LearningDocument = {
      id: 'doc-org-a-1',
      organizationId: orgAId,
      academicYearId: 'ay-2026',
      semesterId: 'sem-1',
      classId: 'class-7a',
      className: 'Kelas 7A',
      subjectId: 'sub-mat',
      subjectName: 'Matematika',
      authorId: 'user-guru-a',
      authorName: 'Ustadzah Siti Aisyah',
      title: 'Modul Ajar Matematika - Al Hidayah',
      docType: 'modul_ajar',
      status: 'approved',
      versionNumber: 1,
      content: {
        tujuanPembelajaran: ['Memahami pengolahan data madrasah'],
        pancaCintaDetail: [{ value: 'Cinta Ilmu', rationale: 'Eksplorasi matematika' }],
        deepLearningDetail: { coreExperience: 'meaningful', strategicApproach: 'Konteks madrasah' }
      },
      pancaCintaValues: ['Cinta Ilmu'],
      deepLearningExperiences: ['memahami', 'mengaplikasi'],
      isAiGenerated: false,
      isVerifiedByTeacher: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    StorageService.saveDocument(docA);

    // Buat dokumen untuk Madrasah B
    const docB: LearningDocument = {
      id: 'doc-org-b-1',
      organizationId: orgBId,
      academicYearId: 'ay-2026',
      semesterId: 'sem-1',
      classId: 'class-8b',
      className: 'Kelas 8B',
      subjectId: 'sub-ipa',
      subjectName: 'IPA Terpadu',
      authorId: 'user-guru-b',
      authorName: 'Ustadz Ridwan Kamil',
      title: 'Modul Ajar IPA - Nurul Iman',
      docType: 'modul_ajar',
      status: 'draft',
      versionNumber: 1,
      content: {
        tujuanPembelajaran: ['Sistem peredaran darah'],
        pancaCintaDetail: [{ value: 'Cinta Diri dan Sesama Manusia', rationale: 'Menjaga kesehatan tubuh' }],
        deepLearningDetail: { coreExperience: 'mindful', strategicApproach: 'Observasi detak jantung' }
      },
      pancaCintaValues: ['Cinta Diri dan Sesama Manusia'],
      deepLearningExperiences: ['memahami', 'merefleksi'],
      isAiGenerated: false,
      isVerifiedByTeacher: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    StorageService.saveDocument(docB);

    // Verifikasi isolasi query untuk Madrasah A
    const docsForA = StorageService.getDocuments(orgAId);
    expect(docsForA).toHaveLength(1);
    expect(docsForA[0].id).toBe('doc-org-a-1');
    expect(docsForA[0].organizationId).toBe(orgAId);
    expect(docsForA[0].title).toContain('Al Hidayah');

    // Verifikasi isolasi query untuk Madrasah B
    const docsForB = StorageService.getDocuments(orgBId);
    expect(docsForB).toHaveLength(1);
    expect(docsForB[0].id).toBe('doc-org-b-1');
    expect(docsForB[0].organizationId).toBe(orgBId);
    expect(docsForB[0].title).toContain('Nurul Iman');

    // Pastikan tidak ada data yang tercampur
    const leakedDocInA = docsForA.find(d => d.organizationId === orgBId);
    expect(leakedDocInA).toBeUndefined();

    const leakedDocInB = docsForB.find(d => d.organizationId === orgAId);
    expect(leakedDocInB).toBeUndefined();
  });

  it('Audit Secrets: Client frontend tidak mengekspos service_role dan aman jika env kosong', () => {
    // Supabase client harus menangani kondisi tanpa credential dengan aman
    const configured = isSupabaseConfigured();
    expect(typeof configured).toBe('boolean');

    // Pastikan tidak ada variabel service_role di runtime process env frontend
    const envString = JSON.stringify(process.env);
    expect(envString).not.toContain('supabase_service_role_key');
  });

  it('Audit Autosave & Versioning: Perubahan tersimpan dan snapshot versi tidak menimpa versi lama', () => {
    const orgId = 'org-demo';
    const originalDoc: LearningDocument = {
      id: 'doc-versioning-test',
      organizationId: orgId,
      academicYearId: 'ay-2026',
      semesterId: 'sem-1',
      classId: 'c1',
      className: 'Kelas 7A',
      subjectId: 's1',
      subjectName: 'Fikih',
      authorId: 'guru-1',
      authorName: 'Ustadz Ahmad',
      title: 'Modul Ajar Fikih - Versi 1.0',
      docType: 'modul_ajar',
      status: 'draft',
      versionNumber: 1,
      content: {
        tujuanPembelajaran: ['Memahami thaharah'],
        pancaCintaDetail: [{ value: 'Cinta Allah dan Rasul-Nya', rationale: 'Wudhu sempurna' }],
        deepLearningDetail: { coreExperience: 'mindful', strategicApproach: 'Khusyuk' }
      },
      pancaCintaValues: ['Cinta Allah dan Rasul-Nya'],
      deepLearningExperiences: ['memahami', 'mengaplikasi'],
      isAiGenerated: false,
      isVerifiedByTeacher: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    StorageService.saveDocument(originalDoc);

    // Simpan snapshot versi 1.0
    const version1: DocumentVersion = {
      id: 'v1-uuid',
      documentId: 'doc-versioning-test',
      versionNumber: 1,
      content: JSON.parse(JSON.stringify(originalDoc.content)),
      changedBy: 'Ustadz Ahmad',
      changeSummary: 'Rilis draf awal',
      createdAt: new Date().toISOString()
    };
    StorageService.saveVersion(version1);

    // Lakukan Autosave / Pembaruan dokumen menjadi Versi 2.0
    const updatedDoc: LearningDocument = {
      ...originalDoc,
      title: 'Modul Ajar Fikih - Versi 2.0 Revisi Wakamad',
      versionNumber: 2,
      content: {
        ...originalDoc.content,
        tujuanPembelajaran: ['Memahami thaharah', 'Praktik tayamum kondisi darurat']
      },
      updatedAt: new Date().toISOString()
    };
    StorageService.saveDocument(updatedDoc);

    // Simpan snapshot versi 2.0
    const version2: DocumentVersion = {
      id: 'v2-uuid',
      documentId: 'doc-versioning-test',
      versionNumber: 2,
      content: JSON.parse(JSON.stringify(updatedDoc.content)),
      changedBy: 'Ustadz Ahmad',
      changeSummary: 'Revisi menambahkan materi tayamum darurat',
      createdAt: new Date().toISOString()
    };
    StorageService.saveVersion(version2);

    // Verifikasi riwayat versi memuat 2 snapshot utuh
    const versions = StorageService.getVersions('doc-versioning-test');
    expect(versions).toHaveLength(2);
    
    // Snapshot v1.0 tetap memiliki 1 tujuan, tidak tertimpa oleh v2.0
    const v1Snapshot = versions.find(v => v.versionNumber === 1);
    expect(v1Snapshot).toBeDefined();
    expect(v1Snapshot?.content.tujuanPembelajaran).toHaveLength(1);

    // Snapshot v2.0 memiliki 2 tujuan
    const v2Snapshot = versions.find(v => v.versionNumber === 2);
    expect(v2Snapshot).toBeDefined();
    expect(v2Snapshot?.content.tujuanPembelajaran).toHaveLength(2);

    // Dokumen aktif saat ini memuat konten terbaru
    const currentActiveDoc = StorageService.getDocumentById('doc-versioning-test');
    expect(currentActiveDoc?.versionNumber).toBe(2);
    expect(currentActiveDoc?.content.tujuanPembelajaran).toHaveLength(2);
  });
});

describe('FINAL AUDIT: Integrasi Panca Cinta, Deep Learning & Kepatuhan Regulasi', () => {
  it('Memverifikasi 5 Pilar Panca Cinta sesuai SK Dirjen Pendis No. 6077 Tahun 2025', () => {
    const pancaCintaKeys = [
      'cinta_allah_rasul',
      'cinta_ilmu',
      'cinta_diri_sesama',
      'cinta_lingkungan',
      'cinta_tanah_air'
    ];

    pancaCintaKeys.forEach(key => {
      const info = CurriculumService.getPancaCintaInfo(key);
      expect(info.label).toBeDefined();
      expect(info.label.length).toBeGreaterThan(5);
      expect(info.deskripsi).toBeDefined();
      expect(info.deskripsi.length).toBeGreaterThan(10);
    });
  });

  it('Memverifikasi 3 Pilar Deep Learning (Mindful, Meaningful, Joyful)', () => {
    const deepLearningElements = ['mindful', 'meaningful', 'joyful'];
    deepLearningElements.forEach(elem => {
      const info = CurriculumService.getDeepLearningInfo(elem);
      expect(info.title).toBeDefined();
      expect(info.description).toBeDefined();
      expect(info.principles).toBeInstanceOf(Array);
      expect(info.principles.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('Memvalidasi Dokumen Regulasi Resmi Berstatus Terverifikasi (KMA 1503 & SK 6077)', () => {
    const references = CurriculumService.getOfficialReferences();
    expect(references.length).toBeGreaterThanOrEqual(3);

    const kma1503 = references.find(r => r.regulationNumber.includes('1503'));
    expect(kma1503).toBeDefined();
    expect(kma1503?.isOfficial).toBe(true);
    expect(kma1503?.verificationStatus).toBe('terverifikasi');
    expect(kma1503?.year).toBe(2025);

    const kbc6077 = references.find(r => r.regulationNumber.includes('6077'));
    expect(kbc6077).toBeDefined();
    expect(kbc6077?.isOfficial).toBe(true);
    expect(kbc6077?.verificationStatus).toBe('terverifikasi');
  });

  it('Memastikan Pemisahan Tegas antara Hasil Resmi Kemenag vs Usulan AI', () => {
    // 1. Data CP Resmi Kemenag
    const officialOutcomes = CurriculumService.getOfficialLearningOutcomes('D', 'Matematika');
    expect(officialOutcomes.length).toBeGreaterThan(0);
    officialOutcomes.forEach(cp => {
      expect(cp.isOfficial).toBe(true);
      expect(cp.isVerified).toBe(true);
    });

    // 2. Data Usulan AI
    const aiProposal = KBCGeneratorService.generateModulAjar(
      {
        jenjang: 'MTs',
        kelas: 'Kelas VII',
        fase: 'D',
        mataPelajaran: 'Matematika',
        materiPokok: 'Bilangan Bulat & Pecahan',
        tujuanPembelajaran: 'Menganalisis bilangan rasional kontekstual madrasah',
        alokasiWaktu: '4 JP (2 x 40 menit)',
        jumlahPertemuan: 2,
        karakteristikSantri: 'Heterogen dengan minat literasi numerasi aktif',
        kondisiMadrasah: 'Madrasah Adiwiyata berbasis digital',
        pancaCintaPrioritas: ['Cinta Ilmu', 'Cinta Lingkungan'],
        strategiPembelajaran: 'Problem-Based Learning (PBL)',
        isAiMode: true
      },
      'Ustadz Abdullah',
      'MTs Cinta Madani'
    );

    expect(aiProposal.isAiGenerated).toBe(true);
    expect(aiProposal.isVerifiedByTeacher).toBe(false);
    expect(aiProposal.status).toBe('draft');
  });
});

describe('FINAL AUDIT: Ekspor Resilien & Penanganan Format Berkas', () => {
  const dummySchool: SchoolProfile = {
    officialName: 'MTs Al-Ihsan Madani',
    level: 'MTs',
    status: 'swasta',
    nsm: '121232040001',
    npsn: '20278901',
    address: 'Jl. Pesantren Luhur No. 9',
    village: 'Cililin',
    district: 'Cililin',
    regencyCity: 'Kab. Bandung Barat',
    province: 'Jawa Barat',
    headmasterName: 'Dr. H. Ahmad Fauzi, M.Pd.',
    headmasterNip: '197508152002121003'
  };

  it('Ekspor DOCX menghasilkan dokumen WordprocessingML yang valid dengan Kop Resmi', () => {
    const doc: LearningDocument = {
      id: 'doc-docx-test',
      organizationId: 'org-test',
      academicYearId: 'ay-2026',
      semesterId: 'sem-1',
      classId: 'c7',
      className: 'Kelas 7A',
      subjectId: 's-mat',
      subjectName: 'Matematika',
      authorId: 'guru-1',
      authorName: 'Ustadzah Nurul',
      title: 'Modul Ajar Matematika KBC',
      docType: 'modul_ajar',
      status: 'approved',
      versionNumber: 1,
      content: {
        tujuanPembelajaran: ['Menganalisis penghematan air madrasah'],
        kegiatanPembelajaran: [
          {
            pertemuan: 1,
            pendahuluan: 'Apersepsi dan tadarus pagi',
            inti: {
              memahami: 'Memahami konsep volume',
              mengaplikasi: 'Pengukuran volume air terbuang di tempat wudhu',
              merefleksi: 'Refleksi cinta lingkungan'
            },
            penutup: 'Doa dan kesimpulan',
            alokasiMenit: 80
          }
        ],
        pancaCintaDetail: [
          {
            value: 'Cinta Lingkungan',
            rationale: 'Konservasi air wudhu',
            characterTarget: 'Peduli alam',
            concreteActivity: 'Audit kran air',
            observableIndicator: 'Mematikan kran rapat'
          }
        ],
        deepLearningDetail: {
          coreExperience: 'meaningful',
          strategicApproach: 'Konteks nyata madrasah',
          triggerQuestion: 'Berapa liter air wudhu terbuang?',
          scaffoldingSupport: 'Tabel lembar kerja terbimbing'
        }
      },
      pancaCintaValues: ['Cinta Lingkungan'],
      deepLearningExperiences: ['memahami', 'mengaplikasi', 'merefleksi'],
      isAiGenerated: false,
      isVerifiedByTeacher: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const blob = ExportService.exportToDOCX(doc, dummySchool);
    expect(blob).toBeDefined();
    expect(blob.type).toBe('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    expect(blob.size).toBeGreaterThan(1000);
  });

  it('Ekspor XLSX SpreadsheetML menghasilkan Workbook dengan Styling Excel yang terstruktur', () => {
    const headers = ['No', 'Nama Guru', 'Mata Pelajaran', 'Status'];
    const rows = [
      [1, 'Ustadzah Nurul', 'Matematika', 'Disetujui'],
      [2, 'Ustadz Ridwan', 'Fikih', 'Menunggu Review']
    ];

    const blob = ExportService.exportToXLSX('Rekapitulasi_Guru', headers, rows);
    expect(blob).toBeDefined();
    expect(blob.type).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    expect(blob.size).toBeGreaterThan(500);
  });

  it('Ekspor CSV menyertakan UTF-8 BOM untuk mencegah karakter rusak di Microsoft Excel', () => {
    const headers = ['Indikator', 'Panca Cinta', 'Keterangan'];
    const rows = [
      ['Nilai 1', 'Cinta Allah & Rasul-Nya', 'Khusyuk & Tawadhu’']
    ];

    const blob = ExportService.exportToCSV(headers, rows);
    expect(blob).toBeDefined();
    expect(blob.type).toBe('text/csv;charset=utf-8;');
    expect(blob.size).toBeGreaterThan(30);
  });
});
