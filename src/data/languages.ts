import { LanguageInfo, ProvinceInfo } from '../types';

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  {
    code: 'ur',
    name: 'Urdu',
    nativeName: 'اردو',
    dir: 'rtl',
    flagText: 'اردو',
  },
  {
    code: 'sd',
    name: 'Sindhi',
    nativeName: 'سنڌي',
    dir: 'rtl',
    flagText: 'سنڌي',
  },
  {
    code: 'pa',
    name: 'Punjabi',
    nativeName: 'پنجابی',
    dir: 'rtl',
    flagText: 'پنجابی',
  },
  {
    code: 'ps',
    name: 'Pashto',
    nativeName: 'پښتو',
    dir: 'rtl',
    flagText: 'پښتو',
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
    flagText: 'English',
  },
];

export const PROVINCES: ProvinceInfo[] = [
  {
    code: 'ict',
    name: {
      en: 'Islamabad Capital Territory (ICT)',
      ur: 'وفاقی دارالحکومت اسلام آباد',
      sd: 'وفاقي گاديءَ وارو هنڌ اسلام آباد',
      pa: 'وفاقی دارالحکومت اسلام آباد',
      ps: 'د اسلام اباد پائتخت سيمه',
    },
    capital: {
      en: 'Islamabad',
      ur: 'اسلام آباد',
      sd: 'اسلام آباد',
      pa: 'اسلام آباد',
      ps: 'اسلام اباد',
    },
    forumSuffix: {
      en: 'ICT Courts & Rent Controller Islamabad',
      ur: 'عدالت ہائے و رینٹ کنٹرولر اسلام آباد',
      sd: 'اسلام آباد جون عدالتون ۽ رينٽ ڪنٽرولر',
      pa: 'عدالتاں تے رینٹ کنٹرولر اسلام آباد',
      ps: 'د اسلام اباد محکمې او رینټ کنټرولر',
    },
  },
  {
    code: 'punjab',
    name: {
      en: 'Punjab Province',
      ur: 'صوبہ پنجاب',
      sd: 'پنجاب صوبو',
      pa: 'صوبہ پنجاب',
      ps: 'د پنجاب پښتونخوا ولايت',
    },
    capital: {
      en: 'Lahore',
      ur: 'لاہور',
      sd: 'لاہور',
      pa: 'لاہور',
      ps: 'لاهور',
    },
    forumSuffix: {
      en: 'District Courts & Punjab Ombudsman',
      ur: 'ضلعی عدالتیں و محتسب پنجاب',
      sd: 'ضلعي عدالتون ۽ محتسب پنجاب',
      pa: 'ضلعی عدالتاں تے محتسب پنجاب',
      ps: 'د ضلعې محکمې او د پنجاب محتسب',
    },
  },
  {
    code: 'sindh',
    name: {
      en: 'Sindh Province',
      ur: 'صوبہ سندھ',
      sd: 'صوبو سنڌ',
      pa: 'صوبہ سندھ',
      ps: 'د سندھ ولايت',
    },
    capital: {
      en: 'Karachi',
      ur: 'کراچی',
      sd: 'ڪراچي',
      pa: 'کراچی',
      ps: 'کراچۍ',
    },
    forumSuffix: {
      en: 'District Courts & Legal Aid Society Sindh',
      ur: 'ضلعی عدالتیں و لیگل ایڈ سوسائٹی سندھ',
      sd: 'ضلعي عدالتون ۽ ليگل ايڊ سوسائٽي سنڌ',
      pa: 'ضلعی عدالتاں تے لیگل ایڈ سوسائٹی سندھ',
      ps: 'د ضلعې محکمې او سندھ لیګل ایډ ټولنه',
    },
  },
  {
    code: 'kpk',
    name: {
      en: 'Khyber Pakhtunkhwa (KPK)',
      ur: 'خیبر پختونخوا',
      sd: 'خيبر پختونخوا',
      pa: 'خیبر پختونخوا',
      ps: 'خيبر پښتونخوا',
    },
    capital: {
      en: 'Peshawar',
      ur: 'پشاور',
      sd: 'پشاور',
      pa: 'پشاور',
      ps: 'پېښور',
    },
    forumSuffix: {
      en: 'District Courts & Dispute Resolution Councils KPK',
      ur: 'ضلعی عدالتیں و ڈسپیوٹ ریزولیوشن کونسل خیبر پختونخوا',
      sd: 'ضلعي عدالتون ۽ ڊسپيوٽ ريزوليوشن ڪائونسل',
      pa: 'ضلعی عدالتاں تے ڈسپیوٹ ریزولیوشن کونسل',
      ps: 'جرگې، د شخړو حل کونسلونه او د ضلعې محکمې',
    },
  },
  {
    code: 'balochistan',
    name: {
      en: 'Balochistan Province',
      ur: 'صوبہ بلوچستان',
      sd: 'بلوچستان صوبو',
      pa: 'صوبہ بلوچستان',
      ps: 'د بلوچستان ولايت',
    },
    capital: {
      en: 'Quetta',
      ur: 'کوئٹہ',
      sd: 'ڪوئٽه',
      pa: 'کوئٹہ',
      ps: 'کويټه',
    },
    forumSuffix: {
      en: 'District Courts & Ombudsman Balochistan',
      ur: 'ضلعی عدالتیں و محتسب بلوچستان',
      sd: 'ضلعي عدالتون ۽ محتسب بلوچستان',
      pa: 'ضلعی عدالتاں تے محتسب بلوچستان',
      ps: 'د ضلعې محکمې او محتسب بلوچستان',
    },
  },
];
