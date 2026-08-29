import React, { useState, useMemo } from 'react';
import { LanguageCode, TranslatedText } from '../types';
import { LEGAL_FAQS, LEGAL_FAQ_CATEGORIES, LegalFaqItem } from '../data/legalFaqs';
import {
  HelpCircle,
  Search,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Volume2,
  VolumeX,
  Copy,
  Check,
  ShieldAlert,
  Lightbulb,
  FileCheck2,
  Scale,
  ArrowRight,
  Info,
} from 'lucide-react';

interface LegalFaqViewProps {
  currentLang: LanguageCode;
  onNavigateTab?: (tab: 'explainer' | 'matcher' | 'drafter' | 'lawLibrary' | 'helpline' | 'glossary' | 'saved' | 'faq') => void;
}

const FAQ_UI_STRINGS: Record<string, TranslatedText> = {
  heroTag: {
    en: 'Legal FAQs • Citizens Legal Aid',
    ur: 'عام فہم قانونی سوال و جواب • پاکستان لیگل ایڈ',
    sd: 'عام قانوني سوال ۽ جواب • پاڪستان ليگل ايڊ',
    pa: 'عام قانونی سوال جواب • پاکستان لیگل ایڈ',
    ps: 'عام قانوني پوښتنې او ځوابونه • پاکستان ليګل اېډ',
  },
  heroSubtag: {
    en: 'Simplified Guidance for Non-Lawyers & Citizens',
    ur: 'غیر وکلاء اور عام شہریوں کے لیے آسان رہنمائی',
    sd: 'عام ماڻهن ۽ شهري لاءِ آسان رهنمايئ',
    pa: 'عام لوکاں تے شہریاں لئی آسان رہنمائی',
    ps: 'د عامو وګړو لپاره ساده لارښوونه',
  },
  heroTitle: {
    en: 'Common Questions on Pakistani Legal Processes, Police & Courts',
    ur: 'پاکستان کے قانونی مراحل، پولیس و عدالتی کارروائی کے عام سوالات',
    sd: 'پاڪستان جي قانوني مرحلن، پوليس ۽ عدالتي ڪارروائيءَ جا عام سوال',
    pa: 'پاکستان دے قانونی مراحل، پولیس تے عدالتی کارروائی دے عام سوالات',
    ps: 'د پاکستان قانوني پړاوونو، پولیسو او قضایي کړنو عامې پوښتنې',
  },
  heroDescription: {
    en: 'Clear, summarized answers to common citizen questions about FIR registration, police station rights, consumer protection, tenant disputes, online fraud, and free state legal aid.',
    ur: 'ایف آئی آر، صارفین کے حقوق، کرایہ داری تنازعات، آن لائن سائبر فراڈ اور مفت قانونی امداد کے بارے میں شہریوں کے ذہن میں اٹھنے والے اہم سوالات کے سادہ اور مختصر جوابات۔',
    sd: 'ايف آئي آر، صارفين جا حق، ڪرايو، سائيبر فراڊ ۽ مفت قانوني مدد بابت آسان ۽ مختصر جواب.',
    pa: 'ایف آئی آر، صارفین دے حقوق، کرایہ داری، آن لائن فراڈ تے مفت قانونی امداد بارے سوالاں دے سوکھے جواب۔',
    ps: 'د اېف آی ار، د مصرف کوونکو حقونو، کرایې، انټرنیټي درغلیو او وړیا قانوني مرستې په هکله روښانه ځوابونه.',
  },
  statTotal: {
    en: 'Total FAQs',
    ur: 'مجموعی سوالات',
    sd: 'ڪل سوال',
    pa: 'سارے سوال',
    ps: 'ټولې پوښتنې',
  },
  statOffline: {
    en: '100% Offline Available',
    ur: '100% آف لائن دستیاب',
    sd: '100% آف لائن موجود',
    pa: '100% آف لائن دستیاب',
    ps: '۱۰۰٪ په آفلاین توګه چمتو',
  },
  statNoLawyer: {
    en: 'Accessible for Non-Lawyers',
    ur: 'بغیر وکیل کے سمجھیں',
    sd: 'وڪيل کان بغير سمجھو',
    pa: 'وکیل توں بغیر سمجھو',
    ps: 'له وکیله پرته پوه شئ',
  },
  searchPlaceholder: {
    en: 'Search questions or topics (e.g., FIR, Consumer Court, 1099, Bounced Cheque, Succession)...',
    ur: 'سوال یا موضوع تلاش کریں (مثلاً: ایف آئی آر، کنزیومر کورٹ، 1099، چیک بونس، وراثت)...',
    sd: 'سوال يا موضوع ڳوليو (مثلاً: ايف آئي آر، ڪنزيومر ڪورٽ، 1099)...',
    pa: 'سوال یا موضوع لبھو (مثال: ایف آئی آر، کنزیومر کورٹ، 1099)...',
    ps: 'پوښتنه یا موضوع وپټوئ (مثلاً: اېف آی ار، مصرف کوونکو محکمه، ۱۰۹۹)...',
  },
  searchClear: {
    en: 'Clear',
    ur: 'صاف کریں',
    sd: 'صاف ڪريو',
    pa: 'صاف کرو',
    ps: 'پاک کړئ',
  },
  filterBySubject: {
    en: 'Filter by Subject:',
    ur: 'موضوع کے مطابق فلٹر کریں:',
    sd: 'موضوع جي لحاظ کان فلٽر ڪريو:',
    pa: 'موضوع دے مطابق فلٹر کرو:',
    ps: 'د موضوع له مخې وټاکئ:',
  },
  showingCount: {
    en: 'Showing',
    ur: 'ظاہر شدہ',
    sd: 'موجود',
    pa: 'ظاہر شدہ',
    ps: 'ښودل شوي',
  },
  noResultTitle: {
    en: 'No Matching FAQs Found',
    ur: 'کوئی سوال نہیں ملا',
    sd: 'ڪوبه سوال نه مليو',
    pa: 'کوئی سوال نہیں لبھیا',
    ps: 'هیڅ پوښتنه ونه موندل شوه',
  },
  noResultDesc: {
    en: 'No questions matched your search query. Try searching with different keywords or reset the topic filter.',
    ur: 'آپ کے درج کردہ الفاظ سے مطابقت رکھتا کوئی سوال نہیں ملا۔ برائے مہربانی دیگر الفاظ کے ساتھ تلاش کریں یا تمام موضوعات پر کلک کریں۔',
    sd: 'توهان جي لکيل لفظن سان ملندڙ ڪوبه سوال نه مليو.',
    pa: 'تہاڈے لفظاں نال ملدا کوئی سوال نہیں لبھیا۔',
    ps: 'ستاسو د لټون سره سمون لرونکې پوښتنه ونه موندل شوه.',
  },
  resetFilters: {
    en: 'Reset All Filters',
    ur: 'تمام فلٹرز ختم کریں',
    sd: 'فلٽر ختم ڪريو',
    pa: 'سارے فلٹر ختم کرو',
    ps: 'ټول فلټرونه پاک کړئ',
  },
  summaryHeader: {
    en: 'Summarized Legal Answer:',
    ur: 'سادہ اور خلاصہ قانونی جواب (Summarized Answer):',
    sd: 'سادو ۽ خلاصو قانوني جواب:',
    pa: 'سادہ تے خلاصہ قانونی جواب:',
    ps: 'ساده او خلاصہ قانوني ځواب:',
  },
  listen: {
    en: 'Listen',
    ur: 'سنیں',
    sd: 'ٻڌو',
    pa: 'سنو',
    ps: 'واورئ',
  },
  stop: {
    en: 'Stop',
    ur: 'روکیں',
    sd: 'روڪيو',
    pa: 'روکو',
    ps: 'ودروئ',
  },
  copy: {
    en: 'Copy',
    ur: 'کاپی',
    sd: 'ڪاپي',
    pa: 'کاپی',
    ps: 'کاژي',
  },
  copied: {
    en: 'Copied!',
    ur: 'کاپی ہو گیا',
    sd: 'ڪاپي ٿي ويو',
    pa: 'کاپی ہو گیا',
    ps: 'کاژي شو',
  },
  keyTakeawayHeader: {
    en: 'Key Legal Rights & Takeaways:',
    ur: 'اہم قانونی حقوق و نکتہ (Key Legal Rights):',
    sd: 'اهم قانوني حق ۽ نقطو:',
    pa: 'اہم قانونی حقوق تے گل:',
    ps: 'مهم قانوني حقونه او نقطه:',
  },
  actionStepsHeader: {
    en: 'Key Steps & Actionable Guidance:',
    ur: 'اہم عملی اقدامات و رہنمائی (Key Steps):',
    sd: 'اهم قدم ۽ عملي رهنمايئ:',
    pa: 'اہم قدم تے عملی رہنمائی:',
    ps: 'مهم ګامونه او عملي لارښوونه:',
  },
  relevantLawLabel: {
    en: 'Relevant Law:',
    ur: 'متعلقہ قانون:',
    sd: 'متعلقه قانون:',
    pa: 'متعلقہ قانون:',
    ps: 'اړوند قانون:',
  },
  goToDrafter: {
    en: 'Draft a Complaint Letter',
    ur: 'درخواست نویسی کی طرف جائیں',
    sd: 'درخواست جي تياري ڏانهن وڃو',
    pa: 'درخواست نویسی ول جاؤ',
    ps: 'د عریضې ليکلو ته ورشئ',
  },
  footerTitle: {
    en: 'Need Urgent Legal Help or Toll-Free Numbers?',
    ur: 'مزید قانونی سوالات یا ایمرجنسی مدد چاہیے؟',
    sd: 'وڌيڪ قانوني سوال يا ايمرجنسي مدد گھرجي؟',
    pa: 'مزید قانونی سوال یا ایمرجنسی مدد چاہیدی اے؟',
    ps: 'نورو قانوني پوښتنو یا بیړنۍ مرستې ته اړتیا لرئ؟',
  },
  footerSubtitle: {
    en: 'Call Ministry of Law Toll-Free Helpline 1099 or view our Directory of Official Helplines.',
    ur: 'وزارتِ قانون کی مفت ٹول فری ہیلپ لائن 1099 پر کال کریں یا ہیلپ لائن ڈائریکٹری دیکھیں',
    sd: 'وزارت قانون جي مفت هيپ لائن 1099 تي ڪال ڪريو يا ڊائريڪٽري ڏسو',
    pa: 'وزارتِ قانون دی 1099 ہیلپ لائن تے کال کرو یا ڈائریکٹری دیکھو',
    ps: 'د قانون وزارت وړیا شمیرې ۱۰۹۹ ته زنګ ووهئ یا ډایرکټري وګورئ',
  },
  footerButton: {
    en: 'View Helplines Directory',
    ur: 'ہیلپ لائنز دیکھیں',
    sd: 'هيلپ لائنون ڏسو',
    pa: 'ہیلپ لائنز دیکھو',
    ps: 'ډایرکټري وګورئ',
  },
};

export const LegalFaqView: React.FC<LegalFaqViewProps> = ({ currentLang, onNavigateTab }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq_fir_process');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const tf = (key: string): string => {
    const item = FAQ_UI_STRINGS[key];
    if (!item) return key;
    return item[currentLang] || item.en || item.ur || key;
  };

  const isRtl = currentLang !== 'en';
  const fontClass = isRtl ? 'font-urdu' : '';

  // Filter FAQs based on category and search query
  const filteredFaqs = useMemo(() => {
    return LEGAL_FAQS.filter((item) => {
      // Category check
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Search query check
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const questionText = (item.question[currentLang] || item.question.en || item.question.ur || '').toLowerCase();
      const answerText = (item.answer[currentLang] || item.answer.en || item.answer.ur || '').toLowerCase();
      const takeawaysText = (item.keyTakeaways[currentLang] || item.keyTakeaways.en || item.keyTakeaways.ur || '').toLowerCase();
      const lawText = item.relevantLaw.toLowerCase();

      return (
        questionText.includes(q) ||
        answerText.includes(q) ||
        takeawaysText.includes(q) ||
        lawText.includes(q)
      );
    });
  }, [selectedCategory, searchQuery, currentLang]);

  // Handle Speech Synthesis
  const handleToggleSpeak = (item: LegalFaqItem) => {
    if ('speechSynthesis' in window) {
      if (speakingId === item.id) {
        window.speechSynthesis.cancel();
        setSpeakingId(null);
        return;
      }

      window.speechSynthesis.cancel();
      const qText = item.question[currentLang] || item.question.en || item.question.ur;
      const aText = item.answer[currentLang] || item.answer.en || item.answer.ur;
      const textToSpeak = `${qText}. ${aText}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);

      // Set language code
      if (currentLang === 'ur') utterance.lang = 'ur-PK';
      else if (currentLang === 'en') utterance.lang = 'en-US';
      else utterance.lang = 'ur-PK'; // fallback

      utterance.onend = () => setSpeakingId(null);
      utterance.onerror = () => setSpeakingId(null);

      window.speechSynthesis.speak(utterance);
      setSpeakingId(item.id);
    }
  };

  const handleCopy = (item: LegalFaqItem) => {
    const qText = item.question[currentLang] || item.question.en || item.question.ur;
    const aText = item.answer[currentLang] || item.answer.en || item.answer.ur;
    const formatted = `${tf('summaryHeader')}\nQ: ${qText}\n\nA: ${aText}\n\n${tf('relevantLawLabel')} ${item.relevantLaw}\n- Citizen Legal Aid Portal`;

    navigator.clipboard.writeText(formatted);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* 1. HERO BANNER */}
      <div className="bg-gradient-to-br from-slate-900 via-zinc-900 to-slate-950 text-white rounded-2xl p-5 sm:p-7 border border-amber-500/30 shadow-lg relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute -top-12 -right-12 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-amber-600/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 px-3 py-1 rounded-full text-amber-300 text-xs font-black">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>{tf('heroTag')}</span>
            </div>
            <span className="text-[11px] font-extrabold bg-slate-800 text-slate-300 px-3 py-1 rounded-lg border border-slate-700">
              {tf('heroSubtag')}
            </span>
          </div>

          <div className="space-y-2">
            <h1 className={`text-xl sm:text-2xl font-black text-white leading-tight ${fontClass}`}>
              {tf('heroTitle')}
            </h1>
            <p className={`text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed ${fontClass}`}>
              {tf('heroDescription')}
            </p>
          </div>

          {/* Quick Stats Badges */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px]">
            <span className="bg-slate-800/80 text-amber-300 px-3 py-1 rounded-lg border border-slate-700 font-bold">
              {tf('statTotal')}: {LEGAL_FAQS.length}
            </span>
            <span className="bg-slate-800/80 text-slate-300 px-3 py-1 rounded-lg border border-slate-700 font-medium">
              {tf('statOffline')}
            </span>
            <span className="bg-slate-800/80 text-slate-300 px-3 py-1 rounded-lg border border-slate-700 font-medium">
              {tf('statNoLawyer')}
            </span>
          </div>
        </div>
      </div>

      {/* 2. SEARCH & CATEGORY FILTER CONTROL BAR */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
        {/* Search Bar Input */}
        <div className="relative">
          <div className="absolute inset-y-0 start-0 start-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5 text-amber-600" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={tf('searchPlaceholder')}
            className={`w-full bg-slate-50 text-slate-900 placeholder-slate-400 font-bold text-xs sm:text-sm ps-10 pe-10 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 focus:bg-white transition ${fontClass}`}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 end-0 pe-3 flex items-center text-xs font-black text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              {tf('searchClear')}
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600">
            <span className={fontClass}>{tf('filterBySubject')}</span>
            <span className="text-[11px] text-slate-400 font-mono">
              {tf('showingCount')}: {filteredFaqs.length} / {LEGAL_FAQS.length}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {LEGAL_FAQ_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const catLabel = cat.label[currentLang] || cat.label.en || cat.label.ur;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm font-black'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  } ${fontClass}`}
                >
                  {catLabel}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. FAQ ACCORDION LIST */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-3">
            <ShieldAlert className="w-10 h-10 text-amber-500 mx-auto" />
            <h3 className={`text-base font-bold text-slate-900 ${fontClass}`}>
              {tf('noResultTitle')}
            </h3>
            <p className={`text-xs text-slate-500 max-w-md mx-auto ${fontClass}`}>
              {tf('noResultDesc')}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-amber-500 text-black text-xs font-black rounded-xl hover:bg-amber-400 transition cursor-pointer"
            >
              {tf('resetFilters')}
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isExpanded = expandedFaqId === faq.id;
            const qText = faq.question[currentLang] || faq.question.en || faq.question.ur;
            const aText = faq.answer[currentLang] || faq.answer.en || faq.answer.ur;
            const takeawaysText = faq.keyTakeaways[currentLang] || faq.keyTakeaways.en || faq.keyTakeaways.ur;
            const categoryText = faq.categoryLabel[currentLang] || faq.categoryLabel.en || faq.categoryLabel.ur;

            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-xs ${
                  isExpanded
                    ? 'border-amber-400 shadow-md ring-1 ring-amber-400/30'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  type="button"
                  onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                  className="w-full p-4 sm:p-5 flex items-start justify-between gap-3 text-start cursor-pointer hover:bg-slate-50/80 transition-colors"
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div
                      className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                        isExpanded
                          ? 'bg-amber-500 text-black font-black'
                          : 'bg-amber-500/10 text-amber-800'
                      }`}
                    >
                      <HelpCircle className="w-5 h-5" />
                    </div>

                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-[10px] font-black text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md ${fontClass}`}>
                          {categoryText}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {faq.relevantLaw}
                        </span>
                      </div>

                      <h3 className={`text-sm sm:text-base font-black text-slate-900 leading-snug ${fontClass}`}>
                        {qText}
                      </h3>
                    </div>
                  </div>

                  <div className="p-1 rounded-lg bg-slate-100 text-slate-600 shrink-0 mt-1">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {/* Accordion Content Body */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 space-y-4 bg-slate-50/40">
                    {/* Summarized Answer Box */}
                    <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2 shadow-xs">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className={`text-xs font-black text-amber-700 flex items-center gap-1.5 ${fontClass}`}>
                          <BookOpen className="w-4 h-4 text-amber-600" />
                          <span>{tf('summaryHeader')}</span>
                        </span>

                        {/* Action Buttons: Speak & Copy */}
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleToggleSpeak(faq)}
                            className={`p-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                              speakingId === faq.id
                                ? 'bg-amber-500 text-black'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                            title="Listen"
                          >
                            {speakingId === faq.id ? (
                              <VolumeX className="w-3.5 h-3.5" />
                            ) : (
                              <Volume2 className="w-3.5 h-3.5" />
                            )}
                            <span className="text-[10px] hidden sm:inline">
                              {speakingId === faq.id ? tf('stop') : tf('listen')}
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleCopy(faq)}
                            className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                            title="Copy Answer"
                          >
                            {copiedId === faq.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-[10px] text-emerald-600">{tf('copied')}</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-slate-600" />
                                <span className="text-[10px] hidden sm:inline">{tf('copy')}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      <p className={`text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line ${fontClass}`}>
                        {aText}
                      </p>
                    </div>

                    {/* Key Takeaway Badge */}
                    <div className="p-3.5 bg-amber-500/10 rounded-xl border border-amber-400/30 flex items-start gap-2.5">
                      <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div className="space-y-0.5 text-xs">
                        <span className={`font-extrabold text-amber-900 block ${fontClass}`}>
                          {tf('keyTakeawayHeader')}
                        </span>
                        <p className={`text-amber-800 font-medium leading-normal ${fontClass}`}>
                          {takeawaysText}
                        </p>
                      </div>
                    </div>

                    {/* Actionable Steps (If Available) */}
                    {faq.actionSteps && faq.actionSteps.length > 0 && (
                      <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
                        <span className={`text-xs font-black text-slate-900 flex items-center gap-1.5 ${fontClass}`}>
                          <FileCheck2 className="w-4 h-4 text-amber-600" />
                          <span>{tf('actionStepsHeader')}</span>
                        </span>
                        <ol className={`space-y-1.5 list-decimal list-inside text-xs text-slate-700 leading-relaxed ${fontClass}`}>
                          {faq.actionSteps.map((step, sIdx) => {
                            const stepText = step[currentLang] || step.en || step.ur;
                            return (
                              <li key={sIdx} className="ps-1">
                                {stepText}
                              </li>
                            );
                          })}
                        </ol>
                      </div>
                    )}

                    {/* Relevant Law Reference & Quick Links */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-slate-500">
                      <div className="flex items-center gap-1">
                        <Info className="w-3.5 h-3.5 text-slate-400" />
                        <span className={fontClass}>{tf('relevantLawLabel')} </span>
                        <span className="font-bold text-slate-700">{faq.relevantLaw}</span>
                      </div>

                      {onNavigateTab && (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onNavigateTab('drafter')}
                            className={`text-amber-700 hover:text-amber-900 font-bold underline flex items-center gap-1 cursor-pointer ${fontClass}`}
                          >
                            <span>{tf('goToDrafter')}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* 4. FOOTER ASSISTANCE BANNER */}
      <div className="p-4 bg-slate-900 text-white rounded-2xl border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-400/30 shrink-0">
            <Scale className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <span className={`font-bold block text-sm ${fontClass}`}>{tf('footerTitle')}</span>
            <span className={`text-slate-300 text-[11px] ${fontClass}`}>
              {tf('footerSubtitle')}
            </span>
          </div>
        </div>

        {onNavigateTab && (
          <button
            type="button"
            onClick={() => onNavigateTab('helpline')}
            className={`px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs transition cursor-pointer shrink-0 shadow-sm ${fontClass}`}
          >
            {tf('footerButton')}
          </button>
        )}
      </div>
    </div>
  );
};

