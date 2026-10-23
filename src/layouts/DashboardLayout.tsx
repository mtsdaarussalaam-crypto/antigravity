import React, { useState } from 'react';
import { useAuth } from '../features/auth/AuthContext';
import { UserRole } from '../types';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  GraduationCap, 
  FileText, 
  BookMarked, 
  ShieldCheck, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown,
  Sparkles,
  School,
  FileCheck2,
  Bell,
  RefreshCw,
  FileQuestion,
  BarChart3,
  Layers,
  Heart
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenOnboarding: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeTab,
  setActiveTab,
  onOpenOnboarding,
}) => {
  const { user, role, schoolProfile, switchRole, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const rolesList: { id: UserRole; label: string; desc: string }[] = [
    { id: 'guru', label: 'Guru Mata Pelajaran', desc: 'Pembuat perangkat, KBC & asesmen' },
    { id: 'kepala_madrasah', label: 'Kepala Madrasah', desc: 'Supervisi, monitoring & persetujuan' },
    { id: 'wakamad_kurikulum', label: 'Wakamad Kurikulum', desc: 'Pemeriksaan perangkat & kalender' },
    { id: 'admin_madrasah', label: 'Admin Madrasah', desc: 'Kelola guru, kelas & profil' },
    { id: 'super_admin', label: 'Super Admin', desc: 'Konfigurasi global sistem' },
    { id: 'pengawas', label: 'Pengawas Madrasah', desc: 'Telaah pembinaan eksternal' },
  ];

  const navItems = [
    { id: 'dashboard', label: 'Dashboard Utama', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'generator', label: 'Generator Perangkat KBC', icon: <Sparkles className="w-5 h-5 text-gold-400" /> },
    { id: 'editor', label: 'Editor Perangkat', icon: <FileText className="w-5 h-5" /> },
    { id: 'curriculum', label: 'Kurikulum (CP, TP, ATP)', icon: <BookMarked className="w-5 h-5" /> },
    { id: 'assessment-bank', label: 'Bank Soal & Asesmen', icon: <FileQuestion className="w-5 h-5" /> },
    { id: 'cocurricular', label: 'Kokurikuler (P5-PPRA)', icon: <Layers className="w-5 h-5" /> },
    { id: 'supervision', label: 'Supervisi & Persetujuan', icon: <FileCheck2 className="w-5 h-5 text-emerald-600" /> },
    { id: 'documents', label: 'Bank Perangkat Ajar', icon: <FileText className="w-5 h-5" /> },
    { id: 'reports', label: 'Laporan & Rekapitulasi', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'pancacinta', label: 'KBC & Deep Learning', icon: <Heart className="w-5 h-5 text-rose-500" /> },
    { id: 'regulations', label: 'Referensi Regulasi', icon: <ShieldCheck className="w-5 h-5" /> },
    { id: 'academic', label: 'Tahun Ajaran & Kelas', icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'users', label: 'Guru & Pengguna', icon: <Users className="w-5 h-5" /> },
    { id: 'school-profile', label: 'Profil & Kop Madrasah', icon: <Building2 className="w-5 h-5" /> },
  ];

  const getRoleBadgeVariant = (r: UserRole) => {
    switch (r) {
      case 'super_admin': return 'danger';
      case 'kepala_madrasah': return 'gold';
      case 'admin_madrasah': return 'emerald';
      case 'wakamad_kurikulum': return 'info';
      case 'pengawas': return 'warning';
      default: return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* TOP HEADER */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo & Brand */}
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-madrasah-700 to-madrasah-900 flex items-center justify-center text-white shadow-md shadow-madrasah-800/20 font-bold text-lg">
                <School className="w-5 h-5 text-gold-400" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-slate-900 text-sm tracking-tight">MADRASAH KBC</span>
                  <span className="text-[10px] font-semibold bg-gold-100 text-gold-900 px-1.5 py-0.2 rounded border border-gold-300">
                    KMA 1503/2025
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium truncate max-w-[190px] sm:max-w-xs">
                  {schoolProfile.officialName}
                </p>
              </div>
            </div>
          </div>

          {/* Right Header: Role Switcher & User Profile */}
          <div className="flex items-center gap-3">
            {/* Quick Onboarding Button */}
            <button
              onClick={onOpenOnboarding}
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-medium text-madrasah-800 bg-madrasah-50 hover:bg-madrasah-100 border border-madrasah-200 px-3 py-1.5 rounded-lg transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-madrasah-600" />
              Wizard Madrasah
            </button>

            {/* Role Switcher Pill (Interactive Demo Feature) */}
            <div className="relative">
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-white text-xs font-medium transition"
              >
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Peran Aktif</span>
                  <span className="text-slate-800 font-semibold capitalize flex items-center gap-1">
                    {role.replace('_', ' ')}
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </span>
                </div>
              </button>

              {isRoleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-xl bg-white shadow-xl border border-slate-200 p-2 z-50">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-800">Simulasi Hak Akses (RBAC)</p>
                    <p className="text-[11px] text-slate-500">Pilih peran untuk menguji izin dan tampilan</p>
                  </div>
                  <div className="py-1">
                    {rolesList.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => {
                          switchRole(r.id);
                          setIsRoleDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs transition flex flex-col ${
                          role === r.id
                            ? 'bg-madrasah-50 text-madrasah-900 font-semibold'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span className="capitalize flex items-center justify-between">
                          {r.label}
                          {role === r.id && <span className="text-madrasah-600 text-xs">● Aktif</span>}
                        </span>
                        <span className="text-[10px] text-slate-400 font-normal">{r.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Avatar & Logout */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-madrasah-100 text-madrasah-800 font-bold text-xs flex items-center justify-center border border-madrasah-200">
                {user.fullName.charAt(0)}
              </div>
              <div className="hidden xl:block text-left">
                <p className="text-xs font-semibold text-slate-800 leading-none truncate max-w-[130px]">
                  {user.fullName}
                </p>
                <p className="text-[10px] text-slate-400 leading-none mt-1">
                  {user.email}
                </p>
              </div>
              <button
                onClick={logout}
                title="Keluar"
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* BODY WITH SIDEBAR & CONTENT */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6">
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-3 shadow-xs sticky top-24 space-y-1">
            <div className="px-3 py-2">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Navigasi Utama</p>
            </div>

            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition ${
                  activeTab === item.id
                    ? 'bg-madrasah-700 text-white shadow-sm shadow-madrasah-700/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}

            {/* Quick Status Box */}
            <div className="pt-4 mt-4 border-t border-slate-100 px-3">
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/70">
                <div className="flex items-center gap-2 text-xs font-semibold text-madrasah-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Kepatuhan Regulasi
                </div>
                <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                  Kurikulum Berbasis Cinta & Deep Learning aktif sesuai KMA 1503/2025.
                </p>
                <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-500 font-medium">
                  <span>Status Basis Data:</span>
                  <span className="text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded font-semibold">
                    Lokal Terverifikasi
                  </span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* MOBILE DRAWER */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs flex">
            <div className="w-72 bg-white h-full p-4 flex flex-col shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="font-bold text-sm text-madrasah-900">Menu Madrasah KBC</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 rounded-lg text-slate-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="py-4 space-y-1 flex-1 overflow-y-auto">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                      activeTab === item.id
                        ? 'bg-madrasah-700 text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200/80 py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>
            © 2026 <strong>Madrasah KBC Learning Suite</strong> • Berdasarkan KMA Nomor 1503 Tahun 2025 & SK Dirjen Pendis Nomor 6077 Tahun 2025.
          </p>
          <p className="text-slate-400">
            Perangkat Pembelajaran Lengkap, Bermakna, Mendalam, dan Berbasis Cinta.
          </p>
        </div>
      </footer>
    </div>
  );
};
