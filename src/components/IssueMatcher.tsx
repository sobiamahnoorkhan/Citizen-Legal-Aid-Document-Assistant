import React, { useState, useEffect } from 'react';
import { LawEntry, LanguageCode, ProvinceCode } from '../types';
import { PAKISTAN_LAWS_LIBRARY } from '../data/lawsData';
import { PROVINCES } from '../data/languages';
import { t } from '../data/uiStrings';
import { findMatchingLaw } from '../utils/fuzzySearch';
import { speakText, stopTextToSpeech, isSpeaking } from '../utils/textToSpeech';
import { useSpeechToText } from '../hooks/useSpeechToText';
import {
  Mic,
  MicOff,
  Search,
  RotateCcw,
  Volume2,
  VolumeX,
  Scale,
  Sparkles,
  ListOrdered,
  Building2,
  AlertTriangle,
  MapPin,
  ShieldCheck,
  Tag,
  Radio,
} from 'lucide-react';

interface IssueMatcherProps {
  currentLang: LanguageCode;
  currentProvince: ProvinceCode;
}

export const IssueMatcher: React.FC<IssueMatcherProps> = ({ currentLang, currentProvince }) => {
  const [queryText, setQueryText] = useState<string>('');
  const [matchedLaws, setMatchedLaws] = useState<LawEntry[]>(PAKISTAN_LAWS_LIBRARY);
  const [selectedLaw, setSelectedLaw] = useState<LawEntry | null>(null);
  const [isReadAloudActive, setIsReadAloudActive] = useState<boolean>(false);

  const handleSearch = (overrideQuery?: string) => {
    const q = overrideQuery !== undefined ? overrideQuery : queryText;
    const results = findMatchingLaw(q, currentLang);
    setMatchedLaws(results);
    if (results.length > 0) {
      setSelectedLaw(results[0]);
    }
  };

  const {
    isListening,
    isSupported,
    errorMessage,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechToText({
    lang: currentLang,
    onTranscriptChange: (text) => {
      setQueryText(text);
      handleSearch(text);
    },
  });

  const handleClear = () => {
    setQueryText('');
    setMatchedLaws(PAKISTAN_LAWS_LIBRARY);
    setSelectedLaw(null);
    stopTextToSpeech();
    setIsReadAloudActive(false);
    resetTranscript();
    if (isListening) {
      stopListening();
    }
  };

  const toggleMic = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening(currentLang);
    }
  };

  const toggleReadAloud = () => {
    if (!selectedLaw) return;
    if (isReadAloudActive && isSpeaking()) {
      stopTextToSpeech();
      setIsReadAloudActive(false);
    } else {
      const textToRead = `${selectedLaw.lawName[currentLang] || selectedLaw.lawName.ur}. ${
        selectedLaw.simpleExplanation[currentLang] || selectedLaw.simpleExplanation.ur
      }`;
      setIsReadAloudActive(true);
      speakText(textToRead, currentLang, () => setIsReadAloudActive(false));
    }
  };

  const selectedProvinceInfo = PROVINCES.find((p) => p.code === currentProvince);

  return (
    <div className="space-y-6">
      {/* Feature Banner Header with Modern Glassmorphism */}
      <div className="bg-slate-900/90 backdrop-blur-xl bg-gradient-to-br from-slate-900/95 via-zinc-900/90 to-slate-950/95 text-white rounded-3xl p-6 sm:p-7 border border-amber-500/30 shadow-2xl relative overflow-hidden no-print">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 w-48 h-48 bg-amber-600/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="p-3.5 bg-amber-500/20 border border-amber-400/40 backdrop-blur-md text-amber-400 rounded-2xl shadow-inner shrink-0">
            <Search className="w-7 h-7 text-amber-400" />
          </div>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/15 border border-amber-400/30 backdrop-blur-md text-amber-300 rounded-full text-xs font-bold mb-1 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>100% Offline Pakistani Legal Search Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              {currentLang === 'sd'
                ? 'مسئلو ۽ قانون لڀندڙ'
                : currentLang === 'en'
                ? 'Legal Issue & Law Matcher'
                : currentLang === 'ps'
                ? 'د مسلې او قانون لټونکی'
                : 'مسئلہ و قانون کی تلاش'}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 font-medium leading-relaxed max-w-3xl">
              {currentLang === 'sd'
                ? 'پنهنجي روزاني مسائلي کي عام ٻولي يا آواز ذريعي بيان ڪريو ۽ متعلقہ قانوني قلم، حل ۽ هدايتون حاصل ڪريو۔'
                : currentLang === 'en'
                ? 'Search or speak your legal situation in plain language to find relevant Pakistani laws and instant remedies.'
                : currentLang === 'ps'
                ? 'خپله قانوني مسله په اسانه ژبه کې ولیکئ یا ووایاست ترڅو اړوند قوانین او پړاوونه ومومئ.'
                : 'اپنی درپیش قانونی مشکل یا شکایت کو عام سلیس الفاظ میں لکھیں یا بول کر بتائیں، ہمارا سمارٹ انجن فوراً متعلقہ قانونی دفعہ اور حل تلاش کر دے گا۔'}
            </p>
          </div>
        </div>
      </div>

      {/* Input Box & Voice Controls */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200 space-y-4">
        <label className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Scale className="w-5 h-5 text-amber-600" />
          <span>{t('matcher.input_label', currentLang)}</span>
        </label>

        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={queryText}
              onChange={(e) => {
                setQueryText(e.target.value);
                handleSearch(e.target.value);
              }}
              placeholder="مثلاً: خلع کا طریقہ، مالک مکان سیکیورٹی نہیں دے رہا، روکی ہوئی تنخواہ، آن لائن ہراسانی..."
              className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-xl px-4 py-3.5 pr-12 text-sm font-medium focus:outline-none focus:border-amber-500 focus:bg-white transition-all shadow-inner placeholder-slate-400"
            />
            {/* Mic Button inside input on the right side */}
            <button
              type="button"
              onClick={toggleMic}
              disabled={!isSupported}
              title={t('matcher.mic_tooltip', currentLang)}
              className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all cursor-pointer ${
                isListening
                  ? 'bg-rose-600 text-white animate-pulse shadow-md'
                  : 'text-slate-400 hover:text-amber-600 hover:bg-slate-100'
              }`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
          </div>

          <button
            type="button"
            onClick={() => handleSearch()}
            className="bg-amber-500 hover:bg-amber-400 text-black font-black text-sm px-6 py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Search className="w-4 h-4 text-black" />
            <span>{t('btn.find_match', currentLang)}</span>
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm px-4 py-3.5 rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t('btn.clear', currentLang)}</span>
          </button>
        </div>

        {/* Live Speech Recording Status Banner */}
        {isListening && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 flex items-center justify-between gap-3 text-rose-900 animate-fadeIn">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
              </span>
              <span className="text-xs font-bold font-urdu">
                آواز ریکارڈ ہو رہی ہے... (بولیں) / Listening... Speak now
              </span>
            </div>
            <button
              type="button"
              onClick={stopListening}
              className="text-xs font-extrabold bg-rose-600 hover:bg-rose-700 text-white px-3 py-1 rounded-lg border border-rose-600 transition-colors"
            >
              روکیں (Stop)
            </button>
          </div>
        )}

        {errorMessage && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Preset Quick Chips */}
        <div className="pt-2">
          <span className="text-xs font-semibold text-slate-600 block mb-2">
            {t('matcher.preset_label', currentLang)}
          </span>
          <div className="flex flex-wrap gap-2">
            {PAKISTAN_LAWS_LIBRARY.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSelectedLaw(item);
                  setQueryText(item.keywords[currentLang]?.[0] || item.keywords.ur[0]);
                }}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedLaw?.id === item.id
                    ? 'bg-amber-500 text-black font-black border-amber-400 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Tag className={`w-3 h-3 ${selectedLaw?.id === item.id ? 'text-black' : 'text-amber-600'}`} />
                <span>{item.category[currentLang]?.split('(')[0] || item.category.ur.split('(')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Law Match Card */}
      {selectedLaw && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6 animate-fadeIn text-slate-900">
          {/* Top Category Badge & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 px-3.5 py-1.5 rounded-full font-black text-xs uppercase tracking-wider border border-amber-200">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>{selectedLaw.category[currentLang] || selectedLaw.category.ur}</span>
            </div>

            {/* Read Aloud Button */}
            <button
              type="button"
              onClick={toggleReadAloud}
              className={`border font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-2 shadow-xs transition-all cursor-pointer ${
                isReadAloudActive
                  ? 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-200'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
              }`}
            >
              {isReadAloudActive ? (
                <>
                  <VolumeX className="w-4 h-4 text-rose-600 animate-pulse" />
                  <span>{t('btn.stop_audio', currentLang)}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-amber-600" />
                  <span>{t('btn.read_aloud', currentLang)}</span>
                </>
              )}
            </button>
          </div>

          {/* Law Name Heading */}
          <div>
            <span className="text-xs font-bold text-slate-500 block uppercase tracking-wide">
              {t('matcher.applicable_law', currentLang)}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {selectedLaw.lawName[currentLang] || selectedLaw.lawName.ur}
            </h2>
            <p className="text-xs font-mono text-amber-900 bg-amber-50/80 px-3 py-1 rounded-lg inline-block mt-2 border border-amber-200 shadow-xs font-semibold">
              {selectedLaw.statuteCitation}
            </p>
          </div>

          {/* What This Means in Simple Terms */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>{t('matcher.simple_meaning', currentLang)}</span>
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed font-medium">
              {selectedLaw.simpleExplanation[currentLang] || selectedLaw.simpleExplanation.ur}
            </p>
          </div>

          {/* Remedy & Action Steps You Can Take */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ListOrdered className="w-5 h-5 text-amber-600" />
              <span>{t('matcher.remedies', currentLang)}</span>
            </h3>

            <div className="space-y-2.5">
              {(selectedLaw.remedySteps[currentLang] || selectedLaw.remedySteps.ur).map((step, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3 shadow-xs"
                >
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-black font-extrabold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                    {idx + 1}
                  </span>
                  <p className="text-sm font-medium text-slate-800 leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Where & How to File a Complaint */}
          <div className="bg-amber-50/60 text-slate-900 rounded-2xl p-6 shadow-xs space-y-3 border border-amber-200">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
              <Building2 className="w-5 h-5" />
              <span>{t('matcher.forum', currentLang)}</span>
            </div>
            <p className="text-base font-bold text-slate-900">
              {selectedLaw.forumToStore[currentLang] || selectedLaw.forumToStore.ur}
            </p>
            {selectedProvinceInfo && (
              <p className="text-xs text-slate-600 font-semibold flex items-center gap-1.5 pt-2 border-t border-amber-200">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                <span>
                  موجودہ منتخب صوبہ: {selectedProvinceInfo.name[currentLang] || selectedProvinceInfo.name.ur} (
                  {selectedProvinceInfo.forumSuffix[currentLang] || selectedProvinceInfo.forumSuffix.ur})
                </span>
              </p>
            )}
          </div>

          {/* Location & Provincial Variation Disclaimer */}
          <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl flex items-start gap-3 text-xs text-amber-950">
            <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">صوبائی طریقہ کار میں فرق کی تنبیہ:</strong>
              پاکستان کے مختلف صوبوں (پنجاب، سندھ، خیبر پختونخوا، بلوچستان اور وفاقی دارالحکومت اسلام آباد) میں عدالتی دائرہ اختیار اور رینٹ کنٹرولر / محتسب کی لوکیشن میں معمولی فرق ہو سکتا ہے۔
            </div>
          </div>

          {/* Safety Disclaimer */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3 text-xs text-slate-600">
            <AlertTriangle className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">{t('disclaimer.title', currentLang)}</strong>
              {t('disclaimer.text', currentLang)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
