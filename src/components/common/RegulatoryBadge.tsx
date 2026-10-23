import React from 'react';
import { VerificationStatus } from '../../types';
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

interface RegulatoryBadgeProps {
  status: VerificationStatus;
  showIcon?: boolean;
}

export const RegulatoryBadge: React.FC<RegulatoryBadgeProps> = ({ status, showIcon = true }) => {
  switch (status) {
    case 'terverifikasi':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
          {showIcon && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
          Terverifikasi Resmi
        </span>
      );
    case 'perlu_verifikasi':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
          {showIcon && <AlertCircle className="w-3.5 h-3.5 text-amber-600" />}
          Perlu Verifikasi Dokumen
        </span>
      );
    case 'tidak_berlaku':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
          {showIcon && <XCircle className="w-3.5 h-3.5 text-rose-600" />}
          Tidak Berlaku
        </span>
      );
    default:
      return null;
  }
};
