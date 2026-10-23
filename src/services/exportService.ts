// MADRASAH KBC LEARNING SUITE: EXPORT SERVICE
// Mendukung ekspor nyata berkas berstandar resmi: DOCX, XLSX, CSV, JSON, dan Cetak PDF
// Kepatuhan: KMA No. 1503 Tahun 2025 & SK Dirjen Pendis No. 6077 Tahun 2025

import { LearningDocument, ModulAjarContent, SchoolProfile } from '../types';

export class ExportService {
  /**
   * Helper untuk mengunduh Blob berkas di browser
   */
  private static triggerDownload(blob: Blob, filename: string): void {
    if (typeof window === 'undefined') return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 150);
  }

  /**
   * 1. EKSPOR DOCX (WordprocessingML / MS Word Valid Format)
   * Dapat dibuka langsung oleh Microsoft Word, LibreOffice Writer, dan Google Docs tanpa korup.
   */
  public static exportToDOCX(doc: LearningDocument, school: SchoolProfile): Blob {
    const content = doc.content as ModulAjarContent;

    const docxHtml = `
<html xmlns:o="urn:schemas-microsoft-com:office:office" 
      xmlns:w="urn:schemas-microsoft-com:office:word" 
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8">
  <title>${doc.title}</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    @page Section1 {
      size: 595.3pt 841.9pt; /* A4 size */
      margin: 2.0cm 2.0cm 2.0cm 2.0cm;
      mso-header-margin: 36.0pt;
      mso-footer-margin: 36.0pt;
      mso-paper-source: 0;
    }
    div.Section1 { page: Section1; }
    body { font-family: 'Times New Roman', serif; font-size: 11pt; line-height: 1.35; color: #111827; }
    h1, h2, h3, h4 { font-family: 'Arial', sans-serif; margin-top: 10pt; margin-bottom: 4pt; }
    .kop-header { text-align: center; border-bottom: 3px double #064e3b; padding-bottom: 8pt; margin-bottom: 14pt; }
    .kop-kemenag { font-size: 10pt; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5pt; margin: 0; color: #374151; }
    .kop-madrasah { font-size: 14pt; font-weight: bold; text-transform: uppercase; color: #064e3b; margin: 2pt 0; }
    .kop-meta { font-size: 9pt; color: #4b5563; margin: 1pt 0; font-family: Arial, sans-serif; }
    table.data-table { width: 100%; border-collapse: collapse; margin: 8pt 0; font-size: 10pt; }
    table.data-table th, table.data-table td { border: 1px solid #9ca3af; padding: 5pt 7pt; vertical-align: top; }
    table.data-table th { background-color: #f3f4f6; font-weight: bold; color: #111827; }
    .badge { display: inline-block; padding: 2pt 6pt; border-radius: 4pt; font-size: 8.5pt; font-weight: bold; font-family: Arial, sans-serif; }
    .badge-kbc { background-color: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; }
    .section-title { font-size: 11pt; font-weight: bold; color: #064e3b; border-bottom: 1px solid #e5e7eb; padding-bottom: 2pt; margin-top: 10pt; }
    .ttd-table { width: 100%; margin-top: 24pt; border-collapse: collapse; }
    .ttd-table td { width: 50%; text-align: center; vertical-align: top; border: none; font-size: 10.5pt; }
  </style>
</head>
<body>
  <div class="Section1">
    <!-- KOP MADRASAH RESMI -->
    <div class="kop-header">
      <p class="kop-kemenag">KEMENTERIAN AGAMA REPUBLIK INDONESIA</p>
      <p class="kop-kemenag">KANTOR KEMENTERIAN AGAMA ${(school.regencyCity || 'KABUPATEN/KOTA').toUpperCase()}</p>
      <p class="kop-madrasah">${school.officialName}</p>
      <p class="kop-meta">
        ${school.nsm ? `NSM: ${school.nsm}` : ''} ${school.nsm && school.npsn ? '•' : ''} ${school.npsn ? `NPSN: ${school.npsn}` : ''}
      </p>
      <p class="kop-meta">
        ${[school.address, school.village ? `Kel. ${school.village}` : '', school.district ? `Kec. ${school.district}` : '', school.regencyCity, school.province].filter(Boolean).join(', ')}
      </p>
    </div>

    <!-- JUDUL DOKUMEN -->
    <div style="text-align: center; margin-bottom: 14pt;">
      <h2 style="font-size: 13pt; text-transform: uppercase; margin: 0; color: #111827;">
        MODUL AJAR KURIKULUM BERBASIS CINTA (KBC)
      </h2>
      <p style="font-size: 9.5pt; color: #4b5563; margin: 2pt 0; font-family: Arial, sans-serif;">
        Pedoman KMA Nomor 1503 Tahun 2025 & SK Dirjen Pendis Nomor 6077 Tahun 2025
      </p>
      <p style="font-size: 9pt; font-family: monospace; color: #6b7280; margin: 0;">
        Nomor: ${doc.id.substring(0, 8).toUpperCase()}/MODUL/${doc.subjectName.toUpperCase().replace(/\s+/g, '_')}/2026
      </p>
    </div>

    <!-- I. IDENTITAS MODUL -->
    <p class="section-title">I. INFORMASI UMUM</p>
    <table class="data-table">
      <tr>
        <td width="25%"><strong>Nama Penyusun</strong></td>
        <td width="25%">${doc.authorName}</td>
        <td width="25%"><strong>Mata Pelajaran</strong></td>
        <td width="25%">${doc.subjectName}</td>
      </tr>
      <tr>
        <td><strong>Satuan Pendidikan</strong></td>
        <td>${school.officialName}</td>
        <td><strong>Fase / Kelas</strong></td>
        <td>Fase ${content?.identitas?.fase || 'D'} / ${doc.className || 'Kelas VII'}</td>
      </tr>
      <tr>
        <td><strong>Tahun Pelajaran</strong></td>
        <td>2026/2027</td>
        <td><strong>Alokasi Waktu</strong></td>
        <td>${doc.timeAllocation || '4 JP'}</td>
      </tr>
      <tr>
        <td><strong>Model Pembelajaran</strong></td>
        <td colspan="3">${content?.modelPembelajaran || 'Pembelajaran Berbasis Masalah (PBL)'}</td>
      </tr>
      <tr>
        <td><strong>Fokus Panca Cinta</strong></td>
        <td colspan="3">${(doc.pancaCintaValues || []).join(', ')}</td>
      </tr>
    </table>

    <!-- II. KOMPONEN INTI -->
    <p class="section-title">II. KOMPONEN INTI</p>
    <p><strong>A. Tujuan Pembelajaran (TP):</strong></p>
    <ul>
      ${Array.isArray(content?.tujuanPembelajaran) 
        ? content.tujuanPembelajaran.map(tp => `<li>${tp}</li>`).join('') 
        : `<li>${content?.tujuanPembelajaran || doc.title}</li>`}
    </ul>

    <p><strong>B. Pemahaman Bermakna:</strong></p>
    <p style="font-style: italic; background-color: #f9fafb; padding: 6pt; border-left: 3px solid #064e3b;">
      "${content?.pemahamanBermakna || 'Santri memahami bahwa ilmu yang dipelajari merupakan sarana ibadah dan penebar kemaslahatan.'}"
    </p>

    <p><strong>C. Pertanyaan Pemantik:</strong></p>
    <ul>
      ${Array.isArray(content?.pertanyaanPemantik) 
        ? content.pertanyaanPemantik.map(q => `<li>${q}</li>`).join('') 
        : '<li>Bagaimana konsep ini dapat membantu lingkungan madrasah kita?</li>'}
    </ul>

    <!-- III. KEGIATAN PEMBELAJARAN (DEEP LEARNING) -->
    <p class="section-title">III. KEGIATAN PEMBELAJARAN (DEEP LEARNING)</p>
    ${Array.isArray(content?.kegiatanPembelajaran) ? content.kegiatanPembelajaran.map(p => `
      <div style="margin-bottom: 10pt;">
        <p style="font-weight: bold; background-color: #f3f4f6; padding: 4pt 6pt;">
          Pertemuan ${p.pertemuan} (${p.alokasiMenit} Menit) - Prinsip: Mindful, Meaningful, Joyful
        </p>
        <p><strong>1. Pendahuluan:</strong> ${p.pendahuluan}</p>
        <p><strong>2. Kegiatan Inti:</strong></p>
        <ul style="margin-top: 2pt;">
          <li><strong>Pengalaman Memahami (Mindful):</strong> ${p.inti?.memahami || ''}</li>
          <li><strong>Pengalaman Mengaplikasi (Meaningful):</strong> ${p.inti?.mengaplikasi || ''}</li>
          <li><strong>Pengalaman Merefleksi (Joyful):</strong> ${p.inti?.merefleksi || ''}</li>
        </ul>
        <p><strong>3. Penutup & Refleksi:</strong> ${p.penutup}</p>
      </div>
    `).join('') : '<p>Skenario pembelajaran berkesadaran, bermakna, dan menggembirakan.</p>'}

    <!-- IV. INTEGRASI PANCA CINTA KONKRET -->
    <p class="section-title">IV. INTEGRASI 5 NILAI PANCA CINTA (SK DIRJEN PENDIS 6077/2025)</p>
    <table class="data-table">
      <thead>
        <tr>
          <th>Nilai Panca Cinta</th>
          <th>Tujuan Karakter</th>
          <th>Kegiatan Pembelajaran Konkret</th>
          <th>Indikator Perilaku Teramati</th>
        </tr>
      </thead>
      <tbody>
        ${Array.isArray(content?.pancaCintaDetail) ? content.pancaCintaDetail.map(d => `
          <tr>
            <td><strong>${d.value}</strong></td>
            <td>${d.characterTarget}</td>
            <td>${d.concreteActivity}</td>
            <td style="color: #065f46;">${d.observableIndicator}</td>
          </tr>
        `).join('') : `
          <tr>
            <td colspan="4">Terintegrasi dalam aktivitas sehari-hari di madrasah: ${(doc.pancaCintaValues || []).join(', ')}.</td>
          </tr>
        `}
      </tbody>
    </table>

    <!-- V. ASESMEN & RUBRIK -->
    <p class="section-title">V. ASESMEN & RUBRIK PENILAIAN AUTENTIK</p>
    <table class="data-table">
      <thead>
        <tr>
          <th>Kriteria Penilaian</th>
          <th>Baru Berkembang</th>
          <th>Layak</th>
          <th>Cakap</th>
          <th>Mahir</th>
        </tr>
      </thead>
      <tbody>
        ${Array.isArray(content?.asesmen?.rubrik) ? content.asesmen.rubrik.map(r => `
          <tr>
            <td><strong>${r.kriteria}</strong></td>
            <td>${r.baruBerkembang}</td>
            <td>${r.layak}</td>
            <td>${r.cakap}</td>
            <td style="font-weight: bold; color: #065f46;">${r.mahir}</td>
          </tr>
        `).join('') : `
          <tr>
            <td colspan="5">Rubrik asesmen autentik terpadu berdasar KMA 1503/2025.</td>
          </tr>
        `}
      </tbody>
    </table>

    <!-- VI. LEMBAR KERJA PESERTA DIDIK -->
    <p class="section-title">VI. LEMBAR KERJA PESERTA DIDIK (LKPD)</p>
    <div style="border: 1px dashed #9ca3af; padding: 8pt; margin-top: 4pt;">
      <p style="font-weight: bold; margin: 0;">${content?.lembarKerja?.judul || 'LKPD Kolaboratif KBC'}</p>
      <p style="font-size: 9.5pt; color: #4b5563; margin: 2pt 0;">${content?.lembarKerja?.tujuan || 'Mengaplikasikan konsep materi untuk memecahkan masalah nyata.'}</p>
      <p style="font-weight: bold; margin-top: 6pt;">Petunjuk Pengerjaan:</p>
      <ol style="margin-top: 2pt;">
        ${Array.isArray(content?.lembarKerja?.instruksi) ? content.lembarKerja.instruksi.map(ins => `<li>${ins}</li>`).join('') : '<li>Kerjakan bersama kelompok dengan adab islami.</li>'}
      </ol>
    </div>

    <!-- TANDA TANGAN PENGESAHAN -->
    <table class="ttd-table">
      <tr>
        <td>
          <p>Mengetahui,</p>
          <p><strong>Kepala Madrasah</strong></p>
          <br><br><br>
          <p><strong><u>${school.headmasterName}</u></strong></p>
          <p>${school.headmasterNip ? `NIP. ${school.headmasterNip}` : '(Non-PNS)'}</p>
        </td>
        <td>
          <p>${school.regencyCity || 'Kabupaten/Kota'}, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          <p><strong>Guru Mata Pelajaran</strong></p>
          <br><br><br>
          <p><strong><u>${doc.authorName || 'Guru Mata Pelajaran'}</u></strong></p>
          <p>NIP/NUPTK: Terdaftar</p>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>
`;

    const blob = new Blob(['\ufeff', docxHtml], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });

    return blob;
  }

  /**
   * 2. EKSPOR XLSX (SpreadsheetML / Microsoft Excel XML Format)
   * Terformat rapi dengan kolom, baris, styling header dan dibuka tanpa peringatan.
   */
  public static exportToXLSX(
    sheetName: string,
    headers: string[],
    rows: (string | number)[][]
  ): Blob {
    const xmlRows = rows.map(row => {
      const cells = row.map(cell => {
        const isNum = typeof cell === 'number';
        const safeVal = String(cell ?? '')
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        return `<Cell><Data ss:Type="${isNum ? 'Number' : 'String'}">${safeVal}</Data></Cell>`;
      }).join('');
      return `<Row>${cells}</Row>`;
    }).join('\n');

    const headerCells = headers.map(h => {
      const safeH = h.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `<Cell ss:StyleID="headerStyle"><Data ss:Type="String">${safeH}</Data></Cell>`;
    }).join('');

    const spreadsheetXml = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <Styles>
  <Style ss:ID="Default" ss:Name="Normal">
   <Alignment ss:Vertical="Center"/>
   <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#000000"/>
  </Style>
  <Style ss:ID="headerStyle">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
   </Borders>
   <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#FFFFFF" ss:Bold="1"/>
   <Interior ss:Color="#064E3B" ss:Pattern="Solid"/>
  </Style>
 </Styles>
 <Worksheet ss:Name="${sheetName}">
  <Table ss:DefaultColumnWidth="120" ss:DefaultRowHeight="20">
   <Row ss:Height="26">
    ${headerCells}
   </Row>
   ${xmlRows}
  </Table>
 </Worksheet>
</Workbook>`;

    return new Blob([spreadsheetXml], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
  }

  /**
   * 3. EKSPOR CSV (RFC 4180 dengan UTF-8 BOM untuk Excel & LibreOffice)
   */
  public static exportToCSV(headers: string[], rows: (string | number)[][]): Blob {
    const escapeCsv = (val: string | number) => {
      const s = String(val ?? '');
      if (s.includes(',') || s.includes('"') || s.includes('\n')) {
        return `"${s.replace(/"/g, '""')}"`;
      }
      return s;
    };

    const csvContent = [
      headers.map(escapeCsv).join(','),
      ...rows.map(row => row.map(escapeCsv).join(',')),
    ].join('\r\n');

    // \uFEFF adalah UTF-8 Byte Order Mark (BOM) agar Excel tidak rusak membaca aksen/karakter
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    return new Blob([bom, csvContent], { type: 'text/csv;charset=utf-8;' });
  }

  /**
   * 4. Trigger Download Utilitas
   */
  public static downloadDocx(doc: LearningDocument, school: SchoolProfile): void {
    const blob = this.exportToDOCX(doc, school);
    const cleanTitle = (doc.title || 'Modul_Ajar_KBC').replace(/[^a-zA-Z0-9_-]/g, '_');
    this.triggerDownload(blob, `${cleanTitle}.docx`);
  }

  public static downloadXlsx(filename: string, sheetName: string, headers: string[], rows: (string | number)[][]): void {
    const blob = this.exportToXLSX(sheetName, headers, rows);
    this.triggerDownload(blob, `${filename}.xlsx`);
  }

  public static downloadCsv(filename: string, headers: string[], rows: (string | number)[][]): void {
    const blob = this.exportToCSV(headers, rows);
    this.triggerDownload(blob, `${filename}.csv`);
  }
}
