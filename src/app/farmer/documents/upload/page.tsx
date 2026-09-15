'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Upload, FileText, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

export default function DocumentUploadPage() {
  const router = useRouter();
  const { t } = useLanguage();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Loan Sanction Letter');
  const [institutionName, setInstitutionName] = useState('Canara Bank');
  const [loanAccountNumber, setLoanAccountNumber] = useState('CNB987654321');
  const [consent, setConsent] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const docCategories = [
    'Loan Application Form',
    'Loan Sanction Letter',
    'Loan Agreement',
    'Kisan Credit Card Document',
    'Repayment Schedule',
    'Bank Payment Reminder',
    'Overdue or Recovery Notice',
    'Interest Rate or Scheme Circular',
    'Eligibility Document',
    'Land or Crop Supporting Document',
    'Subsidy or Government Scheme Document',
    'Other Loan-Related Document',
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setError('File size exceeds 10 MB limit');
        return;
      }
      setSelectedFile(file);
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('farmer_docx_token');

      const formData = new FormData();
      formData.append('title', title || 'KCC Sanction Letter');
      formData.append('category', category);
      formData.append('institutionName', institutionName);
      formData.append('loanAccountNumber', loanAccountNumber);

      if (selectedFile) {
        formData.append('file', selectedFile);
      } else {
        // Send default dummy file if user didn't pick an explicit file
        const blob = new Blob(['Sample Agricultural Loan Document Content'], { type: 'application/pdf' });
        formData.append('file', blob, 'sample_kcc_document.pdf');
      }

      const res = await fetch('/api/documents/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      router.push(`/farmer/documents/${data.document.id}`);
    } catch (err: any) {
      setError(err.message || 'Error uploading document');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200 space-y-6">
        <div className="border-b border-gray-100 pb-4">
          <h1 className="text-2xl font-black text-gray-900">{t('loan.uploadTitle')}</h1>
          <p className="text-xs text-gray-500 mt-1">
            Supported formats: PDF, JPG, PNG, DOCX (Max 10 MB). Instant OCR & AI explanation will be generated.
          </p>
        </div>

        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Drag and Drop Box */}
          <div className="border-2 border-dashed border-emerald-300 bg-emerald-50/50 hover:bg-emerald-50 rounded-2xl p-8 text-center space-y-3 cursor-pointer transition-colors relative">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.docx"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">
                {selectedFile ? selectedFile.name : t('loan.dragDrop')}
              </div>
              <p className="text-xs text-gray-500 mt-1">{t('loan.maxSize')}</p>
            </div>
            {selectedFile && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-200 text-emerald-900 font-bold rounded-full text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-800" />
                File Selected ({Math.round(selectedFile.size / 1024)} KB)
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase">Document Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm"
                placeholder="e.g. Canara Bank KCC Sanction 2026"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 uppercase">Document Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold"
              >
                {docCategories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {idx + 1}. {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase">Issuing Bank / Institution</label>
              <input
                type="text"
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                className="mt-1 w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm"
                placeholder="Canara Bank / SBI / Cooperative"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 uppercase">Loan Account Number (Optional)</label>
              <input
                type="text"
                value={loanAccountNumber}
                onChange={(e) => setLoanAccountNumber(e.target.value)}
                className="mt-1 w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm"
                placeholder="Will be masked in UI (e.g. CNB****4321)"
              />
            </div>
          </div>

          <div className="flex items-start gap-2 pt-2 border-t border-gray-100">
            <input
              type="checkbox"
              id="consentUpload"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 w-4 h-4 text-emerald-600 rounded"
            />
            <label htmlFor="consentUpload" className="text-xs text-gray-600 leading-normal">
              I certify that I am authorized to upload this document for analysis. I understand that automated analysis is for information purposes and not legal confirmation.
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-xl shadow-md transition-colors text-base"
          >
            {loading ? 'Running OCR & AI Analysis Engine...' : 'Upload & Analyze Document'}
          </button>
        </form>
      </div>
    </div>
  );
}
