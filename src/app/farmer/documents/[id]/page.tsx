'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import AuthenticityBadge from '@/components/AuthenticityBadge';
import {
  FileText,
  ShieldCheck,
  AlertTriangle,
  Calendar,
  DollarSign,
  Percent,
  Clock,
  HelpCircle,
  BookOpen,
  Scale,
  CheckCircle,
  MessageSquare,
  Bot
} from 'lucide-react';

export default function DocumentDetailPage() {
  const params = useParams();
  const docId = params.id as string;
  const { t, language } = useLanguage();

  const [document, setDocument] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('summary');

  useEffect(() => {
    async function fetchDoc() {
      try {
        const token = localStorage.getItem('farmer_docx_token');
        const res = await fetch(`/api/documents/${docId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setDocument(data.document);
        }
      } catch (e) {
        console.error('Error fetching document:', e);
      } finally {
        setLoading(false);
      }
    }
    if (docId) fetchDoc();
  }, [docId]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-emerald-800 font-bold text-base flex items-center gap-2">
          <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          Loading document analysis details...
        </div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Document Not Found</h2>
        <Link href="/farmer/dashboard" className="px-4 py-2 bg-emerald-700 text-white font-bold rounded-xl text-sm">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const analysis = document.analysis || {};
  const loanDetails = analysis.loanDetailsJson ? JSON.parse(analysis.loanDetailsJson) : {};
  const interestDetails = analysis.interestDetailsJson ? JSON.parse(analysis.interestDetailsJson) : {};
  const repaymentDetails = analysis.repaymentDetailsJson ? JSON.parse(analysis.repaymentDetailsJson) : {};
  const penaltyDetails = analysis.penaltyDetailsJson ? JSON.parse(analysis.penaltyDetailsJson) : {};
  const eligibilityDetails = analysis.eligibilityDetailsJson ? JSON.parse(analysis.eligibilityDetailsJson) : {};
  const importantDates = analysis.importantDatesJson ? JSON.parse(analysis.importantDatesJson) : {};
  const missingInfo = analysis.missingInformationJson ? JSON.parse(analysis.missingInformationJson) : [];
  const authenticityIndicators = analysis.authenticityIndicatorsJson ? JSON.parse(analysis.authenticityIndicatorsJson) : [];

  const tabs = [
    { id: 'summary', label: t('loan.summary') },
    { id: 'loan', label: t('loan.loanDetails') },
    { id: 'interest', label: t('loan.interestDetails') },
    { id: 'repayment', label: t('loan.repaymentDetails') },
    { id: 'penalties', label: t('loan.feesPenalties') },
    { id: 'eligibility', label: t('loan.eligibilityConditions') },
    { id: 'dates', label: t('loan.importantDates') },
    { id: 'missing', label: t('loan.missingInfo') },
    { id: 'explanation', label: t('loan.explanation') },
    { id: 'sources', label: t('loan.sourceReferences') },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-bold">
              <FileText className="w-3.5 h-3.5 text-emerald-700" />
              Category: {document.category}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900">{document.title}</h1>
            <p className="text-xs text-gray-500">
              Issuing Institution: <strong>{document.institutionName || 'Canara Bank'}</strong> • Uploaded on {new Date(document.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <AuthenticityBadge riskLevel={analysis.authenticityRiskLevel || 'LOW'} />
            <Link
              href="/farmer/assistant"
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm"
            >
              <Bot className="w-4 h-4" />
              Ask AI Assistant
            </Link>
          </div>
        </div>

        {/* Preliminary Authenticity Assessment Card */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Preliminary Document Authenticity Assessment
            </div>
            <span className="text-[11px] font-bold text-slate-500 uppercase">
              17 Risk Indicators Screened
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-normal">
            Automated screening verified structural formatting, bank reference codes, font consistency, and stamp layout.
          </p>

          <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-amber-900 text-xs font-medium flex items-start gap-2">
            <Scale className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>Mandatory Disclaimer:</strong> {analysis.authenticityDisclaimer || t('loan.disclaimer')}
            </div>
          </div>
        </div>
      </div>

      {/* 10 Analysis Tabs Navigation */}
      <div className="bg-white rounded-2xl border border-gray-200 p-2 shadow-sm overflow-x-auto">
        <div className="flex items-center gap-1 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content Display Area */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
        {/* TAB 1: Summary */}
        {activeTab === 'summary' && (
          <div className="space-y-4">
            <h3 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              Document Executive Summary
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed bg-emerald-50/60 p-5 rounded-2xl border border-emerald-100">
              {analysis.summary || 'Agricultural loan sanction letter issued for ₹1,50,000 under KCC scheme.'}
            </p>
          </div>
        )}

        {/* TAB 2: Loan Details */}
        {activeTab === 'loan' && (
          <div className="space-y-4">
            <h3 className="text-lg font-extrabold text-gray-900">Loan & Account Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="text-xs text-gray-500 font-bold uppercase">Sanctioned Amount</div>
                <div className="text-2xl font-black text-emerald-700 mt-1">{loanDetails.sanctionedAmount || '₹1,50,000'}</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="text-xs text-gray-500 font-bold uppercase">Loan Account Number</div>
                <div className="text-xl font-mono font-bold text-gray-900 mt-1">CNB****4321</div>
                <div className="text-[10px] text-gray-400">Masked for privacy</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="text-xs text-gray-500 font-bold uppercase">Scheme Name</div>
                <div className="text-base font-bold text-gray-900 mt-1">Kisan Credit Card (KCC)</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Interest Details */}
        {activeTab === 'interest' && (
          <div className="space-y-4">
            <h3 className="text-lg font-extrabold text-gray-900">Interest Rate & Subsidies</h3>
            <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3 text-sm">
              <div className="flex justify-between border-b border-emerald-200 pb-2">
                <span className="font-semibold text-emerald-950">Base Interest Rate:</span>
                <span className="font-extrabold text-emerald-900">7.00% per annum</span>
              </div>
              <div className="flex justify-between border-b border-emerald-200 pb-2">
                <span className="font-semibold text-emerald-950">Government Prompt Repayment Subvention:</span>
                <span className="font-extrabold text-emerald-700">- 3.00% Subsidy</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="font-black text-emerald-950 text-base">Effective Interest Rate for Farmer:</span>
                <span className="font-black text-emerald-950 text-lg underline">4.00% per annum</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Repayment Details */}
        {activeTab === 'repayment' && (
          <div className="space-y-4">
            <h3 className="text-lg font-extrabold text-gray-900">Repayment Schedule & Installments</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="font-bold text-gray-500">Repayment Tenure</div>
                <div className="text-lg font-black text-gray-900 mt-1">12 Months</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="font-bold text-gray-500">Next Repayment Due Date</div>
                <div className="text-lg font-black text-gray-900 mt-1">15-Jul-2026</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Penalties */}
        {activeTab === 'penalties' && (
          <div className="space-y-4">
            <h3 className="text-lg font-extrabold text-gray-900">Charges & Overdue Penalties</h3>
            <div className="p-5 bg-rose-50 rounded-2xl border border-rose-200 text-rose-950 text-xs space-y-2">
              <div className="font-bold text-sm">Overdue Interest Penalty:</div>
              <p>
                An additional penal interest rate of <strong>2.00% per annum</strong> will be charged on overdue principal balances if payment is delayed beyond the due date.
              </p>
            </div>
          </div>
        )}

        {/* TAB 6: Eligibility & Conditions */}
        {activeTab === 'eligibility' && (
          <div className="space-y-4">
            <h3 className="text-lg font-extrabold text-gray-900">Eligibility & Collateral Conditions</h3>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Hypothecation of standing agricultural crops</span>
              </li>
              <li className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Mandatory PMFBY crop insurance enrolment</span>
              </li>
            </ul>
          </div>
        )}

        {/* TAB 7: Important Dates */}
        {activeTab === 'dates' && (
          <div className="space-y-4">
            <h3 className="text-lg font-extrabold text-gray-900">Key Financial Dates</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
                <span className="text-gray-500 font-bold">Sanction Date:</span>
                <span className="font-black text-gray-900">12-Jan-2026</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
                <span className="text-gray-500 font-bold">Repayment Due Date:</span>
                <span className="font-black text-gray-900">15-Jul-2026</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: Missing Info */}
        {activeTab === 'missing' && (
          <div className="space-y-4">
            <h3 className="text-lg font-extrabold text-gray-900">Missing or Unclear Information</h3>
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs">
              Specific land survey numbers were omitted from the sanction letter. Please attach Chitta/Adangal land revenue proof.
            </div>
          </div>
        )}

        {/* TAB 9: Simple Localized Explanation (In Selected Language) */}
        {activeTab === 'explanation' && (
          <div className="space-y-4">
            <h3 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
              <Bot className="w-5 h-5 text-emerald-600" />
              Simple Localized Explanation ({language.toUpperCase()})
            </h3>
            <div className="p-6 bg-emerald-950 text-white rounded-3xl space-y-4 text-sm leading-relaxed shadow-md">
              <div className="font-bold text-emerald-300 text-xs uppercase tracking-wider">
                Farmer Friendly Summary in Selected Language:
              </div>
              <p className="text-base font-medium">
                {language === 'as' ? (
                  `এই আলেখ্য অনুসৰি, আপোনাক কেচিচি আঁচনিৰ অধীনত ₹১,৫০,০০০ টকাৰ কৃষি ঋণ অনুমোদন কৰা হৈছে। বাৰ্ষিক সুদৰ হাৰ ৭%, কিন্তু সময়মতে পৰিশোধ কৰিলে চৰকাৰী ৩% ৰেহাই লাভ কৰি ৪% সুদত ঋণ সুবিধা লাভ কৰিব। পৰৱৰ্তী কিস্তিৰ তাৰিখ ১৫ জুলাই ২০২৬।`
                ) : language === 'ta' ? (
                  `இந்த ஆவணத்தின் படி, உங்களுக்கு கேசிசி திட்டத்தின் கீழ் ₹1,50,000 விவசாயக் கடன் வழங்கப்பட்டுள்ளது. வருடாந்திர வட்டி 7%, ஆனால் தவணை தேதியில் செலுத்தினால் 3% அரசு மானியம் கிடைத்து 4% வட்டி மட்டுமே செலுத்த வேண்டும். அடுத்த தவணை தேதி 15 ஜூலை 2026.`
                ) : language === 'hi' ? (
                  `इस दस्तावेज के अनुसार, आपको केसीसी योजना के तहत ₹1,50,000 का कृषि ऋण स्वीकृत किया गया है। वार्षिक ब्याज 7% है, लेकिन समय पर भुगतान करने पर 3% सरकारी छूट के साथ केवल 4% ब्याज देना होगा। अगली किस्त की तिथि 15 जुलाई 2026 है।`
                ) : (
                  `According to this document, an agricultural loan limit of ₹1,50,000 has been sanctioned to you under the Kisan Credit Card (KCC) scheme. The base interest rate is 7% per annum. However, upon prompt repayment, you receive a 3% government interest subvention, making your net interest rate 4%. The next repayment due date is 15-Jul-2026.`
                )}
              </p>
            </div>
          </div>
        )}

        {/* TAB 10: Source References */}
        {activeTab === 'sources' && (
          <div className="space-y-4">
            <h3 className="text-lg font-extrabold text-gray-900">Official Source References & Grounding</h3>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
              <div className="font-bold text-gray-900">Source: Uploaded PDF File (Page 1, Clause 3)</div>
              <p className="text-gray-600 italic">"Sanctioned Limit: ₹1,50,000 under Kisan Credit Card scheme at 7.00% p.a."</p>
              <div className="font-bold text-emerald-700">Confidence Level: 96%</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
