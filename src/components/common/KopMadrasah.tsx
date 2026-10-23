import React from 'react';
import { SchoolProfile } from '../../types';

interface KopMadrasahProps {
  profile: SchoolProfile;
  className?: string;
  showBorder?: boolean;
}

export const KopMadrasah: React.FC<KopMadrasahProps> = ({
  profile,
  className = '',
  showBorder = true,
}) => {
  return (
    <div className={`bg-white p-4 select-none ${showBorder ? 'kop-border pb-3' : ''} ${className}`}>
      <div className="flex items-center justify-between gap-4">
        {/* Logo Kiri (Kemenag / Madrasah) */}
        <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-madrasah-50 border-2 border-madrasah-600 flex items-center justify-center text-madrasah-800 font-bold text-center text-xs p-1 shadow-sm">
            <span className="leading-tight">KEMENAG RI</span>
          </div>
        </div>

        {/* Identitas Teks Kop Surat */}
        <div className="flex-1 text-center font-serif text-slate-900 leading-tight">
          <p className="text-xs uppercase tracking-wider font-semibold text-slate-600">
            KEMENTERIAN AGAMA REPUBLIK INDONESIA
          </p>
          <p className="text-xs uppercase tracking-wider font-semibold text-slate-600">
            KANTOR KEMENTERIAN AGAMA {profile.regencyCity.toUpperCase()}
          </p>
          <h2 className="text-base sm:text-lg font-bold text-madrasah-900 tracking-normal mt-0.5 uppercase">
            {profile.officialName}
          </h2>
          <div className="flex items-center justify-center gap-3 text-[11px] font-sans text-slate-600 mt-1">
            {profile.nsm && <span>NSM: <strong>{profile.nsm}</strong></span>}
            {profile.nsm && profile.npsn && <span>•</span>}
            {profile.npsn && <span>NPSN: <strong>{profile.npsn}</strong></span>}
          </div>
          <p className="text-[11px] font-sans text-slate-500 mt-0.5">
            {profile.address}, Kel. {profile.village}, Kec. {profile.district}, {profile.regencyCity}, {profile.province} {profile.postalCode ? `Kode Pos ${profile.postalCode}` : ''}
          </p>
          <p className="text-[10px] font-sans text-slate-400 mt-0.5">
            {profile.phone && `Telp: ${profile.phone}`} {profile.email && `| Email: ${profile.email}`} {profile.website && `| Web: ${profile.website}`}
          </p>
        </div>

        {/* Logo Kanan (Logo Khusus Madrasah / KBC) */}
        <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-gold-50 border-2 border-gold-500 flex items-center justify-center text-gold-900 font-bold text-center text-xs p-1 shadow-sm">
            <span className="leading-tight text-[10px]">KURIKULUM BERBASIS CINTA</span>
          </div>
        </div>
      </div>
    </div>
  );
};
