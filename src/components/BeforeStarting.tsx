import React, { useState } from "react";
import { CheckSquare, Square, Info, Sparkles, BookOpen } from "lucide-react";

export default function BeforeStarting() {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    pm: false,
    kka: false,
    cp: false,
    mapel: false,
    sekolahModel: false,
    kalender: false,
  });

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const checklist = [
    { id: "pm", label: "Panduan Pembelajaran Mendalam (PM)", desc: "Menitikberatkan pada kedalaman pemahaman (4M: Memuliakan, Berkesadaran, Bermakna, Menggembirakan) dibandingkan keluasan materi hafalan." },
    { id: "kka", label: "Panduan Koding dan Kecerdasan Artifisial (KKA)", desc: "Membawa elemen logika komputasional, sintaks dasar, dan etika kecerdasan buatan ke dalam kelas." },
    { id: "cp", label: "Capaian Pembelajaran (CP) Terbaru", desc: "Acuan kompetensi resmi Kemendikbudristek sesuai mata pelajaran dan fase yang diampu." },
    { id: "mapel", label: "Panduan Pembelajaran Mata Pelajaran Masing-masing", desc: "Strategi spesifik pengajaran materi dasar bidang studi terkait secara optimal." },
    { id: "sekolahModel", label: "Panduan Sekolah Model / Program Unggulan", desc: "Opsional. Aturan khusus atau kekhasan kurikulum lokal di ekosistem sekolah model." },
    { id: "kalender", label: "Kalender Akademik dan ATP (Alur Tujuan Pembelajaran)", desc: "Pemetaan alokasi waktu nyata, jadwal pekan efektif, serta struktur kontinuitas topik." },
  ];

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const isFullyPrepared = checkedCount === checklist.length;

  return (
    <div id="before-starting-container" className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden mb-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-5 border-b border-emerald-100/60 flex items-start gap-4">
        <div className="p-2.5 bg-emerald-600 rounded-xl text-white shadow-sm shrink-0">
          <BookOpen className="w-5 h-5" id="guide-icon" />
        </div>
        <div>
          <h2 className="font-sans font-semibold text-lg text-slate-800 flex items-center gap-2">
            Sebelum Memulai: Panduan Persiapan Guru
            <span className="text-xs bg-emerald-100 text-emerald-800 font-medium px-2.5 py-0.5 rounded-full">
              Penting
            </span>
          </h2>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Sebelum membangun prompt atau menghasilkan Modul Ajar, pastikan Anda telah menyiapkan dokumen acuan di bawah ini agar modul ajar yang dirumuskan AI akurat, presisi, dan relevan dengan regulasi sekolah Anda.
          </p>
        </div>
      </div>

      {/* Checklist Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {checklist.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              id={`checklist-item-${item.id}`}
              className={`flex items-start gap-3.5 p-4 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                checkedItems[item.id]
                  ? "bg-emerald-50/40 border-emerald-200/80 shadow-xs"
                  : "bg-slate-50/50 border-slate-100 hover:border-slate-200"
              }`}
            >
              <div className="mt-0.5 shrink-0 transition-transform active:scale-95 text-emerald-600">
                {checkedItems[item.id] ? (
                  <CheckSquare className="w-5 h-5 fill-emerald-100" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <div>
                <h3 className={`font-sans text-sm font-medium transition-colors ${
                  checkedItems[item.id] ? "text-emerald-900" : "text-slate-800"
                }`}>
                  {item.label}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Status Indicator */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2 font-medium">
            <Info className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Kesiapan Dokumen: <strong className="text-slate-700">{checkedCount} dari {checklist.length}</strong> disiapkan.</span>
          </div>
          
          {isFullyPrepared ? (
            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-100/60 px-3 py-1 rounded-lg">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dokumen Lengkap! Anda siap menyusun Modul Ajar kelas dunia.</span>
            </div>
          ) : (
            <span className="text-slate-400 italic">Centang semua item untuk memastikan kesiapan terbaik.</span>
          )}
        </div>
      </div>
    </div>
  );
}
