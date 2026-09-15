'use client';

import React from 'react';
import { HelpCircle } from 'lucide-react';

export default function FAQPage() {
  const faqs = [
    {
      q: 'Which languages are supported?',
      a: 'Farmer Docx supports 13 Indian languages: English, Assamese, Bengali, Hindi, Tamil, Telugu, Kannada, Malayalam, Marathi, Odia, Punjabi, Gujarati, with native scripts for all onboarding location selectors.'
    },
    {
      q: 'How does Call 434 Helpline work for non-smartphone farmers?',
      a: 'Farmers can call common number 434. The IVR detects their language & village, assigns their nearest Area Admin, who calls them back, proxy uploads their loan document, and reads out the AI explanation in their native language.'
    },
    {
      q: 'Is the document authenticity screening legal proof?',
      a: 'No. The preliminary authenticity assessment is an automated preliminary screening. Final confirmation must always be obtained from the issuing bank or authorized officer.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <h1 className="text-3xl font-black text-gray-900">Frequently Asked Questions ❓</h1>

        <div className="space-y-4 pt-4">
          {faqs.map((f, idx) => (
            <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <h3 className="font-extrabold text-gray-900 text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                {f.q}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
