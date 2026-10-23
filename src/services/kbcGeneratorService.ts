// MADRASAH KBC LEARNING SUITE: KBC & DEEP LEARNING GENERATOR SERVICE
// Berdasarkan KMA Nomor 1503 Tahun 2025 & SK Dirjen Pendis Nomor 6077 Tahun 2025

import { 
  LearningDocument, 
  ModulAjarContent, 
  PancaCintaValue, 
  PancaCintaIntegrationDetail, 
  DeepLearningDesign, 
  LearningStrategy, 
  CurriculumPhase 
} from '../types';

export interface GeneratorParameters {
  jenjang: string;
  kelas: string;
  fase: CurriculumPhase;
  mataPelajaran: string;
  materiPokok: string;
  tujuanPembelajaran: string;
  alokasiWaktu: string;
  jumlahPertemuan: number;
  karakteristikSantri: string;
  kondisiMadrasah: string;
  pancaCintaPrioritas: PancaCintaValue[];
  strategiPembelajaran: LearningStrategy;
  isAiMode: boolean; // TRUE: Generator AI / Engine KBC; FALSE: Template Manual Kosong
}

export class KBCGeneratorService {
  /**
   * Menghasilkan pemetaan konkret 5 Nilai Panca Cinta (SK Dirjen Pendis 6077/2025)
   */
  public static generatePancaCintaDetails(
    values: PancaCintaValue[],
    materi: string,
    mapel: string
  ): PancaCintaIntegrationDetail[] {
    const registry: Record<PancaCintaValue, (m: string, s: string) => PancaCintaIntegrationDetail> = {
      'Cinta Allah dan Rasul-Nya': (m, s) => ({
        value: 'Cinta Allah dan Rasul-Nya',
        rationale: `Materi ${m} pada ${s} dihubungkan dengan kebesaran ciptaan Allah Swt. dan sunnah Rasulullah Saw. agar santri beribadah dan belajar dengan kesadaran spiritual mendalam.`,
        characterTarget: 'Ketakwaan, keikhlasan, rasa syukur, dan keteladanan akhlak karimah.',
        concreteActivity: `Memulai pembelajaran dengan tadabbur ayat/hadis relevan materi ${m}, mengaitkan hukum/konsep alam dengan keteraturan ciptaan-Nya, dan shalat berjamaah tepat waktu.`,
        observableIndicator: 'Santri antusias berdoa berkesadaran, bersikap jujur saat mengolah data, dan mengucap hamdalah atas pencapaian belajarnya.',
        teacherRole: 'Menjadi teladan adab, fasilitator tadabbur makna, dan pengingat keikhlasan niat mencari ilmu.',
        studentRole: 'Menginternalisasi nilai tauhid dan mengekspresikan rasa syukur dalam karya belajarnya.',
        learningEvidence: 'Jurnal refleksi spiritual santri dan lembar catatan adab belajar.',
        reflectionMethod: 'Refleksi hening 3 menit di akhir sesi tentang makna kebesaran Allah Swt. dalam topik yang dipelajari.',
      }),

      'Cinta Ilmu': (m, s) => ({
        value: 'Cinta Ilmu',
        rationale: `Menumbuhkan rasa ingin tahu ilmiah, budaya literasi kritis, dan kegigihan mencari kebenaran dalam memahami ${m}.`,
        characterTarget: 'Bernalar kritis, tekun, rasa ingin tahu ilmiah (curiosity), dan integritas akademis.',
        concreteActivity: `Melakukan penyelidikan terarah mengenai ${m}, merumuskan hipotesis, mencari rujukan data terpercaya, dan membedakan fakta dengan opini/hoaks.`,
        observableIndicator: 'Santri aktif mengajukan pertanyaan mendalam (HOTS), tekun membaca referensi, dan tidak menyalin pekerjaan teman.',
        teacherRole: 'Memantik pertanyaan penyelidikan, memandu analisis literasi, dan mengapresiasi proses penemuan santri.',
        studentRole: 'Menjadi pembelajar mandiri yang aktif mengeksplorasi konsep dan menguji gagasan.',
        learningEvidence: 'Laporan penyelidikan mandiri, peta konsep terstruktur, dan catatan studi pustaka.',
        reflectionMethod: 'Menjawab pertanyaan: "Hal baru apa yang paling membuka wawasanku hari ini dan apa yang ingin kupelajari lebih dalam?"',
      }),

      'Cinta Lingkungan': (m, s) => ({
        value: 'Cinta Lingkungan',
        rationale: `Mengaitkan materi ${m} dengan aksi nyata kelestarian alam, hemat energi, pengurangan sampah, dan program Madrasah Hijau (Green Madrasah).`,
        characterTarget: 'Peduli ekologis, hemat sumber daya (anti-israf), dan tanggung jawab kebersihan lingkungan.',
        concreteActivity: `Mengambil studi kasus riil lingkungan madrasah (misal: konsumsi air wudhu, penanganan sampah plastik, atau efisiensi energi) yang diselesaikan dengan konsep ${m}.`,
        observableIndicator: 'Santri mematikan kran air yang tidak digunakan, memilah sampah saat praktikum, dan menjaga kebersihan ruang kelas tanpa disuruh.',
        teacherRole: 'Mengarahkan fokus materi pada kearifan lingkungan lokal dan memfasilitasi audit lingkungan madrasah.',
        studentRole: 'Menjadi agen duta lingkungan madrasah yang menghasilkan solusi hijau kontekstual.',
        learningEvidence: 'Rancangan aksi hemat air/energi dan poster kampanye ramah lingkungan.',
        reflectionMethod: 'Evaluasi jejak ekologis harian santri selama proses pembelajaran berlangsung.',
      }),

      'Cinta Diri dan Sesama Manusia': (m, s) => ({
        value: 'Cinta Diri dan Sesama Manusia',
        rationale: `Mengembangkan rasa percaya diri yang proporsional, kepedulian sosial, adab tolong-menolong (ta'awun), dan pencegahan perundungan di madrasah.`,
        characterTarget: 'Empati, toleransi (tasamuh), adab pergaulan islami, dan kerja sama kolaboratif.',
        concreteActivity: `Diskusi kelompok heterogen untuk menyelesaikan tugas ${m}, saling memberikan umpan balik santun (peer review), dan membantu rekan yang mengalami kesulitan.`,
        observableIndicator: 'Santri mendengarkan pendapat teman tanpa memotong, menghargai perbedaan, dan saling menyemangati.',
        teacherRole: 'Menciptakan ruang kelas yang aman secara psikologis (psychological safety) dan inklusif.',
        studentRole: 'Berkolaborasi secara tulus dan menghormati hak sesama santri.',
        learningEvidence: 'Lembar penilaian antarteman (peer-assessment) dan catatan kolaborasi tim.',
        reflectionMethod: 'Saling menyampaikan satu apresiasi tulus kepada rekan sekelompok di penutup sesi.',
      }),

      'Cinta Tanah Air': (m, s) => ({
        value: 'Cinta Tanah Air',
        rationale: `Menanamkan semangat moderasi beragama, kebanggaan terhadap kearifan budaya bangsa, dan komitmen menjaga persatuan NKRI melalui ${s}.`,
        characterTarget: 'Nasionalisme, moderasi beragama, komitmen kebangsaan, dan penghargaan keberagaman.',
        concreteActivity: `Mengkaji kontribusi ulama dan ilmuwan nusantara dalam perkembangan ${m}, serta menerapkan nilai gotong royong khas Indonesia dalam proyek belajar.`,
        observableIndicator: 'Santri menggunakan bahasa Indonesia yang baik dan santun, mencintai kearifan lokal nusantara, dan menjunjung persatuan.',
        teacherRole: 'Mengintegrasikan narasi kebangsaan dan nilai moderasi beragama secara kontekstual.',
        studentRole: 'Menghargai warisan peradaban nusantara dan berkomitmen berkontribusi bagi negeri.',
        learningEvidence: 'Karya infografis atau esai bertema kontribusi ilmu pengetahuan untuk kemajuan Indonesia.',
        reflectionMethod: 'Menyimpulkan bagaimana ilmu yang dipelajari hari ini dapat bermanfaat bagi kemaslahatan umat dan bangsa.',
      }),
    };

    return values.map(val => registry[val](materi, mapel));
  }

  /**
   * Menghasilkan rancangan Pembelajaran Mendalam (Deep Learning in Education)
   * Mindful, Meaningful, Joyful + Memahami, Mengaplikasi, Merefleksi
   */
  public static generateDeepLearningDesign(
    params: GeneratorParameters
  ): DeepLearningDesign {
    return {
      principles: ['mindful', 'meaningful', 'joyful'],
      cognitiveExperiences: ['memahami', 'mengaplikasi', 'merefleksi'],
      strategy: params.strategiPembelajaran,
      triggerQuestion: `Bagaimana pemahaman kita tentang ${params.materiPokok} dapat membantu kita menjadi santri yang lebih bijak, bertakwa, dan bermanfaat bagi lingkungan madrasah kita?`,
      contextualProblem: `Fenomena di lingkungan madrasah dan kehidupan sehari-hari santri yang membutuhkan penalaran kritis materi ${params.materiPokok} untuk menemukan solusi yang adil dan berkelanjutan.`,
      understandingActivity: `Santri mengamati stimulus kontekstual (studi kasus/data riil madrasah), berdiskusi dalam keheningan fokus (mindful thinking), dan mengidentifikasi konsep kunci ${params.materiPokok} secara mendalam bukan sekadar hafalan.`,
      applyingActivity: `Santri bekerja sama dalam tim kolaboratif untuk menerapkan konsep ${params.materiPokok} dalam menyelesaikan Lembar Kerja Peserta Didik (LKPD), menghasilkan artefak/produk nyata yang bermakna bagi madrasah.`,
      reflectingActivity: `Santri mengevaluasi proses berpikirnya (metakognisi), merayakan keberhasilan belajar bersama dalam suasana yang menggembirakan (joyful), dan merumuskan komitmen perbaikan diri.`,
      differentiation: {
        content: `Menyediakan bahan ajar bertingkat (infografis visual untuk tipe visual, narasi audio/teks bagi tipe verbal, dan manipulatif konkret bagi yang membutuhkan scaffolding).`,
        process: `Memberikan pendampingan intensif bagi kelompok yang masih berkembang, serta tantangan analisis lanjutan bagi santri yang telah mahir.`,
        product: `Santri diberi kebebasan memilih bentuk penyajian hasil akhir (laporan infografis, rekaman presentasi audio-visual, atau paparan demonstrasi langsung).`,
      },
      scaffoldingSupport: `Menyediakan panduan langkah bertahap (guiding questions) dan bank contoh konkret untuk membantu santri yang membutuhkan dukungan belajar tambahan.`,
    };
  }

  /**
   * Generator Modul Ajar Lengkap Standar KMA 1503/2025 & KBC 6077/2025
   */
  public static generateModulAjar(
    params: GeneratorParameters,
    teacherName: string,
    schoolName: string
  ): LearningDocument {
    const pancaCintaDetails = this.generatePancaCintaDetails(
      params.pancaCintaPrioritas,
      params.materiPokok,
      params.mataPelajaran
    );

    const deepLearningDesign = this.generateDeepLearningDesign(params);

    const content: ModulAjarContent = {
      identitas: {
        penyusun: teacherName,
        instansi: schoolName,
        tahunAjaran: '2026/2027',
        jenjang: params.jenjang,
        fase: params.fase,
        kelas: params.kelas,
        mataPelajaran: params.mataPelajaran,
        alokasiWaktu: params.alokasiWaktu,
        jumlahPertemuan: params.jumlahPertemuan,
      },
      kompetensiAwal: [
        `Pengetahuan dasar prasyarat terkait ${params.materiPokok}.`,
        'Kesiapan literasi numerasi dan kemampuan berkolaborasi santri.',
      ],
      profilPelajarKBC: params.pancaCintaPrioritas,
      saranaPrasarana: [
        'Buku Teks Utama Madrasah Kemenag RI',
        'LCD Proyektor / Papan Tulis Interaktif',
        'Lembar Kerja Peserta Didik (LKPD) Kontekstual',
        'Lingkungan Madrasah sebagai Laboratorium Belajar Alami',
      ],
      targetPesertaDidik: 'Peserta didik reguler/tipikal dengan diferensiasi kecepatan belajar.',
      modelPembelajaran: params.strategiPembelajaran,
      tujuanPembelajaran: [params.tujuanPembelajaran],
      pemahamanBermakna: `Santri memahami bahwa ilmu tentang ${params.materiPokok} bukan sebatas teori ujian, melainkan sarana mendekatkan diri kepada Allah Swt., menyebarkan kemaslahatan, dan merawat kelestarian alam ciptaan-Nya.`,
      pertanyaanPemantik: [
        deepLearningDesign.triggerQuestion,
        `Mengapa sikap ${params.pancaCintaPrioritas[0] || 'Cinta Ilmu'} sangat penting saat kita memecahkan masalah ini?`,
      ],
      kegiatanPembelajaran: Array.from({ length: params.jumlahPertemuan }).map((_, idx) => ({
        pertemuan: idx + 1,
        pendahuluan: `(15 Menit) Guru membuka dengan salam penuh kehangatan, doa berkesadaran (mindful praying), apersepsi kontekstual mengaitkan materi pertemuan lalu dengan topik ${params.materiPokok}, serta penyampaian tujuan dan nilai Panca Cinta yang difokuskan.`,
        inti: {
          memahami: `(25 Menit) Santri mencermati stimulus nyata, berdiskusi dalam kelompok terarah untuk mengonstruksi pemahaman esensial tentang ${params.materiPokok}. Guru memfasilitasi dialog bermakna tanpa mendominasi.`,
          mengaplikasi: `(35 Menit) Santri mengerjakan tugas kolaboratif pada LKPD berbasis masalah nyata di madrasah, menerapkan konsep dalam perhitungan/analisis, dan menyusun solusi kreatif.`,
          merefleksi: `(15 Menit) Santri mempresentasikan hasil kerja, menerima umpan balik apresiatif dari rekan dan guru, serta mengidentifikasi pelajaran berharga dari proses kerja sama.`,
        },
        penutup: `(15 Menit) Guru bersama santri menyimpulkan intisari pembelajaran, melakukan refleksi perasaan belajar (joyful reflection), mengagungkan asma Allah Swt., dan berdoa bersama.`,
        alokasiMenit: 80,
      })),
      pancaCintaDetail: pancaCintaDetails,
      deepLearningDetail: deepLearningDesign,
      asesmen: {
        diagnostik: 'Kuis kesiapan belajar lisan dan survei minat di awal pertemuan.',
        formatif: 'Observasi sikap Panca Cinta saat diskusi kelompok, penilaian unjuk kerja LKPD, dan pertanyaan lisan.',
        sumatif: 'Uji pemahaman kontekstual akhir materi berupa tugas proyek atau tes penalaran tertulis.',
        rubrik: [
          {
            kriteria: 'Penguasaan Konsep Esensial',
            baruBerkembang: 'Mampu menyebutkan sebagian kecil konsep dengan bantuan intensif guru.',
            layak: 'Mampu menjelaskan konsep dasar secara mandiri namun belum tuntas pada soal aplikasi.',
            cakap: 'Mampu menjelaskan dan menerapkan konsep pada permasalahan kontekstual secara tepat.',
            mahir: 'Mampu menganalisis, mengevaluasi konsep, dan memberikan solusi orisinal serta membimbing teman.',
          },
          {
            kriteria: 'Penerapan Nilai Panca Cinta',
            baruBerkembang: 'Masih membutuhkan bimbingan untuk menunjukkan indikator perilaku teramati.',
            layak: 'Menunjukkan indikator perilaku terpuji secara konsisten selama kegiatan terstruktur.',
            cakap: 'Menginisiasi perilaku santun, peduli lingkungan, dan kerja sama aktif dalam kelompok.',
            mahir: 'Menjadi teladan akhlak karimah, mengajak rekan lain peduli sesama, dan menjaga kelestarian madrasah.',
          },
        ],
      },
      lembarKerja: {
        judul: `LKPD Kolaboratif: Penerapan ${params.materiPokok} Berbasis Cinta`,
        tujuan: `Mengaplikasikan konsep ${params.materiPokok} untuk merancang solusi nyata di lingkungan madrasah.`,
        instruksi: [
          'Bacalah basmalah sebelum memulai tugas bersama kelompokmu.',
          'Cermati data dan stimulus permasalahan yang disajikan pada lembar ini.',
          'Bagi tugas secara adil dan diskusikan langkah penyelesaian dengan saling menghargai.',
          'Tuliskan simpulan kelompokmu dan siapkan presentasi santun berdurasi 3 menit.',
        ],
        pertanyaanDiskusi: [
          `Bagaimana cara kelompokmu menyelesaikan masalah tersebut menggunakan konsep ${params.materiPokok}?`,
          `Apa nilai Panca Cinta yang paling kalian rasakan manfaatnya saat bekerja sama menyelesaikan LKPD ini?`,
        ],
      },
      remedialPengayaan: {
        remedial: 'Bimbingan terfokus secara berkelompok kecil dengan stimulus visual yang disederhanakan dan scaffolding terarah.',
        pengayaan: 'Pemberian studi kasus kompleks tentang pemodelan data tingkat lanjut atau riset mini mandiri di madrasah.',
      },
      refleksiGuru: [
        'Apakah seluruh santri antusias dan merasa aman secara psikologis saat pembelajaran?',
        'Sejauh mana integrasi Panca Cinta terwujud dalam perilaku konkret santri di kelas?',
        'Bagian mana dari kegiatan memahami dan mengaplikasi yang memerlukan penguatan pada pertemuan berikutnya?',
      ],
      refleksiSiswa: [
        'Bagaimana perasaanku selama belajar hari ini? (Sangat Senang / Senang / Butuh Bantuan)',
        'Hal bermakna apa yang paling menyentuh hatiku dan ingin kupraktikkan di rumah?',
      ],
    };

    const docId = `doc-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

    return {
      id: docId,
      organizationId: 'org-demo-1',
      academicYearId: 'ay-2026-2027',
      semesterId: 'sem-2026-1',
      subjectId: 'sub-mat',
      subjectName: params.mataPelajaran,
      className: params.kelas,
      authorId: 'user-guru1',
      authorName: teacherName,
      docType: 'modul_ajar',
      title: `Modul Ajar KBC: ${params.materiPokok} (${params.mataPelajaran} ${params.kelas})`,
      topic: params.materiPokok,
      timeAllocation: params.alokasiWaktu,
      status: 'draft',
      versionNumber: 1,
      content,
      pancaCintaValues: params.pancaCintaPrioritas,
      deepLearningExperiences: ['memahami', 'mengaplikasi', 'merefleksi'],
      isAiGenerated: params.isAiMode,
      isVerifiedByTeacher: !params.isAiMode, // Jika manual: langsung diverifikasi oleh guru
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}
