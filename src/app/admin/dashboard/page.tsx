'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  Users,
  PhoneCall,
  CheckCircle,
  AlertTriangle,
  Globe,
  FileText,
  Upload,
  ArrowRight,
  MessageSquare
} from 'lucide-react';

export default function AreaAdminDashboard() {
  const { user } = useAuth();
  const { t, language, setLanguage, languages } = useLanguage();

  const [adminLanguage, setAdminLanguage] = useState('en');
  const [requests, setRequests] = useState<any[]>([
    {
      id: 'REQ-434-101',
      farmerName: 'Muthu S',
      mobileNumber: '9876543210',
      village: 'Kovilpatti',
      taluk: 'Kovilpatti Taluk',
      district: 'Tuticorin',
      preferredLanguage: 'ta',
      question: 'கடனை எப்போது திருப்பிச் செலுத்த வேண்டும்?',
      translatedQuestion: 'When is loan repayment due date?',
      status: 'NEW',
      priority: 'HIGH',
      createdAt: new Date().toISOString()
    },
    {
      id: 'REQ-434-102',
      farmerName: 'Lakshmi B',
      mobileNumber: '9876543215',
      village: 'Kamrup Village',
      taluk: 'Kamrup Sector',
      district: 'Kamrup',
      preferredLanguage: 'as',
      question: 'মোৰ ঋণৰ বটিৰ হাৰ কিমান?',
      translatedQuestion: 'What is my loan interest rate and subsidy percentage?',
      status: 'ASSIGNED',
      priority: 'NORMAL',
      createdAt: new Date().toISOString()
    }
  ]);

  const [activeRequest, setActiveRequest] = useState<any>(null);
  const [callNotes, setCallNotes] = useState('');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Header with Dual Translation Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-850 to-orange-950 text-white p-6 sm:p-8 rounded-3xl shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-800 text-amber-200 rounded-full text-xs font-bold uppercase">
              Area Admin Proxy Workbench
            </div>
            <h1 className="text-2xl sm:text-3xl font-black mt-1">{t('admin.dashboardTitle')}</h1>
            <p className="text-xs text-amber-100/90">
              Assigned Coverage: Kovilpatti & Kamrup Sectors • 434 Helpline Callback Proxy
            </p>
          </div>

          {/* Admin Language Selector Pill */}
          <div className="bg-amber-950/80 p-3 rounded-2xl border border-amber-700/60 text-xs space-y-1">
            <div className="font-bold text-amber-300 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" />
              {t('admin.translationEnabled')}
            </div>
            <div className="text-[11px] text-amber-100">
              {t('admin.adminLang')}: <strong>{adminLanguage.toUpperCase()}</strong>
            </div>
          </div>
        </div>

        {/* Translation Indicator Pill */}
        <div className="p-3 bg-amber-950/60 rounded-xl border border-amber-700/40 text-xs font-mono text-amber-200 flex flex-wrap items-center gap-4">
          <span>Farmer language: <strong className="text-white">অসমীয়া / தமிழ்</strong></span>
          <span>•</span>
          <span>Admin language: <strong className="text-white">English</strong></span>
          <span>•</span>
          <span className="text-emerald-400 font-bold">Dual Translation View: ACTIVE</span>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="text-xs font-bold text-gray-500 uppercase">Assigned Village Calls</div>
          <div className="text-3xl font-black text-amber-900 mt-1">{requests.length}</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="text-xs font-bold text-gray-500 uppercase">Pending Callbacks</div>
          <div className="text-3xl font-black text-rose-800 mt-1">1</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="text-xs font-bold text-gray-500 uppercase">Completed Proxy Uploads</div>
          <div className="text-3xl font-black text-emerald-800 mt-1">4</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="text-xs font-bold text-gray-500 uppercase">Escalated to Bank Officer</div>
          <div className="text-3xl font-black text-purple-800 mt-1">0</div>
        </div>
      </div>

      {/* Main Workbench Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Assigned Requests Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-200 shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-extrabold text-gray-900">Assigned 434 Helpline Requests</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 font-bold uppercase border-y border-gray-200">
                <tr>
                  <th className="py-3 px-3">Req ID</th>
                  <th className="py-3 px-3">Farmer</th>
                  <th className="py-3 px-3">Village / Sector</th>
                  <th className="py-3 px-3">Farmer Language</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {requests.map((req) => (
                  <tr key={req.id} className="hover:bg-amber-50/50 cursor-pointer" onClick={() => setActiveRequest(req)}>
                    <td className="py-3 px-3 font-mono font-bold text-amber-900">{req.id}</td>
                    <td className="py-3 px-3 font-bold text-gray-900">{req.farmerName}</td>
                    <td className="py-3 px-3 text-gray-600">{req.village}</td>
                    <td className="py-3 px-3 font-bold text-emerald-800 uppercase">{req.preferredLanguage}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-900 font-bold rounded-full text-[10px]">
                        {req.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => setActiveRequest(req)}
                        className="px-3 py-1 bg-amber-800 text-white font-bold rounded-lg text-[11px]"
                      >
                        Open Call Workbench
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Dual-Language Call Action Workbench */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 space-y-4">
          <h3 className="text-base font-extrabold text-gray-900 border-b border-gray-100 pb-2">
            Dual-Language Proxy Assistant
          </h3>

          {activeRequest ? (
            <div className="space-y-4 text-xs">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
                <div className="font-bold text-amber-950 text-sm">{activeRequest.farmerName} ({activeRequest.mobileNumber})</div>
                <div>Location: {activeRequest.village}, {activeRequest.district}</div>
                <div>Language: <strong className="uppercase font-bold text-emerald-800">{activeRequest.preferredLanguage}</strong></div>
              </div>

              {/* Dual Language Question Box */}
              <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <span className="font-bold text-slate-500 uppercase">Original Farmer Audio / Text Message ({activeRequest.preferredLanguage}):</span>
                  <div className="text-sm font-semibold text-slate-900 mt-1">{activeRequest.question}</div>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <span className="font-bold text-emerald-700 uppercase">Auto-Translated Working Version (English):</span>
                  <div className="text-xs text-slate-700 mt-1 italic font-medium">{activeRequest.translatedQuestion}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <Link
                  href="/farmer/documents/upload"
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 text-xs shadow-sm"
                >
                  <Upload className="w-4 h-4" />
                  Upload Document on Farmer's Behalf
                </Link>

                <div>
                  <label className="font-bold text-gray-700 uppercase">Call Notes & Explanation Given</label>
                  <textarea
                    rows={3}
                    value={callNotes}
                    onChange={(e) => setCallNotes(e.target.value)}
                    placeholder="Enter phone notes recorded during callback..."
                    className="mt-1 w-full px-3 py-2 border rounded-xl"
                  />
                </div>

                <button
                  onClick={() => {
                    alert('Request marked completed & call notes saved!');
                    setActiveRequest(null);
                  }}
                  className="w-full py-2.5 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded-xl"
                >
                  {t('admin.completeBtn')}
                </button>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-gray-400 text-xs">
              Select an assigned request from the table to start dual-language call assistance.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
