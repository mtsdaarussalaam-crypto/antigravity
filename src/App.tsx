import React, { useState } from 'react';
import { AuthProvider, useAuth } from './features/auth/AuthContext';
import { DashboardLayout } from './layouts/DashboardLayout';
import { DashboardPage } from './pages/DashboardPage';
import { SchoolProfilePage } from './pages/SchoolProfilePage';
import { UsersManagementPage } from './pages/UsersManagementPage';
import { AcademicStructurePage } from './pages/AcademicStructurePage';
import { RegulationCenterPage } from './pages/RegulationCenterPage';
import { DocumentsOverviewPage } from './pages/DocumentsOverviewPage';
import { CurriculumCPTPPage } from './pages/CurriculumCPTPPage';
import { GeneratorPerangkatPage } from './pages/GeneratorPerangkatPage';
import { PancaCintaDeepLearningPage } from './pages/PancaCintaDeepLearningPage';
import { DocumentEditorPage } from './pages/DocumentEditorPage';
import { AssessmentBankPage } from './pages/AssessmentBankPage';
import { CocurricularPage } from './pages/CocurricularPage';
import { SupervisionApprovalPage } from './pages/SupervisionApprovalPage';
import { ReportsAnalyticsPage } from './pages/ReportsAnalyticsPage';
import { OnboardingWizard } from './pages/OnboardingWizard';

const MainAppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedDocId, setSelectedDocId] = useState<string | undefined>(undefined);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardPage
            onNavigate={(tab) => setActiveTab(tab)}
            onOpenOnboarding={() => setIsOnboardingOpen(true)}
          />
        );
      case 'generator':
        return <GeneratorPerangkatPage />;
      case 'editor':
        return (
          <DocumentEditorPage
            documentId={selectedDocId}
            onBack={() => setActiveTab('documents')}
          />
        );
      case 'curriculum':
        return <CurriculumCPTPPage />;
      case 'assessment-bank':
        return <AssessmentBankPage />;
      case 'cocurricular':
        return <CocurricularPage />;
      case 'supervision':
        return <SupervisionApprovalPage />;
      case 'reports':
        return <ReportsAnalyticsPage />;
      case 'pancacinta':
        return <PancaCintaDeepLearningPage />;
      case 'school-profile':
        return <SchoolProfilePage />;
      case 'academic':
        return <AcademicStructurePage />;
      case 'users':
        return <UsersManagementPage />;
      case 'regulations':
        return <RegulationCenterPage />;
      case 'documents':
        return (
          <DocumentsOverviewPage
            onOpenEditor={(docId) => {
              setSelectedDocId(docId);
              setActiveTab('editor');
            }}
          />
        );
      default:
        return (
          <DashboardPage
            onNavigate={(tab) => setActiveTab(tab)}
            onOpenOnboarding={() => setIsOnboardingOpen(true)}
          />
        );
    }
  };

  return (
    <DashboardLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onOpenOnboarding={() => setIsOnboardingOpen(true)}
    >
      {renderActiveScreen()}

      <OnboardingWizard
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
      />
    </DashboardLayout>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
};

export default App;
