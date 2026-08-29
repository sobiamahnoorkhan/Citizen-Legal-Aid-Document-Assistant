import React, { useState } from 'react';
import { LanguageCode, ProvinceCode } from '../types';
import { t } from '../data/uiStrings';
import { PROVINCES, SUPPORTED_LANGUAGES } from '../data/languages';
import {
  Scale,
  Sparkles,
  FileText,
  Search,
  FileEdit,
  BookOpen,
  Bookmark,
  PhoneCall,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  X,
  MapPin,
  ShieldCheck,
  Globe,
  BookMarked,
  Check,
  HelpCircle,
} from 'lucide-react';

interface SidebarNavProps {
  currentLang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  currentProvince: ProvinceCode;
  onProvinceChange: (province: ProvinceCode) => void;
  activeTab: 'explainer' | 'matcher' | 'drafter' | 'lawLibrary' | 'helpline' | 'glossary' | 'saved' | 'faq';
  onTabChange: (tab: 'explainer' | 'matcher' | 'drafter' | 'lawLibrary' | 'helpline' | 'glossary' | 'saved' | 'faq') => void;
  savedDraftsCount: number;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  onOpenTutorial?: () => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  currentLang,
  onLanguageChange,
  currentProvince,
  onProvinceChange,
  activeTab,
  onTabChange,
  savedDraftsCount,
  isCollapsed: controlledIsCollapsed,
  onToggleCollapse,
  onOpenTutorial,
}) => {
  const [localIsCollapsed, setLocalIsCollapsed] = useState(false);
  const isCollapsed = controlledIsCollapsed !== undefined ? controlledIsCollapsed : localIsCollapsed;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      id: 'explainer' as const,
      labelKey: 'tab.explainer',
      icon: FileText,
      urduTag: 'دستاویزات کی آسان تشریح',
      color: 'text-emerald-400',
    },
    {
      id: 'matcher' as const,
      labelKey: 'tab.matcher',
      icon: Search,
      urduTag: 'مسئلہ کے مطابق قانون',
      color: 'text-emerald-400',
    },
    {
      id: 'drafter' as const,
      labelKey: 'tab.drafter',
      icon: FileEdit,
      urduTag: 'خودکار درخواست نویسی',
      color: 'text-emerald-400',
    },
    {
      id: 'faq' as const,
      labelKey: 'tab.faq',
      icon: HelpCircle,
      urduTag: 'عام قانونی سوالات و جوابات',
      color: 'text-emerald-400',
    },
    {
      id: 'lawLibrary' as const,
      labelKey: 'tab.lawLibrary',
      icon: BookOpen,
      urduTag: 'پاکستان کے اہم قوانین',
      color: 'text-emerald-400',
    },
    {
      id: 'glossary' as const,
      labelKey: 'tab.glossary',
      icon: BookMarked,
      urduTag: 'قانونی اصطلاحات و معنی',
      color: 'text-emerald-400',
    },
    {
      id: 'saved' as const,
      labelKey: 'tab.saved',
      icon: Bookmark,
      badge: savedDraftsCount,
      urduTag: 'محفوظ شدہ مسودے',
      color: 'text-emerald-400',
    },
    {
      id: 'helpline' as const,
      labelKey: 'tab.helpline',
      icon: PhoneCall,
      isEmergency: true,
      urduTag: 'ہنگامی نمبرز (1099/15)',
      color: 'text-emerald-400',
    },
  ];

  const handleTabClick = (tabId: 'explainer' | 'matcher' | 'drafter' | 'lawLibrary' | 'helpline' | 'glossary' | 'saved' | 'faq') => {
    onTabChange(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* 1. DESKTOP LEFT SIDEBAR */}
      <aside
        className={`hidden md:flex flex-col shrink-0 z-30 transition-all duration-300 ease-in-out no-print ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
        aria-label="Side Navigation Bar"
      >
        {/* Outer Container */}
        <div className="h-full w-full flex flex-col bg-white border-r border-slate-200/90 shadow-lg relative overflow-hidden select-none">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent blur-xl pointer-events-none" />

          {/* Top Brand Header */}
          <div className="p-4.5 py-5 border-b border-amber-500/30 bg-slate-900/95 backdrop-blur-xl bg-gradient-to-br from-slate-900/95 via-zinc-900/90 to-slate-950/95 text-white relative z-10 flex items-center justify-between gap-2.5 min-h-[5.5rem] overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-8 -translate-y-6 w-32 h-32 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />
            <div
              onClick={() => handleTabClick('explainer')}
              className="flex items-center gap-2.5 cursor-pointer group flex-1 min-w-0 relative z-10"
              title="Citizen Legal Aid & Document Assistant"
            >
              <div className="p-2 bg-amber-500/20 rounded-xl border border-amber-400/40 text-amber-400 shrink-0 group-hover:scale-105 transition duration-300 shadow-inner backdrop-blur-md">
                <Scale className="w-5 h-5 text-amber-400 group-hover:rotate-6 transition duration-300" />
              </div>

              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <h2 className="text-xs font-black text-white tracking-tight leading-tight line-clamp-2">
                    Citizen Legal Aid &amp; Document Assistant
                  </h2>
                  <h3 className="text-[10px] font-medium text-amber-300 line-clamp-2 mt-0.5 leading-snug">
                    Pakistan's Prestigious Offline-First Legal Literacy &amp; Paperwork Assistant
                  </h3>
                </div>
              )}
            </div>

            {/* Collapse / Expand Toggle Button */}
            <button
              type="button"
              onClick={() => {
                if (onToggleCollapse) {
                  onToggleCollapse();
                } else {
                  setLocalIsCollapsed(!localIsCollapsed);
                }
              }}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-amber-500 text-slate-300 hover:text-black border border-slate-700/80 transition cursor-pointer shrink-0 relative z-10"
              title={isCollapsed ? 'نیویگیشن بار کھولیں' : 'نیویگیشن بار بند کریں'}
              aria-label="Toggle navigation bar collapse state"
            >
              {isCollapsed ? (
                <PanelLeftOpen className="w-4 h-4 text-amber-400" />
              ) : (
                <PanelLeftClose className="w-4 h-4 text-slate-300 hover:text-white" />
              )}
            </button>
          </div>

          {/* Navigation Items List */}
          <div className="flex-1 px-2.5 py-3 space-y-1.5 relative z-10">
            {!isCollapsed && (
              <div className="px-2 pb-1 text-[10px] font-bold tracking-wider text-amber-700 uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span>شعبہ جات / Navigation</span>
              </div>
            )}

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const labelText = t(item.labelKey, currentLang);

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full relative flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer group ${
                    isActive
                      ? 'bg-slate-900 border border-slate-900 text-white font-bold shadow-md'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                  } ${isCollapsed ? 'justify-center px-0' : ''}`}
                  title={isCollapsed ? labelText : undefined}
                >
                  {/* Glowing Edge Bar for Active Tab */}
                  {isActive && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-amber-500 rounded-r-full shadow-sm" />
                  )}

                  {/* Icon with Backdrop */}
                  <div
                    className={`p-1.5 rounded-lg transition-all duration-200 shrink-0 ${
                      isActive
                        ? 'bg-amber-500 text-black font-black shadow-xs'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200 group-hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Labels and Urdu Subtitle */}
                  {!isCollapsed && (
                    <div className="flex-1 text-start min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className={`truncate ${isActive ? 'text-white font-extrabold' : 'text-slate-800'}`}>
                          {labelText}
                        </span>

                        {/* Saved Drafts Badge Counter */}
                        {item.badge !== undefined && item.badge > 0 && (
                          <span className="bg-amber-500 text-black font-black text-[10px] rounded-full px-2 py-0.5 shadow-xs">
                            {item.badge}
                          </span>
                        )}

                        {/* Emergency Badge */}
                        {item.isEmergency && (
                          <span className="text-[10px] font-black text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.2 rounded-md">
                            1099
                          </span>
                        )}
                      </div>
                      <p className={`text-[10px] truncate mt-0.5 font-normal ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                        {item.urduTag}
                      </p>
                    </div>
                  )}

                  {/* Collapsed Badge Pill */}
                  {isCollapsed && item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-1 -right-1 bg-amber-500 text-black font-black text-[9px] rounded-full w-4 h-4 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer Panel Controls inside Sidebar */}
          <div className="p-3 border-t border-slate-200 bg-slate-50 relative z-10 space-y-2">
            {!isCollapsed ? (
              <>
                {/* Jurisdiction / Province Quick Selector */}
                <div className="bg-white border border-slate-200 rounded-xl p-2 space-y-1 shadow-xs">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-800">
                    <span className="flex items-center gap-1.5 text-amber-600">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>دائرہ اختیار / Jurisdiction</span>
                    </span>
                  </div>
                  <select
                    value={currentProvince}
                    onChange={(e) => onProvinceChange(e.target.value as ProvinceCode)}
                    className="w-full bg-slate-50 text-slate-900 font-bold text-xs py-1.5 px-2 rounded-lg border border-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    {PROVINCES.map((prov) => (
                      <option key={prov.code} value={prov.code} className="bg-white text-slate-900">
                        {prov.name[currentLang] || prov.name.ur}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Offline Privacy Badge */}
                <div className="flex items-center justify-between gap-2 px-2 py-1.5 bg-white border border-slate-200 rounded-xl text-[11px] text-slate-700 font-medium shadow-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                    <span>100% آف لائن اور محفوظ</span>
                  </div>
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                </div>
              </>
            ) : (
              /* Collapsed Quick Icon Tools */
              <div className="flex flex-col items-center gap-2">
                <div
                  className="p-2 rounded-xl bg-white border border-slate-200 text-amber-600 cursor-pointer shadow-xs"
                  title="100% Offline & Private"
                >
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* 2. MOBILE TOP BAR & HAMBURGER DRAWER */}
      <div className="md:hidden sticky top-0 z-50 bg-slate-900/95 backdrop-blur-xl bg-gradient-to-br from-slate-900/95 via-zinc-900/90 to-slate-950/95 border-b border-amber-500/30 text-white px-4 py-2.5 flex items-center justify-between gap-3 no-print relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />
        {/* Brand Logo & Name */}
        <div
          onClick={() => handleTabClick('explainer')}
          className="flex items-center gap-2.5 cursor-pointer relative z-10"
        >
          <div className="p-2 bg-amber-500/20 border border-amber-400/40 backdrop-blur-md rounded-xl text-amber-400 shadow-inner">
            <Scale className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h1 className="text-xs font-black text-white leading-tight">Citizen Legal Aid &amp; Document Assistant</h1>
            <p className="text-[10px] text-amber-300 font-bold leading-tight">
              Pakistan's Prestigious Offline-First Legal Literacy &amp; Paperwork Assistant
            </p>
          </div>
        </div>

        {/* Right Section: Mobile Menu Trigger & Language Button */}
        <div className="flex items-center gap-2 relative z-10">
          {/* Saved Drafts Quick Icon */}
          {savedDraftsCount > 0 && (
            <button
              type="button"
              onClick={() => handleTabClick('saved')}
              className="relative p-2 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 cursor-pointer backdrop-blur-md"
            >
              <Bookmark className="w-4 h-4 text-amber-400" />
              <span className="absolute -top-1 -end-1 bg-amber-500 text-black font-black text-[9px] rounded-full w-4 h-4 flex items-center justify-center">
                {savedDraftsCount}
              </span>
            </button>
          )}

          {/* Menu Hamburger Trigger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-slate-200 hover:bg-slate-700 hover:text-white transition cursor-pointer shadow-xs active:scale-95"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 3. MOBILE GLASS DRAWER OVERLAY */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex no-print">
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Slide-in Mobile Drawer */}
          <div className="relative w-80 max-w-[85vw] h-full bg-white border-e border-slate-200 shadow-2xl flex flex-col z-10 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 start-0 w-full h-40 bg-amber-500/10 blur-2xl pointer-events-none" />

            {/* Mobile Drawer Header */}
            <div className="p-4 border-b border-amber-500/30 bg-slate-900/95 backdrop-blur-xl bg-gradient-to-br from-slate-900/95 via-zinc-900/90 to-slate-950/95 text-white flex items-center justify-between relative z-10 overflow-hidden">
              <div className="absolute right-0 top-0 w-32 h-32 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-2.5 relative z-10">
                <div className="p-2 bg-amber-500/20 border border-amber-400/40 rounded-xl text-amber-400 backdrop-blur-md shadow-inner">
                  <Scale className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white">نیویگیشن مینو</h2>
                  <p className="text-[10px] text-amber-300 font-medium">پاکستان قانونی امداد</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/80 text-slate-200 hover:bg-slate-700 hover:text-white transition-colors relative z-10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex-1 p-4 space-y-2 relative z-10">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                const labelText = t(item.labelKey, currentLang);

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleTabClick(item.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-md font-black'
                        : 'bg-slate-50 text-slate-800 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-amber-600'}`} />
                    <span className="flex-1 text-start">{labelText}</span>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="bg-amber-500 text-black font-black text-[10px] rounded-full px-2 py-0.5">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mobile Footer Language & Province Selection */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3 relative z-10">
              <div>
                <label className="text-[11px] font-bold text-slate-800 block mb-1">زبان منتخب کریں:</label>
                <div className="flex flex-wrap gap-1">
                  {SUPPORTED_LANGUAGES.map((lang) => {
                    const isActive = currentLang === lang.code;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => onLanguageChange(lang.code)}
                        className={`text-[11px] px-2.5 py-1 rounded-lg font-bold border transition ${
                          isActive
                            ? 'bg-amber-500 text-black border-amber-400'
                            : 'bg-white text-slate-800 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {lang.nativeName}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-800 block mb-1">صوبہ / Jurisdiction:</label>
                <select
                  value={currentProvince}
                  onChange={(e) => onProvinceChange(e.target.value as ProvinceCode)}
                  className="w-full bg-white text-slate-900 font-bold text-xs py-2 px-3 rounded-xl border border-slate-200 focus:outline-none"
                >
                  {PROVINCES.map((prov) => (
                    <option key={prov.code} value={prov.code} className="bg-white text-slate-900">
                      {prov.name[currentLang] || prov.name.ur}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. MOBILE BOTTOM NAV BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-1.5 px-2 flex items-center justify-around shadow-lg no-print h-16">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const labelText = t(item.labelKey, currentLang).replace(/^[^\s]+\s*/, ''); // strip emoji for compact mobile text

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleTabClick(item.id)}
              className={`flex flex-col items-center justify-center p-1.5 rounded-xl text-[10px] font-bold transition-all min-w-[54px] min-h-[44px] cursor-pointer ${
                isActive
                  ? 'text-amber-800 bg-amber-50 border border-amber-300 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-600 scale-110' : 'text-slate-400'}`} />
              <span className="mt-0.5 text-[9px] truncate max-w-[56px]">{labelText}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};
