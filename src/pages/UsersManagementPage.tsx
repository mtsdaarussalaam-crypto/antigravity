import React, { useState } from 'react';
import { useAuth } from '../features/auth/AuthContext';
import { StorageService } from '../services/storageService';
import { UserProfile, UserRole } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Users, UserPlus, Shield, Check, Search, Filter } from 'lucide-react';

export const UsersManagementPage: React.FC = () => {
  const { user: currentUser, role: currentRole, switchRole } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>(() => StorageService.getUsers());
  const [search, setSearch] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form New User
  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    role: 'guru' as UserRole,
    nip: '',
    nuptk: '',
    phone: '',
  });

  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.fullName.toLowerCase().includes(search.toLowerCase()) || 
                          u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = selectedRoleFilter === 'all' || u.role === selectedRoleFilter;
    return matchesSearch && matchesRole;
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.fullName || !newUser.email) return;

    const createdUser: UserProfile = {
      id: `user-${Date.now()}`,
      email: newUser.email,
      fullName: newUser.fullName,
      role: newUser.role,
      nip: newUser.nip || undefined,
      nuptk: newUser.nuptk || undefined,
      phone: newUser.phone || undefined,
      organizationId: currentUser.organizationId,
      organizationName: currentUser.organizationName,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    StorageService.saveUser(createdUser);
    setUsers(StorageService.getUsers());
    setIsAddModalOpen(false);
    setNewUser({ fullName: '', email: '', role: 'guru', nip: '', nuptk: '', phone: '' });
  };

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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Manajemen Pendidik & Tenaga Kependidikan</h2>
          <p className="text-xs text-slate-500 mt-1">
            Kelola akun, penugasan, dan hak akses berdasarkan prinsip Least Privilege (Section E Master Prompt).
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsAddModalOpen(true)}
          icon={<UserPlus className="w-4 h-4" />}
        >
          Tambah Pendidik / Staf
        </Button>
      </div>

      {/* FILTER & SEARCH */}
      <Card>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama atau email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-madrasah-600"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={selectedRoleFilter}
              onChange={(e) => setSelectedRoleFilter(e.target.value)}
              className="text-xs rounded-lg border border-slate-300 px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-madrasah-600"
            >
              <option value="all">Semua Peran (RBAC)</option>
              <option value="guru">Guru Mata Pelajaran</option>
              <option value="kepala_madrasah">Kepala Madrasah</option>
              <option value="wakamad_kurikulum">Wakamad Kurikulum</option>
              <option value="admin_madrasah">Admin Madrasah</option>
              <option value="pengawas">Pengawas Madrasah</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>
        </div>

        {/* USERS TABLE */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-y border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Nama Lengkap & NIP/NUPTK</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Peran Sistem</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Aksi Cepat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900">{u.fullName}</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {u.nip ? `NIP: ${u.nip}` : u.nuptk ? `NUPTK: ${u.nuptk}` : 'Non-NIP'}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">{u.email}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant={getRoleBadgeVariant(u.role)}>
                      {u.role.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      Aktif
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => switchRole(u.role)}
                      className="text-[11px] py-1"
                    >
                      Simulasi Masuk
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* MODAL TAMBAH USER */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Tambah Akun Pendidik / Staf Madrasah"
        subtitle="Data akun ini akan terikat pada organisasi madrasah aktif"
      >
        <form onSubmit={handleAddUser} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap & Gelar *</label>
            <input
              type="text"
              required
              value={newUser.fullName}
              onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
              className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
              placeholder="Contoh: Siti Rahmah, S.Pd.I"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Resmi *</label>
            <input
              type="email"
              required
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
              placeholder="nama@mtscintamadani.sch.id"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Peran / Hak Akses *</label>
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value as UserRole })}
              className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none bg-white"
            >
              <option value="guru">Guru Mata Pelajaran</option>
              <option value="kepala_madrasah">Kepala Madrasah</option>
              <option value="wakamad_kurikulum">Wakamad Kurikulum</option>
              <option value="admin_madrasah">Admin Madrasah</option>
              <option value="pengawas">Pengawas Madrasah</option>
              <option value="kolaborator">Guru Tamu / Kolaborator</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">NIP (jika ada)</label>
              <input
                type="text"
                value={newUser.nip}
                onChange={(e) => setNewUser({ ...newUser, nip: e.target.value })}
                className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">NUPTK</label>
              <input
                type="text"
                value={newUser.nuptk}
                onChange={(e) => setNewUser({ ...newUser, nuptk: e.target.value })}
                className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsAddModalOpen(false)}>
              Batal
            </Button>
            <Button variant="primary" size="sm" type="submit" icon={<Check className="w-4 h-4" />}>
              Simpan Akun
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
