'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import AuthenticityBadge from '@/components/AuthenticityBadge';
import {
  FileText,
  Upload,
  Bot,
  CheckCircle,
  PhoneCall,
  Calendar,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Search
} from 'lucide-react';

export default function FarmerDashboard() {
  const { user } = useAuth();
  const { t, language } = useLanguage();

  const [documents, setDocuments] = useState<any[]>([]);
  const [assistanceRequests, setAssistanceRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('farmer_docx_token');
        const headers = { Authorization: `Bearer ${token}` };

        const [docsRes, reqsRes] = await Promise.all([
          fetch('/api/documents', { headers }),
          fetch('/api/assistance/my-requests', { headers }),
        ]);

        if (docsRes.ok) {
          const docsData = await docsRes.json();
          setDocuments(docsData.documents || []);
        }

        if (reqsRes.ok) {
          const reqsData = await reqsRes.json();
          setAssistanceRequests(reqsData.requests || []);
        }
      } catch (e) {
        console.error('Error loading dashboard data:', e);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-850 to-green-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-800/80 text-emerald-200 rounded-full text-xs font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Active Farmer Account • {user?.farmerProfile?.village || 'Assam'}
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            {t('dashboard.welcome')}, {user?.name || 'Farmer'} 🌾
          </h1>
          <p className="text-sm text-emerald-100/90 max-w-2xl">
            Upload agricultural loan documents to receive instant simple explanations in your preferred language ({language.toUpperCase()}).
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase">{t('dashboard.totalDocs')}</span>
            <FileText className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-gray-900">{documents.length}</div>
          <div className="text-xs text-emerald-700 font-semibold">Active documents indexed</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase">{t('dashboard.analyzed')}</span>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-3xl font-black text-gray-900">
            {documents.filter((d) => d.processingStatus === 'COMPLETED').length}
          </div>
          <div className="text-xs text-gray-500">10-Point Analysis Ready</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase">{t('dashboard.pendingCalls')}</span>
            <PhoneCall className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-amber-900">{assistanceRequests.length}</div>
          <div className="text-xs text-amber-700 font-semibold">Call 434 Proxy Requests</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase">{t('dashboard.upcomingDue')}</span>
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-gray-900">15-Jul-2026</div>
          <div className="text-xs text-blue-700 font-semibold">₹1,50,000 (Annual KCC Renewal)</div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-extrabold text-gray-900">{t('dashboard.quickActions')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/farmer/documents/upload"
            className="p-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl shadow-md transition-all space-y-2 group"
          >
            <Upload className="w-6 h-6 text-emerald-200 group-hover:scale-110 transition-transform" />
            <div className="font-extrabold text-base">{t('dashboard.uploadAction')}</div>
            <p className="text-xs text-emerald-100">Upload PDF or photo of loan document</p>
          </Link>

          <Link
            href="/farmer/assistant"
            className="p-5 bg-white hover:bg-emerald-50 border border-gray-200 rounded-2xl shadow-sm transition-all space-y-2 group"
          >
            <Bot className="w-6 h-6 text-emerald-600 group-hover:scale-110 transition-transform" />
            <div className="font-extrabold text-base text-gray-900">{t('dashboard.aiAction')}</div>
            <p className="text-xs text-gray-500">Ask questions in your preferred language</p>
          </Link>

          <Link
            href="/farmer/eligibility"
            className="p-5 bg-white hover:bg-emerald-50 border border-gray-200 rounded-2xl shadow-sm transition-all space-y-2 group"
          >
            <CheckCircle className="w-6 h-6 text-emerald-600 group-hover:scale-110 transition-transform" />
            <div className="font-extrabold text-base text-gray-900">{t('dashboard.eligibilityAction')}</div>
            <p className="text-xs text-gray-500">Check official scheme conditions</p>
          </Link>

          <Link
            href="/rural-access/call-simulation"
            className="p-5 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-2xl shadow-md transition-all space-y-2 group"
          >
            <PhoneCall className="w-6 h-6 text-amber-200 group-hover:scale-110 transition-transform" />
            <div className="font-extrabold text-base">{t('dashboard.callAction')}</div>
            <p className="text-xs text-amber-100">Simulate Call 434 IVR helper</p>
          </Link>
        </div>
      </div>

      {/* Recent Documents Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-gray-900">Your Analyzed Loan Documents</h3>
            <p className="text-xs text-gray-500">Select any document to view simple explanations & authenticity results.</p>
          </div>
          <Link
            href="/farmer/documents/upload"
            className="px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-bold rounded-xl transition-colors"
          >
            + Upload Document
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-bold uppercase border-y border-gray-200">
              <tr>
                <th className="py-3 px-4">Document Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Date Uploaded</th>
                <th className="py-3 px-4">Authenticity Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {documents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-400">
                    No documents uploaded yet. Click "+ Upload Document" above to analyze your first loan document.
                  </td>
                </tr>
              ) : (
                documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50">
                    <td className="py-3.5 px-4 font-bold text-gray-900 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-600" />
                      {doc.title}
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 font-medium">{doc.category}</td>
                    <td className="py-3.5 px-4 text-gray-500">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <AuthenticityBadge
                        riskLevel={doc.analysis?.authenticityRiskLevel || 'LOW'}
                      />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/farmer/documents/${doc.id}`}
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold text-xs inline-flex items-center gap-1"
                      >
                        View Analysis
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
