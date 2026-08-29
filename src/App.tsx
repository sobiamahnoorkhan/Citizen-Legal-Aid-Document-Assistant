import React, { useState, useEffect } from 'react';
import { LanguageCode, ProvinceCode, SavedComplaintDraft } from './types';
import { LanguageSelectorBar } from './components/LanguageSelectorBar';
import { SidebarNav } from './components/SidebarNav';
import { Header } from './components/Header';
import { DocumentExplainer } from './components/DocumentExplainer';
import { IssueMatcher } from './components/IssueMatcher';
import { ComplaintDrafter } from './components/ComplaintDrafter';
import { LawLibrary } from './components/LawLibrary';
import { HelplineDirectory } from './components/HelplineDirectory';
import { LegalGlossaryModal } from './components/LegalGlossaryModal';
import { LegalFaqView } from './components/LegalFaqView';
import { SavedDraftsModal } from './components/SavedDraftsModal';
import { OnboardingTutorialModal } from './components/OnboardingTutorialModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentLang, setCurrentLang] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('legal_aid_lang');
    return (saved as LanguageCode) || 'ur';
  });

  const [currentProvince, setCurrentProvince] = useState<ProvinceCode>(() => {
    const saved = localStorage.getItem('legal_aid_province');
    return (saved as ProvinceCode) || 'ict';
  });

  const [activeTab, setActiveTab] = useState<
    'explainer' | 'matcher' | 'drafter' | 'lawLibrary' | 'helpline' | 'glossary' | 'saved' | 'faq'
  >('explainer');

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [preselectedTemplateId, setPreselectedTemplateId] = useState<string | undefined>(undefined);

  const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(() => {
    const hasSeen = localStorage.getItem('citizenaid_has_seen_tutorial');
    return !hasSeen;
  });

  const handleCloseTutorial = () => {
    setIsTutorialOpen(false);
    localStorage.setItem('citizenaid_has_seen_tutorial', 'true');
  };

  const [savedDrafts, setSavedDrafts] = useState<SavedComplaintDraft[]>(() => {
    try {
      const saved = localStorage.getItem('legal_aid_drafts');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Keep html dir and lang attributes in sync
  useEffect(() => {
    const isRtl = currentLang === 'ur' || currentLang === 'sd' || currentLang === 'pa' || currentLang === 'ps';
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
    localStorage.setItem('legal_aid_lang', currentLang);
  }, [currentLang]);

  useEffect(() => {
    localStorage.setItem('legal_aid_province', currentProvince);
  }, [currentProvince]);

  useEffect(() => {
    localStorage.setItem('legal_aid_drafts', JSON.stringify(savedDrafts));
  }, [savedDrafts]);

  const handleSaveDraft = (draft: SavedComplaintDraft) => {
    setSavedDrafts((prev) => [draft, ...prev]);
  };

  const handleDeleteDraft = (id: string) => {
    setSavedDrafts((prev) => prev.filter((d) => d.id !== id));
  };

  const handleClearAllDrafts = () => {
    if (window.confirm('کیا آپ تمام محفوظ شدہ شکایت نامے مٹانا چاہتے ہیں؟')) {
      setSavedDrafts([]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row font-sans selection:bg-amber-400 selection:text-black relative overflow-x-hidden" dir="ltr">
      {/* 1. GLASSMORPHISM LEFT SIDEBAR NAVIGATION */}
      <SidebarNav
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        currentProvince={currentProvince}
        onProvinceChange={setCurrentProvince}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        savedDraftsCount={savedDrafts.length}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        onOpenTutorial={() => setIsTutorialOpen(true)}
      />

      {/* 2. MAIN APPLICATION WORKSPACE CONTAINER */}
      <div
        className="flex-1 flex flex-col min-w-0 transition-all duration-300"
        dir="ltr"
      >
        {/* TOP LANGUAGE & PROVINCE BAR */}
        <LanguageSelectorBar
          currentLang={currentLang}
          onLanguageChange={setCurrentLang}
          currentProvince={currentProvince}
          onProvinceChange={setCurrentProvince}
        />

        {/* TOP ACTIVE SECTION BANNER HEADER */}
        <Header
          currentLang={currentLang}
          currentProvince={currentProvince}
          onProvinceChange={setCurrentProvince}
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
          }}
          savedDraftsCount={savedDrafts.length}
          onOpenTutorial={() => setIsTutorialOpen(true)}
        />

        {/* MAIN ACTIVE VIEW CONTENT */}
        <main className="flex-grow max-w-7xl w-full mx-auto px-3 sm:px-6 pt-4 sm:pt-6 pb-24 md:pb-12 space-y-6">
          {activeTab === 'explainer' && (
            <DocumentExplainer currentLang={currentLang} />
          )}

          {activeTab === 'matcher' && (
            <IssueMatcher
              currentLang={currentLang}
              currentProvince={currentProvince}
            />
          )}

          {activeTab === 'drafter' && (
            <ComplaintDrafter
              currentLang={currentLang}
              currentProvince={currentProvince}
              onSaveDraft={handleSaveDraft}
              selectedTemplateId={preselectedTemplateId}
            />
          )}

          {activeTab === 'lawLibrary' && (
            <LawLibrary
              language={currentLang}
              onSelectTab={(tab) => setActiveTab(tab as any)}
              onSelectComplaintTemplate={(templateId) => {
                setPreselectedTemplateId(templateId);
                setActiveTab('drafter');
              }}
            />
          )}

          {activeTab === 'helpline' && (
            <HelplineDirectory
              currentLang={currentLang}
              currentProvince={currentProvince}
              onProvinceChange={setCurrentProvince}
            />
          )}

          {activeTab === 'glossary' && (
            <LegalGlossaryModal currentLang={currentLang} />
          )}

          {activeTab === 'faq' && (
            <LegalFaqView
              currentLang={currentLang}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'saved' && (
            <SavedDraftsModal
              currentLang={currentLang}
              savedDrafts={savedDrafts}
              onDeleteDraft={handleDeleteDraft}
              onClearAll={handleClearAllDrafts}
              onNavigateToDrafter={() => setActiveTab('drafter')}
            />
          )}
        </main>

        {/* FOOTER */}
        <Footer
          currentLang={currentLang}
          onTabChange={(tab) => setActiveTab(tab)}
        />
      </div>

      {/* FIRST-TIME ONBOARDING TUTORIAL MODAL OVERLAY */}
      <OnboardingTutorialModal
        isOpen={isTutorialOpen}
        onClose={handleCloseTutorial}
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onNavigateTab={(tab) => setActiveTab(tab)}
      />
    </div>
  );
}
