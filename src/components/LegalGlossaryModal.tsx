import React, { useState } from 'react';
import { LanguageCode } from '../types';
import { COMMON_LEGAL_GLOSSARY } from '../data/docTypesData';
import { t } from '../data/uiStrings';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { speakText, stopTextToSpeech, isSpeaking } from '../utils/textToSpeech';
import { BookOpen, Search, Volume2, VolumeX, Scale, Sparkles, Check, Copy, Globe, ChevronDown, ChevronUp, Eye } from 'lucide-react';

interface LegalGlossaryModalProps {
  currentLang: LanguageCode;
}

export const LegalGlossaryModal: React.FC<LegalGlossaryModalProps> = ({ currentLang }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [expandedKeys, setExpandedKeys] = useState<Record<string, boolean>>({});

  const toggleExpand = (termKey: string) => {
    setExpandedKeys((prev) => ({
      ...prev,
      [termKey]: !prev[termKey],
    }));
  };

  // Search filtering across terms & definitions in ALL supported languages
  const filteredTerms = COMMON_LEGAL_GLOSSARY.filter((item) => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return true;

    // Check term titles across all languages
    const inTerm = Object.values(item.term).some((val) => val && val.toLowerCase().includes(q));
    // Check definitions across all languages
    const inDef = Object.values(item.definition).some((val) => val && val.toLowerCase().includes(q));
    // Check legal reference
    const inRef = item.legalReference ? item.legalReference.toLowerCase().includes(q) : false;

    return inTerm || inDef || inRef;
  });

  const handleSpeak = (text: string, lang: LanguageCode, uniqueId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (speakingId === uniqueId && isSpeaking()) {
      stopTextToSpeech();
      setSpeakingId(null);
    } else {
      setSpeakingId(uniqueId);
      speakText(text, lang, () => setSpeakingId(null));
    }
  };

  const handleCopyAll = (item: typeof COMMON_LEGAL_GLOSSARY[0], e: React.MouseEvent) => {
    e.stopPropagation();
    const refStr = item.legalReference ? `\n\nLegal Reference: ${item.legalReference}` : '';
    const textToCopy = `🏛️ ${item.term.en || item.term.ur}\n` +
      `-----------------------------------\n` +
      `🇬🇧 English: ${item.definition.en}\n\n` +
      `🇵🇰 اردو: ${item.definition.ur}\n\n` +
      `🇵🇰 سنڌي: ${item.definition.sd}\n\n` +
      `🇵🇰 پنجابی: ${item.definition.pa}\n\n` +
      `🇵🇰 پښتو: ${item.definition.ps}` +
      refStr;

    navigator.clipboard.writeText(textToCopy);
    setCopiedKey(item.termKey);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Feature Banner Header - Law Library Styled Dark Slate Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-lg border border-slate-800 relative overflow-hidden no-print">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="p-3.5 bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-2xl shadow-md shrink-0">
            <BookOpen className="w-7 h-7 text-amber-400" />
          </div>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>100% Multilingual Offline Legal Dictionary</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t('tab.glossary', currentLang)} - کثیر اللسانی قانونی لغت
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-3xl font-urdu">
              {currentLang === 'sd'
                ? 'قانوني اصطلاحاتن ۽ معنيٰ جائزي لاءِ سڌو سنئون لغت ڏسو.'
                : currentLang === 'en'
                ? 'Explore full legal term definitions across 5 languages with audio narration.'
                : currentLang === 'ps'
                ? 'په ۵ ژبو کې د قانوني اصطلاحاتو مکمل معنيٰ او تشرېح وګورئ.'
                : 'پاکستان کے تمام قوانین اور عدالت کی بنیادی اصطلاحات کی آسان تشریح تمام ۵ زبانوں (اردو، انگریزی، سندھی، پنجابی، پشتو) میں دیکھیں۔'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Glossary Content Card - Clean Law Library Light Theme */}
      <div className="bg-white rounded-2xl p-4 sm:p-7 shadow-sm border border-slate-200 space-y-5 text-slate-900">
        {/* Search Header Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md inline-block border border-amber-200">
                Legal Glossary & Dictionary
              </span>
              <span className="text-xs font-mono font-extrabold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                {filteredTerms.length} Words
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-amber-600" />
              <span>قانون اور عدالت کی بنیادی اصطلاحات</span>
            </h2>
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-80">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="تلاش کریں (English, اردو, سنڌي, پښتو, پنجابی)..."
              className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-xl pl-4 pr-10 py-2.5 text-xs sm:text-sm font-medium focus:outline-none focus:border-amber-500 focus:bg-white shadow-2xs transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Terms List (Dropdown Accordion per Word) */}
        {filteredTerms.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-3">
            <Search className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800 font-urdu">کوئی اصطلاح نہیں ملی</h3>
            <p className="text-xs text-slate-500 font-urdu">کوئی دوسرا لفظ یا انگریزی / اردو نام تلاش کر کے دیکھیں۔</p>
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="px-4 py-2 bg-amber-500 text-black rounded-xl text-xs font-black hover:bg-amber-400 transition"
            >
              تمام الفاظ دکھائیں
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTerms.map((item) => {
              const primaryTerm = item.term[currentLang] || item.term.ur || item.term.en;
              const isCopied = copiedKey === item.termKey;
              const isExpanded = !!expandedKeys[item.termKey] || (searchTerm.trim().length > 0 && true);

              return (
                <div
                  key={item.termKey}
                  className={`border rounded-2xl transition-all shadow-2xs overflow-hidden ${
                    isExpanded
                      ? 'bg-amber-50/20 border-amber-300/90 ring-2 ring-amber-500/10'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Clickable Word Header Bar */}
                  <div
                    onClick={() => toggleExpand(item.termKey)}
                    className={`p-3.5 sm:p-4 cursor-pointer select-none flex items-center justify-between gap-3 transition ${
                      isExpanded ? 'bg-amber-50/60' : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className={`p-2 rounded-xl border shrink-0 transition ${
                        isExpanded
                          ? 'bg-amber-500 text-black border-amber-400 font-black shadow-xs'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        <Scale className="w-4 h-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                            {item.termKey.toUpperCase()}
                          </span>
                          {item.legalReference && (
                            <span className="text-[10px] font-mono font-extrabold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                              مرجع: {item.legalReference}
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm sm:text-base font-black text-slate-900 font-urdu mt-0.5 flex items-center gap-2 flex-wrap">
                          <span>{primaryTerm}</span>
                          <span className="text-xs font-normal text-slate-500 font-sans">
                            ({item.term.en})
                          </span>
                        </h3>
                      </div>
                    </div>

                    {/* Right side controls: Click indicator & Chevron Dropdown Icon */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[11px] font-bold font-urdu px-2.5 py-1 rounded-lg border hidden sm:inline-flex items-center gap-1 transition ${
                        isExpanded
                          ? 'bg-amber-100 text-amber-900 border-amber-300'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        <Eye className="w-3.5 h-3.5 text-amber-600" />
                        <span>{isExpanded ? 'معنی چھپائیں' : 'معنی دیکھیں (5 زبانیں)'}</span>
                      </span>

                      <div className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all ${
                        isExpanded
                          ? 'bg-amber-500 text-black border-amber-400 font-black'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Dropdown Expanded Multilingual Meanings Content */}
                  {isExpanded && (
                    <div className="p-3.5 sm:p-4 pt-2 border-t border-slate-200 space-y-3 bg-slate-50/80 animate-fadeIn">
                      {/* Sub-header with Copy All */}
                      <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200">
                        <span className="text-xs font-bold text-slate-700 font-urdu flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-amber-600" />
                          <span>تمام ۵ زبانوں میں باضابطہ تشریح و آڈیو:</span>
                        </span>

                        <button
                          type="button"
                          onClick={(e) => handleCopyAll(item, e)}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-amber-500 hover:text-black text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 shadow-2xs"
                          title="Copy meanings in all languages"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700 font-urdu">کاپیاں ہو گئیں!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-amber-600" />
                              <span className="font-urdu">معانی کاپی کریں</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Multilingual Meanings Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
                        {SUPPORTED_LANGUAGES.map((langObj) => {
                          const langCode = langObj.code;
                          const termInLang = item.term[langCode] || item.term.ur || item.term.en;
                          const defInLang = item.definition[langCode] || item.definition.ur || item.definition.en;
                          const uniqueSpeakId = `${item.termKey}_${langCode}`;
                          const isThisSpeaking = speakingId === uniqueSpeakId;

                          return (
                            <div
                              key={langCode}
                              className={`bg-white border border-slate-200/90 rounded-xl p-3 space-y-1.5 hover:border-amber-300 hover:shadow-2xs transition-all ${
                                langObj.dir === 'rtl' ? 'text-right' : 'text-left'
                              }`}
                              dir={langObj.dir}
                            >
                              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-1">
                                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200/80 font-mono">
                                  {langObj.nativeName} ({langObj.name})
                                </span>

                                <button
                                  type="button"
                                  onClick={(e) => handleSpeak(`${termInLang}. ${defInLang}`, langCode, uniqueSpeakId, e)}
                                  className="text-[10px] font-bold text-slate-700 bg-slate-100 hover:bg-amber-500 hover:text-black border border-slate-200 px-2 py-0.5 rounded-md flex items-center gap-1 transition-colors cursor-pointer"
                                  title={`Listen in ${langObj.name}`}
                                >
                                  {isThisSpeaking ? (
                                    <>
                                      <VolumeX className="w-3 h-3 text-rose-600 animate-pulse" />
                                      <span>بند کریں</span>
                                    </>
                                  ) : (
                                    <>
                                      <Volume2 className="w-3 h-3 text-amber-600" />
                                      <span>سنیں</span>
                                    </>
                                  )}
                                </button>
                              </div>

                              <div className="font-bold text-slate-900 text-[11px] font-urdu">
                                {termInLang}
                              </div>

                              <p className="text-slate-600 leading-relaxed text-[11px] font-medium font-urdu">
                                {defInLang}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};


