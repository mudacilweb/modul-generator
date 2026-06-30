import React from "react";
import { Step1Data } from "../types";
import { FASE_OPTIONS, SEMESTER_OPTIONS } from "../constants";
import { BookOpen, HelpCircle, GraduationCap } from "lucide-react";

interface FormStep1Props {
  data: Step1Data;
  onChange: (updates: Partial<Step1Data>) => void;
}

export default function FormStep1({ data, onChange }: FormStep1Props) {
  return (
    <div id="form-step-1" className="space-y-6">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
        <GraduationCap className="w-5 h-5 text-emerald-600" />
        <h3 className="font-sans font-semibold text-base text-slate-800">
          A. Identitas Guru & Pembelajaran
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Nama Guru
          </label>
          <input
            type="text"
            id="namaGuru"
            placeholder="Contoh: Budi Santoso, S.Pd."
            value={data.namaGuru}
            onChange={(e) => onChange({ namaGuru: e.target.value })}
            className="w-full text-sm bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 rounded-lg px-3.5 py-2.5 transition-all text-slate-800"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Mata Pelajaran
          </label>
          <input
            type="text"
            id="mataPelajaran"
            placeholder="Contoh: Koding & Kecerdasan Artifisial"
            value={data.mataPelajaran}
            onChange={(e) => onChange({ mataPelajaran: e.target.value })}
            className="w-full text-sm bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 rounded-lg px-3.5 py-2.5 transition-all text-slate-800"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Fase
            </label>
            <select
              id="fase"
              value={data.fase}
              onChange={(e) => onChange({ fase: e.target.value })}
              className="w-full text-sm bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 rounded-lg px-3.5 py-2.5 transition-all text-slate-800"
            >
              {FASE_OPTIONS.map((f) => (
                <option key={f} value={f}>
                  Fase {f}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Kelas
            </label>
            <input
              type="text"
              id="kelas"
              placeholder="Contoh: VII (Tujuh)"
              value={data.kelas}
              onChange={(e) => onChange({ kelas: e.target.value })}
              className="w-full text-sm bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 rounded-lg px-3.5 py-2.5 transition-all text-slate-800"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Semester
          </label>
          <select
            id="semester"
            value={data.semester}
            onChange={(e) => onChange({ semester: e.target.value })}
            className="w-full text-sm bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 rounded-lg px-3.5 py-2.5 transition-all text-slate-800"
          >
            {SEMESTER_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                Semester {s.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Topik Pembelajaran
          </label>
          <input
            type="text"
            id="topik"
            placeholder="Contoh: Berpikir Komputasional"
            value={data.topik}
            onChange={(e) => onChange({ topik: e.target.value })}
            className="w-full text-sm bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 rounded-lg px-3.5 py-2.5 transition-all text-slate-800 animate-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Subtopik
          </label>
          <input
            type="text"
            id="subtopik"
            placeholder="Contoh: Dekomposisi dan Pengenalan Pola"
            value={data.subtopik}
            onChange={(e) => onChange({ subtopik: e.target.value })}
            className="w-full text-sm bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 rounded-lg px-3.5 py-2.5 transition-all text-slate-800"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Alokasi Waktu
          </label>
          <input
            type="text"
            id="alokasiWaktu"
            placeholder="Contoh: 2 JP (2 x 40 Menit)"
            value={data.alokasiWaktu}
            onChange={(e) => onChange({ alokasiWaktu: e.target.value })}
            className="w-full text-sm bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 rounded-lg px-3.5 py-2.5 transition-all text-slate-800"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 pt-4 pb-2 border-b border-slate-100">
        <BookOpen className="w-5 h-5 text-emerald-600" />
        <h3 className="font-sans font-semibold text-base text-slate-800">
          B. Karakteristik & Dokumen Acuan
        </h3>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            Karakteristik Sekolah Model
            <span className="text-slate-400 font-normal normal-case">(Sarana, Tantangan, Konteks Lokal)</span>
          </label>
          <textarea
            id="karakteristikSekolah"
            rows={3}
            placeholder="Contoh: Lab komputer memiliki 20 PC, rasio siswa 1:1, internet stabil, memiliki visi digitalisasi kelas."
            value={data.karakteristikSekolah}
            onChange={(e) => onChange({ karakteristikSekolah: e.target.value })}
            className="w-full text-sm bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 rounded-lg px-3.5 py-2.5 transition-all text-slate-800 leading-relaxed resize-y"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            Karakteristik Peserta Didik
            <span className="text-slate-400 font-normal normal-case">(Gaya belajar, keberagaman, kompetensi dasar)</span>
          </label>
          <textarea
            id="karakteristikPesertaDidik"
            rows={3}
            placeholder="Contoh: Siswa aktif, gemar visual game, pemahaman koding heterogen (ada yang cepat paham, ada yang perlu panduan sintaks bertahap)."
            value={data.karakteristikPesertaDidik}
            onChange={(e) => onChange({ karakteristikPesertaDidik: e.target.value })}
            className="w-full text-sm bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 rounded-lg px-3.5 py-2.5 transition-all text-slate-800 leading-relaxed resize-y"
          />
        </div>

        {/* CP Option and Area */}
        <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Capaian Pembelajaran (CP)
            </span>
            <div className="flex items-center gap-4 text-xs font-medium">
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                <input
                  type="radio"
                  name="cpOption"
                  id="cp-otomatis-radio"
                  checked={data.cpOption === "otomatis"}
                  onChange={() => onChange({ cpOption: "otomatis" })}
                  className="accent-emerald-600"
                />
                Cari CP Otomatis oleh AI
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                <input
                  type="radio"
                  name="cpOption"
                  id="cp-manual-radio"
                  checked={data.cpOption === "manual"}
                  onChange={() => onChange({ cpOption: "manual" })}
                  className="accent-emerald-600"
                />
                Masukkan CP Sendiri
              </label>
            </div>
          </div>

          {data.cpOption === "manual" ? (
            <textarea
              id="cpInput"
              rows={4}
              placeholder="Ketikkan teks resmi Capaian Pembelajaran (CP) mata pelajaran di sini agar AI tidak berimajinasi..."
              value={data.cpInput}
              onChange={(e) => onChange({ cpInput: e.target.value })}
              className="w-full text-sm bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 rounded-lg px-3.5 py-2.5 transition-all text-slate-800 leading-relaxed resize-y"
            />
          ) : (
            <div className="text-xs text-slate-600 bg-emerald-50 border border-emerald-100/60 p-3 rounded-lg leading-relaxed flex items-start gap-2.5">
              <span className="text-emerald-700 shrink-0">✨</span>
              <span>
                <strong>Opsi Pencarian Otomatis Aktif:</strong> AI akan mencarikan Capaian Pembelajaran (CP) resmi terbaru yang relevan dari Kemendikbudristek sesuai topik <strong>{data.topik || "[Tulis Topik di atas]"}</strong> dan mata pelajaran <strong>{data.mataPelajaran}</strong>.
              </span>
            </div>
          )}
        </div>

        {/* Taxonomy selection */}
        <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Acuan Taksonomi Tujuan Pembelajaran
            </span>
          </div>
          <div className="flex items-center gap-5 text-xs font-semibold">
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
              <input
                type="radio"
                name="taksonomi"
                id="taksonomi-bloom"
                checked={data.taksonomi === "Bloom"}
                onChange={() => onChange({ taksonomi: "Bloom" })}
                className="accent-emerald-600"
              />
              Bloom (Revisi)
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
              <input
                type="radio"
                name="taksonomi"
                id="taksonomi-solo"
                checked={data.taksonomi === "SOLO"}
                onChange={() => onChange({ taksonomi: "SOLO" })}
                className="accent-emerald-600"
              />
              SOLO (Structure of Observed Learning Outcomes)
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
