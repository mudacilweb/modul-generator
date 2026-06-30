import React from "react";
import { Step4Data } from "../types";
import { Award, PenTool, CheckSquare, BookOpen, AlertCircle } from "lucide-react";

interface FormStep4Props {
  data: Step4Data;
  onChange: (updates: Partial<Step4Data>) => void;
}

export default function FormStep4({ data, onChange }: FormStep4Props) {
  return (
    <div id="form-step-4" className="space-y-6">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
        <Award className="w-5 h-5 text-emerald-600" />
        <h3 className="font-sans font-semibold text-base text-slate-800">
          E. Evaluasi, Asesmen & Materi Bonus
        </h3>
      </div>

      <div className="space-y-5">
        {/* Jenis Penilaian */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            Jenis Penilaian (Asesmen)
          </label>
          <input
            type="text"
            id="jenisPenilaian"
            placeholder="Contoh: Formatif (Kuis Scratch), Sumatif (Projek Kelompok & Presentasi)."
            value={data.jenisPenilaian}
            onChange={(e) => onChange({ jenisPenilaian: e.target.value })}
            className="w-full text-sm bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 rounded-lg px-3.5 py-2.5 transition-all text-slate-800"
          />
          <p className="text-[11px] text-slate-400 mt-1">
            Mencakup penilaian proses (For Learning), reflektif (As Learning), maupun produk akhir (Of Learning).
          </p>
        </div>

        {/* Produk Evaluasi */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Rincian Kriteria Produk / Rubrik
          </label>
          <textarea
            id="produkEvaluasi"
            rows={2}
            placeholder="Contoh: Ketepatan logika program, kreativitas desain gim, kolaborasi tim saat debugging."
            value={data.produkEvaluasi}
            onChange={(e) => onChange({ produkEvaluasi: e.target.value })}
            className="w-full text-sm bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 rounded-lg px-3.5 py-2.5 transition-all text-slate-800 leading-relaxed resize-y"
          />
        </div>

        {/* Jenis LKPD */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <PenTool className="w-3.5 h-3.5 text-slate-400" />
            Jenis & Fokus Lembar Kerja Peserta Didik (LKPD)
          </label>
          <input
            type="text"
            id="jenisLkpd"
            placeholder="Contoh: LKPD Mandiri Koding Scratch (Langkah Menyusun Algoritma if-else)."
            value={data.jenisLkpd}
            onChange={(e) => onChange({ jenisLkpd: e.target.value })}
            className="w-full text-sm bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 rounded-lg px-3.5 py-2.5 transition-all text-slate-800"
          />
        </div>

        {/* Perlu Bahan Bacaan Toggle */}
        <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-100 flex items-start gap-3.5">
          <div className="mt-0.5 text-emerald-600 shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <label htmlFor="perluBahanBacaan" className="text-sm font-semibold text-slate-800 cursor-pointer">
                Sertakan Bahan Bacaan Lengkap Peserta Didik?
              </label>
              <button
                type="button"
                id="perluBahanBacaanToggle"
                onClick={() => onChange({ perluBahanBacaan: !data.perluBahanBacaan })}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  data.perluBahanBacaan ? "bg-emerald-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    data.perluBahanBacaan ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Jika diaktifkan, AI akan menuliskan satu bab materi ajar yang ramah siswa, komunikatif, dan memuat glosarium serta rangkuman lengkap (Cheat Sheet) sebagai BONUS. Jika dimatikan, hanya infografis teks cheat sheet cepat yang dirangkum.
            </p>
          </div>
        </div>

        <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-amber-900 leading-relaxed">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span>
            <strong>Informasi Konsistensi:</strong> Pengisian di Step 4 ini secara otomatis diikat dengan seluruh context running (Step 1, 2, dan 3) yang sudah dikonfirmasi, menghasilkan instrumen asesmen yang selaras dan siap uji coba di kelas.
          </span>
        </div>
      </div>
    </div>
  );
}
