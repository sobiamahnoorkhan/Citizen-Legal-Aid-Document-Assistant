import React from 'react';
import { LanguageCode } from '../types';
import { t } from '../data/uiStrings';
import {
  Scale,
  PhoneCall,
  ShieldCheck,
  Lock,
  FileText,
  Search,
  PenTool,
  BookOpen,
  HelpCircle,
  Bookmark,
  ExternalLink,
} from 'lucide-react';

interface FooterProps {
  currentLang: LanguageCode;
  onTabChange?: (tab: 'explainer' | 'matcher' | 'drafter' | 'lawLibrary' | 'helpline' | 'glossary' | 'saved' | 'faq') => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onTabChange }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-100 pt-8 pb-20 md:pb-8 border-t border-slate-800 mt-10 no-print relative overflow-hidden">
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 pb-6 border-b border-slate-800">
          
          {/* Col 1: Brand & Mission (5 Cols on large) */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-500/20 border border-amber-400/40 rounded-xl text-amber-400 shadow-md shrink-0">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <span className="text-base font-black text-white block leading-tight tracking-tight">
                  پاکستان قانونی امداد پورٹل
                </span>
                <span className="text-[11px] font-extrabold text-amber-400 tracking-wider uppercase block mt-0.5">
                  Citizen Legal Aid &amp; Document Assistant
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-normal pr-0 lg:pr-4">
              پاکستان کے تمام شہریوں، مزدوروں، صارفین، خواتین اور اقلیتوں کے لیے مفت قانونی آگاہی، آسان زبان میں دستاویزات کی AI تشریح، ہنگامی ہیلپ لائنز اور درخواست نویسی کا محفوظ قانونی آلہ۔
            </p>

            {/* Privacy Badge */}
            <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-200 bg-slate-800/80 border border-slate-700 px-2.5 py-1 rounded-lg font-bold">
              <Lock className="w-3 h-3 text-amber-400 shrink-0" />
              <span>Privacy-First Architecture • Online AI & Local Storage</span>
            </div>
          </div>

          {/* Col 2: Core Tools Navigation (3 Cols on large) */}
          <div className="lg:col-span-3 space-y-2">
            <h3 className="text-[11px] font-black text-white uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-1.5">
              اہم سہولیات / Core Services
            </h3>
            <ul className="space-y-1 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onTabChange?.('explainer')}
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors font-medium cursor-pointer py-0.5"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{t('tab.explainer', currentLang)}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onTabChange?.('matcher')}
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors font-medium cursor-pointer py-0.5"
                >
                  <Search className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{t('tab.matcher', currentLang)}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onTabChange?.('drafter')}
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors font-medium cursor-pointer py-0.5"
                >
                  <PenTool className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{t('tab.drafter', currentLang)}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onTabChange?.('lawLibrary')}
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors font-medium cursor-pointer py-0.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{t('tab.lawLibrary', currentLang)}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onTabChange?.('faq')}
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors font-medium cursor-pointer py-0.5"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{t('tab.faq', currentLang)}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Support & Resources (4 Cols on large) */}
          <div className="lg:col-span-4 space-y-2">
            <h3 className="text-[11px] font-black text-white uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-1.5">
              مدد اور ذخیرہ / Resources &amp; Support
            </h3>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => onTabChange?.('helpline')}
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors font-medium cursor-pointer py-0.5"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>ہیلپ لائنز</span>
                </button>

                <button
                  type="button"
                  onClick={() => onTabChange?.('glossary')}
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors font-medium cursor-pointer py-0.5"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{t('tab.glossary', currentLang)}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onTabChange?.('saved')}
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors font-medium cursor-pointer py-0.5"
                >
                  <Bookmark className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>محفوظ مسودے</span>
                </button>

                <button
                  type="button"
                  onClick={() => onTabChange?.('helpline')}
                  className="flex items-center gap-1.5 text-amber-400 hover:text-white transition-colors font-bold cursor-pointer py-0.5"
                >
                  <span>ہنگامی نمبرز</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </button>
              </div>

              {/* Emergency Call Box */}
              <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-between gap-2.5 mt-2">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold text-white block">ہنگامی قانونی مدد / Emergency</span>
                  <span className="text-[10px] text-slate-300 block">ٹو فری ہیلپ لائن 1099 (وزارتِ قانون)</span>
                </div>
                <button
                  type="button"
                  onClick={() => onTabChange?.('helpline')}
                  className="inline-flex items-center gap-1 text-[11px] font-black text-black bg-amber-500 hover:bg-amber-400 px-2.5 py-1 rounded-lg transition-all cursor-pointer shrink-0 shadow-sm active:scale-95"
                >
                  <PhoneCall className="w-3 h-3 text-black" />
                  <span>کال کریں</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer Callout Card */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 sm:p-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-slate-300 shadow-inner">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="p-1.5 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-400 shrink-0">
              <Scale className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <span className="font-extrabold text-white block text-xs">
                Legal Disclaimer / قانونی وضاحتی نوٹس
              </span>
              <span className="text-[10px] text-amber-400 font-bold">
                {t('disclaimer.title', currentLang)}
              </span>
            </div>
          </div>

          <p className="text-start md:text-end text-[10px] sm:text-[11px] leading-relaxed text-slate-300 max-w-3xl">
            {t('disclaimer.text', currentLang)}
          </p>
        </div>

        {/* Bottom Line Bar */}
        <div className="text-[11px] text-slate-400 pt-3 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-800">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-semibold text-slate-200">
              پاکستان قانونی امداد سب کے لیے © {currentYear} • Legal Aid for All Pakistan
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-slate-400 font-mono text-[10px] shrink-0">
            <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-200 font-bold border border-slate-700">v2.5.0</span>
            <span>•</span>
            <span className="text-amber-400 font-sans font-bold">Offline Client-Side Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

