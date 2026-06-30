import React from "react";
import { Step2Data } from "../types";
import { MODEL_PEMBELAJARAN_OPTIONS } from "../constants";
import { Sliders, Link2, Monitor, Landmark, Sparkles } from "lucide-react";

interface FormStep2Props {
  data: Step2Data;
  onChange: (updates: Partial<Step2Data>) => void;
}

export default function FormStep2({ data, onChange }: FormStep2Props) {
  return (
    <div id="form-step-2" className="space-y-6">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
        <Sliders className="w-5 h-5 text-emerald-600" />
        <h3 className="font-sans font-semibold text-base text-slate-800">
          C. Konfigurasi Desain Pembelajaran (PM & KKA)
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {/* Model Pembelajaran dropdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              Model Pembelajaran Utama
            </label>
            <select
              id="modelPembelajaran"
              value={data.modelPembelajaran}
              onChange={(e) => onChange({ modelPembelajaran: e.target.value })}
              className="w-full text-sm bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 rounded-lg px-3.5 py-2.5 transition-all text-slate-800"
            >
              {MODEL_PEMBELAJARAN_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {data.modelPembelajaran === "lainnya" && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Model Pembelajaran Lainnya (Tulis Sendiri)
              </label>
              <input
                type="text"
                id="modelLainnya"
                placeholder="Contoh: Peer Instruction, Gamification, dll."
                value={data.modelLainnya}
                onChange={(e) => onChange({ modelLainnya: e.target.value })}
                className="w-full text-sm bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 rounded-lg px-3.5 py-2.5 transition-all text-slate-800"
              />
            </div>
          )}
        </div>

        {/* Kemitraan */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Link2 className="w-3.5 h-3.5 text-slate-400" />
            Kemitraan Pembelajaran (Partnerships)
          </label>
          <input
            type="text"
            id="kemitraan"
            placeholder="Contoh: Komunitas robotik lokal, Industri Kreatif, Orang Tua murid sebagai observer."
            value={data.kemitraan}
            onChange={(e) => onChange({ kemitraan: e.target.value })}
            className="w-full text-sm bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 rounded-lg px-3.5 py-2.5 transition-all text-slate-800"
          />
          <p className="text-[11px] text-slate-400 mt-1">
            Keterlibatan pihak luar/eksternal untuk merealisasikan pembelajaran yang otentik dan bermakna.
          </p>
        </div>

        {/* Lingkungan Belajar */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Landmark className="w-3.5 h-3.5 text-slate-400" />
            Lingkungan Belajar Fisik & Psikososial
          </label>
          <textarea
            id="lingkunganBelajar"
            rows={2}
            placeholder="Contoh: Lab Komputer terintegrasi ruang kolaborasi, sudut baca digital, suasana kondusif berpusat pada siswa."
            value={data.lingkunganBelajar}
            onChange={(e) => onChange({ lingkunganBelajar: e.target.value })}
            className="w-full text-sm bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 rounded-lg px-3.5 py-2.5 transition-all text-slate-800 leading-relaxed resize-y"
          />
        </div>

        {/* Media Digital */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Monitor className="w-3.5 h-3.5 text-slate-400" />
            Pemanfaatan Media & Perangkat Digital
          </label>
          <input
            type="text"
            id="mediaDigital"
            placeholder="Contoh: Scratch, simulator sirkuit online, Chromebook, Google Classroom."
            value={data.mediaDigital}
            onChange={(e) => onChange({ mediaDigital: e.target.value })}
            className="w-full text-sm bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 rounded-lg px-3.5 py-2.5 transition-all text-slate-800"
          />
        </div>

        {/* AI yang digunakan */}
        <div className="bg-emerald-50/20 border border-emerald-100 p-4 rounded-xl space-y-2">
          <label className="block text-xs font-semibold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Teknologi AI yang Digunakan Siswa / Guru
          </label>
          <input
            type="text"
            id="aiYangDigunakan"
            placeholder="Contoh: Gemini AI (co-pilot koding untuk debugging), ChatGPT, Canva AI."
            value={data.aiYangDigunakan}
            onChange={(e) => onChange({ aiYangDigunakan: e.target.value })}
            className="w-full text-sm bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 rounded-lg px-3.5 py-2.5 transition-all text-slate-800"
          />
          <p className="text-[11px] text-emerald-800/80 leading-normal">
            Bagaimana elemen AI diintegrasikan sebagai partner belajar (asisten coding, generator ide, pembuat visual) secara etis.
          </p>
        </div>
      </div>
    </div>
  );
}
