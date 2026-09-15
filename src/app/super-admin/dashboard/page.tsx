'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  Users,
  FileText,
  MapPin,
  BookOpen,
  BarChart3,
  ShieldCheck,
  CheckCircle,
  Plus,
  Trash2
} from 'lucide-react';

export default function SuperAdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'metrics' | 'users' | 'mapping' | 'kb' | 'audit'>('metrics');

  const [mappings, setMappings] = useState([
    { id: '1', village: 'Kovilpatti', taluk: 'Kovilpatti Taluk', district: 'Tuticorin', admin: 'Area Admin Kovilpatti', priority: 1, active: true },
    { id: '2', village: 'Kamrup Village', taluk: 'Kamrup Sector', district: 'Kamrup', admin: 'Area Admin Assam', priority: 1, active: true }
  ]);

  const [kbDocs, setKbDocs] = useState([
    { id: '1', title: 'NABARD KCC Master Circular 2025-26', category: 'Kisan Credit Card', institution: 'NABARD', version: '1.0', active: true },
    { id: '2', title: 'PMFBY Operational Guidelines', category: 'Crop Insurance', institution: 'Ministry of Agri', version: '2.1', active: true }
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-gradient-to-r from-purple-900 via-purple-850 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl shadow-lg space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-800 rounded-full text-xs font-bold uppercase text-purple-200">
          Super Admin Master Portal
        </div>
        <h1 className="text-2xl sm:text-3xl font-black">Platform Metrics & Governance</h1>
        <p className="text-xs text-purple-100">Manage users, Area Admin mappings, RAG Knowledge Base, and system audit logs.</p>
      </div>

      {/* Tabs */}
      <div className="bg-white p-2 rounded-2xl border border-gray-200 shadow-sm flex flex-wrap gap-2">
        {[
          { id: 'metrics', label: 'Platform Metrics' },
          { id: 'users', label: 'Users & Admins' },
          { id: 'mapping', label: 'Village Area Mapping' },
          { id: 'kb', label: 'RAG Knowledge Base' },
          { id: 'audit', label: 'System Audit Logs' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === t.id ? 'bg-purple-900 text-white shadow-sm' : 'text-gray-600 hover:bg-purple-50'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: Metrics */}
      {activeTab === 'metrics' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-1">
            <div className="text-xs font-bold text-gray-500 uppercase">Total Farmers</div>
            <div className="text-3xl font-black text-purple-900">1,240</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-1">
            <div className="text-xs font-bold text-gray-500 uppercase">Verified Area Admins</div>
            <div className="text-3xl font-black text-purple-900">84</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-1">
            <div className="text-xs font-bold text-gray-500 uppercase">Uploaded Loan Docs</div>
            <div className="text-3xl font-black text-emerald-800">3,890</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-1">
            <div className="text-xs font-bold text-gray-500 uppercase">434 Helpline Calls</div>
            <div className="text-3xl font-black text-amber-900">612</div>
          </div>
        </div>
      )}

      {/* TAB 3: Mapping */}
      {activeTab === 'mapping' && (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-gray-900 text-base">Village $\rightarrow$ Taluk $\rightarrow$ Area Admin Assignments</h3>
            <button className="px-3 py-1.5 bg-purple-900 text-white font-bold rounded-xl text-xs flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" />
              Add Village Mapping
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 font-bold uppercase border-y border-gray-200">
                <tr>
                  <th className="py-3 px-3">Village Name</th>
                  <th className="py-3 px-3">Taluk</th>
                  <th className="py-3 px-3">District</th>
                  <th className="py-3 px-3">Assigned Area Admin</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mappings.map(m => (
                  <tr key={m.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-bold text-gray-900">{m.village}</td>
                    <td className="py-3 px-3 text-gray-600">{m.taluk}</td>
                    <td className="py-3 px-3 text-gray-600">{m.district}</td>
                    <td className="py-3 px-3 font-bold text-purple-900">{m.admin}</td>
                    <td className="py-3 px-3 font-bold text-emerald-700">ACTIVE</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: RAG Knowledge Base */}
      {activeTab === 'kb' && (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-gray-900 text-base">RAG Knowledge Base Documents</h3>
            <button className="px-3 py-1.5 bg-purple-900 text-white font-bold rounded-xl text-xs flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" />
              Upload KB Circular
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 font-bold uppercase border-y border-gray-200">
                <tr>
                  <th className="py-3 px-3">Document Title</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Institution</th>
                  <th className="py-3 px-3">Version</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {kbDocs.map(kb => (
                  <tr key={kb.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-bold text-gray-900">{kb.title}</td>
                    <td className="py-3 px-3 text-gray-600">{kb.category}</td>
                    <td className="py-3 px-3 text-gray-600">{kb.institution}</td>
                    <td className="py-3 px-3 font-mono">{kb.version}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
