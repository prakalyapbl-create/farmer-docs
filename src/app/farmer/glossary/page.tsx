'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { BookOpen, Search, Sparkles } from 'lucide-react';

export default function GlossaryPage() {
  const { t, language } = useLanguage();
  const [search, setSearch] = useState('');

  const terms = [
    {
      term: 'Interest Subvention (வட்டி மானியம் / সুদের ৰেহাই)',
      category: 'Government Subsidy',
      definition: 'A government subsidy scheme where the government pays a portion of the loan interest (e.g. 3%) to reduce the farmer effective interest rate to 4%.',
      nativeExplanations: {
        as: 'চৰকাৰে কৃষকৰ সুদৰ হাৰ হ্ৰাস কৰিবলৈ ৩% সুদ ৰেহাই প্ৰদান কৰে।',
        ta: 'விவசாயிகளுக்கு வட்டி சுமையைக் குறைக்க அரசு வழங்கும் 3% வட்டி மானியத் திட்டம்.',
        hi: 'किसानों के लिए ब्याज दर कम करने हेतु सरकार द्वारा दी जाने वाली 3% की छूट।',
        en: 'A 3% interest subsidy paid by the central government for prompt repayment.'
      }
    },
    {
      term: 'Moratorium (கடனை ஒத்திவைப்பு / ঋণ স্থগিতকৰণ)',
      category: 'Repayment Terms',
      definition: 'A temporary period during which the farmer is not required to make installment payments, often granted during natural calamities.',
      nativeExplanations: {
        as: 'প্ৰাকৃতিক দুৰ্যোগৰ সময়ত ঋণৰ কিস্তি আদায় কৰা স্থগিত ৰখা সময়ছোৱা।',
        ta: 'இயற்கை சீற்றங்களின் போது கடன் தவணை செலுத்துவதில் வழங்கப்படும் கால அவகாசம்.',
        hi: 'प्राकृतिक आपदा के समय ऋण किस्तों के भुगतान में दी जाने वाली छूट की अवधि।',
        en: 'A temporary period where installment payment is deferred without penalty.'
      }
    },
    {
      term: 'Hypothecation (பயிர் பிணையம் / শস্য জামানত)',
      category: 'Collateral & Security',
      definition: 'Pledging standing agricultural crops or movable farm equipment as security for the loan without transferring physical possession.',
      nativeExplanations: {
        as: 'ঋণৰ জামানত হিচাপে পথাৰৰ শস্য বেংকত বন্ধক ৰখা ব্যৱস্থা।',
        ta: 'கடனுக்கான பிணையமாக விளைநிலத்தில் உள்ள பயிர்களை வங்கியிடம் அடமானம் வைப்பது.',
        hi: 'ऋण की सुरक्षा के रूप में खड़ी फसल को बैंक के पास गिरवी रखना।',
        en: 'Pledging standing crops as collateral security to the bank.'
      }
    }
  ];

  const filtered = terms.filter(t => t.term.toLowerCase().includes(search.toLowerCase()) || t.definition.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">{t('nav.glossary')}</h1>
          <p className="text-xs text-gray-500 mt-1">
            Multilingual definitions of complex agricultural banking & legal terms.
          </p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search banking terms (e.g. Moratorium, Subvention)..."
            className="w-full pl-9 pr-4 py-2 border rounded-xl text-sm"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-gray-900 text-base flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                {item.term}
              </h3>
              <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-900 text-[10px] font-bold rounded-full">
                {item.category}
              </span>
            </div>

            <p className="text-xs text-gray-700 leading-relaxed">{item.definition}</p>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-950 font-medium">
              <strong className="text-emerald-800 uppercase font-bold text-[10px] block mb-1">
                Selected Language Meaning ({language.toUpperCase()}):
              </strong>
              {item.nativeExplanations[language] || item.nativeExplanations.en}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
