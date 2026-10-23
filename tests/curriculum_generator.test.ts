import { describe, it, expect, beforeEach } from 'vitest';
import { CurriculumService } from '../src/services/curriculumService';
import { KBCGeneratorService, GeneratorParameters } from '../src/services/kbcGeneratorService';
import { StorageService } from '../src/services/storageService';
import { PancaCintaValue, ModulAjarContent } from '../src/types';

describe('Madrasah KBC Learning Suite: Curriculum, CP, TP, ATP & Generator Tests', () => {
  beforeEach(() => {
    CurriculumService.initialize();
    StorageService.resetToDemo();
  });

  it('1. Memuat Capaian Pembelajaran (CP) Resmi KMA 1503/2025 secara lengkap', () => {
    const allCP = CurriculumService.getAllCP();
    expect(allCP.length).toBeGreaterThanOrEqual(8);

    // Pastikan seluruh data CP resmi ditandai isOfficial: true dan isVerified: true
    allCP.forEach(cp => {
      expect(cp.isOfficial).toBe(true);
      expect(cp.isVerified).toBe(true);
      expect(cp.regulationTitle).toContain('KMA Nomor 1503 Tahun 2025');
    });

    // Periksa keterwakilan mata pelajaran PAI (QH, AA, FQ, SKI) & Bahasa Arab
    const subjectCodes = allCP.map(c => c.subjectCode);
    expect(subjectCodes).toContain('QH-D');
    expect(subjectCodes).toContain('AA-D');
    expect(subjectCodes).toContain('FQ-D');
    expect(subjectCodes).toContain('SKI-D');
    expect(subjectCodes).toContain('ARB-D');
    expect(subjectCodes).toContain('MAT-D');
    expect(subjectCodes).toContain('IPA-D');
  });

  it('2. Memisahkan secara tegas Data Resmi Kemenag vs Usulan AI pada Tujuan Pembelajaran (TP)', () => {
    const allTP = CurriculumService.getAllTP();
    expect(allTP.length).toBeGreaterThanOrEqual(4);

    // Cari TP yang dirumuskan secara resmi/manual oleh guru
    const verifiedTP = allTP.find(t => !t.isAiGenerated);
    expect(verifiedTP).toBeDefined();
    expect(verifiedTP?.isVerified).toBe(true);

    // Cari TP yang merupakan hasil usulan rekomendasi AI
    const aiTP = allTP.find(t => t.isAiGenerated);
    expect(aiTP).toBeDefined();
    expect(aiTP?.isVerified).toBe(false); // Wajib berstatus belum terverifikasi sebelum disetujui guru
    expect(aiTP?.notes?.toLowerCase()).toContain('usulan');
    expect(aiTP?.notes).toContain('AI');

    // Uji fungsi persetujuan (verifikasi guru)
    if (aiTP) {
      CurriculumService.verifyTP(aiTP.id, 'Disetujui guru pengampu setelah telaah');
      const updatedList = CurriculumService.getAllTP();
      const updatedTP = updatedList.find(t => t.id === aiTP.id);
      expect(updatedTP?.isVerified).toBe(true);
      expect(updatedTP?.notes).toContain('Disetujui guru');
    }
  });

  it('3. Menghasilkan integrasi Panca Cinta konkret dengan indikator perilaku teramati (SK Dirjen Pendis 6077/2025)', () => {
    const values: PancaCintaValue[] = [
      'Cinta Allah dan Rasul-Nya',
      'Cinta Ilmu',
      'Cinta Lingkungan',
      'Cinta Diri dan Sesama Manusia',
      'Cinta Tanah Air'
    ];

    const details = KBCGeneratorService.generatePancaCintaDetails(
      values,
      'Konservasi Air & Statistika',
      'Matematika'
    );

    expect(details.length).toBe(5);

    details.forEach(item => {
      // Setiap nilai wajib memiliki indikator teramati, kegiatan konkret, peran guru & santri
      expect(item.observableIndicator).toBeDefined();
      expect(item.observableIndicator.length).toBeGreaterThan(15);
      expect(item.concreteActivity).toBeDefined();
      expect(item.characterTarget).toBeDefined();
      expect(item.learningEvidence).toBeDefined();
      expect(item.teacherRole).toBeDefined();
      expect(item.studentRole).toBeDefined();
      expect(item.reflectionMethod).toBeDefined();
    });

    // Validasi contoh Cinta Lingkungan pada Matematika
    const cintaLingkungan = details.find(d => d.value === 'Cinta Lingkungan');
    expect(cintaLingkungan?.concreteActivity).toContain('air');
    expect(cintaLingkungan?.observableIndicator).toContain('kran air');
  });

  it('4. Menghasilkan rancangan Pembelajaran Mendalam (Mindful, Meaningful, Joyful & Memahami, Mengaplikasi, Merefleksi)', () => {
    const params: GeneratorParameters = {
      jenjang: 'MTs',
      kelas: 'Kelas 7-A',
      fase: 'D',
      mataPelajaran: 'Matematika',
      materiPokok: 'Statistika Data Tunggal',
      tujuanPembelajaran: 'Peserta didik mampu menganalisis data konsumsi air untuk solusi hemat air.',
      alokasiWaktu: '2 Pertemuan (4 JP)',
      jumlahPertemuan: 2,
      karakteristikSantri: 'Santri antusias',
      kondisiMadrasah: 'Madrasah memiliki masjid & internet',
      pancaCintaPrioritas: ['Cinta Lingkungan', 'Cinta Ilmu'],
      strategiPembelajaran: 'Pembelajaran Berbasis Masalah (PBL)',
      isAiMode: true,
    };

    const deepLearning = KBCGeneratorService.generateDeepLearningDesign(params);

    expect(deepLearning.principles).toContain('mindful');
    expect(deepLearning.principles).toContain('meaningful');
    expect(deepLearning.principles).toContain('joyful');

    expect(deepLearning.cognitiveExperiences).toContain('memahami');
    expect(deepLearning.cognitiveExperiences).toContain('mengaplikasi');
    expect(deepLearning.cognitiveExperiences).toContain('merefleksi');

    expect(deepLearning.triggerQuestion).toBeDefined();
    expect(deepLearning.understandingActivity).toBeDefined();
    expect(deepLearning.applyingActivity).toBeDefined();
    expect(deepLearning.reflectingActivity).toBeDefined();

    // Diferensiasi konten, proses, produk
    expect(deepLearning.differentiation.content).toBeDefined();
    expect(deepLearning.differentiation.process).toBeDefined();
    expect(deepLearning.differentiation.product).toBeDefined();
    expect(deepLearning.scaffoldingSupport).toBeDefined();
  });

  it('5. Menghasilkan Modul Ajar Lengkap dengan 10 Komponen Standar KMA 1503/2025 dan Menyimpannya ke Storage', () => {
    const params: GeneratorParameters = {
      jenjang: 'MTs',
      kelas: 'Kelas 7-B',
      fase: 'D',
      mataPelajaran: 'IPA',
      materiPokok: 'Ekosistem & Keanekaragaman Hayati',
      tujuanPembelajaran: 'Peserta didik mampu merancang upaya konservasi air di madrasah.',
      alokasiWaktu: '2 Pertemuan (4 JP)',
      jumlahPertemuan: 2,
      karakteristikSantri: 'Santri aktif',
      kondisiMadrasah: 'Lengkap',
      pancaCintaPrioritas: ['Cinta Lingkungan', 'Cinta Allah dan Rasul-Nya'],
      strategiPembelajaran: 'Inkuiri',
      isAiMode: true,
    };

    const doc = KBCGeneratorService.generateModulAjar(
      params,
      'Ustadzah Nurul Hidayati, S.Pd',
      'MTs Cinta Madani'
    );

    expect(doc).toBeDefined();
    expect(doc.docType).toBe('modul_ajar');
    expect(doc.isAiGenerated).toBe(true);
    expect(doc.status).toBe('draft');

    const content = doc.content as ModulAjarContent;
    expect(content.identitas.mataPelajaran).toBe('IPA');
    expect(content.kegiatanPembelajaran.length).toBe(2);

    // Periksa kegiatan 3 tahap
    const p1 = content.kegiatanPembelajaran[0];
    expect(p1.inti.memahami).toBeDefined();
    expect(p1.inti.mengaplikasi).toBeDefined();
    expect(p1.inti.merefleksi).toBeDefined();

    // Periksa Rubrik Penilaian Autentik 4 Level
    expect(content.asesmen.rubrik.length).toBeGreaterThanOrEqual(2);
    const rubrik1 = content.asesmen.rubrik[0];
    expect(rubrik1.baruBerkembang).toBeDefined();
    expect(rubrik1.layak).toBeDefined();
    expect(rubrik1.cakap).toBeDefined();
    expect(rubrik1.mahir).toBeDefined();

    // Periksa LKPD terintegrasi
    expect(content.lembarKerja.instruksi.length).toBeGreaterThan(0);
    expect(content.lembarKerja.pertanyaanDiskusi.length).toBeGreaterThan(0);

    // Simpan ke storage
    StorageService.saveDocument(doc);
    const retrieved = StorageService.getDocuments().find(d => d.id === doc.id);
    expect(retrieved).toBeDefined();
    expect(retrieved?.title).toBe(doc.title);
  });
});
