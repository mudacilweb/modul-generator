import React, { useState, useEffect } from "react";
import { Copy, Check, Sparkles, Loader2, Download, Eye, FileJson, AlertCircle, Edit, FileText, ChevronRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { exportToFile, markdownToBasicHtml } from "../utils";

interface OutputConsoleProps {
  stepNumber: number;
  promptText: string;
  savedOutput: string;
  onOutputChange: (newOutput: string) => void;
  previousContexts: { step: number; title: string; content: string }[];
}

export default function OutputConsole({
  stepNumber,
  promptText,
  savedOutput,
  onOutputChange,
  previousContexts,
}: OutputConsoleProps) {
  const [activeTab, setActiveTab] = useState<"prompt" | "output">("prompt");
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState("gemini-3.5-flash");
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(savedOutput);
  
  // Interactive loader state
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingMessages = [
    "Menghubungkan ke Gemini AI...",
    "Menganalisis identitas dan karakteristik kelas...",
    "Menggabungkan prinsip Pembelajaran Mendalam (4M)...",
    "Menyelaraskan pendekatan TPACK dan Taksonomi pilihan...",
    "Merumuskan aktivitas berbasis Koding & Kecerdasan Artifisial (KKA)...",
    "Menyusun kriteria asesmen dan instrumen otentik...",
    "Menghasilkan dokumen Modul Ajar lengkap..."
  ];

  useEffect(() => {
    setEditText(savedOutput);
    // Auto shift tab to output if saved output exists
    if (savedOutput) {
      setActiveTab("output");
    } else {
      setActiveTab("prompt");
    }
  }, [savedOutput, stepNumber]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGenerating) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Gagal menyalin text: ", err);
    }
  };

  const handleCopyOutput = async () => {
    try {
      await navigator.clipboard.writeText(savedOutput);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Gagal menyalin text: ", err);
    }
  };

  const handleGenerateWithGemini = async () => {
    setIsGenerating(true);
    setGenerationError(null);
    try {
      const response = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptText,
          modelName: selectedModel,
        }),
      });

      const data = await response.json();
      if (response.ok && data.text) {
        onOutputChange(data.text);
        setEditText(data.text);
        setActiveTab("output");
      } else {
        throw new Error(data.error || "Gagal menghasilkan modul. Coba periksa koneksi Anda.");
      }
    } catch (error: any) {
      console.error(error);
      setGenerationError(error.message || "Terjadi kesalahan sistem saat menghubungi Gemini.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveEdit = () => {
    onOutputChange(editText);
    setIsEditing(false);
  };

  const handleExportText = () => {
    exportToFile(savedOutput, `Modul_Ajar_Tahap_${stepNumber}.txt`, "text/plain;charset=utf-8");
  };

  const handleExportMd = () => {
    exportToFile(savedOutput, `Modul_Ajar_Tahap_${stepNumber}.md`, "text/markdown;charset=utf-8");
  };

  const handleExportHtml = () => {
    const htmlContent = markdownToBasicHtml(savedOutput, `Modul Ajar Sekolah Model - Tahap ${stepNumber}`);
    exportToFile(htmlContent, `Modul_Ajar_Tahap_${stepNumber}.html`, "text/html;charset=utf-8");
  };

  return (
    <div id={`output-console-step-${stepNumber}`} className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden text-slate-100 flex flex-col h-full">
      {/* Console Header */}
      <div className="bg-slate-950 px-5 py-4 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-300">
            Prompt Builder & Context Runner
          </h4>
        </div>
        
        {/* Model Select & Trigger Button */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <select
            id="gemini-model-selector"
            value={selectedModel}
            disabled={isGenerating}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="text-xs bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-lg px-2.5 py-1.5 text-slate-200 outline-none cursor-pointer"
          >
            <option value="gemini-3.5-flash">Gemini 3.5 Flash (Gratis & Cepat)</option>
            <option value="gemini-3.1-pro-preview">Gemini 3.1 Pro (Mendalam / Paid)</option>
          </select>

          <button
            id="btn-generate-gemini"
            onClick={handleGenerateWithGemini}
            disabled={isGenerating}
            className="text-xs bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-semibold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shadow-sm active:scale-97 cursor-pointer shrink-0"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Memproses...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tanyakan ke Gemini</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-slate-950/40 px-5 flex border-b border-slate-800/80 shrink-0">
        <button
          onClick={() => setActiveTab("prompt")}
          className={`px-4 py-3 font-sans text-xs font-semibold tracking-wide transition-all border-b-2 cursor-pointer ${
            activeTab === "prompt"
              ? "border-emerald-500 text-emerald-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          1. Hasil Prompt Mandiri
        </button>
        <button
          onClick={() => setActiveTab("output")}
          className={`px-4 py-3 font-sans text-xs font-semibold tracking-wide transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
            activeTab === "output"
              ? "border-emerald-500 text-emerald-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          2. Laporan & Konteks Terakumulasi
          {savedOutput && (
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          )}
        </button>
      </div>

      {/* Main Console Content */}
      <div className="flex-1 p-5 overflow-y-auto max-h-[580px] min-h-[350px]">
        {/* Loading overlay */}
        {isGenerating && (
          <div className="absolute inset-0 bg-slate-950/90 z-20 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
            <div className="p-4 bg-emerald-950/40 border border-emerald-900/40 rounded-full mb-4 animate-bounce">
              <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
            </div>
            <h5 className="text-sm font-semibold text-slate-100">{loadingMessages[loadingStep]}</h5>
            <p className="text-xs text-slate-400 mt-1.5 max-w-xs leading-relaxed">
              Gemini sedang meninjau dokumen PM & KKA untuk merumuskan modul ajar yang ideal...
            </p>
          </div>
        )}

        {/* Error notification */}
        {generationError && (
          <div className="mb-4 bg-rose-950/30 border border-rose-900/50 rounded-xl p-4 flex items-start gap-3 text-xs text-rose-200">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold">Gagal Menghubungkan ke Gemini:</p>
              <p className="leading-relaxed">{generationError}</p>
              <p className="text-rose-300 italic mt-1 font-mono">
                Solusi: Anda bisa menyalin prompt di tab "Hasil Prompt Mandiri" lalu menempelkannya ke browser Gemini, kemudian salin hasilnya dan paste ke tab "Laporan" di bawah.
              </p>
            </div>
          </div>
        )}

        {/* TAB 1: PROMPT VIEWER */}
        {activeTab === "prompt" && (
          <div className="space-y-4 h-full flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                Modul Ajar Prompt - Tahap {stepNumber}
              </span>
              <button
                onClick={handleCopyPrompt}
                className="text-xs bg-slate-800 hover:bg-slate-700 hover:text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all text-slate-300 active:scale-97 cursor-pointer"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Prompt</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex-1 bg-slate-950/60 rounded-xl border border-slate-800/80 p-4 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap text-slate-300 max-h-[420px] overflow-y-auto">
              {promptText}
            </div>

            <div className="bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/60 text-xs text-slate-400 leading-relaxed">
              <span className="text-emerald-400 font-semibold">💡 Tips Kreatif:</span> Salin prompt terstruktur di atas ke tab Gemini eksternal Anda, atau langsung klik tombol <strong className="text-slate-200">"Tanyakan ke Gemini"</strong> di kanan atas untuk memproses instan di workspace ini.
            </div>
          </div>
        )}

        {/* TAB 2: OUTPUT & CONTEXT RUNNER */}
        {activeTab === "output" && (
          <div className="space-y-4 h-full flex flex-col">
            {/* Context Running Info Bar */}
            {previousContexts.length > 0 && (
              <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/60">
                <span className="text-[9px] font-mono text-emerald-500 font-bold uppercase tracking-widest block mb-2">
                  🔗 Konteks Berjalan Aktif (Mengingat Tahap Sebelumnya)
                </span>
                <div className="flex flex-wrap gap-2 items-center text-[10px] text-slate-400">
                  {previousContexts.map((ctx, i) => (
                    <div key={ctx.step} className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2 py-1 rounded-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{ctx.title}</span>
                      {i < previousContexts.length - 1 && <ChevronRight className="w-3 h-3 text-slate-600" />}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Editing state */}
            {isEditing ? (
              <div className="space-y-3 flex-1 flex flex-col">
                <div className="flex items-center justify-between shrink-0">
                  <span className="text-xs font-semibold text-slate-300">Edit Konten / Tempel Hasil Gemini Luar</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-3.5 py-1.5 rounded-lg cursor-pointer"
                    >
                      Simpan Konten
                    </button>
                  </div>
                </div>
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  placeholder="Paste hasil Modul Ajar dari Gemini di sini jika Anda menggunakan tab eksternal..."
                  className="flex-1 min-h-[300px] w-full text-xs font-mono bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-300 focus:outline-none focus:border-emerald-500 leading-relaxed resize-y"
                />
              </div>
            ) : (
              /* Display state */
              <div className="space-y-4 flex-1 flex flex-col">
                {savedOutput ? (
                  <>
                    {/* Exporters and copy bars */}
                    <div className="flex flex-wrap items-center justify-between gap-3 shrink-0">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsEditing(true)}
                          className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit / Paste Manual</span>
                        </button>
                        <button
                          onClick={handleCopyOutput}
                          className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400 font-medium">Tersalin!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Salin Hasil</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Export Dropdown buttons */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-500 font-mono uppercase mr-1">Ekspor:</span>
                        <button
                          onClick={handleExportMd}
                          title="Download as Markdown"
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 rounded-md transition-colors cursor-pointer"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleExportHtml}
                          title="Download as HTML"
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 rounded-md transition-colors cursor-pointer"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleExportText}
                          title="Download as TXT"
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 rounded-md transition-colors cursor-pointer"
                        >
                          <FileJson className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Rendered markdown */}
                    <div id={`markdown-rendered-step-${stepNumber}`} className="flex-1 bg-slate-950/60 rounded-xl border border-slate-800/80 p-5 overflow-y-auto max-h-[380px] text-slate-200 text-xs leading-relaxed markdown-body prose prose-invert prose-emerald">
                      <ReactMarkdown>{savedOutput}</ReactMarkdown>
                    </div>
                  </>
                ) : (
                  /* Empty state guide */
                  <div className="flex-1 flex flex-col items-center justify-center py-10 px-4 text-center border-2 border-dashed border-slate-800 rounded-xl bg-slate-950/20">
                    <Sparkles className="w-10 h-10 text-slate-600 mb-3" />
                    <h5 className="font-sans font-semibold text-sm text-slate-300">Laporan Masih Kosong</h5>
                    <p className="text-xs text-slate-500 max-w-sm mt-1.5 leading-relaxed">
                      Belum ada output tersimpan untuk Tahap ini. Klik <strong className="text-emerald-400 font-medium">"Tanyakan ke Gemini"</strong> di kanan atas untuk memproses otomatis, atau salin prompt dan tempelkan hasil pengerjaan mandiri Anda menggunakan tombol di bawah ini.
                    </p>
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setEditText("");
                      }}
                      className="mt-4 text-xs bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 px-4 py-2 rounded-lg font-semibold flex items-center gap-1.5 active:scale-97 cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Masukkan Hasil Manual (Paste)</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
