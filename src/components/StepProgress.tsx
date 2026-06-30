import React from "react";
import { Check, ClipboardList, PenTool, Milestone, Award } from "lucide-react";

interface StepProgressProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export default function StepProgress({ currentStep, onStepClick }: StepProgressProps) {
  const steps = [
    {
      number: 1,
      title: "Analisis Pembelajaran",
      desc: "Identitas, CP, dan Karakteristik",
      icon: ClipboardList,
    },
    {
      number: 2,
      title: "Desain Pembelajaran",
      desc: "Model, TPACK, & AI",
      icon: PenTool,
    },
    {
      number: 3,
      title: "Pengalaman Belajar",
      desc: "Alur PM, Aktivitas & Projek",
      icon: Milestone,
    },
    {
      number: 4,
      title: "Asesmen & LKPD",
      desc: "Evaluasi, Jurnal & Bonus",
      icon: Award,
    },
  ];

  return (
    <div id="step-progress-wrapper" className="mb-8">
      {/* Progress Line & Nodes */}
      <div className="relative flex flex-col md:flex-row justify-between items-stretch gap-4 md:gap-2">
        {/* Horizontal Connector Line for Desktop */}
        <div className="hidden md:block absolute top-[26px] left-[4%] right-[4%] h-[2px] bg-slate-100 -z-10">
          <div
            className="h-full bg-emerald-600 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          />
        </div>

        {steps.map((step) => {
          const IconComponent = step.icon;
          const isCompleted = step.number < currentStep;
          const isActive = step.number === currentStep;

          return (
            <div
              key={step.number}
              onClick={() => onStepClick(step.number)}
              id={`step-progress-node-${step.number}`}
              className={`flex-1 flex md:flex-col items-center gap-3.5 md:gap-2.5 p-3.5 md:p-3 rounded-xl border transition-all duration-300 cursor-pointer text-left md:text-center ${
                isActive
                  ? "bg-white border-emerald-600 shadow-sm ring-1 ring-emerald-600/10"
                  : isCompleted
                  ? "bg-emerald-50/20 border-emerald-100 hover:border-emerald-200"
                  : "bg-slate-50/50 border-slate-100 hover:border-slate-200"
              }`}
            >
              {/* Step Circle with Icon */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2 transition-all duration-300 ${
                  isActive
                    ? "bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-600/10"
                    : isCompleted
                    ? "bg-emerald-100 border-emerald-200 text-emerald-700"
                    : "bg-white border-slate-200 text-slate-400"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5.5 h-5.5 stroke-[2.5]" />
                ) : (
                  <IconComponent className="w-5 h-5" />
                )}
              </div>

              {/* Step Text Info */}
              <div className="flex-1 md:block">
                <span className="font-mono text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                  Tahap 0{step.number}
                </span>
                <h3
                  className={`font-sans text-xs md:text-sm font-semibold transition-colors leading-tight ${
                    isActive ? "text-emerald-950" : "text-slate-700"
                  }`}
                >
                  {step.title}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
