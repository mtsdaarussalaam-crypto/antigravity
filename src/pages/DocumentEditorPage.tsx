import React, { useState, useEffect } from 'react';
import { useAuth } from '../features/auth/AuthContext';
import { StorageService } from '../services/storageService';
import { ExportService } from '../services/exportService';
import { 
  LearningDocument, 
  ModulAjarContent, 
  DocumentVersion, 
  DocumentReview, 
  PancaCintaValue,
  DocumentStatus
} from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { KopMadrasah } from '../components/common/KopMadrasah';
import { PancaCintaBadge } from '../components/common/PancaCintaBadge';
import { 
  Save, 
  Printer, 
  FileDown, 
  Clock, 
  History, 
  FileCheck2, 
  AlertCircle, 
  CheckCircle2, 
  ArrowLeft,
  Sparkles,
  FileText
} from 'lucide-react';

interface DocumentEditorPageProps {
  documentId?: string;
  onBack: () => void;
}

export const DocumentEditorPage: React.FC<DocumentEditorPageProps> = ({
  documentId,
  onBack,
}) => {
  const { user, schoolProfile } = useAuth();
  const allDocs = StorageService.getDocuments();
  const initialDoc = allDocs.find(d => d.id === documentId) || allDocs[0];

  const [doc, setDoc] = useState<LearningDocument>(initialDoc);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'versions' | 'review'>('editor');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');
  const [versions, setVersions] = useState<DocumentVersion[]>([
    {
      id: 'ver-1',
      documentId: doc.id,
      versionNumber: 1,
      content: doc.content,
      changedBy: doc.authorName,
      changeSummary: 'Draf Awal Dokumen Pembelajaran KBC',
      createdAt: doc.createdAt,
    },
  ]);

  const content = doc.content as ModulAjarContent;

  const handleUpdateField = (field: keyof LearningDocument, value: any) => {
    setSaveStatus('saving');
    const updated: LearningDocument = {
      ...doc,
      [field]: value,
      updatedAt: new Date().toISOString(),
    };
    setDoc(updated);
    setTimeout(() => {
      StorageService.saveDocument(updated);
      setSaveStatus('saved');
    }, 600);
  };

  const handleUpdateContent = (path: string, value: any) => {
    setSaveStatus('saving');
    const updatedContent = { ...doc.content };
    // Update nested property
    if (path === 'pemahamanBermakna') updatedContent.pemahamanBermakna = value;
    else if (path === 'tujuanPembelajaran') updatedContent.tujuanPembelajaran = [value];
    
    const updatedDoc: LearningDocument = {
      ...doc,
      content: updatedContent,
      updatedAt: new Date().toISOString(),
    };
    setDoc(updatedDoc);
    setTimeout(() => {
      StorageService.saveDocument(updatedDoc);
      setSaveStatus('saved');
    }, 600);
  };

  const handleCreateNewVersion = () => {
    const nextVer = doc.versionNumber + 1;
    const newVersion: DocumentVersion = {
      id: `ver-${Date.now()}`,
      documentId: doc.id,
      versionNumber: nextVer,
      content: doc.content,
      changedBy: user.fullName,
      changeSummary: `Revisi dan pemutakhiran versi ${nextVer}.0 oleh ${user.fullName}`,
      createdAt: new Date().toISOString(),
    };

    const updatedDoc: LearningDocument = {
      ...doc,
      versionNumber: nextVer,
      updatedAt: new Date().toISOString(),
    };

    setVersions([newVersion, ...versions]);
    setDoc(updatedDoc);
    StorageService.saveDocument(updatedDoc);
  };

  const handleExportDOCX = () => {
    ExportService.downloadDocx(doc, schoolProfile);
  };

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(doc, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title.replace(/[^a-zA-Z0-9]/g, '_')}_v${doc.versionNumber}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* HEADER WITH ACTIONS & AUTOSAVE STATUS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={onBack} icon={<ArrowLeft className="w-4 h-4" />}>
            Kembali
          </Button>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-800 truncate max-w-md">{doc.title}</h2>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                v{doc.versionNumber}.0
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
              <span>Penyusun: <strong>{doc.authorName}</strong></span>
              <span>•</span>
              <span className="flex items-center gap-1 font-medium text-emerald-700">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                {saveStatus === 'saving' ? 'Menyimpan...' : 'Tersimpan Otomatis'}
              </span>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" onClick={() => window.print()} icon={<Printer className="w-4 h-4" />}>
            Cetak PDF
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportDOCX} icon={<FileDown className="w-4 h-4" />}>
            Ekspor DOCX
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportJSON} icon={<FileText className="w-4 h-4" />}>
            Cadangan JSON
          </Button>
          <Button variant="primary" size="sm" onClick={handleCreateNewVersion} icon={<History className="w-4 h-4" />}>
            Simpan Versi Baru
          </Button>
        </div>
      </div>

      {/* TABS */}
      <div className="flex border-b border-slate-200 gap-2 text-xs">
        {[
          { id: 'editor', label: 'Penyunting Terpadu (Editor)' },
          { id: 'preview', label: 'Pratinjau Resmi (Kop Madrasah)' },
          { id: 'versions', label: `Riwayat Versi (${versions.length})` },
          { id: 'review', label: 'Catatan Supervisi & Pengesahan' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`py-2.5 px-4 font-semibold border-b-2 transition ${
              activeTab === t.id
                ? 'border-madrasah-700 text-madrasah-800'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: RICH EDITOR */}
      {activeTab === 'editor' && (
        <div className="space-y-4">
          <Card title="Identitas & Judul Perangkat">
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Judul Perangkat Pembelajaran *</label>
                <input
                  type="text"
                  value={doc.title}
                  onChange={(e) => handleUpdateField('title', e.target.value)}
                  className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 font-semibold focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Topik Pokok</label>
                  <input
                    type="text"
                    value={doc.topic || ''}
                    onChange={(e) => handleUpdateField('topic', e.target.value)}
                    className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mata Pelajaran</label>
                  <input
                    type="text"
                    disabled
                    value={doc.subjectName}
                    className="w-full text-xs rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Alokasi Waktu</label>
                  <input
                    type="text"
                    value={doc.timeAllocation || '4 JP'}
                    onChange={(e) => handleUpdateField('timeAllocation', e.target.value)}
                    className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card title="Tujuan & Pemahaman Bermakna (Deep Learning)">
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tujuan Pembelajaran (TP)</label>
                <textarea
                  rows={2}
                  value={content?.tujuanPembelajaran?.[0] || ''}
                  onChange={(e) => handleUpdateContent('tujuanPembelajaran', e.target.value)}
                  className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Pemahaman Bermakna (Meaningful Learning)</label>
                <textarea
                  rows={2}
                  value={content?.pemahamanBermakna || ''}
                  onChange={(e) => handleUpdateContent('pemahamanBermakna', e.target.value)}
                  className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
                />
              </div>
            </div>
          </Card>

          <Card title="Fokus Nilai Panca Cinta (SK Dirjen Pendis 6077/2025)">
            <div className="flex flex-wrap gap-2">
              {doc.pancaCintaValues.map((val) => (
                <PancaCintaBadge key={val} value={val} size="md" />
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* TAB 2: PRATINJAU RESMI CETAK */}
      {activeTab === 'preview' && (
        <Card>
          <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-6">
            <KopMadrasah profile={schoolProfile} />
            <div className="text-center space-y-1">
              <h3 className="text-base font-bold uppercase">{doc.title}</h3>
              <p className="text-xs text-slate-500 font-serif">KMA 1503/2025 & SK Dirjen Pendis 6077/2025</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl text-xs space-y-2">
              <p><strong>Penyusun:</strong> {doc.authorName}</p>
              <p><strong>Mata Pelajaran:</strong> {doc.subjectName} ({doc.className || 'Kelas VII'})</p>
              <p><strong>Pemahaman Bermakna:</strong> {content?.pemahamanBermakna}</p>
              <p><strong>Tujuan Pembelajaran:</strong> {content?.tujuanPembelajaran?.join('; ')}</p>
            </div>
          </div>
        </Card>
      )}

      {/* TAB 3: RIWAYAT VERSI */}
      {activeTab === 'versions' && (
        <Card title="Riwayat Versi Dokumen (Audit Trail Section P)">
          <div className="divide-y divide-slate-100 text-xs">
            {versions.map((ver) => (
              <div key={ver.id} className="py-3.5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">Versi {ver.versionNumber}.0</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(ver.createdAt).toLocaleString('id-ID')}
                    </span>
                  </div>
                  <p className="text-slate-600 mt-0.5">{ver.changeSummary}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Oleh: <strong>{ver.changedBy}</strong></p>
                </div>
                <Badge variant="success">Tersimpan</Badge>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB 4: REVIEW & PERSETUJUAN */}
      {activeTab === 'review' && (
        <Card title="Status Supervisi & Pengesahan Pimpinan">
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-700">Status Saat Ini:</span>
                <Badge variant={doc.status === 'approved' ? 'success' : doc.status === 'ready_for_review' ? 'warning' : 'default'}>
                  {doc.status.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
              <span className="text-slate-500 font-mono text-[11px]">
                Versi Aktif: v{doc.versionNumber}.0
              </span>
            </div>

            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Ketentuan Pengesahan (Section P Master Prompt)
              </p>
              <p className="text-[11px] leading-relaxed">
                Pengesahan dokumen dilakukan oleh Kepala Madrasah atau Wakamad Kurikulum melalui panel Supervisi. 
                Persetujuan menghasilkan stempel sah digital dan snapshot identitas resmi tanpa mengubah dokumen lama secara diam-diam.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
