import React, { useState } from 'react';
import { useAuth } from '../features/auth/AuthContext';
import { StorageService } from '../services/storageService';
import { ExportService } from '../services/exportService';
import { LearningDocument, DocumentStatus, DocumentReview } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { PancaCintaBadge } from '../components/common/PancaCintaBadge';
import { 
  FileCheck2, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Eye, 
  MessageSquare, 
  ShieldCheck, 
  FileDown,
  Printer
} from 'lucide-react';

export const SupervisionApprovalPage: React.FC = () => {
  const { user, schoolProfile, role } = useAuth();
  const [documents, setDocuments] = useState<LearningDocument[]>(() => StorageService.getDocuments());
  const [selectedDoc, setSelectedDoc] = useState<LearningDocument | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Review Form
  const [reviewComments, setReviewComments] = useState('');
  const [complianceScore, setComplianceScore] = useState(90);
  const [pancacintaScore, setPancacintaScore] = useState(95);
  const [deepLearningScore, setDeepLearningScore] = useState(90);

  const canApprove = role === 'super_admin' || role === 'kepala_madrasah' || role === 'admin_madrasah';

  const handleOpenReview = (doc: LearningDocument) => {
    setSelectedDoc(doc);
    setReviewComments('');
    setIsReviewModalOpen(true);
  };

  const handleApprove = () => {
    if (!selectedDoc) return;
    const approvedDoc: LearningDocument = {
      ...selectedDoc,
      status: 'approved',
      updatedAt: new Date().toISOString(),
    };
    StorageService.saveDocument(approvedDoc);
    StorageService.logAudit('APPROVE_DOCUMENT', 'learning_documents', approvedDoc.id, {
      approvedBy: user.fullName,
      complianceScore,
    });
    setDocuments(StorageService.getDocuments());
    setIsReviewModalOpen(false);
  };

  const handleRequestRevision = () => {
    if (!selectedDoc) return;
    const revisionDoc: LearningDocument = {
      ...selectedDoc,
      status: 'needs_revision',
      updatedAt: new Date().toISOString(),
    };
    StorageService.saveDocument(revisionDoc);
    StorageService.logAudit('REQUEST_REVISION', 'learning_documents', revisionDoc.id, {
      comments: reviewComments,
    });
    setDocuments(StorageService.getDocuments());
    setIsReviewModalOpen(false);
  };

  const getStatusBadge = (status: DocumentStatus) => {
    switch (status) {
      case 'approved':
        return <Badge variant="success">Disetujui Sah</Badge>;
      case 'ready_for_review':
        return <Badge variant="warning">Siap Ditinjau</Badge>;
      case 'needs_revision':
        return <Badge variant="danger">Perlu Revisi</Badge>;
      default:
        return <Badge variant="default">Draf Awal</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Supervisi & Pengesahan Perangkat Pembelajaran</h2>
          <p className="text-xs text-slate-500 mt-1">
            Panel penelaahan, catatan supervisi, dan pengesahan resmi oleh Kepala Madrasah & Wakamad Kurikulum (Section P Master Prompt).
          </p>
        </div>
      </div>

      <Card title="Daftar Perangkat Pembelajaran yang Diajukan">
        <div className="divide-y divide-slate-100">
          {documents.map((doc) => (
            <div key={doc.id} className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/50 p-2 rounded-xl transition">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-slate-900">{doc.title}</span>
                  <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">
                    {doc.subjectName}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">v{doc.versionNumber}.0</span>
                </div>
                <p className="text-xs text-slate-500">
                  Guru: <strong>{doc.authorName}</strong> • Alokasi: {doc.timeAllocation || '4 JP'} • Diperbarui: {new Date(doc.updatedAt).toLocaleDateString('id-ID')}
                </p>
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  {doc.pancaCintaValues.map((val) => (
                    <PancaCintaBadge key={val} value={val} size="sm" />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {getStatusBadge(doc.status)}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenReview(doc)}
                  icon={<Eye className="w-3.5 h-3.5" />}
                  className="text-xs"
                >
                  Telaah Dokumen
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => ExportService.downloadDocx(doc, schoolProfile)}
                  icon={<FileDown className="w-3.5 h-3.5" />}
                  title="Unduh DOCX"
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* MODAL TELAAH SUPERVISI & APPROVAL */}
      {selectedDoc && (
        <Modal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          title="Telaah Supervisi & Pengesahan Dokumen"
          subtitle={selectedDoc.title}
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <p><strong>Penyusun:</strong> {selectedDoc.authorName}</p>
              <p><strong>Mata Pelajaran:</strong> {selectedDoc.subjectName} ({selectedDoc.className || 'Kelas VII'})</p>
              <p><strong>Status Saat Ini:</strong> {selectedDoc.status.replace('_', ' ').toUpperCase()}</p>
            </div>

            {/* SCORING INPUTS */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Skor KMA 1503 (0-100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={complianceScore}
                  onChange={(e) => setComplianceScore(Number(e.target.value))}
                  className="w-full text-xs rounded-lg border border-slate-300 px-3 py-1.5 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Skor KBC (0-100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={pancacintaScore}
                  onChange={(e) => setPancacintaScore(Number(e.target.value))}
                  className="w-full text-xs rounded-lg border border-slate-300 px-3 py-1.5 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Deep Learning (0-100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={deepLearningScore}
                  onChange={(e) => setDeepLearningScore(Number(e.target.value))}
                  className="w-full text-xs rounded-lg border border-slate-300 px-3 py-1.5 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Catatan & Rekomendasi Supervisi</label>
              <textarea
                rows={3}
                value={reviewComments}
                onChange={(e) => setReviewComments(e.target.value)}
                className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-madrasah-600 focus:outline-none"
                placeholder="Tuliskan catatan perbaikan atau apresiasi terhadap rancangan pembelajaran guru..."
              />
            </div>

            {/* ACTIONS */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <Button
                variant="danger"
                size="sm"
                onClick={handleRequestRevision}
                icon={<AlertTriangle className="w-4 h-4" />}
              >
                Minta Revisi
              </Button>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsReviewModalOpen(false)}>
                  Batal
                </Button>
                {canApprove && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleApprove}
                    icon={<CheckCircle2 className="w-4 h-4" />}
                  >
                    Setujui & Sahkan Resmi
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
