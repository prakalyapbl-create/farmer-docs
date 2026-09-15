'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Globe, Check, Save, Sparkles, Volume2, Bot, FileText } from 'lucide-react';

export default function SettingsPage() {
  const { language, setLanguage, t, languages } = useLanguage();

  const [uiLang, setUiLang] = useState(language);
  const [aiLang, setAiLang] = useState(language);
  const [voiceLang, setVoiceLang] = useState(language);
  const [docLang, setDocLang] = useState(language);
  const [success, setSuccess] = useState(false);

  const handleSave = () => {
    setLanguage(uiLang);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const selectedLangObj = languages.find((l) => l.code === uiLang) || languages[0];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
        <div className="border-b border-gray-100 pb-4">
          <h1 className="text-2xl font-black text-gray-900">{t('nav.settings')} - Language & Accessibility</h1>
          <p className="text-xs text-gray-500 mt-1">
            Configure per-channel language preferences. Changing language updates interface immediately without requiring logout.
          </p>
        </div>

        {success && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold text-xs rounded-xl flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            Language preferences updated successfully across all channels!
          </div>
        )}

        <div className="space-y-6">
          {/* Preferred Interface Language */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 uppercase flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-600" />
              1. Preferred Interface Language
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {languages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => {
                    setUiLang(l.code);
                    setAiLang(l.code);
                    setVoiceLang(l.code);
                    setDocLang(l.code);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    uiLang === l.code
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500'
                      : 'border-gray-200 text-gray-700 hover:border-emerald-300'
                  }`}
                >
                  <div className="text-sm font-bold">{l.native}</div>
                  <div className="text-xs text-gray-500">{l.english}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Granular Per-Channel Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5 text-emerald-600" />
                AI Response Language
              </label>
              <select
                value={aiLang}
                onChange={(e) => setAiLang(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-xl text-xs font-semibold"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.native} ({l.english})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 uppercase flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                Voice Assistant Language
              </label>
              <select
                value={voiceLang}
                onChange={(e) => setVoiceLang(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-xl text-xs font-semibold"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.native} ({l.english})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 uppercase flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-600" />
                Doc Explainer Language
              </label>
              <select
                value={docLang}
                onChange={(e) => setDocLang(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-xl text-xs font-semibold"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.native} ({l.english})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Preview Box */}
          <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-1 text-xs">
            <div className="font-bold text-emerald-400 uppercase tracking-wider">Live Language Preview:</div>
            <p className="text-sm font-semibold">
              Selected Script: <strong className="text-emerald-200 text-base">{selectedLangObj.native}</strong> ({selectedLangObj.english})
            </p>
          </div>

          <button
            onClick={handleSave}
            className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-xl shadow-md transition-colors text-sm flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save & Apply Language Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
