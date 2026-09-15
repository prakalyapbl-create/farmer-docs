'use client';

import React from 'react';
import Link from 'next/link';
import { PhoneCall, ShieldAlert, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Call434Banner() {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-white py-3 px-4 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-600/50 rounded-full animate-pulse">
            <PhoneCall className="w-5 h-5 text-amber-200" />
          </div>
          <div>
            <div className="font-bold text-base flex items-center justify-center md:justify-start gap-2">
              <span>🌾 Call 434 - Rural Loan Information Assistance</span>
              <span className="bg-amber-500 text-amber-950 text-xs px-2 py-0.5 rounded-full font-extrabold uppercase">
                Demo Helpline
              </span>
            </div>
            <p className="text-xs text-amber-100/90">
              No smartphone? Dial common assistance number <strong className="text-white underline">434</strong> to reach your assigned Area Admin.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/rural-access/call-simulation"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white text-amber-900 hover:bg-amber-50 font-bold rounded-lg text-sm shadow-sm transition-transform active:scale-95"
          >
            Launch Call 434 Simulator
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
