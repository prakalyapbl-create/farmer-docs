'use client';

import React from 'react';
import { ShieldCheck, AlertTriangle, ShieldAlert, HelpCircle } from 'lucide-react';

interface AuthenticityBadgeProps {
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'UNKNOWN';
  detectedCount?: number;
}

export default function AuthenticityBadge({ riskLevel, detectedCount = 0 }: AuthenticityBadgeProps) {
  switch (riskLevel) {
    case 'LOW':
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold shadow-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>No Obvious Issues Detected</span>
        </div>
      );
    case 'MEDIUM':
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold shadow-sm">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>Possible Inconsistencies ({detectedCount} Indicators)</span>
        </div>
      );
    case 'HIGH':
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-900 border border-rose-300 text-xs font-bold shadow-sm">
          <ShieldAlert className="w-4 h-4 text-rose-600" />
          <span>Needs Manual Verification ({detectedCount} High Risk Indicators)</span>
        </div>
      );
    default:
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-800 border border-gray-300 text-xs font-bold">
          <HelpCircle className="w-4 h-4 text-gray-500" />
          <span>Unable to Assess Authenticity</span>
        </div>
      );
  }
}
