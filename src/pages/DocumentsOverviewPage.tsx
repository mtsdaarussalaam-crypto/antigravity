import React, { useState } from 'react';
import { StorageService } from '../services/storageService';
import { ExportService } from '../services/exportService';
import { useAuth } from '../features/auth/AuthContext';
import { LearningDocument, DocumentStatus } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { PancaCintaBadge } from '../components/common/PancaCintaBadge';
import { FileText, Plus, Search, Filter, CheckCircle2, Clock, AlertTriangle, FileEdit, FileDown } from 'lucide-react';

interface DocumentsOverviewPageProps {
  onOpenEditor?: (docId: string) => void;
}

export const DocumentsOverviewPage: React.FC<DocumentsOverviewPageProps> = ({ onOpenEditor }) => {
  const { schoolProfile } = useAuth();
  const [documents, setDocuments] = useState<LearningDocument[]>(() => StorageService.getDocuments());
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredDocs = documents.filter((d) => {
    const matchesSearch = d.title.toLowerCase().includes(search.toLowerCase()) ||
                          d.authorName.toLowerCase().includes(search.toLowerCase()) ||
                          d.subjectName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: DocumentStatus) => {
    switch (status) {
      case 'approved':
        return <Badge variant="success" icon={<CheckCircle2 className="w-3 h-3" />}>Disetujui Sah</Badge>;
      case 'ready_for_review':
        return <Badge variant="warning" icon={<Clock className="w-3 h-3" />}>Siap Ditinjau</Badge>;
      case 'needs_revision':
        return <Badge variant="danger" icon={<AlertTriangle className="w-3 h-3" />}>Perlu Revisi</Badge>;
      default:
        return <Badge variant="default" icon={<FileEdit className="w-3 h-3" />}>Draf Awal</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Bank Perangkat Pembelajaran Madrasah</h2>
          <p className="text-xs text-slate-500 mt-1">
            Modul Ajar, RPP, LKPD, dan Asesmen terintegrasi Panca Cinta dan Pembelajaran Mendalam.
          </p>
        </div>
      </div>

      <Card>
        {/* SEARCH & FILTER */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari judul, mapel, atau guru..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-madrasah-600"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs rounded-lg border border-slate-300 px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-madrasah-600"
            >
              <option value="all">Semua Status Dokumen</option>
              <option value="approved">Telah Disetujui (Sah)</option>
              <option value="ready_for_review">Siap Ditinjau</option>
              <option value="needs_revision">Perlu Revisi</option>
              <option value="draft">Draf Awal</option>
            </select>
          </div>
        </div>

        {/* DOCUMENTS LIST */}
        <div className="divide-y divide-slate-100 mt-2">
          {filteredDocs.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              Tidak ada perangkat pembelajaran yang cocok dengan filter pencarian.
            </div>
          ) : (
            filteredDocs.map((doc) => (
              <div key={doc.id} className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/50 p-2 rounded-xl transition">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-slate-900 hover:text-madrasah-700 cursor-pointer">
                      {doc.title}
                    </span>
                    <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                      {doc.subjectName}
                    </span>
                    {doc.className && (
                      <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {doc.className}
                      </span>
                    )}
                    <span className="text-[10px] uppercase font-mono font-bold text-slate-400">
                      v{doc.versionNumber}.0
                    </span>
                  </div>

                  <p className="text-xs text-slate-500">
                    Penyusun: <strong>{doc.authorName}</strong> • Alokasi Waktu: {doc.timeAllocation || '4 JP'} • Diperbarui: {new Date(doc.updatedAt).toLocaleDateString('id-ID')}
                  </p>

                  {/* PANCA CINTA BADGES */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    {doc.pancaCintaValues.map((val) => (
                      <PancaCintaBadge key={val} value={val} size="sm" />
                    ))}
                    {doc.deepLearningExperiences && doc.deepLearningExperiences.map((exp) => (
                      <span key={exp} className="text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-full capitalize">
                        Deep Learning: {exp}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {getStatusBadge(doc.status)}
                  {onOpenEditor && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onOpenEditor(doc.id)}
                      icon={<FileEdit className="w-3.5 h-3.5" />}
                      className="text-xs"
                    >
                      Buka Editor
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => ExportService.downloadDocx(doc, schoolProfile)}
                    icon={<FileDown className="w-3.5 h-3.5" />}
                    title="Unduh DOCX Resmi"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};
