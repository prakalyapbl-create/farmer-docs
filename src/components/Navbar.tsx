'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSelector from './LanguageSelector';
import {
  FileText,
  Home,
  LayoutDashboard,
  Bot,
  Phone,
  Settings,
  LogOut,
  User as UserIcon,
  Menu,
  X,
  CheckCircle2,
  ShieldAlert
} from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/agroweather-logo.jpg"
              alt="Agroweather Logo"
              className="w-10 h-10 object-cover rounded-xl shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform border border-emerald-100"
            />
            <div>
              <span className="text-xl font-black text-emerald-950 tracking-tight flex items-center gap-1">
                Agroweather <span className="text-emerald-600 text-sm font-bold">Docx</span>
              </span>
              <span className="block text-[10px] font-bold text-emerald-700 uppercase tracking-widest">
                Weather Intelligence & Agri Explainer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-emerald-700 transition-colors">
              {t('nav.home')}
            </Link>

            {user?.role === 'FARMER' && (
              <>
                <Link href="/farmer/dashboard" className="text-sm font-medium text-gray-700 hover:text-emerald-700 transition-colors">
                  {t('nav.dashboard')}
                </Link>
                <Link href="/farmer/documents" className="text-sm font-medium text-gray-700 hover:text-emerald-700 transition-colors">
                  {t('nav.documents')}
                </Link>
                <Link href="/farmer/assistant" className="text-sm font-medium text-gray-700 hover:text-emerald-700 transition-colors">
                  {t('nav.assistant')}
                </Link>
                <Link href="/farmer/repayment" className="text-sm font-medium text-gray-700 hover:text-emerald-700 transition-colors">
                  {t('nav.repayment')}
                </Link>
              </>
            )}

            {user?.role === 'AREA_ADMIN' && (
              <>
                <Link href="/admin/dashboard" className="text-sm font-bold text-amber-800 hover:text-amber-900">
                  {t('nav.adminDashboard')}
                </Link>
                <Link href="/admin/call-simulation" className="text-sm font-medium text-amber-700 hover:text-amber-800">
                  434 Simulator
                </Link>
              </>
            )}

            {user?.role === 'SUPER_ADMIN' && (
              <Link href="/super-admin/dashboard" className="text-sm font-bold text-purple-800 hover:text-purple-900">
                {t('nav.superAdmin')}
              </Link>
            )}

            <Link href="/rural-access/call-simulation" className="text-sm font-semibold text-amber-700 hover:text-amber-900 flex items-center gap-1">
              <Phone className="w-4 h-4 text-amber-600" />
              Call 434
            </Link>
          </nav>

          {/* Right Actions (Language + User Menu) */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSelector />

            {user ? (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs font-bold text-gray-900">{user.name}</div>
                  <div className="text-[10px] text-emerald-700 font-semibold uppercase">{user.role}</div>
                </div>
                <div className="flex items-center gap-1">
                  <Link
                    href={user.role === 'FARMER' ? '/farmer/settings' : user.role === 'AREA_ADMIN' ? '/admin/dashboard' : '/super-admin/dashboard'}
                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                    title={t('nav.settings')}
                  >
                    <Settings className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={logout}
                    className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                    title={t('nav.logout')}
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors"
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSelector />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-emerald-50"
          >
            {t('nav.home')}
          </Link>
          {user?.role === 'FARMER' && (
            <>
              <Link
                href="/farmer/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-emerald-50"
              >
                {t('nav.dashboard')}
              </Link>
              <Link
                href="/farmer/documents"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-emerald-50"
              >
                {t('nav.documents')}
              </Link>
              <Link
                href="/farmer/assistant"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-emerald-50"
              >
                {t('nav.assistant')}
              </Link>
            </>
          )}
          <Link
            href="/rural-access/call-simulation"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-bold text-amber-800 bg-amber-50"
          >
            📞 Call 434 Rural Simulator
          </Link>

          {!user ? (
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center px-4 py-2 text-sm font-semibold text-emerald-800 border border-emerald-300 rounded-lg"
              >
                {t('nav.login')}
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center px-4 py-2 text-sm font-bold text-white bg-emerald-700 rounded-lg"
              >
                {t('nav.register')}
              </Link>
            </div>
          ) : (
            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-800">{user.name}</span>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="text-sm text-red-600 font-bold"
              >
                {t('nav.logout')}
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
