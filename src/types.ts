export interface Step1Data {
  namaGuru: string;
  mataPelajaran: string;
  fase: string;
  kelas: string;
  semester: string;
  topik: string;
  subtopik: string;
  alokasiWaktu: string;
  karakteristikSekolah: string;
  karakteristikPesertaDidik: string;
  cpInput: string;
  cpOption: "otomatis" | "manual";
  taksonomi: "Bloom" | "SOLO";
}

export interface Step2Data {
  modelPembelajaran: string;
  modelLainnya: string;
  kemitraan: string;
  lingkunganBelajar: string;
  mediaDigital: string;
  aiYangDigunakan: string;
}

export interface Step3Data {
  jumlahPertemuan: string;
  jenisProjek: string;
  produkYangDihasilkan: string;
}

export interface Step4Data {
  jenisPenilaian: string;
  produkEvaluasi: string;
  jenisLkpd: string;
  perluBahanBacaan: boolean;
}

export interface AppState {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
  step4: Step4Data;
  
  // Konteks Berjalan outputs
  step1Output: string;
  step2Output: string;
  step3Output: string;
  step4Output: string;
  
  currentStep: number; // 1 to 4
}
