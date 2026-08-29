import { DocTypeTemplate, LegalTerm } from '../types';

export const COMMON_LEGAL_GLOSSARY: LegalTerm[] = [
  {
    termKey: 'security_deposit',
    term: {
      en: 'Security Deposit (سیکیورٹی ڈپازٹ)',
      ur: 'سیکیورٹی ڈپازٹ (ضمانتی رقم)',
      sd: 'سيڪيورٽي ڊپازٽ (ضمانتي رقم)',
      pa: 'سیکیورٹی ڈپازٹ (ضمانتی رقم)',
      ps: 'سیکیوټي امانت (ضمانتي پيسې)',
    },
    definition: {
      en: 'A refundable lump-sum amount paid by the tenant at the start of tenancy to guarantee against property damage or unpaid bills.',
      ur: 'وہ رقم جو کرایہ دار کرایہ داری کے آغاز میں مالک مکان کے پاس امانت رکھتا ہے تاکہ توڑ پھوڑ یا واجب الادا بلوں کی ضمانت ہو سکے۔',
      sd: 'اهو پئسو جيڪو ڪراييدار مالڪ وٽ امانت طور رکي ٿو ته جيئن ڀڃ ڊاهه يا بلن جو ازالو ٿي سگهي.',
      pa: 'اوہ رقم جہڑی کرایہ دار مالک کول امانت رکھدا اے تاں جو توڑ پھوڑ یا بل ادا ہو سکن۔',
      ps: 'هغه پیسې چې کرایه دار یې په پیل کې د ضایعاتو جبران لپاره مالک ته د امانت په توګه بډوي.',
    },
    legalReference: 'Section 7 of Rent Restriction Laws',
  },
  {
    termKey: 'notice_period',
    term: {
      en: 'Notice Period (نوٹس کی مدت)',
      ur: 'نوٹس کی مدت (معاہدہ ختم کرنے کی مہلت)',
      sd: 'نوٽس جي مدت (معاهدو ختم ڪرڻ جي مهلت)',
      pa: 'نوٹس دی مدت (معاہدہ ختم کرن دی مہلت)',
      ps: 'د خبرتیا موده (تړون پای ته رسولو مهلت)',
    },
    definition: {
      en: 'Mandatory prior written timeframe (usually 30 to 60 days) required before vacating property or terminating employment contract.',
      ur: 'تحریری طور پر دی جانے والی لازمی مہلت (عام طور پر 1 سے 2 ماہ) جو گھر خالی کرنے یا نوکری چھوڑنے سے پہلے دینا ضروری ہے۔',
      sd: 'تحريري طور ڏنل لازمي مهلت (1 کان 2 مهينا) جيڪا گھر خالي ڪرڻ کان اڳ ڏيڻي پوي ٿي.',
      pa: 'تحریری طور دتی جان والی مہلت جہڑی گھر خالی کرن توں پہلاں دینی لازمی اے۔',
      ps: 'هغه حتمي موده چې له مخې یې باید لوری وړاندې له مخه خبر کړل شي.',
    },
    legalReference: 'Section 11 Islamabad Rent Restriction Ordinance 2001',
  },
  {
    termKey: 'bayan_e_halfi',
    term: {
      en: 'Affidavit / Bayan-e-Halfi (بیان حلفی)',
      ur: 'بیان حلفی (حلفیہ اقرار نامہ)',
      sd: 'بيان حلفي (قسمي اقرار نامو)',
      pa: 'بیان حلفی (حلفیہ اقرار نامہ)',
      ps: 'بیان حلفي (په حلف باوري لیک)',
    },
    definition: {
      en: 'A sworn written statement made under oath before an Oath Commissioner or Notary Public, legally binding in court.',
      ur: 'اووٿ کمشنر یا نوٹری پبلک کے سامنے قسم اٹھا کر دیا گیا تحریری بیان جس پر جھوٹ بولنا عدالت میں جرم ہے۔',
      sd: 'اووٿ ڪمشنر وٽ قسم کڻي ڏنل تحريري بيان جنهن تي جُوٺ ڳالهائڻ ڏوهه آهي.',
      pa: 'قسم چُک کے دتا گیا تحریری بیان جس تے جھوٹھ بولنا جرم اے۔',
      ps: 'د مراجعو په وړاندې د حلف په لاندې رسمي ليکلی اقرار.',
    },
    legalReference: 'Code of Civil Procedure Order XIX',
  },
  {
    termKey: 'eviction',
    term: {
      en: 'Eviction Order (حکم بے دخلی / مکان خالی کرنا)',
      ur: 'حکم بے دخلی (عدالتی حکم پر گھر خالی کروانا)',
      sd: 'حڪم بي دخلي (عدالتي حڪم تي گھر خالي ڪرايو)',
      pa: 'حکم بے دخلی (عدالتی حکم تے گھر خالی کروانا)',
      ps: 'د کور تشولو حکمنامه (ايستلو امر)',
    },
    definition: {
      en: 'Legal judicial procedure by which a landlord recovers possession of real property through Rent Controller.',
      ur: 'عدالتی طریقہ کار جس کے ذریعے رینٹ کنٹرولر کے حکم پر کرایہ دار سے مکان کا قبضہ واپس لیا جاتا ہے۔',
      sd: 'عدالتي طريقو جنهن ذريعي مالڪ مڪان رينٽ ڪنٽرولر جي حڪم تي جڳهه خالي ڪرائي ٿو.',
      pa: 'عدالتی طریقہ جس نال جج دے حکم تے مکان خالی کروایا جاندا اے۔',
      ps: 'قانوني امر چې له مخې یې د رینټ کنټرولر له خوا د ملکیت تشول نافذېږي.',
    },
    legalReference: 'Section 13 Rent Controller Procedure',
  },
  {
    termKey: 'fard_badar',
    term: {
      en: 'Fard Badar / Correction of Land Record (فرد بدر - تصحیح ریکارڈ)',
      ur: 'فرد بدر (مالیاتی اور ریونیو ریکارڈ میں غلطی کی درستگی)',
      sd: 'فرد بدر (پٽوار ريڪارڊ ۾ غلطيءَ جي تصحيح)',
      pa: 'فرد بدر (زمین دے کاغزاں وِچ غلطی ٹھیک کرنا)',
      ps: 'فرد بدر (د ځمکې په سرکارې دفتر کې د غلطۍ اصلاح)',
    },
    definition: {
      en: 'Official revenue order passed by Revenue Officer / Tehsildar to correct clerical or spelling mistakes in revenue records without altering title.',
      ur: 'تحصیلدار یا ریونیو افسر کا حکم جس کے ذریعے پٹوار ریکارڈ میں نام، رقبہ یا خسرہ نمبر کی کلریکل غلطی کو درست کیا جاتا ہے۔',
      sd: 'پٽواري يا تحصيلدار جو حڪم جنهن ذريعي زمين جي ريڪارڊ ۾ غلطي صحيح ڪئي ويندي آهي.',
      pa: 'تحصیلدار دا حکم جس نال سرکاری رجسٹر وِچ نام یا رقم دی غلطی سدھاری جاندی اے۔',
      ps: 'د تحصیلدار حکم چې له مخې یې په دفتري راجستر کې کتابتي تیروتنه سمېږي.',
    },
    legalReference: 'Section 45 West Pakistan Land Revenue Act 1967',
  },
  {
    termKey: 'interim_bail',
    term: {
      en: 'Interim Bail / Protective Bail (عبوری ضمانت)',
      ur: 'عبوری ضمانت (گرفتاری سے عارضی تحفظ)',
      sd: 'عبوري ضمانت (عارضي حفاظت)',
      pa: 'عبوری ضمانت (عارضی طور تے پولیس توں بچاؤ)',
      ps: 'عبوري ضمانت (موقتي معافیت)',
    },
    definition: {
      en: 'Temporary judicial protection granted by court to an accused prior to final decision on pre-arrest bail petition.',
      ur: 'قبل از گرفتاری ضمانت کی حتمی سماعت تک عدالت کی طرف سے ملزم کو پولیس گرفتاری سے دیا گیا عارضی تحفظ۔',
      sd: 'حتمي فيصلي تائين عدالت پاران ملزم کي گرفتاريءَ کان ڏنل عارضي تحفظ.',
      pa: 'حتمی فیصلے تیکر کورٹ ولوں گرفتاری توں دتا گیا عارضی تحفظ۔',
      ps: 'د غوښتنلیک تر حتمي ارزونې پورې د ملزم عارضي خوندیتوب.',
    },
    legalReference: 'Section 498 Code of Criminal Procedure (CrPC)',
  },
  {
    termKey: 'contempt_of_court',
    term: {
      en: 'Contempt of Court (توہینِ عدالت)',
      ur: 'توہینِ عدالت (عدالتی احکامات کی عدم تعمیلی یا بے حرمتی)',
      sd: 'توهينِ عدالت',
      pa: 'توہینِ عدالت (کورٹ دے حکم نوں نہ مننا)',
      ps: 'د محکمې سپکاوی (توہینِ عدالت)',
    },
    definition: {
      en: 'Offence of disobeying court orders, scandalizing judges, or obstructing the administration of justice.',
      ur: 'عدالتی احکامات کی پاسداری نہ کرنا یا عدالت اور جج صاحبان کے وقار کو مجروح کرنا، جس پر قید یا جرمانہ ہو سکتا ہے۔',
      sd: 'عدالتي حڪم نہ مڃڻ يا عدالت جي بي حرمتي ڪرڻ جنهن تي سزا ٿي سگهي ٿي.',
      pa: 'کورٹ دا حکم نہ مننا یا جج صاحب دی توہین کرنا جرم اے۔',
      ps: 'د محکمې له امر څخه سرغړونه یا د قاضیانو بې عزتي چې درنه سزا لري.',
    },
    legalReference: 'Contempt of Court Ordinance 2003 & Article 204 Constitution',
  },
  {
    termKey: 'hibba_gift',
    term: {
      en: 'Hibba / Gift Deed (ہبہ - تحفہ جائیداد)',
      ur: 'ہبہ نامہ (بلا معاوضہ جائیداد کا قانونی تحفہ)',
      sd: 'هبه نامو (تحفي ۾ ملڪيت ڏيڻ)',
      pa: 'ہبہ نامہ (جائیداد دا تحفہ)',
      ps: 'هبه (د ملکیت بلعووضه تحفه)',
    },
    definition: {
      en: 'Voluntary transfer of property made immediately and without consideration by donor to donee, accepted by or on behalf of donee.',
      ur: 'کسی قیمت کے بغیر اپنی زندگی میں اپنی خوشی سے جائیداد کی ملکیت دوسرے شخص کے نام منتقل کرنے کا شرعی و قانونی عمل۔',
      sd: 'بغير پئسن جي پنهنجي خوشيءَ سان پنهنجي ملڪيت ٻئي جي نالي ڪرڻ جو قانوني طريقو.',
      pa: 'بغیر پیسے دے اپنی جائیداد کسے نوں تحفے وِچ دینا۔',
      ps: 'له مالي مقابل پرته بل لوري ته په رسمي توګه د شتمنۍ بښل.',
    },
    legalReference: 'Transfer of Property Act 1882 (Section 122) & Islamic Jurisprudence',
  },
  {
    termKey: 'caveat',
    term: {
      en: 'Caveat / Prior Notice (کیویٹ - پیشگی اطلاع)',
      ur: 'کیویٹ (عدالت کو پیشگی آگاہی کی درخواست)',
      sd: 'ڪيويٽ (پيشگي عدالتي اطلاع)',
      pa: 'کیویٹ (کورٹ نوں پہلے توں اطلاع)',
      ps: 'کیویټ (محکمې ته دمخه خبرداری)',
    },
    definition: {
      en: 'Formal notice lodged by a party in court requesting that no order be passed regarding a matter without informing the caveator.',
      ur: 'عدالت میں جمع کرائی گئی درخواست تاکہ مخالف فریق کی طرف سے اسٹے یا حکم جاری کرنے سے پہلے کیویٹ دینے والے کو سننے کا موقع ملے۔',
      sd: 'عدالت ۾ ڏنل درخواست ته جيئن مونکي ٻڌڻ کان بغير ٻئي ڌُر جي حق ۾ حڪم نہ ڏنو وڃي.',
      pa: 'کورٹ وِچ درخواست تاکہ سانوں سنے بغیر کوئی فیصلہ نہ کیتا جاوے۔',
      ps: 'محکمې ته رسمي خواست چې د کاویټ کوونکي له اورېدو پرته هیڅ یو اړخیز امر ونه کړي.',
    },
    legalReference: 'Section 148-A Code of Civil Procedure (CPC)',
  },
  {
    termKey: 'tafweez_e_talaq',
    term: {
      en: 'Tafweez-e-Talaq / Delegated Divorce Right (تفویضِ طلاق)',
      ur: 'تفویضِ طلاق (نکاح نامہ کے کالم 18 میں عورت کو طلاق کا حق)',
      sd: 'تفويضِ طلاق (عورت کي طلاق جو حق)',
      pa: 'تفویضِ طلاق (عورت نوں طلاق دا حق)',
      ps: 'تفویض طلاق (د طلاق د حق تفویض کول)',
    },
    definition: {
      en: 'Delegation of right of divorce by husband to wife in Nikahnama (Column 18), allowing her to divorce herself legally.',
      ur: 'نکاح کے وقت شوہر کی طرف سے بیوی کو دیا گیا وہ حق جس کے تحت وہ فیملی کورٹ جائے بغیر خود کو طلاق دے سکتی ہے۔',
      sd: 'نڪاح وقت مڙس پاران زال کي ڏنل حق جنهن تحت هوءَ پاڻ کي طلاق ڏئي سگهي ٿي.',
      pa: 'نکاح نامے وِچ شوہر ولوں بیوی نوں طلاق دا حق دینا۔',
      ps: 'په نکاح خط کې مېرمنې ته د خاوند له خوا د طلاق د واک سپارلو قانوني مادې.',
    },
    legalReference: 'Column 18 Nikahnama & MFLO 1961 Section 8',
  },
  {
    termKey: 'cnic_verification',
    term: {
      en: 'CNIC Registration & Police Verification (پولیس ویریفکیشن)',
      ur: 'شناختی کارڈ اندراج اور متعلقہ پولیس ویریفکیشن',
      sd: 'سڃاڻپ ڪارڊ ۽ پوليس ويريپيڪيشن',
      pa: 'شناختی کارڈ تے پولیس ویریفکیشن',
      ps: 'د پولیسو تصدیق او د تذکرې ارزیابي',
    },
    definition: {
      en: 'Mandatory legal requirement to submit tenancy details to local police station for security records.',
      ur: 'قانون کے مطابق کرایہ دار کے شناختی کارڈ کی کاپی اور کرایہ نامہ قریبی تھانے میں جمع کروانا لازمی قانونی ذمہ داری ہے۔',
      sd: 'قانون موجب ڪراييدار جا ڪاغذات پوليس ٿاڻي تي جمع ڪرائڻ لازمي آهي.',
      pa: 'کرایہ دار دے کاغذات تھانے جمع کروانا قانونی ذمہ داری اے۔',
      ps: 'امنيتي قوانینو پر بنسٽ د پولیسو په تاڼه کې د کرایې حساب درجول واجب دي.',
    },
    legalReference: 'Punjab Information of Tenants Act 2015',
  },
  {
    termKey: 'fir',
    term: {
      en: 'FIR - First Information Report (ایف آئی آر / ابتدائی اطلاع رپورٹ)',
      ur: 'ابتدائی اطلاع رپورٹ (FIR - ایف آئی آر)',
      sd: 'ابتدائي اطلاع رپورٽ (FIR)',
      pa: 'ایف آئی آر (ابتدائی اطلاع رپورٹ)',
      ps: 'د لومړنیو معلوماتو راپور (FIR)',
    },
    definition: {
      en: 'Official written complaint recorded by police under Section 154 CrPC upon receiving information about a cognizable criminal offence.',
      ur: 'قابلِ دست اندازی پولیس جرم کی اطلاع ملنے پر پولیس اسٹیشن کے انچارج کا تحریر کردہ سرکاری بنیادی مقدمہ۔',
      sd: 'جرم بابت پوليس ٿاڻي تي لکيل سرڪاري شروعاتي رپورٽ جنهن تان قانوني ڪارروائي شروع ٿئي ٿي.',
      pa: 'پولیس تھانے وِچ درج کیتی جان والی سرکاری رپورٹ جس توں مقدمہ شروع ہوندا اے۔',
      ps: 'د جرم د خبر ترلاسه کولو وروسته د پولیسو لخوا لومړنی درج شوی رسمي راپور.',
    },
    legalReference: 'Section 154 Code of Criminal Procedure (CrPC) 1898',
  },
  {
    termKey: 'remand',
    term: {
      en: 'Remand - Physical & Judicial (ریمانڈ - جسمانی و عدالتی)',
      ur: 'ریمانڈ (جسمانی یا عدالتی تحویل)',
      sd: 'ريمانڊ (جسماني يا عدالتي تحويل)',
      pa: 'ریمانڈ (پلیس یا جیل تحویل)',
      ps: 'ریمانډ (د پلټنو لپاره په ولکه کې ساتل)',
    },
    definition: {
      en: 'Court order allowing police custody (Physical) or sending suspect to jail (Judicial) for investigation within prescribed time limits.',
      ur: 'میجسٹریٹ کا حکم جس کے تحت ملزم کو تفتیش کے لیے پولیس تحویل (جسمانی ریمانڈ) یا جیل (عدالتی ریمانڈ) بھیجا جاتا ہے۔',
      sd: 'مجسٽريٽ جو حڪم جنهن تحت ملزم کي جاچ لاءِ پوليس يا جيل تحويل ۾ ڏنو ويندو آهي.',
      pa: 'جج دا حکم جس تحت ملزم نوں تفتیش لئی پولیس یا جیل بھیجیا جاندا اے۔',
      ps: 'د قاضي لخوا پولیسو ته د پلټنو لپاره د تورن د تحویلۍ اجازه ورکول.',
    },
    legalReference: 'Section 167 Code of Criminal Procedure (CrPC)',
  },
  {
    termKey: 'bail',
    term: {
      en: 'Bail - Pre & Post Arrest (ضمانت - قبل از گرفتاری و بعد از گرفتاری)',
      ur: 'ضمانت (قبل از گرفتاری یا بعد از گرفتاری)',
      sd: 'ضمانت (گرفتاريءَ کان اڳ يا پوءِ)',
      pa: 'ضمانت (گرفتاری توں پہلاں یا بعد وِچ)',
      ps: 'ضمانت (تر نیول کېدو وړاندې یا وروسته)',
    },
    definition: {
      en: 'Temporary release of an accused person awaiting trial, usually on condition that a sum of money or surety bond is lodged to guarantee court appearance.',
      ur: 'مقدمے کی سماعت تک ملزم کو عدالت میں حاضر ہونے کے مچلکوں پر عارضی آزادی دینا، جو قبل از گرفتاری یا بعد از گرفتاری ہو سکتی ہے۔',
      sd: 'عدالت پاران ملزم کي آزمائشي عرصي يا جيل بدران ضمانتي مچلي تي عارضي آزاد ڪرڻ.',
      pa: 'عدالت ولوں ملزم نوں عارضی طور تے رہائی دینا تاں جو اوہ پیشی تے حاضر ہووے۔',
      ps: 'د محکمې له خوا له بنده د تورن موقتي ازادول د ضمانت پر بنسټ.',
    },
    legalReference: 'Sections 496, 497, 498 CrPC 1898',
  },
  {
    termKey: 'khula',
    term: {
      en: 'Khula / Dissolution of Marriage (خلع - فسخ نکاح)',
      ur: 'خلع (عورت کا عدالتی طریقہ کار سے تنسیخ نکاح حاصل کرنا)',
      sd: 'خلع (عورت جو عدالتي طريقي سان نڪاح ختم ڪرائڻ)',
      pa: 'خلع (عدالت توں نکاح ختم کروانا)',
      ps: 'خلع (د محکمې له لارې د نکاح فسخ کول)',
    },
    definition: {
      en: 'Legal process under Islamic/Family law where a Muslim wife demands separation through Family Court, agreeing to forgo or return part of Haq Mehr.',
      ur: 'فیملی کورٹ کے ذریعے عورت کا حقِ خلع استعمال کرتے ہوئے شادی ختم کروانا، جس میں حق مہر کی کچھ رقم کی واپسی یا دستبرداری شامل ہو سکتی ہے۔',
      sd: 'فيملي ڪورٽ ذريعي عورت پاران خلع جو حق استعمال ڪري نڪاح ختم ڪرائڻ جو قانوني حق.',
      pa: 'فیملی کورٹ دے ذریعے عورت دا خلع لے کے شادی ختم کروان دا حق۔',
      ps: 'د کورنۍ محکمې له لارې د مېرمنې په غوښتنه د نکاح د فسخ کولو قانوني حق.',
    },
    legalReference: 'West Pakistan Family Courts Act 1964 & MFLO 1961',
  },
  {
    termKey: 'nikahnama',
    term: {
      en: 'Nikahnama - Marriage Contract (رسمی نکاح نامہ)',
      ur: 'سرکاری رجسٹرڈ نکاح نامہ (شادی کا تحریری معاہدہ)',
      sd: 'سرڪاري نڪاح نامو (شاديءَ جو معاهدو)',
      pa: 'سرکاری نکاح نامہ (شادی دا معاہدہ)',
      ps: 'د نکاح لیک (رسمي نکاح پاڼه)',
    },
    definition: {
      en: 'Statutory marriage certificate mandatory for Muslim marriages in Pakistan, containing terms of Haq Mehr, maintenance, and delegated divorce right.',
      ur: 'یونین کونسل کے نکاح رجسٹرار کے پاس رجسٹرڈ شدہ قانونی رشتہ ازدواج کا سرکاری سند و معاہدہ۔',
      sd: 'يونين ڪونسل جي رجسٽرار وٽ شادي جو سرڪاري طور رجسٽرڊ ٿيل قانوني معاهدو.',
      pa: 'یونین کونسل وِچ رجسٹرڈ شدہ نکاح دا سرکاری قانون دستاویز۔',
      ps: 'د یونین کونسل د نکاح د ثبت کوونکي له خوا تایید شوی رسمي عقد لیک.',
    },
    legalReference: 'Muslim Family Laws Ordinance 1961 (Section 5)',
  },
  {
    termKey: 'haq_mehr',
    term: {
      en: 'Haq Mehr / Dower - Muajjal & Muwajjal (حق مہر - معجل و مؤجل)',
      ur: 'حق مہر (شرعی و قانونی حقِ زوجیت - معجل و مؤجل)',
      sd: 'حق مهر (شرعي ۽ قانوني حق)',
      pa: 'حق مہر (شرعی و قانونی حق)',
      ps: 'حق مهر (د مېرمنې شرعي حق)',
    },
    definition: {
      en: 'Mandatory financial consideration or asset given by the husband to the wife upon marriage, payable immediately (Muajjal) or deferred (Muwajjal).',
      ur: 'وہ رقم یا اثاثہ جو نکاح کے وقت شوہر پر بیوی کو ادا کرنا فرض ہے، جو فوری (معجل) یا بعد میں (مؤجل) ادا کیا جا سکتا ہے۔',
      sd: 'اهو پئسو يا ملڪيت جيڪا مڙس نڪاح وقت زال کي ڏيڻ لاءِ پابند هوندو آهي.',
      pa: 'اوہ رقم جہڑی شوہر تے بیوی نوں دینا فرض اے، معجل یا مؤجل۔',
      ps: 'هغه ټاکلې شتمني چې خاوند یې مېرمنې ته په نکاح کې په ورکولو مکلف دی.',
    },
    legalReference: 'Section 10 Muslim Family Laws Ordinance 1961',
  },
  {
    termKey: 'hizanat',
    term: {
      en: 'Custody / Hizanat & Guardianship (حضانت - بچوں کی تحویل)',
      ur: 'حضانت (کم سن بچوں کی پرورش و تحویل کا قانونی حق)',
      sd: 'حضانت (معصوم ٻارن جي تحويل جو حق)',
      pa: 'حضانت (چھوٹے بچے دی سنبھال دا حق)',
      ps: 'حضانت (د ماشومانو د روزنې او پالنې حق)',
    },
    definition: {
      en: 'Legal right and responsibility regarding the physical care and custody of minor children, determined by Guardian Court keeping child welfare paramount.',
      ur: 'کم سن بچوں کی تحویل اور پرورش کا حق جو گارڈین کورٹ بچے کی بہتری اور فلاح کو مدنظر رکھتے ہوئے ماں یا باپ کو دیتی ہے۔',
      sd: 'معصوم ٻارن جي سنڀال ۽ تحويل جو قانوني حق جنهن جو فيصلو گاردين ڪورٽ ٻار جي ڀلائيءَ تحت ڪري ٿي.',
      pa: 'چھوٹے بچیاں دی سنبھال دا حق جو گارڈین جج بچے دے فائدے لئی طے کردا اے۔',
      ps: 'د ماشوم غوره خیر او ګټې ته په پام سره د پالنې او ساتنې قانوني پرېکړه.',
    },
    legalReference: 'Guardians and Wards Act 1890 (Section 17 & 25)',
  },
  {
    termKey: 'fard_malkiyat',
    term: {
      en: 'Fard Malkiyat / Land Record (فرد ملکیت / نقل خسرہ)',
      ur: 'فردِ ملکیت (زمین کا سرکاری ملکیت ریکارڈ)',
      sd: 'فردِ ملڪيت (زمين جي مالڪيءَ جو سرڪاري ڪاغذ)',
      pa: 'فرد ملکیت (زمین دا سرکاری کاغز)',
      ps: 'د فرد ملکیت (د ځمکې د مالکیت رسمي پاڼه)',
    },
    definition: {
      en: 'Certified record of land ownership issued by Patwari / Land Record Center (Arazi Record Center) reflecting title and area details.',
      ur: 'پٹوار خانہ یا اراضی ریکارڑ سینٹر سے جاری شدہ سرکاری سند جو کسی زمین کی رقبہ اور مالکانہ حقوق کی تصدیق کرتی ہے۔',
      sd: 'پٽوار خاني يا اراضي ريڪارڊ سينٽر پاران زمين جي مالڪيءَ جو سرڪاري تصديق ٿيل ڪاغذ.',
      pa: 'پٹوار خانہ یا کمپیوٹر سینٹر توں ملن والی زمین دی ملکیت دی کاپی۔',
      ps: 'د دفتري ارکینو یا پټوارخانه له خوا د ځمکې د د ملکیت د ثبوت رسمي ثبت.',
    },
    legalReference: 'West Pakistan Land Revenue Act 1967 (Section 42)',
  },
  {
    termKey: 'mutation_intiqal',
    term: {
      en: 'Mutation / Intiqal (انتقالِ اراضی - ملکیت کی تبدیلی)',
      ur: 'انتقالِ اراضی (سرکاری ریونیو ریکارڈ میں ملکیت کا تبادلہ)',
      sd: 'انتقالِ اراضي (زمين جي مالڪي تبديل ڪرڻ)',
      pa: 'انتقالِ اراضی (زمین دی ملکیت نوں بدلنا)',
      ps: 'د ځمکې لېږد / انتقال (په رسمي توګه نوم بدلول)',
    },
    definition: {
      en: 'The formal updating of revenue records when land title is transferred via sale, gift, or inheritance from seller to buyer.',
      ur: 'خرید و فروخت، ہبہ (تحفہ) یا وراثت کی صورت میں ریونیو کے سرکاری رجسٹر میں پرانے مالک کی جگہ نئے مالک کا نام درج کرنے کا عمل۔',
      sd: 'زمين خريدڻ يا وراثت تحت سرڪاري ريڪارڊ ۾ نئين مالڪ جو نالو داخل ڪرڻ جو عمل.',
      pa: 'زمین وِچ نواں مالکانہ نام درج کرن دا سرکاری عمل۔',
      ps: 'د پیرودلو یا وراثت له مخې په مالياتي دفتر کې د ځمکې د نوي مالک نوم درجول.',
    },
    legalReference: 'Section 42 West Pakistan Land Revenue Act 1967',
  },
  {
    termKey: 'stay_order',
    term: {
      en: 'Stay Order / Temporary Injunction (حکمِ امتناعی / سٹے آرڈر)',
      ur: 'حکمِ امتناعی (عدالتی سٹے آرڈر - کام روکنے کا حکم)',
      sd: 'حڪم امتناعي (اسٽي آرڊر - ڪم روڪڻ جو عدالتي حڪم)',
      pa: 'سٹے آرڈر (کام روکن دا عدالتی حکم)',
      ps: 'اسټې ارډر (د لنډمهالي کار درولو قضايي امر)',
    },
    definition: {
      en: 'Court directive restraining a party from taking a specific action (such as demolition, eviction, or sale) until final judgment.',
      ur: 'عدالت کا عارضی حکم جو کسی فریق کو متنازعہ جائیداد بیچنے، خالی کروانے یا توڑ پھوڑ کرنے سے روکتا ہے تاوقتیکہ فیصلہ نہ ہو جائے۔',
      sd: 'عدالت جو اهڙو حڪم جنهن تحت ڪنهن به ڌُر کي عارضي طور تڪراري ڪم يا تعمير کان روڪيو وڃي ٿو.',
      pa: 'جج دا عبوری حکم جو کسی بندے نوں زمین یا عمارت تے چھیڑ چھاڑ توں روکدا اے۔',
      ps: 'محکمې امر چې د پرېکړې پورې لوری د ودانولو، پلورلو یا ويجاړولو څخه باسي.',
    },
    legalReference: 'Civil Procedure Code (CPC) Order XXXIX Rules 1 & 2',
  },
  {
    termKey: 'power_of_attorney',
    term: {
      en: 'Power of Attorney / Mukhtar Nama (مختار نامہ عام و خاص)',
      ur: 'مختار نامہ (وکالت نامہ تحریری اجازت نامہ - عام یا خاص)',
      sd: 'مختار نامو (عام يا خاص وڪالت نامو)',
      pa: 'مختار نامہ (اجازت نامہ خاص یا عام)',
      ps: 'مختار نامه (واک ورکولو رسمي سند)',
    },
    definition: {
      en: 'Legal authorization given by a person (principal) empowering another (attorney) to represent or act on their behalf in legal/financial matters.',
      ur: 'تحریری قانونی دستاویز جس کے ذریعے کوئی شخص دوسرے شخص کو اپنے مالی یا عدالتی معاملات سنبھالنے اور فیصلوں کا اختیار دیتا ہے۔',
      sd: 'اهڙو قانوني ڪاغذ جنهن ذريعي ڪو شخص ٻئي کي پنهنجا جائداد يا عدالتي معاملا هلائڻ جو حڪم ۽ اختيار ڏئي ٿو.',
      pa: 'ایسا کاغذ جس نال تسیں کسے دوجے نوں اپنے معاملاں دا اختیار دیندے ہو۔',
      ps: 'هغه واک پاڼه چې یو چا ته د بل له خوا په رسمي کارونو کې د استازیتوب اجازه ورکوي.',
    },
    legalReference: 'Powers-of-Attorney Act 1882 & Registration Act 1908',
  },
  {
    termKey: 'succession_certificate',
    term: {
      en: 'Succession / Legal Heirship Certificate (جانشینی کا سرٹیفکیٹ)',
      ur: 'جانشینی و وراثت سرٹیفکیٹ (NADRA یا سول کورٹ سے)',
      sd: 'جانشيني جو سرٽيفڪيٽ (وراثت جو سرڪاري ثبوت)',
      pa: 'جانشینی دا سرٹیفکیٹ (وراثت دا ثبوت)',
      ps: 'د جانشینۍ تصدیق پاڼه (د وراثت رسمي مکتوب)',
    },
    definition: {
      en: 'Official document issued by NADRA or Civil Court certifying legal heirs entitled to receive moveable assets, bank accounts, and shares of a deceased person.',
      ur: 'نادرا یا سول کورٹ کی جاری کردہ سند جو متوفی کے تمام شرعی و قانونی وارثان اور بینک بیلنس وغیرہ منتقل کرنے کا حق ثابت کرتی ہے۔',
      sd: 'نادرا يا عدالت پاران فوت ٿيل شخص جي شرعي وارثن ۽ بئنڪ رڪام منتقل ڪرڻ لاءِ ڏنل سرڪاري سرٽيفڪيٽ.',
      pa: 'فوت ہون والے بندے دے بینک پیسے لئی نادرا یا کورٹ توں ملن والا کاغذ۔',
      ps: 'د مړ شوي کس د پاتې شتمنیو د وېش او په نښه کولو رسمی وثیقه.',
    },
    legalReference: 'Succession Act 1925 & NADRA Succession Certificates Act 2021',
  },
  {
    termKey: 'show_cause_notice',
    term: {
      en: 'Show Cause Notice (وجہ بتاؤ نوٹس - قانونی انتباہ)',
      ur: 'وجہ بتاؤ نوٹس (وضاحت طلب کرنے کا سرکاری یا ادارہ جاتی نوٹس)',
      sd: 'وجھ ٻڌايو نوٽس (وضاحت طلب ڪرڻ جو نوٽس)',
      pa: 'وجہ بتاؤ نوٹس (وضاحت منگن والا نوٹس)',
      ps: 'د دلیلو وړاندې کولو خبرتیا (شور کازو نوټس)',
    },
    definition: {
      en: 'Formal notice issued by an employer, court, or government authority requiring a person to explain why disciplinary or legal action should not be taken.',
      ur: 'سرکاری ادارے یا مالک کی طرف سے ملازم کو جاری تحریری نوٹس جس میں کسی غلطی یا قواعد کی خلاف ورزی کی تحریری وضاحت مانگی جاتی ہے۔',
      sd: 'ادارو يا مالڪ پاران ملازم کي ڏنل نوٽس جنهن ۾ ڪنهن غلطي يا شڪايت جي وضاحت گهري ويندي آهي.',
      pa: 'اداریاں ولوں بندے نوں صفائی پیش کرن لئی دتا گیا سرکاری نوٹس۔',
      ps: 'د ادارې له خوا مامور یا لوري ته د احتمالي اقدام وړاندې د دلیل غوښتنه.',
    },
    legalReference: 'Industrial and Commercial Employment (Standing Orders) Ordinance 1968',
  },
  {
    termKey: 'plaint_arzi_dawa',
    term: {
      en: 'Plaint / Arzi Dawa (عرضی دعویٰ - سول مقدمہ)',
      ur: 'عرضی دعویٰ (عدالت میں سول مقدمے کا تحریری ڈرافٹ)',
      sd: 'عريضي دعويٰ (عدالت ۾ شروعاتي دعويٰ)',
      pa: 'عرضی دعویٰ (عدالت وِچ دائر کیتا گیا کیس)',
      ps: 'عریضه دعویٰ (محکمې ته د شخړې د روښانولو لومړنی لیک)',
    },
    definition: {
      en: 'Initial formal written pleading filed by the plaintiff setting out facts, cause of action, and relief sought from Civil Court.',
      ur: 'مدعی کا عدالت میں دائر کیا گیا ابتدائی دعویٰ جس میں تمام واقعات، تنازعہ کی وجہ اور عدالت سے مانگی گئی داد رسی لکھی ہوتی ہے۔',
      sd: 'مدعي پاران سول ڪورٽ ۾ داخل ڪيل لکيل عريضي جنهن ۾ داد رسي جي گهر ڪئي وڃي ٿي.',
      pa: 'کیس کرن والے ولوں عدالت وِچ جمع کروائی گئی تحریری درخواست۔',
      ps: 'د مدعي له خوا قضايي غوښتنو په اړه د محکمې رسمياتو ته سپارل شوې عریضه.',
    },
    legalReference: 'Code of Civil Procedure (CPC) 1908 Order VII Rule 1',
  },
  {
    termKey: 'written_statement',
    term: {
      en: 'Written Statement / Jawab Dawa (جواب دعویٰ)',
      ur: 'جواب دعویٰ (مقدمے میں مدعا علیہ کا دفاعی جواب)',
      sd: 'جواب دعويٰ (مدعا عليه پاران ڏنل دفاعي جواب)',
      pa: 'جواب دعویٰ (مدعا علیہ دا جواب)',
      ps: 'جواب دعویٰ (د تورن د استدلال ځوابي پاڼه)',
    },
    definition: {
      en: 'Formal defense reply filed by the defendant in Civil Court answering each allegation raised in the plaintiff’s plaint.',
      ur: 'مقدمے کے دوسرے فریق (مدعا علیہ) کا عدالت میں جمع کرایا گیا تحریری دفاعی جواب جس میں دعوے کے نکات کو قبول یا مسترد کیا جاتا ہے۔',
      sd: 'مقدمي جي ٻئي ڌُر (مدعا عليه) پاران دعويٰ جي جواب ۾ لکيل عدالتي بيان.',
      pa: 'دوجے فریق ولوں دعوے دے جواب وِچ جمع کروایا گیا دفاعی کاغذ۔',
      ps: 'د مدعي د عریضې په وړاندې د دفاع کوونکي یا مدعا علیه ځواب لیک.',
    },
    legalReference: 'Code of Civil Procedure (CPC) Order VIII Rule 1',
  },
  {
    termKey: 'cognizable_offense',
    term: {
      en: 'Cognizable Offence (قابلِ دست اندازی پولیس جرم)',
      ur: 'قابلِ دست اندازی پولیس جرم (بغیر وارنٹ گرفتاری کی اجازت)',
      sd: 'قابلِ دست اندازي پوليس ڏوهه',
      pa: 'قابلِ دست اندازی پولیس جرم',
      ps: 'د پولیسو نیغ په نیغه مداخلت وړ جرم',
    },
    definition: {
      en: 'Serious criminal offence for which police has the authority to arrest the suspect without a warrant from a Magistrate.',
      ur: 'سنگین نوعیت کا جرم (جیسے چوری، ڈکیتی، قتل) جس میں پولیس بغیر مجسٹریٹ کے وارنٹ کے ملزم کو فوری گرفتار کر سکتی ہے۔',
      sd: 'سنگين ڏوهه جنهن ۾ پوليس کي مجسٽريٽ جي وارنٽ کان سواءِ ملزم کي گرفتار ڪرڻ جو حق هوندو آهي.',
      pa: 'اوہ وڈا جرم جس وِچ پولیس بغیر وارنٹ دے بندے نوں پھڑ سگدی اے۔',
      ps: 'هغه دروند جرم چې پکې پولیس د قاضي له حکم پرته نیونه کولی شي.',
    },
    legalReference: 'Section 4(1)(f) Code of Criminal Procedure (CrPC) 1898',
  },
  {
    termKey: 'peca_cybercrime',
    term: {
      en: 'PECA - Cybercrime & Digital Harassment (سائبر کرائمز قانون)',
      ur: 'پریوینشن آف الیکٹرانک کرائمز ایکٹ (آن لائن فراڈ، بلیک میلنگ قانون)',
      sd: 'سائبر ڪرائمز قانون (PECA)',
      pa: 'سائبر کرائم ایکٹ (آن لائن ہراسمنٹ)',
      ps: 'د برېښنایي جرمونو مخنیوي قانون (سائبر جرمونه)',
    },
    definition: {
      en: 'Law governing electronic crimes, online harassment, unauthorized data access, fake profiles, and digital financial scams investigated by FIA.',
      ur: 'آن لائن بلیک میلنگ، انٹرنیٹ فراڈ، جعلی فیس بک ID اور ڈیٹا چوری جیسے سائبر جرائم کا احاطہ کرنے والا قانون، جو FIA نافذ کرتی ہے۔',
      sd: 'انٽرنيٽ فراڊ، بليڪ ميلنگ ۽ سائبر ڏوهن خلاف قانوني ڪارروائي جو قانون.',
      pa: 'انٹرنیٹ تے بلیک میلنگ یا آن لائن ٹھگی دے خلاف ایفی آئی اے دا قانون۔',
      ps: 'د انټرنیټي ګواښونو، سایبري درغلیو او ناموس ضد اوازو خلاف قانون.',
    },
    legalReference: 'Prevention of Electronic Crimes Act (PECA) 2016',
  },
  {
    termKey: 'ombudsperson',
    term: {
      en: 'Ombudsperson / Wafaqi Mohtasib (وفاقی / صوبائی محتسب)',
      ur: 'وفاقی و صوبائی محتسب (سرکاری ناانصافی و ہراسیت کی شکایت کا فورم)',
      sd: 'وفاقي ۽ صوبائي محتسب',
      pa: 'محتسب اعلیٰ (سرکاری دفتر شکایت)',
      ps: 'د محتسب دفتر (وفاقي او ولایتي ناظرین)',
    },
    definition: {
      en: 'Independent statutory institution providing free, speedy administrative justice against government malpractices or workplace harassment.',
      ur: 'سرکاری محکموں کی بدعنوانی، تاخیر، ناانصافی یا ورک پلیس ہراسمنٹ کے خلاف بغیر وکیل کے مفت اور تیز ترین داد رسی کا ادارہ۔',
      sd: 'سرڪاري محڪمن جي ناانصافين يا ہراسان ڪرڻ خلاف مفت ۽ جلدي انصاف ڏيندڙ ادارو.',
      pa: 'سرکاری محکمیاں دی دھاندلی یا تاخیر خلاف مفت انصاف دی جگہ۔',
      ps: 'د دولتي بدانتظامی و کارځای د ځورونې پر خلاف د وړيا او باوري انصاف مرجع.',
    },
    legalReference: 'Establishment of the Office of Wafaqi Mohtasib Order 1983',
  },
  {
    termKey: 'cheque_bounce',
    term: {
      en: 'Dishonor of Cheque / 489-F PPC (چیک ڈس آنر ہونا / جعلی چیک)',
      ur: 'جعلی یا باؤنس چیک (دفعہ 489 ایف - نااہل چیک جاری کرنا)',
      sd: 'بائونس چيڪ (دفعو 489-F)',
      pa: 'چیک باؤنس ہونا (دفعہ 489 ایف)',
      ps: 'د چک نه اجرا کېدل (جعلي ۴۸۹-اف چک)',
    },
    definition: {
      en: 'Criminal offence of issuing a cheque dishonestly for payment of debt that bounces due to insufficient funds or closed account.',
      ur: 'بدنیتی کے تحت ایسا چیک جاری کرنا جو بینک میں رقم نہ ہونے کی وجہ سے باؤنس ہو جائے، جس پر 3 سال تک قید کی سزا ہو سکتی ہے۔',
      sd: 'بئنڪ ۾ پئسا نہ هجڻ جي باوجود جالي يا بائونس چيڪ ڏيڻ جنهن تي قيد جي سزا آهي.',
      pa: 'بینک وِچ رقم نہ ہون دے باوجود چیک دینا جرم اے۔',
      ps: 'په حساب کې د فنډ نشتوالي له امله د چک ردېدل او د درغلیو مدعا.',
    },
    legalReference: 'Section 489-F Pakistan Penal Code (PPC) 1860',
  },
  {
    termKey: 'suo_motu',
    term: {
      en: 'Suo Motu Notice (از خود نوٹس - سپریم کورٹ کا اختیار)',
      ur: 'از خود نوٹس (عوامی اہمیت کے آئینی و انسانی حقوق پر عدالت کی کارروائی)',
      sd: 'از خود نوٽس (عدالت پاران پاڻهي نوٽس وٺڻ)',
      pa: 'از خود نوٹس (سپریم کورٹ دا نوٹس)',
      ps: 'از خود نوټس (د سپریم محکمې خپله پاملرنه)',
    },
    definition: {
      en: 'Inherent constitutional authority of the Supreme Court of Pakistan to take judicial notice of a matter on its own motion without formal petition.',
      ur: 'اعلیٰ عدلیہ کا آئینی اختیار جس کے تحت وہ کسی درخواست کے بغیر بنیادی حقوق کی سنگین خلاف ورزی پر خود نوٹس لے کر سماعت کرتی ہے۔',
      sd: 'عدالت پاران ڪنهن عوالمي يا آئيني معاملي تي بغير درخواست جي پاڻهي ڪارروائي ڪرڻ جو اختيار.',
      pa: 'سپریم کورٹ دا بنا کسی درخواست دے عوامی مسئلے تے خود ایکشن لینا۔',
      ps: 'د بنسټیزو حقونو د سرغړونې پر مهال د محکمې له خوا له غوښتنلیک پرته خپله قضایي عریضه کول.',
    },
    legalReference: 'Article 184(3) Constitution of the Islamic Republic of Pakistan 1973',
  },
  {
    termKey: 'wakalatnama',
    term: {
      en: 'Wakalatnama (وکالت نامہ - وکیل مقرر کرنے کی سند)',
      ur: 'وکالت نامہ (عدالتی مقدمے میں وکیل کی نامزدگی کا فارم)',
      sd: 'وڪالت نامو (وڪيل مقرر ڪرڻ جو قانوني فارم)',
      pa: 'وکالت نامہ (وکیل بنان دا فارم)',
      ps: 'وکالت نامه (د وکیل د ټاکلو قانوني باورلیک)',
    },
    definition: {
      en: 'Written document signed by a client authorizing a specific advocate to represent, plead, and act on their behalf in court proceedings.',
      ur: 'عدالتی فارم جس پر سائل کے دستخط ہوتے ہیں جو وکیل کو عدالت میں پیش ہونے اور اس کی طرف سے دلائل دینے کا اختیار دیتا ہے۔',
      sd: 'اهڙو عدالتي فارم جنهن تي صحيح ڪري سائل وڪيل کي پنهنجو مقدمو لڙڻ جو حق ڏئي ٿو.',
      pa: 'اوہ کاغذ جس تے سائن کر کے تسیں اپنے وکیل نوں کیس لڑن دی اجازت دیندے ہو۔',
      ps: 'د موکل له خوا لیکل شوی لیک چې پکې وکیل ته په محکمه کې د ګډون واک ورکول کېږي.',
    },
    legalReference: 'Civil Procedure Code (CPC) Order III Rule 4',
  },
  {
    termKey: 'ex_parte',
    term: {
      en: 'Ex-Parte Proceedings / Order (یکطرفہ کارروائی و فیصلہ)',
      ur: 'یکطرفہ کارروائی / فیصلہ (مخالف فریق کے غیر حاضر رہنے پر فیصلہ)',
      sd: 'هڪ طرفي ڪارروائي / فيصلو (يكطرفه)',
      pa: 'یکطرفہ کارروائی (دوجے فریق توں بغیر فیصلہ)',
      ps: 'یکطرفه پرېکړه (د بل لوري په نشتوالي کې پرېکړه)',
    },
    definition: {
      en: 'Legal proceedings conducted or orders issued by a court in the absence of one party who failed to appear despite notice.',
      ur: 'عدالتی نوٹس ملنے کے باوجود مخالف فریق کے عدالت میں پیش نہ ہونے پر اس کی غیر موجودگی میں مدعی کے حق میں فیصلہ سنا دینا۔',
      sd: 'نوٽس مليل هجڻ باوجود ٻي ڌُر جي نہ اچڻ تي سندس غير موجودگي ۾ ڪيل عدالتي فيصلو.',
      pa: 'نوٹس ملن دے باوجود جے دوجا بندہ نہ آوے تاں کورٹ دا یکطرفہ فیصلہ۔',
      ps: 'د جلب نامې له تایید وروسته د تورن د نا حاضري په حالت کې صادره شوې پرېکړه.',
    },
    legalReference: 'Civil Procedure Code (CPC) Order IX Rule 6 & 13',
  },
  {
    termKey: 'consumer_rights',
    term: {
      en: 'Consumer Protection & Defective Product (صارفین کا تحفظ)',
      ur: 'صارفین کا تحفظ (ناقص اشیاء و خراب سروس پر حرجانہ)',
      sd: 'صارفين جي تحفظ جو قانون',
      pa: 'صارفین دا تحفظ (خراب سامان یا سروس)',
      ps: 'د مصرف کوونکو د حقونو خوندیتوب',
    },
    definition: {
      en: 'Statutory protection granted to consumers against defective goods, faulty services, or misleading advertisements through Consumer Courts.',
      ur: 'صارفین عدالت کے ذریعے ناقص اشیاء بیچنے یا خراب سروس فراہم کرنے پر دکاندار یا کمپنی کے خلاف حرجانہ اور جرمانہ عائد کروانے کا حق۔',
      sd: 'خراب شئي يا ناقص سروس ڏيندڙ ڪمپني خلاف صارف ڪورٽ مان حرجانو وٺڻ جو حق.',
      pa: 'خراب سامان یا غلط سروس ملن تے کنزیومر کورٹ توں ہرجانہ لین دا قانون۔',
      ps: 'د خراب توکو یا ناسم خدماتو وړاندې کوونکو خلاف د حرجانې او جرمانه غوښتنه.',
    },
    legalReference: 'Provincial Consumer Protection Acts (e.g. Punjab Consumer Protection Act 2005)',
  },
  {
    termKey: 'gratuity',
    term: {
      en: 'Gratuity & End-of-Service Benefits (گریجویٹی و مراعات)',
      ur: 'گریجویٹی (ملازمت ختم ہونے پر ملنے والی لازمی مالی مراعات)',
      sd: 'گريجوئيٽي (نوڪري ختم ٿيڻ تي ملندڙ رقم)',
      pa: 'گریجویٹی (نوکری ختم ہون تے رقم)',
      ps: 'ګریجوټي (د دندې له بشپړېدو وروسته پاداش)',
    },
    definition: {
      en: 'Lump-sum monetary benefit payable by an employer to an employee upon resignation or retirement after completing minimum qualifying service.',
      ur: 'کم از کم ایک سال مسلسل ملازمت مکمل کرنے کے بعد نوکری چھوڑنے یا ریٹائر ہونے پر ہر سال کے بدلے ملازم کو ملنے والی قانونی رقم۔',
      sd: 'نوڪري پوري ٿيڻ يا ڇڏڻ تي مالڪ پاران ملازم کي ملندڙ سرڪاري يا قانوني رقم.',
      pa: 'نوکری ختم ہون تے مالک کولوں ملن والا لازمی مالی حق۔',
      ps: 'له یو کال وروسته د دندې پرېښودلو یا متقاعد کېدو پر مهال د مامور مالي انعام.',
    },
    legalReference: 'Standing Order 12(6) Industrial & Commercial Employment Ordinance 1968',
  },
  {
    termKey: 'maintenance_nafqa',
    term: {
      en: 'Maintenance / Nafqa - Wife & Children (نان و نفقہ)',
      ur: 'نان و نفقہ (بیوی اور بچوں کا قانونی ماہانہ خرچہ)',
      sd: 'نان ۽ نفقو (زال ۽ ٻارن جو مھينا وار خرچ)',
      pa: 'نان و نفقہ (بیوی تے بچیاں دا خرچہ)',
      ps: 'نان او نفقہ (د مېرمنې او ماشومانو لګښت)',
    },
    definition: {
      en: 'Statutory financial obligation of a husband or father to provide food, shelter, clothing, medical care, and education expenses for wife and children.',
      ur: 'شوہر اور باپ کی شرعی و قانونی ذمہ داری کہ وہ اپنی بیوی اور بچوں کی خوراک، رہائش، علاج اور تعلیم کا ماہانہ خرچہ فراہم کرے۔',
      sd: 'مڙس ۽ پيءُ جي قانوني ذميواري ته هو پنهنجي زال ۽ ٻارن کي گهر، ماني ۽ تعليم جو خرچ ڏئي.',
      pa: 'شوہر تے باپ دا فرض کہ اوہ اپنی بیوی تے بچیاں نوں ماہانہ خرچہ دیوے۔',
      ps: 'د خاوند او پلار شرعي اؤ قانوني مکلفیت چې د کورنۍ مياشتنی لګښت ور کړي.',
    },
    legalReference: 'Section 9 Muslim Family Laws Ordinance 1961',
  },
];

export const DOC_TYPES_DATA: DocTypeTemplate[] = [
  {
    id: 'nikahnama_marriage',
    title: {
      en: 'Nikahnama / Official Marriage Certificate (نکاح نامہ)',
      ur: 'صیغہ عقد نکاح نامہ (Nikahnama)',
      sd: 'نڪاح نامو (Nikahnama)',
      pa: 'نکاح نامہ (Nikahnama)',
      ps: 'د نکاح پاڼه (نکاح نامہ)',
    },
    statute: 'Muslim Family Laws Ordinance 1961 (Section 5)',
    summaryTemplate: {
      en: 'This document is a legally registered Nikahnama under Pakistani Family Laws. It records marital rights, Haq Mehr (Dower), maintenance terms, and delegated right of divorce (Tafweez-e-Talaq).',
      ur: 'یہ دستاویز مسلم فیملی لاز آرڈیننس 1961 کے تحت رجسٹرڈ شدہ قانونی نکاح نامہ ہے۔ یہ حق مہر، ماہانہ نفقہ، اور تفویض طلاق کے حقوق کا تحریری ثبوت ہے۔',
      sd: 'هيءَ دستاويز مسلم فيملي لاز آڊيننس تحت نڪاح نامو آهي.',
      pa: 'یہ دستاویز مسلم فیملی لاز تحت رجسٹرڈ نکاح نامہ اے۔',
      ps: 'دا د مسلم فیملي لاز ارډیننس لاندې له یونین کونسل سره ثبت شوی نکاح لیک دی.',
    },
    fields: [
      {
        key: 'bridegroom_name',
        label: {
          en: 'Groom Name (دلہا کا نام)',
          ur: 'نام دلہا (Groom)',
          sd: 'گوهر / مڙس جو نالو',
          pa: 'دلہا دا نام',
          ps: 'د زلمي/خاوند نوم',
        },
        regexPatterns: ['(?i)(?:groom|دلہا|نوشاہ|مرد)\\s*[:=-]?\\s*([^\n,]+)'],
        keywords: ['groom', 'دلہا', 'بلال', 'ولد'],
        fallbackValue: {
          en: 'Bilal Hassan S/O Mahmood Hassan',
          ur: 'بلال حسن ولد محمود الحسن',
          sd: 'بلال حسن ولد محمود الحسن',
          pa: 'بلال حسن ولد محمود الحسن',
          ps: 'بلال حسن د محمود الحسن زوی',
        },
      },
      {
        key: 'bride_name',
        label: {
          en: 'Bride Name (دلہن کا نام)',
          ur: 'نام دلہن (Bride)',
          sd: 'دلہن جو نالو',
          pa: 'دلہن دا نام',
          ps: 'د ناوې نوم',
        },
        regexPatterns: ['(?i)(?:bride|دلہن|عورت|بیوی)\\s*[:=-]?\\s*([^\n,]+)'],
        keywords: ['bride', 'دلہن', 'ثناء', 'بنت'],
        fallbackValue: {
          en: 'Sana Fatima D/O Abdul Majeed',
          ur: 'ثناء فاطمہ بنت عبدالمجید',
          sd: 'ثناء فاطمة بنت عبدالمجيد',
          pa: 'ثناء فاطمہ بنت عبدالمجید',
          ps: 'ثناء فاطمة د عبدالمجید لور',
        },
      },
      {
        key: 'haq_mehr',
        label: {
          en: 'Haq Mehr / Dower Amount (حق مہر)',
          ur: 'حق مہر کی رقم (Haq Mehr Amount)',
          sd: 'حق مهر جي رقم',
          pa: 'حق مہر دی رقم',
          ps: 'د حق مهر رقم',
        },
        regexPatterns: ['(?i)(?:mehr|مہر|حق مہر)\\s*[:=-]?\\s*(?:rs\\.?|pkr|روپے)?\\s*([0-9,]+)'],
        keywords: ['mehr', 'مہر', 'حق مہر', '500,000', 'روپے'],
        fallbackValue: {
          en: 'Rs. 500,000 (Prompt / Muajjal)',
          ur: '500,000 روپے (معجل - فوری قابل ادائیگی)',
          sd: '500,000 روپيا (معجل)',
          pa: '500,000 روپے (معجل)',
          ps: '۵۰۰,۰۰۰ کلدارې (فوري واجب الادا)',
        },
      },
      {
        key: 'tafweez_talaq',
        label: {
          en: 'Delegated Right of Divorce (تفویض طلاق)',
          ur: 'حق تفویض طلاق (شق نمبر 18)',
          sd: 'تفويض طلاق',
          pa: 'حق تفویض طلاق',
          ps: 'د طلاق ورکولو استازی حق',
        },
        regexPatterns: ['(?i)(?:tafweez|تفویض|طلاق)\\s*[:=-]?\\s*([^\n,]+)'],
        keywords: ['tafweez', 'تفویض', 'شق 18', 'جی ہاں', 'yes'],
        fallbackValue: {
          en: 'Granted to Wife (Clause 18 - Yes)',
          ur: 'بیوی کو حق طلاق تفویض کر دیا گیا (شق 18 - جی ہاں)',
          sd: 'عورت کي حق طلاق تفويض ٿيل',
          pa: 'بیوی نوں طلاق دا حق دتا گیا',
          ps: 'مېرمنې ته د طلاق حق تفویض شوی',
        },
      },
    ],
    legalTerms: COMMON_LEGAL_GLOSSARY,
    nextSteps: {
      en: [
        'Ensure the Nikahnama is registered with the Union Council Nikah Registrar within 30 days.',
        'Obtain Nadra Computerized Marriage Registration Certificate (CMRC) for legal identification and passports.',
        'Keep original copies of Nikahnama in safe custody for legal and inheritance records.',
      ],
      ur: [
        'نکاح نامہ کو 30 دن کے اندر متعلقہ یونین کونسل سے رجسٹرڈ کروائیں۔',
        'نادرا سے کمپیوٹرائزڈ میرج سرٹیفکیٹ (CMRC) حاصل کریں۔',
        'نکاح نامہ کی اصل کاپیاں قانونی و وراثتی ریکارڈ کے لیے محفوظ رکھیں۔',
      ],
      sd: [
        'نڪاح نامو 30 ڏينهن اندر پنهنجي يونين ڪونسل مان باضابطه رجسٽرڊ ڪرايو.',
        'نادرا مان ڪمپيوٽرائيزڊ مئريج سرٽيفڪيٽ (CMRC) وٺو.',
        'نڪاح نامي جون اصل ڪاپيون پنهنجي رڪارڊ لاءِ محفوظ رکو.',
      ],
      pa: [
        'نکاح نامہ 30 دناں وِچ یونین کونسل توں رجسٹرڈ کروائیں۔',
        'نادرا کولوں کمپیوٹرائزڈ میرج سرٹیفکیٹ (CMRC) حاصل کرو۔',
        'نکاح نامے دیاں اصل کاپیاں محفوظ رکھو۔',
      ],
      ps: [
        'نکاح لیک په ۳۰ ورځو کې په اړونده یونین کونسل کې په رسمي بڼه ثبت کړئ.',
        'له نادرا څخه د وادۀ د نوم لیکنې کمپیوټري سند (CMRC) ترلاسه کړئ.',
        'د نکاح لیک اصلي بڼه او کاپيانې له ځان سره د قانوني ثبوت لپاره وژغورئ.',
      ],
    },
    sampleText: {
      en: `NIKAHNAMA / MARRIAGE REGISTRATION FORM (PAKISTAN)
Registered at Union Council # 12, District Rawalpindi.
Groom Name: Bilal Hassan, CNIC: 37405-1234567-1, Resident of Rawalpindi.
Bride Name: Sana Fatima, CNIC: 37405-7654321-2.

1. DATE OF MARRIAGE: 15th January 2025.
2. HAQ MEHR AMOUNT: Rs. 500,000/- (Rupees Five Lakhs Only).
3. TYPE OF MEHR: Muajjal (Prompt / Immediate Payment).
4. CLAUSE 18 (Tafweez-e-Talaq): Groom delegates right of divorce to wife under agreed condition (YES).
5. MONTHLY MAINTENANCE: Rs. 30,000/- per month agreed.
Nikah Registrar Seal & Signature Attached.`,
      ur: `صیغہ عقد نکاح نامہ (رجسٹرڈ یونین کونسل نمبر 12 راولپنڈی)
نام دلہا: بلال حسن، شناختی کارڈ: 37405-1234567-1، ساکن راولپنڈی۔
نام دلہن: ثناء فاطمہ، شناختی کارڈ: 37405-7654321-2۔

1۔ تاریخ نکاح: 15 جنوری 2025۔
2۔ حق مہر کی رقم: 500,000 روپے (پانچ لاکھ روپے)۔
3۔ نوعیت مہر: معجل (فوری قابل ادائیگی)۔
4۔ شق نمبر 18 (تفویض طلاق): کیا شوہر نے بیوی کو طلاق کا حق تفویض کیا؟ (جی ہاں)۔
5۔ ماہانہ نفقہ: 30,000 روپے ماہوار طے پایا۔
مہر و دستخط نکاح خواں و رجسٹرار یونین کونسل۔`,
      sd: `نڪاح نامو (يونين ڪونسل 12 راولپنڊي)
دلہا: بلال حسن، سڃاڻپ ڪارڊ: 37405-1234567-1
دلہن: ثناء فاطمہ، سڃاڻپ ڪارڊ: 37405-7654321-2
حق مهر: 500,000 روپيا معجل.
شق 18 تفويض طلاق: جي ها.`,
      pa: `نکاح نامہ (یونین کونسل راولپنڈی)
دلہا: بلال حسن، شناختی کارڈ: 37405-1234567-1
دلہن: ثناء فاطمہ، شناختی کارڈ: 37405-7654321-2
حق مہر: 500,000 روپے معجل۔
شق 18 تفویض طلاق: جی ہاں۔`,
      ps: `د نکاح پاڼه (یونین کونسل راولپندي)
زلمی: بلال حسن، تذکره: 37405-1234567-1
ناوې: ثناء فاطمة، تذکره: 37405-7654321-2
حق مهر: ۵۰۰,۰۰۰ کلدارې فوري.
شق ۱۸ تفویض طلاق: هو.`,
    },
  },
  {
    id: 'court_summons_notice',
    title: {
      en: 'Court Summons / Legal Notice (عدالتی سمن و نوٹس)',
      ur: 'عدالتی سمن / نوٹس تنبیہ (Court Summons)',
      sd: 'عدالتي سمن / نوٽس (Court Summons)',
      pa: 'عدالتی سمن (Court Summons)',
      ps: 'د محکمې جلب/خبرتیا پاڼه (Summons)',
    },
    statute: 'Code of Civil Procedure 1908 (Order V) / CrPC Section 68',
    summaryTemplate: {
      en: 'This document is an official Judicial Summons / Legal Notice issued by a Court of Law requiring personal or legal representation on a specified hearing date.',
      ur: 'یہ دستاویز سول یا فوجداری عدالت کی طرف سے جاری کردہ باضابطہ عدالتی سمن یا نوٹس ہے۔ مقررہ تاریخ پر عدالت میں حاضری لازمی ہے ورنہ یکطرفہ کارروائی ہو سکتی ہے۔',
      sd: 'هيءَ دستاويز عدالت پاران جاري ٿيل سمن آهي.',
      pa: 'یہ دستاویز عدالت دا باضابطہ سمن نوٹس اے۔',
      ps: 'دا سند د محکمې له خوا د جلب باوري خبرتیا ده.',
    },
    fields: [
      {
        key: 'case_number',
        label: {
          en: 'Case Title / Suit No. (دعویٰ نمبر)',
          ur: 'دعویٰ / کیس نمبر (Suit Number)',
          sd: 'دعويٰ نمبر',
          pa: 'کیس نمبر',
          ps: 'د قضې نمبر',
        },
        regexPatterns: ['(?i)(?:suit|case|دعویٰ|کیس)\\s*[:=-]?\\s*([0-9/A-Z-]+)'],
        keywords: ['suit number', 'suit no', 'suit', 'case', 'دعویٰ نمبر', 'کیس نمبر', 'دعویٰ', 'کیس', 'ex-parte', 'یکطرفہ'],
        fallbackValue: {
          en: 'Suit # 452/2026 (Injunction & Property Rights)',
          ur: 'دعویٰ نمبر 452/2026 (استقرار حق و حکم امتناعی)',
          sd: 'دعويٰ نمبر 452/2026',
          pa: 'کیس نمبر 452/2026',
          ps: 'دعوا شمیره ۴۵۲/۲۰۲۶',
        },
      },
      {
        key: 'hearing_date',
        label: {
          en: 'Hearing Date (تاریخ پیشی)',
          ur: 'تاریخ پیشی / سماعت (Hearing Date)',
          sd: 'تاريخ پيشي',
          pa: 'تاریخ پیشی',
          ps: 'محکمې ته د ورتګ نېټه',
        },
        regexPatterns: ['(?i)(?:date|مورخہ|تاریخ|پیشی)\\s*[:=-]?\\s*([0-9]{1,2}[/-][0-9]{1,2}[/-][0-9]{2,4}|[^\n,]+)'],
        keywords: ['تاریخ پیشی', 'تاریخ سماعت', 'اصالتا', 'وکالتا', 'hearing date', 'summoned', 'appear', 'february', 'فروری'],
        fallbackValue: {
          en: '10th February 2026 at 09:00 AM',
          ur: '10 فروری 2026 بوقت 09:00 بجے صبح',
          sd: '10 فيبروري 2026',
          pa: '10 فروری 2026',
          ps: '۱۰ د فبروري ۲۰۲۶',
        },
      },
      {
        key: 'court_name',
        label: {
          en: 'Court Name / Forum (متعلقہ عدالت)',
          ur: 'نام عدالت (Court Forum)',
          sd: 'عدالت جو نالو',
          pa: 'عدالت دا نام',
          ps: 'د اړونده محکمې نوم',
        },
        regexPatterns: ['(?i)(?:court|بعدالت|جج|عدالت)\\s*[:=-]?\\s*([^\n,]+)'],
        keywords: ['court', 'summons', 'notice', 'civil judge', 'senior civil judge', 'karachi east', 'karachi court', 'jawab dawa', 'written statement', 'plaint', 'plaintiff', 'defendant', 'بعدالت', 'سول جج', 'سیشن جج', 'عدالت عالیہ', 'عدالت', 'سمن', 'کراچی'],
        fallbackValue: {
          en: 'Court of Senior Civil Judge, Karachi East',
          ur: 'بعدالت جناب سول جج صاحب، کراچی شرقی',
          sd: 'عدالت سول جج ڪراچي شرقي',
          pa: 'عدالت سول جج کراچی شرقی',
          ps: 'د سول قاضي محکمه، ختیځ کراچۍ',
        },
      },
    ],
    legalTerms: COMMON_LEGAL_GLOSSARY,
    nextSteps: {
      en: [
        'Engage an advocate immediately to draft a Written Statement (Jawab Dawa) before the hearing date.',
        'Never ignore a court summons; non-appearance leads to Ex-Parte proceedings against you.',
        'Obtain certified copies of the suit/plaint and summons for your lawyer.',
      ],
      ur: [
        'تاریخ پیشی سے پہلے وکیل سے رابطہ کر کے جواب دعویٰ (Written Statement) تیار کروائیں۔',
        'عدالتی سمن کو کبھی نظر انداز نہ کریں، غیر حاضری پر یکطرفہ کارروائی (Ex-Parte) ہو سکتی ہے۔',
        'سمن اور دعوے کی تصدیق شدہ کاپیاں اپنے وکیل کے حوالے کریں۔',
      ],
      sd: [
        'پيشي جي تاريخ کان اڳ وڪيل سان رابطو ڪري جواب دعويٰ تيار ڪرايو.',
        'عدالتي سمن کي ڪڏهن به نظرانداز نہ ڪريو، غير حاضريءَ تي يڪطرفه ڪارروائي ٿي سگهي ٿي.',
        'سمن ۽ درخواست جي ڪاپي وڪيل حوالي ڪريو.',
      ],
      pa: [
        'پیشی دی تاریخ توں پہلاں وکیل کولوں جواب دعویٰ تیار کرواؤ۔',
        'عدالتی سمن نوں کبھی نظر انداز نہ کرو، غیر حاضری تے یکطرفہ کارروائی ہو سکدی اے۔',
        'سمن دی کاپی وکیل نوں دوو۔',
      ],
      ps: [
        'د محکمې له غونډې وړاندې له باوري وکیل سره وګورئ او ځوابي عریضه چمتو کړئ.',
        'د محکمې خبرتیا مه ناڅاپي کوئ، د نه حاضریدو په صورت کې خپلسرې (یکطرفه) پرېکړه کېږي.',
        'د محکمې له پاڼو کاپي واخلئ او وکیل ته یې وسپارئ.',
      ],
    },
    sampleText: {
      en: `IN THE COURT OF SENIOR CIVIL JUDGE, KARACHI EAST
SUMMONS / NOTICE UNDER CODE OF CIVIL PROCEDURE 1908
Suit No. 452/2025 — Title: Ali Raza Vs. Zahid Khan

To: Defendant Zahid Khan S/O Shahnawaz, Resident of Karachi.
WHEREAS Plaintiff has filed a suit against you for Permanent Injunction and Declaration.
YOU ARE HEREBY SUMMONED to appear in this Court on 10th February 2026 at 09:00 AM personally or through an Advocate.
TAKE NOTICE that in default of appearance, the case will be heard and decided EX-PARTE in your absence.
GIVEN UNDER MY HAND AND SEAL OF THE COURT ON 20th January 2026.`,
      ur: `بعدالت جناب سول جج صاحب، کراچی شرقی
سمن نوٹس تنبیہ بحوالہ ضابطہ دیوانی 1908
دعویٰ نمبر: 452/2025 — عنوان: علی رضا بمقابلہ زاہد خان

بنام مدعا علیہ: زاہد خان ولد شاہنواز، سکنہ کراچی۔
بذریعہ اس تحریر آپ کو مطلع کیا جاتا ہے کہ مدعی نے آپ کے خلاف دعویٰ استقرار حق دائر کیا ہے۔
آپ کو حکم دیا جاتا ہے کہ مورخہ 10 فروری 2026 بوقت 9:00 بجے صبح بعدالت ہذا اصالتاً یا وکالتاً حاضر ہو کر جواب دعویٰ داخل کریں۔
عدم حاضری کی صورت میں آپ کے خلاف یکطرفہ کارروائی (Ex-Parte) عمل میں لائی جائے گی۔
بتاریخ 20 جنوری 2026۔ دستخط و مہر سول جج۔`,
      sd: `بعدالت سول جج ڪراچي شرقي
دعويٰ نمبر: 452/2025 — علي رضا بمقابلي زاهد خان
بنام مدعا عليه: زاهد خان.
تاريخ پيشي: 10 فيبروري 2026. عدم حاضري تي يڪطرفه ڪارروائي ٿيندي.`,
      pa: `عدالت سول جج کراچی
کیس 452/2025 — علی رضا بمقابلہ زاہد خان
تاریخ پیشی: 10 فروری 2026۔ غیر حاضری تے یکطرفہ کارروائی ہوئے گی۔`,
      ps: `د سول قاضي محکمه، کراچۍ
دوسیه ۴۵۲/۲۰۲۵ — علی رضا په مقابل د زاهد خان
د ورتګ نېټه: ۱۰ فبروري ۲۰۲۶. که حاضر نشئ، خپلسرې فېصله کېږي.`,
    },
  },
  {
    id: 'police_complaint_fir',
    title: {
      en: 'Written Police Complaint / Theft / Dispute Application (تھانہ تحریری درخواست)',
      ur: 'تحریری درخواست تھانہ برائے اندارج مقدمہ / ایف آئی آر',
      sd: 'ٿاڻي جي تحريري درخواست (Police Application)',
      pa: 'تھانے دی تحریری درخواست',
      ps: 'د تاڼې رسمی درخواست (Police Application)',
    },
    statute: 'Code of Criminal Procedure 1898 (Section 154)',
    summaryTemplate: {
      en: 'This document is a formal written application submitted to the Station House Officer (SHO) of a Police Station reporting a cognizable criminal offense for FIR registration.',
      ur: 'یہ دستاویز ایس ایچ او (SHO) تھانہ کے نام لکھی گئی تحریری درخواست ہے جو قابل دست اندازی جرم پر مقدمہ (ایف آئی آر) درج کروانے کے لیے دی جاتی ہے۔',
      sd: 'هيءَ دستاويز ايس ايڇ او ٿاڻي ڏانهن لکيل درخواست آهي.',
      pa: 'یہ درخواست ایس ایچ او تھانہ نوں ایف آئی آر لئی دتی جاندی اے۔',
      ps: 'دا د پولیسو حوزې ته د لومړي رپوټ (FIR) لګولو لپاره مستقیم غوښتنلیک دی.',
    },
    fields: [
      {
        key: 'complainant_name',
        label: {
          en: 'Complainant Name (درخواست دہندہ)',
          ur: 'سائل / مدعی کا نام (Complainant)',
          sd: 'سائل جو نالو',
          pa: 'سائل دا نام',
          ps: 'د عریضه کوونکي نوم',
        },
        regexPatterns: ['(?i)(?:complainant|سائل|مدعی|منکہ)\\s*[:=-]?\\s*([^\n,]+)'],
        keywords: ['complainant', 'سائل', 'کامران', 'ولد'],
        fallbackValue: {
          en: 'Kamran Ahmed S/O Shabbir Ahmed',
          ur: 'کامران احمد ولد شبیر احمد',
          sd: 'ڪامران احمد ولد شبير احمد',
          pa: 'کامران احمد ولد شبیر احمد',
          ps: 'کامران احمد د شبیر احمد زوی',
        },
      },
      {
        key: 'police_station',
        label: {
          en: 'Police Station / Station Officer (متعلقہ تھانہ)',
          ur: 'تھانہ و ضلع (Police Station)',
          sd: 'ٿاڻو ۽ ضلعو',
          pa: 'تھانہ تے ضلع',
          ps: 'د پولیسو تاڼه او حوزه',
        },
        regexPatterns: ['(?i)(?:police|station|تھانہ|ایس ایچ او)\\s*[:=-]?\\s*([^\n,]+)'],
        keywords: ['police station', 'تھانہ', 'شاہ شمس', 'ملتان'],
        fallbackValue: {
          en: 'Police Station Shah Shams, Multan',
          ur: 'تھانہ شاہ شمس، ضلع ملتان',
          sd: 'ٿاڻو شاه شمس، ملتان',
          pa: 'تھانہ شاہ شمس ملتان',
          ps: 'د شاہ شمس تاڼه، ملتان',
        },
      },
      {
        key: 'offense_type',
        label: {
          en: 'Type of Offense / Incident (جرم کی نوعیت)',
          ur: 'جرم / واقعہ کی تفصیل (Offense)',
          sd: 'جرم جي نوعيت',
          pa: 'جرم دی تفصیل',
          ps: 'د انګېزې او پیښې جرم',
        },
        regexPatterns: ['(?i)(?:offense|incident|چوری|ڈکیتی|جرم|واقعہ)\\s*[:=-]?\\s*([^\n,]+)'],
        keywords: ['offense', 'چوری', 'ڈکیتی', 'حملہ', '411'],
        fallbackValue: {
          en: 'House Burglary & Theft under Section 380 PPC',
          ur: 'گھر میں چوری و سرقہ بالبحر تحت دفعہ 380 تعزیرات پاکستان',
          sd: 'گهر ۾ چوري (دفعو 380)',
          pa: 'گھر وچ چوری تحت 380',
          ps: 'په کور کې غلا او د ۳۸۰ مادې سرغړونه',
        },
      },
    ],
    legalTerms: COMMON_LEGAL_GLOSSARY,
    nextSteps: {
      en: [
        'Obtain a stamped acknowledgment receipt with Dairy/Roznamcha Number from the Police Front Desk.',
        'If the SHO refuses to register an FIR for a cognizable offense, approach the Sessions Judge / Justice of Peace under Section 22-A CrPC.',
        'Keep medical reports, CCTV footage, or documentary evidence ready for the Investigation Officer (IO).',
      ],
      ur: [
        'تھانے کے فرنٹ ڈیسک سے درخواست جمع کروانے کی روزنامچہ ڈائری نمبر والی مہر شدہ رسید حاصل کریں۔',
        'اگر ایس ایچ او ایف آئی آر درج نہ کرے تو دفعہ 22-A CrPC کے تحت سیشن جج / جسٹس آف پیس سے رجوع کریں۔',
        'میڈیکل رپورٹ، سی سی ٹی وی فوٹیج یا دیگر شواہد تفتیشی افسر کے حوالے کریں۔',
      ],
      sd: [
        'ٿاڻي جي فرنٽ ڊيسڪ مان ڏائري نمبر واري مهر ٿيل رسيد وٺو.',
        'جيڪڏهن ايس ايڇ او ايف آئي آر داخل نه ڪري ته دفعو 22-A تحت سيشن جج وٽ درخواست ڏيو.',
        'تمام ثبوت، سي سي ٽي وي فوٽيج يا ميڊيڪل رپورٽون تحقيقاتي آفيسر کي ڏيو.',
      ],
      pa: [
        'تھانے دے فرنٹ ڈیسک توں ڈائری نمبر والی رسید لازمی لوو۔',
        'جے ایس ایچ او ایف آئی آر درج نہ کرے تاں 22-A تحت سیشن جج کولوں رجوع کرو۔',
        'تمام ثبوت تے سی سی ٹی وی فوٹیج تفتیشی افسر نوں سانبھو۔',
      ],
      ps: [
        'له فرونټ ډېسک څخه د عریضې مہر شوې د ثبت (روزنامچې) رسید ترلاسه کړئ.',
        'که پولیس د FIR له درج کولو ډډه وکړي، د ۲۲-A مادې له مخې د سیشن جج / عدالت ته غوښتنه ورکړئ.',
        'ټول اړوند ثبوتونه، سي سي ټي وي او اسناد د تحقیقاتي مامور په واک کې ورکړئ.',
      ],
    },
    sampleText: {
      en: `TO THE STATION HOUSE OFFICER (SHO)
POLICE STATION SHAH SHAMS, MULTAN.

Subject: APPLICATION FOR REGISTRATION OF FIR UNDER SECTION 380 PPC FOR HOUSE BURGLARY & THEFT

Respected Sir,
Applicant: Kamran Ahmed S/O Shabbir Ahmed, CNIC: 36302-1234567-9, Resident of House # 88, Multan.

1. That on 18th January 2026 at 02:00 AM, unknown culprits broke into my house and stole cash Rs. 200,000 and gold jewelry.
2. CCTV footage and fingerprints evidence available on spot.
PRAYER: Kindly register FIR under Section 380 PPC immediately and apprehend culprits.

Applicant: Kamran Ahmed
Dated: 18th January 2026.`,
      ur: `بخڈمت جناب ایس ایچ او صاحب
تھانہ شاہ شمس، ضلع ملتان۔

عنوان: درخواست برائے اندراج مقدمہ / ایف آئی آر تحت دفعہ 380 تعزیرات پاکستان بابت چوری

جناب عالی!
سائل: کامران احمد ولد شبیر احمد، شناختی کارڈ: 36302-1234567-9، ساکن مکان 88، ملتان۔

1۔ یہ کہ بتاریخ 18 جنوری 2026 بوقت رات 2:00 بجے نامعلوم چوروں نے سائل کے گھر کا تالا توڑ کر نقد 200,000 روپے اور سونا چوری کر لیا۔
2۔ موقع پر سی سی ٹی وی فوٹیج اور فنگر پرنٹس کے ثبوت موجود ہیں۔
استدعا: استدعا ہے کہ دفعہ 380 تعزیرات پاکستان کے تحت فوری پرچہ درج کر کے ملزمان کو گرفتار کیا جائے۔

سائل: کامران احمد
بتاریخ: 18 جنوری 2026۔`,
      sd: `جناب ايس ايڇ او صاحبان
ٿاڻو شاه شمس ملتان.
عنوان: درخواست برائي ايف آئي آر چوري (دفعو 380).
سائل: ڪامران احمد.
مورخه 18 جنوري تي چوري ٿي. ايف آئي آر داخل ڪئي وڃي.`,
      pa: `جناب ایس ایچ او صاحب
تھانہ شاہ شمس ملتان۔
عنوان: درخواست برائے اندراج ایف آئی آر چوری۔
سائل: کامران احمد۔
فوری ایف آئی آر درج کی جائے۔`,
      ps: `د تاڼې درانه امریت ته
د شاہ شمس تاڼه، ملتان.
موضوع: د ۳۸۰ مادې له مخې د غلا د FIR غوښتنه.
عریضه کوونکی: کامران احمد.
مهرباني وکړئ عاجل FIR درج کړئ.`,
    },
  },
  {
    id: 'rent_agreement',
    title: {
      en: 'Residential / Commercial Tenancy Agreement (کرایہ نامہ)',
      ur: 'رہائشی یا تجارتی معاہدہ کرایہ داری (کرایہ نامہ)',
      sd: 'رهائشي يا تجاريتي معاهدو ڪرايه داري (ڪرايه نامو)',
      pa: 'رہائشی یا تجارتی معاہدہ کرایہ داری (کرایہ نامہ)',
      ps: 'د اوبو او لګښت رهایشي يا تجارتي کرايه ليک',
    },
    statute: 'Islamabad Rent Restriction Ordinance 2001 / Provincial Rent Restriction Acts',
    summaryTemplate: {
      en: 'This document is a legally binding Tenancy Agreement between the Landlord and Tenant for property lease. It establishes rent obligations, deposit conditions, and notice timelines in accordance with Pakistani rent laws.',
      ur: 'یہ دستاویز مالک مکان اور کرایہ دار کے درمیان جائیداد کرائے پر دینے کا قانونی کرایہ نامہ ہے۔ یہ معاہدہ کرائے کی رقم، سیکیورٹی ڈپازٹ اور نوٹس کی مدت کو قانون کے مطابق طے کرتا ہے۔',
      sd: 'هيءَ دستاويز مالڪ مڪان ۽ ڪراييدار وچ ۾ جڳهه ڪرايي تي ڏيڻ جو قانوني معاهدو آهي.',
      pa: 'یہ دستاویز مالک مکان تے کرایہ دار دے وچکار جائیداد کرائے تے دین دا قانونی معاہدہ اے۔',
      ps: 'دا سند د کور د مالک او کرایه دار تر منځ یو رسمي دروند تړون دی چې حقوق بېلوي.',
    },
    fields: [
      {
        key: 'monthly_rent',
        label: {
          en: 'Monthly Rent (ماہانہ کرایہ)',
          ur: 'ماہانہ کرایہ (Monthly Rent)',
          sd: 'ماههوار ڪرايو',
          pa: 'ماہانہ کرایہ',
          ps: 'میاشتنۍ کرایه',
        },
        regexPatterns: ['(?i)(?:rent|کرایہ|ڪرايو|کرایہ)\\s*[:=-]?\\s*(?:rs\\.?|pkr|روپے|روپيا)?\\s*([0-9,]+)', '([0-9,]+)\\s*(?:rupees|روپے|PKR)'],
        keywords: ['rent', 'کرایہ', 'روپے', 'rs', 'pkr', 'ماهانه'],
        fallbackValue: {
          en: 'Rs. 35,000 / month (Sample)',
          ur: '35,000 روپے ماہانہ',
          sd: '35,000 روپيا ماههوار',
          pa: '35,000 روپے ماہانہ',
          ps: '۳۵,۰۰۰ کلدارې هره میاشت',
        },
      },
      {
        key: 'security_deposit',
        label: {
          en: 'Security Deposit (سیکیورٹی ایڈوانس)',
          ur: 'سیکیورٹی ڈپازٹ (ضمانتی رقم)',
          sd: 'سيڪيورٽي ڊپازٽ',
          pa: 'سیکیورٹی ڈپازٹ',
          ps: 'ضمانتي پیسې',
        },
        regexPatterns: ['(?i)(?:security|deposit|سیکیورٹی|ایڈوانس|ضمانت)\\s*[:=-]?\\s*(?:rs\\.?|pkr|روپے)?\\s*([0-9,]+)'],
        keywords: ['security', 'deposit', 'سیکیورٹی', 'ایڈوانس', 'امانت'],
        fallbackValue: {
          en: 'Rs. 70,000 (Refundable)',
          ur: '70,000 روپے (قابل واپسی)',
          sd: '70,000 روپيا (قابل واپسي)',
          pa: '70,000 روپے (قابل واپسی)',
          ps: '۷۰,۰۰۰ کلدارې (بېرته اخیستل کېدونکې)',
        },
      },
      {
        key: 'tenancy_period',
        label: {
          en: 'Tenancy Period (مدت کرایہ داری)',
          ur: 'کرایہ داری کی مدت (Tenancy Duration)',
          sd: 'ڪرايه داري جي مدت',
          pa: 'کرایہ داری دی مدت',
          ps: 'د کرایې موده',
        },
        regexPatterns: ['(?i)(?:period|duration|مدت|سال|ماہ)\\s*[:=-]?\\s*([0-9]+)\\s*(?:months|years|ماہ|سال)'],
        keywords: ['period', 'duration', 'مدت', 'سال', '11 months', '1 year'],
        fallbackValue: {
          en: '11 Months (Renewable)',
          ur: '11 ماہ (قابل تجدید)',
          sd: '11 مهينا (قابل تجديد)',
          pa: '11 ماہ (قابل تجدید)',
          ps: '۱۱ میاشتې (تمدېدېدونکی)',
        },
      },
      {
        key: 'notice_period',
        label: {
          en: 'Notice Period (نوٹس کی مدت)',
          ur: 'نوٹس کی مدت (Notice Period)',
          sd: 'نوٽس جي مدت',
          pa: 'نوٹس دی مدت',
          ps: 'د خبرتیا پورې موده',
        },
        regexPatterns: ['(?i)(?:notice|نوٹس)\\s*[:=-]?\\s*([0-9]+)\\s*(?:days|month|دن|ماہ)'],
        keywords: ['notice', 'نوٹس', '30 days', '1 month', 'ایک ماہ'],
        fallbackValue: {
          en: '1 Month written notice',
          ur: '1 ماہ تحریری نوٹس',
          sd: '1 مهينو تحريري نوٽس',
          pa: '1 ماہ تحریری نوٹس',
          ps: '۱ میاشت لیکلی خبرتیا',
        },
      },
      {
        key: 'property_address',
        label: {
          en: 'Property Address (کرائے کی جگہ)',
          ur: 'پتہ جائیداد (Property Address)',
          sd: 'پتو جڳهه',
          pa: 'پتہ جائیداد',
          ps: 'د ملکیت پته',
        },
        regexPatterns: ['(?i)(?:house|flat|plot|sector|street|پتہ|مکان)\\s*[:=-]?\\s*([^\n,]+)'],
        keywords: ['house', 'flat', 'street', 'sector', 'apartment', 'premises', 'پتہ', 'مکان', 'فلیٹ'],
        fallbackValue: {
          en: 'House # 124, Street 15, Sector G-11/2, Islamabad',
          ur: 'مکان نمبر 124، گلی نمبر 15، سیکٹر G-11/2، اسلام آباد',
          sd: 'مڪان نمبر 124، گهٽي 15، سيڪٽر G-11/2، اسلام آباد',
          pa: 'مکان نمبر 124، گلی 15، سیکٹر G-11/2، اسلام آباد',
          ps: 'کور شمیره ۱۲۴، کوڅه ۱۵، جی ۱۱/۲، اسلام اباد',
        },
      },
      {
        key: 'owner_cnic',
        label: {
          en: 'Owner/Tenant CNIC (شناختی کارڈ)',
          ur: 'شناختی کارڈ نمبر (CNIC Number)',
          sd: 'سڃاڻپ ڪارڊ نمبر',
          pa: 'شناختی کارڈ نمبر',
          ps: 'د مالک/کرایه دار تذکره',
        },
        regexPatterns: ['([0-9]{5}-[0-9]{7}-[0-9]{1})', '([0-9]{13})'],
        keywords: ['cnic', 'شناختی کارڈ', '35201', '61101', '42101', '17301'],
        fallbackValue: {
          en: '61101-1234567-1 (Verified)',
          ur: '61101-1234567-1 (تصدیق شدہ)',
          sd: '61101-1234567-1 (تصديق ٿيل)',
          pa: '61101-1234567-1 (تصدیق شدہ)',
          ps: '61101-1234567-1 (ارزیابي شوی)',
        },
      },
    ],
    legalTerms: COMMON_LEGAL_GLOSSARY,
    nextSteps: {
      en: [
        'Pay all monthly rent payments via crossed bank transfer or demand signed printed receipts.',
        'Submit a copy of CNIC and agreement to the local Police Station for tenant registration.',
        'Keep photos/videos of property condition on move-in day as proof for deposit refund.',
        'Register the agreement with the Rent Controller Islamabad / Punjab / Sindh Rent Registrar.',
      ],
      ur: [
        'کرائے کی ادائیگی ہمیشہ بینک کے ذریعے کریں یا مالک سے دستخط شدہ تحریری رسید حاصل کریں۔',
        'کرایہ دار کا شناختی کارڈ اور معاہدہ کی کاپی فوری طور پر متعلقہ تھانے میں جمع کروائیں۔',
        'مکان میں شفٹ ہوتے وقت کمروں اور فٹنگز کی تصاویر/ویڈیو ثبوت کے طور پر محفوظ رکھیں۔',
        'معاہدہ کرایہ داری کو رینٹ کنٹرولر کے دفتر میں رجسٹرڈ کروا لیں۔',
      ],
      sd: [
        'ڪرايي جي ادائيگي بئنڪ ذريعي ڪريو يا دستخط ٿيل رسيد وٺو.',
        'سڃاڻپ ڪارڊ ۽ ڪرايه نامو پوليس ٿاڻي تي جمع ڪرايو.',
        'جڳهه جي موجوده حالت جون تصويرون وٺي محفوظ رکو.',
        'معاهدي کي رينٽ ڪنٽرولر وٽ رجسٹرڊ ڪرايو.',
      ],
      pa: [
        'کرایہ بینک نال ادا کرو یا رسید حاصل کرو۔',
        'شناختی کارڈ تے معاہدہ تھانے وچ جمع کرواؤ۔',
        'مکان دی حالت دیاں تصویراں سانبھو۔',
        'معاہدہ رینٹ کنٹرولر کول رجسٹر کرو۔',
      ],
      ps: [
        'هره میاشتنۍ کرایه د بېنک له لارې تحویل کړئ او باوري رسید واخلئ.',
        'د تذکرې کاپي او تړون د امنيتي ثبت لپاره نږدې تاڼې ته وسپارئ.',
        'کور ته له ننوتلو وړاندې د ټولو کوټو عکسونه د اسنادو په بڼه وساتئ.',
        'تړون په رسمي ډول له رینټ کنټرولر سره راجسټر کړئ.',
      ],
    },
    sampleText: {
      en: `RESIDENTIAL TENANCY AGREEMENT (ISLAMABAD)
This Tenancy Agreement is executed at Islamabad on 1st July 2026 between:
Landlord: Chaudhry Muhammad Tariq, CNIC: 61101-1234567-1, Resident of House # 124, Sector G-11/2, Islamabad.
AND
Tenant: Syed Ali Raza Shah, CNIC: 35201-9876543-2.

1. PROPERTY: Flat # 4, Block B, Executive Apartments, Sector F-11/3, Islamabad.
2. MONTHLY RENT: Rs. 35,000/- (Rupees Thirty Five Thousand Only) payable before 5th of every month.
3. SECURITY DEPOSIT: Rs. 70,000/- (Two Months Advance Deposit) refundable at tenancy termination.
4. TENANCY DURATION: 11 Months commencing 1st July 2026 to 31st May 2027.
5. NOTICE PERIOD: 1 Month prior written notice required from either party before termination.
6. REGISTRATION: Tenant shall complete police tenant verification within 7 days.`,
      ur: `رہائشی معاہدہ کرایہ داری (اسلام آباد)
یہ معاہدہ کرایہ داری بمقام اسلام آباد بتاریخ 1 جولائی 2026 کے درج ذیل فریقین کے درمیان طے پایا:
مالک مکان: چوہدری محمد طارق، شناختی کارڈ: 61101-1234567-1، ساکن مکان 124، سیکٹر G-11/2، اسلام آباد۔
بمقابلہ
کرایہ دار: سید علی رضا شاہ، شناختی کارڈ: 35201-9876543-2۔

1۔ جائیداد: فلیٹ نمبر 4، بلاک B، ایگزیکٹو اپارٹمنٹس، سیکٹر F-11/3، اسلام آباد۔
2۔ ماہانہ کرایہ: 35,000 روپے (پینتیس ہزار روپے) جو ہر ماہ کی 5 تاریخ سے پہلے واجب الادا ہوگا۔
3۔ سیکیورٹی ڈپازٹ: 70,000 روپے (دو ماہ کی ضمانتی رقم) جو معاہدہ ختم ہونے پر قابل واپسی ہوگی۔
4۔ کرایہ داری کی مدت: 11 ماہ (یکم جولائی 2026 تا 31 مئی 2027)۔
5۔ نوٹس کی مدت: معاہدہ ختم کرنے کے لیے فریقین پر 1 ماہ کا تحریری نوٹس دینا لازم ہوگا۔
6۔ پولیس تصدیق: کرایہ دار 7 دن کے اندر متعلقہ تھانے میں ویریفکیشن کروائے گا۔`,
      sd: `رهائشي معاهدو ڪرايه داري (اسلام آباد)
مالڪ مڪان: چوڌري محمد طارق، سڃاڻپ ڪارڊ: 61101-1234567-1
ڪراييدار: سيد علي رضا شاهه، سڃاڻپ ڪارڊ: 35201-9876543-2

1. جڳهه: فليٽ نمبر 4، بلاڪ B، سيڪٽر F-11/3، اسلام آباد.
2. ماههوار ڪرايو: 35,000 روپيا.
3. سيڪيورٽي ڊپازٽ: 70,000 روپيا (قابل واپسي).
4. مدت: 11 مهينا.
5. نوٽس: 1 مهينو اڳ تحريري نوٽس.`,
      pa: `رہائشی معاہدہ کرایہ داری (اسلام آباد)
مالک مکان: چوہدری محمد طارق، شناختی کارڈ: 61101-1234567-1
کرایہ دار: سید علی رضا شاہ، شناختی کارڈ: 35201-9876543-2

1. جائیداد: فلیٹ 4، بلاک B، سیکٹر F-11/3، اسلام آباد۔
2. ماہانہ کرایہ: 35,000 روپے
3. سیکیورٹی ڈپازٹ: 70,000 روپے
4. مدت: 11 ماہ
5. نوٹس: 1 ماہ قبل نوٹس`,
      ps: `د استوګنې کرایې تړون (اسلام اباد)
مالک: چوهدری محمد طارق، تذکره: 61101-1234567-1
کرایه دار: سید علی رضا شاه، تذکره: 35201-9876543-2

۱. استوګنځی: فلیټ ۴، بلاک بی، ایګزیکټیو اپارتمان، اف ۱۱/۳، اسلام اباد.
۲. میاشتنۍ کرایه: ۳۵,۰۰۰ کلدارې.
۳. سیکیوټي پیسې: ۷۰,۰۰۰ کلدارې.
۴. موده: ۱۱ میاشتې.
۵. د خبرتیا موده: ۱ میاشت وړاندې.`,
    },
  },
  {
    id: 'bayan_e_halfi_affidavit',
    title: {
      en: 'Affidavit / Bayan-e-Halfi (بیان حلفی)',
      ur: 'بیان حلفی / حلفیہ تحریر (Affidavit)',
      sd: 'بيان حلفي (Affidavit)',
      pa: 'بیان حلفی (Affidavit)',
      ps: 'بیان حلفي (قانوني حلف لیک)',
    },
    statute: 'Oaths Act 1873 & Code of Civil Procedure 1908',
    summaryTemplate: {
      en: 'This document is a formal Affidavit / Bayan-e-Halfi made under oath. It serves as sworn evidence of facts, identity, or financial undertaking, carrying legal penalties if false.',
      ur: 'یہ دستاویز قانون کے تحت حلفیہ بیان (بیان حلفی) ہے۔ یہ حلف پر مبنی تحریری شہادت ہے، جس میں غلط بیانی پر تعزیرات پاکستان کے تحت قید کی سزا ہو سکتی ہے۔',
      sd: 'هيءَ دستاويز حلف تي مبني تحريري ثبوت آهي.',
      pa: 'یہ دستاویز حلف تے مبنی تحریری ثبوت اے۔',
      ps: 'دا سند د قانون په رڼا کې د حلف باوري پخلی دی.',
    },
    fields: [
      {
        key: 'deponent_name',
        label: {
          en: 'Deponent Name (حلف دہندہ)',
          ur: 'حلف دہندہ کا نام (Deponent)',
          sd: 'حلف ڏيندڙ جو نام',
          pa: 'حلف دہندہ دا نام',
          ps: 'د بيان کوونکي نوم',
        },
        regexPatterns: ['(?i)(?:deponent|حلف دہندہ|منکہ)\\s*[:=-]?\\s*([^\n,]+)'],
        keywords: ['deponent', 'منکہ', 'ولدیت', 'حلف دہندہ'],
        fallbackValue: {
          en: 'Muhammad Usman Khan S/O Ahmad Khan',
          ur: 'محمد عثمان خان ولد احمد خان',
          sd: 'محمد عثمان خان ولد احمد خان',
          pa: 'محمد عثمان خان ولد احمد خان',
          ps: 'محمد عثمان خان د احمد خان زوی',
        },
      },
      {
        key: 'cnic_number',
        label: {
          en: 'CNIC Number (شناختی کارڈ)',
          ur: 'شناختی کارڈ نمبر (CNIC)',
          sd: 'سڃاڻپ ڪارڊ نمبر',
          pa: 'شناختی کارڈ نمبر',
          ps: 'تذکرې شمیره',
        },
        regexPatterns: ['([0-9]{5}-[0-9]{7}-[0-9]{1})'],
        keywords: ['cnic', 'شناختی کارڈ', '35202'],
        fallbackValue: {
          en: '35202-1122334-5',
          ur: '35202-1122334-5',
          sd: '35202-1122334-5',
          pa: '35202-1122334-5',
          ps: '35202-1122334-5',
        },
      },
      {
        key: 'oath_purpose',
        label: {
          en: 'Purpose of Affidavit (مقصد بیان حلفی)',
          ur: 'بیان حلفی کا مقصد (Purpose)',
          sd: 'بيان حلفي جو مقصد',
          pa: 'بیان حلفی دا مقصد',
          ps: 'د بیان حلفي نیت',
        },
        regexPatterns: ['(?i)(?:purpose|مضمون|بیان|حلفیہ)\\s*[:=-]?\\s*([^\n]+)'],
        keywords: ['purpose', 'مضمون', 'گمشدگی', 'شناخت', 'عدالت'],
        fallbackValue: {
          en: 'Declaration of Sole Legal Heirship & Financial Guarantee',
          ur: 'واحد شرعی وارث ہونے کا اقرار و مالی ضمانت',
          sd: 'واحد شرعي وارث هجڻ جو اقرار',
          pa: 'واحد شرعی وارث ہون دا اقرار',
          ps: 'د یوازیني ریښتیني وارث تصدیق',
        },
      },
    ],
    legalTerms: COMMON_LEGAL_GLOSSARY,
    nextSteps: {
      en: [
        'Ensure the affidavit is printed on Stamp Paper of required official denomination (e.g. Rs. 100 or Rs. 1200).',
        'Sign in presence of an authorized Oath Commissioner or Notary Public and obtain stamp & register entry number.',
        'Attach attested CNIC copy and supporting documents to validate statements made under oath.',
      ],
      ur: [
        'بیان حلفی کو ضروری مالیتی اسٹامپ پیپر (مثلاً 100 روپے یا 1200 روپے) پر پرنٹ کروائیں۔',
        'اووٿ کمشنر یا نوٹری پبلک کے سامنے دستخط کریں اور رجسٹر نمبر و سرکاری مہر لگوائیں۔',
        'ساتھ اپنے شناختی کارڈ اور دیگر تصدیق شدہ دستاویزات منسلک کریں۔',
      ],
      sd: [
        'بيان حلفي کي سرڪاري اسٽامپ پيپر تي پرنٽ ڪريو.',
        'اووٿ ڪمشنر يا نوٽري پبلڪ جي آڏو دستخط ڪري رجسٽر نمبر لڳرايو.',
        'سڃاڻپ ڪارڊ جي تصديق ٿيل ڪاپي نٿي ڪريو.',
      ],
      pa: [
        'بیان حلفی نوں ضروری اسٹامپ پیپر تے پرنٹ کرو۔',
        'اووٿ کمشنر کولوں دستخط تے رجسٹر نمبر لوواؤ۔',
        'شناختی کارڈ دی تصدیق شدہ کاپی لاؤ۔',
      ],
      ps: [
        'حلف پهزمینه او لازمي رسمي سټامپ کاغذ چاپ کړئ.',
        'د اووٿ کمشنر یا نوټري پبلک په شتون کې مهر او لاسلیک وکړئ.',
        'د تذکرې نښلول شوې کاپي او شواهد له پاڼې سره ضمیمه کړئ.',
      ],
    },
    sampleText: {
      en: `AFFIDAVIT (STAMP PAPER RS. 100)
I, Muhammad Usman Khan S/O Ahmad Khan, CNIC: 35202-1122334-5, Muslim, adult, resident of House # 50, Canal Bank Road, Lahore, do hereby solemnly affirm and declare on oath as under:

1. That I am the legal son and one of the legal heirs of deceased Ahmad Khan.
2. That all contents of this affidavit are true and correct to the best of my knowledge and belief, and nothing has been concealed therein.
3. I understand that making a false affidavit is punishable under Section 193 PPC.

DEPONENT: Muhammad Usman Khan
Verified on Oath before Oath Commissioner, Lahore.`,
      ur: `بیان حلفی (اسٹامپ پیپر 100 روپے)
منکہ محمد عثمان خان ولد احمد خان، شناختی کارڈ: 35202-1122334-5، مسلمان، بالغ، ساکن مکان 50، کینال بینک روڈ، لاہور بحلف بیان کرتا ہوں کہ:

1۔ یہ کہ میں متوفی احمد خان کا سگا بیٹا اور شرعی وارث ہوں۔
2۔ یہ کہ اس بیان حلفی کے تمام مندرجات میری بہترین معلومات اور یقین کے مطابق بالکل سچے اور درست ہیں اور کوئی امر پوشیدہ نہیں رکھا گیا۔
3۔ میں اچھی طرح جانتا ہوں کہ جھوٹا بیان حلفی دینا تعزیرات پاکستان کی دفعہ 193 کے تحت قابل سزا جرم ہے۔

حلف دہندہ: محمد عثمان خان
تصدیق شدہ اووٿ کمشنر لاہور۔`,
      sd: `بيان حلفي (اسٽامپ پيپر 100 روپيا)
منڪه محمد عثمان خان ولد احمد خان، سڃاڻپ ڪارڊ: 35202-1122334-5
بحلف بيان ڪريان ٿو ته مان احمد خان جو سگو پٽ آهيان.
منهنجو اهو بيان سچو آهي.

حلف ڏيندڙ: محمد عثمان خان`,
      pa: `بیان حلفی (اسٹامپ پیپر 100 روپے)
میں محمد عثمان خان ولد احمد خان، شناختی کارڈ: 35202-1122334-5
بحلف بیان کردا واں کہ میں متوفی احمد خان دا بیٹا واں۔
ایہہ بیان سچا اے۔

حلف دہندہ: محمد عثمان خان`,
      ps: `بیان حلفي (سټامپ کاغذ ۱۰۰ کلدارې)
زه محمد عثمان خان د احمد خان زوی، تذکره: 35202-1122334-5
په شرعي او قانوني حلف اقرار کوم چې زه د مرحویم احمد خان زوی یم او ټول بیان مې ریښتینی دی.

بيان کوونکی: محمد عثمان خان`,
    },
  },
];
