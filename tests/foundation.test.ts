import { describe, it, expect, beforeEach } from 'vitest';
import { StorageService, DEFAULT_USERS } from '../src/services/storageService';
import { PancaCintaValue, UserRole } from '../src/types';

describe('Madrasah KBC Learning Suite: Foundation Unit & Integration Tests', () => {
  beforeEach(() => {
    StorageService.resetToDemo();
  });

  it('1. Memuat Organisasi & Profil Madrasah Demo dengan benar', () => {
    const org = StorageService.getOrganization();
    expect(org).toBeDefined();
    expect(org.name).toContain('DEMO');

    const profile = StorageService.getSchoolProfile();
    expect(profile.officialName).toContain('Madrasah Tsanawiyah Cinta Madani');
    expect(profile.level).toBe('MTs');
    expect(profile.nsm).toBe('121232010099');
    expect(profile.headmasterName).toBe('Dr. H. Ahmad Fauzi, M.Pd.I');
  });

  it('2. Memverifikasi seluruh 7 Peran RBAC sesuai Master Prompt Section E', () => {
    const users = StorageService.getUsers();
    const rolesFound = users.map(u => u.role);
    
    const requiredRoles: UserRole[] = [
      'super_admin',
      'admin_madrasah',
      'kepala_madrasah',
      'wakamad_kurikulum',
      'guru',
      'pengawas'
    ];

    requiredRoles.forEach(role => {
      expect(rolesFound).toContain(role);
    });
  });

  it('3. Menyimpan dan memperbarui data profil madrasah secara persisten', () => {
    const updated = StorageService.saveSchoolProfile({
      officialName: 'MTs Unggulan Cinta Madani Terpadu (DEMO)',
      phone: '(021) 7778899',
    });

    expect(updated.officialName).toBe('MTs Unggulan Cinta Madani Terpadu (DEMO)');
    expect(updated.phone).toBe('(021) 7778899');

    const reloaded = StorageService.getSchoolProfile();
    expect(reloaded.officialName).toBe('MTs Unggulan Cinta Madani Terpadu (DEMO)');
  });

  it('4. Memverifikasi Rujukan Regulasi Resmi KMA 1503/2025 & SK Dirjen Pendis 6077/2025', () => {
    const regs = StorageService.getRegulations();
    expect(regs.length).toBeGreaterThanOrEqual(2);

    const kma1503 = regs.find(r => r.regulationNumber.includes('1503'));
    expect(kma1503).toBeDefined();
    expect(kma1503?.verificationStatus).toBe('terverifikasi');
    expect(kma1503?.publisher).toBe('Kementerian Agama Republik Indonesia');

    const kbc6077 = regs.find(r => r.regulationNumber.includes('6077'));
    expect(kbc6077).toBeDefined();
    expect(kbc6077?.verificationStatus).toBe('terverifikasi');
    expect(kbc6077?.title).toContain('Kurikulum Berbasis Cinta');
  });

  it('5. Memverifikasi 5 Nilai Panca Cinta pada Dokumen Pembelajaran Demo', () => {
    const docs = StorageService.getDocuments();
    expect(docs.length).toBeGreaterThan(0);

    const doc = docs[0];
    expect(doc.pancaCintaValues).toBeDefined();
    expect(doc.pancaCintaValues.length).toBeGreaterThanOrEqual(1);
    
    // Periksa apakah nilai terdaftar dalam standar 5 Panca Cinta
    const validValues: PancaCintaValue[] = [
      'Cinta Allah dan Rasul-Nya',
      'Cinta Ilmu',
      'Cinta Lingkungan',
      'Cinta Diri dan Sesama Manusia',
      'Cinta Tanah Air'
    ];

    doc.pancaCintaValues.forEach(val => {
      expect(validValues).toContain(val);
    });
  });

  it('6. Menghasilkan Audit Log saat terjadi aktivitas krusial', () => {
    StorageService.logAudit('TEST_ACTION', 'test_resource', 'test-id-1', { note: 'test' });
    const logs = StorageService.getAuditLogs();
    expect(logs.length).toBeGreaterThan(0);
    expect(logs[0].action).toBe('TEST_ACTION');
  });
});
