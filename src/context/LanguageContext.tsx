'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import locationsData from '@/data/locations.json';

// Import all 13 locales
import en from '@/locales/en.json';
import as from '@/locales/as.json';
import bn from '@/locales/bn.json';
import hi from '@/locales/hi.json';
import ta from '@/locales/ta.json';
import te from '@/locales/te.json';
import kn from '@/locales/kn.json';
import ml from '@/locales/ml.json';
import mr from '@/locales/mr.json';
import or from '@/locales/or.json';
import pa from '@/locales/pa.json';
import gu from '@/locales/gu.json';

const localeMap: Record<string, any> = {
  en, as, bn, hi, ta, te, kn, ml, mr, or, pa, gu
};

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (keyPath: string) => string;
  languages: Array<{ code: string; native: string; english: string }>;
  getLocalizedName: (namesObj: Record<string, string> | undefined, fallbackEn?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<string>('en');

  useEffect(() => {
    const saved = localStorage.getItem('farmer_docx_lang');
    if (saved && localeMap[saved]) {
      setLanguageState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLanguage = (newLang: string) => {
    if (localeMap[newLang]) {
      setLanguageState(newLang);
      localStorage.setItem('farmer_docx_lang', newLang);
      document.documentElement.lang = newLang;

      // Sync with user backend if logged in
      const token = localStorage.getItem('farmer_docx_token');
      if (token) {
        fetch('/api/auth/me', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ preferredLanguage: newLang })
        }).catch(() => {});
      }
    }
  };

  const t = (keyPath: string): string => {
    const keys = keyPath.split('.');
    let dict = localeMap[language] || localeMap.en;
    
    for (const k of keys) {
      if (dict && typeof dict === 'object' && k in dict) {
        dict = dict[k];
      } else {
        // Fallback to English
        let fallbackDict = localeMap.en;
        for (const fk of keys) {
          if (fallbackDict && typeof fallbackDict === 'object' && fk in fallbackDict) {
            fallbackDict = fallbackDict[fk];
          } else {
            return keyPath; // Return key string if missing in both
          }
        }
        return typeof fallbackDict === 'string' ? fallbackDict : keyPath;
      }
    }

    return typeof dict === 'string' ? dict : keyPath;
  };

  const getLocalizedName = (namesObj: Record<string, string> | undefined, fallbackEn: string = ''): string => {
    if (!namesObj) return fallbackEn;
    return namesObj[language] || namesObj.en || Object.values(namesObj)[0] || fallbackEn;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        languages: locationsData.languages,
        getLocalizedName
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
