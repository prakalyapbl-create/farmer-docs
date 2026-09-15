'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import AuthenticityBadge from '@/components/AuthenticityBadge';
import { FileText, Upload, Search, ArrowRight, Filter } from 'lucide-react';

export default function DocumentsListPage() {
  const { t } = useLanguage();
  const [documents, setDocuments] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDocs() {
      try {
        const token = localStorage.getItem('farmer_docx_token');
        const res = await fetch('/api/documents', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setDocuments(data.documents || []);
        }
      } catch (e) {
        console.error('Error fetching documents:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchDocs();
  }, []);

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(search.toLowerCase()) || doc.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-gray-900">{t('nav.documents')}</h1>
          <p className="text-xs text-gray-500 mt-1">Manage and review your agricultural loan documents.</p>
        </div>
        <Link
          href="/farmer/documents/upload"
          className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm"
        >
          <Upload className="w-4 h-4" />
          Upload New Document
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or bank name..."
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-xl text-sm"
          />
        </div>
        <div className="sm:w-64">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm font-semibold"
          >
            <option value="ALL">All Categories</option>
            <option value="Loan Sanction Letter">Loan Sanction Letter</option>
            <option value="Kisan Credit Card Document">Kisan Credit Card Document</option>
            <option value="Repayment Schedule">Repayment Schedule</option>
            <option value="Bank Payment Reminder">Bank Payment Reminder</option>
          </select>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc) => (
          <div key={doc.id} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4 hover:border-emerald-400 transition-all">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <AuthenticityBadge riskLevel={doc.analysis?.authenticityRiskLevel || 'LOW'} />
            </div>

            <div className="space-y-1">
              <h3 className="font-extrabold text-gray-900 text-base line-clamp-1">{doc.title}</h3>
              <p className="text-xs text-gray-500 font-medium">{doc.category}</p>
            </div>

            <div className="text-xs text-gray-600 bg-slate-50 p-3 rounded-xl space-y-1">
              <div className="flex justify-between">
                <span>Sanctioned Limit:</span>
                <strong className="text-emerald-800">₹1,50,000</strong>
              </div>
              <div className="flex justify-between">
                <span>Next Repayment:</span>
                <strong className="text-gray-900">15-Jul-2026</strong>
              </div>
            </div>

            <Link
              href={`/farmer/documents/${doc.id}`}
              className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              View Detailed 10-Point Analysis
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
