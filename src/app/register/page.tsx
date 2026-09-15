'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import locationsData from '@/data/locations.json';
import { Globe, User, Phone, Lock, MapPin, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { language, setLanguage, t, languages, getLocalizedName } = useLanguage();

  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    stateCode: 'AS',
    districtCode: 'KAMRUP',
    preferredLanguage: 'as',
    communicationMethod: 'BOTH',
    fullName: '',
    mobile: '',
    password: '',
    village: '',
    taluk: '',
    pincode: '',
    consent: false,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Filter districts based on selected stateCode
  const availableDistricts = locationsData.districts.filter(
    (d) => d.stateCode === formData.stateCode
  );

  const handleNext = () => {
    setError('');
    if (step === 1 && !formData.stateCode) {
      setError('Please select a state');
      return;
    }
    if (step === 2 && !formData.districtCode) {
      setError('Please select a district');
      return;
    }
    if (step === 3 && !formData.preferredLanguage) {
      setError('Please select your preferred language');
      return;
    }
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName || !formData.mobile || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }
    if (!formData.consent) {
      setError('You must accept consent to proceed');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      login(data.token, data.user);
      router.push('/farmer/dashboard');
    } catch (err: any) {
      setError(err.message || 'Error creating account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Step Indicator Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-green-900 text-white p-6 sm:p-8">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-emerald-300 mb-2">
            <span>Farmer Onboarding Wizard</span>
            <span>Step {step} of 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">{t('onboarding.title')}</h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-1">{t('onboarding.subtitle')}</p>

          {/* Progress Bar */}
          <div className="w-full bg-emerald-950/60 h-2 rounded-full mt-6 overflow-hidden">
            <div
              className="bg-emerald-400 h-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-sm font-semibold rounded-xl">
              {error}
            </div>
          )}

          {/* STEP 1: Select State */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                1. {t('onboarding.step1')}
              </h2>
              <p className="text-xs text-gray-500">Choose your home state for administrative mapping.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {locationsData.states.map((st) => {
                  const stateDisplayName = getLocalizedName(st.names, st.names.en);
                  const isSelected = formData.stateCode === st.code;
                  return (
                    <button
                      key={st.code}
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          stateCode: st.code,
                          districtCode: locationsData.districts.find((d) => d.stateCode === st.code)?.districtCode || '',
                        });
                      }}
                      className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50 shadow-md text-emerald-950 font-bold'
                          : 'border-gray-200 hover:border-emerald-300 text-gray-700'
                      }`}
                    >
                      <div>
                        <div className="text-base font-bold">{stateDisplayName}</div>
                        <div className="text-xs text-gray-500">{st.names.en}</div>
                      </div>
                      {isSelected && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Select District (Multilingual Script Display) */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                2. {t('onboarding.step2')}
              </h2>
              <p className="text-xs text-gray-500">
                Districts in native script. The farmer will not be forced to read English names.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto p-1">
                {availableDistricts.map((dist) => {
                  const localizedDistrict = getLocalizedName(dist.names, dist.names.en);
                  const isSelected = formData.districtCode === dist.districtCode;
                  return (
                    <button
                      key={dist.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, districtCode: dist.districtCode })}
                      className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50 shadow-md text-emerald-950 font-bold'
                          : 'border-gray-200 hover:border-emerald-300 text-gray-700'
                      }`}
                    >
                      <div>
                        <div className="text-base font-bold">{localizedDistrict}</div>
                        <div className="text-xs text-gray-500">{dist.names.en}</div>
                      </div>
                      {isSelected && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Select Preferred Language (Native Scripts) */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-600" />
                3. {t('onboarding.step3')}
              </h2>
              <p className="text-xs text-gray-500">
                Displays native scripts for all 13 supported Indian languages.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-80 overflow-y-auto p-1">
                {languages.map((lang) => {
                  const isSelected = formData.preferredLanguage === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, preferredLanguage: lang.code });
                        setLanguage(lang.code);
                      }}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50 shadow-md text-emerald-950 font-bold ring-2 ring-emerald-500'
                          : 'border-gray-200 hover:border-emerald-300 text-gray-800'
                      }`}
                    >
                      <div className="text-base font-bold">{lang.native}</div>
                      <div className="text-xs text-gray-500">{lang.english}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Communication Preference & Final Account Fields */}
          {step === 4 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5 text-emerald-600" />
                4. {t('onboarding.step4')} & Farmer Profile
              </h2>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 uppercase">Communication Mode</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { mode: 'TEXT', label: t('onboarding.text') },
                    { mode: 'VOICE', label: t('onboarding.voice') },
                    { mode: 'BOTH', label: t('onboarding.both') },
                  ].map((item) => (
                    <button
                      key={item.mode}
                      type="button"
                      onClick={() => setFormData({ ...formData, communicationMethod: item.mode })}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                        formData.communicationMethod === item.mode
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm'
                          : 'border-gray-200 text-gray-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase">{t('onboarding.fullName')} *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="mt-1 w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 text-sm"
                    placeholder="Muthu S"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase">{t('onboarding.mobileNumber')} *</label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="mt-1 w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 text-sm"
                    placeholder="9876543210"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase">{t('onboarding.village')}</label>
                  <input
                    type="text"
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-300 text-sm"
                    placeholder="Kovilpatti"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase">{t('onboarding.taluk')}</label>
                  <input
                    type="text"
                    value={formData.taluk}
                    onChange={(e) => setFormData({ ...formData, taluk: e.target.value })}
                    className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-300 text-sm"
                    placeholder="Kovilpatti Taluk"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase">{t('onboarding.password')} *</label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-300 text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-start gap-2 pt-2">
                <input
                  type="checkbox"
                  id="consent"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-1 w-4 h-4 text-emerald-600 rounded"
                />
                <label htmlFor="consent" className="text-xs text-gray-600 leading-normal">
                  {t('onboarding.consent')}
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-md transition-colors text-base"
              >
                {loading ? 'Creating Farmer Account...' : 'Complete Farmer Registration'}
              </button>
            </form>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-xl flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('common.back')}
              </button>
            ) : <div />}

            {step < 4 && (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 text-sm font-extrabold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl flex items-center gap-1 shadow-sm"
              >
                {t('common.continue')}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
