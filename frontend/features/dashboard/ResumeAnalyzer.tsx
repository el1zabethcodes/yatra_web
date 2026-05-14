"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, AlertCircle } from "lucide-react";

export default function ResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  return (
    <div className="bg-background border border-surface rounded-[32px] p-8 shadow-sm space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-primary">Аналізатор резюме</h2>
        <p className="text-sm text-primary/60 font-medium">
          Завантаження PDF вже підготовлене, але фейкову оцінку прибрано до підключення реального аналізатора.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <label className="group relative flex flex-col items-center justify-center border-2 border-dashed border-surface rounded-[32px] p-12 cursor-pointer hover:bg-surface/20 hover:border-secondary/30 transition-all">
          <input type="file" className="hidden" accept=".pdf" onChange={handleFile} />
          <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center text-secondary mb-4 group-hover:scale-110 transition-transform">
            {file ? <FileText size={24} /> : <Upload size={24} />}
          </div>
          <p className="text-sm font-black text-primary">
            {file ? file.name : "Натисніть або перетягніть файл"}
          </p>
          <p className="text-[10px] text-primary/60 font-bold uppercase tracking-widest mt-2">
            Тільки PDF · Макс 5MB
          </p>
        </label>

        <button
          type="button"
          disabled
          className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 bg-surface text-primary/50 cursor-not-allowed"
        >
          Аналіз резюме скоро буде доступний
        </button>

        <div className="flex items-start gap-3 p-4 rounded-2xl border border-accent/20 bg-accent/5 text-accent">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <p className="text-xs font-bold uppercase tracking-widest">
            Ми не показуємо демо-результати як справжній аналіз.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

