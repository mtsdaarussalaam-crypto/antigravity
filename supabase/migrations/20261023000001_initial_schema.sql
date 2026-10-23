-- ====================================================================
-- MADRASAH KBC LEARNING SUITE: MIGRATION 20261023000001_initial_schema.sql
-- Kepatuhan: KMA No. 1503 Tahun 2025 & SK Dirjen Pendis No. 6077 Tahun 2025
-- PostgreSQL 15+ / Supabase Compatible
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUMS & DOMAINS
DO $$ BEGIN
    CREATE TYPE education_level AS ENUM ('RA', 'MI', 'MTs', 'MA', 'MAK');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE school_status AS ENUM ('negeri', 'swasta');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE doc_status AS ENUM ('draft', 'in_progress', 'ready_for_review', 'under_review', 'needs_revision', 'approved', 'archived');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE verification_status AS ENUM ('terverifikasi', 'perlu_verifikasi', 'tidak_berlaku');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- ====================================================================
-- ENTITAS UTAMA: ORGANISASI & PROFIL MADRASAH
-- ====================================================================

CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS school_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    official_name VARCHAR(255) NOT NULL,
    level education_level NOT NULL DEFAULT 'MTs',
    status school_status NOT NULL DEFAULT 'swasta',
    nsm VARCHAR(50),
    npsn VARCHAR(50),
    address TEXT,
    village VARCHAR(100),
    district VARCHAR(100),
    regency_city VARCHAR(100),
    province VARCHAR(100),
    postal_code VARCHAR(10),
    phone VARCHAR(30),
    email VARCHAR(100),
    website VARCHAR(150),
    headmaster_name VARCHAR(150) NOT NULL,
    headmaster_nip VARCHAR(50),
    headmaster_signature_url TEXT,
    madrasah_logo_url TEXT,
    letterhead_template TEXT,
    doc_number_format VARCHAR(100) DEFAULT '{nomor}/MADRASAH/{kode}/{bulan}/{tahun}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT uq_school_org UNIQUE (organization_id)
);

CREATE TABLE IF NOT EXISTS organization_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    active_academic_year_id UUID,
    active_semester_id UUID,
    timezone VARCHAR(50) DEFAULT 'Asia/Jakarta',
    language VARCHAR(10) DEFAULT 'id',
    ai_provider VARCHAR(50) DEFAULT 'default',
    ai_enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT uq_settings_org UNIQUE (organization_id)
);

-- ====================================================================
-- PENGGUNA, PERAN & OTORISASI (RBAC)
-- ====================================================================

CREATE TABLE IF NOT EXISTS roles (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_system BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS permissions (
    id VARCHAR(100) PRIMARY KEY,
    module VARCHAR(50) NOT NULL,
    action VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS role_permissions (
    role_id VARCHAR(50) REFERENCES roles(id) ON DELETE CASCADE,
    permission_id VARCHAR(100) REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY, -- Terhubung dengan auth.users.id
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    nip VARCHAR(50),
    nuptk VARCHAR(50),
    phone VARCHAR(30),
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS organization_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    role_id VARCHAR(50) NOT NULL REFERENCES roles(id),
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT uq_member_org_user_role UNIQUE (organization_id, user_id, role_id)
);

-- ====================================================================
-- TAHUN AJARAN, KELAS & STRUKTUR PEMBELAJARAN
-- ====================================================================

CREATE TABLE IF NOT EXISTS academic_years (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL, -- Contoh: 2026/2027
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS semesters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
    semester_type VARCHAR(10) NOT NULL, -- 'ganjil' atau 'genap'
    name VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
    grade_level INTEGER NOT NULL, -- 1-12
    name VARCHAR(50) NOT NULL, -- Contoh: "7-A", "10-MIPA-1"
    phase VARCHAR(10) NOT NULL, -- A, B, C, D, E, F
    homeroom_teacher_id UUID REFERENCES user_profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    code VARCHAR(30) NOT NULL,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'PAI', 'Bahasa Arab', 'Umum', 'Pilihan', 'Mulok'
    weekly_hours INTEGER DEFAULT 2,
    phase VARCHAR(10),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS teacher_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
    teacher_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- KURIKULUM RESMI & REGULASI (KMA 1503/2025 & KBC 6077/2025)
-- ====================================================================

CREATE TABLE IF NOT EXISTS curriculum_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    legal_basis TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS curriculum_references (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    regulation_number VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL,
    publisher VARCHAR(150) NOT NULL,
    version VARCHAR(50) DEFAULT '1.0',
    verification_status verification_status DEFAULT 'terverifikasi',
    source_url TEXT,
    file_path TEXT,
    verified_by UUID REFERENCES user_profiles(id),
    verified_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS learning_outcomes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    curriculum_version_id UUID REFERENCES curriculum_versions(id),
    subject_code VARCHAR(30) NOT NULL,
    phase VARCHAR(10) NOT NULL,
    element VARCHAR(100) NOT NULL,
    outcome_text TEXT NOT NULL,
    reference_id UUID REFERENCES curriculum_references(id),
    is_verified BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS learning_objectives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    outcome_id UUID REFERENCES learning_outcomes(id) ON DELETE CASCADE,
    code VARCHAR(50) NOT NULL,
    objective_text TEXT NOT NULL,
    competencies TEXT[],
    scope_materials TEXT[],
    pancacinta_core_value VARCHAR(100),
    is_ai_generated BOOLEAN DEFAULT false,
    verified_by UUID REFERENCES user_profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS learning_objective_flows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    phase VARCHAR(10) NOT NULL,
    title VARCHAR(255) NOT NULL,
    sequence_order JSONB NOT NULL,
    total_hours INTEGER,
    created_by UUID REFERENCES user_profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- DOKUMEN PERANGKAT PEMBELAJARAN & TEMPLATE
-- ====================================================================

CREATE TABLE IF NOT EXISTS document_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'modul_ajar', 'rpp', 'prota', 'promes', 'lkpd', 'asesmen'
    name VARCHAR(255) NOT NULL,
    description TEXT,
    schema_definition JSONB NOT NULL,
    default_content JSONB,
    is_system BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS learning_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    academic_year_id UUID NOT NULL REFERENCES academic_years(id),
    semester_id UUID NOT NULL REFERENCES semesters(id),
    subject_id UUID NOT NULL REFERENCES subjects(id),
    class_id UUID REFERENCES classes(id),
    author_id UUID NOT NULL REFERENCES user_profiles(id),
    template_id UUID REFERENCES document_templates(id),
    doc_type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    topic VARCHAR(255),
    time_allocation VARCHAR(100),
    status doc_status DEFAULT 'draft',
    version_number INTEGER DEFAULT 1,
    content JSONB NOT NULL,
    snapshot_school_profile JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS learning_document_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID NOT NULL REFERENCES learning_documents(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    content JSONB NOT NULL,
    changed_by UUID NOT NULL REFERENCES user_profiles(id),
    change_summary TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS learning_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID NOT NULL REFERENCES learning_documents(id) ON DELETE CASCADE,
    meeting_number INTEGER DEFAULT 1,
    stage VARCHAR(30) NOT NULL, -- 'pendahuluan', 'inti', 'penutup'
    activity_description TEXT NOT NULL,
    deep_learning_dimension VARCHAR(50), -- 'memahami', 'mengaplikasi', 'merefleksi'
    pancacinta_value VARCHAR(100),
    duration_minutes INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pancacinta_mappings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID NOT NULL REFERENCES learning_documents(id) ON DELETE CASCADE,
    core_value VARCHAR(100) NOT NULL, -- 'Cinta Allah & Rasul', 'Cinta Ilmu', 'Cinta Lingkungan', 'Cinta Diri & Sesama', 'Cinta Tanah Air'
    rational_justification TEXT NOT NULL,
    character_target TEXT NOT NULL,
    observable_indicator TEXT NOT NULL,
    learning_evidence TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS deep_learning_mappings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID NOT NULL REFERENCES learning_documents(id) ON DELETE CASCADE,
    learning_experience VARCHAR(50) NOT NULL, -- 'mindful', 'meaningful', 'joyful'
    cognitive_experience VARCHAR(50) NOT NULL, -- 'memahami', 'mengaplikasi', 'merefleksi'
    trigger_question TEXT,
    collaborative_task TEXT,
    differentiation_strategy TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS teaching_materials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    document_id UUID REFERENCES learning_documents(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    summary TEXT,
    content_body TEXT,
    file_attachment_url TEXT,
    created_by UUID REFERENCES user_profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS worksheets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    document_id UUID REFERENCES learning_documents(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    instructions TEXT NOT NULL,
    activity_steps JSONB NOT NULL,
    reflection_questions JSONB,
    created_by UUID REFERENCES user_profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- ASESMEN, BANK SOAL & RUBRIK
-- ====================================================================

CREATE TABLE IF NOT EXISTS assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    document_id UUID REFERENCES learning_documents(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    assessment_type VARCHAR(50) NOT NULL, -- 'diagnostik', 'formatif', 'sumatif'
    form_type VARCHAR(50) NOT NULL, -- 'tes_tertulis', 'kinerja', 'proyek', 'portofolio', 'observasi'
    total_score NUMERIC(5,2) DEFAULT 100,
    created_by UUID REFERENCES user_profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS assessment_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
    item_type VARCHAR(30) NOT NULL, -- 'pilihan_ganda', 'kompleks', 'benar_salah', 'uraian', 'menjodohkan'
    stimulus TEXT,
    question_text TEXT NOT NULL,
    options JSONB,
    difficulty_level VARCHAR(20) DEFAULT 'sedang', -- 'mudah', 'sedang', 'sukar', 'hots'
    score_weight NUMERIC(5,2) DEFAULT 1.0,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS answer_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_id UUID NOT NULL REFERENCES assessment_items(id) ON DELETE CASCADE,
    correct_answer TEXT NOT NULL,
    explanation TEXT,
    scoring_guide TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT uq_key_item UNIQUE (item_id)
);

CREATE TABLE IF NOT EXISTS assessment_rubrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
    criteria VARCHAR(255) NOT NULL,
    scale_descriptors JSONB NOT NULL,
    weight NUMERIC(5,2) DEFAULT 1.0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS student_learning_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    assessment_id UUID REFERENCES assessments(id) ON DELETE CASCADE,
    student_identifier_hash VARCHAR(64) NOT NULL, -- Anonim / pseudonim
    score NUMERIC(5,2),
    feedback_notes TEXT,
    recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- KOKURIKULER, SUPERVISI & REFLEKSI
-- ====================================================================

CREATE TABLE IF NOT EXISTS cocurricular_programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    academic_year_id UUID NOT NULL REFERENCES academic_years(id),
    title VARCHAR(255) NOT NULL,
    theme VARCHAR(100) NOT NULL,
    dimensions TEXT[],
    target_character TEXT[],
    project_outline TEXT,
    duration_hours INTEGER,
    coordinator_id UUID REFERENCES user_profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS document_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID NOT NULL REFERENCES learning_documents(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES user_profiles(id),
    reviewer_role VARCHAR(50) NOT NULL,
    comments TEXT NOT NULL,
    compliance_score NUMERIC(5,2),
    pancacinta_score NUMERIC(5,2),
    deep_learning_score NUMERIC(5,2),
    suggested_action VARCHAR(50) NOT NULL, -- 'approve', 'request_revision'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS document_approvals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID NOT NULL REFERENCES learning_documents(id) ON DELETE CASCADE,
    approved_by UUID NOT NULL REFERENCES user_profiles(id),
    approval_date DATE NOT NULL,
    official_notes TEXT,
    signature_hash VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reflection_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID NOT NULL REFERENCES learning_documents(id) ON DELETE CASCADE,
    teacher_id UUID NOT NULL REFERENCES user_profiles(id),
    success_notes TEXT,
    challenge_notes TEXT,
    student_engagement_notes TEXT,
    improvement_plan TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS follow_up_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID NOT NULL REFERENCES learning_documents(id) ON DELETE CASCADE,
    remedial_strategy TEXT,
    enrichment_strategy TEXT,
    target_students_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- REGULASI, AI LOGS, NOTIFIKASI & AUDIT
-- ====================================================================

CREATE TABLE IF NOT EXISTS regulation_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_id UUID NOT NULL REFERENCES curriculum_references(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_size_bytes BIGINT,
    mime_type VARCHAR(100),
    storage_path TEXT NOT NULL,
    uploaded_by UUID REFERENCES user_profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS regulation_metadata (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_id UUID NOT NULL REFERENCES curriculum_references(id) ON DELETE CASCADE,
    extracted_text TEXT,
    key_terms TEXT[],
    chapter_index JSONB,
    ocr_confidence NUMERIC(5,2),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ai_generation_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES user_profiles(id),
    model_name VARCHAR(100),
    prompt_type VARCHAR(100) NOT NULL,
    input_tokens INTEGER,
    output_tokens INTEGER,
    execution_time_ms INTEGER,
    is_success BOOLEAN DEFAULT true,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    link_url TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES user_profiles(id),
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100) NOT NULL,
    resource_id VARCHAR(100),
    ip_address VARCHAR(45),
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- INDEKS PERFORMA
-- ====================================================================

CREATE INDEX IF NOT EXISTS idx_members_org_user ON organization_members(organization_id, user_id);
CREATE INDEX IF NOT EXISTS idx_academic_org ON academic_years(organization_id, is_active);
CREATE INDEX IF NOT EXISTS idx_classes_org_grade ON classes(organization_id, grade_level);
CREATE INDEX IF NOT EXISTS idx_subjects_org ON subjects(organization_id, category);
CREATE INDEX IF NOT EXISTS idx_documents_org_status ON learning_documents(organization_id, status);
CREATE INDEX IF NOT EXISTS idx_documents_author ON learning_documents(author_id);
CREATE INDEX IF NOT EXISTS idx_audit_org_time ON audit_logs(organization_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON notifications(user_id, is_read);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS)
-- ====================================================================

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE school_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_years ENABLE ROW LEVEL SECURITY;
ALTER TABLE semesters ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE pancacinta_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE deep_learning_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper Function: Memeriksa apakah user aktif adalah anggota organisasi tertentu
CREATE OR REPLACE FUNCTION is_member_of_org(org_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM organization_members
        WHERE organization_id = org_id
        AND user_id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS Policies Komprehensif untuk Isolasi Multi-Tenant
DO $$ BEGIN
    CREATE POLICY org_isolation_policy ON organizations
        FOR ALL USING (id IN (SELECT organization_id FROM organization_members WHERE user_id = auth.uid()));
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY school_profiles_org_isolation ON school_profiles
        FOR ALL USING (organization_id IN (SELECT organization_id FROM organization_members WHERE user_id = auth.uid()));
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY org_settings_isolation ON organization_settings
        FOR ALL USING (organization_id IN (SELECT organization_id FROM organization_members WHERE user_id = auth.uid()));
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY org_members_isolation ON organization_members
        FOR ALL USING (organization_id IN (SELECT organization_id FROM organization_members WHERE user_id = auth.uid()) OR user_id = auth.uid());
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY academic_years_org_isolation ON academic_years
        FOR ALL USING (organization_id IN (SELECT organization_id FROM organization_members WHERE user_id = auth.uid()));
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY semesters_org_isolation ON semesters
        FOR ALL USING (organization_id IN (SELECT organization_id FROM organization_members WHERE user_id = auth.uid()));
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY classes_org_isolation ON classes
        FOR ALL USING (organization_id IN (SELECT organization_id FROM organization_members WHERE user_id = auth.uid()));
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY subjects_org_isolation ON subjects
        FOR ALL USING (organization_id IN (SELECT organization_id FROM organization_members WHERE user_id = auth.uid()));
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY teacher_assignments_org_isolation ON teacher_assignments
        FOR ALL USING (organization_id IN (SELECT organization_id FROM organization_members WHERE user_id = auth.uid()));
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY documents_org_isolation ON learning_documents
        FOR ALL USING (organization_id IN (SELECT organization_id FROM organization_members WHERE user_id = auth.uid()));
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY assessments_org_isolation ON assessments
        FOR ALL USING (organization_id IN (SELECT organization_id FROM organization_members WHERE user_id = auth.uid()));
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY notifications_user_isolation ON notifications
        FOR ALL USING (user_id = auth.uid());
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY audit_logs_org_isolation ON audit_logs
        FOR ALL USING (organization_id IN (SELECT organization_id FROM organization_members WHERE user_id = auth.uid()));
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- ====================================================================
-- SEED DATA AWAL: ROLES, REGULASI RESMI & DEMO MADRASAH
-- ====================================================================

INSERT INTO roles (id, name, description) VALUES
('super_admin', 'Super Admin Sistem', 'Akses konfigurasi global aplikasi, tenant madrasah, dan audit.'),
('admin_madrasah', 'Administrator Madrasah', 'Akses penuh pengaturan madrasah, penugasan guru, tahun ajaran, dan template.'),
('kepala_madrasah', 'Kepala Madrasah', 'Akses pemantauan madrasah, supervisi, catatan telaah, dan persetujuan perangkat.'),
('wakamad_kurikulum', 'Wakamad Bidang Kurikulum', 'Pemeriksaan kurikulum, penjadwalan, telaah berkas, dan rekapitulasi.'),
('guru', 'Guru Mata Pelajaran / Kelas', 'Penyusun perangkat pembelajaran, generator KBC, bank soal, dan evaluasi.'),
('pengawas', 'Pengawas Madrasah', 'Supervisi eksternal pembinaan dan catatan rekomendasi pembelajaran.'),
('kolaborator', 'Guru Tamu / Kolaborator', 'Akses terbatas pada dokumen pembelajaran tertentu.')
ON CONFLICT (id) DO NOTHING;

-- Kurikulum Versi Resmi
INSERT INTO curriculum_versions (code, name, description, legal_basis) VALUES
('KMA-1503-2025', 'Kurikulum Madrasah KMA 1503/2025', 'Implementasi kurikulum nasional madrasah berbasis Kurikulum Berbasis Cinta (KBC).', 'KMA RI No. 1503 Tahun 2025 & SK Dirjen Pendis No. 6077 Tahun 2025')
ON CONFLICT (code) DO NOTHING;

-- Master Referensi Regulasi Terverifikasi
INSERT INTO curriculum_references (title, regulation_number, year, publisher, verification_status, source_url) VALUES
('Pedoman Implementasi Kurikulum pada RA, MI, MTs, MA, dan MAK', 'KMA Nomor 1503 Tahun 2025', 2025, 'Kementerian Agama RI', 'terverifikasi', 'https://jdih.kemenag.go.id/'),
('Panduan Kurikulum Berbasis Cinta (KBC)', 'Keputusan Dirjen Pendis Nomor 6077 Tahun 2025', 2025, 'Direktorat Jenderal Pendidikan Islam', 'terverifikasi', 'https://pendis.kemenag.go.id/'),
('Pedoman Pembelajaran dan Asesmen Madrasah', 'Panduan PPA 2025', 2025, 'Direktorat KSKK Madrasah', 'terverifikasi', 'https://madrasah.kemenag.go.id/')
ON CONFLICT DO NOTHING;
