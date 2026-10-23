import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { PancaCintaBadge } from '../components/common/PancaCintaBadge';
import { PancaCintaValue } from '../types';
import { 
  Heart, 
  BookOpen, 
  Leaf, 
  Users, 
  Flag, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Lightbulb, 
  Smile, 
  Target,
  ArrowRight
} from 'lucide-react';

export const PancaCintaDeepLearningPage: React.FC = () => {
  const [selectedPancaCinta, setSelectedPancaCinta] = useState<PancaCintaValue>('Cinta Allah dan Rasul-Nya');

  const pancaCintaData: Record<
    PancaCintaValue,
    {
      description: string;
      haditsRef: string;
      contohMapel: { mapel: string; topik: string; kegiatan: string; artefak: string }[];
      indikatorSantri: string[];
      peranPendidik: string[];
    }
  > = {
    'Cinta Allah dan Rasul-Nya': {
      description: 'Menumbuhkan keimanan mendalam, kecintaan kepada Rasulullah Saw., serta pengamalan ajaran Islam dengan penuh kesadaran dan keikhlasan dalam setiap detik belajar.',
      haditsRef: '"Katakanlah: Jika kamu mencintai Allah, ikutilah aku, niscaya Allah mencintaimu dan mengampuni dosa-dosamu..." (QS. Ali Imran: 31)',
      contohMapel: [
        {
          mapel: 'Fiqih',
          topik: 'Ketentuan Thaharah & Ibadah Shalat',
          kegiatan: 'Mempraktikkan wudhu dengan khusyuk, memahami hikmah bersuci, dan tidak membuang-buang air wudhu (anti-israf).',
          artefak: 'Jurnal refleksi adab bersuci dan video mini demonstrasi wudhu berkesadaran.',
        },
        {
          mapel: 'Matematika',
          topik: 'Keteraturan Pola Bilangan & Simetri Alam',
          kegiatan: 'Menyelidiki pola simetri dan barisan geometri pada sarang lebah dan bunga sebagai bukti keagungan perancangan Allah Swt.',
          artefak: 'Laporan visual keteraturan ciptaan ilahi berbasis geometri.',
        },
      ],
      indikatorSantri: [
        'Memulai dan mengakhiri aktivitas belajar dengan doa tulus dan berkesadaran (mindful praying).',
        'Menunjukkan kejujuran akademis dalam mengerjakan tugas dan evaluasi.',
        'Mengaitkan konsep ilmu pengetahuan dengan kebesaran Sang Pencipta.',
      ],
      peranPendidik: [
        'Menjadi teladan adab islami, ketenangan, dan tutur kata santun.',
        'Mengintegrasikan ayat kauniyah dan ayat qauliyah secara kontekstual.',
      ],
    },

    'Cinta Ilmu': {
      description: 'Membangkitkan rasa ingin tahu ilmiah (scientific curiosity), gairah membaca, bernalar kritis, dan integritas pencarian kebenaran tanpa henti.',
      haditsRef: '"Menuntut ilmu itu wajib bagi setiap muslim." (HR. Ibnu Majah)',
      contohMapel: [
        {
          mapel: 'IPA',
          topik: 'Metode Ilmiah & Investigasi Lingkungan',
          kegiatan: 'Merumuskan hipotesis, melakukan pengamatan terkontrol, dan menguji kualitas air sumur madrasah.',
          artefak: 'Laporan ilmiah investigatif dengan data empiris dan grafik pengamatan.',
        },
        {
          mapel: 'Bahasa Indonesia',
          topik: 'Teks Argumentasi Berbasis Data',
          kegiatan: 'Menyusun argumen kritis tentang fenomena sosial dengan mengutip rujukan yang kredibel.',
          artefak: 'Artikel opini argumentatif yang diterbitkan di mading madrasah.',
        },
      ],
      indikatorSantri: [
        'Gemar membaca dan mencari tahu dari berbagai sumber terpercaya.',
        'Berani mengajukan pertanyaan reflektif tingkat tinggi (HOTS).',
        'Menghargai proses eksperimen meskipun hasilnya belum sempurna.',
      ],
      peranPendidik: [
        'Menyediakan pertanyaan pemantik yang merangsang daya nalar.',
        'Mendorong budaya riset sederhana dan eksplorasi mandiri.',
      ],
    },

    'Cinta Lingkungan': {
      description: 'Menumbuhkan kesadaran ekologis sebagai khalifah di bumi untuk merawat, menjaga kebersihan, menghemat energi, dan mewujudkan Madrasah Hijau.',
      haditsRef: '"Tidaklah seorang muslim menanam pohon atau menabur benih lalu dimakan burung atau manusia... melainkan menjadi sedekah baginya." (HR. Bukhari & Muslim)',
      contohMapel: [
        {
          mapel: 'Matematika',
          topik: 'Statistika & Konservasi Air Bersih',
          kegiatan: 'Menghitung volume air wudhu yang terbuang dan merancang instalasi daur ulang air wudhu untuk menyiram taman madrasah.',
          artefak: 'Diagram batang analisis debit air dan desain konseptual filtrasi air.',
        },
        {
          mapel: 'IPS',
          topik: 'Pemberdayaan Sumber Daya Alam Berkelanjutan',
          kegiatan: 'Menganalisis dampak deforestasi dan menyusun gerakan madrasah minim sampah plastik (zero plastic waste).',
          artefak: 'Proposal aksi nyata "Madrasahku Asri Tanpa Plastik".',
        },
      ],
      indikatorSantri: [
        'Memilah sampah organik dan anorganik di lingkungan madrasah secara spontan.',
        'Menghemat penggunaan air dan mematikan lampu ruang kelas yang tidak terpakai.',
        'Merawat tanaman dan taman madrasah dengan sukarela.',
      ],
      peranPendidik: [
        'Menjadikan area madrasah sebagai laboratorium alam pembelajaran.',
        'Membiasakan gaya hidup minim sampah (zero waste lifestyle) di lingkungan madrasah.',
      ],
    },

    'Cinta Diri dan Sesama Manusia': {
      description: 'Mengembangkan penghargaan terhadap martabat kemanusiaan, empati sosial, toleransi (tasamuh), adab pergaulan, dan pencegahan kekerasan/perundungan.',
      haditsRef: '"Tidak beriman salah seorang di antara kalian hingga ia mencintai saudaranya sebagaimana ia mencintai dirinya sendiri." (HR. Bukhari & Muslim)',
      contohMapel: [
        {
          mapel: 'Akidah Akhlak',
          topik: 'Adab Bergaul & Mencegah Bullying',
          kegiatan: 'Bermain peran (role play) resolusi konflik santun dan deklarasi madrasah ramah anak.',
          artefak: 'Piagam komitmen anti-perundungan yang ditandatangani bersama santri.',
        },
        {
          mapel: 'Bahasa Inggris',
          topik: 'Describing People & Expressing Empathy',
          kegiatan: 'Menulis surat penyemangat dan apresiasi (gratitude letter) kepada teman sebangku dalam Bahasa Inggris.',
          artefak: 'Kumpulan kartu ucapan terima kasih dan empati antarsantri.',
        },
      ],
      indikatorSantri: [
        'Mendengarkan teman dengan penuh perhatian saat berdiskusi.',
        'Tidak melontarkan ejekan atau panggilan yang menyakiti hati sesama.',
        'Saling membantu rekan yang sedang tertinggal dalam pelajaran.',
      ],
      peranPendidik: [
        'Membangun iklim kelas yang aman secara emosional dan suportif.',
        'Melatih keterampilan komunikasi asertif dan empati aktif.',
      ],
    },

    'Cinta Tanah Air': {
      description: 'Menanamkan komitmen kebangsaan, moderasi beragama, kecintaan pada persatuan NKRI, dan apresiasi mendalam terhadap kekayaan budaya nusantara.',
      haditsRef: '"Cinta tanah air adalah bagian dari komitmen kebangsaan dan nilai moderasi beragama." (KMA 1503/2025 & SK Dirjen Pendis 6077/2025)',
      contohMapel: [
        {
          mapel: 'SKI',
          topik: 'Peran Ulama dalam Kemerdekaan Indonesia',
          kegiatan: 'Menganalisis Resolusi Jihad 22 Oktober 1945 dan keteladanan para kiai/ulama dalam membela tanah air.',
          artefak: 'Infografis linimasa perjuangan tokoh madrasah bagi kemerdekaan RI.',
        },
        {
          mapel: 'Seni Budaya / Mulok',
          topik: 'Kaligrafi Islam Nusantara & Batik Lokal',
          kegiatan: 'Memadukan motif batik kearifan lokal dengan seni kaligrafi Arab kontemporer.',
          artefak: 'Karya seni rupa akulturasi kaligrafi-batik khas nusantara.',
        },
      ],
      indikatorSantri: [
        'Menghormati perbedaan suku, bahasa, dan latar belakang antarwarga madrasah.',
        'Mengutamakan musyawarah untuk mufakat dalam pengambilan keputusan kelas.',
        'Bangga menggunakan produk dan budaya khas nusantara.',
      ],
      peranPendidik: [
        'Menyisipkan wawasan moderasi beragama (*wasathiyyah*) dalam narasi belajar.',
        'Menguatkan semangat gotong royong dan kebhinnekaan santri.',
      ],
    },
  };

  const selectedData = pancaCintaData[selectedPancaCinta];

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-madrasah-900 to-teal-900 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-2 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gold-400/20 text-gold-300 border border-gold-400/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold-300" />
              SK Dirjen Pendis Nomor 6077 Tahun 2025
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
              Deep Learning in Madrasah
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Panduan Kurikulum Berbasis Cinta & Pembelajaran Mendalam
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            Menghadirkan pengalaman belajar yang berkesadaran (mindful), bermakna (meaningful), dan menggembirakan (joyful) 
            dengan mengintegrasikan 5 Nilai Panca Cinta secara konkret dan teramati di ruang kelas.
          </p>
        </div>
      </div>

      {/* 3 PRINSIP PEMBELAJARAN MENDALAM */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-t-4 border-t-emerald-600">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">1. Mindful Learning (Berkesadaran)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Santri hadir utuh dengan pikiran, hati, dan raga. Fokus memperhatikan materi, menyadari tujuan belajarnya, 
              serta mengawali dan mengakhiri sesi dengan keheningan doa yang mendalam.
            </p>
            <div className="pt-2 text-[11px] font-semibold text-emerald-800">
              Pengalaman: <strong>Memahami (Understanding)</strong>
            </div>
          </div>
        </Card>

        <Card className="border-t-4 border-t-sky-600">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">2. Meaningful Learning (Bermakna)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Konsep ilmu dikaitkan langsung dengan konteks kehidupan nyata madrasah, tantangan lingkungan, 
              dan pemecahan masalah konkret, bukan sekadar menghafal rumus atau teori untuk ujian.
            </p>
            <div className="pt-2 text-[11px] font-semibold text-sky-800">
              Pengalaman: <strong>Mengaplikasi (Applying)</strong>
            </div>
          </div>
        </Card>

        <Card className="border-t-4 border-t-amber-500">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Smile className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">3. Joyful Learning (Menggembirakan)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Suasana kelas bebas dari rasa takut salah dan intimidasi. Santri menikmati dinamika kolaborasi kelompok, 
              saling mengapresiasi keberhasilan rekan, dan merefleksikan hikmah dengan sukacita.
            </p>
            <div className="pt-2 text-[11px] font-semibold text-amber-800">
              Pengalaman: <strong>Merefleksi (Reflecting)</strong>
            </div>
          </div>
        </Card>
      </div>

      {/* PANCA CINTA INTERACTIVE MATRIX */}
      <Card title="Eksplorasi Konkret 5 Nilai Panca Cinta" subtitle="Pilih nilai untuk melihat rasional, dalil, contoh lintas mata pelajaran, dan indikator teramati">
        {/* BUTTONS SELECTOR */}
        <div className="flex flex-wrap gap-2 pb-4 border-b border-slate-100">
          {(
            [
              'Cinta Allah dan Rasul-Nya',
              'Cinta Ilmu',
              'Cinta Lingkungan',
              'Cinta Diri dan Sesama Manusia',
              'Cinta Tanah Air',
            ] as PancaCintaValue[]
          ).map((val) => (
            <button
              key={val}
              onClick={() => setSelectedPancaCinta(val)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 border ${
                selectedPancaCinta === val
                  ? 'bg-madrasah-700 text-white border-madrasah-700 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${selectedPancaCinta === val ? 'fill-current' : 'text-slate-400'}`} />
              {val}
            </button>
          ))}
        </div>

        {/* DETAILS OF SELECTED VALUE */}
        <div className="mt-4 space-y-5 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-madrasah-900">{selectedPancaCinta}</h3>
              <PancaCintaBadge value={selectedPancaCinta} size="md" />
            </div>
            <p className="text-slate-700 leading-relaxed">{selectedData.description}</p>
            <p className="text-[11px] italic text-slate-500 font-serif pt-1">
              Rujukan Hikmah: {selectedData.haditsRef}
            </p>
          </div>

          {/* TWO COLS: CONTOH MAPEL VS INDIKATOR TERAMATI */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* CONTOH PENERAPAN LINTAS MAPEL */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-800 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-madrasah-700" />
                Contoh Konkret Penerapan Lintas Mata Pelajaran
              </h4>

              <div className="space-y-3">
                {selectedData.contohMapel.map((c, i) => (
                  <div key={i} className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1.5 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-madrasah-800">{c.mapel}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">
                        {c.topik}
                      </span>
                    </div>
                    <p className="text-slate-700"><strong>Kegiatan Konkret:</strong> {c.kegiatan}</p>
                    <p className="text-[11px] text-slate-500"><strong>Artefak / Bukti Belajar:</strong> {c.artefak}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* INDIKATOR PERILAKU TERAMATI & PERAN GURU */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Indikator Perilaku Santri yang Dapat Diamati
              </h4>

              <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2">
                <ul className="space-y-2">
                  {selectedData.indikatorSantri.map((ind, i) => (
                    <li key={i} className="flex items-start gap-2 text-emerald-950">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0" />
                      <span>{ind}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <h4 className="font-bold text-slate-800 pt-2 flex items-center gap-2">
                <Users className="w-4 h-4 text-sky-700" />
                Peran Pendidik (Guru)
              </h4>

              <div className="p-3.5 rounded-xl border border-sky-200 bg-sky-50/50 space-y-1.5 text-sky-950">
                <ul className="space-y-1.5">
                  {selectedData.peranPendidik.map((p, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-1.5 flex-shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
