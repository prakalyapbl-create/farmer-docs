'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Calendar, DollarSign, AlertCircle, ShieldAlert, CheckCircle2, Clock } from 'lucide-react';

export default function RepaymentPage() {
  const { t, language } = useLanguage();

  const schedule = [
    { installment: 1, dueDate: '15-Jul-2026', principal: '₹1,50,000', interest: '₹6,000 (at 4% effective)', total: '₹1,56,000', status: 'UPCOMING' },
    { installment: 2, dueDate: '15-Jan-2027', principal: 'Renewal', interest: '₹0', total: 'Harvest Renewal', status: 'SCHEDULED' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
        <h1 className="text-2xl font-black text-gray-900">{t('nav.repayment')}</h1>
        <p className="text-xs text-gray-500 mt-1">
          Detailed loan installment schedule, government subvention calculation, and penalty explainer.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="text-xs font-bold text-gray-500 uppercase">Sanctioned Principal</div>
          <div className="text-2xl font-black text-emerald-800 mt-1">₹1,50,000</div>
          <div className="text-[11px] text-gray-500">KCC Annual Limit</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="text-xs font-bold text-gray-500 uppercase">Effective Rate</div>
          <div className="text-2xl font-black text-emerald-800 mt-1">4.00% p.a.</div>
          <div className="text-[11px] text-emerald-700 font-bold">Includes 3% Subvention</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="text-xs font-bold text-gray-500 uppercase">Next Due Date</div>
          <div className="text-2xl font-black text-amber-900 mt-1">15-Jul-2026</div>
          <div className="text-[11px] text-amber-700 font-bold">120 Days Remaining</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="text-xs font-bold text-gray-500 uppercase">Late Repayment Penalty</div>
          <div className="text-2xl font-black text-rose-800 mt-1">+2.00% p.a.</div>
          <div className="text-[11px] text-rose-700">Applies after due date</div>
        </div>
      </div>

      {/* Repayment Timeline */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-6">
        <h2 className="text-lg font-extrabold text-gray-900">Crop Harvest Repayment Schedule</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-bold uppercase border-y border-gray-200">
              <tr>
                <th className="py-3 px-4">Inst. #</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Principal Amount</th>
                <th className="py-3 px-4">Interest (Subsidy Rate)</th>
                <th className="py-3 px-4">Total Installment</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {schedule.map((row) => (
                <tr key={row.installment} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-gray-900">#{row.installment}</td>
                  <td className="py-3.5 px-4 font-bold text-gray-900">{row.dueDate}</td>
                  <td className="py-3.5 px-4 font-medium">{row.principal}</td>
                  <td className="py-3.5 px-4 text-emerald-700 font-semibold">{row.interest}</td>
                  <td className="py-3.5 px-4 font-black text-gray-900">{row.total}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 bg-amber-100 text-amber-900 font-extrabold rounded-full text-[10px]">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Warning Alert Box */}
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-amber-950 text-xs space-y-1">
          <div className="font-bold text-sm flex items-center gap-1.5 text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-700" />
            Important Notice on Subvention Eligibility:
          </div>
          <p>
            To receive the 3% prompt repayment subvention, the full installment of ₹1,56,000 must be cleared on or before 15-Jul-2026. Delaying beyond this date forfeits subvention and increases interest to 9.00% p.a.
          </p>
        </div>
      </div>
    </div>
  );
}
