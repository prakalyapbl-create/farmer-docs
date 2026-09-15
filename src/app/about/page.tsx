'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { FileText, ShieldCheck, PhoneCall, Globe } from 'lucide-react';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <h1 className="text-3xl font-black text-gray-900">About Farmer Docx 🌾</h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          Farmer Docx is a production-grade agri-tech platform designed for the Smart India Hackathon AGR-09 problem statement: 
          <em>"Farmer Loan Document Explainer with Rural Accessibility through Area-Admin Proxy Access."</em>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs">
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
            <div className="font-bold text-emerald-950 text-sm">Multilingual Experience</div>
            <p className="text-emerald-800">
              Supports 13 Indian languages with native scripts, persistent settings, and language-isolated AI explanations.
            </p>
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
            <div className="font-bold text-amber-950 text-sm">Rural Call 434 Helpline</div>
            <p className="text-amber-800">
              Proxy access for non-smartphone farmers via Village $\rightarrow$ Taluk $\rightarrow$ Area Admin mapping.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
