'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { LogIn, Phone, Lock, FileText, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { t } = useLanguage();

  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'FARMER' | 'AREA_ADMIN' | 'SUPER_ADMIN' | 'BANK_OFFICER'>('FARMER');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile, password, role }),
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

  // Demo Login Quick Fill Helpers
  const fillDemo = (demoRole: 'FARMER' | 'AREA_ADMIN' | 'SUPER_ADMIN') => {
    if (demoRole === 'FARMER') {
      setMobile('9876543210');
      setPassword('farmer123');
      setRole('FARMER');
    } else if (demoRole === 'AREA_ADMIN') {
      setMobile('9876543211');
      setPassword('admin123');
      setRole('AREA_ADMIN');
    } else if (demoRole === 'SUPER_ADMIN') {
      setMobile('9876543212');
      setPassword('super123');
      setRole('SUPER_ADMIN');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-br from-emerald-900 to-green-950 text-white p-8 text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-700/60 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-300">
            <FileText className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black">{t('nav.login')} - Farmer Docx</h1>
          <p className="text-xs text-emerald-200/80">
            Access loan document explainer & AI assistance
          </p>
        </div>

        <div className="p-8 space-y-6">
          {/* Quick Demo Fill Pills */}
          <div className="bg-emerald-50/80 p-3 rounded-2xl border border-emerald-200 text-xs space-y-2">
            <div className="font-bold text-emerald-950 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Quick Demo Logins (Click to autofill):
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => fillDemo('FARMER')}
                className="px-2.5 py-1 bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-lg font-semibold"
              >
                🌾 Demo Farmer
              </button>
              <button
                type="button"
                onClick={() => fillDemo('AREA_ADMIN')}
                className="px-2.5 py-1 bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg font-semibold"
              >
                👔 Demo Area Admin
              </button>
              <button
                type="button"
                onClick={() => fillDemo('SUPER_ADMIN')}
                className="px-2.5 py-1 bg-white hover:bg-purple-100 text-purple-900 border border-purple-300 rounded-lg font-semibold"
              >
                👑 Demo Super Admin
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase">Select Role</label>
              <select
                value={role}
                onChange={(e: any) => setRole(e.target.value)}
                className="mt-1 w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 text-sm font-semibold"
              >
                <option value="FARMER">Farmer</option>
                <option value="AREA_ADMIN">Area Admin (Village Proxy Access)</option>
                <option value="SUPER_ADMIN">Super Admin</option>
                <option value="BANK_OFFICER">Bank Officer</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 uppercase">{t('onboarding.mobileNumber')}</label>
              <div className="relative mt-1">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 text-sm"
                  placeholder="9876543210"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 uppercase">{t('onboarding.password')}</label>
              <div className="relative mt-1">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-xl shadow-md transition-colors text-sm"
            >
              {loading ? 'Authenticating...' : t('nav.login')}
            </button>
          </form>

          <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100">
            Don't have a farmer account yet?{' '}
            <Link href="/register" className="font-bold text-emerald-700 hover:underline">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
