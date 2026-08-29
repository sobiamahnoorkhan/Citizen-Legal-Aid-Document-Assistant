import React from 'react';
import { LanguageCode, ProvinceCode } from '../types';
import { t } from '../data/uiStrings';
import {
  Scale,
  Sparkles,
  FileText,
  Search,
  FileEdit,
  BookOpen,
  Bookmark,
  PhoneCall,
  ShieldCheck,
  BookMarked,
  HelpCircle,
} from 'lucide-react';

interface HeaderProps {
  currentLang: LanguageCode;
  currentProvince: ProvinceCode;
  onProvinceChange: (province: ProvinceCode) => void;
  activeTab: 'explainer' | 'matcher' | 'drafter' | 'lawLibrary' | 'helpline' | 'glossary' | 'saved' | 'faq';
  onTabChange: (tab: 'explainer' | 'matcher' | 'drafter' | 'lawLibrary' | 'helpline' | 'glossary' | 'saved' | 'faq') => void;
  savedDraftsCount: number;
  onOpenTutorial?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  activeTab,
  savedDraftsCount,
  onOpenTutorial,
}) => {
  const tabDetails = {
    explainer: {
      titleKey: 'tab.explainer',
      icon: FileText,
      tagline: 'دستاویزات کی آسان قانونی تشخیص اور عام فہم اردو میں وضاحت',
    },
    matcher: {
      titleKey: 'tab.matcher',
      icon: Search,
      tagline: 'اپنا مسئلہ درج کریں اور متعلقہ پاکستانی قوانین کی معلومات حاصل کریں',
    },
    drafter: {
      titleKey: 'tab.drafter',
      icon: FileEdit,
      tagline: 'مختلف اداروں اور عدالتوں کے لیے آف لائن شکایت نامہ ڈرافٹ کریں',
    },
    faq: {
      titleKey: 'tab.faq',
      icon: HelpCircle,
      tagline: 'پاکستان کے قانونی امور و پولیس کارروائی کے عام سوالات کے آسان جوابات',
    },
    lawLibrary: {
      titleKey: 'tab.lawLibrary',
      icon: BookOpen,
      tagline: 'پاکستان کے تمام اہم بنیادی قوانین، آرڈیننس اور تعزیراتِ پاکستان',
    },
    glossary: {
      titleKey: 'tab.glossary',
      icon: BookMarked,
      tagline: 'عدالتی و قانونی پیچیدہ اصطلاحات کی آسان اردو تشریح',
    },
    saved: {
      titleKey: 'tab.saved',
      icon: Bookmark,
      tagline: `آپ کے براؤزر میں محفوظ شدہ شکایت نامے (${savedDraftsCount})`,
    },
    helpline: {
      titleKey: 'tab.helpline',
      icon: PhoneCall,
      tagline: 'پاکستان کی اہم مفت قانونی اور ایمرجنسی ہیلپ لائنز ڈائریکٹری',
    },
  };

  const currentTabInfo = tabDetails[activeTab];
  const ActiveIcon = currentTabInfo.icon;

  return (
    <header className="no-print relative z-20">
      {/* Sleek Top Banner with Clean Law Styling */}
      <div className="bg-white border-b border-slate-200 text-slate-900 px-4 sm:px-6 py-3 min-h-[4rem] flex items-center relative overflow-hidden shadow-xs">
        {/* Subtle Ambient Background Glow */}
        <div className="absolute top-0 end-0 w-96 h-full bg-gradient-to-l from-amber-500/10 via-amber-500/5 to-transparent pointer-events-none" />

        <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-4 relative z-10">
          {/* Left / App Name with Logo & Active Tab Info */}
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 bg-amber-500/20 text-amber-700 rounded-2xl border border-amber-400/40 shadow-xs shrink-0 flex items-center justify-center">
              <Scale className="w-6 h-6 text-amber-600" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base sm:text-xl font-black text-slate-900 tracking-tight leading-snug">
                  {t('app.title', currentLang)}
                </h2>
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold bg-amber-500/20 text-amber-800 px-2.5 py-0.5 rounded-full border border-amber-400/40 shadow-xs">
                  <ActiveIcon className="w-3.5 h-3.5 text-amber-600" />
                  {t(currentTabInfo.titleKey, currentLang)}
                </span>
              </div>
              <h3 className="text-xs text-slate-500 font-bold leading-relaxed mt-0.5">
                {t('app.subtitle', currentLang)}
              </h3>
            </div>
          </div>

          {/* Right Status Badge & Quick Guide Button */}
          <div className="flex items-center gap-2 shrink-0">
            {onOpenTutorial && (
              <button
                type="button"
                onClick={onOpenTutorial}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl font-black text-xs flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
                title="How to Use App / طریقہ استعمال"
              >
                <Sparkles className="w-4 h-4" />
                <span className="hidden xs:inline">
                  {currentLang === 'en' ? 'Quick Guide' : 'طریقہ استعمال'}
                </span>
              </button>
            )}

            <div className="hidden sm:flex bg-slate-100 border border-slate-200 rounded-2xl px-3.5 py-2 items-center gap-2.5 shadow-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
              </span>
              <div>
                <span className="font-bold text-xs text-slate-900 block leading-tight">Privacy-First Legal Engine</span>
                <span className="text-[10px] text-slate-500">AI تشریح کے لیے انٹرنیٹ درکار ہے • ڈیٹا محفوظ</span>
              </div>
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 ms-1" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
