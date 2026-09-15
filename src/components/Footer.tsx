'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ShieldCheck, Info, FileText, PhoneCall } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-emerald-950 text-emerald-100 border-t border-emerald-900 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-white font-extrabold text-xl">
              <FileText className="w-6 h-6 text-emerald-400" />
              <span>Farmer Docx 🌾</span>
            </div>
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              Understand Your Agricultural Loan Documents in Simple Language. Built for Smart India Hackathon AGR-09.
            </p>
            <div className="inline-block px-2.5 py-1 bg-amber-900/60 text-amber-200 border border-amber-700/50 rounded-md text-[11px] font-bold">
              Demo Helpline: Call 434
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="hover:text-emerald-400">Home</Link></li>
              <li><Link href="/about" className="hover:text-emerald-400">About AGR-09</Link></li>
              <li><Link href="/how-it-works" className="hover:text-emerald-400">How It Works</Link></li>
              <li><Link href="/features" className="hover:text-emerald-400">Platform Features</Link></li>
              <li><Link href="/supported-documents" className="hover:text-emerald-400">Supported 12 Loan Document Categories</Link></li>
            </ul>
          </div>

          {/* Roles & Access */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Accessibility & Roles</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/rural-access/call-simulation" className="hover:text-amber-300 text-amber-200 font-semibold">Rural Access - Call 434 Simulator</Link></li>
              <li><Link href="/farmer/dashboard" className="hover:text-emerald-400">Farmer Portal</Link></li>
              <li><Link href="/admin/dashboard" className="hover:text-emerald-400">Area Admin Workbench</Link></li>
              <li><Link href="/super-admin/dashboard" className="hover:text-emerald-400">Super Admin Portal</Link></li>
              <li><Link href="/faq" className="hover:text-emerald-400">Frequently Asked Questions</Link></li>
            </ul>
          </div>

          {/* Legal Disclaimer */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Legal & Verification Notice
            </h4>
            <p className="text-[11px] text-emerald-200/70 leading-normal bg-emerald-900/40 p-3 rounded-lg border border-emerald-800">
              {t('common.officialDisclaimer')} Final verification must be obtained from the issuing bank, cooperative society, or authorized officer.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-emerald-900 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-400/80 gap-4">
          <div>
            © 2026 Farmer Docx. All rights reserved. Smart India Hackathon AGR-09 Platform.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hover:underline">Contact Support</Link>
            <span>•</span>
            <Link href="/farmer/settings" className="hover:underline">Language Preferences</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
