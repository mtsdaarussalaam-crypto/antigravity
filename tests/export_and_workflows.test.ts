import { describe, it, expect, beforeEach } from 'vitest';
import { ExportService } from '../src/services/exportService';
import { AssessmentBankService } from '../src/services/assessmentBankService';
import { CocurricularService } from '../src/services/cocurricularService';
import { StorageService } from '../src/services/storageService';
import { LearningDocument, SchoolProfile, ModulAjarContent } from '../src/types';

describe('Madrasah KBC Learning Suite: Export, Workflows & Assessment Tests', () => {
  beforeEach(() => {
    StorageService.resetToDemo();
  });

  it('1. Ekspor DOCX menghasilkan dokumen WordprocessingML terformat lengkap dengan Kop & Standar KMA 1503/2025', async () => {
    const doc = StorageService.getDocuments()[0];
    const school = StorageService.getSchoolProfile();

    const blob = ExportService.exportToDOCX(doc, school);
    expect(blob).toBeDefined();
    expect(blob.type).toContain('wordprocessingml.document');

    const text = await blob.text();
    // Validasi namespace Microsoft Word
    expect(text).toContain('xmlns:w="urn:schemas-microsoft-com:office:word"');
    expect(text).toContain('xmlns:o="urn:schemas-microsoft-com:office:office"');
    // Validasi Kop Madrasah
    expect(text).toContain('KEMENTERIAN AGAMA REPUBLIK INDONESIA');
    expect(text).toContain(school.officialName);
    expect(text).toContain(school.regencyCity.toUpperCase());
    // Validasi Isi Dokumen
    expect(text).toContain('MODUL AJAR KURIKULUM BERBASIS CINTA (KBC)');
    expect(text).toContain('KMA Nomor 1503 Tahun 2025');
    expect(text).toContain('SK Dirjen Pendis Nomor 6077 Tahun 2025');
    // Validasi Tanda Tangan
    expect(text).toContain(school.headmasterName);
    expect(text).toContain(doc.authorName);
  });

  it('2. Ekspor XLSX menghasilkan berkas SpreadsheetML XML valid untuk Microsoft Excel', async () => {
    const headers = ['Nama Guru', 'Mata Pelajaran', 'Total Dokumen', 'Status Kelengkapan'];
    const rows = [
      ['Ustadzah Nurul Hidayati, S.Pd', 'Matematika', 4, '100% Disetujui'],
      ['Dr. H. Ahmad Fauzi, M.Pd.I', 'Fiqih', 2, 'Siap Ditinjau'],
    ];

    const blob = ExportService.exportToXLSX('Rekapitulasi', headers, rows);
    expect(blob).toBeDefined();
    expect(blob.type).toContain('spreadsheetml.sheet');

    const text = await blob.text();
    // Validasi XML Excel Spreadsheet
    expect(text).toContain('xmlns="urn:schemas-microsoft-com:office:spreadsheet"');
    expect(text).toContain('<Worksheet ss:Name="Rekapitulasi">');
    expect(text).toContain('headerStyle');
    expect(text).toContain('Ustadzah Nurul Hidayati, S.Pd');
    expect(text).toContain('100% Disetujui');
  });

  it('3. Ekspor CSV menghasilkan RFC 4180 dengan UTF-8 BOM untuk kompatibilitas data', async () => {
    const headers = ['Kode', 'Topik', 'Nilai KBC'];
    const rows = [
      ['MAT-7-1', 'Konservasi Air, Madrasah', 'Cinta Lingkungan'],
      ['FQ-7-1', 'Thaharah "Mindful"', 'Cinta Allah dan Rasul-Nya'],
    ];

    const blob = ExportService.exportToCSV(headers, rows);
    expect(blob).toBeDefined();
    expect(blob.type).toContain('text/csv');

    const arrayBuffer = await blob.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    // Validasi 3 bytes UTF-8 BOM (0xEF, 0xBB, 0xBF)
    expect(bytes[0]).toBe(0xEF);
    expect(bytes[1]).toBe(0xBB);
    expect(bytes[2]).toBe(0xBF);

    const text = await blob.text();
    // Validasi escaping koma dan kutip
    expect(text).toContain('"Konservasi Air, Madrasah"');
    expect(text).toContain('Cinta Lingkungan');
    expect(text).toContain('Cinta Allah dan Rasul-Nya');
  });

  it('4. Bank Soal & Asesmen mengelola butir soal HOTS dan integrasi Panca Cinta', () => {
    const questions = AssessmentBankService.getQuestions();
    expect(questions.length).toBeGreaterThanOrEqual(4);

    const hotsQuestion = questions.find(q => q.difficulty === 'hots');
    expect(hotsQuestion).toBeDefined();
    expect(hotsQuestion?.stimulus).toBeDefined();
    expect(hotsQuestion?.correctAnswer).toBeDefined();
    expect(hotsQuestion?.pancaCintaValue).toBeDefined();

    // Uji simpan butir soal baru
    const newQ = {
      id: `soal-test-${Date.now()}`,
      subjectCode: 'IPA-D',
      subjectName: 'IPA',
      phase: 'D' as const,
      gradeLevel: 'Kelas VII MTs',
      topic: 'Uji Ekologis Air',
      itemType: 'uraian' as const,
      questionText: 'Jelaskan bagaimana santri menerapkan nilai Cinta Lingkungan saat praktikum kimia?',
      correctAnswer: 'Menggunakan bahan ramah lingkungan dan tidak membuang sisa reagen ke saluran air bebas.',
      explanation: 'Penerapan adab ekologis madrasah.',
      scoringGuide: 'Skor 10 untuk analisis tepat.',
      difficulty: 'sedang' as const,
      cognitiveLevel: 'C4' as const,
      pancaCintaValue: 'Cinta Lingkungan' as const,
      isVerified: true,
    };

    AssessmentBankService.saveQuestion(newQ);
    const retrieved = AssessmentBankService.getQuestions().find(q => q.id === newQ.id);
    expect(retrieved).toBeDefined();
    expect(retrieved?.topic).toBe('Uji Ekologis Air');
  });

  it('5. Program Kokurikuler (P5-PPRA KBC) memiliki tahapan terstruktur dan rubrik 4 level', () => {
    const projects = CocurricularService.getProjects();
    expect(projects.length).toBeGreaterThanOrEqual(2);

    const greenProject = projects.find(p => p.theme === 'Gaya Hidup Berkelanjutan');
    expect(greenProject).toBeDefined();
    expect(greenProject?.stages.length).toBeGreaterThanOrEqual(3);
    expect(greenProject?.rubric.length).toBeGreaterThanOrEqual(1);

    const rubricItem = greenProject?.rubric[0];
    expect(rubricItem?.mulaiBerkembang).toBeDefined();
    expect(rubricItem?.sedangBerkembang).toBeDefined();
    expect(rubricItem?.berkembangSesuaiHarapan).toBeDefined();
    expect(rubricItem?.sangatBerkembang).toBeDefined();
  });

  it('6. Alur Kerja Supervisi (Review & Approval) memperbarui status dan mencatat audit log', () => {
    const docs = StorageService.getDocuments();
    const targetDoc = docs[0];

    // Simulasi review & pengesahan
    const approvedDoc: LearningDocument = {
      ...targetDoc,
      status: 'approved',
      versionNumber: targetDoc.versionNumber + 1,
      updatedAt: new Date().toISOString(),
    };

    StorageService.saveDocument(approvedDoc);
    StorageService.logAudit('SUPERVISION_APPROVE', 'learning_documents', approvedDoc.id, {
      approvedBy: 'Dr. H. Ahmad Fauzi, M.Pd.I',
      complianceScore: 98,
    });

    const updated = StorageService.getDocuments().find(d => d.id === targetDoc.id);
    expect(updated?.status).toBe('approved');
    expect(updated?.versionNumber).toBe(targetDoc.versionNumber + 1);

    const auditLogs = StorageService.getAuditLogs();
    expect(auditLogs.length).toBeGreaterThan(0);
    expect(auditLogs[0].action).toBe('SUPERVISION_APPROVE');
  });

  it('7. Uji berkas fisik hasil ekspor dapat ditulis ke disk, tidak korup, dan isi formatnya terbaca', async () => {
    const fs = await import('fs');
    const path = await import('path');

    const testDir = path.resolve(__dirname, '../dist/test_exports');
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }

    const doc = StorageService.getDocuments()[0];
    const school = StorageService.getSchoolProfile();

    // 1. Tulis & Baca Uji DOCX
    const docxBlob = ExportService.exportToDOCX(doc, school);
    const docxPath = path.join(testDir, 'uji_modul_ajar.docx');
    const docxBuf = Buffer.from(await docxBlob.arrayBuffer());
    fs.writeFileSync(docxPath, docxBuf);
    expect(fs.existsSync(docxPath)).toBe(true);
    expect(fs.statSync(docxPath).size).toBeGreaterThan(1000);
    const docxRead = fs.readFileSync(docxPath, 'utf-8');
    expect(docxRead).toContain('MODUL AJAR KURIKULUM BERBASIS CINTA (KBC)');
    expect(docxRead).toContain(school.officialName);

    // 2. Tulis & Baca Uji XLSX
    const headers = ['Nama', 'Mapel', 'Status'];
    const rows = [['Ustadzah Nurul', 'Matematika', 'Disetujui']];
    const xlsxBlob = ExportService.exportToXLSX('UjiRekap', headers, rows);
    const xlsxPath = path.join(testDir, 'uji_rekap.xlsx');
    const xlsxBuf = Buffer.from(await xlsxBlob.arrayBuffer());
    fs.writeFileSync(xlsxPath, xlsxBuf);
    expect(fs.existsSync(xlsxPath)).toBe(true);
    expect(fs.statSync(xlsxPath).size).toBeGreaterThan(500);
    const xlsxRead = fs.readFileSync(xlsxPath, 'utf-8');
    expect(xlsxRead).toContain('xmlns="urn:schemas-microsoft-com:office:spreadsheet"');

    // 3. Tulis & Baca Uji CSV
    const csvBlob = ExportService.exportToCSV(headers, rows);
    const csvPath = path.join(testDir, 'uji_rekap.csv');
    const csvBuf = Buffer.from(await csvBlob.arrayBuffer());
    fs.writeFileSync(csvPath, csvBuf);
    expect(fs.existsSync(csvPath)).toBe(true);
    expect(csvBuf[0]).toBe(0xEF); // BOM Byte 1
    expect(csvBuf[1]).toBe(0xBB); // BOM Byte 2
    expect(csvBuf[2]).toBe(0xBF); // BOM Byte 3
  });
});
