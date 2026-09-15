'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { CheckCircle2, AlertTriangle, ShieldAlert, Sparkles, Scale } from 'lucide-react';

export default function EligibilityPage() {
  const { t, language } = useLanguage();

  const [landHolding, setLandHolding] = useState('2.5');
  const [cropType, setCropType] = useState('Paddy (Kharif)');
  const [hasKcc, setHasKcc] = useState('YES');
  const [requestedAmount, setRequestedAmount] = useState('150000');
  const [checked, setChecked] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">{t('nav.eligibility')}</h1>
          <p className="text-xs text-gray-500 mt-1">
            Informational comparison against official NABARD & PMFBY government scheme conditions.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setChecked(true);
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-gray-700 uppercase">Land Holding Size (Acres)</label>
              <input
                type="text"
                value={landHolding}
                onChange={(e) => setLandHolding(e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 uppercase">Primary Crop Type</label>
              <select
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-xl text-sm font-semibold"
              >
                <option value="Paddy (Kharif)">Paddy (Kharif)</option>
                <option value="Wheat (Rabi)">Wheat (Rabi)</option>
                <option value="Sugarcane">Sugarcane</option>
                <option value="Cotton">Cotton</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-gray-700 uppercase">Existing KCC Account?</label>
              <select
                value={hasKcc}
                onChange={(e) => setHasKcc(e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-xl text-sm font-semibold"
              >
                <option value="YES">Yes - Existing KCC Holder</option>
                <option value="NO">No - New Borrower</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-gray-700 uppercase">Requested Loan Amount (₹)</label>
              <input
                type="text"
                value={requestedAmount}
                onChange={(e) => setRequestedAmount(e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-xl text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-xl shadow-md text-sm"
          >
            Check Informational Scheme Eligibility
          </button>
        </form>

        {checked && (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-3xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-emerald-950">Likely Eligible for KCC 3% Interest Subvention Scheme</h3>
                <p className="text-xs text-emerald-800">Matching 4 out of 4 official scheme criteria.</p>
              </div>
            </div>

            <ul className="space-y-2 text-xs text-emerald-900 font-medium">
              <li className="flex items-center gap-2">✓ Land holding under scale of finance limit</li>
              <li className="flex items-center gap-2">✓ Eligible crop notified under PMFBY insurance</li>
              <li className="flex items-center gap-2">✓ 3% Interest Subvention applicable up to ₹3,00,000</li>
            </ul>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 font-medium">
              <strong>Mandatory Disclaimer:</strong> This is an informational comparison against available scheme conditions. It is not final loan approval or rejection. Final confirmation must be obtained from your bank branch.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
