import React from 'react';
import { LanguageCode, ProvinceCode } from '../types';
import { SUPPORTED_LANGUAGES, PROVINCES } from '../data/languages';
import { Globe, Check, ShieldCheck, MapPin } from 'lucide-react';

interface LanguageSelectorBarProps {
  currentLang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  currentProvince: ProvinceCode;
  onProvinceChange: (province: ProvinceCode) => void;
}

export const LanguageSelectorBar: React.FC<LanguageSelectorBarProps> = ({
  currentLang,
  onLanguageChange,
  currentProvince,
  onProvinceChange,
}) => {
  return (
    <div className="bg-white/95 backdrop-blur-xl text-slate-900 border-b border-slate-200 shadow-xs sticky top-0 z-30 min-h-[48px] py-1.5 px-3 sm:px-6 flex items-center no-print w-full">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-2.5 flex-nowrap min-w-0">
        {/* Mobile Language Select Dropdown */}
        <div className="flex sm:hidden items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5 shadow-xs shrink-0 max-w-[170px]">
          <Globe className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <select
            value={currentLang}
            onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
            className="bg-transparent text-slate-900 font-extrabold text-xs focus:outline-none cursor-pointer w-full"
            aria-label="Select Language"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code} className="bg-white text-slate-900 font-medium">
                {lang.nativeName} ({lang.code.toUpperCase()})
              </option>
            ))}
          </select>
        </div>

        {/* Desktop / Tablet Section: Language Pills */}
        <div className="hidden sm:flex items-center gap-2 py-0.5 min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-600 shrink-0 border-r border-slate-200 pr-2.5">
            <Globe className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="text-xs font-extrabold text-slate-700 whitespace-nowrap">
              زبان / Language:
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold shrink-0">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isActive = currentLang === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => onLanguageChange(lang.code)}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all duration-200 text-xs whitespace-nowrap font-bold cursor-pointer border ${
                    isActive
                      ? 'bg-amber-500 text-black border-amber-400 shadow-xs font-black scale-102'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border-slate-200'
                  }`}
                  aria-label={`Switch language to ${lang.name}`}
                >
                  <span>{lang.nativeName}</span>
                  {isActive && <Check className="w-3.5 h-3.5 text-black shrink-0 stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Section: Jurisdiction Dropdown & Privacy Status */}
        <div className="flex items-center gap-2 text-xs shrink-0">
          <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5 shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="text-slate-700 font-bold text-[11px] hidden lg:inline whitespace-nowrap">
              صوبہ / Jurisdiction:
            </span>
            <select
              value={currentProvince}
              onChange={(e) => onProvinceChange(e.target.value as ProvinceCode)}
              className="bg-transparent text-slate-900 font-extrabold text-xs focus:outline-none cursor-pointer"
            >
              {PROVINCES.map((prov) => (
                <option key={prov.code} value={prov.code} className="bg-white text-slate-900 font-medium">
                  {prov.name[currentLang] || prov.name.ur}
                </option>
              ))}
            </select>
          </div>

          {/* Privacy Badge */}
          <div className="hidden xl:flex items-center gap-1.5 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>100% Offline & Private</span>
          </div>
        </div>
      </div>
    </div>
  );
};
