import React from "react";
import { Step3Data } from "../types";
import { Milestone, CalendarDays, Rocket, Award } from "lucide-react";

interface FormStep3Props {
  data: Step3Data;
  onChange: (updates: Partial<Step3Data>) => void;
}

export default function FormStep3({ data, onChange }: FormStep3Props) {
  return (
    <div id="form-step-3" className="space-y-6">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
        <Milestone className="w-5 h-5 text-emerald-600" />
        <h3 className="font-sans font-semibold text-base text-slate-800">
          D. Pengalaman Belajar & Skenario Kelas
        </h3>
      </div>

      <div className="space-y-5">
        {/* Jumlah Pertemuan */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <CalendarDays className="w-3.5 h-3.5 text-slate-400" />
            Jumlah Pertemuan Pembelajaran
          </label>
          <input
            type="text"
            id="jumlahPertemuan"
            placeholder="Contoh: 2 Pertemuan (4 JP) atau 1 Pertemuan (2 JP)"
            value={data.jumlahPertemuan}
            onChange={(e) => onChange({ jumlahPertemuan: e.target.value })}
            className="w-full text-sm bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 rounded-lg px-3.5 py-2.5 transition-all text-slate-800"
          />
          <p className="text-[11px] text-slate-400 mt-1">
            Menentukan pembagian babak atau sirkuit pertemuan di mana alur <strong>Memahami, Mengaplikasi, dan Merefleksi</strong> dijalankan.
          </p>
        </div>

        {/* Jenis Projek */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Rocket className="w-3.5 h-3.5 text-slate-400" />
            Jenis Projek Pembelajaran Mendalam
          </label>
          <input
            type="text"
            id="jenisProjek"
            placeholder="Contoh: Pembuatan Game Edukasi Scratch, Pembuatan Chatbot Sederhana, Pengenalan Logika if-else, dll."
            value={data.jenisProjek}
            onChange={(e) => onChange({ jenisProjek: e.target.value })}
            className="w-full text-sm bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 rounded-lg px-3.5 py-2.5 transition-all text-slate-800"
          />
          <p className="text-[11px] text-slate-400 mt-1">
            Kegiatan otentik yang melatih kerja sama tim, bernalar kritis, dan problem-solving langsung di kelas.
          </p>
        </div>

        {/* Produk akhir */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-slate-400" />
            Produk Konkret yang Dihasilkan Peserta Didik
          </label>
          <textarea
            id="produkYangDihasilkan"
            rows={3}
            placeholder="Contoh: File .sb3 game Scratch, diagram alur berpikir kelompok, tautan portofolio, dsb."
            value={data.produkYangDihasilkan}
            onChange={(e) => onChange({ produkYangDihasilkan: e.target.value })}
            className="w-full text-sm bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 rounded-lg px-3.5 py-2.5 transition-all text-slate-800 leading-relaxed resize-y"
          />
          <p className="text-[11px] text-slate-400 mt-1">
            Karya nyata siswa yang menjadi bukti penguasaan materi dan kompetensi fungsional mereka.
          </p>
        </div>
      </div>
    </div>
  );
}
