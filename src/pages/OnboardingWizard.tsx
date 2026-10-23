import React, { useState } from 'react';
import { useAuth } from '../features/auth/AuthContext';
import { SchoolProfile, EducationLevel, SchoolStatus } from '../types';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { KopMadrasah } from '../components/common/KopMadrasah';
import { Check, ArrowRight, ArrowLeft, School, MapPin, UserCheck, Calendar } from 'lucide-react';

interface OnboardingWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ isOpen, onClose }) => {
  const { schoolProfile, updateSchoolProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<SchoolProfile>(schoolProfile);

  const handleChange = (field: keyof SchoolProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateSchoolProfile(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Wizard Konfigurasi Madrasah"
      subtitle="Sesuaikan profil resmi madrasah, kop surat, dan pimpinan sesuai KMA 1503/2025"
      maxWidth="4xl"
    >
      {/* Steps Indicator */}
      <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
        {[
          { num: 1, title: 'Identitas Resmi', icon: <School className="w-4 h-4" /> },
          { num: 2, title: 'Alamat & Kontak', icon: <MapPin className="w-4 h-4" /> },
          { num: 3, title: 'Kepala Madrasah & Kop', icon: <UserCheck className="w-4 h-4" /> },
          { num: 4, title: 'Konfirmasi & Pratinjau', icon: <Check className="w-4 h-4" /> },
        ].map((s) => (
          <div key={s.num} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition ${
                step === s.num
                  ? 'bg-madrasah-700 text-white shadow-md shadow-madrasah-700/20'
                  : step > s.num
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              {step > s.num ? <Check className="w-4 h-4" /> : s.num}
            </div>
            <span className={`text-xs font-medium hidden sm:inline ${step === s.num ? 'text-slate-900 font-semibold' : 'text-slate-500'}`}>
              {s.title}
            </span>
          </div>
        ))}
      </div>

      {/* STEP 1: IDENTITAS RESMI */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Resmi Madrasah *</label>
              <input
                type="text"
                value={formData.officialName}
                onChange={(e) => handleChange('officialName', e.target.value)}
                className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
                placeholder="Contoh: Madrasah Tsanawiyah Negeri 1 Jakarta"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Jenjang Pendidikan *</label>
              <select
                value={formData.level}
                onChange={(e) => handleChange('level', e.target.value as EducationLevel)}
                className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none bg-white"
              >
                <option value="RA">Raudhatul Athfal (RA)</option>
                <option value="MI">Madrasah Ibtidaiyah (MI)</option>
                <option value="MTs">Madrasah Tsanawiyah (MTs)</option>
                <option value="MA">Madrasah Aliyah (MA)</option>
                <option value="MAK">Madrasah Aliyah Kejuruan (MAK)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Status Madrasah *</label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value as SchoolStatus)}
                className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none bg-white"
              >
                <option value="swasta">Swasta</option>
                <option value="negeri">Negeri</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nomor Statistik Madrasah (NSM)</label>
              <input
                type="text"
                value={formData.nsm || ''}
                onChange={(e) => handleChange('nsm', e.target.value)}
                className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
                placeholder="Contoh: 121232010099"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">NPSN</label>
              <input
                type="text"
                value={formData.npsn || ''}
                onChange={(e) => handleChange('npsn', e.target.value)}
                className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
                placeholder="Contoh: 69987654"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Format Penomoran Dokumen</label>
              <input
                type="text"
                value={formData.docNumberFormat}
                onChange={(e) => handleChange('docNumberFormat', e.target.value)}
                className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none font-mono"
                placeholder="{nomor}/MADRASAH/{kode}/{bulan}/{tahun}"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: ALAMAT & KONTAK */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Alamat Lengkap / Jalan *</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
              placeholder="Contoh: Jl. Moderasi Beragama No. 1945"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Kelurahan / Desa</label>
              <input
                type="text"
                value={formData.village}
                onChange={(e) => handleChange('village', e.target.value)}
                className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Kecamatan</label>
              <input
                type="text"
                value={formData.district}
                onChange={(e) => handleChange('district', e.target.value)}
                className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Kabupaten / Kota *</label>
              <input
                type="text"
                value={formData.regencyCity}
                onChange={(e) => handleChange('regencyCity', e.target.value)}
                className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Provinsi *</label>
              <input
                type="text"
                value={formData.province}
                onChange={(e) => handleChange('province', e.target.value)}
                className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Telepon</label>
              <input
                type="text"
                value={formData.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Resmi *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Website</label>
              <input
                type="text"
                value={formData.website || ''}
                onChange={(e) => handleChange('website', e.target.value)}
                className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: KEPALA MADRASAH & LEGALITAS */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap Kepala Madrasah (beserta Gelar) *</label>
              <input
                type="text"
                value={formData.headmasterName}
                onChange={(e) => handleChange('headmasterName', e.target.value)}
                className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
                placeholder="Contoh: Dr. H. Ahmad Fauzi, M.Pd.I"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">NIP Kepala Madrasah (jika ada)</label>
              <input
                type="text"
                value={formData.headmasterNip || ''}
                onChange={(e) => handleChange('headmasterNip', e.target.value)}
                className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none font-mono"
                placeholder="Contoh: 197508172002121003 atau kosongkan jika swasta"
              />
            </div>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200">
            <h4 className="text-xs font-semibold text-amber-900">Perhatian Kepatuhan Regulasi (Section F):</h4>
            <p className="text-xs text-amber-800 mt-1">
              Data pimpinan dan identitas resmi ini otomatis menjadi kop resmi dokumen pembelajaran (Modul Ajar, ATP, RPP, Rubrik). 
              Jangan mengarang NIP jika kepala madrasah berstatus non-PNS/yayasan.
            </p>
          </div>
        </div>
      )}

      {/* STEP 4: PRATINJAU KOP SURAT */}
      {step === 4 && (
        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-semibold text-slate-700 mb-2">Pratinjau Resmi Kop Dokumen Madrasah</h4>
            <div className="border border-slate-300 rounded-xl overflow-hidden shadow-xs">
              <KopMadrasah profile={formData} />
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <p><strong>Jenjang Aktif:</strong> {formData.level} ({formData.status === 'negeri' ? 'Negeri' : 'Swasta'})</p>
            <p><strong>Kepala Madrasah:</strong> {formData.headmasterName} {formData.headmasterNip ? `(NIP. ${formData.headmasterNip})` : '(Non-PNS)'}</p>
            <p><strong>Format Nomor:</strong> {formData.docNumberFormat}</p>
          </div>
        </div>
      )}

      {/* MODAL NAVIGATION FOOTER */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6">
        {step > 1 ? (
          <Button variant="outline" size="sm" onClick={() => setStep(step - 1)} icon={<ArrowLeft className="w-4 h-4" />}>
            Kembali
          </Button>
        ) : <div />}

        {step < 4 ? (
          <Button variant="primary" size="sm" onClick={() => setStep(step + 1)} icon={<ArrowRight className="w-4 h-4" />}>
            Lanjut
          </Button>
        ) : (
          <Button variant="gold" size="sm" onClick={handleSave} icon={<Check className="w-4 h-4" />}>
            Simpan & Terapkan Profil
          </Button>
        )}
      </div>
    </Modal>
  );
};
