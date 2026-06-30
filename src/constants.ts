import { Step1Data, Step2Data, Step3Data, Step4Data } from "./types";

export const initialStep1: Step1Data = {
  namaGuru: "",
  mataPelajaran: "Koding dan Kecerdasan Artifisial (KKA)",
  fase: "D",
  kelas: "VII (Tujuh)",
  semester: "Ganjil (1)",
  topik: "Pengenalan Berpikir Komputasional dan Pemrograman Dasar",
  subtopik: "Membuat Game Sederhana Menggunakan Scratch",
  alokasiWaktu: "2 JP (2 x 40 Menit)",
  karakteristikSekolah: "Sekolah rujukan digital di area sub-urban dengan fasilitas laboratorium komputer memadai (satu siswa satu PC) dan akses internet serat optik.",
  karakteristikPesertaDidik: "Sebagian besar siswa memiliki minat tinggi pada gim komputer, namun pemahaman logis koding masih beragam (heterogen). Terdapat 15% siswa berkebutuhan belajar kinetik.",
  cpInput: "Peserta didik mampu memahami algoritma proses pemecahan masalah sederhana, melakukan rancang bangun kode program visual (Scratch/Blockly) secara runtut, mandiri, dan kolaboratif.",
  cpOption: "manual",
  taksonomi: "Bloom",
};

export const initialStep2: Step2Data = {
  modelPembelajaran: "PBL",
  modelLainnya: "",
  kemitraan: "Orang Tua Siswa (sebagai play-tester di rumah) dan Mentor dari Komunitas Programmer Lokal.",
  lingkunganBelajar: "Ruang Kelas Kolaboratif dengan formasi bento-desk (meja berkelompok) serta Lab Koding dengan proyektor interaktif.",
  mediaDigital: "Platform Scratch MIT Edu, Lembar Kerja Canva Interaktif, Simulasi Video Game.",
  aiYangDigunakan: "Gemini AI (untuk debugging koding dan asisten brainstorming ide kreatif siswa).",
};

export const initialStep3: Step3Data = {
  jumlahPertemuan: "2 Pertemuan",
  jenisProjek: "Pembuatan Game Edukasi Sederhana Bertema Lingkungan Hidup (Green Coding).",
  produkYangDihasilkan: "Gim Scratch interaktif 'Pembersih Sampah Laut' yang dapat dimainkan di web.",
};

export const initialStep4: Step4Data = {
  jenisPenilaian: "Formatif (Penilaian Proses & Jurnal Refleksi), Sumatif (Karya Produk Akhir Scratch & Presentasi kelompok).",
  produkEvaluasi: "Rubrik Kriteria Keberhasilan fungsionalitas gim (skor program tanpa bug, keunikan aset seni, presentasi lisan).",
  jenisLkpd: "LKPD Alur Logika Pemecahan Masalah (Mengurai Sintaks Scratch) dilengkapi Tantangan Mandiri (HOTS Challenge).",
  perluBahanBacaan: true,
};

export const MODEL_PEMBELAJARAN_OPTIONS = [
  { value: "PBL", label: "PBL (Problem Based Learning)" },
  { value: "PjBL", label: "PjBL (Project Based Learning)" },
  { value: "Discovery", label: "Discovery Learning" },
  { value: "Inquiry", label: "Inquiry Learning" },
  { value: "Cooperative", label: "Cooperative Learning" },
  { value: "STEM", label: "STEM (Science, Tech, Engineering, Math)" },
  { value: "STEAM", label: "STEAM (STEM + Art)" },
  { value: "Flipped", label: "Flipped Classroom" },
  { value: "Experiential", label: "Experiential Learning" },
  { value: "Problem Solving", label: "Problem Solving Model" },
  { value: "lainnya", label: "Lainnya (Tulis Sendiri)" },
];

export const FASE_OPTIONS = ["A", "B", "C", "D", "E", "F"];

export const SEMESTER_OPTIONS = [
  { value: "Ganjil (1)", label: "Ganjil (1)" },
  { value: "Genap (2)", label: "Genap (2)" },
];

export function generateStep1Prompt(data: Step1Data): string {
  const cpValue = data.cpOption === "otomatis" 
    ? "[PILIHAN CARI CP OTOMATIS: AI dimohon mencarikan Capaian Pembelajaran (CP) resmi terbaru dari Kemendikbudristek RI sesuai dengan Mata Pelajaran, Fase, Kelas, dan Topik di atas]" 
    : (data.cpInput || "[Tidak ada CP yang diinputkan, silakan carikan CP resmi]");

  return `Bertindaklah sebagai spesialis pengembang kurikulum Sekolah Model yang ahli dalam Pembelajaran Mendalam (PM), Koding & Kecerdasan Artifisial (KKA), TPACK, dan pengembangan Modul Ajar Kurikulum Nasional.

Sebelum menyusun jawaban, gunakan sebagai acuan:
✔ Panduan Pembelajaran Mendalam (PM)
✔ Panduan Koding dan Kecerdasan Artifisial (KKA)
✔ Capaian Pembelajaran (CP) terbaru sesuai mata pelajaran
✔ Panduan pembelajaran mata pelajaran masing-masing
✔ Panduan Sekolah Model (jika tersedia)
✔ Kalender Akademik dan ATP sekolah

Prinsip TPACK
Taksonomi ${data.taksonomi}

Jangan membuat CP baru apabila telah diberikan oleh pengguna secara spesifik.

Berdasarkan informasi berikut:
A. IDENTITAS PEMBELAJARAN
- Nama Guru: ${data.namaGuru || "[Nama Guru]"}
- Mata Pelajaran: ${data.mataPelajaran}
- Fase: ${data.fase}
- Kelas: ${data.kelas}
- Semester: ${data.semester}
- Topik: ${data.topik}
- Subtopik: ${data.subtopik}
- Alokasi Waktu: ${data.alokasiWaktu}

Karakteristik Sekolah:
${data.karakteristikSekolah}

Karakteristik Peserta Didik:
${data.karakteristikPesertaDidik}

Capaian Pembelajaran (CP) Acuan:
${cpValue}

Susun secara sangat rinci dan terstruktur:

A. IDENTITAS PEMBELAJARAN (Tampilkan ulang informasi identitas di atas dengan format tabel yang rapi dan elegan)

B. IDENTIFIKASI PEMBELAJARAN
1. Kesiapan peserta didik (grup tinggi, sedang, perlu bimbingan)
2. Pengetahuan awal (prerequisite knowledge)
3. Minat belajar siswa
4. Profil kebutuhan belajar siswa
5. Karakteristik materi berdasarkan dimensi pengetahuan:
   - Faktual (contoh nyata, realitas fisik)
   - Konseptual (definisi, konsep inti)
   - Prosedural (langkah-langkah pengerjaan)
   - Metakognitif (bagaimana siswa memonitor pemikirannya)
6. Relevansi materi dengan dunia nyata dan masa depan koding/AI
7. Dimensi Profil Pelajar Pancasila yang paling relevan beserta alasan konkretnya
8. Rekomendasi Asesmen Diagnostik Awal (baik kognitif maupun non-kognitif)
9. Tindak lanjut hasil asesmen diagnostik awal secara detail untuk diferensiasi proses

Selanjutnya susun:
Capaian Pembelajaran (CP)
[Tulis ulang CP resmi secara presisi. Jika opsi "Cari CP otomatis" aktif, carikan CP resmi terbaru Kemendikbudristek RI sesuai topik]

Selanjutnya susun:
Tujuan Pembelajaran (TP)
[Rumuskan minimal 3-4 Tujuan Pembelajaran yang diturunkan dari CP di atas menggunakan Alur Kinerja yang diukur dengan Taksonomi ${data.taksonomi} (pilih kata kerja operasional yang tepat) dan pastikan seluruh TP secara alami mengintegrasikan HOTS - Higher Order Thinking Skills].

PENTING: Jangan membuat bagian D (Pengalaman Belajar) dan E (Asesmen) terlebih dahulu pada tahap ini. Tetap fokus hanya pada bagian Analisis Pembelajaran dan Tujuan Pembelajaran agar kualitas analisis mendalam.`;
}

export function generateStep2Prompt(data: Step2Data, step1Output: string, taksonomi: string): string {
  const modelValue = data.modelPembelajaran === "lainnya" ? data.modelLainnya : data.modelPembelajaran;

  return `Berdasarkan hasil Analisis Pembelajaran sebelumnya, lanjutkan penyusunan Modul Ajar untuk Sekolah Model.
Gunakan acuan:
✔ Panduan Pembelajaran Mendalam (PM)
✔ Panduan Koding & Kecerdasan Artifisial (KKA)
✔ Kerangka TPACK (Technological Pedagogical Content Knowledge)
✔ Taksonomi ${taksonomi}

Berikut adalah hasil Analisis Pembelajaran dari STEP 1 sebelumnya:
=========================================
${step1Output || "[Lengkapi Step 1 terlebih dahulu]"}
=========================================

Berikut adalah preferensi Desain Pembelajaran yang diinputkan pengguna:
- Model Pembelajaran Utama: ${modelValue}
- Kemitraan Pembelajaran: ${data.kemitraan || "Mandiri/Tidak spesifik"}
- Lingkungan Belajar: ${data.lingkunganBelajar}
- Media Digital: ${data.mediaDigital}
- AI yang digunakan: ${data.aiYangDigunakan}

Susun secara sangat rinci dan terstruktur bagian selanjutnya dari modul:

C. DESAIN PEMBELAJARAN
1. Model Pembelajaran yang dipilih beserta alasan pedagogis (Mengapa cocok dengan materi dan karakteristik siswa)
2. Sintaks Lengkap model pembelajaran yang telah diadaptasi dengan prinsip Pembelajaran Mendalam (PM) secara runut
3. Peran Guru (sebagai desainer, fasilitator, aktivator)
4. Peran Peserta Didik (agen belajar mandiri, kolaborator, pemecah masalah)
5. Integrasi Prinsip Pembelajaran Mendalam (PM) "4M":
   - Memuliakan (Mengakui nilai intrinsik siswa)
   - Berkesadaran (Mindful, reflektif, penuh kehadiran)
   - Bermakna (Menghubungkan ke kehidupan nyata siswa)
   - Menggembirakan (Joyful learning, antusiasme)
6. Integrasi TPACK (Tunjukkan bagaimana aspek teknologi, pedagogi, dan materi konten berpadu utuh)
7. Kemitraan Pembelajaran (Detail implementasi keterlibatan mitra/orang tua/komunitas)
8. Manajemen Lingkungan Belajar (Tata letak ruang kelas/lab fisik, suasana psikososial)
9. Pemanfaatan Teknologi Digital & AI secara aman dan etis (Guidelines penggunaan AI ${data.aiYangDigunakan} oleh siswa)
10. Integrasi Unsur Koding & AI (Bagaimana siswa diajak memahami logika komputasi di balik media yang dipelajari)

Pastikan seluruh desain pembelajaran ini konsisten, adaptif, dan secara langsung mendukung ketercapaian Tujuan Pembelajaran yang telah dirumuskan di STEP 1.`;
}

export function generateStep3Prompt(data: Step3Data, step1Output: string, step2Output: string, taksonomi: string): string {
  return `Berdasarkan seluruh analisis dan desain pembelajaran yang telah disusun sebelumnya, susun bagian:
D. PENGALAMAN BELAJAR

Gunakan prinsip Pembelajaran Mendalam (PM) secara eksplisit.

Berikut adalah acuan Modul Ajar yang sudah dirumuskan sebelumnya:
=========================================
STEP 1: ANALISIS PEMBELAJARAN
${step1Output || "[Lengkapi Step 1]"}

STEP 2: DESAIN PEMBELAJARAN
${step2Output || "[Lengkapi Step 2]"}
=========================================

Berikut adalah parameter Pengalaman Belajar dari pengguna:
- Jumlah Pertemuan: ${data.jumlahPertemuan}
- Jenis Projek: ${data.jenisProjek || "Tidak menggunakan projek panjang"}
- Produk Akhir yang Dihasilkan Siswa: ${data.produkYangDihasilkan}

Untuk setiap pertemuan (misal Pertemuan 1, Pertemuan 2, dst.), susun skenario pembelajaran secara rinci dengan alokasi waktu per tahapan:

1. Kegiatan Awal (Pendahuluan)
   - Apersepsi (Mengaitkan pengalaman nyata siswa atau pengetahuan awal)
   - Motivasi (Pemantik rasa ingin tahu tentang koding/AI)
   - Penyampaian Tujuan Pembelajaran & Kriteria Keberhasilan

2. Kegiatan Inti
   Gunakan Alur Pembelajaran Mendalam yang berpusat pada siswa:
   a. MEMAHAMI (Siswa mengidentifikasi masalah, mengeksplorasi konsep dasar, dan mengamati contoh)
   b. MENGAPLIKASI (Siswa bereksperimen, koding mandiri/berkelompok, berkolaborasi membuat projek)
   c. MEREFLEKSI (Siswa mengevaluasi kode mereka, melakukan debugging, menyadari apa yang dipelajari)
   
   Pada SETIAP alur (Memahami, Mengaplikasi, Merefleksi), jelaskan secara rinci:
   - Aktivitas Guru secara spesifik
   - Aktivitas Murid secara aktif
   - Media Pembelajaran fisik/digital
   - Teknologi yang digunakan
   - Pemanfaatan AI oleh siswa/guru
   - Bentuk Asesmen Formatif seketika (check for understanding)
   - Strategi Diferensiasi (konten, proses, atau produk untuk kebutuhan belajar kinetik/heterogen)
   - Penguatan Karakter (Kolaborasi, bernalar kritis, kreatif)

3. Kegiatan Penutup
   - Refleksi Pembelajaran bersama siswa (pertanyaan reflektif)
   - Penguatan Konsep kunci oleh guru
   - Tindak Lanjut (penugasan ringan di rumah, rencana pertemuan selanjutnya)

Pastikan seluruh skenario ini logis, mudah diterapkan oleh guru, dan benar-benar melatih keterampilan berpikir tingkat tinggi (HOTS).`;
}

export function generateStep4Prompt(data: Step4Data, step1Output: string, step2Output: string, step3Output: string, taksonomi: string): string {
  return `Lanjutkan penyusunan Modul Ajar berdasarkan seluruh hasil rancangan sebelumnya menjadi dokumen final yang utuh dan profesional.

Gunakan seluruh acuan yang telah disusun di tahap sebelumnya:
=========================================
STEP 1: ANALISIS PEMBELAJARAN
${step1Output || "[Lengkapi Step 1]"}

STEP 2: DESAIN PEMBELAJARAN
${step2Output || "[Lengkapi Step 2]"}

STEP 3: PENGALAMAN BELAJAR
${step3Output || "[Lengkapi Step 3]"}
=========================================

Berikut adalah parameter Asesmen & Finalisasi:
- Jenis Penilaian: ${data.jenisPenilaian}
- Detail Kriteria Produk: ${data.produkEvaluasi}
- Jenis Lembar Kerja (LKPD): ${data.jenisLkpd}
- Apakah Membutuhkan Bahan Bacaan Siswa: ${data.perluBahanBacaan ? "YA" : "TIDAK"}

Susun secara sangat lengkap, praktis, dan profesional bagian-bagian berikut:

E. ASESMEN PEMBELAJARAN
1. Assessment as Learning (Asesmen proses refleksi diri siswa, jurnal metakognitif)
2. Assessment for Learning (Asesmen selama koding/pembuatan projek, umpan balik seketika)
3. Assessment of Learning (Asesmen produk akhir atau evaluasi kompetensi tertulis/praktik)
4. Lampiran Instrumen Observasi Sikap Kolaborasi & Kritis (Tabel check-list siap pakai)
5. Lampiran Penilaian Diri (Self-Assessment) Siswa (Pertanyaan siap cetak)
6. Lampiran Penilaian Antarteman (Peer-Assessment) Siswa (Tabel sederhana)
7. Rubrik Penilaian Produk Utama (Scratch/Koding) berskala 1 sampai 4 yang sangat terperinci beserta kriteria di tiap tingkatan (Skor 4 = Sangat Baik, 3 = Baik, 2 = Cukup, 1 = Perlu Bimbingan)
8. Rencana Program Remedial (untuk siswa yang belum mencapai kompetensi)
9. Rencana Program Pengayaan (untuk siswa yang selesai lebih cepat)
10. Lembar Refleksi Guru setelah pembelajaran (panduan evaluasi diri guru)

Selanjutnya susun bagian BONUS yang siap digunakan di kelas:

BONUS 1: LEMBAR KERJA PESERTA DIDIK (LKPD) LENGKAP
Wajib memuat komponen terstruktur:
- Judul LKPD sesuai topik
- Tujuan LKPD yang diturunkan dari Tujuan Pembelajaran
- Petunjuk Belajar & Penggunaan Alat/Platform
- Aktivitas Koding/Pemecahan Masalah (Langkah-langkah terperinci)
- Pertanyaan HOTS Pemantik Nalar Kritis (minimal 3 pertanyaan eksploratif)
- Lembar Refleksi Pengalaman Siswa
- Definisi Produk Akhir yang harus dikumpulkan

${data.perluBahanBacaan ? `BONUS 2: BAHAN BACAAN PESERTA DIDIK (BAHAN AJAR LENGKAP)
Tulis bahan ajar komprehensif yang:
- Menggunakan bahasa yang sesuai dengan usia dan tingkat perkembangan peserta didik (komunikatif, interaktif, ramah anak)
- Kontekstual (menggunakan analogi dunia nyata yang dekat dengan kehidupan sehari-hari anak)
- Sesuai prinsip Pembelajaran Mendalam (bukan sekadar hafalan, melainkan pemahaman konsep logis)
- Memuat contoh nyata visualisasi sintaks atau logika koding
- Mengembangkan kemampuan Literasi dan Numerasi dasar
- Glosarium Istilah Penting (kamus kecil istilah koding/AI)
- Rangkuman Materi yang padat dan mudah diingat (Cheat Sheet koding)
- Pertanyaan Refleksi Mandiri di akhir bacaan
- Mendukung ketercapaian tujuan pembelajaran` : `BONUS 2: RANGKUMAN SINGKAT MATERI (Tanpa Bahan Bacaan Lengkap)
Berisi infografis teks singkat atau ringkasan konsep inti koding Scratch untuk cheat sheet cepat siswa.`}

Pastikan seluruh hasil evaluasi, instrumen, LKPD, dan bahan bacaan ini konsisten penuh dengan modul ajar yang dirancang dari Step 1 sampai 3 tanpa mengubah isi atau alur yang telah disepakati sebelumnya.`;
}
