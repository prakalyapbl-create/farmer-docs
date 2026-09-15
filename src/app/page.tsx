'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  FileText,
  Upload,
  UserPlus,
  PhoneCall,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  ArrowRight,
  Globe,
  BookOpen,
  Scale
} from 'lucide-react';

export default function LandingPage() {
  const { t, language } = useLanguage();

  const docCategories = [
    { name: 'Loan Application Form', desc: 'Standard initial application details & requested limit' },
    { name: 'Loan Sanction Letter', desc: 'Bank approval limit, interest rate, subvention & terms' },
    { name: 'Loan Agreement', desc: 'Legal terms, collateral hypothecation & covenants' },
    { name: 'Kisan Credit Card (KCC)', desc: 'KCC revolving limit, harvest renewal & crop insurance' },
    { name: 'Repayment Schedule', desc: 'Installment due dates, principal & interest breakdown' },
    { name: 'Bank Payment Reminder', desc: 'Installment alert & grace period notification' },
    { name: 'Overdue or Recovery Notice', desc: 'Overdue penalty calculations & escalation alerts' },
    { name: 'Interest Rate Circular', desc: 'NABARD/Bank subvention rate update circulars' },
    { name: 'Eligibility Document', desc: 'Informational scheme eligibility check sheets' },
    { name: 'Land or Crop Document', desc: 'Chitta/Adangal land revenue proof attachments' },
    { name: 'Subsidy Scheme Doc', desc: 'Government interest subvention approval letters' },
    { name: 'Other Loan Related Doc', desc: 'Miscellaneous cooperative bank letters' },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-850 to-emerald-950 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-600/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/40 text-emerald-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            AGR-09 Hackathon Platform • Multilingual & Rural Accessibility
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Understand Your Agricultural Loan Documents in Simple Language 🌾
          </h1>

          <p className="text-base sm:text-xl text-emerald-100/90 max-w-3xl mx-auto leading-relaxed">
            Upload your loan document, understand important terms, check repayment details, and get source-based explanations in Assamese, Tamil, Hindi, English, and 9 other Indian languages.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/farmer/documents/upload"
              className="w-full sm:w-auto px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 text-base"
            >
              <Upload className="w-5 h-5" />
              Upload Loan Document
            </Link>

            <Link
              href="/register"
              className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors text-base"
            >
              <UserPlus className="w-5 h-5" />
              Create Farmer Account
            </Link>

            <Link
              href="/rural-access/call-simulation"
              className="w-full sm:w-auto px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-amber-950 font-extrabold rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 text-base"
            >
              <PhoneCall className="w-5 h-5" />
              Ask for Rural Assistance
            </Link>
          </div>

          {/* Multilingual Selector Badge Bar */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-emerald-200">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>Supported Languages:</span>
            <span className="bg-emerald-800/60 px-2 py-0.5 rounded font-bold text-white">অসমীয়া</span>
            <span className="bg-emerald-800/60 px-2 py-0.5 rounded font-bold text-white">தமிழ்</span>
            <span className="bg-emerald-800/60 px-2 py-0.5 rounded font-bold text-white">हिन्दी</span>
            <span className="bg-emerald-800/60 px-2 py-0.5 rounded font-bold text-white">বাংলা</span>
            <span className="bg-emerald-800/60 px-2 py-0.5 rounded font-bold text-white">తెలుగు</span>
            <span className="bg-emerald-800/60 px-2 py-0.5 rounded font-bold text-white">ಕನ್ನಡ</span>
            <span className="bg-emerald-800/60 px-2 py-0.5 rounded font-bold text-white">മലയാളം</span>
            <span className="bg-emerald-800/60 px-2 py-0.5 rounded font-bold text-white">ಮರಾಠಿ</span>
            <span className="bg-emerald-800/60 px-2 py-0.5 rounded font-bold text-white">+ 5 More</span>
          </div>
        </div>
      </section>

      {/* Dedicated Rural Section (Call 434) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100 rounded-3xl p-8 border-2 border-amber-200/80 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-200/80 text-amber-950 font-bold rounded-full text-xs">
                <PhoneCall className="w-4 h-4 text-amber-800" />
                Rural Accessibility Feature
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-950">
                Do not use a smartphone? Call our demo assistance number <span className="text-amber-800 underline decoration-amber-500">434</span>.
              </h2>

              <p className="text-sm sm:text-base text-amber-900/90 leading-relaxed">
                Farmers who do not use smartphones can call the common assistance number 434. The system collects the farmer’s language and village details, identifies the mapped taluk and Area Admin, and assigns the request to the appropriate assistance team.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-amber-900 pt-2">
                <div className="bg-white px-3 py-1.5 rounded-lg border border-amber-200 shadow-sm">
                  Demo helpline: <strong>434</strong>
                </div>
                <div className="text-amber-700 italic">
                  Live phone routing requires telephony provider integration (Twilio/Exotel/Knowlarity).
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-md space-y-4 text-center">
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center text-amber-800 mx-auto font-black text-xl">
                434
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Test IVR Call Simulation</h3>
              <p className="text-xs text-gray-600">
                Try the step-by-step interactive Call 434 simulation tool to experience proxy upload & Area Admin workflow.
              </p>
              <Link
                href="/rural-access/call-simulation"
                className="w-full py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl text-sm block shadow-sm transition-colors"
              >
                Launch Simulator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 12 Document Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Supported Agricultural Loan Documents
          </h2>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Our OCR and AI analysis engine processes 12 major agricultural loan document categories.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {docCategories.map((cat, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-emerald-500 hover:shadow-md transition-all space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center text-sm">
                {idx + 1}
              </div>
              <h3 className="font-bold text-gray-900 text-sm">{cat.name}</h3>
              <p className="text-xs text-gray-500 leading-normal">{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Platform Disclaimer Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100 rounded-2xl p-6 border border-slate-200 text-slate-700 space-y-2 text-xs leading-relaxed">
          <div className="font-bold text-slate-900 flex items-center gap-2 text-sm">
            <Scale className="w-4 h-4 text-emerald-700" />
            Official Platform Disclaimer
          </div>
          <p>
            This platform explains agricultural loan documents and official scheme information. It does not provide final financial or legal advice, loan approval, or authenticity certification. Please contact the issuing bank, cooperative society, or authorized officer for final confirmation.
          </p>
          <p className="text-slate-500 font-semibold">
            Preliminary Authenticity Assessment is an automated preliminary screening based on the uploaded file and is not legal proof that a document is genuine or fake.
          </p>
        </div>
      </section>
    </div>
  );
}
