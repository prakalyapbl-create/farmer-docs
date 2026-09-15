'use client';

import React from 'react';
import { FileText, CheckCircle2 } from 'lucide-react';

export default function SupportedDocumentsPage() {
  const categories = [
    '1. Loan Application Form',
    '2. Loan Sanction Letter',
    '3. Loan Agreement',
    '4. Kisan Credit Card (KCC) Document',
    '5. Repayment Schedule',
    '6. Bank Payment Reminder',
    '7. Overdue or Recovery Notice',
    '8. Interest Rate or Scheme Circular',
    '9. Eligibility Document',
    '10. Land or Crop Supporting Document (Chitta / Adangal)',
    '11. Subsidy or Government Scheme Document',
    '12. Other Loan-Related Document'
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <h1 className="text-3xl font-black text-gray-900">Supported Loan Document Categories 📄</h1>
        <p className="text-sm text-gray-600">Farmer Docx accepts scanned image uploads and PDF files across 12 agricultural loan categories.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
          {categories.map((c, idx) => (
            <div key={idx} className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs font-bold text-emerald-950 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{c}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
