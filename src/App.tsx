import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  RotateCcw, 
  FileCheck, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  Download, 
  BookOpen, 
  GraduationCap, 
  Info, 
  X,
  FileText,
  FileJson
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import BeforeStarting from "./components/BeforeStarting";
import StepProgress from "./components/StepProgress";
import FormStep1 from "./components/FormStep1";
import FormStep2 from "./components/FormStep2";
import FormStep3 from "./components/FormStep3";
import FormStep4 from "./components/FormStep4";
import OutputConsole from "./components/OutputConsole";
import { 
  initialStep1, 
  initialStep2, 
  initialStep3, 
  initialStep4, 
  generateStep1Prompt, 
  generateStep2Prompt, 
  generateStep3Prompt, 
  generateStep4Prompt 
} from "./constants";
import { exportToFile, markdownToBasicHtml } from "./utils";

export default function App() {
  // Master wizard state
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [step1Data, setStep1Data] = useState(initialStep1);
  const [step2Data, setStep2Data] = useState(initialStep2);
  const [step3Data, setStep3Data] = useState(initialStep3);
  const [step4Data, setStep4Data] = useState(initialStep4);

  // Accumulated contexts (Konteks Berjalan)
  const [step1Output, setStep1Output] = useState<string>("");
  const [step2Output, setStep2Output] = useState<string>("");
  const [step3Output, setStep3Output] = useState<string>("");
  const [step4Output, setStep4Output] = useState<string>("");

  // Modals & UI Toggles
  const [showFullPreview, setShowFullPreview] = useState<boolean>(false);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const [showInfoPanel, setShowInfoPanel] = useState<boolean>(true);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem("modul_ajar_prompt_builder_state");
      if (savedState) {
        const parsed = JSON.parse(savedState);
        if (parsed.step1) setStep1Data(parsed.step1);
        if (parsed.step2) setStep2Data(parsed.step2);
        if (parsed.step3) setStep3Data(parsed.step3);
        if (parsed.step4) setStep4Data(parsed.step4);
        if (parsed.step1Output) setStep1Output(parsed.step1Output);
        if (parsed.step2Output) setStep2Output(parsed.step2Output);
        if (parsed.step3Output) setStep3Output(parsed.step3Output);
        if (parsed.step4Output) setStep4Output(parsed.step4Output);
        if (parsed.currentStep) setCurrentStep(parsed.currentStep);
      }
    } catch (e) {
      console.error("Gagal memuat draft dari local storage:", e);
    }
  }, []);

  // Save to LocalStorage on state change
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const stateToSave = {
          step1: step1Data,
          step2: step2Data,
          step3: step3Data,
          step4: step4Data,
          step1Output,
          step2Output,
          step3Output,
          step4Output,
          currentStep,
        };
        localStorage.setItem("modul_ajar_prompt_builder_state", JSON.stringify(stateToSave));
      } catch (e) {
        console.error("Gagal menyimpan draft ke local storage:", e);
      }
    }, 800); // Debounced save

    return () => clearTimeout(timer);
  }, [step1Data, step2Data, step3Data, step4Data, step1Output, step2Output, step3Output, step4Output, currentStep]);

  // Generate prompts dynamically based on active step
  const getActivePrompt = (): string => {
    switch (currentStep) {
      case 1:
        return generateStep1Prompt(step1Data);
      case 2:
        return generateStep2Prompt(step2Data, step1Output, step1Data.taksonomi);
      case 3:
        return generateStep3Prompt(step3Data, step1Output, step2Output, step1Data.taksonomi);
      case 4:
        return generateStep4Prompt(step4Data, step1Output, step2Output, step3Output, step1Data.taksonomi);
      default:
        return "";
    }
  };

  const getSavedOutput = (): string => {
    switch (currentStep) {
      case 1:
        return step1Output;
      case 2:
        return step2Output;
      case 3:
        return step3Output;
      case 4:
        return step4Output;
      default:
        return "";
    }
  };

  const handleOutputChange = (newOutput: string) => {
    switch (currentStep) {
      case 1:
        setStep1Output(newOutput);
        break;
      case 2:
        setStep2Output(newOutput);
        break;
      case 3:
        setStep3Output(newOutput);
        break;
      case 4:
        setStep4Output(newOutput);
        break;
    }
  };

  // Compile contexts carried over (Running Context)
  const getPreviousContexts = () => {
    const contexts = [];
    if (currentStep > 1 && step1Output) {
      contexts.push({ step: 1, title: "Tahap 1: Analisis", content: step1Output });
    }
    if (currentStep > 2 && step2Output) {
      contexts.push({ step: 2, title: "Tahap 2: Desain", content: step2Output });
    }
    if (currentStep > 3 && step3Output) {
      contexts.push({ step: 3, title: "Tahap 3: Skenario", content: step3Output });
    }
    return contexts;
  };

  const loadDemoData = () => {
    setStep1Data({
      namaGuru: "Ahmad Dahlan, S.Pd., M.T.",
      mataPelajaran: "Koding dan Kecerdasan Artifisial (KKA)",
      fase: "D",
      kelas: "VIII (Delapan)",
      semester: "Ganjil (1)",
      topik: "Logika Algoritma & Automasi Cerdas",
      subtopik: "Implementasi Struktur Kondisional (If-Else) pada IoT Lampu Otomatis",
      alokasiWaktu: "2 JP (2 x 40 Menit)",
      karakteristikSekolah: "Sekolah Model PM + KKA dengan Lab Komputer modern. Dilengkapi kit mikrokontroler (Arduino/Micro:bit) yang cukup untuk kerja kelompok 3 siswa.",
      karakteristikPesertaDidik: "Siswa telah menguasai dasar input/output Scratch. Menunjukkan ketertarikan tinggi pada robotika fisik, namun 20% memerlukan bimbingan tambahan dalam merumuskan logika kondisional bersarang (nested if).",
      cpInput: "Peserta didik mampu memahami konsep logika percabangan, merancang sistem logika IoT sederhana secara berkelompok, serta menjelaskan implikasi etis sistem otomasi kecerdasan buatan.",
      cpOption: "manual",
      taksonomi: "Bloom",
    });

    setStep2Data({
      modelPembelajaran: "PjBL",
      modelLainnya: "",
      kemitraan: "Akademisi dari Departemen Teknik Informatika Universitas Mitra dan Jaringan Alumni Sekolah.",
      lingkunganBelajar: "Lab Terpadu (Lab Maker Space) dengan meja kerja luas, papan tulis interaktif, dan lemari penyimpanan kit sensor.",
      mediaDigital: "Platform simulasi sirkuit Wokwi/Tinkercad, Google Slides untuk presentasi, serta Google Keep untuk koordinasi tugas tim.",
      aiYangDigunakan: "Gemini AI (sebagai co-pilot koding untuk memverifikasi logika script pemrograman).",
    });

    setStep3Data({
      jumlahPertemuan: "2 Pertemuan (4 JP)",
      jenisProjek: "Merancang Sirkuit Simulasi Smart-Home Lighting (Lampu Kamar Otomatis) responsif sensor cahaya (LDR).",
      produkYangDihasilkan: "Simulasi sirkuit Wokwi yang fungsional lengkap dengan dokumentasi logika koding (algoritma lampu menyala otomatis).",
    });

    setStep4Data({
      jenisPenilaian: "Formatif (Skenario debugging kelompok), Sumatif (Presentasi sistem sirkuit & Kuis Logika Koding).",
      produkEvaluasi: "Kesesuaian algoritma sirkuit (lampu menyala tepat waktu sesuai sensor) dan kebersihan baris kode, kolaborasi tim.",
      jenisLkpd: "LKPD Diagram Alur Algoritma (Flowchart) IoT & Jurnal Debugging Sirkuit.",
      perluBahanBacaan: true,
    });

    // Reset outputs to let them test generation fresh
    setStep1Output("");
    setStep2Output("");
    setStep3Output("");
    setStep4Output("");
    setCurrentStep(1);
    
    // Auto-scroll to form top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetWorkspace = () => {
    setStep1Data({
      namaGuru: "",
      mataPelajaran: "Koding dan Kecerdasan Artifisial (KKA)",
      fase: "D",
      kelas: "",
      semester: "Ganjil (1)",
      topik: "",
      subtopik: "",
      alokasiWaktu: "",
      karakteristikSekolah: "",
      karakteristikPesertaDidik: "",
      cpInput: "",
      cpOption: "manual",
      taksonomi: "Bloom",
    });
    setStep2Data({
      modelPembelajaran: "PBL",
      modelLainnya: "",
      kemitraan: "",
      lingkunganBelajar: "",
      mediaDigital: "",
      aiYangDigunakan: "",
    });
    setStep3Data({
      jumlahPertemuan: "",
      jenisProjek: "",
      produkYangDihasilkan: "",
    });
    setStep4Data({
      jenisPenilaian: "",
      produkEvaluasi: "",
      jenisLkpd: "",
      perluBahanBacaan: true,
    });
    setStep1Output("");
    setStep2Output("");
    setStep3Output("");
    setStep4Output("");
    setCurrentStep(1);
    localStorage.removeItem("modul_ajar_prompt_builder_state");
    setShowResetConfirm(false);
  };

  // Combine all generated texts into a single cohesive document
  const getCompiledDocument = (): string => {
    return `
# MODUL AJAR SEKOLAH MODEL (KURIKULUM NASIONAL)
**Mata Pelajaran:** ${step1Data.mataPelajaran}
**Topik / Subtopik:** ${step1Data.topik} / ${step1Data.subtopik}
**Penyusun:** ${step1Data.namaGuru || "Guru Sekolah Model"}
**Fase / Kelas / Semester:** Fase ${step1Data.fase} / Kelas ${step1Data.kelas} / Semester ${step1Data.semester}

---

${step1Output ? step1Output : "### TAHAP 1: ANALISIS PEMBELAJARAN (Belum dihasilkan)"}

---

${step2Output ? step2Output : "### TAHAP 2: DESAIN PEMBELAJARAN (Belum dihasilkan)"}

---

${step3Output ? step3Output : "### TAHAP 3: PENGALAMAN BELAJAR (Belum dihasilkan)"}

---

${step4Output ? step4Output : "### TAHAP 4: ASESMEN & FINALISASI (Belum dihasilkan)"}
    `.trim();
  };

  const downloadFullText = () => {
    const text = getCompiledDocument();
    exportToFile(text, "Modul_Ajar_Sekolah_Model_Lengkap.txt", "text/plain;charset=utf-8");
  };

  const downloadFullMd = () => {
    const text = getCompiledDocument();
    exportToFile(text, "Modul_Ajar_Sekolah_Model_Lengkap.md", "text/markdown;charset=utf-8");
  };

  const downloadFullHtml = () => {
    const text = getCompiledDocument();
    const htmlContent = markdownToBasicHtml(text, "Modul Ajar Sekolah Model Lengkap");
    exportToFile(htmlContent, "Modul_Ajar_Sekolah_Model_Lengkap.html", "text/html;charset=utf-8");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-700 antialiased selection:bg-emerald-200">
      
      {/* Top Banner & Header */}
      <header id="app-header" className="sticky top-0 z-10 bg-white border-b border-slate-200/80 px-6 py-4 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-emerald-600 to-teal-500 rounded-xl text-white shadow-md shadow-emerald-600/10 shrink-0">
              <Sparkles className="w-5.5 h-5.5" />
            </div>
            <div>
              <h1 className="font-sans font-bold text-lg md:text-xl text-slate-900 tracking-tight flex items-center gap-2">
                AI Prompt Builder & Generator Modul Ajar
              </h1>
              <p className="text-xs text-slate-500 font-medium leading-normal">
                Sekolah Model berbasis Pembelajaran Mendalam (PM), Koding & Kecerdasan Artifisial (KKA)
              </p>
            </div>
          </div>

          {/* Global Actions */}
          <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
            <button
              onClick={loadDemoData}
              className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold px-3.5 py-2.5 rounded-xl border border-emerald-100 transition-all active:scale-97 cursor-pointer"
            >
              🚀 Muat Data Contoh
            </button>
            
            <button
              onClick={() => setShowResetConfirm(true)}
              className="text-xs bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200/60 transition-all flex items-center gap-1.5 active:scale-97 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Workspace
            </button>

            <button
              onClick={() => setShowFullPreview(true)}
              className="text-xs bg-slate-900 hover:bg-slate-800 text-white font-semibold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm active:scale-97 transition-all cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              Lihat Modul Lengkap
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        
        {/* Collapsible Welcome Guidelines */}
        {showInfoPanel && (
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-slate-200 rounded-2xl p-5 mb-6 shadow-sm relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-6 translate-y-6">
              <GraduationCap className="w-48 h-48 text-white" />
            </div>
            
            <button
              onClick={() => setShowInfoPanel(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4.5 h-4.5" />
            </button>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg shrink-0 mt-0.5">
                <Info className="w-5 h-5" />
              </div>
              <div className="space-y-2 max-w-4xl">
                <h3 className="font-sans font-bold text-sm text-white flex items-center gap-1.5">
                  Selamat Datang di Workspace Modul Ajar Sekolah Model!
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Aplikasi ini dirancang khusus dengan fitur <strong>Konteks Berjalan (Context Builder)</strong>. Setiap tahap yang diselesaikan (Step 1 s.d. Step 4) secara otomatis mengikat hasil analisis, desain, dan deskripsi sebelumnya, sehingga perumusan modul ajar Anda tetap <strong>koheren, runtut, bebas bias, dan logis</strong> tanpa perlu menyalin-tempel manual!
                </p>
                <div className="flex flex-wrap gap-4 text-[11px] text-slate-400 font-medium pt-1">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Pendekatan TPACK</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Pembelajaran Mendalam (PM)</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Integrasi Unsur Koding & AI</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Taksonomi Bloom / SOLO</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sebelum Memulai (Preparation checklist) */}
        <BeforeStarting />

        {/* Wizard Stepper Indicator */}
        <StepProgress currentStep={currentStep} onStepClick={(step) => setCurrentStep(step)} />

        {/* SPLIT DASHBOARD LAYOUT (Form on Left, Live Prompt/Console on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT: FORM INPUT PANEL (col-span-5) */}
          <section id="form-input-panel" className="lg:col-span-5 flex flex-col">
            <div className="bg-white border border-slate-150 rounded-2xl shadow-xs p-6 flex-1 flex flex-col justify-between">
              
              {/* Form Content */}
              <div className="flex-1">
                <div className="mb-4">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-0.5">
                    Modul input - Langkah {currentStep} dari 4
                  </span>
                  <h2 className="font-sans font-bold text-lg text-slate-900 tracking-tight">
                    {currentStep === 1 && "Analisis Karakteristik & CP"}
                    {currentStep === 2 && "Desain Kerangka Pedagogi"}
                    {currentStep === 3 && "Skenario Pengalaman Belajar"}
                    {currentStep === 4 && "Asesmen & Materi Bonus"}
                  </h2>
                </div>

                {/* Render specific Form step */}
                {currentStep === 1 && <FormStep1 data={step1Data} onChange={(upd) => setStep1Data({ ...step1Data, ...upd })} />}
                {currentStep === 2 && <FormStep2 data={step2Data} onChange={(upd) => setStep2Data({ ...step2Data, ...upd })} />}
                {currentStep === 3 && <FormStep3 data={step3Data} onChange={(upd) => setStep3Data({ ...step3Data, ...upd })} />}
                {currentStep === 4 && <FormStep4 data={step4Data} onChange={(upd) => setStep4Data({ ...step4Data, ...upd })} />}
              </div>

              {/* Wizard Footer Controls */}
              <div className="border-t border-slate-100 pt-5 mt-6 flex items-center justify-between shrink-0">
                <button
                  onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                  disabled={currentStep === 1}
                  className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 disabled:opacity-50 disabled:hover:bg-white text-slate-700 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer select-none"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Sebelumnya
                </button>

                <div className="text-xs font-mono font-bold text-slate-400">
                  Tahap {currentStep} / 4
                </div>

                {currentStep < 4 ? (
                  <button
                    onClick={() => setCurrentStep((prev) => Math.min(4, prev + 1))}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-sm active:scale-97 cursor-pointer select-none"
                  >
                    Selanjutnya
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowFullPreview(true)}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-emerald-700/10 cursor-pointer select-none"
                  >
                    <FileCheck className="w-4 h-4" />
                    Tinjau Dokumen Lengkap
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* RIGHT: PROMPT BUILDER & TERMINAL (col-span-7) */}
          <section id="terminal-panel" className="lg:col-span-7 flex flex-col">
            <OutputConsole
              stepNumber={currentStep}
              promptText={getActivePrompt()}
              savedOutput={getSavedOutput()}
              onOutputChange={handleOutputChange}
              previousContexts={getPreviousContexts()}
            />
          </section>

        </div>
      </main>

      {/* FULL PREVIEW MODAL / ACCORDION PANE */}
      {showFullPreview && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 text-slate-100 rounded-2xl w-full max-w-5xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
            
            {/* Modal Header */}
            <div className="bg-slate-950 px-6 py-5 border-b border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-600/20 text-emerald-400 rounded-lg shrink-0">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-base text-white">Pratinjau Hasil Modul Ajar Gabungan</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Dokumen konsolidasi kumulatif hasil perumusan seluruh langkah (Step 1 s.d. Step 4)</p>
                </div>
              </div>
              <button
                onClick={() => setShowFullPreview(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              
              {/* Export Panel Banner */}
              <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-300 leading-normal max-w-md">
                  <strong>💡 Selesai Merumuskan?</strong> Ekspor dokumen Modul Ajar Sekolah Model ini ke komputer Anda. File hasil ekspor kompatibel untuk diimpor langsung ke Google Docs atau Microsoft Word.
                </div>
                
                {/* Download Actions */}
                <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
                  <button
                    onClick={downloadFullMd}
                    className="flex-1 sm:flex-none text-xs bg-slate-800 hover:bg-slate-700 hover:text-emerald-400 text-slate-200 font-semibold px-4 py-2.5 rounded-xl border border-slate-700/60 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Unduh Markdown (.md)</span>
                  </button>

                  <button
                    onClick={downloadFullHtml}
                    className="flex-1 sm:flex-none text-xs bg-slate-800 hover:bg-slate-700 hover:text-emerald-400 text-slate-200 font-semibold px-4 py-2.5 rounded-xl border border-slate-700/60 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh HTML (.html)</span>
                  </button>

                  <button
                    onClick={downloadFullText}
                    className="flex-1 sm:flex-none text-xs bg-slate-800 hover:bg-slate-700 hover:text-emerald-400 text-slate-200 font-semibold px-4 py-2.5 rounded-xl border border-slate-700/60 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <FileJson className="w-3.5 h-3.5" />
                    <span>Unduh Teks (.txt)</span>
                  </button>
                </div>
              </div>

              {/* Full Unified Document Render */}
              <div id="full-document-preview" className="bg-slate-950/80 rounded-xl border border-slate-800/80 p-6 font-sans text-xs leading-relaxed max-h-[500px] overflow-y-auto">
                <div className="markdown-body space-y-6">
                  {/* Step 1 Output */}
                  <div className="pb-6 border-b border-slate-800/80">
                    <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest block mb-2">Bagian A & B: Analisis Pembelajaran & TP</span>
                    {step1Output ? (
                      <div className="prose prose-invert"><ReactMarkdown>{step1Output}</ReactMarkdown></div>
                    ) : (
                      <span className="text-slate-500 italic block">Langkah 1 (Analisis Pembelajaran) belum selesai dirumuskan.</span>
                    )}
                  </div>

                  {/* Step 2 Output */}
                  <div className="py-6 border-b border-slate-800/80">
                    <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest block mb-2">Bagian C: Desain Pembelajaran (Kerangka TPACK & PM)</span>
                    {step2Output ? (
                      <div className="prose prose-invert"><ReactMarkdown>{step2Output}</ReactMarkdown></div>
                    ) : (
                      <span className="text-slate-500 italic block">Langkah 2 (Desain Pembelajaran) belum selesai dirumuskan.</span>
                    )}
                  </div>

                  {/* Step 3 Output */}
                  <div className="py-6 border-b border-slate-800/80">
                    <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest block mb-2">Bagian D: Pengalaman Belajar (Skenario Aktivitas PM)</span>
                    {step3Output ? (
                      <div className="prose prose-invert"><ReactMarkdown>{step3Output}</ReactMarkdown></div>
                    ) : (
                      <span className="text-slate-500 italic block">Langkah 3 (Pengalaman Belajar) belum selesai dirumuskan.</span>
                    )}
                  </div>

                  {/* Step 4 Output */}
                  <div className="pt-6">
                    <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest block mb-2">Bagian E & Bonus: Evaluasi Asesmen, LKPD, & Bahan Bacaan</span>
                    {step4Output ? (
                      <div className="prose prose-invert"><ReactMarkdown>{step4Output}</ReactMarkdown></div>
                    ) : (
                      <span className="text-slate-500 italic block">Langkah 4 (Asesmen & Finalisasi) belum selesai dirumuskan.</span>
                    )}
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex items-center justify-end">
              <button
                onClick={() => setShowFullPreview(false)}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl active:scale-97 transition-all cursor-pointer"
              >
                Kembali ke Workspace
              </button>
            </div>

          </div>
        </div>
      )}

      {/* RESET CONFIRMATION MODAL */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-slate-150 rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-4">
            <h4 className="font-sans font-bold text-base text-slate-900 flex items-center gap-1.5">
              Konfirmasi Reset Workspace?
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Tindakan ini akan menghapus semua isian formulir serta draf output Gemini yang sudah terakumulasi dari Step 1 hingga Step 4 secara permanen. Apakah Anda yakin ingin memulai ulang dari awal?
            </p>
            <div className="flex justify-end gap-2.5 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={resetWorkspace}
                className="text-xs bg-rose-600 hover:bg-rose-500 text-white font-semibold px-4 py-2 rounded-xl transition-all shadow-sm active:scale-97 cursor-pointer"
              >
                Ya, Bersihkan Semua
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
