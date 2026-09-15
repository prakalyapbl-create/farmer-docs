'use client';

import React from 'react';
import { Upload, FileSearch, Bot, CheckCircle2, PhoneCall } from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      num: '1',
      title: 'Upload or Call 434',
      desc: 'Farmers can upload loan PDFs/photos directly or call helpline 434 for proxy upload through their Area Admin.'
    },
    {
      num: '2',
      title: 'OCR & Structure Extraction',
      desc: 'Text is parsed across 12 document categories, identifying loan amount, subvention rates, due dates, and penalties.'
    },
    {
      num: '3',
      title: '17-Point Authenticity Screening',
      desc: 'Automated preliminary check evaluates formatting, bank stamps, reference numbers, and font alignment.'
    },
    {
      num: '4',
      title: 'Localized AI Explanation',
      desc: 'RAG engine synthesizes simple, farmer-friendly explanations strictly in the selected language (e.g. Tamil, Assamese, Hindi).'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <h1 className="text-3xl font-black text-gray-900">How Farmer Docx Works 🌾</h1>
        <p className="text-sm text-gray-600">Step-by-step workflow from document upload to source-grounded AI explanation.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          {steps.map((s) => (
            <div key={s.num} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-extrabold flex items-center justify-center text-sm">
                {s.num}
              </div>
              <h3 className="font-extrabold text-gray-900 text-base">{s.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
