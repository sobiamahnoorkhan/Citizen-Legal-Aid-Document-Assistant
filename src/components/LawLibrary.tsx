import React, { useState } from 'react';
import {
  BookOpen,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  FileText,
  Building2,
  ExternalLink,
  Search,
  Scale,
  Shield,
  Briefcase,
  ShoppingBag,
  Siren,
  Lock,
  UserX,
  Zap,
  Home,
  Receipt,
  ArrowRight,
  Sparkles,
  HeartOff,
  Users,
  Smartphone,
  ShieldAlert,
} from 'lucide-react';
import { LanguageCode } from '../types';
import { LAW_LIBRARY_CATEGORIES } from '../data/lawLibraryData';
import { COMMON_LEGAL_GLOSSARY } from '../data/docTypesData';

interface LawLibraryProps {
  language: LanguageCode;
  onSelectTab: (tab: string) => void;
  onSelectComplaintTemplate?: (templateId: string) => void;
  onSelectGlossaryTerm?: (termKey: string) => void;
}

const UI_TEXT = {
  en: {
    title: 'Pakistani Law Library & Visual Guides',
    subtitle: 'Simplified, translated step-by-step rights, legal remedies, and filing instructions for citizens.',
    searchPlaceholder: 'Search laws, rights, or categories...',
    categoriesTitle: 'Legal Categories',
    allCategories: 'All Categories',
    lawsCovered: 'Laws Covered:',
    understandRights: 'Understand Your Rights',
    exampleScenario: 'Real-World Scenario',
    whatLawSays: 'What the Law Says',
    whatYouCanDo: 'What You Can Do',
    processFlow: 'Step-by-Step Legal Process',
    whereToFile: 'How & Where to File a Complaint',
    startComplaintBtn: 'Start a Complaint for This Issue',
    relatedGlossary: 'Related Legal Terms in Glossary',
    disclaimerTitle: 'Official Legal Information Notice',
    backToCategories: 'Back to All Law Categories',
    step: 'Step',
    timeframe: 'Timeline:',
    forum: 'Competent Authority / Forum:',
    keyLaws: 'Key Legislation:',
  },
  ur: {
    title: 'پاکستانی قوانین کی لائبریری اور بصری رہنما',
    subtitle: 'عوام الناس کے لیے آسان اردو اور علاقائی زبانوں میں حقوق، قانونی حل اور شکایت درج کروانے کا طریقہ۔',
    searchPlaceholder: 'قوانین، حقوق یا زمرے تلاش کریں...',
    categoriesTitle: 'قانونی زمرہ جات',
    allCategories: 'تمام زمرے',
    lawsCovered: 'شامل قوانین:',
    understandRights: 'اپنے بنیادی حقوق سمجھیں',
    exampleScenario: 'عملی مثال اور سچا واقعہ',
    whatLawSays: 'قانون کیا کہتا ہے؟',
    whatYouCanDo: 'متاثرہ شخص کیا کر سکتا ہے؟',
    processFlow: 'مرحلہ وار قانونی عمل (Visual Flow)',
    whereToFile: 'شکایت کہاں اور کیسے درج کروائیں؟',
    startComplaintBtn: 'اس مسئلے کی درخواست تیار کریں',
    relatedGlossary: 'متعلقہ قانونی اصطلاحات (فرہنگ)',
    disclaimerTitle: 'قانونی آگاہی و دستبرداری',
    backToCategories: 'تمام قانونی زمرہ جات پر واپس جائیں',
    step: 'مرحلہ',
    timeframe: 'متوقع وقت:',
    forum: 'متعلقہ ادارہ / فورٹ:',
    keyLaws: 'اہم قوانین:',
  },
  sd: {
    title: 'پاڪستاني قانون جي لائبريري ۽ بصري رهنما',
    subtitle: 'شهرين لاءِ آسان سنڌي زبان ۾ حق، قانوني حل ۽ درخواستون ڏيڻ جو طريقيڪار.',
    searchPlaceholder: 'قانون يا درجا ڳوليو...',
    categoriesTitle: 'قانوني درجا',
    allCategories: 'سڀ درجا',
    lawsCovered: 'شامل قانون:',
    understandRights: 'پنهنجا بنيادي حق سمجھو',
    exampleScenario: 'عملي مثال',
    whatLawSays: 'قانون ڇا ٿو چوي؟',
    whatYouCanDo: 'متاثر شخص ڇا ڪري سگهي ٿو؟',
    processFlow: 'قدم به قدم قانوني عمل',
    whereToFile: 'درخواست ڪٿي ۽ ڪئين داخل ڪجي؟',
    startComplaintBtn: 'درخواست تيار ڪريو',
    relatedGlossary: 'قانوني اصطلاحون',
    disclaimerTitle: 'قانوني آگاهي',
    backToCategories: 'واپس سڀني درجن تي وڃو',
    step: 'قدم',
    timeframe: 'وقت:',
    forum: 'اڳواڻي ادارو:',
    keyLaws: 'مهم قانون:',
  },
  pa: {
    title: 'پاکستانی قوانین دی لائبریری تے وژول گائیڈ',
    subtitle: 'عوام لئی منجھی ہوئی پنجابی زبان وچ حقوق، قانونی حل تے شکایت درج کروان دا طریقہ۔',
    searchPlaceholder: 'قوانین یا حقوق لبھو...',
    categoriesTitle: 'قانونی زمرے',
    allCategories: 'سارے زمرے',
    lawsCovered: 'شامل قوانین:',
    understandRights: 'اپنے بنیادی حقوق سمجھو',
    exampleScenario: 'سچی کہانی تے مثال',
    whatLawSays: 'قانون کی کہندا اے؟',
    whatYouCanDo: 'تسی کی کر سکدے او؟',
    processFlow: 'قدم بہ قدم قانونی طریقہ',
    whereToFile: 'شکایت کتھے تے کیسے درج کروائیے؟',
    startComplaintBtn: 'درخواست تیار کرو',
    relatedGlossary: 'قانونی لفظاں دا فرہنگ',
    disclaimerTitle: 'قانونی خبرداری',
    backToCategories: 'سارے زمریاں تے واپس جاؤ',
    step: 'قدم',
    timeframe: 'وقت:',
    forum: 'متعلقہ فورم:',
    keyLaws: 'اہم قانون:',
  },
  ps: {
    title: 'د پاکستاني قوانینو عامه پیژندنه او لارښود',
    subtitle: 'د عامو وګړو لپاره په خپله مورنۍ ژبه کې د حقونو، قانوني پروسې او عریضې لګولو ساده لارښود.',
    searchPlaceholder: 'قوانین او موضوعات لټول...',
    categoriesTitle: 'قانوني څانګې',
    allCategories: 'ټولې څانګې',
    lawsCovered: 'شامل قوانین:',
    understandRights: 'خپل حقونه وپیژنئ',
    exampleScenario: 'حقيقي مثال او کیسه',
    whatLawSays: 'قانون څه وایي؟',
    whatYouCanDo: 'تاسو څه کولی شئ؟',
    processFlow: 'ګام په ګام قانوني بهیر',
    whereToFile: 'شکایت چېرته او څنګه درج کړو؟',
    startComplaintBtn: 'خپله رسمی عریضه جوړه کړئ',
    relatedGlossary: 'اړوند قانوني اصطلاحات',
    disclaimerTitle: 'قانوني معلومات او خبرتیا',
    backToCategories: 'بیرته ټولو څانګو ته',
    step: 'ګام',
    timeframe: 'مهال ویش:',
    forum: 'اړونده مرجع:',
    keyLaws: 'مهم قوانین:',
  },
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Home: <Home className="w-6 h-6 text-amber-400" />,
  Scale: <Scale className="w-6 h-6 text-amber-400" />,
  Briefcase: <Briefcase className="w-6 h-6 text-amber-400" />,
  ShoppingBag: <ShoppingBag className="w-6 h-6 text-amber-400" />,
  Siren: <Siren className="w-6 h-6 text-rose-400" />,
  Lock: <Lock className="w-6 h-6 text-amber-400" />,
  UserX: <UserX className="w-6 h-6 text-amber-400" />,
  Zap: <Zap className="w-6 h-6 text-amber-400" />,
  Shield: <Shield className="w-6 h-6 text-amber-400" />,
  Receipt: <Receipt className="w-6 h-6 text-amber-400" />,
  HeartOff: <HeartOff className="w-6 h-6 text-rose-400" />,
  Users: <Users className="w-6 h-6 text-amber-400" />,
  Smartphone: <Smartphone className="w-6 h-6 text-cyan-400" />,
  ShieldAlert: <ShieldAlert className="w-6 h-6 text-rose-400" />,
};

export const LawLibrary: React.FC<LawLibraryProps> = ({
  language,
  onSelectTab,
  onSelectComplaintTemplate,
  onSelectGlossaryTerm,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTabSection, setActiveTabSection] = useState<'rights' | 'scenario' | 'process' | 'filing'>('rights');

  const text = UI_TEXT[language] || UI_TEXT.en;
  const isRtl = language !== 'en';

  const selectedCategory = LAW_LIBRARY_CATEGORIES.find((cat) => cat.id === selectedCategoryId);

  const filteredCategories = LAW_LIBRARY_CATEGORIES.filter((cat) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const name = (cat.title[language] || cat.title.en).toLowerCase();
    const laws = (cat.lawsCovered[language] || cat.lawsCovered.en).toLowerCase();
    const rightsStr = (cat.rightsBullets[language] || cat.rightsBullets.en).join(' ').toLowerCase();
    return name.includes(q) || laws.includes(q) || rightsStr.includes(q);
  });

  const handleStartComplaint = (templateId: string) => {
    if (onSelectComplaintTemplate) {
      onSelectComplaintTemplate(templateId);
    }
    onSelectTab('drafter');
  };

  const handleGlossaryClick = (termKey: string) => {
    if (onSelectGlossaryTerm) {
      onSelectGlossaryTerm(termKey);
    }
    onSelectTab('glossary');
  };

  return (
    <div className={`space-y-6 ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Category Landing Screen */}
      {!selectedCategory ? (
        <div className="space-y-6">
          {/* Header Banner with Modern Glassmorphism */}
          <div className="bg-slate-900/90 backdrop-blur-xl bg-gradient-to-br from-slate-900/95 via-zinc-900/90 to-slate-950/95 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-amber-500/30 relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute left-1/3 bottom-0 w-48 h-48 bg-amber-600/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/15 border border-amber-400/30 backdrop-blur-md text-amber-300 rounded-full text-xs font-bold shadow-xs">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>100% Offline Pakistani Legal Knowledge</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                {text.title}
              </h1>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {text.subtitle}
              </p>

              {/* Search Bar */}
              <div className="pt-2">
                <div className="relative max-w-xl">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={text.searchPlaceholder}
                    className="w-full pl-10 pr-4 py-2.5 bg-black/60 backdrop-blur-md border border-zinc-700/80 text-white placeholder-zinc-400 rounded-xl text-sm focus:outline-none focus:border-amber-400 transition shadow-inner"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Scale className="w-5 h-5 text-amber-600" />
                {text.categoriesTitle}
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                {filteredCategories.length} Categories Available
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCategories.map((cat) => {
                const icon = CATEGORY_ICONS[cat.iconName] || <BookOpen className="w-6 h-6 text-amber-600" />;
                const catTitle = cat.title[language] || cat.title.en;
                const catLaws = cat.lawsCovered[language] || cat.lawsCovered.en;
                const catRights = cat.rightsBullets[language] || cat.rightsBullets.en;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className="group text-left p-5 bg-white border border-slate-200 rounded-2xl hover:border-amber-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between text-slate-900 shadow-xs cursor-pointer"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl group-hover:scale-105 transition-transform">
                          {icon}
                        </div>
                        <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                          {catRights.length} Rights
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                          {catTitle}
                        </h3>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed font-medium">
                          {catRights[0]}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500 line-clamp-1 max-w-[80%] font-mono">
                        {catLaws}
                      </span>
                      <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Category Detail Screen */
        <div className="space-y-6">
          {/* Top Navigation */}
          <button
            onClick={() => setSelectedCategoryId(null)}
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-800 hover:text-amber-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200 transition shadow-xs cursor-pointer"
          >
            <ArrowLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            <span>{text.backToCategories}</span>
          </button>

          {/* Detail Header Banner with Modern Glassmorphism */}
          <div className="bg-slate-900/90 backdrop-blur-xl bg-gradient-to-br from-slate-900/95 via-zinc-900/90 to-slate-950/95 border border-amber-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden space-y-4 text-white">
            <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3.5 bg-amber-500/20 border border-amber-400/40 backdrop-blur-md rounded-2xl text-amber-400 shadow-inner">
                  {CATEGORY_ICONS[selectedCategory.iconName] || <BookOpen className="w-8 h-8 text-amber-400" />}
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-white">
                    {selectedCategory.title[language] || selectedCategory.title.en}
                  </h1>
                  <p className="text-xs sm:text-sm text-amber-300 font-bold mt-0.5">
                    {text.lawsCovered} {selectedCategory.lawsCovered[language] || selectedCategory.lawsCovered.en}
                  </p>
                </div>
              </div>

              {selectedCategory.filingBox.templateId && (
                <button
                  onClick={() => handleStartComplaint(selectedCategory.filingBox.templateId!)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black text-xs sm:text-sm font-black rounded-xl shadow-md transition transform active:scale-95 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-black" />
                  <span>{text.startComplaintBtn}</span>
                </button>
              )}
            </div>

            {/* Quick Navigation Tabs */}
            <div className="relative z-10 flex items-center gap-2 overflow-x-auto pt-2 border-t border-zinc-800/80 scrollbar-none">
              <button
                onClick={() => setActiveTabSection('rights')}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  activeTabSection === 'rights'
                    ? 'bg-amber-500 text-black font-black shadow-xs'
                    : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700/80 hover:text-white border border-zinc-700/60'
                }`}
              >
                {text.understandRights}
              </button>
              <button
                onClick={() => setActiveTabSection('scenario')}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  activeTabSection === 'scenario'
                    ? 'bg-amber-500 text-black font-black shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {text.exampleScenario}
              </button>
              <button
                onClick={() => setActiveTabSection('process')}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  activeTabSection === 'process'
                    ? 'bg-amber-500 text-black font-black shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {text.processFlow}
              </button>
              <button
                onClick={() => setActiveTabSection('filing')}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  activeTabSection === 'filing'
                    ? 'bg-amber-500 text-black font-black shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {text.whereToFile}
              </button>
            </div>
          </div>

          {/* SECTION 1: UNDERSTAND YOUR RIGHTS */}
          {(activeTabSection === 'rights' || true) && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-slate-900">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-amber-600" />
                {text.understandRights}
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(selectedCategory.rightsBullets[language] || selectedCategory.rightsBullets.en).map((right, idx) => (
                  <li
                    key={idx}
                    className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                    <span className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                      {right}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* SECTION 2: REAL-WORLD EXAMPLE SCENARIO */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-slate-900">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              {text.exampleScenario}
            </h2>

            {/* Story Box */}
            <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs sm:text-sm text-slate-800 italic leading-relaxed font-medium">
              "{selectedCategory.scenario.story[language] || selectedCategory.scenario.story.en}"
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* What the Law Says */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-amber-600" />
                  {text.whatLawSays}
                </h3>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {selectedCategory.scenario.whatLawSays[language] || selectedCategory.scenario.whatLawSays.en}
                </p>
              </div>

              {/* What the person can do */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-amber-600" />
                  {text.whatYouCanDo}
                </h3>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {selectedCategory.scenario.whatPersonCanDo[language] || selectedCategory.scenario.whatPersonCanDo.en}
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 3: STEP-BY-STEP VISUAL FLOW / STATUTORY GUIDANCE & FILING ROADMAP */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-slate-900">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-600" />
              {text.processFlow}
            </h2>

            <div className="space-y-3 relative">
              {selectedCategory.flowSteps.map((step, idx) => {
                const stepTitle = step.title[language] || step.title.en;
                const stepDesc = step.description[language] || step.description.en;

                return (
                  <div
                    key={idx}
                    className="p-4 bg-slate-50 border border-slate-200 rounded-xl relative flex flex-col sm:flex-row items-start gap-4 transition-all hover:border-amber-400 hover:bg-amber-50/40"
                  >
                    <div className="w-8 h-8 rounded-full bg-amber-500 text-black font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
                      {step.stepNumber || idx + 1}
                    </div>

                    <div className="space-y-1 flex-1">
                      <h3 className="text-sm font-extrabold text-slate-900">
                        {stepTitle}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                        {stepDesc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 4: HOW & WHERE TO FILE A COMPLAINT / FILING ROADMAP */}
          <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-wider">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>{text.whereToFile}</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-extrabold text-white">
                {selectedCategory.filingBox.forumName[language] || selectedCategory.filingBox.forumName.en}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                {selectedCategory.filingBox.whereToFile[language] || selectedCategory.filingBox.whereToFile.en}
              </p>
            </div>

            {selectedCategory.filingBox.templateId && (
              <div className="pt-2">
                <button
                  onClick={() => handleStartComplaint(selectedCategory.filingBox.templateId!)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-black text-sm rounded-xl shadow-md transition transform active:scale-95 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-black" />
                  <span>{text.startComplaintBtn}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-black" />
                </button>
              </div>
            )}
          </div>

          {/* SECTION 5: RELATED GLOSSARY TERMS */}
          {selectedCategory.relatedGlossaryKeys && selectedCategory.relatedGlossaryKeys.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3 text-slate-900">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                {text.relatedGlossary}
              </h3>

              <div className="flex flex-wrap gap-2">
                {selectedCategory.relatedGlossaryKeys.map((key) => {
                  const entry = COMMON_LEGAL_GLOSSARY.find((g) => g.termKey === key);
                  const displayTerm = entry ? entry.term[language] || entry.term.en : key;

                  return (
                    <button
                      key={key}
                      onClick={() => handleGlossaryClick(key)}
                      className="px-3 py-1.5 bg-slate-50 hover:bg-amber-50 text-slate-800 hover:text-amber-900 border border-slate-200 hover:border-amber-300 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <span>{displayTerm}</span>
                      <ArrowRight className="w-3 h-3 text-amber-600" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STANDING DISCLAIMER */}
          <div className="p-4 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-1">
            <span className="font-bold text-slate-800 block">
              {text.disclaimerTitle}
            </span>
            <p className="leading-relaxed">
              {language === 'ur'
                ? 'یہ معلومات صرف عام آگاہی اور تعلیمی مقاصد کے لیے تیار کی گئی ہیں۔ یہ کسی باقاعدہ وکیل کی پیشہ ورانہ قانونی مشاورت کا نعم البدل نہیں ہے۔ ضرورت پڑنے پر اپنے قریبی متعلقہ قانونی امداد کے شعبے سے رجوع کریں۔'
                : language === 'sd'
                ? 'اهي معلومات رڳو عام آگاهي لاءِ آهن. اها ڪنهن به وڪيل جي سرڪاري صلاح جو متبادل ناهي.'
                : language === 'pa'
                ? 'یہ معلومات صرف عام آگاہی لئی نے۔ کسے وکیل دی قانونی مشاورت دا بدل نہیں۔'
                : language === 'ps'
                ? 'دا معلومات یوازې د عامه پوهاوي لپاره دي او د رسمي قانوني مشاور نېغ په نېغ ځای نه نیسي.'
                : 'This guide is provided strictly for public awareness and civic education. It does not constitute formal legal counsel. Consult a legal practitioner or legal aid office for formal litigation.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
