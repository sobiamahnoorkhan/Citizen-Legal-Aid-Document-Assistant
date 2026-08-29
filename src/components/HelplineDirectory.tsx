import React, { useState, useMemo } from 'react';
import { LanguageCode, ProvinceCode, HelplineCategoryKey, HelplineItem } from '../types';
import { HELPLINE_CATEGORIES, HELPLINES_DATA } from '../data/helplinesData';
import { APP_FAQS, FAQ_CATEGORY_LABELS, AppFaqItem } from '../data/appFaqData';
import { PROVINCES } from '../data/languages';
import {
  PhoneCall,
  Phone,
  Search,
  Mic,
  MicOff,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Clock,
  MapPin,
  Scale,
  ShieldAlert,
  Laptop,
  Building2,
  Users,
  AlertTriangle,
  Info,
  CheckCircle2,
  Share2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Smartphone,
  FileText,
  Lock,
} from 'lucide-react';

interface HelplineDirectoryProps {
  currentLang: LanguageCode;
  currentProvince: ProvinceCode;
  onProvinceChange: (province: ProvinceCode) => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Scale: <Scale className="w-5 h-5 text-amber-400" />,
  ShieldAlert: <ShieldAlert className="w-5 h-5 text-rose-400" />,
  Laptop: <Laptop className="w-5 h-5 text-amber-400" />,
  PhoneCall: <PhoneCall className="w-5 h-5 text-amber-400" />,
  Building2: <Building2 className="w-5 h-5 text-zinc-400" />,
  Users: <Users className="w-5 h-5 text-amber-400" />,
};

// Pre-Call Preparation Checklist data in all supported languages
const PRE_CALL_CHECKLIST_DATA: Record<
  LanguageCode,
  {
    title: string;
    subtitle: string;
    items: { title: string; desc: string }[];
  }
> = {
  en: {
    title: 'Checklist Before Calling Any Legal Helpline',
    subtitle: 'Having these details ready ensures your complaint is registered accurately and swiftly.',
    items: [
      {
        title: '1. CNIC / National ID Number',
        desc: 'Keep your 13-digit CNIC number and date of birth handy or memorized.',
      },
      {
        title: '2. Incident Date & Location',
        desc: 'Note down when and where the incident occurred, including district, police station, or city.',
      },
      {
        title: '3. Opposite Party Details',
        desc: 'Name, designation, or contact number of the opposing individual, office, or official (if available).',
      },
      {
        title: '4. Concise Written Summary',
        desc: 'Keep a 2–3 sentence brief summary or evidence notes ready to reference during the call.',
      },
    ],
  },
  ur: {
    title: 'ہیلپ لائن پر کال کرنے سے پہلے یہ معلومات تیار رکھیں',
    subtitle: 'یہ معلومات پہلے سے تیار رکھنے سے آپ کا مسئلہ تیزی اور درستگی سے درج ہو گا۔',
    items: [
      {
        title: '1. شناختی کارڈ نمبر (CNIC)',
        desc: 'اپنا 13 ہندسوں کا شناختی کارڈ نمبر اور تاریخ پیدائش یاد یا پاس رکھیں۔',
      },
      {
        title: '2. واقعہ کی تاریخ و مقام',
        desc: 'واقعہ کب اور کہاں پیش آیا، ضلع اور تھانہ یا شہر کا نام یاد رکھیں یا نوٹ کر لیں۔',
      },
      {
        title: '3. فریق ثانی کی معلومات',
        desc: 'مخالف شخص، ادارے، یا سرکاری اہلکار کا نام اور فون نمبر (اگر موجود ہو)۔',
      },
      {
        title: '4. مختصر تحریری خلاصہ',
        desc: 'اپنے مسئلے کی 2 سے 3 لائنوں میں مختصر تحریر یا ثبوت اپنے پاس رکھیں کال کے دوران۔',
      },
    ],
  },
  sd: {
    title: 'هيلپ لائن تي ڪال ڪرڻ کان اڳ هي معلومات تيار ركو',
    subtitle: 'هي معلومات اڳواٽ تيار رکڻ سان اوهان جو مسئلو تيزي ۽ درستگي سان داخل ٿيندو.',
    items: [
      {
        title: '1. شناختي ڪارڊ نمبر (CNIC)',
        desc: 'پنهنجو 13 انگن وارو شناختي ڪارڊ نمبر ۽ جنم جي تاريخ پاسي ۾ رکو.',
      },
      {
        title: '2. واقعي جي تاريخ ۽ جاءِ',
        desc: 'واقعو ڪڏهن ۽ ڪٿي ٿيو، ضلعي ۽ ٿاڻي يا شهر جو نالو ياد يا نوٽ رکو.',
      },
      {
        title: '3. مخالف ڌر جي معلومات',
        desc: 'مخالف شخص، اداري، يا سرڪاري اهلڪار جو نالو ۽ فون نمبر (جيڪڏهن موجود هجي).',
      },
      {
        title: '4. مختصر تحريري خلاصو',
        desc: 'پنهنجي مسئلي جي 2 کان 3 سٽن ۾ مختصر تحرير يا ثبوت ڪال دوران وٽس رکو.',
      },
    ],
  },
  pa: {
    title: 'ہیلپ لائن تے کال کرن توں پہلاں ایہ معلومات تیار رکھو',
    subtitle: 'ایہ معلومات پہلاں توں تیار رکھن نال تواڈا مسئلہ تیزی تے ٹھیک طریقے نال درج ہووے گا۔',
    items: [
      {
        title: '1. شناختی کارڈ نمبر (CNIC)',
        desc: 'اپنا 13 ہندسیاں دا شناختی کارڈ نمبر تے جمݨ دی تریخ پاسے رکھو۔',
      },
      {
        title: '2. واقعہ دی تریخ تے جگہ',
        desc: 'واقعہ کدوں تے کتھے ہویا، ضلع تے تھانہ یا شہر دا ناں یاد رکھو یا نوٹ کر لو۔',
      },
      {
        title: '3. مخالف ڌر دی معلومات',
        desc: 'مخالف بندے، ادارے، یا سرکاری اہلکار دا ناں تے فون نمبر (جے موجود ہووے)۔',
      },
      {
        title: '4. مختصر تحریری خلاصہ',
        desc: 'اپݨے مسئلے دی 2 توں 3 لائناں وچ مختصر تحریر یا ثبوت اپنے کول رکھو کال دے دوران۔',
      },
    ],
  },
  ps: {
    title: 'کومې قانوني هیلپ لاین ته د زنګ وهلو دمخه دا معلومات چمتو کړئ',
    subtitle: 'د دې توضیحاتو چمتو کول ډاډ ورکوي چې ستاسو شکایت په دقیق او سمدستي توګه ثبت شوی.',
    items: [
      {
        title: '1. د پیژندپاڼې شمیره (CNIC)',
        desc: 'خپل ۱۳ عددي ملي پیژندپاڼه شمیره او د زیږون نیټه چمتو وساتئ.',
      },
      {
        title: '2. د پیښې نیټه او ځای',
        desc: 'په یاد ولرئ چې پیښه کله او چیرته شوې، په شمول د ضلعې، پولیس سټیشن يا ښار نوم.',
      },
      {
        title: '3. د مخالف لوري جزییات',
        desc: 'د مخالف کس، ادارې، يا دولتي چارواکي نوم او د اړیکې شمیره (که موجود وي).',
      },
      {
        title: '4. لنډ لیکلی خلاصه',
        desc: 'د زنګ وهلو پر مهال د خپلې مسلې ۲ تر ۳ کرښو لنډیز یا شواهد له ځانه سره ولرئ.',
      },
    ],
  },
};

export const HelplineDirectory: React.FC<HelplineDirectoryProps> = ({
  currentLang,
  currentProvince,
  onProvinceChange,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<HelplineCategoryKey | 'all'>('all');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<ProvinceCode | 'all' | 'national'>(currentProvince);
  const [isListening, setIsListening] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // FAQ State
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>('all');
  const [faqSearchQuery, setFaqSearchQuery] = useState<string>('');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');

  const isRtl = currentLang !== 'en';

  // Filter FAQs
  const filteredFaqs = useMemo(() => {
    return APP_FAQS.filter((faq) => {
      // Category filter
      if (selectedFaqCategory !== 'all' && faq.category !== selectedFaqCategory) {
        return false;
      }

      // Search query filter
      if (!faqSearchQuery.trim()) return true;

      const q = faqSearchQuery.toLowerCase().trim();
      const questionStr = (faq.question[currentLang] || faq.question.ur || faq.question.en || '').toLowerCase();
      const answerStr = (faq.answer[currentLang] || faq.answer.ur || faq.answer.en || '').toLowerCase();

      return questionStr.includes(q) || answerStr.includes(q);
    });
  }, [selectedFaqCategory, faqSearchQuery, currentLang]);

  // Toggle Speech Recognition
  const toggleMic = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert(
        currentLang === 'en'
          ? 'Voice search is not supported in this browser.'
          : 'آپ کے براؤزر میں آواز کی تلاش کی سہولت موجود نہیں ہے۔'
      );
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = currentLang === 'en' ? 'en-US' : 'ur-PK';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      setIsListening(false);
    };

    recognition.start();
  };

  const handleCopyPhone = (id: string, phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Filter Helplines
  const filteredHelplines = useMemo(() => {
    return HELPLINES_DATA.filter((item) => {
      // 1. Category Filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // 2. Jurisdiction Filter
      if (
        selectedJurisdiction !== 'all' &&
        item.jurisdiction !== 'national' &&
        item.jurisdiction !== selectedJurisdiction
      ) {
        return false;
      }

      // 3. Search Query Filter
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const nameStr = (item.name[currentLang] || item.name.en || '').toLowerCase();
      const deptStr = (item.department[currentLang] || item.department.en || '').toLowerCase();
      const descStr = (item.description[currentLang] || item.description.en || '').toLowerCase();
      const phoneStr = item.phone.toLowerCase();
      const displayPhoneStr = item.displayPhone.toLowerCase();

      return (
        nameStr.includes(q) ||
        deptStr.includes(q) ||
        descStr.includes(q) ||
        phoneStr.includes(q) ||
        displayPhoneStr.includes(q)
      );
    });
  }, [searchQuery, selectedCategory, selectedJurisdiction, currentLang]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Hero Title & Quick Search Bar */}
      <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-zinc-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex items-start gap-4">
            <div className="p-3.5 bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-2xl shadow-md shrink-0">
              <PhoneCall className="w-7 h-7 text-amber-400" />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>پاکستان قومی ہنگامی و قانونی ڈائریکٹری</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
                {currentLang === 'en'
                  ? 'Toll-Free Emergency & Legal Aid Helplines'
                  : 'پاکستان ٹول فری اور ہنگامی قانونی ہیلپ لائنز'}
              </h1>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
                {currentLang === 'en'
                  ? 'Direct one-touch calling to government legal aid, police, FIA cybercrime, women & child safety, and ombudsman services across Pakistan.'
                  : 'پورے پاکستان کے لیے قانونی امداد، پولیس، ایف آئی اے سائبر کرائم، خواتین و چائلڈ پروٹیکشن، اور محتسب اعلیٰ کی ایک کلک ڈائلنگ ہیلپ لائنز۔'}
              </p>
            </div>
          </div>

          {/* Search Bar Input with Mic on Right Side */}
          <div className="relative pt-2">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-zinc-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  currentLang === 'en'
                    ? 'Search by department, phone number, or issue (e.g. 1099, cybercrime, police, child)...'
                    : 'محکمہ، نمبر یا مسئلہ تلاش کریں (مثلاً: 1099، سائبر کرائم، پولیس، چائلڈ، خواتین)...'
                }
                className="w-full bg-black text-white placeholder-zinc-500 border border-zinc-800 rounded-2xl pl-12 pr-12 py-4 text-sm font-medium focus:outline-none focus:border-amber-500 transition-all shadow-inner"
              />

              {/* Speech-to-text mic icon positioned on the RIGHT side */}
              <button
                type="button"
                onClick={toggleMic}
                title={isListening ? 'Listening...' : 'Search by Voice'}
                className={`absolute right-3.5 p-2 rounded-xl transition-all ${
                  isListening
                    ? 'bg-rose-500 text-white animate-bounce'
                    : 'text-zinc-400 hover:text-amber-400 hover:bg-zinc-800'
                }`}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Instant Emergency Tap Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400 animate-pulse" />
            <h2 className="text-xs sm:text-sm font-extrabold text-white">
              {currentLang === 'en' ? 'Quick Emergency Hotline Taps:' : 'فوری ایمرجنسی شارٹ نمبرز:'}
            </h2>
          </div>
          <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 px-2.5 py-0.5 rounded-full">
            24/7 مفت کال
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          <a
            href="tel:15"
            className="flex items-center justify-between p-3 bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800/80 rounded-xl transition group"
          >
            <div>
              <span className="text-[11px] font-bold text-rose-300 block">پولیس emergency</span>
              <span className="text-lg font-black text-white font-mono">15</span>
            </div>
            <PhoneCall className="w-4 h-4 text-rose-400 group-hover:scale-110 transition" />
          </a>

          <a
            href="tel:1122"
            className="flex items-center justify-between p-3 bg-amber-950/60 hover:bg-amber-900/80 border border-amber-800/80 rounded-xl transition group"
          >
            <div>
              <span className="text-[11px] font-bold text-amber-300 block">ریسکیو امداد</span>
              <span className="text-lg font-black text-white font-mono">1122</span>
            </div>
            <PhoneCall className="w-4 h-4 text-amber-400 group-hover:scale-110 transition" />
          </a>

          <a
            href="tel:1099"
            className="flex items-center justify-between p-3 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-800/80 rounded-xl transition group"
          >
            <div>
              <span className="text-[11px] font-bold text-emerald-300 block">قانونی امداد</span>
              <span className="text-lg font-black text-white font-mono">1099</span>
            </div>
            <PhoneCall className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition" />
          </a>

          <a
            href="tel:9911"
            className="flex items-center justify-between p-3 bg-purple-950/60 hover:bg-purple-900/80 border border-purple-800/80 rounded-xl transition group"
          >
            <div>
              <span className="text-[11px] font-bold text-purple-300 block">FIA سائبر کرائم</span>
              <span className="text-lg font-black text-white font-mono">9911</span>
            </div>
            <PhoneCall className="w-4 h-4 text-purple-400 group-hover:scale-110 transition" />
          </a>

          <a
            href="tel:1121"
            className="flex items-center justify-between p-3 bg-slate-900/90 hover:bg-black border border-slate-700/90 rounded-xl transition group"
          >
            <div>
              <span className="text-[11px] font-bold text-slate-300 block">چائلڈ پروٹیکشن</span>
              <span className="text-lg font-black text-white font-mono">1121</span>
            </div>
            <PhoneCall className="w-4 h-4 text-slate-400 group-hover:scale-110 transition" />
          </a>

          <a
            href="tel:1043"
            className="flex items-center justify-between p-3 bg-teal-950/60 hover:bg-teal-900/80 border border-teal-800/80 rounded-xl transition group"
          >
            <div>
              <span className="text-[11px] font-bold text-teal-300 block">محتسب اعلیٰ</span>
              <span className="text-lg font-black text-white font-mono">1043</span>
            </div>
            <PhoneCall className="w-4 h-4 text-teal-400 group-hover:scale-110 transition" />
          </a>
        </div>
      </div>

      {/* 3. Category & Jurisdiction Filter Controls */}
      <div className="space-y-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 border ${
              selectedCategory === 'all'
                ? 'bg-amber-500 text-black border-amber-400 font-black shadow-md'
                : 'bg-white text-slate-700 border-slate-200 hover:border-amber-500/50 hover:text-slate-900 shadow-xs'
            }`}
          >
            {currentLang === 'en' ? 'All Helplines' : 'تمام ہیلپ لائنز'} ({HELPLINES_DATA.length})
          </button>

          {HELPLINE_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.key;
            const catLabel = cat.label[currentLang] || cat.label.en;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 border ${
                  isActive
                    ? 'bg-amber-500 text-black border-amber-400 font-black shadow-md'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-amber-500/50 hover:text-slate-900 shadow-xs'
                }`}
              >
                {CATEGORY_ICONS[cat.iconName]}
                <span>{catLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Jurisdiction Selector Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 text-xs font-medium text-slate-900 shadow-xs">
          <div className="flex items-center gap-2 text-slate-700 font-bold">
            <MapPin className="w-4 h-4 text-amber-600" />
            <span>صوبائی و علاقائی دائرہ اختیار / Filter Jurisdiction:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedJurisdiction('all')}
              className={`px-3 py-1 rounded-lg font-bold text-xs transition ${
                selectedJurisdiction === 'all'
                  ? 'bg-amber-500 text-black font-black'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              All Regions
            </button>
            <button
              type="button"
              onClick={() => setSelectedJurisdiction('national')}
              className={`px-3 py-1 rounded-lg font-bold text-xs transition ${
                selectedJurisdiction === 'national'
                  ? 'bg-amber-500 text-black font-black'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              National (قومی)
            </button>

            {PROVINCES.map((prov) => {
              const isActive = selectedJurisdiction === prov.code;
              const provName = prov.name[currentLang] || prov.name.ur;
              return (
                <button
                  key={prov.code}
                  type="button"
                  onClick={() => setSelectedJurisdiction(prov.code)}
                  className={`px-3 py-1 rounded-lg font-bold text-xs transition ${
                    isActive
                      ? 'bg-amber-500 text-black font-black'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {provName}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Helplines Card Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            {currentLang === 'en' ? 'Official Helplines' : 'سرکاری و معتبر ہیلپ لائنز'}{' '}
            <span className="text-amber-700 font-extrabold">
              ({filteredHelplines.length})
            </span>
          </h2>
        </div>

        {filteredHelplines.length === 0 ? (
          <div className="text-center py-12 bg-white border border-slate-200 rounded-3xl space-y-3 text-slate-900 shadow-sm">
            <Info className="w-10 h-10 text-slate-400 mx-auto" />
            <p className="text-sm font-bold text-slate-700">
              {currentLang === 'en'
                ? 'No helpline numbers match your search criteria.'
                : 'آپ کے تلاش کردہ معیار کے مطابق کوئی ہیلپ لائن نہیں ملی۔'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedJurisdiction('all');
              }}
              className="text-xs font-bold text-amber-700 hover:underline"
            >
              Reset Filters / تمام نمبرز دیکھیں
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredHelplines.map((item) => {
              const nameStr = item.name[currentLang] || item.name.en;
              const deptStr = item.department[currentLang] || item.department.en;
              const descStr = item.description[currentLang] || item.description.en;
              const hoursStr = item.operatingHours[currentLang] || item.operatingHours.en;
              const costStr = item.costType[currentLang] || item.costType.en;
              const services = item.servicesProvided[currentLang] || item.servicesProvided.en;

              const isCopied = copiedId === item.id;

              return (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm hover:border-amber-400 hover:shadow-md transition duration-200 flex flex-col justify-between space-y-4 group text-slate-900"
                >
                  {/* Top Badges & Title */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <Clock className="w-3 h-3 text-emerald-600" />
                        <span>{hoursStr}</span>
                      </span>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                          {costStr}
                        </span>

                        {item.jurisdiction !== 'national' && (
                          <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                            {item.jurisdiction.toUpperCase()}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-amber-800 transition">
                        {nameStr}
                      </h3>
                      <p className="text-xs font-bold text-amber-700 mt-0.5">
                        {deptStr}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      {descStr}
                    </p>

                    {/* Services Bullets */}
                    {services && services.length > 0 && (
                      <div className="pt-1">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                          {currentLang === 'en' ? 'Services Offered:' : 'فراہم کردہ سہولیات:'}
                        </span>
                        <ul className="grid grid-cols-1 gap-1 text-xs text-slate-700">
                          {services.map((srv, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                              <span>{srv}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Bottom Action Row: Direct Dial Button & Copy Button */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {/* One Touch Direct Dialing Button */}
                      <a
                        href={`tel:${item.phone}`}
                        className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-sm px-4 py-2.5 rounded-xl shadow-xs transition scale-100 hover:scale-105 active:scale-95"
                      >
                        <PhoneCall className="w-4 h-4 text-black animate-pulse" />
                        <span className="font-mono tracking-tight">{item.displayPhone}</span>
                        <span className="text-xs font-sans font-medium opacity-90 border-l border-black/30 pl-2">
                          {currentLang === 'en' ? 'Call Now' : 'کال کریں'}
                        </span>
                      </a>

                      {/* Copy Phone Number */}
                      <button
                        type="button"
                        onClick={() => handleCopyPhone(item.id, item.phone)}
                        className="p-2.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition"
                        title="Copy Number"
                      >
                        {isCopied ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Official Website / WhatsApp */}
                    <div className="flex items-center gap-2 ml-auto">
                      {item.website && (
                        <a
                          href={item.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold text-zinc-400 hover:text-amber-400 inline-flex items-center gap-1 transition"
                        >
                          <span>ویب سائٹ</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Pre-Call Preparation Checklist Box */}
      {(() => {
        const checklist = PRE_CALL_CHECKLIST_DATA[currentLang] || PRE_CALL_CHECKLIST_DATA.ur;
        return (
          <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white rounded-3xl p-6 sm:p-8 border border-zinc-800 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500/20 border border-amber-500/30 rounded-2xl text-amber-400">
                <Info className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-white">
                  {checklist.title}
                </h3>
                <p className="text-xs text-zinc-300 font-medium">
                  {checklist.subtitle}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs pt-2">
              {checklist.items.map((item, idx) => (
                <div key={idx} className="p-3.5 bg-black border border-zinc-800 rounded-xl space-y-1">
                  <span className="font-bold text-amber-400 block">{item.title}</span>
                  <p className="text-zinc-300 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* 6. Frequently Asked Questions (FAQ) Section */}
      <div className="bg-zinc-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-zinc-800 space-y-6 text-white">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/30 shadow-sm">
              <HelpCircle className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-400 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wide border border-amber-500/30 mb-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>
                  {currentLang === 'en'
                    ? 'App Usage & Support Guide'
                    : 'ایپ کے استعمال سے متعلق گائیڈ'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {currentLang === 'en'
                  ? 'Frequently Asked Questions (FAQs)'
                  : currentLang === 'sd'
                  ? 'اڪثر پڇيا ويندڙ سوال (FAQs)'
                  : currentLang === 'pa'
                  ? 'اکثر پوچھے گئے سوالات (FAQs)'
                  : currentLang === 'ps'
                  ? 'ډیری پوښتل شوي پوښتنې (FAQs)'
                  : 'اکثر پوچھے گئے سوالات (FAQs)'}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-medium">
                {currentLang === 'en'
                  ? 'Find answers to common questions about privacy, drafting, document analysis, and app capabilities.'
                  : 'پورٹل کے استعمال، پرائیویسی، درخواست نویسی اور آف لائن سہولیات سے متعلق عام سوالات کے جوابات۔'}
              </p>
            </div>
          </div>

          {/* Search Box inside FAQ */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={faqSearchQuery}
              onChange={(e) => setFaqSearchQuery(e.target.value)}
              placeholder={
                currentLang === 'en'
                  ? 'Search FAQs...'
                  : 'سوال تلاش کریں...'
              }
              className="w-full pl-9 pr-3 py-2 text-xs bg-black text-white border border-zinc-800 rounded-xl focus:outline-none focus:border-amber-500 transition"
            />
          </div>
        </div>

        {/* FAQ Category Filter Chips */}
        <div className="flex flex-wrap gap-2 pt-1">
          {Object.entries(FAQ_CATEGORY_LABELS).map(([catKey, labelObj]) => {
            const isSelected = selectedFaqCategory === catKey;
            const labelText = labelObj[currentLang] || labelObj.ur || labelObj.en;

            return (
              <button
                key={catKey}
                type="button"
                onClick={() => setSelectedFaqCategory(catKey)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-black font-black shadow-md'
                    : 'bg-black text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {labelText}
              </button>
            );
          })}
        </div>

        {/* FAQ Items Accordion */}
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-8 bg-black rounded-2xl border border-dashed border-zinc-800 text-zinc-400 text-xs">
            {currentLang === 'en'
              ? 'No matching questions found.'
              : 'کوئی متعلقہ سوال نہیں ملا۔'}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFaqs.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;
              const question = faq.question[currentLang] || faq.question.ur || faq.question.en;
              const answer = faq.answer[currentLang] || faq.answer.ur || faq.answer.en;
              const bullets = faq.bullets ? (faq.bullets[currentLang] || faq.bullets.ur || faq.bullets.en) : null;
              const catLabel = FAQ_CATEGORY_LABELS[faq.category]?.[currentLang] || faq.category;

              return (
                <div
                  key={faq.id}
                  className={`border rounded-2xl transition-all overflow-hidden ${
                    isExpanded
                      ? 'border-amber-500/50 bg-black/60 shadow-md ring-1 ring-amber-500/20'
                      : 'border-zinc-800 bg-black hover:border-zinc-700'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                    className="w-full text-start p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                          isExpanded
                            ? 'bg-amber-500 text-black shadow font-black'
                            : 'bg-zinc-800 text-zinc-300'
                        }`}
                      >
                        Q
                      </div>
                      <div>
                        <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md inline-block mb-1 border border-amber-500/20">
                          {catLabel}
                        </span>
                        <h3 className="text-sm sm:text-base font-extrabold text-white leading-snug">
                          {question}
                        </h3>
                      </div>
                    </div>

                    <div className="text-zinc-400 shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-amber-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-zinc-300 text-xs sm:text-sm leading-relaxed border-t border-zinc-800/80 space-y-3">
                      <p className="bg-zinc-900 p-3.5 rounded-xl border border-zinc-800 shadow-xs text-zinc-200">
                        {answer}
                      </p>

                      {bullets && bullets.length > 0 && (
                        <div className="space-y-1.5 pt-1">
                          {bullets.map((b, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 text-xs font-semibold text-zinc-200"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>
                      )}
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
