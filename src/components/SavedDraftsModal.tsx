import React, { useState, useMemo } from 'react';
import { SavedComplaintDraft, LanguageCode } from '../types';
import { exportComplaintPDF } from '../utils/pdfExporter';
import { printLegalDocument } from '../utils/printHelper';
import {
  Bookmark,
  Trash2,
  Printer,
  Download,
  Copy,
  Calendar,
  MapPin,
  Sparkles,
  Search,
  FileText,
  Plus,
  Check,
  Eye,
  EyeOff,
  Clock,
  ShieldCheck,
  AlertCircle,
  X,
} from 'lucide-react';

interface SavedDraftsModalProps {
  currentLang: LanguageCode;
  savedDrafts: SavedComplaintDraft[];
  onDeleteDraft: (id: string) => void;
  onClearAll: () => void;
  onNavigateToDrafter?: () => void;
}

const UI_TEXT = {
  headerBadge: {
    en: 'Offline Local Saved Paperwork',
    ur: '100٪ آف لائن ڈیوائس پر محفوظ شدہ کاغذی کارروائی',
    sd: '100٪ آف لائن مقامي محفوظ ٿيل دستاويز',
    pa: '100٪ آف لائن محفوظ کاغذی کارروائی',
    ps: '۱۰۰٪ آفلاین خوندي شوي رسمي اسناد',
  },
  headerTitle: {
    en: 'Saved Complaint Drafts',
    ur: 'محفوظ شدہ شکایت نامے و درخواستیں',
    sd: 'محفوظ ٿيل شڪايت ناما ۽ درخواستون',
    pa: 'محفوظ شدہ شکایت نامے',
    ps: 'خوندي شوي شکایتونه او لیکونه',
  },
  headerSubtitle: {
    en: 'Access, review, copy, print, or export your saved legal complaints and notices at any time.',
    ur: 'آپ کی مقامی ڈیوائس پر محفوظ شدہ تمام شکایت نامے، جنہیں آپ کسی بھی وقت دوبارہ دیکھ، کاپی، پرنٹ، یا پی ڈی ایف/ورڈ میں ایکسپورٹ کر سکتے ہیں۔',
    sd: 'پنهنجا محفوظ ٿيل قانوني مسودا، درخواستون ۽ نوٽس هتي ڏسو، پرنٽ ڪريو، يا پي ڊي ايف ۽ ورڊ طور ڊائون لوڊ ڪريو۔',
    pa: 'تواڈے ڈیوائس تے محفوظ شکایت نامے، جنہاں نوں تسی کدی وی پرنٹ یا کاپی کر سکدے ہو۔',
    ps: 'ستاسو په وسیله کې خوندي شوي غوښتنلیکونه چې هر وخت یې چاپ، کاپي یا پی ډی ایف کولای شئ.',
  },
  searchPlaceholder: {
    en: 'Search drafts by title, applicant, or content...',
    ur: 'عنوان، سائل کے نام یا متن سے تلاش کریں...',
    sd: 'عنوان، نالي يا لفظن ذريعي ڳوليو...',
    pa: 'عنوان یا نام توں تلاش کرو...',
    ps: 'د سرلیک، نوم یا متن پر بنسټ لټون وکړئ...',
  },
  clearAll: {
    en: 'Clear All Drafts',
    ur: 'تمام مسودے ختم کریں',
    sd: 'سڀ مسودا مٽايو',
    pa: 'سارے مسودے مٹاؤ',
    ps: 'ټول پاک کړئ',
  },
  clearConfirm: {
    en: 'Are you sure you want to delete all saved drafts? This action cannot be undone.',
    ur: 'کیا آپ واقعی تمام محفوظ شدہ شکایت نامے مٹانا چاہتے ہیں؟ یہ عمل واپس نہیں ہو سکتا۔',
    sd: 'ڇا توهان واقعي تمام محفوظ ٿيل مسودا مٽائڻ چاهيو ٿا؟',
    pa: 'کیا تسی سارے مسودے مٹانا چاہندے ہو؟',
    ps: 'ایا تاسو ډاډه یاست چې ټول خوندي شوي غوښتنلیکونه پاک کړئ؟',
  },
  emptyTitle: {
    en: 'No Saved Complaint Drafts Found',
    ur: 'کوئی محفوظ شدہ شکایت نامہ موجود نہیں ہے',
    sd: 'ڪوبه محفوظ ٿيل شڪايت نامو موجود ناهي',
    pa: 'کوئی محفوظ شکایت نامہ نہیں لبھیا',
    ps: 'هیڅ خوندي شوی غوښتنلیک ونه موندل شو',
  },
  emptyDesc: {
    en: 'You have not saved any legal complaint drafts yet. Use the Complaint Drafter to generate a formal petition and save it for future access.',
    ur: 'آپ نے ابھی تک کوئی شکایت نامہ محفوظ نہیں کیا۔ "شکایت نامہ ڈرافٹر" کا استعمال کرتے ہوئے نئی درخواست تیار کریں اور محفوظ کریں۔',
    sd: 'توهان اڃا تائين ڪوبه مسودو محفوظ ناهي ڪيو. نئين درخواست تيار ڪري هتي محفوظ ڪريو.',
    pa: 'تسی ہجے تک کوئی مسودہ محفوظ نہیں کیتا۔ نواں شکایت نامہ بنا کے محفوظ کرو۔',
    ps: 'تاسو تراوسه هیڅ غوښتنلیک نه دی خوندي کړی. د شکایت جوړوونکي له لارې نوی سند جوړ کړئ.',
  },
  createNewBtn: {
    en: 'Create Complaint Draft Now',
    ur: 'نیا شکایت نامہ بنائیں',
    sd: 'نئون شڪايت نامو ٺاهيو',
    pa: 'نواں شکایت نامہ بناؤ',
    ps: 'نوی شکایت جوړ کړئ',
  },
  copy: {
    en: 'Copy Text',
    ur: 'کاپی کریں',
    sd: 'ڪاپي ڪريو',
    pa: 'کاپی کرو',
    ps: 'کاپي کړئ',
  },
  copied: {
    en: 'Copied!',
    ur: 'کاپی ہو گیا!',
    sd: 'ڪاپي ٿي ويو!',
    pa: 'کاپی ہو گیا!',
    ps: 'کاپي شو!',
  },
  print: {
    en: 'Print',
    ur: 'پرنٹ',
    sd: 'پرنٽ',
    pa: 'پرنٹ',
    ps: 'چاپ',
  },
  pdf: {
    en: 'PDF',
    ur: 'پی ڈی ایف',
    sd: 'پي ڊي ايف',
    pa: 'پی ڈی ایف',
    ps: 'پی ډی ایف',
  },
  word: {
    en: 'Word (.doc)',
    ur: 'ورڈ فائل',
    sd: 'ورڊ فائل',
    pa: 'ورڈ فائل',
    ps: 'ورډ فایل',
  },
  delete: {
    en: 'Delete',
    ur: 'حذف',
    sd: 'مٽايو',
    pa: 'مٹاؤ',
    ps: 'پاک کړه',
  },
  showFull: {
    en: 'Expand Draft',
    ur: 'مکمل متن دیکھیں',
    sd: 'پورو متن ڏسو',
    pa: 'پورا متن دیکھو',
    ps: 'بشپړ متن وګورئ',
  },
  showLess: {
    en: 'Collapse Draft',
    ur: 'مختصر کریں',
    sd: 'مختصر ڪريو',
    pa: 'مختصر کرو',
    ps: 'لنډ کړه',
  },
  savedBadge: {
    en: 'Saved Local Draft',
    ur: 'محفوظ شدہ قانونی مسودہ',
    sd: 'محفوظ ٿيل قانوني مسودو',
    pa: 'محفوظ شدہ قانون مسودہ',
    ps: 'خوندي شوی قانوني لیک',
  },
  noSearchResults: {
    en: 'No drafts match your search term.',
    ur: 'آپ کی تلاش کے مطابق کوئی مسودہ نہیں ملا۔',
    sd: 'توهان جي ڳولها موجب ڪوبه مسودو نه مليو.',
    pa: 'تواڈی تلاش مطابق کوئی مسودہ نہیں ملیا۔',
    ps: 'ستاسو د لټون سره سم هیڅ مسوده ونه موندل شوه.',
  },
  createdOn: {
    en: 'Created Date:',
    ur: 'تاریخِ ایجاد:',
    sd: 'ٺهڻ جي تاريخ:',
    pa: 'تاریخ:',
    ps: 'د جوړېدو نېټه:',
  },
  jurisdiction: {
    en: 'Jurisdiction:',
    ur: 'دائرہ کار:',
    sd: 'دائرو:',
    pa: 'دائرہ کار:',
    ps: 'سیمه/محکمه:',
  },
};

export const SavedDraftsModal: React.FC<SavedDraftsModalProps> = ({
  currentLang,
  savedDrafts,
  onDeleteDraft,
  onClearAll,
  onNavigateToDrafter,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedDraftIds, setExpandedDraftIds] = useState<Record<string, boolean>>({});

  const isRtl = currentLang !== 'en';

  // Localized helper
  const getText = (key: keyof typeof UI_TEXT) => {
    const entry = UI_TEXT[key];
    return entry[currentLang] || entry.ur || entry.en;
  };

  const filteredDrafts = useMemo(() => {
    if (!searchQuery.trim()) return savedDrafts;
    const q = searchQuery.toLowerCase().trim();
    return savedDrafts.filter(
      (draft) =>
        (draft.title && draft.title.toLowerCase().includes(q)) ||
        (draft.answers?.applicantName && draft.answers.applicantName.toLowerCase().includes(q)) ||
        (draft.fullLetterText && draft.fullLetterText.toLowerCase().includes(q))
    );
  }, [savedDrafts, searchQuery]);

  const handleToggleExpand = (id: string) => {
    setExpandedDraftIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportWord = (draft: SavedComplaintDraft) => {
    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${draft.title}</title>
        <style>
          body { font-family: 'Jameel Noori Nastaleeq', 'Arial', sans-serif; font-size: 14pt; line-height: 1.8; direction: ${
            isRtl ? 'rtl' : 'ltr'
          }; text-align: ${isRtl ? 'right' : 'left'}; padding: 40px; }
          .header { font-weight: bold; font-size: 16pt; margin-bottom: 20px; }
          .content { white-space: pre-wrap; }
        </style>
      </head>
      <body>
        <div class='header'>${draft.title}</div>
        <div class='content'>${draft.fullLetterText.replace(/\n/g, '<br/>')}</div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', htmlContent], {
      type: 'application/msword;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${draft.title.replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, '_')}_Draft.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleConfirmClearAll = () => {
    if (window.confirm(getText('clearConfirm'))) {
      onClearAll();
    }
  };

  // Header Banner Component
  const headerBanner = (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-500/20 relative overflow-hidden no-print mb-6">
      <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/15 border border-amber-400/30 text-amber-300 rounded-full text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{getText('headerBadge')}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {getText('headerTitle')}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
            {getText('headerSubtitle')}
          </p>
        </div>

        {onNavigateToDrafter && (
          <div className="shrink-0">
            <button
              type="button"
              onClick={onNavigateToDrafter}
              className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-slate-950 stroke-[3]" />
              <span>{getText('createNewBtn')}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );

  if (savedDrafts.length === 0) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto px-1 sm:px-2">
        {headerBanner}

        <div className="bg-white rounded-3xl p-10 sm:p-14 text-center shadow-md border border-slate-200 space-y-5">
          <div className="w-20 h-20 bg-amber-50 text-amber-600 rounded-3xl flex items-center justify-center mx-auto border border-amber-200/60 shadow-xs">
            <Bookmark className="w-10 h-10 text-amber-600 stroke-[1.75]" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {getText('emptyTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              {getText('emptyDesc')}
            </p>
          </div>

          {onNavigateToDrafter && (
            <div className="pt-2">
              <button
                type="button"
                onClick={onNavigateToDrafter}
                className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-md hover:shadow-xl transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4.5 h-4.5 stroke-[3]" />
                <span>{getText('createNewBtn')}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-1 sm:px-2">
      {headerBanner}

      {/* Main Container */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-md border border-slate-200 space-y-6">
        {/* Top Control Toolbar: Search & Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={getText('searchPlaceholder')}
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 focus:bg-white rounded-2xl text-xs sm:text-sm text-slate-900 font-medium transition placeholder:text-slate-400 outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Count Badge & Clear All */}
          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold">
              <Bookmark className="w-3.5 h-3.5 text-amber-600" />
              <span>
                {savedDrafts.length} {getText('savedBadge')}
              </span>
            </span>

            <button
              type="button"
              onClick={handleConfirmClearAll}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-rose-700 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{getText('clearAll')}</span>
            </button>
          </div>
        </div>

        {/* Search empty result message */}
        {filteredDrafts.length === 0 && (
          <div className="text-center py-12 space-y-2">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-sm text-slate-600 font-bold">{getText('noSearchResults')}</p>
          </div>
        )}

        {/* Draft Cards List */}
        <div className="space-y-5">
          {filteredDrafts.map((draft) => {
            const isExpanded = !!expandedDraftIds[draft.id];
            const isCopied = copiedId === draft.id;
            const dateStr = new Date(draft.createdAt).toLocaleDateString(
              currentLang === 'en' ? 'en-US' : 'ur-PK',
              {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              }
            );

            return (
              <div
                key={draft.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-amber-400/60 transition-all space-y-4"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-amber-100 border border-amber-300 text-amber-900 rounded-lg text-[11px] font-extrabold">
                        {getText('savedBadge')}
                      </span>
                      {draft.answers?.cityJurisdiction && (
                        <span className="px-2.5 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-[11px] font-bold flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span>{draft.answers.cityJurisdiction}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {draft.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>
                          {getText('createdOn')} {dateStr}
                        </span>
                      </span>
                      {draft.answers?.applicantName && (
                        <span className="flex items-center gap-1 text-slate-700 font-bold">
                          <span>سائل: {draft.answers.applicantName}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Top Action Quick Buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleToggleExpand(draft.id)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      {isExpanded ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5 text-slate-600" />
                          <span>{getText('showLess')}</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5 text-slate-600" />
                          <span>{getText('showFull')}</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteDraft(draft.id)}
                      className="p-1.5 rounded-xl text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors cursor-pointer"
                      title={getText('delete')}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Draft Text Preview Box */}
                <div className="relative">
                  <div
                    className={`bg-slate-50/90 border border-slate-200 rounded-xl p-4 sm:p-5 font-mono text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap ${
                      isRtl ? 'text-right' : 'text-left'
                    } ${isExpanded ? 'max-h-none' : 'max-h-40 overflow-hidden'}`}
                    dir={isRtl ? 'rtl' : 'ltr'}
                  >
                    {draft.fullLetterText}
                  </div>

                  {!isExpanded && (
                    <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none rounded-b-xl flex items-end justify-center pb-2">
                      <button
                        type="button"
                        onClick={() => handleToggleExpand(draft.id)}
                        className="pointer-events-auto px-3 py-1 bg-white border border-slate-200 shadow-xs text-[11px] font-bold text-amber-700 rounded-full hover:bg-amber-50 cursor-pointer"
                      >
                        {getText('showFull')}
                      </button>
                    </div>
                  )}
                </div>

                {/* Bottom Card Export Actions */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopyText(draft.id, draft.fullLetterText)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 cursor-pointer ${
                        isCopied
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200 shadow-2xs'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>{getText('copied')}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-600" />
                          <span>{getText('copy')}</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        printLegalDocument({
                          title: draft.title,
                          content: draft.fullLetterText,
                          lang: currentLang,
                        })
                      }
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5 text-slate-600" />
                      <span>{getText('print')}</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleExportWord(draft)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                      <span>{getText('word')}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        exportComplaintPDF(draft.fullLetterText, draft.title, 'Draft', currentLang)
                      }
                      className="px-3.5 py-1.5 rounded-xl text-xs font-extrabold text-slate-950 bg-amber-500 hover:bg-amber-400 shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-950" />
                      <span>{getText('pdf')}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
