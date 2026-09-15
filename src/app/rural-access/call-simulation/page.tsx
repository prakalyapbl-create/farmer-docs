'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { PhoneCall, CheckCircle2, User, MapPin, Globe, FileText, ArrowRight, Bot, ShieldAlert } from 'lucide-react';

export default function CallSimulationPage() {
  const { t } = useLanguage();

  const [simStep, setSimStep] = useState(1);
  const [farmerName, setFarmerName] = useState('Muthu');
  const [mobileNumber, setMobileNumber] = useState('9876543210');
  const [village, setVillage] = useState('Kovilpatti');
  const [district, setDistrict] = useState('Tuticorin');
  const [taluk, setTaluk] = useState('Kovilpatti Taluk');
  const [selectedLanguage, setSelectedLanguage] = useState('ta');
  const [farmerQuestion, setFarmerQuestion] = useState('கடனை எப்போது திருப்பிச் செலுத்த வேண்டும்? (When is loan repayment due?)');
  
  const [callStatus, setCallStatus] = useState<'IDLE' | 'CALLING' | 'CONNECTED' | 'ASSIGNED' | 'PROXIED' | 'COMPLETED'>('IDLE');
  const [assignedAdmin, setAssignedAdmin] = useState<string | null>(null);

  const startCall = () => {
    setCallStatus('CALLING');
    setSimStep(2);

    setTimeout(() => {
      setCallStatus('CONNECTED');
      setSimStep(3);
    }, 1500);
  };

  const processMapping = () => {
    setCallStatus('ASSIGNED');
    setAssignedAdmin('Area Admin - Kovilpatti Sector (EmpID: AA-894)');
    setSimStep(4);
  };

  const completeProxyUpload = () => {
    setCallStatus('PROXIED');
    setSimStep(5);
  };

  const completeCall = () => {
    setCallStatus('COMPLETED');
    setSimStep(6);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-800 via-amber-900 to-orange-950 text-white p-6 sm:p-8 rounded-3xl shadow-lg space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-700/80 rounded-full text-xs font-bold text-amber-200">
          <PhoneCall className="w-4 h-4 text-amber-300" />
          Interactive Hackathon Simulation • Common Number 434
        </div>
        <h1 className="text-2xl sm:text-3xl font-black">Rural Farmer Call 434 Simulation</h1>
        <p className="text-xs sm:text-sm text-amber-100/90 max-w-2xl">
          Simulate a non-smartphone farmer calling 434 IVR. Experience automatic Village $\rightarrow$ Taluk $\rightarrow$ Area Admin mapping, proxy document analysis, and call note logging.
        </p>
      </div>

      {/* Simulator Stepper */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="font-extrabold text-sm text-gray-900">
            Simulation Timeline: Step {simStep} of 6
          </div>
          <span className="px-3 py-1 bg-amber-100 text-amber-900 font-extrabold text-xs rounded-full uppercase">
            Status: {callStatus}
          </span>
        </div>

        {/* STEP 1: Dial 434 */}
        {simStep === 1 && (
          <div className="space-y-4 text-center py-6">
            <div className="w-20 h-20 bg-amber-100 text-amber-900 rounded-full flex items-center justify-center mx-auto text-2xl font-black animate-pulse">
              434
            </div>
            <h2 className="text-xl font-black text-gray-900">Dial Common Assistance Helpline 434</h2>
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              Click below to simulate an incoming voice call from a rural farmer without a smartphone.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto text-left text-xs pt-2">
              <div>
                <label className="font-bold text-gray-700">Farmer Name</label>
                <input
                  type="text"
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  className="mt-1 w-full px-3 py-1.5 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-bold text-gray-700">Mobile</label>
                <input
                  type="text"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="mt-1 w-full px-3 py-1.5 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-bold text-gray-700">Village</label>
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className="mt-1 w-full px-3 py-1.5 border rounded-lg"
                />
              </div>
            </div>

            <button
              onClick={startCall}
              className="px-8 py-3.5 bg-amber-700 hover:bg-amber-800 text-white font-extrabold rounded-2xl shadow-md transition-transform hover:scale-105 text-base"
            >
              📞 Initiate Call to 434
            </button>
          </div>
        )}

        {/* STEP 2 & 3: IVR Language & Location Mapping */}
        {simStep === 3 && (
          <div className="space-y-4">
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-950 text-xs space-y-1">
              <div className="font-bold text-sm">IVR Automatic Detection Output:</div>
              <div>Farmer Language: <strong>Tamil (தமிழ்)</strong></div>
              <div>Location Detected: <strong>Village {village}, Taluk {taluk}, District {district}</strong></div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase">Farmer Question / Concern</label>
              <textarea
                rows={2}
                value={farmerQuestion}
                onChange={(e) => setFarmerQuestion(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-xs"
              />
            </div>

            <button
              onClick={processMapping}
              className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-white font-extrabold rounded-xl text-sm"
            >
              Map Village $\rightarrow$ Taluk $\rightarrow$ Assign Area Admin
            </button>
          </div>
        )}

        {/* STEP 4: Area Admin Workbench Proxy Upload */}
        {simStep === 4 && (
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 text-xs space-y-1">
              <div className="font-bold text-sm text-emerald-950">Assigned Area Admin Notification:</div>
              <div>{assignedAdmin}</div>
              <div>Assigned Request ID: <strong>REQ-434-8942</strong></div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 text-xs space-y-3">
              <div className="font-bold text-gray-900">Area Admin Action: On-Behalf Proxy Document Upload</div>
              <p className="text-gray-500">The Area Admin uploads the farmer's KCC document on their behalf.</p>
              <button
                onClick={completeProxyUpload}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl"
              >
                Simulate Proxy Document Analysis & Generate Tamil Readout
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: AI Explanation Readout to Farmer */}
        {simStep === 5 && (
          <div className="space-y-4">
            <div className="p-5 bg-slate-900 text-white rounded-2xl space-y-2 text-xs">
              <div className="font-bold text-emerald-400 text-sm">AI Explanation Readout (in Tamil):</div>
              <p className="text-sm font-medium leading-relaxed">
                "வணக்கம் முத்து, உங்கள் கடன் ஆவணத்தின் படி ₹1,50,000 அனுமதிக்கப்பட்டுள்ளது. திருப்பிச் செலுத்தும் கடைசி தேதி 15 ஜூலை 2026. குறித்த தேதியில் செலுத்தினால் 4% வட்டி மட்டுமே செலுத்துவீர்கள்."
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase">Record Call Notes (Area Admin Log)</label>
              <textarea
                rows={2}
                defaultValue="Called farmer Muthu. Explained loan amount ₹1.5L and due date 15-Jul-2026 in Tamil over phone. Farmer acknowledged."
                className="w-full px-3 py-2 border rounded-xl text-xs"
              />
            </div>

            <button
              onClick={completeCall}
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-xl text-sm"
            >
              Complete Assistance Request & Log Call Notes
            </button>
          </div>
        )}

        {/* STEP 6: Call Completed */}
        {simStep === 6 && (
          <div className="text-center py-8 space-y-3">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto font-black text-xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Rural Assistance Completed!</h2>
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              Request REQ-434-8942 has been successfully resolved. Call notes and audit logs have been updated.
            </p>
            <button
              onClick={() => setSimStep(1)}
              className="px-6 py-2.5 bg-gray-900 text-white font-bold rounded-xl text-xs"
            >
              Run New 434 Simulation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
