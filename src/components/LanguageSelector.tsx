'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Globe, Check } from 'lucide-react';

export default function LanguageSelector({ className = '' }: { className?: string }) {
  const { language, setLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);

  const currentLangObj = languages.find(l => l.code === language) || languages[0];

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-900 hover:bg-emerald-100 transition-colors text-sm font-medium shadow-sm"
        aria-label="Select Preferred Language"
      >
        <Globe className="w-4 h-4 text-emerald-700" />
        <span className="font-semibold">{currentLangObj.native}</span>
        <span className="text-xs text-emerald-700">({currentLangObj.english})</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white shadow-xl border border-gray-200 z-50 py-2 max-h-96 overflow-y-auto">
            <div className="px-3 py-1.5 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
              Select Language / ভাষা বাছক
            </div>
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setLanguage(l.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-emerald-50 transition-colors ${
                  language === l.code ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-gray-700'
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-base">{l.native}</span>
                  <span className="text-xs text-gray-500">{l.english}</span>
                </div>
                {language === l.code && <Check className="w-4 h-4 text-emerald-600" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
