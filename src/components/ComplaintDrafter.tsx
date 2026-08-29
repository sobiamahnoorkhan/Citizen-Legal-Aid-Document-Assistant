import React, { useState, useEffect } from 'react';
import { LanguageCode, ProvinceCode, SavedComplaintDraft } from '../types';
import { exportComplaintPDF } from '../utils/pdfExporter';
import { printLegalDocument } from '../utils/printHelper';
import { useSpeechToText } from '../hooks/useSpeechToText';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import {
  FileEdit,
  Sparkles,
  Printer,
  Download,
  Copy,
  Save,
  CheckCircle,
  Building,
  Calendar,
  Globe,
  FileText,
  ShieldCheck,
  PhoneCall,
  Scale,
  CheckSquare,
  MapPin,
  User,
  CreditCard,
  Phone,
  FileCode2,
  DollarSign,
  Info,
  RotateCcw,
  Trash2,
  Building2,
  Send,
  Clock,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Mic,
  MicOff,
  ChevronDown,
  ChevronUp,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Check,
  Loader2,
  Flame,
  Gavel,
  ShieldAlert,
  Home,
  Users,
} from 'lucide-react';

interface ComplaintDrafterProps {
  currentLang: LanguageCode;
  currentProvince: ProvinceCode;
  onSaveDraft: (draft: SavedComplaintDraft) => void;
  selectedTemplateId?: string;
}

interface AuthorityTypeOption {
  id: string;
  badge: string;
  badgeColor: string;
  icon: React.ElementType;
  title: Record<LanguageCode, string>;
  subtitle: Record<LanguageCode, string>;
  recipientDefault: Record<LanguageCode, string>;
  lawReference: Record<LanguageCode, string>;
}

const AUTHORITY_TYPES: AuthorityTypeOption[] = [
  {
    id: 'consumer_court',
    badge: 'Act',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    icon: Gavel,
    title: {
      sd: 'ڪنزيومر ڪورٽ (ناقص شيون يا خراب سروسز)',
      ur: 'کنزیومر کورٹ (ناقص اشیاء یا خراب سروسز)',
      en: 'Consumer Court (Defective Goods / Services)',
      pa: 'کنزیومر کورٹ (ناقص چیزاں یا خراب خدمات)',
      ps: 'د مصرف کوونکو محکمه (ناقص توکي یا خراب خدمات)',
    },
    subtitle: {
      sd: 'خراب پروڊڪٽ، نقد واپسي يا وارنٽي تنازعو',
      ur: 'خراب پروڈکٹ، رقم کی واپسی یا ورینٹی تنازعہ',
      en: 'Faulty items, non-refunds, fake warranties, service delay',
      pa: 'خراب پروڈکٹ، پیسے دی واپسی یا وارنٹی مسئلہ',
      ps: 'د توکو خرابوالی، پیسو بېرته ورکول یا د خدماتو بې نظمۍ',
    },
    recipientDefault: {
      sd: 'جناب عالي چيئرمين / جج، ڊسٽرڪٽ ڪنزيومر ڪورٽ',
      ur: 'جناب عالی چیئرمین / جج، ڈسٹرکٹ کنزیومر کورٹ',
      en: 'The Hon’ble Presiding Officer / Judge, District Consumer Court',
      pa: 'جناب عالی چیئرمین / جج، ڈسٹرکٹ کنزیومر کورٹ',
      ps: 'محترم قاضي صاحب، د مصرف کوونکو مضلعي محکمه',
    },
    lawReference: {
      sd: 'تحت ڪنزيومر پروٽيڪشن ايڪٽ (Consumer Protection Act)',
      ur: 'تحت کنزیومر پروٹیکشن ایکٹ (Consumer Protection Act)',
      en: 'Under Consumer Protection Act & Rights Statutory Provisions',
      pa: 'تحت کنزیومر پروٹیکشن ایکٹ (Consumer Protection Act)',
      ps: 'د مصرف کوونکو د ملاتړ قانون له مخې',
    },
  },
  {
    id: 'federal_ombudsman',
    badge: 'Federal',
    badgeColor: 'bg-slate-200 text-slate-900 border-slate-300',
    icon: Building2,
    title: {
      sd: 'وفاقي محتسب (سرڪاري ادارن خلاف شكايت)',
      ur: 'وفاقی محتسب (سرکاری اداروں کے خلاف شکایت)',
      en: 'Federal Ombudsman / Wafaqi Mohtasib',
      pa: 'وفاقی محتسب (سرکاری اداریاں خلاف شکایت)',
      ps: 'وفاقي محتسب (د دولتي ادارو د بې نظمۍ شکایت)',
    },
    subtitle: {
      sd: 'نادرا، ليسڪو، ايس اين جي پي ايل، پاسپورٽ، پي ٽي سي ايل، پينشن',
      ur: 'نادرا، لیسکو، کے الیکٹرک، گیس، پاسپورٹ یا پینشن بدانتظامی',
      en: 'NADRA, LESCO, K-Electric, Gas bills, Passports, EOBI, Pension delays',
      pa: 'نادرا، بجلی بل، گیس، پاسپورٹ یا پینشن دی بدانتظامی',
      ps: 'نادرا، د بریښنا او ګاز بلونه، پاسپورت، او تقاعد بدانتظامي',
    },
    recipientDefault: {
      sd: 'جناب وفاقي محتسب اعليٰ، وفاقي محتسب سيڪريٽريٽ',
      ur: 'جناب وفاقی محتسب اعلیٰ، وفاقی محتسب اعلیٰ سیکرٹریٹ',
      en: 'The Honorable Federal Ombudsman (Wafaqi Mohtasib Secretariat)',
      pa: 'جناب وفاقی محتسب اعلیٰ، وفاقی محتسب سیکرٹریٹ',
      ps: 'محترم وفاقي محتسب، د وفاقي محتسب دارالانشاء',
    },
    lawReference: {
      sd: 'تحت وفاقي محتسب آرڊر 1983 (مال ايڊمنسٽريشن)',
      ur: 'تحت وفاقی محتسب اعلیٰ آرڈر 1983 (انسدادِ بدانتظامی)',
      en: 'Under Establishment of the Office of Wafaqi Mohtasib Order 1983',
      pa: 'تحت وفاقی محتسب آرڈر 1983 (مال ایڈمنسٹریشن)',
      ps: 'د ۱۹۸۳ کال د وفاقي محتسب د فرمان له مخې',
    },
  },
  {
    id: 'police_fir',
    badge: 'FIR',
    badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
    icon: ShieldAlert,
    title: {
      sd: 'ٿاڻو / پوليس اسٽيشن (ايف آئي آر / چوري / ڌوڪو)',
      ur: 'تھانہ / پولیس اسٹیشن (ایف آئی آر / چوری / دھوکہ)',
      en: 'Police Station (FIR / Theft / Fraud / Robbery)',
      pa: 'تھانہ / پولیس اسٹیشن (ایف آئی آر / چوری / دھوکہ)',
      ps: 'د پولیسو تاڼه (د لومړي رپوټ FIR / غلا / دوکه)',
    },
    subtitle: {
      sd: 'چوري، ڌوڪيبازي، حملو، يا غير قانوني قبضو',
      ur: 'چوری، دھوکہ دہی، دھمکی یا مجرمانہ واقعہ',
      en: 'Criminal offences, theft, burglary, assault, fraud, property trespass',
      pa: 'چوری، دھوکہ، دھمکی یا پرچہ درج کروان دی درخواست',
      ps: 'جنایي جرمونه، غلا، ګواښونه او ځاني تیری',
    },
    recipientDefault: {
      sd: 'بخڊمت جناب ايس ايڇ او (SHO) صاحبان، پوليس اسٽيشن',
      ur: 'بخڈمت جناب ایس ایچ او (SHO) صاحب، متعلقہ تھانہ',
      en: 'To The Station House Officer (SHO), Police Station',
      pa: 'بخڈمت جناب ایس ایچ او (SHO) صاحب، تھانہ',
      ps: 'د پولیسو حوزې درانه امریت ته',
    },
    lawReference: {
      sd: 'تحت دفعو 154 ضابطه فوجداري (CrPC) ۽ تعزيرات پاڪستان (PPC)',
      ur: 'تحت دفعہ 154 ضابطہ فوجداری (CrPC) و تعزیرات پاکستان (PPC)',
      en: 'Under Section 154 CrPC & Pakistan Penal Code (PPC)',
      pa: 'تحت دفعہ 154 ضابطہ فوجداری تے تعزیرات پاکستان',
      ps: 'د جزايي اجراآتو د ۱۵۴ مادې او تعزیرات پاکستان له مخې',
    },
  },
  {
    id: 'fia_cybercrime',
    badge: 'PECA',
    badgeColor: 'bg-slate-900 text-white border-slate-700',
    icon: Flame,
    title: {
      sd: 'ايف آئي اي سائبر ڪرائيم (آن لائن ڌوڪو / هراسمينٽ)',
      ur: 'ایف آئی اے سائبر کرائم (آن لائن فراڈ / ہراسمنٹ)',
      en: 'FIA Cybercrime Wing (Online Fraud / Harassment)',
      pa: 'ایف آئی اے سائبر کرائم (آن لائن فراڈ / بلیک میلنگ)',
      ps: 'د ایف آئی اې سائبر جرمونو څانګه (آنلاین دوکه)',
    },
    subtitle: {
      sd: 'آن لائن بئنڪ فراڊ، فيڪ آئي ڊي، هئڪنگ يا هراسمينٽ',
      ur: 'آن لائن بینک فراڈ، فیک پروفائل، ہیکنگ یا بلیک میلنگ',
      en: 'Bank OTP scams, social media hacking, online harassment, blackmailing',
      pa: 'آن لائن بینک فراڈ، فیک پروفائل، ہیکنگ یا ہراسمنٹ',
      ps: 'آنلاین بانکي دوکه، هیک کول، ګواښونه او انټرنیټي جرمونه',
    },
    recipientDefault: {
      sd: 'بخڊمت جناب ايڊيشنل ڊائريڪٽر / انچارج سائبر ڪرائيم ونگ FIA',
      ur: 'بخڈمت جناب ایڈیشنل ڈائریکٹر / انچارج سائبر کرائم ونگ FIA',
      en: 'To The Incharge / Additional Director, FIA Cyber Crime Center',
      pa: 'بخڈمت جناب ایڈیشنل ڈائریکٹر سائبر کرائم FIA',
      ps: 'د ایف آئی اې سائبر جرمونو د راپور ورکولو مرکز مشرتوب ته',
    },
    lawReference: {
      sd: 'تحت پيڪا ايڪٽ 2016 (Prevention of Electronic Crimes Act)',
      ur: 'تحت پیکا ایکٹ 2016 (Prevention of Electronic Crimes Act)',
      en: 'Under Prevention of Electronic Crimes Act (PECA) 2016',
      pa: 'تحت پیکا ایکٹ 2016 (Prevention of Electronic Crimes Act)',
      ps: 'د ۲۰۱۶ کال د برېښنایي جرمونو مخنیوي قانون له مخې',
    },
  },
  {
    id: 'rent_controller',
    badge: 'Rent',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    icon: Home,
    title: {
      sd: 'رينٽ ڪنٽرولر ڪورٽ (مالڪ مڪان / ڪرائيدار تنازعو)',
      ur: 'رینٹ کنٹرولر کورٹ (مالک مکان و کرایہ دار تنازعہ)',
      en: 'Rent Controller Court (Eviction / Security Deposit)',
      pa: 'رینٹ کنٹرولر کورٹ (مالک مکان تے کرایہ دار مسئلہ)',
      ps: 'د رینټ کنټرولر محکمه (د کرایه داري لانجه)',
    },
    subtitle: {
      sd: 'جڳهه خالي ڪرائڻ، ڪرائي جي عدم ادائيگي يا ڊپازٽ واپسي',
      ur: 'مکان/دکان خالی کروانا، کرایہ عدم ادائیگی یا سیکیورٹی سیکیورٹیز',
      en: 'Property eviction, unpaid rent, security deposit refund',
      pa: 'جگہ خالی کروانا، کرایہ نہ دینا یا سیکیورٹی رقم دا مسئلہ',
      ps: 'د کور بې دخلي، د کرایې ناورکول یا سټامپ شخړې',
    },
    recipientDefault: {
      sd: 'جناب رينٽ ڪنٽرولر صاحبان / سول جج ڪورٽ',
      ur: 'جناب عالی رینٹ کنٹرولر صاحب / سول جج',
      en: 'The Hon’ble Rent Controller / Civil Judge Court',
      pa: 'جناب عالی رینٹ کنٹرولر صاحب / سول جج',
      ps: 'د رینټ کنټرولر او سول قاضي محترم حضور ته',
    },
    lawReference: {
      sd: 'تحت رينٽيڊ پريمسز ايڪٽ (Rented Premises Act)',
      ur: 'تحت رینٹڈ پریمسز ایکٹ (Rented Premises Act)',
      en: 'Under Urban Rent Restriction Ordinance & Rented Premises Act',
      pa: 'تحت رینٹڈ پریمسز ایکٹ (Rented Premises Act)',
      ps: 'د هټیو او کورونو کرایې تنظیمولو قانون له مخې',
    },
  },
  {
    id: 'family_court',
    badge: 'Family',
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
    icon: Users,
    title: {
      sd: 'فيملي ڪورٽ (خلع / نفقو / ٻارن جي تحويل)',
      ur: 'فیملی کورٹ (خُلع / نفقہ / بچوں کی تحویل)',
      en: 'Family Court (Khula / Maintenance / Custody)',
      pa: 'فیملی کورٹ (خلع / نفقہ / بچوں دی تحویل)',
      ps: 'د کورنۍ محکمه (خلع / نفقې / ماشومانو ساتنه)',
    },
    subtitle: {
      sd: 'نفقو، حق مہر، خلع، يا ٻارن جي سرپرستي',
      ur: 'بیوی و بچوں کا خرچ، خلع، حق مہر یا بچوں کی حضانت',
      en: 'Wife/child maintenance, Khula dissolution, dower, child custody',
      pa: 'بیوی بچوں دا خرچہ، خلع، حق مہر یا بچوں دی تحویل',
      ps: 'د مېرمنې او ماشومانو نفقې، خلع او حضانت دعویٰ',
    },
    recipientDefault: {
      sd: 'جناب فيملي جج صاحبان / فيملي ڪورٽ',
      ur: 'جناب عالی فیملی جج صاحب / فیملی کورٹ',
      en: 'The Hon’ble Judge Family Court',
      pa: 'جناب عالی فیملی جج صاحب / فیملی کورٹ',
      ps: 'د کورنۍ محکمې محترم قاضي صاحب',
    },
    lawReference: {
      sd: 'تحت فيملي ڪورٽس ايڪٽ 1964 ۽ مسلم فيملي لاز آرڊيننس 1961',
      ur: 'تحت فیملی کورٹس ایکٹ 1964 و مسلم فیملی لاز آرڈیننس 1961',
      en: 'Under Family Courts Act 1964 & Muslim Family Laws Ordinance 1961',
      pa: 'تحت فیملی کورٹس ایکٹ 1964 تے مسلم فیملی لاز آرڈیننس',
      ps: 'د د کورنیو محاکمو د ۱۹۶۴ او مسلِم فیملي لاز له مخې',
    },
  },
];

interface SubmissionGuide {
  authorityId: string;
  lawsHeading: Record<LanguageCode, string>;
  filingHeading: Record<LanguageCode, string>;
  afterFilingHeading: Record<LanguageCode, string>;
  citedLaws: {
    actTitle: string;
    sectionNo: string;
    description: Record<LanguageCode, string>;
  }[];
  filingInfo: {
    office: Record<LanguageCode, string>;
    prerequisite: Record<LanguageCode, string>;
    copiesAndDocs: Record<LanguageCode, string>;
    fee: Record<LanguageCode, string>;
  };
  afterFilingProcess: {
    receipt: Record<LanguageCode, string>;
    notice: Record<LanguageCode, string>;
    timeline: Record<LanguageCode, string>;
    helpline: Record<LanguageCode, string>;
  };
}

const COMPLAINT_SUBMISSION_GUIDES: Record<string, SubmissionGuide> = {
  consumer_court: {
    authorityId: 'consumer_court',
    lawsHeading: {
      ur: 'متعلقہ پاکستانی قوانین و دفعات (CITED PAKISTAN LAWS)',
      en: 'CITED PAKISTAN LAWS & STATUTORY SECTIONS',
      sd: 'لاڳاپيل پاڪستاني قانون ۽ قلم',
      pa: 'متعلقہ پاکستانی قوانین تے دفعات',
      ps: 'اړوند د پاکستان قوانین او مادې',
    },
    filingHeading: {
      ur: 'درخواست جمع کروانے کی معلومات (FILING & SUBMISSION INFO)',
      en: 'FILING & SUBMISSION INFORMATION',
      sd: 'درخواست جمع ڪرائڻ جي معلومات',
      pa: 'درخواست جمع کروان دی معلومات',
      ps: 'د غوښتنلیک جمع کولو معلومات',
    },
    afterFilingHeading: {
      ur: 'درخواست جمع کروانے کے بعد کی کارروائی (POST-FILING PROCESS)',
      en: 'POST-FILING PROCESS & WHAT HAPPENS NEXT',
      sd: 'درخواست جمع ڪرڻ کانپوءِ جي ڪارروائي',
      pa: 'درخواست جمع کروان توں بعد کی ہووے گا',
      ps: 'د درلودلو له سپارلو وروسته اقدام',
    },
    citedLaws: [
      {
        actTitle: 'Consumer Protection Act (Punjab 2005 / Sindh 2014 / ICT 1995 / KP 1997)',
        sectionNo: 'Section 28 & Section 25',
        description: {
          ur: 'سیکشن 28: ناقص اشیاء یا ناقص سروسز کی صورت میں کنزیومر کورٹ میں ہرجانے کی شکایت دائر کرنے کا قانونی حق۔ سیکشن 25: دائر کرنے سے قبل 15 دن کا تحریری قانونی نوٹس لازمی ہے۔',
          en: 'Section 28 provides the right to file a damages claim for defective goods or deficient services. Section 25 mandates a 15-day prior written legal notice before court filing.',
          sd: 'سيڪشن 28: ناقص شين يا خراب سروسز جي صورت ۾ نقصان جي دعويٰ. سيڪشن 25: 15 ڏينهن جو قانوني نوٽيس لازمي آهي.',
          pa: 'سیکشن 28: خراب سامان یا سروس تے ہرجانے دی شکایت۔ سیکشن 25: 15 دن دا نوٹس لازمی اے۔',
          ps: '۲۸ ماده: د خرابو توکو او خدماتو د تاوان غوښتنه. ۲۵ ماده: ۱۵ ورځې دمخه رسمي خبرداری.',
        },
      },
    ],
    filingInfo: {
      office: {
        ur: 'ڈسٹرکٹ کنزیومر کورٹ (District Consumer Court) کے رجسٹرار آفس یا ڈسٹرکٹ کونسل میں۔',
        en: 'Registrar Office at the District Consumer Court or Deputy Commissioner Office.',
        sd: 'ڊسٽرڪٽ ڪنزيومر ڪورٽ جي رجسٽرار آفيس ۾.',
        pa: 'ڈسٹرکٹ کنزیومر کورٹ دے رجسٹرار دفتر وِچ۔',
        ps: 'د ضلعې د مصرف کوونکو محکمې د راجستر دفتر کې.',
      },
      prerequisite: {
        ur: '15 دن کا قانونی نوٹس (Legal Notice) بذریعہ رجسٹرڈ ڈاک/کورئیر بھیجنا لازمی ہے۔ کورئیر کی رسید ساتھ لگائیں۔',
        en: 'A 15-day prior written Legal Notice to vendor via courier is mandatory. Attach courier receipt.',
        sd: '15 ڏينهن جو ليگل نوٽيس کورئير ذريعي موڪلڻ لازمي آهي.',
        pa: '15 دن دا قانونی نوٹس کورئیر نال بھیجنا ضروری اے۔',
        ps: 'پلورونکي ته د پست له لارې ۱۵ ورځې وړاندې لیکلي خبرداری اړین دی.',
      },
      copiesAndDocs: {
        ur: 'اصلی شکایت نامہ + 2 فوٹو کاپی سیٹ، شناختی کارڈ کاپی، رسیپٹ/بل، اور 100 روپے کے سٹیمپ پیپر پر حلف نامہ۔',
        en: 'Original Complaint + 2 Copy Sets, CNIC Copy, Purchase Invoice/Receipt, Copy of Legal Notice + Affidavit.',
        sd: 'اصل درخواست + 2 کاپيون، CNIC کاپي، بل/رسيد، نوٽيس کاپي.',
        pa: 'اصلی شکایت + 2 کاپیاں، شناختی کارڈ، بل، نوٹس رسید۔',
        ps: 'اصلي غوښتنلیک + ۲ کاپۍ، د تذکرې کاپي، د اخیستلو رسید.',
      },
      fee: {
        ur: '100% مفت - کنزیومر کورٹ میں شکایت جمع کروانے کی کوئی کورٹ فیس (No Court Fee) نہیں ہے۔',
        en: '100% Free - No court fee is required for filing consumer court complaints in Pakistan.',
        sd: '100% مفت - ڪنزيومر ڪورٽ ۾ ڪنهن به قسم جي ڪورٽ فيس ناهي.',
        pa: '100% مفت - کورٹ دی کوئی فیس نہیں اے۔',
        ps: '۱۰۰٪ وړیا - د مصرف کوونکو په محکمه کې هیڅ قضایي فیس نشته.',
      },
    },
    afterFilingProcess: {
      receipt: {
        ur: 'کورٹ آفس سے شکایت جمع کروانے کا آفیشل ڈائری نمبر (Diary Number) حاصل کریں۔',
        en: 'Obtain an official Diary Number / Case Registration Receiving Receipt.',
        sd: 'ڪورٽ آفيس مان ڊائري نمبر وٺو.',
        pa: 'کورٹ دفتر توں ڈائری نمبر حاصل کرو۔',
        ps: 'له محکمې دفتر څخه د غوښتنلیک د جلب راجستر نمبر واخلئ.',
      },
      notice: {
        ur: 'جج صاحب فریق ثانی (دکاندار/کمپنی) کو 7 سے 15 دن کے اندر پیشی اور جواب کا نوٹس جاری کرتے ہیں۔',
        en: 'The Judge issues formal summons to the vendor/company to appear and reply within 7-15 days.',
        sd: 'جج صاحب ٻئي ڌُر کي 7 کان 15 ڏينهن ۾ جواب لاءِ نوٽيس جاري ڪندو.',
        pa: 'جج صاحب دکاندار نوں 7 توں 15 دن وِچ جواب لئی نوٹس بھیجدے نیں۔',
        ps: 'قاضي صاحب د مقابل لوري ته له ۷ تر ۱۵ ورځو پورې د ځواب ویلو غوښتنه کوي.',
      },
      timeline: {
        ur: 'قانون کے مطابق کنزیومر کیسز کا فیصلہ 6 ماہ (180 دن) کے اندر ہونا لازمی ہے۔',
        en: 'By statutory mandate, consumer disputes must be decided within 6 months (180 days).',
        sd: 'قانون موجب فيصلو 6 مهينن (180 ڏينهن) اندر ٿيڻ لازمي آهي.',
        pa: 'قانون مطابق فیصلہ 6 مہینے وِچ ہونا ضروری اے۔',
        ps: 'د قانون له مخې باید د ۶ میاشتو په ترڅ کې د قضیې پرېکړه وشي.',
      },
      helpline: {
        ur: 'کنزیومر پروٹیکشن ہیلپ لائن: 0800-02345 / وزارتِ انسانی حقوق 1099۔',
        en: 'Consumer Protection Helpline: 0800-02345 / Legal Aid Helpline 1099.',
        sd: 'ڪنزيومر هيڊلائن: 0800-02345 / 1099.',
        pa: 'کنزیومر ہیلپ لائن: 0800-02345 / 1099۔',
        ps: 'د مصرف کوونکو د ملاتړ ټیلیفون: 0800-02345 / ۱۰۹۹.',
      },
    },
  },
  federal_ombudsman: {
    authorityId: 'federal_ombudsman',
    lawsHeading: {
      ur: 'وفاقی محتسب آرڈر 1983 کی شقیں (WAFAQI MOHTASIB ORDER 1983)',
      en: 'ESTABLISHMENT OF WAFAQI MOHTASIB ORDER 1983 & REFORMS ACT 2013',
      sd: 'وفاقي محتسب قانون جون شقون 1983',
      pa: 'وفاقی محتسب آرڈر 1983 دی دفعات',
      ps: 'د وفاقي محتسب د ۱۹۸۳ او ۲۰۱۳ کلونو قوانین',
    },
    filingHeading: {
      ur: 'وفاقی محتسب میں شکایت کا طریقہ (FILING & SUBMISSION INFO)',
      en: 'FILING PROCEDURE AT WAFAQI MOHTASIB SECRETARIAT',
      sd: 'وفاقي محتسب وٽ درخواست جو طريقو',
      pa: 'وفاقی محتسب وِچ شکایت دا طریقہ',
      ps: 'وفاقي محتسب ته د شکایت د ثبت لاره',
    },
    afterFilingHeading: {
      ur: 'وفاقی محتسب کی کارروائی اور مدت (POST-FILING PROCESS & TIMELINE)',
      en: 'POST-FILING PROCESS & STATUTORY 60-DAY TIMELINE',
      sd: 'محتسب جي ڪارروائي ۽ مدت',
      pa: 'محتسب دی کارروائی تے 60 دن دی مدت',
      ps: 'د محتسب د اجراآتو ۶۰ ورځنی مهال وېش',
    },
    citedLaws: [
      {
        actTitle: 'Establishment of Office of Wafaqi Mohtasib Order 1983 & Institutional Reforms Act 2013',
        sectionNo: 'Article 9 & Section 11',
        description: {
          ur: 'آرٹیکل 9: وفاقی اداروں (نادرا، لیسکو، کے الیکٹرک، سوئی گیس، پاسپورٹ، ای او بی آئی، پینشن) کی بدانتظامی، تاخیر، غلط بلنگ کے خلاف کارروائی کا قانونی اختیار۔ قانون کے مطابق 60 دن میں فیصلہ لازمی ہے۔',
          en: 'Article 9 empowers investigation into maladministration, delays, overbilling, and abuse of power by federal bodies (NADRA, LESCO, K-Electric, Gas, Passports). Decisions mandated within 60 days.',
          sd: 'آرٽيڪل 9: وفاقي ادارن (نادرا، ليسڪو، گيس، پاسپورٽ) جي بدانتظامي خلاف مفت ڪارروائي. 60 ڏينهن ۾ فيصلو لازمي.',
          pa: 'آرٹیکل 9: وفاقی اداریاں (نادرا، لیسکو، گیس، پاسپورٹ) دی بدانتظامی خلاف کارروائی دا اختیار۔ 60 دناں وِچ فیصلہ لازمی۔',
          ps: '۹ ماده: د نادرا، بریښنا، ګاز او پاسپورت ادارو د بدانتظامۍ د لټون اکار. په ۶۰ ورځو کې نهایي تصمیم نیول کېږي.',
        },
      },
    ],
    filingInfo: {
      office: {
        ur: 'وفاقی محتسب اعلیٰ سیکرٹریٹ (اسلام آباد ہیڈ آفس یا صوبائی/علاقائی دفاتر لاہور، کراچی، پشاور، کوئٹہ، ملتان، سکھر، فیصل آباد وغیرہ) یا آن لائن portal: mohtasib.gov.pk',
        en: 'Wafaqi Mohtasib Secretariat (Head Office Islamabad or Regional Offices in Karachi, Lahore, Peshawar, Quetta, Multan, Sukkur, etc.) or Online at mohtasib.gov.pk',
        sd: 'وفاقي محتسب سيڪريٽريٽ جي علائقائي آفيسن ۾ يا آن لائن mohtasib.gov.pk تي.',
        pa: 'وفاقی محتسب سیکرٹریٹ ریجنل دفتر وِچ یا آن لائن mohtasib.gov.pk تے',
        ps: 'د وفاقي محتسب مرکزي او سیمه ییز دفترونه یا په آنلاین بڼه mohtasib.gov.pk کې.',
      },
      prerequisite: {
        ur: 'شکایت درج کروانے سے قبل متعلقہ ادارے کے سربراہ (مثلاً لیسکو ایس ڈی او، نادرا زونل انچارج) کو تحریری شکایت بھیجی گئی ہو اور 15 دن میں حل نہ ہوا ہو۔',
        en: 'Prior written complaint submitted to the concerned departmental authority giving 15 days for grievance redressal.',
        sd: 'اداري جي عملدار کي اڳ ۾ تحريري نوٽيس ڏنو ويو هجي.',
        pa: 'ادارے دے افسر نوں پہلے تحریری نوٹس دتا گیا ہووے۔',
        ps: 'وړاندې له دې اړوندې ادارې ته لیکلی یادښت ورکړل شوی وي.',
      },
      copiesAndDocs: {
        ur: 'سادہ کاغذ پر درخواست + شناختی کارڈ کاپی + متاثرہ بل/نادرا ٹوکن کاپی + ادارے کو بھیجی گئی پیشگی درخواست کی کاپی۔',
        en: 'Plain Paper Complaint + CNIC Copy + Utility Bill / Token Copy + Copy of Departmental Grievance Application.',
        sd: 'سادي ڪاغذ تي درخواست + CNIC کاپي + بل/ٽوڪن کاپي + نوٽيس کاپي.',
        pa: 'سادے کاغذ تے درخواست + شناختی کارڈ کاپی + بل کاپی + نوٹس کاپی۔',
        ps: 'پر ساده کاغذ درخواست + د تذکرې کاپي + د بل یا نادرا ټوکن کاپي.',
      },
      fee: {
        ur: '100% مفت - وفاقی محتسب میں درخواست دینے کا کوئی خرچہ یا فیس نہیں ہے، اور وکیل کی ضرورت نہیں ہوتی۔',
        en: '100% Free - Zero filing fee and no advocate/lawyer is required to represent the complainant.',
        sd: '100% مفت - محتسب وٽ درخواست لاءِ ڪنهن وڪيل يا فيس جي ضرورت ناهي.',
        pa: '100% مفت - محتسب کول شکایت لئی وکیل یا فیس دی ضرورت نہیں اے۔',
        ps: '۱۰۰٪ وړیا - د وفاقي محتسب په حضور کې د وکیل او یا مالي لګښت هیڅ اړتیا نشته.',
      },
    },
    afterFilingProcess: {
      receipt: {
        ur: 'آن لائن یا ڈیسک سے فوری طور پر 10 ہندسوں کا آفیشل "کمپلینٹ آئی ڈی" (Complaint ID) جاری کیا جاتا ہے۔',
        en: 'An official 10-digit Complaint Tracking ID is issued immediately upon receipt.',
        sd: 'کمپلينٽ آئي ڊي فوراً جاري ڪئي ويندي آهي.',
        pa: 'کمپلینٹ آئی ڈی فوراً جاری کیتی جاندی اے۔',
        ps: 'سمدستي مراجعین ته رسمی تعقیبي ګڼه (Complaint ID) ورکول کېږي.',
      },
      notice: {
        ur: 'محتسب کا شعبہ آئندہ 7 دنوں میں متعلقہ وفاقی ادارے کے سربراہ کو طلب کر کے تحریری جواب مانگتا ہے۔',
        en: 'The Ombudsman Secretariat issues notice to the Department Head to submit an official explanation within 7-14 days.',
        sd: 'محتسب آفيس 7 ڏينهن ۾ اداري جي آفيسر کي جواب لاءِ نوٽيس جاري ڪندي.',
        pa: 'محتسب دفتر 7 دناں وِچ افسر نوں جواب لئی نوٹس بھیجدا اے۔',
        ps: 'محتسب له اړوندې ادارې څخه په ۷ ورځو کې دننه د لیکلي ځواب مطالبہ کوي.',
      },
      timeline: {
        ur: 'قانون کے تحت وفاقی محتسب 60 دن کے اندر سائل کے حق میں حتمی آرڈر جاری کرنے کا پابند ہے۔',
        en: 'By statutory law, final findings and binding directives must be issued within 60 days.',
        sd: 'قانون موجب 60 ڏينهن اندر حتمي حڪم جاري ٿيندو.',
        pa: 'قانون مطابق 60 دناں وِچ حتمی حکم جاری ہوندا اے۔',
        ps: 'د قانون له مخې محتسب مکلف دی چې په ۶۰ ورځو کې پرېکړه صادره کړي.',
      },
      helpline: {
        ur: 'وفاقی محتسب ہیلپ لائن: 1055 / لینڈ لائن: 051-9217211 / ویب سائٹ: mohtasib.gov.pk',
        en: 'Federal Ombudsman Toll-Free Helpline: 1055 / Landline: 051-9217211 / Website: mohtasib.gov.pk',
        sd: 'محتسب هيڊلائن: 1055 / 051-9217211.',
        pa: 'محتسب ہیلپ لائن: 1055 / 051-9217211۔',
        ps: 'د تماس لاره: ۱۰۵۵ / تلفون: ۰۵۱-۹۲۱۷۲۱۱.',
      },
    },
  },
  police_fir: {
    authorityId: 'police_fir',
    lawsHeading: {
      ur: 'ضابطہ فوجداری (CrPC) و تعزیرات پاکستان (PPC) کی شقیں',
      en: 'CODE OF CRIMINAL PROCEDURE 1898 & PAKISTAN PENAL CODE (PPC)',
      sd: 'ضابطه فوجداري (CrPC) ۽ تعزيرات پاڪستان جا قلم',
      pa: 'ضابطہ فوجداری تے تعزیرات پاکستان دی دفعات',
      ps: 'د جزايي اجراآتو قانون ۱۸۹۸ او د پاکستان پینل کوډ',
    },
    filingHeading: {
      ur: 'تھانہ و سیشن کورٹ میں ایف آئی آر کا طریقہ (FIR FILING PROCEDURE)',
      en: 'FIR REGISTRATION & SECTION 22-A PETITION PROCEDURE',
      sd: 'ٿاڻي ۽ ڪورٽ ۾ ايف آئي آر جو طريقو',
      pa: 'تھانہ تے کورٹ وِچ ایف آئی آر دا طریقہ',
      ps: 'په تاڼه کې د لومړي رپوټ FIR یا ۲۲-A عریضې طریقہ',
    },
    afterFilingHeading: {
      ur: 'تفتیش اور ایس ایچ او کے انکار کی صورت میں (POST-FILING & RECOURSE)',
      en: 'INVESTIGATION PROCEDURE & RECOURSE IF SHO REFUSES FIR',
      sd: 'تفتيش ۽ ايس ايڇ او جي انڪار تي اپيل',
      pa: 'تفتیش تے ایس ایچ او دے انکار تے 22-A',
      ps: 'د جرم تحققات او د تاڼه دار د انکار پر مهال لاره',
    },
    citedLaws: [
      {
        actTitle: 'Code of Criminal Procedure (CrPC) 1898 & Police Order 2002',
        sectionNo: 'Section 154 & Section 22-A/22-B',
        description: {
          ur: 'سیکشن 154 CrPC: قابلِ دست اندازی جرم (چوری، ڈکیتی، فراڈ، حملہ) پر فوری ایف آئی آر درج کرنا ایس ایچ او کی قانونی ذمہ داری ہے۔ سیکشن 22-A: اگر ایس ایچ او انکار کرے تو سیشن جج (جسٹس آف پیس) کے پاس درخواست دائر کریں۔',
          en: 'Section 154 CrPC mandates the SHO to immediately register an FIR for any cognizable offense. Section 22-A CrPC allows complainants to file a petition before the Justice of Peace (Sessions Judge) if the police refuse.',
          sd: 'سيڪشن 154: جرم تي فوراً ايف آئي آر لکڻ پوليس تي فرض آهي. سيڪشن 22-A: انڪار تي سيشن جج وٽ درخواست داخل ڪريو.',
          pa: 'سیکشن 154: جرم تے ایف آئی آر درج کرنا پولیس دا فرض اے۔ سیکشن 22-A: انکار تے سیشن جج کول جاؤ۔',
          ps: '۱۵۴ ماده: د پېښې پر سر سمدستي ایف ای ار لیکل د پولیسو دنده ده. ۲۲-A ماده: که تاڼه دار انکار وکړي، سیشن قاضي ته مراجعه وکړئ.',
        },
      },
    ],
    filingInfo: {
      office: {
        ur: 'متعلقہ پولیس اسٹیشن (تھانہ) کے ایس ایچ او (SHO) یا فرنٹ ڈیسک / محرر یا دفتر ایس پی / ڈی پی او۔',
        en: 'Concerned Police Station Front Desk / SHO Office or the Office of Superintendent of Police (SP / DPO).',
        sd: 'متعلقه پوليس اسٽيشن جو ايس ايڇ او / فرسٽ ڊيسڪ يا ايس پي آفيس.',
        pa: 'تھانے دا ایس ایچ او / فرنٹ ڈیسک یا ایس پی دفتر۔',
        ps: 'د خپلې سیمې تاڼه دار (SHO) یا د ایس پي (SP) دفتر.',
      },
      prerequisite: {
        ur: 'واقعہ کی تحریری درخواست بمع تاریخ، وقت، مقام، ملزمان کے نام/حلیہ، شاہدین، اور چوری/نقصان کی تفصیل۔',
        en: 'Written application detailing date, time, location, facts of crime, names/descriptions of accused, witnesses, and stolen items list.',
        sd: 'واقعي جي تحريري درخواست تاريخ، وقت ۽ شاهدن سان گڏ.',
        pa: 'واقعے دی تحریری درخواست تاریخ، وقت تے شاہداں دی تفصیل نال۔',
        ps: 'د واقعې بشپړ معلومات، تاریخ، وخت، د تورو کسانو نومونه او شاهدان.',
      },
      copiesAndDocs: {
        ur: 'تحریری درخواست کی 2 کاپیاں (ایک پر تھانے سے روزنامچہ مہر لگوا کر رسید لیں) + شناختی کارڈ کاپی + ثبوت۔',
        en: 'Written Application Original + 1 Copy (for receiving entry stamp in Daily Diary) + CNIC Copy + Proofs.',
        sd: 'درخواست جو 2 کاپيون + CNIC کاپي.',
        pa: 'درخواست دیاں 2 کاپیاں + شناختی کارڈ کاپی۔',
        ps: 'د غوښتنلیک ۲ کاپۍ (د تاڼې له مټې سره) او تذکره.',
      },
      fee: {
        ur: '100% مفت - ایف آئی آر درج کروانا بالکل مفت ہے۔ پولیس کو کوئی فیس یا پیسے دینا قانونی جرم ہے۔',
        en: '100% Free - FIR registration is completely free. Demanding payment for FIR is illegal.',
        sd: '100% مفت - ايف آئي آر ڪاٽڻ فوراً مفت آهي. رشوت ڏيڻ یا وٺڻ ڏوهه آهي.',
        pa: '100% مفت - ایف آئی آر کاٹنا مفت اے۔ پیسے دینا جرم اے۔',
        ps: '۱۰۰٪ وړیا - د ایف ای ار ثبتول په وړیا ډول ترسره کېږي، پیسې ورکول ناقانونه دي.',
      },
    },
    afterFilingProcess: {
      receipt: {
        ur: 'تھانے کے محرر یا فرنٹ ڈیسک سے دستخط شدہ ایف آئی آر کی کاپی (فارم 5.24) یا روزنامچہ کی کاپی مفت حاصل کریں۔',
        en: 'Obtain a signed copy of the FIR (Form 5.24) or Daily Diary (Roznamcha) entry free of charge.',
        sd: 'ٿاڻي مان ايف آئي آر جي تصديق ٿيل کاپي وٺو.',
        pa: 'تھانے توں ایف آئی آر دی کاپی لو۔',
        ps: 'له تاڼې څخه د اېف ای ار لومړۍ رسمي کاپي په وړیا بڼه واخلئ.',
      },
      notice: {
        ur: 'تفتشی افسر (IO) مقرر ہوتا ہے جو موقع کا معائنہ کر کے ملزمان کی گرفتاری اور 173 CrPC چالان عدالت میں جمع کرواتا ہے۔',
        en: 'An Investigating Officer (IO) is assigned to collect evidence, arrest suspects, and submit 173 CrPC Challan to Magistrate.',
        sd: 'تفتيشي عملدار مقرر ٿيندو جيڪو ضلعي ڪورٽ ۾ چالان جمع ڪرائيندو.',
        pa: 'تفتیشی افسر مقرر ہوندا اے جو چالان کورٹ وچ جمع کروائے گا۔',
        ps: 'تحقیقاتي مدعي ټاکل کېږي او لومړني شواهد محکمې ته استوي.',
      },
      timeline: {
        ur: 'اگر ایس ایچ او 24 گھنٹے میں ایف آئی آر نہ کاٹے تو ایس پی کو درخواست دیں۔ 7 دن میں کارروائی نہ ہونے پر سیشن جج کے پاس 22-A کی پٹیشن دائر کریں (14 دن میں فیصلہ)۔',
        en: 'If SHO refuses FIR, apply to SP. If SP takes no action within 7 days, file Section 22-A CrPC petition in Sessions Court (decided within 14 days).',
        sd: 'ايس ايڇ او جي انڪار تي ايس پي آفيس وڃو. عمل نه ٿيڻ تي سيشن ڪورٽ ۾ 22-A داخل ڪريو.',
        pa: 'ایس ایچ او دے انکار تے ایس پی کول جاؤ۔ کارروائی نہ ہون تے 22-A پٹیشن کرو۔',
        ps: 'که تاڼه دار انکار وکړي د ۲۲-A حادې عریضې له لارې سیشن محکمې ته رجوع وکړئ.',
      },
      helpline: {
        ur: 'پولیس ایمرجنسی ہیلپ لائن: 15 / آئی جی کیلیے شکایت ہیلپ لائن: 1787 / سٹیزن پورٹل۔',
        en: 'Police Emergency Helpline: 15 / IG Complaints Helpline: 1787 / Citizen Portal.',
        sd: 'پوليس هيڊلائن: 15 / آءِ جي شڪايت: 1787.',
        pa: 'پولیس ہیلپ لائن: 15 / آئی جی شکایت: 1787۔',
        ps: 'د پولیسو عاجله کرښه: ۱۵ / د اې جي ټیلیفون: ۱۷۸۷.',
      },
    },
  },
  fia_cybercrime: {
    authorityId: 'fia_cybercrime',
    lawsHeading: {
      ur: 'پریوینشن آف الیکٹرانک کرائمز ایکٹ 2016 (PECA LAWS)',
      en: 'PREVENTION OF ELECTRONIC CRIMES ACT (PECA) 2016',
      sd: 'سائبر ڪرائيم قانون 2016 جون شقون',
      pa: 'پریوینشن آف الیکٹرانک کرائمز ایکٹ 2016',
      ps: 'د برېښنایي جرمونو مخنیوي قانون ۲۰۱۶',
    },
    filingHeading: {
      ur: 'ایف آئی اے سائبر کرائم میں شکایت درج کروانا (FILING & EVIDENCE GUIDE)',
      en: 'FILING PROCEDURE AT FIA CYBERCRIME WING & DIGITAL EVIDENCE',
      sd: 'ايف آئي اي سائبر ڪرائيم ۾ شڪايت جو طريقو',
      pa: 'ایف آئی اے سائبر کرائم وِچ شکایت دا طریقہ',
      ps: 'په ایف آئی اې کې د انټرنیټي جرم شکایت ثبتول',
    },
    afterFilingHeading: {
      ur: 'انکوائری، مواد بلاکنگ اور کارروائی (INQUIRY & PTA REMOVAL PROCESS)',
      en: 'FIA INQUIRY, NOTICE & CONTENT BLOCKING VIA PTA',
      sd: 'انڪوائري ۽ مواد بلاڪنگ جو طريقو',
      pa: 'انکوائری تے مواد بلاک کروان دا طریقہ',
      ps: 'د جرم تحقیقات او له انټرنیټ څخه د توکو پاکول',
    },
    citedLaws: [
      {
        actTitle: 'Prevention of Electronic Crimes Act (PECA) 2016',
        sectionNo: 'Sections 20, 21, 24 & 37',
        description: {
          ur: 'سیکشن 20: آن لائن ہراسانی و بدنامی۔ سیکشن 21: غیر اخلاقی تصویر/ویڈیو وائرل کرنا یا بلیک میل کرنا (3 تا 5 سال قید)۔ سیکشن 24: سائبر اسٹاکنگ۔ سیکشن 37: پی ٹی اے کے ذریعے مواد بلاک کرنا۔',
          en: 'Section 20 deals with online defamation/harassment; Section 21 strictly penalizes unauthorized photo/video leakage and blackmailing (3-5 years imprisonment); Section 24 covers cyberstalking; Section 37 covers PTA content blocking.',
          sd: 'سيڪشن 20: آن لائين هراسمينٽ. سيڪشن 21: فوٽو ليڪ يا بليڪ ميلنگ (3 کان 5 سال قيد). سيڪشن 37: PTA ذريعي مواد بلاڪ ڪرڻ.',
          pa: 'سیکشن 20: آن لائن ہراسانی۔ سیکشن 21: تصویر لیک یا بلیک میلنگ (5 سال قید)۔ سیکشن 37: PTA توں مواد بلاک کروانا؛',
          ps: '۲۰ ماده: آنلاین بدنامول. ۲۱ ماده: د شخصي عکسونو او غږونو خپرول او بلیک مېل. ۳۷ ماده: د پي ټي اې لخوا حذف کول.',
        },
      },
    ],
    filingInfo: {
      office: {
        ur: 'ایف آئی اے سائبر کرائم رپورٹنگ سینٹر (اسلام آباد، لاہور، کراچی، پشاور، کوئٹہ، ملتان، فیصل آباد) یا آن لائن portal: complaint.fia.gov.pk',
        en: 'FIA Cybercrime Reporting Centre (Islamabad, Lahore, Karachi, Peshawar, Quetta, Multan, Faisalabad) or Online Portal: complaint.fia.gov.pk',
        sd: 'ايف آئي اي سائبر ڪرائيم سينٽرن تي يا آن لائين complaint.fia.gov.pk تي.',
        pa: 'ایف آئی اے سائبر کرائم سینٹر وِچ یا آن لائن complaint.fia.gov.pk تے',
        ps: 'د ایف آئی اې سایبر مرکزونه یا په آنلاین ډول complaint.fia.gov.pk پورټل کې.',
      },
      prerequisite: {
        ur: 'آن لائن ہراسانی، واٹس ایپ بلیک میلنگ یا فراڈ پیغامات کے سکرین شاٹس، لنکس، فون نمبرز اور چیٹ ہسٹری محفوظ رکھیں (پیغامات ڈلیٹ نہ کریں)۔',
        en: 'Preserve all digital evidence: take screenshots of messages/posts/profiles, retain phone numbers, URLs, and email headers (do not delete chats).',
        sd: 'اسڪرين شاٽس، لنڪس ۽ فون نمبر فوري طور محفوظ ڪريو.',
        pa: 'سکرین شاٹس، لنکس تے فون نمبر سنبھال کے رکھو۔',
        ps: 'د سکرین شاټونو، پیغامونو، ټولنیزو ادرسونو او عکسونو بې خدشې د شواهدو خوندي کول.',
      },
      copiesAndDocs: {
        ur: 'تحریری درخواست + پرنٹ شدہ سکرین شاٹس + شناختی کارڈ کاپی + ثبوتی USB/دیگر دستاویزات۔',
        en: 'Written Complaint Letter + Printed Screenshots of Evidence + CNIC Copy + USB/CD of evidence (if available).',
        sd: 'تحريري درخواست + پرنٽ ٿيل اسڪرين شاٽس + CNIC کاپي.',
        pa: 'تحریری درخواست + پرنٹ سکرین شاٹس + شناختی کارڈ کاپی۔',
        ps: 'لیکلي عریضه + چاپ شوي سکرین شاټونه + د تذکرې کاپي.',
      },
      fee: {
        ur: '100% مفت - ایف آئی اے سائبر کرائم میں شکایت دائر کرنے کی کوئی سرکاری فیس نہیں ہے۔',
        en: '100% Free - Filing a cybercrime complaint with FIA carries zero fees.',
        sd: '100% مفت - سائبر ڪرائيم ۾ شڪايت جي ڪائي فيس ناهي.',
        pa: '100% مفت - ایف آئی اے وِچ شکایت دی کوئی فیس نہیں اے۔',
        ps: '۱۰۰٪ وړیا - په ایف آئی اې سایبر برخه کې عریضه ورکول بې له سرکاري لګښته ده.',
      },
    },
    afterFilingProcess: {
      receipt: {
        ur: 'آن لائن پورٹل یا سینٹر سے ایف آئی اے کا آفیشل "ٹریکنگ ریفرنس نمبر" حاصل کریں۔',
        en: 'Obtain an official FIA Complaint Tracking Reference Number.',
        sd: 'ايف آئي اي جو ٽريڪنگ نمبر حاصل ڪريو.',
        pa: 'ایف آئی اے دا ٹریکنگ نمبر حاصل کرو۔',
        ps: 'د ایف آئی اې عریضې رسمي تعقیبي لېنک او نمبر راباسي.',
      },
      notice: {
        ur: 'ایف آئی اے کا سائبر کرائم ونگ ملزم کو 7 سے 14 دن کے اندر پیشی کا نوٹس بھیجتا ہے اور انکوائری شروع کرتا ہے۔',
        en: 'The FIA Cybercrime Wing summons the suspect/perpetrator to appear for inquiry within 7-14 days.',
        sd: 'ايف آئي اي 7 ڏينهن ۾ ملزم کي نوٽيس جاري ڪندي.',
        pa: 'ایف آئی اے 7 دناں وِچ ملزم نوں پیشی دا نوٹس بھیجے گی۔',
        ps: 'د ایف آئی اې ډله تورن کس ته د ادعا پر مهال په ۷-۱۴ ورځو کې بليک ليک لېږي.',
      },
      timeline: {
        ur: 'ابتدائی انکوائری 30 دن میں مکمل کی جاتی ہے۔ ہراسانی کے مواد کو پی ٹی اے کے ذریعے فوری (24-48 گھنٹے) میں بلاک کروایا جاتا ہے۔',
        en: 'Preliminary inquiry completes within 30 days. Objectionable content is blocked via PTA within 24-48 hours.',
        sd: 'مواد پي ٽي اي ذريعي 48 ڪلاڪن ۾ بلاڪ ڪرايو ويندو آهي.',
        pa: 'مواد PTA توں 48 گھنٹیاں وِچ بلاک کروا دتا جاندا اے۔',
        ps: 'انټرنیټي بد مواد د پی ټي اې له لارې په ۴۸ ساعتونو کې له اېستلو وتل کېږي.',
      },
      helpline: {
        ur: 'ایف آئی اے سائبر کرائم ہیلپ لائن: 1991 / واٹس ایپ: 0336-6019911 / ویب سائٹ: complaint.fia.gov.pk',
        en: 'FIA Cybercrime Helpline: 1991 / WhatsApp Support: 0336-6019911 / Website: complaint.fia.gov.pk',
        sd: 'سائبر هيڊلائن: 1991 / واٽس ايپ: 0336-6019911.',
        pa: 'سائبر ہیلپ لائن: 1991 / واٹس ایپ: 0336-6019911۔',
        ps: 'سایبر ټیلیفون: ۱۹۹۱ / واټساپ: ۰۳۳۶-۶۰۱۹۹۱۱.',
      },
    },
  },
  rent_controller: {
    authorityId: 'rent_controller',
    lawsHeading: {
      ur: 'صوبائی رینٹڈ پریمسز ایکٹ کی شقیں (PROVINCIAL RENT LAWS)',
      en: 'PROVINCIAL RENTED PREMISES ACTS & RENT LAWS',
      sd: 'صوبائي رينٽيڊ پريميئسز ايڪٽ جون شقون',
      pa: 'پنجاب/سندھ رینٹڈ پریمسز ایکٹ دی شقاں',
      ps: 'د کورونو او دفترونو کرایې تنظیمولو قانون',
    },
    filingHeading: {
      ur: 'رینٹ کنٹرولر عدالت میں کیس جمع کروانا (RENT PETITION PROCEDURE)',
      en: 'FILING PETITION BEFORE CIVIL JUDGE / RENT CONTROLLER',
      sd: 'رينٽ ڪنٽرولر ڪورٽ ۾ ڪيس جو طريقو',
      pa: 'رینٹ کنٹرولر کورٹ وِچ کیس جمع کروان دا طریقہ',
      ps: 'په رینټ کنټرولر محکمه کې د ادعا کولو پړاوونه',
    },
    afterFilingHeading: {
      ur: 'عدالتی سمن، جواب دعویٰ اور فیصلے کی مدت (SUMMONS & TRIAL TIMELINE)',
      en: 'SUMMONS, LEAVE TO CONTEST & SUMMARY TRIAL TIMELINE',
      sd: 'عدالتي نوٽيس ۽ فيصلي جي مدت',
      pa: 'عدالتی سمن تے فیصلے دی قانونی مدت',
      ps: 'د قاضي لخوا احضارول او د پرېکړې موده',
    },
    citedLaws: [
      {
        actTitle: 'Punjab Rented Premises Act 2009 / Sindh Rented Premises Ordinance 1979 / ICT Ordinance 2001',
        sectionNo: 'Section 11, 15, 19 & Section 10',
        description: {
          ur: 'سیکشن 11/15: کرایہ کی عدم ادائیگی، معاہدہ کی خلاف ورزی، یا ذاتی ضرورت پر بے دخلی کی درخواست۔ سیکشن 19: سیکیورٹی ڈپازٹ کی واپسی اور بقایا کرایہ کی وصولی کا دعویٰ۔',
          en: 'Section 11/15 provides grounds for eviction due to rent default or personal requirement. Section 19 provides for eviction orders and recovery of arrears/deposit.',
          sd: 'سيڪشن 11/15: ڪرايو نه ڏيڻ يا ذاتي ضرورت تي ملڪيت خالي ڪرائڻ جي درخواست. سيڪشن 19: سيڪيورٽي ڊپازٽ واپسي.',
          pa: 'سیکشن 11/15: کرایہ نہ دین یا ذاتی ضرورت تے مکان خالی کروان دا دعویٰ۔ سیکشن 19: سیکیورٹی واپسی۔',
          ps: '۱۱/۱۵ ماده: د کرایې د نه ورکړې له امله د کور خالي کولو عریضه. ۱۹ ماده: د امانت تادیه کول.',
        },
      },
    ],
    filingInfo: {
      office: {
        ur: 'ڈسٹرکٹ جوڈیشل کمپلیکس میں قائم رینٹ کنٹرولر (سینئر سول جج) کی عدالت کا سائننگ ڈیسک / رجسٹرار آفیس۔',
        en: 'Office of the Rent Controller (Senior Civil Judge Court) at the District Judicial Complex.',
        sd: 'ضلعي جوڊيشل ڪمپليڪس ۾ رينٽ ڪنٽرولر (سول جج) جي ڪورٽ ۾.',
        pa: 'ضلعی جوڈیشل کمپلیکس وِچ رینٹ کنٹرولر (سول جج) دی عدالت وِچ۔',
        ps: 'د قضایي نوي بلاک په ساحه کې د سول قاضي (رینټ کنټرولر) دفتر.',
      },
      prerequisite: {
        ur: 'رجسٹرڈ/نوٹرائزڈ کرایہ نامہ کی کاپی اور کیس دائر کرنے سے پہلے 14 تا 30 دن کا تحریری قانونی نوٹس (لیگل نوٹس)۔',
        en: 'Copy of registered Tenancy Agreement and a mandatory 14-30 days prior written Legal Notice to the tenant/landlord.',
        sd: 'ڪرايه نامي جي ڪاپي ۽ 14 کان 30 ڏينهن جو ليگل نوٽيس.',
        pa: 'کرایہ نامہ دی کاپی تے 14 توں 30 دن دا قانونی نوٹس۔',
        ps: 'د رسمي کرایې تړون کاپي او د ۱۴-۳۰ ورځو دمخه لیکلی خبرداری.',
      },
      copiesAndDocs: {
        ur: 'اصلی رینٹ پٹیشن + 2 فوٹو کاپی سیٹ (فریق ثانی کو تعمیل کے لیے) + کرایہ نامہ کاپی + شناختی کارڈ کاپی + 100 روپے سٹیمپ کاغذ حلف نامہ۔',
        en: 'Original Rent Petition + 2 Copy Sets for Notice Service + Tenancy Agreement + CNIC Copy + Affidavit on Rs. 100 Stamp Paper.',
        sd: 'اصل درخواست + 2 کاپيون + ڪرايه نامو + CNIC کاپي + حلف نامو.',
        pa: 'اصلی درخواست + 2 کاپیاں + کرایہ نامہ + شناختی کارڈ + حلف نامہ۔',
        ps: 'اصلي رینټ پټیشن + ۲ فوټوکاپۍ + کرایه لیک + تذکره + سل کلن سټامپ.',
      },
      fee: {
        ur: 'معمولی کورٹ فیس - 15 روپے سے 100 روپے تک کے معمولی کورٹ فیس سٹیمپ درخواست پر لگائے جاتے ہیں۔',
        en: 'Nominal Court Fee - Court fee stamps worth Rs. 15 to Rs. 100 applied on the petition.',
        sd: 'معمولي ڪورٽ فيس - 15 کان 100 رپين جو اسٽامپ.',
        pa: 'معمولی کورٹ فیس - 15 توں 100 روپے دا سٹیمپ۔',
        ps: 'ناچیز عدلي فیس - د ۱۵ تر ۱۰۰ روپیو سټامپ لګول کېږي.',
      },
    },
    afterFilingProcess: {
      receipt: {
        ur: 'سول کورٹ کے فائلنگ برانچ سے کیس نمبر (Rent Case Number) کی رسید حاصل کریں۔',
        en: 'Obtain a Case Registration Slip containing the official Rent Case Number.',
        sd: 'ڪورٽ جي فائلنگ برانچ مان ڪيس نمبر وٺو.',
        pa: 'سول کورٹ توں کیس نمبر دی رسید لو۔',
        ps: 'له عدلي څانګې د دوسیې ثبت ګڼه ثبت کړئ.',
      },
      notice: {
        ur: 'رینٹ کنٹرولر فریق ثانی کو 10 دن کے اندر عدالت میں پیش ہو کر "اجازتِ دفاع" (Leave to Contest) جمع کروانے کا سمن جاری کرتا ہے۔',
        en: 'The Rent Controller issues summons directing the respondent to file a Leave to Contest within 10 days.',
        sd: 'جج ٻئي ڌُر کي 10 ڏينهن ۾ جواب لاءِ سمن جاري ڪندو.',
        pa: 'جج فریق ثانی نوں 10 دناں وِچ جواب لئی سمن بھیجے گا۔',
        ps: 'قاضي صاحب مقابل لوري ته په ۱۰ ورځو کې د دفاع د اجازې وړاندې کولو احضار لېږي.',
      },
      timeline: {
        ur: 'رینٹ ایکٹ کے تحت مختصر عدالتی کارروائی (Summary Trial) کا فیصلہ 4 سے 6 ماہ میں ہونا قانونی طور پر لازمی ہے۔',
        en: 'By statutory law, summary rent proceedings are mandated to be concluded within 4 to 6 months.',
        sd: 'مختصر عدالتي ڪارروائي جو فيصلو 4 کان 6 مهينن ۾ ٿيندو.',
        pa: 'کارروائی دا فیصلہ 4 توں 6 مہینے وِچ ہونا لازمی اے۔',
        ps: 'د غوښتنلیک قانوني مختصر بهیر د ۴ تر ۶ میاشتو پای ته رسیږي.',
      },
      helpline: {
        ur: 'ضلعی بار لیگل ایڈ کمیٹی / قانونی امداد ہیلپ لائن 1099۔',
        en: 'District Bar Legal Aid Committee / Free Legal Aid Helpline 1099.',
        sd: 'ضلعي بار ليگل ايڊ ڪميٽي / 1099.',
        pa: 'ضلعی بار لیگل ایڈ کمیٹی / 1099۔',
        ps: 'د وکیلانو د وکالت مرستندویه ټیم / ۱۰۹۹.',
      },
    },
  },
  family_court: {
    authorityId: 'family_court',
    lawsHeading: {
      ur: 'مسلم فیملی لاؤز آرڈیننس 1961 و فیملی کورٹس ایکٹ 1964',
      en: 'FAMILY COURTS ACT 1964 & MUSLIM FAMILY LAWS ORDINANCE 1961',
      sd: 'فيملي ڪورٽس ايڪٽ 1964 ۽ مسلم فيملي لاز 1961',
      pa: 'فیملی کورٹس ایکٹ 1964 تے مسلم فیملی لاز 1961',
      ps: 'د کورنیو محاکمو د ۱۹۶۴ او مسلِم فیملي لاز قوانین',
    },
    filingHeading: {
      ur: 'فیملی کورٹ میں خلع، نفقہ و جہیز کا دعویٰ دائر کرنا (FAMILY PLAINT PROCEDURE)',
      en: 'FILING FAMILY PLAINT FOR KHULA, MAINTENANCE & DOWRY',
      sd: 'فيملي ڪورٽ ۾ دعويٰ داخل ڪرڻ جو طريقو',
      pa: 'فیملی کورٹ وِچ خلع تے خرچے دا کیس پانا',
      ps: 'د کورنۍ محکمې د خلع او نفقې عریضې بڼه',
    },
    afterFilingHeading: {
      ur: 'قبل از سماعت مصالحت اور ماہانہ خرچہ کا حکم (CONCILIATION & INTERIM ORDERS)',
      en: 'MANDATORY RECONCILIATION & INTERIM MAINTENANCE DECREE',
      sd: 'مصالحت ۽ مهينوار خرچي جو عدالتي حڪم',
      pa: 'قبل از سماعت صلح دی کوشش تے ماہانہ خرچہ دا حکم',
      ps: 'له اورېدنې دمخه روغه او د لومړني خرچې امر',
    },
    citedLaws: [
      {
        actTitle: 'Family Courts Act 1964 & Muslim Family Laws Ordinance 1961',
        sectionNo: 'Section 5, 9, 10 & Schedule',
        description: {
          ur: 'سیکشن 5: فیملی کورٹ کو خلع، نفقہ، بچوں کی حضانت اور سامان جہیز کی بازیافت کا مکمل اختیار۔ سیکشن 9: کیس کے دوران بچوں کا فوری ماہانہ خرچہ مقرر کرنا۔ سیکشن 10: لازمی قبل از سماعت مصالحتی اجلاس۔',
          en: 'Section 5 grants exclusive jurisdiction for Khula, maintenance, custody, and dowry. Section 9 empowers immediate interim maintenance for minor children. Section 10 mandates pre-trial conciliation.',
          sd: 'سيڪشن 5: خلع، خرچي، ٻارن جي پروري ۽ ڏيج جو فيصلي جو اختيار. سيڪشن 9: ٻارن جو فوراً مهينوار خرچو مقرر ڪرڻ.',
          pa: 'سیکشن 5: خلع، خرچہ، بچیاں دی پرورش تے جہیز کیس۔ سیکشن 9: بچیاں دا فوری ماہانہ خرچہ۔',
          ps: '۵ ماده: د کورنۍ محکمې خلع، نفقې او د ماشومانو ساتنې اختیار. ۹ ماده: بیړنی میاشتنی لګښت.',
        },
      },
    ],
    filingInfo: {
      office: {
        ur: 'خاتون کی رہائش گاہ کے ضلع میں واقع ضلعی فیملی عدالت (سینئر فیملی جج / فیملی کورٹ) کا دائرہ کار۔',
        en: 'District Family Court (Senior Family Judge) located in the district of the wife’s residence.',
        sd: 'عورت جي رهايش واري ضلعي جي فيملي ڪورٽ ۾.',
        pa: 'خاتون دے رہائشی ضلعے دی فیملی کورٹ وِچ۔',
        ps: 'د مېرمنې د استوګنې د سیمې کورنۍ محکمه.',
      },
      prerequisite: {
        ur: 'تصدیق شدہ نکاح نامہ کی کاپی (یا نہ ہونے کا حلف نامہ)، سامان جہیز کی تفصیلی فہرست، اور بچوں کے برتھ سرٹیفکیٹ۔',
        en: 'Certified Nikahnama copy (or affidavit of non-availability), itemized dowry list with values, and children’s NADRA Birth Certificates.',
        sd: 'نڪاح نامي جي ڪاپي، ڏيج سامان جي لسٽ ۽ ٻارن جا برٿ سرٽيفڪيٽ.',
        pa: 'نکاح نامہ کاپی، سامان جہیز دی فہرست تے بچیاں دے برتھ سرٹیفکیٹ۔',
        ps: 'د نکاح لیک کاپي، د جهېز توکو لېسټ او د ماشومانو زیږون پاڼې.',
      },
      copiesAndDocs: {
        ur: 'اصلی دعویٰ فیملی کورٹ + 2 اضافی سیٹ (شوہر کو بذریعہ ڈاک بھیجنے کیلیے) + نکاح نامہ + شناختی کارڈ + فہرست گواہان + 15 روپے کورٹ فیس۔',
        en: 'Original Family Plaint + 2 Copy Sets for service on Husband + Nikahnama Copy + CNIC Copy + List of Witnesses + Rs. 15 Court Fee.',
        sd: 'اصل دعويٰ + 2 کاپيون + نڪاح نامو + CNIC کاپي + 15 رپيا اسٽامپ.',
        pa: 'اصلی دعویٰ + 2 کاپیاں + نکاح نامہ + شناختی کارڈ + 15 روپے کورٹ فیس۔',
        ps: 'اصلي کورنۍ دعوا + ۲ کاپۍ + نکاح پاڼه + تذکره + ۱۵ روپۍ فیس.',
      },
      fee: {
        ur: 'معمولی فیس - محض 15 روپے کا معمولی کورٹ فیس سٹیمپ دعویٰ کی پہلی کاپی پر چسپاں کیا جاتا ہے۔',
        en: 'Nominal Court Fee - Court fee stamp worth just Rs. 15 pasted on the Plaint.',
        sd: 'معمولي فيس - صرف 15 رپين جو ڪورٽ فيس اسٽامپ.',
        pa: 'معمولی فیس - صرف 15 روپے دا کورٹ فیس سٹیمپ۔',
        ps: 'ناچیز فیس - يوازې د ۱۵ روپیو قضایي سټامپ لګول کېږي.',
      },
    },
    afterFilingProcess: {
      receipt: {
        ur: 'فیملی کورٹ کے فائلنگ رجسٹرار سے فیملی سوٹ نمبر (Family Suit Number) اور جج صاحب کے کورٹ روم کا پتہ لیں۔',
        en: 'Obtain an official Family Suit Registration Number and assigned Family Judge Courtroom number.',
        sd: 'فيملي ڪورٽ مان سوٽ نمبر حاصل ڪريو.',
        pa: 'فیملی کورٹ توں سوٹ نمبر حاصل کرو۔',
        ps: 'د کورنۍ محکمې له راجستر څانګې د قضیې رسمي شمیره واخلئ.',
      },
      notice: {
        ur: 'فیملی جج شوہر کو 15 سے 30 دن کے اندر عدالت میں حاضر ہو کر جواب دعویٰ دینے اور قبل از سماعت مصالحت کا سمن جاری کرتا ہے۔',
        en: 'The Family Judge issues summons to the husband to submit a written statement and appear for pre-trial reconciliation within 15-30 days.',
        sd: 'جج مڙس کي 15 کان 30 ڏينهن ۾ جواب لاءِ نوٽيس ۽ مصالحت لاءِ سمن ڏيندو.',
        pa: 'جج خاوند نوں 15 توں 30 دناں وِچ صلح لئی نوٹس بھیجے گا۔',
        ps: 'قاضي صاحب خاوند ته په ۱۵-۳۰ ورځو کې د ځواب ویلو او اصلاح لیدنې سمن لېږي.',
      },
      timeline: {
        ur: 'قبل از سماعت مصالحت میں ناکامی پر عدالت خلع کا حکم جاری کرتی ہے۔ بچوں کا ماہانہ نفقہ کیس کے پہلے مہینے میں ہی عبوری طور پر جاری کر دیا جاتا ہے۔ حتمی فیصلہ 6 ماہ میں ہوتا ہے۔',
        en: 'If reconciliation fails, Khula decree is granted. Interim child maintenance is ordered immediately. Entire trial concludes within 6 months.',
        sd: 'مصالحت ناڪام ٿيڻ تي خلع جي ڊگري جاري ٿيندي ۽ 6 مهينن ۾ حتمي فيصلو ٿيندو.',
        pa: 'صلح نہ ہون تے خلع دی ڈگری ملدی اے تے 6 مہینے وِچ حتمی فیصلہ ہوندا اے۔',
        ps: 'که روغه ونشوه، د خلع پرېکړه کېږي او میاشتنۍ نفقې لومړنی امر صادرېږي.',
      },
      helpline: {
        ur: 'وزارتِ انسانی حقوق ہیلپ لائن 1099 / ڈسٹرکٹ لیگل ایڈ سیل۔',
        en: 'Ministry of Human Rights Free Legal Aid Helpline 1099 / District Legal Aid Cell.',
        sd: 'انساني حقن جي وزارت هيڊلائن 1099 / ليگل ايڊ.',
        pa: 'وزارت انسانی حقوق ہیلپ لائن 1099 / لیگل ایڈ۔',
        ps: 'د بشري حقونو د وزارت لخوا وړیا زنګ: ۱۰۹۹.',
      },
    },
  },
};

const CITIES_LIST = [
  'اسلام آباد (Islamabad)',
  'لاہور (Lahore)',
  'کراچی (Karachi)',
  'راولپنڈی (Rawalpindi)',
  'پشاور (Peshawar)',
  'کوئٹہ (Quetta)',
  'ملتان (Multan)',
  'فیصل آباد (Faisalabad)',
  'حیدرآباد (Hyderabad)',
  'سکھر (Sukkur)',
  'گوجرانوالہ (Gujranwala)',
  'سیالکوٹ (Sialkot)',
  'لارکانا (Larkana)',
  'ایبٹ آباد (Abbottabad)',
  'مردان (Mardan)',
  'بہاولپور (Bahawalpur)',
  'سرگودھا (Sargodha)',
];

export const ComplaintDrafter: React.FC<ComplaintDrafterProps> = ({
  currentLang,
  currentProvince,
  onSaveDraft,
}) => {
  // Wizard Active Step (1: Forum Selection, 2: Details & Evidence, 3: Legal Draft & Guidance)
  const [activeStep, setActiveStep] = useState<number>(1);

  // Selected Authority/Complaint Type ID
  const [selectedAuthorityId, setSelectedAuthorityId] = useState<string>('consumer_court');

  // Mode: AI Smart Draft vs Offline Standard Template
  const [draftingEngine, setDraftingEngine] = useState<'ai' | 'standard'>('ai');

  // Letter Language for Output Preview
  const [letterLang, setLetterLang] = useState<LanguageCode>(currentLang);

  // Today's date string in YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  // Explicit Form Fields State
  const [applicantName, setApplicantName] = useState<string>('');
  const [cnicNumber, setCnicNumber] = useState<string>('');
  const [postalAddress, setPostalAddress] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [oppositeParty, setOppositeParty] = useState<string>('');
  const [incidentDate, setIncidentDate] = useState<string>(todayStr);
  const [cityJurisdiction, setCityJurisdiction] = useState<string>('اسلام آباد (Islamabad)');
  const [claimAmount, setClaimAmount] = useState<string>('');

  // Checkboxes for Evidence
  const [evidenceReceipt, setEvidenceReceipt] = useState<boolean>(false);
  const [evidenceContract, setEvidenceContract] = useState<boolean>(false);
  const [evidenceNotice, setEvidenceNotice] = useState<boolean>(false);
  const [evidenceScreenshots, setEvidenceScreenshots] = useState<boolean>(false);
  const [evidenceWitnesses, setEvidenceWitnesses] = useState<boolean>(false);

  // Detailed Incident Textarea
  const [incidentDetails, setIncidentDetails] = useState<string>('');

  // Speech Recognition for Incident Details
  const {
    isListening,
    isSupported,
    errorMessage: speechError,
    startListening,
    stopListening,
  } = useSpeechToText({
    lang: currentLang,
    onTranscriptChange: (text) => {
      setIncidentDetails(text);
    },
  });

  // Custom Recipient Override
  const selectedAuth = AUTHORITY_TYPES.find((a) => a.id === selectedAuthorityId) || AUTHORITY_TYPES[0];
  const [customRecipient, setCustomRecipient] = useState<string>(
    selectedAuth.recipientDefault[letterLang] || selectedAuth.recipientDefault.ur
  );

  // Manual Edit Mode State
  const [isManualEdit, setIsManualEdit] = useState<boolean>(false);
  const [manualText, setManualText] = useState<string>('');

  // AI Generation State
  const [isAiGenerating, setIsAiGenerating] = useState<boolean>(false);

  // Stat Guide Tab
  const [guideTab, setGuideTab] = useState<'laws' | 'filing' | 'timeline'>('laws');

  const [copied, setCopied] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const isRtl = letterLang !== 'en';

  useEffect(() => {
    setLetterLang(currentLang);
  }, [currentLang]);

  useEffect(() => {
    const found = AUTHORITY_TYPES.find((a) => a.id === selectedAuthorityId) || AUTHORITY_TYPES[0];
    setCustomRecipient(found.recipientDefault[letterLang] || found.recipientDefault.ur);
  }, [selectedAuthorityId, letterLang]);

  // Construct Assembled Legal Letter Offline
  const generateAssembledLetter = (): string => {
    const auth = AUTHORITY_TYPES.find((a) => a.id === selectedAuthorityId) || AUTHORITY_TYPES[0];
    const rec = customRecipient || auth.recipientDefault[letterLang] || auth.recipientDefault.ur;
    const law = auth.lawReference[letterLang] || auth.lawReference.ur;

    const evidences: string[] = [];
    if (evidenceReceipt)
      evidences.push(
        letterLang === 'en'
          ? 'Purchase Receipt / Payment Cash Memo'
          : 'اصل خریداری کی رسید / نقد بِل (Purchase Bill)'
      );
    if (evidenceContract)
      evidences.push(
        letterLang === 'en'
          ? 'Written Contract / Terms Document'
          : 'تحریری معاہدہ / اقرار نامہ (Written Agreement)'
      );
    if (evidenceNotice)
      evidences.push(
        letterLang === 'en'
          ? 'Prior Legal Notice Sent'
          : 'پہلے موصولہ یا بھیجا گیا قانونی نوٹس (Legal Notice Copy)'
      );
    if (evidenceScreenshots)
      evidences.push(
        letterLang === 'en'
          ? 'Digital Chat Screenshots & Emails'
          : 'چَیٹ اسکرین شاٹس، واٹس ایپ ریکارڈ و ای میلز'
      );
    if (evidenceWitnesses)
      evidences.push(
        letterLang === 'en' ? 'Witness Statements' : 'شاہدین کے بیانات و حلفیہ اقرار'
      );

    if (letterLang === 'en') {
      return `BEFORE THE HONOURABLE ${rec.toUpperCase()}
AT ${cityJurisdiction.toUpperCase()}

${(applicantName || '[NAME OF COMPLAINANT / APPLICANT]').toUpperCase()}
S/o, D/o, W/o: ____________________________________
Resident of: ${postalAddress || '[POSTAL ADDRESS OF COMPLAINANT]'}
CNIC No: ${cnicNumber || '[CNIC NUMBER]'} | Contact No: ${mobileNumber || '[MOBILE NUMBER]'}
                                                      ... COMPLAINANT / APPLICANT

                                VERSUS

${(oppositeParty || '[NAME OF OPPOSITE PARTY / RESPONDENT]').toUpperCase()}
Address / Location: ${cityJurisdiction.toUpperCase()}
                                                      ... RESPONDENT / OPPOSITE PARTY

COMPLAINT / APPLICATION UNDER RELEVANT STATUTORY PROVISIONS OF ${law.toUpperCase()} FOR REDRESSAL OF GRIEVANCES, RECOVERY OF FINANCIAL CLAIM, AND STATUTORY RELIEF.

RESPECTFULLY SHEWETH:

1. That the Complainant is a law-abiding citizen of Pakistan, residing at the given address, and falls squarely within the territorial and legal jurisdiction of this Honorable Forum.

2. That the Respondent named above is an entity / person operating within the jurisdiction of this Honorable Forum and is legally bound to adhere to statutory duties, contractual terms, and public laws.

3. That the concise facts giving rise to the instant complaint are that on or around ${incidentDate}, the following cause of action / breach occurred:
   "${incidentDetails || '[Detailed statement of facts, timeline of events, transaction details, and grievance]'}"

4. That owing to the wrongful act, omission, gross negligence, and illegal refusal of the Respondent, the Complainant has suffered severe financial damage, hardship, and acute mental agony.

5. That the total financial claim / compensation accrued in favor of the Complainant and against the Respondent stands at PKR ${claimAmount ? `${claimAmount}/-` : 'N/A (subject to assessment & statutory compensation)'}.

6. That the acts and omissions of the Respondent constitute a direct violation of statutory provisions under ${law}, thereby attracting penal, administrative, and compensatory liabilities.

7. That the cause of action accrued on ${incidentDate} when the grievance arose and is continuing day-to-day due to the Respondent's persistent failure to resolve the matter.

8. That no other complaint, suit, or legal proceeding on the same subject matter between the same parties is pending or has been decided by any other competent court or legal forum.

9. DOCUMENTARY EVIDENCE & ENCLOSURES ATTACHED:
${evidences.length > 0 ? evidences.map((e, i) => `   (${i + 1}) Copy of ${e}`).join('\n') : '   (1) Copy of CNIC of Complainant\n   (2) Relevant Receipts & Written Evidence'}

PRAYER / RELIEF SOUGHT:
In light of the facts and legal submissions made hereinabove, it is most respectfully prayed that this Honorable Forum may kindly be pleased to:
   a) Summon the Respondent and direct them to submit a formal written reply to this complaint;
   b) Direct the Respondent to immediately pay / refund PKR ${claimAmount ? `${claimAmount}/-` : '[CLAIM AMOUNT]'} to the Complainant towards actual financial loss and damages for mental distress;
   c) Initiate appropriate statutory action against the Respondent as provided under ${law};
   d) Pass any other order or grant any relief that this Honorable Forum deems fit, just, and equitable in the circumstances of the case.

                                                      COMPLAINANT / APPLICANT
                                                      Through Counsel / In Person

                                                      ____________________________
                                                      Signature: ${applicantName || '________________'}
                                                      Dated: ${todayStr}

VERIFICATION:
Verified on Oath at ${cityJurisdiction} on this ${todayStr} that the contents of Paragraphs 1 to 8 above are true and correct to the best of my knowledge, information, and belief, and nothing material has been concealed therefrom.

                                                      ____________________________
                                                      DEPONENT / COMPLAINANT`;
    }

    // Urdu & Regional Languages Formal Lawyer Petition Draft Format
    return `قبل از جناب ${rec} صاحب
مقام / عدالتی دائرہ کار: ${cityJurisdiction}

${applicantName || '[نام سائل / درخواست گزار]'} ولد/زوجہ/دختر ____________________
سکونت: ${postalAddress || '[مکمل پتہ سائل]'}
شناختی کارڈ نمبر: ${cnicNumber || '[شناختی کارڈ نمبر]'} | رابطہ نمبر: ${mobileNumber || '[موبائل نمبر]'}
                                                      ............ سائل / درخواست گزار

                                  بنام

${oppositeParty || '[نام فریقِ مخالف / ادارہ / دکاندار]'}
مقام / دائرہ کار: ${cityJurisdiction}
                                                      ............ فریقِ مخالف / مدعا علیہ

عنوان: تحریری شکایت نامہ زیرِ دفعہ جات ${law} برائے داد رسی، ازالہ حرجانہ، وصولی مالی نقصان و باضابطہ قانونی کارروائی۔

جنابِ عالی!
سائل با ادب و احترام حسبِ ذیل معروضات معزز فورم کے سامنے پیش کرتا ہے:

۱۔ یہ کہ سائل پاکستان کا پرامن و قانون پسند شہری ہے اور مذکوره پتہ کا مستقل رہائشی ہے، نیز سائل کا یہ مقدمہ اس معزز فورم کے قانونی و علاقائی دائرہ اختیار میں آتا ہے۔

۲۔ یہ کہ مخالف فریق مذکورہ مقام پر کاروبار/فرائض سرانجام دے رہا ہے اور قوانینِ مملکت کے تحت سائل کے قانونی و آئینی حقوق کی پاسداری کرنے کا پابند ہے۔

۳۔ یہ کہ واقعہ کے مختصر حقائق یوں ہیں کہ بتاریخ ${incidentDate}، ${incidentDetails || '[واقعات کا مفصل پس منظر، خریداری/معاہدے کی تفصیل اور شکایت یہاں درج کریں]'}۔

۴۔ یہ کہ مخالف فریق کے اس غیر قانونی اقدام، غفلت اور بدنیتی کی وجہ سے سائل کو شدید مالی نقصان، پریشانی اور مسلسل ذہنی اذیت کا سامنا کرنا پڑ رہا ہے۔

۵۔ یہ کہ سائل کا مخالف فریق کے خلاف مالی دعویٰ و حرجانہ کی رقم ${claimAmount ? `${claimAmount} روپے` : 'حسبِ ضوابط و تخمینہ'} بنتی ہے۔

۶۔ یہ کہ مخالف فریق کا یہ عمل ${law} کے واضح احکامات و قوانین کی صریح خلاف ورزی ہے اور باضابطہ داد رسی و تعزیر کا تقاضا کرتا ہے۔

۷۔ یہ کہ بناء دعویٰ بتاریخ ${incidentDate} بروز وقوعہ پیدا ہوئی جو کہ مخالف فریق کی طرف سے داد رسی نہ کرنے کی بنا پر مسلسل قائم و جاری ہے، اور یہ درخواست قانوناً اندر میعاد ہے۔

۸۔ یہ کہ اس موضوع و تنازعہ سے متعلق کوئی دیگر درخواست یا مقدمہ کسی اور عدالت یا قانونی فورم میں زیرِ التواء یا فیصلہ شدہ نہیں ہے۔

۹۔ منسلک ثبوت و دستاویزات (منسلکات):
${evidences.length > 0 ? evidences.map((e, i) => `   (${i + 1}) ${e}`).join('\n') : '   (۱) نقل شناختی کارڈ سائل\n   (۲) متعلقہ تحریری ثبوت و رسوُدات'}

استدعا / داد رسی:
ان حالات میں معزز فورم سے نہایت ادب و احترام کے ساتھ استدعا ہے کہ:
الف) مخالف فریق کو طلب فرما کر باضابطہ جواب دہی کا پابند بنایا جائے؛
ب) مخالف فریق کو حکم صادر فرمایا جائے کہ وہ سائل کو رقم بلغم ${claimAmount ? `${claimAmount} روپے` : 'مطلوبہ رقم'} مع مالی و ذہنی حرجانہ فی الفور ادا کرے؛
ج) مخالف فریق کے خلاف ${law} کے تحت باضابطہ قانونی و تادیبی کارروائی فرمائی جائے؛
د) دیگر کوئی مناسب و قرینِ انصاف داد رسی جو معزز فورم مناسب سمجھے، سائل کے حق میں صادر فرمائی جائے۔

                                                      عرضے گزار (سائل):
                                                      اصالتاً / بذریعہ کونسل

                                                      ________________________
                                                      دستخط سائل: ${applicantName || '________________'}
                                                      بتاریخ: ${todayStr}

تصدیق بحلف:
حلفاً تصدیق کی جاتی ہے بمقام ${cityJurisdiction} بتاریخ ${todayStr} کہ مضمون فقرات نمبر ۱ تا ۸ میرے بہترین علم و یقین کے مطابق سچ و درست ہیں اور اس میں کوئی امر واقعہ پوشیدہ نہیں رکھا گیا ہے۔

                                                      ________________________
                                                      مصدقہ بحلف (سائل)`;
  };

  const currentAssembledText = isManualEdit ? manualText : generateAssembledLetter();

  useEffect(() => {
    if (isManualEdit && !manualText) {
      setManualText(generateAssembledLetter());
    }
  }, [
    isManualEdit,
    applicantName,
    cnicNumber,
    postalAddress,
    mobileNumber,
    oppositeParty,
    incidentDate,
    cityJurisdiction,
    claimAmount,
    incidentDetails,
    selectedAuthorityId,
    draftingEngine,
    letterLang,
  ]);

  const handleGenerateDraft = async () => {
    setActiveStep(3);

    if (draftingEngine === 'ai') {
      setIsAiGenerating(true);
      try {
        const selectedEvidences: string[] = [];
        if (evidenceReceipt) selectedEvidences.push('Purchase Receipt / Invoice');
        if (evidenceContract) selectedEvidences.push('Written Contract');
        if (evidenceNotice) selectedEvidences.push('Prior Legal Notice');
        if (evidenceScreenshots) selectedEvidences.push('Chat Screenshots / Emails');
        if (evidenceWitnesses) selectedEvidences.push('Witness Statements');

        const response = await fetch('/api/draft-complaint', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            complaintCategory: selectedAuth.title[letterLang] || selectedAuth.title.ur,
            applicantName,
            cnicNumber,
            postalAddress,
            mobileNumber,
            oppositeParty,
            incidentDate,
            cityJurisdiction,
            claimAmount,
            incidentDetails,
            evidenceList: selectedEvidences,
            lang: letterLang,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.draftText && data.draftText.trim()) {
            setManualText(data.draftText.trim());
            setIsManualEdit(true);
          } else {
            setManualText(generateAssembledLetter());
          }
        } else {
          setManualText(generateAssembledLetter());
        }
      } catch (err) {
        console.warn('AI generate complaint error, fallback to offline template:', err);
        setManualText(generateAssembledLetter());
      } finally {
        setIsAiGenerating(false);
      }
    } else {
      setManualText(generateAssembledLetter());
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentAssembledText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    printLegalDocument({
      title: 'پاکستان قانونی امداد پورٹل - باضابطہ قانونی شکایت نامہ',
      subtitle:
        selectedAuth?.title?.[letterLang] || selectedAuth?.title?.ur || 'Official Legal Complaint / Application',
      content: currentAssembledText,
      applicantName,
      cnicNumber,
      mobileNumber,
      cityJurisdiction,
      incidentDate,
      lang: letterLang,
    });
  };

  const handleDownloadPDF = () => {
    exportComplaintPDF(
      currentAssembledText,
      selectedAuth.title[letterLang] || selectedAuth.title.ur,
      applicantName || 'Complainant',
      letterLang,
      'complaint-pdf-export-box'
    );
  };

  const handleDownloadWord = () => {
    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Legal Complaint</title>
        <style>
          body { font-family: 'Jameel Noori Nastaleeq', 'Arial', sans-serif; font-size: 14pt; line-height: 1.8; direction: ${
            isRtl ? 'rtl' : 'ltr'
          }; text-align: ${isRtl ? 'right' : 'left'}; padding: 40px; }
          .header { font-weight: bold; font-size: 16pt; margin-bottom: 20px; }
          .content { white-space: pre-wrap; }
        </style>
      </head>
      <body>
        <div class='header'>${selectedAuth.title[letterLang] || selectedAuth.title.ur}</div>
        <div class='content'>${currentAssembledText.replace(/\n/g, '<br/>')}</div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', htmlContent], {
      type: 'application/msword;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Complaint_Draft_${selectedAuthorityId}_${letterLang}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSave = () => {
    const draft: SavedComplaintDraft = {
      id: `draft_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      title: `${selectedAuth.title[letterLang] || selectedAuth.title.ur} (${applicantName || 'Draft'})`,
      language: letterLang,
      province: currentProvince,
      complaintTypeId: selectedAuthorityId,
      answers: {
        applicantName,
        cnicNumber,
        postalAddress,
        mobileNumber,
        oppositeParty,
        incidentDate,
        cityJurisdiction,
        claimAmount,
        incidentDetails,
      },
      fullLetterText: currentAssembledText,
    };
    onSaveDraft(draft);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleResetForm = () => {
    setApplicantName('');
    setCnicNumber('');
    setPostalAddress('');
    setMobileNumber('');
    setOppositeParty('');
    setIncidentDate(todayStr);
    setCityJurisdiction('اسلام آباد (Islamabad)');
    setClaimAmount('');
    setEvidenceReceipt(false);
    setEvidenceContract(false);
    setEvidenceNotice(false);
    setEvidenceScreenshots(false);
    setEvidenceWitnesses(false);
    setIncidentDetails('');
    setIsManualEdit(false);
    setManualText('');
    setActiveStep(1);
  };

  const handleLoadSampleData = () => {
    setApplicantName('محمد عثمان / Syed Muhammad Usman');
    setCnicNumber('61101-1234567-1');
    setPostalAddress('مکان نمبر 45، گلی 12، اسلام آباد');
    setMobileNumber('0300-1234567');
    setOppositeParty('الرحیم الیکٹرونکس مارٹ / الشافعی ٹریڈرز');
    setIncidentDate(todayStr);
    setCityJurisdiction('اسلام آباد (Islamabad)');
    setClaimAmount('50,000');
    setEvidenceReceipt(true);
    setEvidenceContract(true);
    setEvidenceNotice(false);
    setEvidenceScreenshots(true);
    setEvidenceWitnesses(false);
    setIncidentDetails(
      'مورخہ 15 جنوری 2026 کو مخالف فریق سے سامان خریدا جس میں سخت فنی خرابی پائی گئی۔ بارہا شکایت کے باوجود نہ پیسے واپس کیے گئے اور نہ ہی خرابی دور کی گئی جس سے مجھے مالی و ذہنی نقصان پہنچا۔'
    );
    setIsManualEdit(false);
  };

  const guide = COMPLAINT_SUBMISSION_GUIDES[selectedAuthorityId] || COMPLAINT_SUBMISSION_GUIDES.consumer_court;

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-1 sm:px-2">
      {/* Sleek Top Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-500/20 relative overflow-hidden no-print">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/15 border border-amber-400/30 text-amber-300 rounded-full text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>
                {letterLang === 'en'
                  ? 'Legal Aid & Complaint Drafter'
                  : letterLang === 'sd'
                  ? 'پاڪستاني قانوني شڪايت نامو'
                  : 'پاکستان قانونی امداد ڈرافٹر پورٹل'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {letterLang === 'sd'
                ? 'شكايت نامو ڊرافٽر (ڪورٽ ۽ ادارا)'
                : letterLang === 'en'
                ? 'Legal Complaint Drafter'
                : letterLang === 'ps'
                ? 'د شکایت لیک جوړوونکی'
                : 'باضابطہ شکایت نامہ و عریضہ ڈرافٹر'}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              {letterLang === 'sd'
                ? 'ڪنزيومر ڪورٽ، وفاقي محتسب، يا پوليس اسٽيشن لاءِ پيشيواراڻي شڪايت جو مسودو باآساني تيار ڪريو.'
                : letterLang === 'en'
                ? 'Draft a formal, print-ready legal petition for Consumer Court, Federal Ombudsman, Police Station (FIR), FIA, or Rent Controller in 3 easy steps.'
                : 'کنزیومر کورٹ، وفاقی محتسب، یا پولیس اسٹیشن کے لیے 3 آسان مرحلوں میں قانوناً مستند شکایت نامہ مسودہ تیار کریں۔'}
            </p>
          </div>

          {/* Quick Header Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Language Selection Switcher */}
            <div className="flex items-center gap-1.5 bg-slate-800/90 border border-slate-700 p-1.5 rounded-2xl backdrop-blur-md">
              <Globe className="w-4 h-4 text-amber-400 ml-1 shrink-0" />
              {SUPPORTED_LANGUAGES.map((langObj) => (
                <button
                  key={langObj.code}
                  type="button"
                  onClick={() => setLetterLang(langObj.code)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                    letterLang === langObj.code
                      ? 'bg-amber-500 text-black shadow-md'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {langObj.nativeName}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleLoadSampleData}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-amber-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-amber-500/40 transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{letterLang === 'en' ? 'Sample Data' : 'نمونہ ڈیٹا'}</span>
            </button>

            <button
              type="button"
              onClick={handleResetForm}
              className="px-3 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-rose-300 bg-slate-800/60 hover:bg-rose-950/40 border border-slate-700 transition flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{letterLang === 'en' ? 'Reset' : 'ری سیٹ'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3-Step Clean Wizard Navigation */}
      <div className="bg-white rounded-2xl p-2 sm:p-3 shadow-md border border-slate-200 no-print">
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setActiveStep(1)}
            className={`p-3 rounded-xl transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-start ${
              activeStep === 1
                ? 'bg-amber-500 text-black font-extrabold shadow-sm'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 font-bold'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center font-extrabold text-xs shrink-0 ${
                activeStep === 1 ? 'bg-black text-amber-400' : 'bg-slate-200 text-slate-700'
              }`}
            >
              1
            </div>
            <div className="space-y-0.5">
              <span className="block text-xs sm:text-sm leading-tight">
                {letterLang === 'en' ? '1. Select Legal Forum' : '۱۔ ادارہ و شعبہ کا انتخاب'}
              </span>
              <span className="block text-[10px] opacity-80 hidden md:block">
                {selectedAuth.badge} Court / Authority
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveStep(2)}
            className={`p-3 rounded-xl transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-start ${
              activeStep === 2
                ? 'bg-amber-500 text-black font-extrabold shadow-sm'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 font-bold'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center font-extrabold text-xs shrink-0 ${
                activeStep === 2 ? 'bg-black text-amber-400' : 'bg-slate-200 text-slate-700'
              }`}
            >
              2
            </div>
            <div className="space-y-0.5">
              <span className="block text-xs sm:text-sm leading-tight">
                {letterLang === 'en' ? '2. Fill Case Details' : '۲۔ واقعات و ثبوت درج کریں'}
              </span>
              <span className="block text-[10px] opacity-80 hidden md:block">
                Applicant, Incident & Evidence
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveStep(3)}
            className={`p-3 rounded-xl transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-start ${
              activeStep === 3
                ? 'bg-amber-500 text-black font-extrabold shadow-sm'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 font-bold'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center font-extrabold text-xs shrink-0 ${
                activeStep === 3 ? 'bg-black text-amber-400' : 'bg-slate-200 text-slate-700'
              }`}
            >
              3
            </div>
            <div className="space-y-0.5">
              <span className="block text-xs sm:text-sm leading-tight">
                {letterLang === 'en' ? '3. Draft & Export' : '۳۔ ڈرافٹ مع قانونی رہنمائی'}
              </span>
              <span className="block text-[10px] opacity-80 hidden md:block">
                Print, Download & Guidance
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* STEP 1: SELECT FORUM & DRAFT ENGINE */}
      {activeStep === 1 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6 no-print text-slate-900 animate-fadeIn">
          {/* Section Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-extrabold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-md inline-block mb-1">
                مرحلہ ۱: باضابطہ قانونی فورم منتخب کریں
              </span>
              <h2 className="text-xl font-extrabold text-slate-900">
                {letterLang === 'en' ? 'Select Complaint Authority / Court' : 'شکایت کا قانونی فورم / ادارہ منتخب کریں'}
              </h2>
            </div>

            {/* AI Engine Switcher */}
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200 shrink-0">
              <button
                type="button"
                onClick={() => setDraftingEngine('ai')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  draftingEngine === 'ai'
                    ? 'bg-amber-500 text-black shadow-xs font-black'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Smart Draft</span>
              </button>
              <button
                type="button"
                onClick={() => setDraftingEngine('standard')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  draftingEngine === 'standard'
                    ? 'bg-amber-500 text-black shadow-xs font-black'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Scale className="w-3.5 h-3.5 text-emerald-700" />
                <span>Offline Standard</span>
              </button>
            </div>
          </div>

          {/* Authority Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {AUTHORITY_TYPES.map((auth) => {
              const isSelected = selectedAuthorityId === auth.id;
              const IconComp = auth.icon;
              return (
                <button
                  key={auth.id}
                  type="button"
                  onClick={() => setSelectedAuthorityId(auth.id)}
                  className={`relative text-start p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-4 group ${
                    isSelected
                      ? 'bg-amber-50/70 border-amber-500 shadow-md ring-2 ring-amber-500/20'
                      : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`p-3 rounded-2xl transition-all ${
                        isSelected ? 'bg-amber-500 text-black shadow-sm' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>

                    <span
                      className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-lg border ${auth.badgeColor}`}
                    >
                      {auth.badge}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                      {auth.title[letterLang] || auth.title.ur}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {auth.subtitle[letterLang] || auth.subtitle.ur}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-700 truncate">
                      {auth.lawReference[letterLang] || auth.lawReference.ur}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-amber-600 shrink-0" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom Action Footer for Step 1 */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <span className="text-xs text-slate-500 font-medium">
              منتخب شدہ: <strong className="text-slate-900">{selectedAuth.title[letterLang] || selectedAuth.title.ur}</strong>
            </span>

            <button
              type="button"
              onClick={() => setActiveStep(2)}
              className="bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-sm px-6 py-3 rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>اگلا مرحلہ: تفاصیل درج کریں</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: FILL CASE DETAILS & EVIDENCE */}
      {activeStep === 2 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6 no-print text-slate-900 animate-fadeIn">
          {/* Section Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-extrabold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-md inline-block mb-1">
                مرحلہ ۲: سائل و مدعا علیہ کی معلومات
              </span>
              <h2 className="text-xl font-extrabold text-slate-900">
                {letterLang === 'en' ? 'Complainant & Incident Details' : 'درخواست دہندہ و واقعہ کی تفصیل درج کریں'}
              </h2>
            </div>

            <div className="text-xs text-slate-500 font-medium">
              فورم: <span className="font-bold text-slate-800">{selectedAuth.title[letterLang] || selectedAuth.title.ur}</span>
            </div>
          </div>

          {/* Form Grid */}
          <div className="space-y-6" dir={isRtl ? 'rtl' : 'ltr'}>
            {/* 1. Applicant Info Section */}
            <div className="space-y-4">
              <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <User className="w-4 h-4 text-amber-600" />
                <span>
                  {letterLang === 'sd'
                    ? 'درخواست گزار جا تفصيل'
                    : letterLang === 'en'
                    ? '1. Complainant Personal Details'
                    : '۱۔ درخواست دہندہ (سائل) کی معلومات'}
                </span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">
                    {letterLang === 'en' ? 'Full Name *' : 'نام سائل / درخواست گزار *'}
                  </label>
                  <input
                    type="text"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder={letterLang === 'en' ? 'e.g., Muhammad Ali' : 'مثلاً: محمد علی'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white shadow-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">
                    {letterLang === 'en' ? 'CNIC Number *' : 'شناختی کارڈ نمبر *'}
                  </label>
                  <input
                    type="text"
                    value={cnicNumber}
                    onChange={(e) => setCnicNumber(e.target.value)}
                    placeholder="61101-1234567-1"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white shadow-xs font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">
                    {letterLang === 'en' ? 'Mobile Contact *' : 'موبائل نمبر *'}
                  </label>
                  <input
                    type="text"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="0300-1234567"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white shadow-xs font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">
                    {letterLang === 'en' ? 'Postal Address *' : 'مکمل پتہ سائل *'}
                  </label>
                  <input
                    type="text"
                    value={postalAddress}
                    onChange={(e) => setPostalAddress(e.target.value)}
                    placeholder={letterLang === 'en' ? 'House / Street / Area' : 'مکان نمبر، گلی، شہر'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white shadow-xs"
                  />
                </div>
              </div>
            </div>

            {/* 2. Opposite Party & Jurisdiction */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <Building className="w-4 h-4 text-amber-600" />
                <span>
                  {letterLang === 'en'
                    ? '2. Respondent & Case Details'
                    : '۲۔ فریقِ مخالف (مدعا علیہ) و عدالتی دائرہ کار'}
                </span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">
                    {letterLang === 'en' ? 'Opposite Party Name *' : 'نام فریقِ مخالف / کمپنی / دکاندار *'}
                  </label>
                  <input
                    type="text"
                    value={oppositeParty}
                    onChange={(e) => setOppositeParty(e.target.value)}
                    placeholder={letterLang === 'en' ? 'Vendor / Company / Department Name' : 'دکاندار یا ادارے کا نام'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white shadow-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">
                    {letterLang === 'en' ? 'Date of Incident *' : 'واقعہ کی تاریخ *'}
                  </label>
                  <input
                    type="date"
                    value={incidentDate}
                    onChange={(e) => setIncidentDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white shadow-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">
                    {letterLang === 'en' ? 'City / Court Jurisdiction *' : 'عدالتی دائرہ کار (شہر) *'}
                  </label>
                  <select
                    value={cityJurisdiction}
                    onChange={(e) => setCityJurisdiction(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white shadow-xs cursor-pointer"
                  >
                    {CITIES_LIST.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">
                    {letterLang === 'en' ? 'Claim Amount (PKR)' : 'دعویٰ / ہرجانہ رقم (PKR)'}
                  </label>
                  <input
                    type="text"
                    value={claimAmount}
                    onChange={(e) => setClaimAmount(e.target.value)}
                    placeholder="مثلاً: 50,000"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white shadow-xs font-mono"
                  />
                </div>
              </div>
            </div>

            {/* 3. Available Evidence Pills */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <CheckSquare className="w-4 h-4 text-amber-600" />
                <span>
                  {letterLang === 'en' ? '3. Available Attachments & Proofs' : '۳۔ موجودہ ثبوت و منسلک دستاویزات'}
                </span>
              </h3>

              <div className="flex flex-wrap gap-2.5">
                {[
                  {
                    state: evidenceReceipt,
                    setState: setEvidenceReceipt,
                    label: letterLang === 'en' ? 'Purchase Receipt / Bill' : 'خریداری کی رسید / نقد بِل',
                  },
                  {
                    state: evidenceContract,
                    setState: setEvidenceContract,
                    label: letterLang === 'en' ? 'Written Contract' : 'تحریری معاہدہ / اقرار نامہ',
                  },
                  {
                    state: evidenceNotice,
                    setState: setEvidenceNotice,
                    label: letterLang === 'en' ? 'Prior Legal Notice Sent' : 'پہلے بھیجا گیا قانونی نوٹس',
                  },
                  {
                    state: evidenceScreenshots,
                    setState: setEvidenceScreenshots,
                    label: letterLang === 'en' ? 'Chat Screenshots / Emails' : 'چیٹ اسکرین شاٹس / ای میلز',
                  },
                  {
                    state: evidenceWitnesses,
                    setState: setEvidenceWitnesses,
                    label: letterLang === 'en' ? 'Witness Statements' : 'شاہدین کے بیانات / گواہی',
                  },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => item.setState(!item.state)}
                    className={`px-4 py-2 rounded-2xl text-xs font-extrabold border transition-all cursor-pointer flex items-center gap-2 ${
                      item.state
                        ? 'bg-amber-500 text-black border-amber-400 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <CheckSquare className={`w-4 h-4 ${item.state ? 'text-black' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Incident Details Textarea with Voice Dictation */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-amber-600" />
                  <span>
                    {letterLang === 'en'
                      ? '4. Write Incident Description'
                      : '۴۔ واقعہ کی مکمل تفصیل لکھیں (یا مائیک سے بولیں):'}
                  </span>
                </h3>

                <button
                  type="button"
                  onClick={() => (isListening ? stopListening() : startListening(letterLang))}
                  disabled={!isSupported}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isListening
                      ? 'bg-rose-600 text-white animate-pulse shadow-md'
                      : 'bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100'
                  }`}
                >
                  {isListening ? (
                    <>
                      <MicOff className="w-3.5 h-3.5 text-white" />
                      <span>ریکارڈنگ جاری ہے (روکیں)</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-3.5 h-3.5 text-amber-700" />
                      <span>آواز سے ریکارڈ کریں (Voice Record)</span>
                    </>
                  )}
                </button>
              </div>

              {isListening && (
                <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 flex items-center justify-between gap-3 text-rose-900 text-xs font-bold">
                  <span className="flex items-center gap-2">
                    <span className="animate-ping h-2 w-2 rounded-full bg-rose-500"></span>
                    آواز سُنی جا رہی ہے... بولنا جاری رکھیں۔
                  </span>
                  <button type="button" onClick={stopListening} className="bg-rose-600 text-white px-2 py-0.5 rounded text-[11px]">
                    بند کریں
                  </button>
                </div>
              )}

              {speechError && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-xs text-amber-900 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{speechError}</span>
                </div>
              )}

              <textarea
                value={incidentDetails}
                onChange={(e) => setIncidentDetails(e.target.value)}
                rows={5}
                placeholder={
                  letterLang === 'en'
                    ? 'Provide a clear description of the incident, facts, loss, and response from the vendor...'
                    : 'واقعہ کی مکمل تفصیل، تاریخ، خرید و فروخت کا پس منظر اور مخالف فریق کا رویہ یہاں درج کریں...'
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed focus:outline-none focus:border-amber-500 focus:bg-white shadow-inner"
              />
            </div>
          </div>

          {/* Bottom Action Footer for Step 2 */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setActiveStep(1)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-2xl transition-all cursor-pointer"
            >
              پیچھے (Back to Step 1)
            </button>

            <button
              type="button"
              onClick={handleGenerateDraft}
              className="bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-sm px-7 py-3 rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>
                {draftingEngine === 'ai'
                  ? 'شکایت نامہ ڈرافٹ تیار کریں (Generate AI Petition)'
                  : 'معیاری ڈرافٹ دیکھیں (View Standard Draft)'}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: DRAFT PREVIEW, EXPORT & STATUTORY ROADMAP */}
      {activeStep === 3 && (
        <div className="space-y-6 animate-fadeIn">
          {/* Main Container */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6 text-slate-900">
            {/* Header Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4 no-print">
              <div>
                <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-md inline-block mb-1">
                  مرحلہ ۳: باضابطہ قانونی مسودہ تیار ہے
                </span>
                <h2 className="text-xl font-extrabold text-slate-900">
                  {letterLang === 'en' ? 'Legal Complaint Draft Preview' : 'باضابطہ قانونی شکایت نامہ (پیش نظارہ)'}
                </h2>
              </div>

              {/* Toolbar Buttons */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  className="bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs px-3.5 py-2 rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadWord}
                  className="bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>MS Word</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>پرنٹ (Print)</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-3 py-2 rounded-xl border border-slate-300 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 text-slate-600" />
                  <span>{copied ? 'کاپی ہو گیا!' : 'کاپی'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Save className="w-3.5 h-3.5 text-amber-700" />
                  <span>{savedSuccess ? 'محفوظ ہو گیا!' : 'محفوظ کریں'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-3 py-2 rounded-xl border border-slate-300 transition cursor-pointer"
                >
                  ترمیم کریں (Edit Details)
                </button>
              </div>
            </div>

            {/* Editable Mode Bar */}
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200 no-print">
              <span className="flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-amber-600" />
                <span>
                  {isManualEdit ? 'مینول ایڈیٹنگ موڈ آن ہے (آپ ترمیم کر سکتے ہیں)' : 'خودکار مسودہ تیار ہے'}
                </span>
              </span>
              <button
                type="button"
                onClick={() => {
                  if (!isManualEdit) setManualText(generateAssembledLetter());
                  setIsManualEdit(!isManualEdit);
                }}
                className="text-amber-800 hover:underline cursor-pointer font-bold"
              >
                {isManualEdit ? 'خودکار موڈ میں واپس جائیں' : 'ٹیکسٹ ایڈیٹ کریں'}
              </button>
            </div>

            {/* AI Generating Loading Overlay */}
            {isAiGenerating && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center space-y-3">
                <Loader2 className="w-8 h-8 text-amber-600 animate-spin mx-auto" />
                <p className="text-sm font-extrabold text-amber-900 font-urdu">
                  Gemini AI قانونی مسودہ نگار آپ کے شکایت نامے کی عدالتی ڈرافٹنگ کر رہا ہے...
                </p>
              </div>
            )}

            {/* Printable Legal Complaint Document Box */}
            <div
              id="complaint-pdf-export-box"
              className="printable-document bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-inner"
              dir={isRtl ? 'rtl' : 'ltr'}
            >
              {isManualEdit ? (
                <textarea
                  value={manualText}
                  onChange={(e) => setManualText(e.target.value)}
                  rows={20}
                  className="w-full bg-white text-slate-900 border border-slate-300 rounded-xl p-4 text-xs sm:text-sm font-mono leading-relaxed focus:outline-none focus:border-amber-500 shadow-inner resize-y printable-text"
                />
              ) : (
                <div className="font-urdu text-sm sm:text-base text-slate-900 leading-loose whitespace-pre-wrap selection:bg-amber-200 printable-text">
                  {currentAssembledText}
                </div>
              )}
            </div>
          </div>

          {/* STATUTORY FILING ROADMAP & GUIDANCE PANEL */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-500/20 space-y-6 no-print">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-6 h-6 text-amber-400 shrink-0" />
                <div>
                  <h3 className="text-lg font-extrabold text-white">
                    {letterLang === 'en'
                      ? `Filing Information & Statutory Guide (${selectedAuth.badge})`
                      : `درخواست جمع کروانے کی قانونی رہنمائی و ضوابط (${selectedAuth.badge})`}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    {selectedAuth.lawReference[letterLang] || selectedAuth.lawReference.ur}
                  </p>
                </div>
              </div>

              {/* Sub-Tabs for Guide */}
              <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-2xl border border-slate-700 shrink-0">
                <button
                  type="button"
                  onClick={() => setGuideTab('laws')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    guideTab === 'laws' ? 'bg-amber-500 text-black shadow-xs font-black' : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  قوانین و شقیں
                </button>

                <button
                  type="button"
                  onClick={() => setGuideTab('filing')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    guideTab === 'filing' ? 'bg-amber-500 text-black shadow-xs font-black' : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  جمع کروانے کا طریقہ
                </button>

                <button
                  type="button"
                  onClick={() => setGuideTab('timeline')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    guideTab === 'timeline' ? 'bg-amber-500 text-black shadow-xs font-black' : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  ٹائم لائن و اگلے مراحل
                </button>
              </div>
            </div>

            {/* Tab 1: Cited Laws */}
            {guideTab === 'laws' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {guide.citedLaws.map((law, idx) => (
                    <div key={idx} className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-extrabold text-amber-400">{law.actTitle}</span>
                        <span className="bg-slate-900 text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-700 font-semibold shrink-0">
                          {law.sectionNo}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-urdu">
                        {law.description[letterLang] || law.description.ur}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Filing Info */}
            {guideTab === 'filing' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 animate-fadeIn">
                <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 font-bold text-amber-400">
                    <Building2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>متعلقہ دفتر / ادارہ:</span>
                  </div>
                  <p className="text-slate-300 font-urdu leading-relaxed">
                    {guide.filingInfo.office[letterLang] || guide.filingInfo.office.ur}
                  </p>
                </div>

                <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 font-bold text-amber-400">
                    <CreditCard className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>کورٹ فیس / سٹیمپ:</span>
                  </div>
                  <p className="text-emerald-400 font-bold font-urdu leading-relaxed">
                    {guide.filingInfo.fee[letterLang] || guide.filingInfo.fee.ur}
                  </p>
                </div>

                <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 font-bold text-amber-400">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>پیشگی شرائط:</span>
                  </div>
                  <p className="text-slate-300 font-urdu leading-relaxed">
                    {guide.filingInfo.prerequisite[letterLang] || guide.filingInfo.prerequisite.ur}
                  </p>
                </div>

                <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 font-bold text-amber-400">
                    <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>لازمی کاپیاں و ثبوت:</span>
                  </div>
                  <p className="text-slate-300 font-urdu leading-relaxed">
                    {guide.filingInfo.copiesAndDocs[letterLang] || guide.filingInfo.copiesAndDocs.ur}
                  </p>
                </div>
              </div>
            )}

            {/* Tab 3: Timeline & Helpline */}
            {guideTab === 'timeline' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 animate-fadeIn">
                <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 font-bold text-amber-400">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>۱۔ وصولی و ڈائری نمبر:</span>
                  </div>
                  <p className="text-slate-300 font-urdu leading-relaxed">
                    {guide.afterFilingProcess.receipt[letterLang] || guide.afterFilingProcess.receipt.ur}
                  </p>
                </div>

                <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 font-bold text-amber-400">
                    <Send className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>۲۔ فریق ثانی کو نوٹس:</span>
                  </div>
                  <p className="text-slate-300 font-urdu leading-relaxed">
                    {guide.afterFilingProcess.notice[letterLang] || guide.afterFilingProcess.notice.ur}
                  </p>
                </div>

                <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 font-bold text-amber-400">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>۳۔ فیصلے کی قانونی مدت:</span>
                  </div>
                  <p className="text-slate-200 font-bold font-urdu leading-relaxed">
                    {guide.afterFilingProcess.timeline[letterLang] || guide.afterFilingProcess.timeline.ur}
                  </p>
                </div>

                <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 font-bold text-amber-400">
                    <PhoneCall className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>۴۔ فالو اپ و ہیلپ لائن:</span>
                  </div>
                  <p className="text-slate-300 font-urdu leading-relaxed">
                    {guide.afterFilingProcess.helpline[letterLang] || guide.afterFilingProcess.helpline.ur}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
