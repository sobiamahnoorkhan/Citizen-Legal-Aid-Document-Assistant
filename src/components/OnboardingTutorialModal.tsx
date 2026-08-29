import React, { useState } from 'react';
import { LanguageCode } from '../types';
import {
  FileText,
  Search,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  X,
  HelpCircle,
  BookOpen,
  FileEdit,
  ArrowRight,
  ArrowLeft,
  Volume2,
  Lock,
} from 'lucide-react';

interface OnboardingTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: LanguageCode;
  onLanguageChange?: (lang: LanguageCode) => void;
  onNavigateTab: (tab: 'explainer' | 'matcher' | 'drafter' | 'lawLibrary' | 'helpline' | 'glossary' | 'saved' | 'faq') => void;
}

export const OnboardingTutorialModal: React.FC<OnboardingTutorialModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onLanguageChange,
  onNavigateTab,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  if (!isOpen) return null;

  const isRtl = currentLang === 'ur' || currentLang === 'sd' || currentLang === 'pa' || currentLang === 'ps';

  // Localized tutorial content for 5 languages
  const tutorialSteps = [
    {
      id: 'welcome',
      icon: ShieldCheck,
      badge: {
        en: 'First-Time Guide',
        ur: 'رہنما ہدایت نامہ',
        sd: 'مفت رهنمايئ',
        pa: 'ہدایت نامہ',
        ps: 'لارښود لارښوونه',
      },
      title: {
        en: 'Welcome to Citizen Legal Aid',
        ur: 'قانونی امداد اور دستاویزات معاون میں خوش آمدید',
        sd: 'قانوني مدد ۽ دستاويزن جي مددگار ۾ ڀليڪار',
        pa: 'قانونی امداد تے دستاویزات معاون وچ خوش آمدید',
        ps: 'د وګړو د قانوني مرستې او اسنادو په اډانه کې ښه راغلاست',
      },
      subtitle: {
        en: 'Your free Pakistani legal assistant designed for everyday legal challenges with AI Document Explainer.',
        ur: 'روزمرہ قانونی مسائل اور دستاویزات کی آسان سمجھ کے لیے آپ کا مفت اور محفوظ قانونی معاون۔',
        sd: 'روزاني جي قانوني مسلن ۽ دستاويزن جي تشريح لاءِ مفت ۽ محفوظ قانوني مددگار.',
        pa: 'روزمرہ قانونی مسائل تے دستاویزات دی آسان سمجھ لئی مفت تے محفوظ قانونی معاون۔',
        ps: 'د ورځني قانوني ستونزو او د اسنادو په ساده مانا پوهېدو لپاره ستاسو وړیا مرستیال.',
      },
      highlights: [
        {
          icon: Lock,
          text: {
            en: 'Secure & Privacy-First: Document Explainer uses AI (Internet required); complaint drafts are stored locally on your device.',
            ur: 'محفوظ و پرائیویسی: AI دستاویز تشریح کے لیے انٹرنیٹ درکار ہے، جبکہ شکایت نامے آپ کے فون میں محفوظ رہتے ہیں۔',
            sd: 'محفوظ ۽ پرائيويسي: AI دستاويز تشريح لاءِ انٽرنيٽ جي ضرورت آهي، جڏهن ته ڊرافيٽس هتي محفوظ رهندا.',
            pa: 'محفوظ تے پرائیویسی: AI دستاویز دی تشریح لئی انٹرنیٹ درکار اے، جبکہ ڈرافٹ محفوظ رہندے نیں۔',
            ps: 'خوندې او محرم: د اسنادو AI تشریح انټرنیټ غواړي، خو لیکلي غوښتنلیکونه دلته خوندي کېږي.',
          },
        },
        {
          icon: FileText,
          text: {
            en: 'Document Explainer: Understand rent agreements, contracts, court notices, and FIR copies.',
            ur: 'دستاویز کی تشریح: معاہدے، کرایہ نامہ، کورٹ نوٹس اور ایف آئی آر کی آسان زبان میں وضاحت۔',
            sd: 'دستاويز جي تشريح: ڪرايه نامي، نوٽيس ۽ ايف آءِ آر جي سادي تشريح.',
            pa: 'دستاویز دی تشریح: معاہدے، کرایہ نامہ تے کورٹ نوٹس دی آسان زبان وچ تشریح۔',
            ps: 'د اسنادو تشریح: د معاهدو، کرایه خط، او محکمی خبرتیاو ساده ژباړه.',
          },
        },
        {
          icon: Search,
          text: {
            en: 'Issue Matcher: Describe your legal problem to get exact legal rights & section references.',
            ur: 'قانون اور مسئلہ کی تلاش: اپنا مسئلہ لکھیں اور متعلقہ قوانین اور قانونی حقوق حاصل کریں۔',
            sd: 'قانون ۽ مسلي جي ڳولا: پنهنجو مسلو لکو ۽ لاڳاپيل قانون ۽ حق ڄاڻو.',
            pa: 'قانون تے مسئلہ لبھو: اپنا مسئلہ لکھو تے متعلقہ قانون تے حقوق حاصل کرو۔',
            ps: 'د مسلې پېژندنه: خپله ستونزه ولیکئ او د هغې اړوند قانوني لارې چارې ولټوئ.',
          },
        },
      ],
      actionButton: null,
    },
    {
      id: 'explainer',
      icon: FileText,
      badge: {
        en: 'Core Feature #1',
        ur: 'بنیادی خصوصیت #1',
        sd: 'بنيادي خصوصيت #1',
        pa: 'بنیادی خصوصیت #1',
        ps: 'اصلي ځانګړتیا #1',
      },
      title: {
        en: 'How to Use Document Explainer',
        ur: 'دستاویز کی تشریح کا طریقہ',
        sd: 'دستاويز جي تشريح ڪئين ڪجي',
        pa: 'دستاویز دی تشریح دا طریقہ',
        ps: 'د اسنادو د تشریح کارولو څرنګوالی',
      },
      subtitle: {
        en: 'Analyze complex legal jargon in agreements, deeds, and notices into plain, understandable terms.',
        ur: 'پیچیدہ عدالتی تحریر اور قانونی معاہدوں کی سادہ اور عام فہم اردو اور علاقائی زبانوں میں تشریح۔',
        sd: 'پيچيده عدالتي تحرير ۽ معاهدن جي سادي سنڌي ۽ ٻين ٻولين ۾ تشريح.',
        pa: 'پیچیدہ عدالتی تحریر تے معاہدیاں دی سادہ پنجابی تے اردو وچ تشریح۔',
        ps: 'د محکمې د پېچلو اسنادو او لیکونو په ساده پښتو او نورو ژبو رڼا اچول.',
      },
      stepsList: [
        {
          stepNo: '1',
          title: {
            en: 'Upload or Select a Sample',
            ur: 'دستاویز اپلوڈ کریں یا نمونہ منتخب کریں',
            sd: 'دستاويز اپلوڊ ڪريو يا چونڊيو',
            pa: 'دستاویز اپلوڈ کرو یا نمونہ سنو',
            ps: 'سند اپلوډ کړئ یا بېلګه غوره کړئ',
          },
          desc: {
            en: 'Upload PDF/Images, paste text, or choose pre-built templates like Rent Agreement or Legal Notice.',
            ur: 'PDF یا تصویر اپلوڈ کریں، متن پیسٹ کریں، یا پہلے سے موجود کرایہ نامہ یا نوٹس فارمیٹ منتخب کریں۔',
            sd: 'PDF يا تصوير اپلوڊ ڪريو، يا ڪرايه نامي جو نمونو چونڊيو.',
            pa: 'PDF یا تصویر اپلوڈ کرو، یا بنا ہویا کرایہ نامہ منتخب کرو۔',
            ps: 'PDF یا انځور اپلوډ کړئ، یا جوړ شوی کرایه خط غوره کړئ.',
          },
        },
        {
          stepNo: '2',
          title: {
            en: 'Automatic Risk & Hazard Highlights',
            ur: 'خطرناک اور یکطرفہ شقوں کی نشاندہی',
            sd: 'خطرناڪ شرطن جي نشاندھي',
            pa: 'خطرناک شرطاں دی نشاندہی',
            ps: 'د زیان رسوونکو شرایطو څرګندول',
          },
          desc: {
            en: 'Instantly identifies hidden penalties, unfair eviction conditions, missing notice periods, and liability traps.',
            ur: 'پوشیدہ جرمانے، زبردستی بے دخلی کی شقیں اور غیر منصفانہ شرائط کو سرخ یا زرد رنگ میں واضح کرتا ہے۔',
            sd: 'ڳجهن جرمانن ۽ غير منصفاڻن شرطن کي نمايان ڪري ڏيکاري ٿو.',
            pa: 'پوشیدہ جرمانے تے یکطرفہ شرطاں نوں واضح کردا اے۔',
            ps: 'پټې جرمانې او ناانډوله شرایط په روښانه ډول په نښه کوي.',
          },
        },
        {
          stepNo: '3',
          title: {
            en: 'Plain-Language Translation & Audio',
            ur: 'آسان ترجمہ اور آواز سے سننے کی سہولت',
            sd: 'سادو ترجمو ۽ آواز ۾ ٻڌڻ',
            pa: 'آسان ترجمہ تے آواز نال سننا',
            ps: 'ساده ژباړه او په لوړ غږ اورېدل',
          },
          desc: {
            en: 'Read or listen to the summary in Urdu, Sindhi, Punjabi, Pashto, or English with 1-click text-to-speech.',
            ur: 'خلاصہ اردو، سندھی، پنجابی، پشتو یا انگریزی میں پڑھیں یا ایک کلک پر آواز سے سنیں۔',
            sd: 'اردو، سنڌي، پنجابي يا پښتو ۾ پڙهو يا ٻڌو.',
            pa: 'اردو، پنجابی، سندھی یا پشتو وچ سنو تے پڑھو۔',
            ps: 'په پښتو، اردو، او نورو ژبو کې لولئ یا په غږ سره واورئ.',
          },
        },
      ],
      actionButton: {
        text: {
          en: 'Try Document Explainer Now',
          ur: 'ابھی دستاویز کی تشریح ازمائیں',
          sd: 'هاڻي دستاويز جي تشريح آزمايو',
          pa: 'ہݨے دستاویز دی تشریح ازماؤ',
          ps: 'همدا اوس د اسنادو تشریح وکاروئ',
        },
        tab: 'explainer' as const,
      },
    },
    {
      id: 'matcher',
      icon: Search,
      badge: {
        en: 'Core Feature #2',
        ur: 'بنیادی خصوصیت #2',
        sd: 'بنيادي خصوصيت #2',
        pa: 'بنیادی خصوصیت #2',
        ps: 'اصلي ځانګړتیا #2',
      },
      title: {
        en: 'How to Use Issue Matcher',
        ur: 'قانون اور مسئلہ کی تلاش کا طریقہ',
        sd: 'قانون ۽ مسلي جي ڳولا جو طريقو',
        pa: 'قانون تے مسئلہ لبھن دا طریقہ',
        ps: 'د مسلې او قانون پېژندنې بڼه',
      },
      subtitle: {
        en: 'Describe any daily life dispute to discover applicable Pakistani laws, sections, and immediate remedies.',
        ur: 'روزمرہ زندگی کے کسی بھی قانونی تنازع کو اپنے الفاظ میں بیان کریں اور فوری قانونی حل معلوم کریں۔',
        sd: 'روزاني جي ڪنهن به قانوني مسلي کي پنهنجن لفظن ۾ لکو ۽ قانوني حل وٺو.',
        pa: 'روزمرہ زندگی دے کسی تنازع نوں اپنے الفاظ وچ لکھو تے قانونی حل لبھو۔',
        ps: 'خپله قانوني ستونزه په خپلو ساده ټکو کې بیان کړئ او لاره چاره ومومئ.',
      },
      stepsList: [
        {
          stepNo: '1',
          title: {
            en: 'Type Your Issue in Any Language',
            ur: 'کسی بھی زبان میں اپنا مسئلہ تحریر کریں',
            sd: 'ڪنهن به ٻوليءَ ۾ مسلو لکو',
            pa: 'کسی بھی زبان وچ مسئلہ لکھو',
            ps: 'په هرې ژبې کې خپله ستونزه ولیکئ',
          },
          desc: {
            en: 'Enter text like "landlord turned off electricity" or select from 30+ preset scenarios (theft, salary, cyber blackmail).',
            ur: 'مثلاً "مالک مکان نے بجلی کاٹ دی" لکھیں یا 30 سے زائد تیار نمونوں میں سے اپنا مسئلہ منتخب کریں۔',
            sd: 'مثال طور "مالڪ بجلي ڪاٽي ڇڏي" لکو يا ڏنل نمونن مان چونڊيو.',
            pa: 'مثلاً "مالک مکان نے بجلی کاٹ دتی" لکھو یا تیار نمونیاں چوں سنو۔',
            ps: 'لکه "د کور مالک زما برېښنا پرې کړې" ولیکئ یا له جوړو بېلګو غوره کړئ.',
          },
        },
        {
          stepNo: '2',
          title: {
            en: 'Matched PPC Sections & Constitutional Rights',
            ur: 'متعلقہ تعزیراتِ پاکستان کی دفعات اور حقوق',
            sd: 'لاڳاپيل قانون ۽ آئيني حق',
            pa: 'متعلقہ قانون دیاں دفعات تے حقوق',
            ps: 'اړوندې جزاګانې او قانوني حقونه',
          },
          desc: {
            en: 'Shows exact sections (e.g. PPC 379, PPC 506, Rent Act), court jurisdiction, and punishable years.',
            ur: 'متعلقہ قانون کی دفعہ (مثلاً دفعہ 379، 506)، عدالت اور سزا کی معیاد واضح طور پر دکھاتا ہے۔',
            sd: 'قانون جي دفعو، متعلقہ ڪورٽ ۽ سزا جي مدت ظاهر ڪري ٿو.',
            pa: 'قانون دی دفعہ، متعلقہ کورٹ تے سزا دی مدت دکھاندا اے۔',
            ps: 'د قانون ماده، باصلاحیته محکمه او د سزا ټاکل شوې موده ښيي.',
          },
        },
        {
          stepNo: '3',
          title: {
            en: '1-Click Draft Generation',
            ur: 'ایک کلک پر شکایت نامہ کی تیاری',
            sd: 'هڪ ڪلڪ تي شڪايت نامو ٺاهيو',
            pa: 'ایک کلک تے شکایت نامہ تیار کرو',
            ps: 'په یوه کلیک د عریضې چمتو کول',
          },
          desc: {
            en: 'Click "Draft Complaint" to automatically transfer all legal details into a print-ready legal petition or FIR request!',
            ur: '"شکایت نامہ تیار کریں" پر کلک کر کے تمام قانونی معلومات براہ راست پرنٹ کے قابل فارمیٹ میں منتقل کریں۔',
            sd: '"شڪايت نامو ٺاهيو" تي ڪلڪ ڪري تيار فارميٽ مان پرنٽ وٺو.',
            pa: '"شکایت نامہ تیار کرو" تے کلک کر کے پرنٹ فارم حاصل کرو۔',
            ps: 'د عریضې ليکلو تڼۍ کښېکاږئ او د چاپ وړ ليک فوراً چمتو کړئ.',
          },
        },
      ],
      actionButton: {
        text: {
          en: 'Try Issue Matcher Now',
          ur: 'ابھی مسئلہ کی تلاش ازمائیں',
          sd: 'هاڻي مسلي جي ڳولا آزمايو',
          pa: 'ہݨے مسئلہ لبھنا ازماؤ',
          ps: 'همدا اوس د مسلې پېژندنه وکاروئ',
        },
        tab: 'matcher' as const,
      },
    },
    {
      id: 'drafter',
      icon: FileEdit,
      badge: {
        en: 'Core Feature #3',
        ur: 'بنیادی خصوصیت #3',
        sd: 'بنيادي خصوصيت #3',
        pa: 'بنیادی خصوصیت #3',
        ps: 'اصلي ځانګړتیا #3',
      },
      title: {
        en: 'How to Use Complaint Drafter',
        ur: 'شکایت نامہ تیار کرنے کا طریقہ',
        sd: 'شڪايت نامو ٺاهڻ جو طريقو',
        pa: 'شکایت نامہ تیار کرن دا طریقہ',
        ps: 'د غوښتنلیک/عریضې ليکلو بڼه',
      },
      subtitle: {
        en: 'Draft official, legally formatted applications for Police (FIR/Application), Consumer Protection, Rent Controller, Ombudsman, Labor Court, and FBR.',
        ur: 'پولیس، لیبر کورٹ، رینٹ کنٹرولر، محتسب اعلیٰ اور صارف عدالتوں کے لیے باضابطہ اور تیار شدہ شکایت نامے تحریر کریں۔',
        sd: 'پوليس، ليبر ڪورٽ، رينٽ ڪنٽرولر ۽ محتسب لاءِ سرڪاري شڪايت ناما لکو.',
        pa: 'پولیس، لیبر کورٹ تے محتسب لئی سرکاری شکایت نامے تیار کرو۔',
        ps: 'د پولیسو، محتسب او بېلا بېلو محاکمو لپاره د رسمي درخواستونو جوړول.',
      },
      stepsList: [
        {
          stepNo: '1',
          title: {
            en: 'Select Forum or Template',
            ur: 'عدالتی فورم یا درخواست کی قسم منتخب کریں',
            sd: 'سرڪاري ادارو يا نمونو چونڊيو',
            pa: 'سرکاری ادارہ یا درخواست دی قسم سنو',
            ps: 'با صلاحیته اداره یا د ليک ډول غوره کړئ',
          },
          desc: {
            en: 'Choose Police Application, Rent Controller Dispute, Consumer Court, FIA Cybercrime, Salary Theft, or Custom Application.',
            ur: 'پولیس درخواست، کرایہ داری تنازع، لیبر کورٹ، ایف آئی اے سائبر کرائم یا زبردستی بے دخلی کا فارمیٹ چنیں۔',
            sd: 'پراپرٽي مسلو، ڪرايه نامو، يا پوليس درخواسته چونڊيو.',
            pa: 'پولیس درخواست، کرایہ تنازع یا سائبر کرائم دا فارمیٹ سنو۔',
            ps: 'د پولیسو غوښتنه، د کرایې ستونزه، یا انټرنیټي جرم فارم چمتو کړئ.',
          },
        },
        {
          stepNo: '2',
          title: {
            en: 'Fill Essential Incident Facts',
            ur: 'واقعاتی معلومات اور فریقین کے نام درج کریں',
            sd: 'ضروري معلومات ۽ نالا لکو',
            pa: 'واقعاتی معلومات تے ناں درج کرو',
            ps: 'د پېښې ټول لنډیز او معلومات ننوځئ',
          },
          desc: {
            en: 'Enter Complainant, Respondent/Opposite Party, Station/City, Incident Date, and your narrative of facts.',
            ur: 'سائل کا نام، مخالف فریق کا نام، تھانہ/شہر، تاریخ اور واقعہ کا مختصر احوال تحریر کریں۔',
            sd: 'پنهنجو نالو، مخالف ڌر جو نالو، تاريخ ۽ مسلي جا تفصيل لکو.',
            pa: 'اپنا ناں، مخالف دا ناں تے واقعے دی تاریخ درج کرو۔',
            ps: 'خپل نوم، د ځواب ورکوونکي نوم، او د پېښې نیټه ولیکئ.',
          },
        },
        {
          stepNo: '3',
          title: {
            en: 'Print, Export PDF, or Save Draft',
            ur: 'پرنٹ کریں، پی ڈی ایف ڈاؤن لوڈ کریں یا محفوظ کریں',
            sd: 'پرنٽ، PDF يا سيوا ڪريو',
            pa: 'پرنٹ کرو، PDF یا سیو کرو',
            ps: 'چاپ کړئ، PDF واخلئ یا یې خوندې کړئ',
          },
          desc: {
            en: 'Print formatted legal papers instantly, download high-res PDFs, or save locally for later edits in any language.',
            ur: 'قانونی سائز پرنٹ تیار کریں، PDF محفوظ کریں یا آئندہ ترمیم کے لیے اپنے ڈیوائس میں محفوظ رکھیں۔',
            sd: 'پرنٽ وٺو، PDF ڊائون لوڊ ڪريو يا هيئن سيوا ڪريو.',
            pa: 'پرنٹ کرو، PDF لؤ یا بعد لئی محفوظ کرو۔',
            ps: 'چاپ واخلئ، فایل خوندي کړئ یا وروسته ترمیم وکړئ.',
          },
        },
      ],
      actionButton: {
        text: {
          en: 'Try Complaint Drafter Now',
          ur: 'ابھی شکایت نامہ تیار کریں',
          sd: 'هاڻي شڪايت نامو آزمايو',
          pa: 'ہݨے شکایت نامہ تیار کرو',
          ps: 'همدا اوس د غوښتنلیک ليکل وکاروئ',
        },
        tab: 'drafter' as const,
      },
    },
    {
      id: 'more_tools',
      icon: Sparkles,
      badge: {
        en: 'Complete Toolkit',
        ur: 'مکمل قانونی ٹول کٹ',
        sd: 'مڪمل قانوني ٽول ڪٽ',
        pa: 'مکمل قانونی ٹول کٹ',
        ps: 'بشپړه قانوني توکی پیاله',
      },
      title: {
        en: 'More Legal Tools at Your Fingertips',
        ur: 'دیگر اہم قانونی سہولیات',
        sd: 'ٻيون قانوني سهولتون',
        pa: 'ہور اہم قانونی سہولتاں',
        ps: 'نور اړین قانوني اسانتیاوې',
      },
      subtitle: {
        en: 'Everything you need to protect your rights, lodge official complaints, and reach emergency helplines.',
        ur: 'اپنے قانونی حقوق کے تحفظ، سرکاری شکایت نامے کی تیاری اور ایمرجنسی رابطہ نمبرز کی مکمل ڈائریکٹری۔',
        sd: 'پنهنجن حقن جي تحفظ ۽ سرڪاري شڪايت لاءِ مڪمل ڊائريڪٽري.',
        pa: 'اپنے حقوق دی حفاظت تے سرکاری شکایت لئی مکمل ڈائریکٹری۔',
        ps: 'ستاسو د حقوقو ساتنه، رسمي غوښتنلیکونه او عاجل اړیکې.',
      },
      highlights: [
        {
          icon: FileEdit,
          text: {
            en: 'Complaint Drafter: Generate legally structured applications for Police, Labor Court, Rent Controller, Ombudsman, and FBR.',
            ur: 'شکایت نامہ تیار کنندہ: پولیس، لیبر کورٹ، رینٹ کنٹرولر اور محتسب اعلیٰ کے لیے تیار تحریری شکایت نامے برآمد کریں۔',
            sd: 'شڪايت نامو: پوليس، ليبر ڪورٽ ۽ محتسب لاءِ تيار درخواستون ٺاهيو.',
            pa: 'شکایت نامہ: پولیس، لیبر کورٹ تے محتسب لئی تیار درخواستاں بناؤ۔',
            ps: 'د غوښتنلیک ليکونکی: د پولیسو، کارګرانو محکمې او محتسب لپاره منظم خطونه.',
          },
        },
        {
          icon: BookOpen,
          text: {
            en: 'Law Library & Dictionary: Explore 15+ comprehensive law categories and legal terminology in simple Urdu/regional languages.',
            ur: 'قانون لائبریری و لغت: 15 سے زائد شعبہ ہائے قانون اور عدالتی اصطلاحات کے آسان مفاہیم۔',
            sd: 'قانون لائبريري: 15 کان وڌيڪ قانوني زمرا ۽ لغت.',
            pa: 'قانون لائبریری: 15 توں زیادہ شعبہ ہائے قانون تے لغت۔',
            ps: 'د قوانینو کتابتون او قاموس: ۱۵ برخي درلودونکی قانوني پورټل.',
          },
        },
        {
          icon: HelpCircle,
          text: {
            en: 'Helpline Directory & FAQs: Direct dial Police 15, FIA 1991, Women Helpline 1099, and read verified legal FAQs.',
            ur: 'ہیلپ لائنز اور سوالات: پولیس 15، ایف آئی اے 1991 اور خواتین ہیلپ لائن 1099 کے فوری نمبرز اور اہم جوابات۔',
            sd: 'هيلپ لائين: پوليس 15، FIA 1991 ۽ عورتن جي هيلپ لائين 1099 جا نمبر.',
            pa: 'ہیلپ لائنز: پولیس 15، FIA 1991 تے خواتین ہیلپ لائن 1099 دے نمبر۔',
            ps: 'د عاجلو شمیرو لارښود: د پولیسو ۱۵، ایف ای اې ۱۹۹۱ او د مېرمنو ۱۰۹۹ شمیرې.',
          },
        },
      ],
      actionButton: {
        text: {
          en: 'Start Using App',
          ur: 'ایپ کا استعمال شروع کریں',
          sd: 'ايپ جو استعمال شروع ڪريو',
          pa: 'ایپ دا استعمال شروع کرو',
          ps: 'د اپلیکیشن کارول پیل کړئ',
        },
        tab: null,
      },
    },
  ];

  const currentStepData = tutorialSteps[currentStep];
  const StepIcon = currentStepData.icon;

  const handleNextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleActionBtnClick = (tab: 'explainer' | 'matcher' | 'drafter' | 'lawLibrary' | 'helpline' | 'glossary' | 'saved' | 'faq' | null) => {
    onClose();
    if (tab) {
      onNavigateTab(tab);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200"
      dir="ltr"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden relative transform transition-all">
        {/* Header Bar */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between gap-4 shrink-0 relative overflow-hidden">
          <div className="absolute top-0 end-0 w-64 h-full bg-gradient-to-l from-amber-500/20 to-transparent pointer-events-none" />

          <div className="flex items-center gap-3 relative z-10">
            <div className="p-2 bg-amber-500 text-slate-950 rounded-xl font-black shrink-0 shadow-xs">
              <StepIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-amber-400 block">
                {currentStepData.badge[currentLang]} • {currentStep + 1} / {tutorialSteps.length}
              </span>
              <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                {currentStepData.title[currentLang]}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 relative z-10 shrink-0">
            {onLanguageChange && (
              <select
                value={currentLang}
                onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
                className="bg-slate-800 text-amber-400 font-bold text-xs px-2.5 py-1.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                title="Select Tutorial Language"
                aria-label="Select Tutorial Language"
              >
                <option value="en">English</option>
                <option value="ur">اردو (Urdu)</option>
                <option value="sd">سنڌي (Sindhi)</option>
                <option value="pa">پنجابی (Punjabi)</option>
                <option value="ps">پښتو (Pashto)</option>
              </select>
            )}

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors shrink-0 cursor-pointer"
              title="Close Tutorial"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            {currentStepData.subtitle[currentLang]}
          </p>

          {/* Highlights List (Step 0 & 3) */}
          {currentStepData.highlights && (
            <div className="space-y-3">
              {currentStepData.highlights.map((item, idx) => {
                const ItemIcon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 p-3.5 bg-amber-50/60 rounded-2xl border border-amber-200/60 transition-all hover:bg-amber-50"
                  >
                    <div className="p-2 bg-amber-500/20 text-amber-800 rounded-xl shrink-0 mt-0.5">
                      <ItemIcon className="w-4 h-4" />
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                      {item.text[currentLang]}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Detailed Steps List (Step 1 & 2 for Document Explainer & Issue Matcher) */}
          {currentStepData.stepsList && (
            <div className="space-y-3.5">
              {currentStepData.stepsList.map((st, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4 transition-all hover:border-amber-300 hover:shadow-md"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-amber-400 font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                    {st.stepNo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-black text-slate-900 leading-snug">
                      {st.title[currentLang]}
                    </h4>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed mt-1">
                      {st.desc[currentLang]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Navigation Controls */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Progress Dots */}
          <div className="flex items-center gap-1.5">
            {tutorialSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  index === currentStep ? 'w-7 bg-amber-500' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
                title={`Go to step ${index + 1}`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 ms-auto">
            {/* Direct Action Button if available for Step 1 / Step 2 */}
            {currentStepData.actionButton && (
              <button
                onClick={() => handleActionBtnClick(currentStepData.actionButton.tab)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{currentStepData.actionButton.text[currentLang]}</span>
              </button>
            )}

            {/* Previous Step */}
            {currentStep > 0 && (
              <button
                onClick={handlePrevStep}
                className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {isRtl ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                <span>{currentLang === 'en' ? 'Back' : 'پیچھے'}</span>
              </button>
            )}

            {/* Next Step / Finish */}
            <button
              onClick={handleNextStep}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>
                {currentStep === tutorialSteps.length - 1
                  ? currentLang === 'en'
                    ? 'Got it, Start'
                    : 'مکمل ہوا'
                  : currentLang === 'en'
                  ? 'Next'
                  : 'آگے'}
              </span>
              {currentStep < tutorialSteps.length - 1 && (
                isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
