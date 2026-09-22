'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  Lock,
  Phone,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronDown
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { t } = useLanguage();

  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [role, setRole] = useState<'FARMER' | 'AREA_ADMIN' | 'SUPER_ADMIN' | 'BANK_OFFICER'>('FARMER');
  const [loginTab, setLoginTab] = useState<'PASSWORD' | 'OTP'>('PASSWORD');
  const [rememberFarm, setRememberFarm] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showDemoMenu, setShowDemoMenu] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (loginTab === 'OTP' && !otpSent) {
        setOtpSent(true);
        setError('');
        alert('Demo OTP code 434001 has been sent to +91 ' + (mobile || '9876543210'));
        setLoading(false);
        return;
      }

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mobile: mobile || '9876543210',
          password: loginTab === 'OTP' ? 'farmer123' : password || 'farmer123',
          role
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      login(data.token, data.user);

      if (data.user.role === 'AREA_ADMIN') {
        router.push('/admin/dashboard');
      } else if (data.user.role === 'SUPER_ADMIN') {
        router.push('/super-admin/dashboard');
      } else {
        router.push('/farmer/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (demoRole: 'FARMER' | 'AREA_ADMIN' | 'SUPER_ADMIN') => {
    if (demoRole === 'FARMER') {
      setMobile('9876543210');
      setPassword('farmer123');
      setOtp('434001');
      setRole('FARMER');
    } else if (demoRole === 'AREA_ADMIN') {
      setMobile('9876543211');
      setPassword('admin123');
      setOtp('434002');
      setRole('AREA_ADMIN');
    } else if (demoRole === 'SUPER_ADMIN') {
      setMobile('9876543212');
      setPassword('super123');
      setOtp('434003');
      setRole('SUPER_ADMIN');
    }
    setShowDemoMenu(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
        
        {/* Left Side: Dark Emerald Panel */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900 via-emerald-950 to-green-950 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Subtle background glow effect */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            {/* Top Logo Container Card */}
            <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-lg border border-emerald-100/30 flex items-center gap-3.5 w-fit">
              <img
                src="/agroweather-logo.jpg"
                alt="Agroweather Logo"
                className="w-12 h-12 object-cover rounded-xl shadow-inner border border-emerald-100"
              />
              <div>
                <div className="text-emerald-950 font-black text-xl tracking-tight leading-tight">
                  Agroweather
                </div>
                <div className="text-[10px] text-emerald-700 font-bold tracking-wide">
                  Weather Intelligence for Smarter Farming
                </div>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
              Weather Intelligence for Smarter Farming
            </h2>

            {/* Translucent Banner Box */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-2 shadow-inner">
              <div className="font-bold text-sm text-amber-300 flex items-center gap-2">
                <span>🌾</span> Simple Advice for Real Farmers
              </div>
              <p className="text-xs text-emerald-100/90 leading-relaxed font-normal">
                Know the weather. Plan your farm. Protect your harvest.
              </p>
            </div>

            {/* Key Features Checklist */}
            <ul className="space-y-3.5 text-xs sm:text-sm text-emerald-100 font-medium">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/30 border border-emerald-400/60 flex items-center justify-center text-emerald-300 shrink-0 text-xs font-bold">
                  ✓
                </div>
                <span>Village-scale 7-day rainfall forecasts</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/30 border border-emerald-400/60 flex items-center justify-center text-emerald-300 shrink-0 text-xs font-bold">
                  ✓
                </div>
                <span>Crop spraying & fertilizer timing guidance</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/30 border border-emerald-400/60 flex items-center justify-center text-emerald-300 shrink-0 text-xs font-bold">
                  ✓
                </div>
                <span>Voice advisories in Tamil and Hindi</span>
              </li>
            </ul>
          </div>

          {/* Bottom Left Footer Info */}
          <div className="pt-6 mt-8 border-t border-emerald-800/80 flex items-center justify-between text-[11px] text-emerald-300/80 font-semibold relative z-10">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Agro-Met Service</span>
            </div>
            <span>Cauvery Delta & Regional</span>
          </div>
        </div>

        {/* Right Side: Form Panel */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-12 flex flex-col justify-between space-y-6">
          
          <div className="space-y-6">
            {/* Header + Quick Demo Button */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Farmer Login
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm">
                  Access simple weather updates, rain alerts and crop advice for your farm
                </p>
              </div>

              {/* Quick Demo Pill Button with Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowDemoMenu(!showDemoMenu)}
                  className="px-3.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300/80 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Quick Demo</span>
                  <ChevronDown className="w-3 h-3 text-amber-700" />
                </button>

                {showDemoMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-amber-200 rounded-2xl shadow-xl p-2 z-30 space-y-1">
                    <div className="text-[10px] font-bold text-slate-400 px-3 py-1 uppercase tracking-wider">
                      Autofill Demo Credentials
                    </div>
                    <button
                      type="button"
                      onClick={() => fillDemo('FARMER')}
                      className="w-full text-left px-3 py-2 text-xs font-bold text-emerald-950 hover:bg-emerald-50 rounded-xl transition-colors flex items-center justify-between"
                    >
                      <span>🌾 Demo Farmer</span>
                      <span className="text-[10px] text-slate-400 font-mono">9876543210</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => fillDemo('AREA_ADMIN')}
                      className="w-full text-left px-3 py-2 text-xs font-bold text-amber-950 hover:bg-amber-50 rounded-xl transition-colors flex items-center justify-between"
                    >
                      <span>👔 Demo Area Admin</span>
                      <span className="text-[10px] text-slate-400 font-mono">9876543211</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => fillDemo('SUPER_ADMIN')}
                      className="w-full text-left px-3 py-2 text-xs font-bold text-purple-950 hover:bg-purple-50 rounded-xl transition-colors flex items-center justify-between"
                    >
                      <span>👑 Demo Super Admin</span>
                      <span className="text-[10px] text-slate-400 font-mono">9876543212</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Login Tab Switcher */}
            <div className="bg-slate-100/90 p-1 rounded-2xl flex gap-1 border border-slate-200/80">
              <button
                type="button"
                onClick={() => { setLoginTab('PASSWORD'); setError(''); }}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all ${
                  loginTab === 'PASSWORD'
                    ? 'bg-white text-emerald-900 shadow-sm border border-slate-200/60'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <span>🔑 Password Login</span>
              </button>
              <button
                type="button"
                onClick={() => { setLoginTab('OTP'); setError(''); }}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all ${
                  loginTab === 'OTP'
                    ? 'bg-white text-emerald-900 shadow-sm border border-slate-200/60'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <span>📱 Login with OTP</span>
              </button>
            </div>

            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold rounded-xl flex items-center gap-2">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Mobile Number Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Mobile Number
                </label>
                <div className="flex rounded-xl border border-slate-300 overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent bg-slate-50/50">
                  <div className="bg-slate-100 text-slate-700 font-extrabold text-xs px-3.5 flex items-center border-r border-slate-300 shrink-0">
                    IN +91
                  </div>
                  <input
                    type="text"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full px-4 py-3 bg-transparent text-sm text-slate-900 font-medium focus:outline-none placeholder:text-slate-400"
                    placeholder="Enter 10-digit mobile number"
                  />
                </div>
              </div>

              {/* Password or OTP Fields */}
              {loginTab === 'PASSWORD' ? (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => alert('For quick demo access, click "Quick Demo" at top right or call Helpline 434.')}
                      className="text-xs font-bold text-emerald-700 hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required={loginTab === 'PASSWORD'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm bg-slate-50/50 font-medium text-slate-900"
                      placeholder="•••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Enter OTP Code
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setOtpSent(true);
                        alert('Demo OTP code 434001 sent to +91 ' + (mobile || '9876543210'));
                      }}
                      className="text-xs font-bold text-emerald-700 hover:underline"
                    >
                      {otpSent ? 'Resend OTP' : 'Send OTP'}
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 text-sm bg-slate-50/50 font-mono text-center tracking-widest text-lg font-extrabold text-slate-900"
                      placeholder="434001"
                    />
                  </div>
                </div>
              )}

              {/* Checkbox + Role Switcher */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberFarm}
                    onChange={(e) => setRememberFarm(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                  />
                  <span className="text-xs font-bold text-slate-700">Remember My Farm</span>
                </label>

                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Role:</span>
                  <select
                    value={role}
                    onChange={(e: any) => setRole(e.target.value)}
                    className="text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 rounded-lg px-2 py-1 focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="FARMER">Farmer</option>
                    <option value="AREA_ADMIN">Area Admin</option>
                    <option value="SUPER_ADMIN">Super Admin</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-extrabold rounded-xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all text-base mt-4"
              >
                <span>{loading ? 'Authenticating...' : 'Login to My Farm'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Create Account Link Footer */}
          <div className="text-center text-xs text-slate-500 pt-4 border-t border-slate-100">
            Don't have an account?{' '}
            <Link href="/register" className="font-extrabold text-emerald-700 hover:underline">
              Create Account
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
