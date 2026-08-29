import { TranslatedText, LanguageCode } from '../types';

export interface AppFaqItem {
  id: string;
  category: 'general' | 'privacy' | 'explainer' | 'drafter' | 'helplines' | 'offline';
  question: TranslatedText;
  answer: TranslatedText;
  bullets?: {
    ur: string[];
    en: string[];
    sd: string[];
    pa: string[];
    ps: string[];
  };
}

export const FAQ_CATEGORY_LABELS: Record<string, TranslatedText> = {
  all: {
    ur: 'تمام سوالات (All FAQs)',
    en: 'All Questions',
    sd: 'تمام سوال (All FAQs)',
    pa: 'سارے سوالات (All FAQs)',
    ps: ' ټولې پوښتنې (All FAQs)',
  },
  general: {
    ur: 'عمومی معلومات اور پورٹل کا استعمال',
    en: 'General Info & Usage',
    sd: 'عمومي معلومات ۽ پورٽل جو استعمال',
    pa: 'عام معلومات تے پورٹل دا استعمال',
    ps: 'عمومي معلومات او د پورټل کارول',
  },
  privacy: {
    ur: 'پرائیویسی اور ڈیٹا کی تحفظ',
    en: 'Privacy & Data Protection',
    sd: 'پرائيويسي ۽ ڊيٽا جي تحفظ',
    pa: 'پرائیویسی تے ڈیٹا دی حفاظت',
    ps: 'محرمیت او د معلوماتو خوندیتوب',
  },
  explainer: {
    ur: 'دستاویز تشریح اور اسکیننگ',
    en: 'Document Explainer & OCR',
    sd: 'دستاويز تشريح ۽ اسڪيننگ',
    pa: 'دستاویز تشریح تے سکیننگ',
    ps: 'د اسنادو تشریح او سکن کول',
  },
  drafter: {
    ur: 'درخواست نویسی اور پرنٹنگ',
    en: 'Complaint Drafter & Print',
    sd: 'درخواست نويسي ۽ پرنٽنگ',
    pa: 'درخواست نویسی تے پرنٹنگ',
    ps: 'لیکل، خوندي کول او چاپول',
  },
  helplines: {
    ur: 'ہیلپ لائنز اور ہنگامی رابطہ',
    en: 'Helplines & Emergency Assistance',
    sd: 'هيلپ لائينون ۽ هنگامي رابطو',
    pa: 'ہیلپ لائنز تے ہنگامی رابطہ',
    ps: 'مرستې کرښې او بيړنۍ اړیکې',
  },
  offline: {
    ur: 'آف لائن اور موبائل استعمال',
    en: 'Offline & Mobile Usage',
    sd: 'آف لائن ۽ موبائل استعمال',
    pa: 'آف لائن تے موبائل استعمال',
    ps: 'افلاین او مبایل کارول',
  },
};

export const APP_FAQS: AppFaqItem[] = [
  {
    id: 'faq-1',
    category: 'general',
    question: {
      ur: 'یہ پورٹل کس طرح کام کرتا ہے اور کیا یہ مکمل مفت ہے؟',
      en: 'How does the Pakistan Legal Aid Portal work, and is it completely free?',
      sd: 'هي پورٽل ڪيئن ڪم ڪري ٿو ۽ ڇا هي بغير ڪنهن فيس جي آهي؟',
      pa: 'ایہہ پورٹل کس طرہاں کم کردا اے تے کیہ ایہہ بالکل مفت اے؟',
      ps: 'دا قانوني پورټل څنګه کار کوي او ایا دا په بشپړ ډول وړیا دی؟',
    },
    answer: {
      ur: 'پاکستان قانونی امداد پورٹل پاکستان کے تمام شہریوں، مزدوروں، خواتین اور عام افراد کے لیے 100% مفت خودکار قانونی آگاہی ٹول ہے۔ اس کے ذریعے آپ پیچیدہ قانونی دستاویزات کو سادہ اردو/علاقائی زبان میں سمجھ سکتے ہیں، باقاعدہ قانونی درخواستیں خود لکھ سکتے ہیں، اپنے معاملے سے متعلق قوانین تلاش کر سکتے ہیں اور فوری سرکاری ہیلپ لائنز سے رابطہ کر سکتے ہیں۔ اس ایپ کی کوئی فیس، رجسٹریشن یا پوشیدہ اخراجات نہیں ہیں۔',
      en: 'The Pakistan Legal Aid Portal is a 100% free automated tool designed for all citizens of Pakistan. It helps you simplify complex legal documents into plain local language, draft formal legal complaints, match your issues with relevant Pakistani laws, and connect with official government emergency helplines. There are no registration fees or hidden charges.',
      sd: 'پاڪستان قانوني امداد پورٽل پاڪستان جي تمام شهرين لاء 100% مفت ۽ بغير ڪنهن فيس جي آهي. هي توهان کي قانوني دستاويزن کي آسان سنڌي يا اردو ۾ سمجھڻ، درخواستون لکڻ ۽ سرڪاري هيلپ لائينن سان رابطو ڪرڻ ۾ مدد ڏئي ٿو.',
      pa: 'پاکستان قانونی امداد پورٹل پاکستان دے سارے شہریاں لئی 100% مفت اے. ایدے نال تسیں قانون دستاویزات نوں سادہ زبان وِچ سمجھ سکدے ہو، درخواستاں لکھی سکدے ہو تے سرکاری ہیلپ لائنز نال رابطہ کر سکدے ہو.',
      ps: 'د پاکستان قانوني مرستې پورټل د پاکستان د ټولو اتباعو لپاره ۱۰۰٪ وړیا دی. دا تاسو سره مرسته کوي چې پېچلي قانوني اسناد په ساده پښتو يا اردو ژبه وپوهېږئ، قانوني غوښتنلیکونه ولیکئ او د دولتي مرستندویه شمیرو سره اړیکه ونیسئ.',
    },
    bullets: {
      ur: [
        '100% مفت اور خودکار قانونی رہنمائی',
        'کوئی اکاؤنٹ یا لاگ ان کی ضرورت نہیں',
        'پاکستان کی تمام 5 اہم زبانوں میں دستیاب',
      ],
      en: [
        '100% Free & automated legal assistance',
        'No account creation or login required',
        'Fully available in 5 major languages of Pakistan',
      ],
      sd: [
        '100% مفت ۽ خودڪار قانوني رهنمائي',
        'ڪنهن به اڪائونٽ جي ضرورت ناهي',
        'پاڪستان جي 5 اهم ٻولين ۾ موجود',
      ],
      pa: [
        '100% مفت تے خودکار قانونی رہنمائی',
        'کسے اکاؤنٹ دی لوڑ نہیں',
        'پاکستان دیاں تمام 5 وڈیاں زباناں وِچ دستیاب',
      ],
      ps: [
        '۱۰۰٪ وړیا او خپله کاریدونکې قانوني لارښوونه',
        'هیڅ حساب یا نوم لیکنې ته اړتیا نشته',
        'د پاکستان په ۵ مهمو ژبو کې د لاسرسي وړ',
      ],
    },
  },
  {
    id: 'faq-2',
    category: 'privacy',
    question: {
      ur: 'کیا میری ذاتی معلومات، شناختی کارڈ اور اپ لوڈ کردہ دستاویزات محفوظ ہیں؟',
      en: 'Is my personal data, CNIC, and uploaded documents private and secure?',
      sd: 'ڇا منهنجي ذاتي معلومات، شناختي ڪارڊ ۽ اپلوڊ ٿيل دستاويز محفوظ آهن؟',
      pa: 'کیہ میری ذاتی معلومات، شناختی کارڈ تے اپ لوڈ کیتی گئی دستاویزات محفوظ ہن؟',
      ps: 'ایا زما شخصي معلومات، د پېژندپاڼې شمیره او اپلوډ شوي اسناد خوندي دي؟',
    },
    answer: {
      ur: 'جی ہاں، بالکل! پورٹل کو اس طرح ڈیزائن کیا گیا ہے کہ آپ کا سارا ڈیٹا، تصویر، تحریر اور شناختی کارڈ نمبر صرف اور صرف آپ کے اپنے موبائل یا کمپیوٹر کے اندر پراسیس ہوتے ہیں۔ کوئی بھی معلومات، خط، یا دستاویز کسی بیرونی سرور یا ڈیٹا بیس پر محفوظ یا اپ لوڈ نہیں کی جاتی۔ آپ اپنا براؤزر بند کریں گے تو آپ کا ڈیٹا آپ کی مرضی کے بغیر کہیں نہیں جائے گا۔',
      en: 'Yes, completely! The portal runs on a client-side architecture where all document parsing, image scanning, and letter generation take place locally on your device. No personal information, CNIC numbers, or uploaded document photos are stored on or sent to remote databases.',
      sd: 'جي ها، بالڪل! توهان جي تمام معلومات، تصويرون ۽ شناختي ڪارڊ نمبر صرف توهان جي پنهنجي موبائل يا ڪمپيوٽر اندر رهن ٿا. ڪنهن به سرور تي ڊيٽا محفوظ نٿو ڪيو وڃي.',
      pa: 'جی ہاں، بالکل! تہاڈا سارا ڈیٹا، تصاویراں تے شناختی کارڈ نمبر صرف تہاڈے اپنے موبائل وِچ پراسیس ہوندے ہن. کوئی ڈیٹا کسے سرور تے سیو نہیں ہوندا.',
      ps: 'هو، په بشپړ ډول! ستاسو ټول معلومات، انځورونه او د پیژندپاڼې شمیره یوازې ستاسو په خپل وسیله (مبایل یا کمپیوټر) کې پروسس کیږي. هیڅ معلومات په کوم بهرني سرور کې نه ذخیره کیږي.',
    },
    bullets: {
      ur: [
        'صفر سرور لاگنگ (Zero Data Logging)',
        'براؤزر پرائیویٹ پراسیسنگ',
        'کسی قسم کی سیکیورٹی لیک یا جاسوسی کا خطرہ نہیں',
      ],
      en: [
        'Zero server logging policy',
        'Browser-based private processing',
        'No risk of data leaks or privacy intrusion',
      ],
      sd: [
        'زيرو سرور لاگنگ',
        'براؤزر جي اندر خانگي پروسيسنگ',
        'ڊيٽا چوريءَ جو ڪو به خطرو ناهي',
      ],
      pa: [
        'زیرو سرور لاگنگ',
        'براؤزر پرائیویٹ پراسیسنگ',
        'ڈیٹا لیک دا کوئی خطرہ نہیں',
      ],
      ps: [
        'په سرور کې هیڅ پاتې شونې نه ذخیره کیږي',
        'په براوزر کې مستقیم محرم پروسس',
        'د معلوماتو د افشا کیدو هیڅ خطر نشته',
      ],
    },
  },
  {
    id: 'faq-3',
    category: 'explainer',
    question: {
      ur: 'کسی پیچیدہ قانونی دستاویز یا کرایہ نامہ کا تجزیہ کیسے کریں؟',
      en: 'How do I analyze and understand a complex legal document or notice?',
      sd: 'ڪنهن قانوني دستاويز يا معاهدي جي تشريح ڪيئن ڪجي؟',
      pa: 'کسی قانونی دستاویز یا معاہدے دی تشریح کس طرہاں کریئے؟',
      ps: 'د قانوني سند یا تړون تشریح او باخبري څنګه ترلاسه کړو؟',
    },
    answer: {
      ur: 'پورٹل کے "دستاویز تشریح" (Document Explainer) شعبے میں جائیں۔ وہاں آپ کسی بھی قانونی متن کو کاپی پیسٹ کر سکتے ہیں یا اپنے موبائل کیمرے سے دستاویز کی تصویر اپ لوڈ کر سکتے ہیں۔ سسٹم اس دستاویز کی اہم قانونی شقیں، شرائط، عدالت و قانون کا حوالہ، اور آئندہ کے ضروری اقدامات سادہ اور واضح الفاظ میں آپ کو دکھا دے گا۔',
      en: 'Navigate to the "Document Explainer" tab. You can either paste text from a notice or contract, or upload/scan a photo of your legal document. The system instantly analyzes the text, highlights crucial clauses, decodes difficult legal terminology, cites relevant Pakistan statutes, and lists actionable next steps.',
      sd: 'پورٽل جي "دستاويز تشريح" بخش ۾ وڃو. اتي توهان متن ڪاپي پيسٽ ڪري سگهو ٿا يا دستاويز جي تصوير اپلوڊ ڪري سگهو ٿا. سسٽم توهان کي سادي لفظن ۾ سمجھاڻي ڏيندو.',
      pa: 'پورٹل دے "دستاویز تشریح" شعبے وِچ جاؤ. اوتھے تسیں متن کاپی پیسٹ کر سکدے ہو یا دستاویز دی تصویر اپ لوڈ کر سکدے ہو. سسٹم تہانوں سادہ الفاظ وِچ سارا مطلب سمجھا دیوے گا۔',
      ps: 'د پورټل "د اسنادو تشریح" برخې ته لاړ شئ. هلته تاسو کولی شئ شته متن پیسټ کړئ یا د خپلو اسنادو انځور اپلوډ کړئ. سیسټم به تاسو ته په ساده ژبه مهم ټکي، قانوني مواد او باخبري وړاندې کړي.',
    },
  },
  {
    id: 'faq-4',
    category: 'drafter',
    question: {
      ur: 'قانونی درخواست، شکایت یا نوٹس کیسے تیار اور پرنٹ کریں؟',
      en: 'How do I draft, edit, save, and print a formal complaint or notice?',
      sd: 'قانوني درخواست يا نوٽيس ڪيئن لکجي، محفوظ ڪجي ۽ پرنٽ ڪجي؟',
      pa: 'قانونی درخواست یا نوٹس کس طرہاں لکھیئے، محفوظ کریئے تے پرنٹ کریئے؟',
      ps: 'قانوني غوښتنلیک یا نوټس څنګه ولیکو، خوندي او چاپ یې کړو؟',
    },
    answer: {
      ur: '"درخواست و شکایت" (Complaint Drafter) پر کلک کریں۔ اپنی ضرورت کے مطابق ٹیمپلیٹ منتخب کریں (مثلاً صارف تحفظ، کرایہ داری تنازعہ، سائبر کرائم ايف آئي اي، یا ہراسانی)۔ سوالنامے کے مطابق اپنے نام، پتے اور واقعہ کی تفصیلات درج کریں۔ آپ کی درخواست فوری طور پر تیار ہو جائے گی۔ آپ اسے "پرنٹ" بٹن کے ذریعے A4 پیپر پر پرنٹ کر سکتے ہیں، PDF ڈاؤن لوڈ کر سکتے ہیں یا اپنے موبائل میں محفوظ کر سکتے ہیں۔',
      en: 'Click on the "Complaint Drafter" tab. Choose from available categories (such as Consumer Protection, Rent Controller Notice, FIA Cybercrime Complaint, or Workplace Harassment). Fill in the guided fields with your name, party details, and facts. The application constructs a court-ready letter. Click "Print" for a print-ready clean document or "Download PDF".',
      sd: '"درخواست و شڪايت" واري تب تي ڪلڪ ڪريو. پنهنجي ضرورت جي مطابق ٽيمپليٽ چونڊيو (مثلاً صارف تحفظ، ڪرائي داري، سائبر ڪرائيم). سوالن جا جواب ڏيو ۽ پنهنجي درخواست پرنٽ يا پي ڊي ايف مائن محفوظ ڪريو.',
      pa: '"درخواست و شکایت" تے کلک کرو. اپنی لوڑ کے مطابق ٹیمپلیٹ چنو (مثلاً صارف تحفظ، کرایہ داری، سائبر کرائم). معلومات بھر کے اپنی درخواست پرنٹ یا ڈاؤن لوڈ کرو.',
      ps: 'د "غوښتنلیک لیکلو" برخې ته لاړ شئ. خپل ټیمپلیټ وټاکئ (لکه د مصرف کونکو حقونه، د کور کرایه، سایبر جرمونه). غوښتل شوي معلومات داخل کړئ، بيا کولی شئ سند چاپ (Print) يا ډانلوډ کړئ.',
    },
  },
  {
    id: 'faq-5',
    category: 'helplines',
    question: {
      ur: 'سرکاری اور مفت قانونی ہیلپ لائنز سے کیسے رابطہ کریں؟',
      en: 'How do I search and connect with official legal aid helplines?',
      sd: 'سرڪاري ۽ مفت قانوني هيلپ لائينن سان ڪيئن رابطو ڪجي؟',
      pa: 'سرکاری تے مفت قانونی ہیلپ لائنز نال کس طرہاں رابطہ کریئے؟',
      ps: 'د دولتي او وړیا قانوني مرستې باوري کرښو سره څنګه اړیکه ونیسو؟',
    },
    answer: {
      ur: '"ہیلپ لائن ڈائریکٹری" شعبے میں تمام ٹول فری اور سرکاری نمبرز موجود ہیں جیسے وفاقی محتسب (1055)، پولیس ایمرجنسی (15)، ايف آئي اي سائبر کرائم (1991)، اور خواتین تحفظ ہیلپ لائن (1099)۔ آپ اپنے صوبے (پنجاب، سندھ، خیبر پختونخوا، بلوچستان، اسلام آباد) کا انتخاب کر کے متعلقہ ہیلپ لائن کا فون نمبر براہ راست کاپی یا ڈائل کر سکتے ہیں۔',
      en: 'Open the "Helpline Directory" tab. Access verified toll-free national and provincial numbers including Wafaqi Mohtasib (1055), Police Emergency (15), FIA Cybercrime (1991), and Women Protection Helpline (1099). You can filter by category or your province to immediately copy or call.',
      sd: '"هيلپ لائين ڊائريڪٽري" ۾ تمام مفت سرڪاري نمبرز موجود آهن. پنهنجي صوبي جي لحاظ سان نمبر ڳولي سڌو ڪال يا ڪاپي ڪري سگهو ٿا.',
      pa: 'ہیلپ لائن ڈائریکٹری وِچ سارے ٹول فری سرکاری نمبر موجود ہن. اپنے صوبے دے حساب نال نمبر لبھ کے ڈائریکٹ ڈائل کرو.',
      ps: 'د "مرستندویه شمیرو لارښود" لټون وکړئ. هلته د دولتي محتسب (1055)، پولیسو (15)، او سایبر جرمونو (1991) شمیرې په مستقیم ډول ملاتی کړی او اړيکه ونیول شئ.',
    },
  },
  {
    id: 'faq-6',
    category: 'offline',
    question: {
      ur: 'کیا یہ ایپ موبائل پر بغیر انٹرنیٹ (آف لائن) بھی کام کرتی ہے؟',
      en: 'Does this application work offline on mobile phones without internet?',
      sd: 'ڇا هيءَ ايپ موبائل تي بغير انٽرنيٽ (آف لائن) ڪم ڪري ٿي؟',
      pa: 'کیہ ایہہ ایپ موبائل تے بغیر انٹرنیٹ (آف لائن) وی کم کردی اے؟',
      ps: 'ایا دا اپلیکیشن په مبایل کې له انټرنیټ پرته (افلاین) هم کار کوي؟',
    },
    answer: {
      ur: 'جی ہاں! پورٹل ایک PWA (Progressive Web App) کی صلاحیت رکھتا ہے۔ ایک بار براؤزر میں لوڈ ہونے کے بعد اس کی اہم خصوصیات جیسے قانونی لغت (Glossary)، قانون لائبریری، ڈرافٹ سیور اور ہیلپ لائن ڈائریکٹری انٹرنیٹ کنکشن کے بغیر بھی اپ ڈیٹ اور استعمال کی جا سکتی ہیں۔',
      en: 'Yes! The portal functions as a Progressive Web Application. Once loaded in your device browser, core modules including the Legal Glossary, Law Library, Saved Drafts, and Helpline Directory work smoothly even without an active internet connection.',
      sd: 'جي ها! هڪ دفعو براؤزر ۾ لوڊ ٿيڻ بعد قانوني لغت، قانون لائبريري، محفوظ ڊرافٽس ۽ هيلپ لائينن واريون گهرجون بغير انٽرنيٽ جي به هلي سگهن ٿيون.',
      pa: 'جی ہاں! ایک واری موبائل وِچ لوڈ ہون توں بعد قانون لغت، قانون لائبریری، تے ہیلپ لائنز بغیر انٹرنیٹ دے وی چلدیاں ہن.',
      ps: 'هو! کله چې په مبایل کې پورټل خلاص شي، نو د هغې مهمې برخې لکه د قانوني کلمو لغت، حقوقي لایبرري او غوښتنلیکونه له انټرنیټ پرته کار کولی شي.',
    },
  },
  {
    id: 'faq-7',
    category: 'general',
    question: {
      ur: 'ایپ کی زبان یا اپنا متعلقہ صوبہ کیسے تبدیل کریں؟',
      en: 'How do I switch the language or change my active province?',
      sd: 'ايپ جي ٻولي يا پنهنجو صوبو ڪيئن تبديل ڪجي؟',
      pa: 'ایپ دی زبان یا اپنا صوبہ کس طرہاں تبدیل کریئے؟',
      ps: 'د اپلیکیشن ژبه یا خپل اړوند ولايت څنګه بدل کړو؟',
    },
    answer: {
      ur: 'پورٹل کی نچلی یا اوپری پٹی پر "زبان منتخب کریں" بار موجود ہے۔ وہاں آپ اردو (Urdu)، English، سنڌي (Sindhi)، پنجابی (Punjabi) اور پښتو (Pashto) میں سے کسی کا بھی انتخاب کر سکتے ہیں۔ اسی طرح تمام فورمز میں اپنا صوبہ تبدیل کر کے اپنے علاقائی قوانین دیکھ سکتے ہیں۔',
      en: 'Use the Language Selector Bar at the top of the app to seamlessly switch between Urdu, English, Sindhi, Punjabi, and Pashto. You can also select your province from the dropdown in any section to adapt forum names and provincial statutes.',
      sd: 'اسڪرين جي مٿان ٻولي جي بار مان سنڌي، اردو، پښتو، پنجابي يا انگلش چونڊيو. پنهنجو صوبو به منتخب ڪري سگهو ٿا.',
      pa: 'ایپ دے اُپر زبان والی پٹی وِچوں اپنی پسند دی زبان چنو تے اپنا صوبہ سلیکٹ کرو.',
      ps: 'د پاڼې په پائین يا پورتنۍ برخه کې له چمتو شوې پټې له لارې خپله ژبه (پښتو، اردو، انګلیسي، سندي، پنجابي) او ولايت ژر تر ژره بدل کړئ.',
    },
  },
];
