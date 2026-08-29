export type LanguageCode = 'ur' | 'sd' | 'pa' | 'ps' | 'en';

export type ProvinceCode = 'ict' | 'punjab' | 'sindh' | 'kpk' | 'balochistan';

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  nativeName: string;
  dir: 'rtl' | 'ltr';
  flagText: string;
}

export interface ProvinceInfo {
  code: ProvinceCode;
  name: Record<LanguageCode, string>;
  capital: Record<LanguageCode, string>;
  forumSuffix: Record<LanguageCode, string>;
}

export interface TranslatedText {
  en: string;
  ur: string;
  sd: string;
  pa: string;
  ps: string;
}

export interface TranslatedList {
  en: string[];
  ur: string[];
  sd: string[];
  pa: string[];
  ps: string[];
}

export interface LawEntry {
  id: string;
  category: TranslatedText;
  lawName: TranslatedText;
  statuteCitation: string;
  keywords: {
    en: string[];
    ur: string[];
    sd: string[];
    pa: string[];
    ps: string[];
  };
  simpleExplanation: TranslatedText;
  remedySteps: TranslatedList;
  forumToStore: TranslatedText;
  provincialVariations?: Partial<Record<ProvinceCode, TranslatedText>>;
  sampleDocuments?: string[];
}

export interface LegalTerm {
  termKey: string;
  term: TranslatedText;
  definition: TranslatedText;
  legalReference?: string;
}

export interface DocFieldDefinition {
  key: string;
  label: TranslatedText;
  regexPatterns: string[];
  keywords: string[];
  fallbackValue: TranslatedText;
}

export interface DocTypeTemplate {
  id: string;
  title: TranslatedText;
  statute: string;
  summaryTemplate: TranslatedText;
  fields: DocFieldDefinition[];
  legalTerms: LegalTerm[];
  nextSteps: TranslatedList;
  sampleText: Record<LanguageCode, string>;
}

export interface ExtractedDetail {
  key: string;
  label: string;
  value: string;
  isExtracted: boolean;
}

export interface DocumentDiagnosisResult {
  docTypeId: string;
  title: string;
  summary: string;
  extractedDetails: ExtractedDetail[];
  nextSteps: string[];
  termsDecoded: {
    term: string;
    definition: string;
    termKey: string;
  }[];
  statuteCitation: string;
  practicalAdvice: string;
}

export interface ComplaintTemplate {
  id: string;
  category: string;
  subject: TranslatedText;
  recipientDepartment: TranslatedText;
  questions: {
    key: string;
    questionText: TranslatedText;
    placeholder: TranslatedText;
    type: 'text' | 'date' | 'number' | 'textarea' | 'select';
    options?: { label: TranslatedText; value: string }[];
    required?: boolean;
  }[];
  letterBodyTemplate: TranslatedText;
  enclosuresChecklist: TranslatedList;
}

export interface SavedComplaintDraft {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  language: LanguageCode;
  province: ProvinceCode;
  complaintTypeId: string;
  answers: Record<string, string>;
  fullLetterText: string;
}

export interface LawLibraryFlowStep {
  stepNumber: number;
  title: TranslatedText;
  description: TranslatedText;
  iconName?: string;
}

export interface LawLibraryCategory {
  id: string;
  categoryKey: string;
  iconName: string;
  title: TranslatedText;
  lawsCovered: TranslatedText;
  statuteCitation: string;
  rightsBullets: TranslatedList;
  scenario: {
    story: TranslatedText;
    whatLawSays: TranslatedText;
    whatPersonCanDo: TranslatedText;
  };
  flowSteps: LawLibraryFlowStep[];
  filingBox: {
    forumName: TranslatedText;
    whereToFile: TranslatedText;
    requiredDocs: TranslatedList;
    templateId: string;
  };
  relatedGlossaryKeys: string[];
  lastReviewed: string;
}

export type HelplineCategoryKey =
  | 'legal_aid'
  | 'women_child'
  | 'cyber_crime'
  | 'police_rescue'
  | 'consumer_ombudsman'
  | 'labor_human_rights';

export interface HelplineItem {
  id: string;
  name: TranslatedText;
  department: TranslatedText;
  phone: string;
  displayPhone: string;
  alternatePhone?: string;
  category: HelplineCategoryKey;
  jurisdiction: ProvinceCode | 'national';
  description: TranslatedText;
  servicesProvided: TranslatedList;
  operatingHours: TranslatedText;
  costType: TranslatedText; // e.g. "Toll-Free (مفت ٹول فری)" or "Standard Rates"
  isEmergency?: boolean;
  website?: string;
  whatsapp?: string;
  address?: TranslatedText;
}
