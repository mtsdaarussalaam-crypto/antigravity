import React, { useState } from 'react';
import { useAuth } from '../features/auth/AuthContext';
import { SchoolProfile, EducationLevel, SchoolStatus } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { KopMadrasah } from '../components/common/KopMadrasah';
import { Building2, Save, Printer, ShieldCheck } from 'lucide-react';

export const SchoolProfilePage: React.FC = () => {
  const { schoolProfile, updateSchoolProfile, role } = useAuth();
  const [formData, setFormData] = useState<SchoolProfile>(schoolProfile);
  const [isSaved, setIsSaved] = useState(false);

  const isEditable = role === 'super_admin' || role === 'admin_madrasah' || role === 'kepala_madrasah';

  const handleChange = (field: keyof SchoolProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSchoolProfile(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handlePrintKop = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Identitas Resmi & Kop Dokumen Madrasah</h2>
          <p className="text-xs text-slate-500 mt-1">
            Data ini digunakan sebagai header legalitas pada seluruh berkas perencanaan (Modul Ajar, Prota, Promes, Asesmen).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrintKop}
            icon={<Printer className="w-4 h-4" />}
          >
            Cetak / Pratinjau Kop
          </Button>
          {isEditable && (
            <Button
              variant="primary"
              size="sm"
              onClick={handleSubmit}
              icon={<Save className="w-4 h-4" />}
            >
              Simpan Profil
            </Button>
          )}
        </div>
      </div>

      {isSaved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-medium flex items-center gap-2 animate-fade-in">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Profil madrasah dan kop resmi berhasil disimpan dan diperbarui di seluruh modul!
        </div>
      )}

      {/* PRATINJAU KOP RESMI */}
      <Card title="Pratinjau Resmi Kop Dokumen Madrasah (KMA 1503/2025)">
        <div className="border border-slate-300 rounded-xl overflow-hidden shadow-2xs">
          <KopMadrasah profile={formData} />
        </div>
      </Card>

      {/* EDIT FORM */}
      <form onSubmit={handleSubmit}>
        <Card title="Formulir Data Legalitas Satuan Pendidikan">
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Resmi Madrasah *</label>
                <input
                  type="text"
                  disabled={!isEditable}
                  value={formData.officialName}
                  onChange={(e) => handleChange('officialName', e.target.value)}
                  className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none disabled:bg-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Jenjang Pendidikan *</label>
                <select
                  disabled={!isEditable}
                  value={formData.level}
                  onChange={(e) => handleChange('level', e.target.value as EducationLevel)}
                  className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none bg-white disabled:bg-slate-100"
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
                  disabled={!isEditable}
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value as SchoolStatus)}
                  className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none bg-white disabled:bg-slate-100"
                >
                  <option value="swasta">Swasta</option>
                  <option value="negeri">Negeri</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nomor Statistik Madrasah (NSM)</label>
                <input
                  type="text"
                  disabled={!isEditable}
                  value={formData.nsm || ''}
                  onChange={(e) => handleChange('nsm', e.target.value)}
                  className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none disabled:bg-slate-100 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">NPSN</label>
                <input
                  type="text"
                  disabled={!isEditable}
                  value={formData.npsn || ''}
                  onChange={(e) => handleChange('npsn', e.target.value)}
                  className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none disabled:bg-slate-100 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Format Penomoran Dokumen</label>
                <input
                  type="text"
                  disabled={!isEditable}
                  value={formData.docNumberFormat}
                  onChange={(e) => handleChange('docNumberFormat', e.target.value)}
                  className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none disabled:bg-slate-100 font-mono"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-semibold text-slate-800 mb-3">Pimpinan & Pejabat Pengesah Dokumen</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap Kepala Madrasah *</label>
                  <input
                    type="text"
                    disabled={!isEditable}
                    value={formData.headmasterName}
                    onChange={(e) => handleChange('headmasterName', e.target.value)}
                    className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none disabled:bg-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">NIP Kepala Madrasah (Opsional)</label>
                  <input
                    type="text"
                    disabled={!isEditable}
                    value={formData.headmasterNip || ''}
                    onChange={(e) => handleChange('headmasterNip', e.target.value)}
                    className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none disabled:bg-slate-100 font-mono"
                    placeholder="Kosongkan jika bukan PNS"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-semibold text-slate-800 mb-3">Alamat & Kontak Resmi</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="sm:col-span-2 md:col-span-3">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Alamat Jalan</label>
                  <input
                    type="text"
                    disabled={!isEditable}
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none disabled:bg-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Kabupaten / Kota</label>
                  <input
                    type="text"
                    disabled={!isEditable}
                    value={formData.regencyCity}
                    onChange={(e) => handleChange('regencyCity', e.target.value)}
                    className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none disabled:bg-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Provinsi</label>
                  <input
                    type="text"
                    disabled={!isEditable}
                    value={formData.province}
                    onChange={(e) => handleChange('province', e.target.value)}
                    className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none disabled:bg-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Resmi</label>
                  <input
                    type="email"
                    disabled={!isEditable}
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none disabled:bg-slate-100"
                  />
                </div>
              </div>
            </div>

            {isEditable && (
              <div className="pt-4 flex justify-end">
                <Button variant="primary" size="md" type="submit" icon={<Save className="w-4 h-4" />}>
                  Simpan Perubahan
                </Button>
              </div>
            )}
          </div>
        </Card>
      </form>
    </div>
  );
};
