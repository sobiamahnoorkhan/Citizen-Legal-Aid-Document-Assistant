import { DOC_TYPES_DATA, COMMON_LEGAL_GLOSSARY } from '../data/docTypesData';
import { DocumentDiagnosisResult, ExtractedDetail, LanguageCode, LegalTerm } from '../types';

const DOC_TYPE_RELEVANT_TERM_KEYS: Record<string, string[]> = {
  rent_agreement: ['security_deposit', 'notice_period', 'eviction', 'cnic_verification', 'stay_order'],
  nikahnama_marriage: ['nikahnama', 'haq_mehr', 'tafweez_e_talaq', 'khula', 'maintenance_nafqa', 'hizanat'],
  court_summons_notice: ['stay_order', 'written_statement', 'plaint_arzi_dawa', 'ex_parte', 'wakalatnama', 'contempt_of_court'],
  police_complaint_fir: ['fir', 'cognizable_offense', 'bail', 'remand', 'interim_bail'],
  bayan_e_halfi_affidavit: ['bayan_e_halfi', 'power_of_attorney', 'caveat'],
};

export function getRelevantLegalTerms(normalizedText: string, docTypeId?: string): LegalTerm[] {
  const lowerText = normalizedText.toLowerCase();
  const matchedTerms: LegalTerm[] = [];
  const addedKeys = new Set<string>();

  // 1. Add specific relevant keys for known document types
  if (docTypeId && DOC_TYPE_RELEVANT_TERM_KEYS[docTypeId]) {
    const keys = DOC_TYPE_RELEVANT_TERM_KEYS[docTypeId];
    for (const k of keys) {
      const found = COMMON_LEGAL_GLOSSARY.find((item) => item.termKey === k);
      if (found && !addedKeys.has(k)) {
        matchedTerms.push(found);
        addedKeys.add(k);
      }
    }
  }

  // 2. Scan text for any other explicitly mentioned terms in COMMON_LEGAL_GLOSSARY
  for (const item of COMMON_LEGAL_GLOSSARY) {
    if (addedKeys.has(item.termKey)) continue;

    const termKeyClean = item.termKey.replace(/_/g, ' ').toLowerCase();
    const termEn = (item.term.en || '').toLowerCase();
    const termUr = item.term.ur || '';
    const termSd = item.term.sd || '';

    if (
      (termKeyClean && lowerText.includes(termKeyClean)) ||
      (termEn && lowerText.includes(termEn)) ||
      (termUr && normalizedText.includes(termUr)) ||
      (termSd && normalizedText.includes(termSd))
    ) {
      matchedTerms.push(item);
      addedKeys.add(item.termKey);
    }
  }

  // 3. If no specific matched terms, provide default general terms (3 max)
  if (matchedTerms.length === 0) {
    const defaultKeys = ['bayan_e_halfi', 'notice_period', 'cnic_verification'];
    for (const k of defaultKeys) {
      const found = COMMON_LEGAL_GLOSSARY.find((item) => item.termKey === k);
      if (found) matchedTerms.push(found);
    }
  }

  // Limit to at most 6 relevant terms so the UI remains clean and focused
  return matchedTerms.slice(0, 6);
}

export function diagnoseDocument(rawText: string, lang: LanguageCode): DocumentDiagnosisResult {
  const normalizedText = rawText.trim();
  const lowerText = normalizedText.toLowerCase();

  // 1. Determine best matching document type
  let bestMatch = null;
  let maxScore = 0;

  for (const docType of DOC_TYPES_DATA) {
    let score = 0;

    // Direct ID or Title matching
    const titleUr = docType.title.ur || '';
    const titleEn = (docType.title.en || '').toLowerCase();
    if (lowerText.includes(docType.id.toLowerCase()) || (titleEn && lowerText.includes(titleEn))) {
      score += 5;
    }
    if (titleUr && normalizedText.includes(titleUr)) {
      score += 5;
    }

    // High precision domain signature matches
    if (docType.id === 'court_summons_notice') {
      if (
        /summons|court|civil judge|senior civil judge|suit no|ex-parte|jawab dawa|written statement|plaint|plaintiff|defendant|سمن|عدالت|سول جج|مدعی|مدعا علیہ|یکطرفہ|کیس|دعویٰ/i.test(
          normalizedText
        )
      ) {
        score += 10;
      }
    } else if (docType.id === 'nikahnama_marriage') {
      if (/nikah|nikahnama|groom|bride|dower|haq mehr|tafweez|نکاح|نکاح نامہ|دلہا|دلہن|حق مہر|تفویض/i.test(normalizedText)) {
        score += 10;
      }
    } else if (docType.id === 'police_complaint_fir') {
      if (/police|fir|sho|police station|154 crpc|380 ppc|burglary|تھانہ|ایف آئی آر|ایس ایچ او|چوری/i.test(normalizedText)) {
        score += 10;
      }
    } else if (docType.id === 'bayan_e_halfi_affidavit') {
      if (/affidavit|bayan-e-half|bayan-e-halfi|deponent|oath commissioner|sworn|بیان حلفی|حلف/i.test(normalizedText)) {
        score += 10;
      }
    } else if (docType.id === 'rent_agreement') {
      if (/tenancy|rent agreement|landlord|tenant|monthly rent|security deposit|کرایہ نامہ|کرایہ داری|مالک مکان|کرایہ دار/i.test(normalizedText)) {
        score += 10;
      }
    }

    // Check field keywords
    for (const field of docType.fields) {
      for (const kw of field.keywords) {
        if (kw.length >= 3 && lowerText.includes(kw.toLowerCase())) {
          score += 2;
        }
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = docType;
    }
  }

  // If a pre-defined template matched with confidence (maxScore >= 2)
  if (bestMatch && maxScore >= 2) {
    const extractedDetails: ExtractedDetail[] = [];

    for (const fieldDef of bestMatch.fields) {
      let extractedVal = '';
      let isFound = false;

      // Try regex patterns
      for (const patternStr of fieldDef.regexPatterns) {
        try {
          const regex = new RegExp(patternStr, 'iu');
          const match = regex.exec(normalizedText);
          if (match && match[1]) {
            extractedVal = match[1].trim();
            isFound = true;
            break;
          }
        } catch {
          // ignore invalid regex
        }
      }

      // Fallback if not extracted from text
      if (!isFound || !extractedVal) {
        extractedVal = fieldDef.fallbackValue[lang] || fieldDef.fallbackValue.ur || fieldDef.fallbackValue.en;
      }

      extractedDetails.push({
        key: fieldDef.key,
        label: fieldDef.label[lang] || fieldDef.label.ur || fieldDef.label.en,
        value: extractedVal,
        isExtracted: isFound,
      });
    }

    let summary = bestMatch.summaryTemplate[lang] || bestMatch.summaryTemplate.ur || bestMatch.summaryTemplate.en;

    extractedDetails.forEach((detail) => {
      summary = summary.replace(new RegExp(`\\{${detail.key}\\}`, 'g'), detail.value);
    });

    const termsDecoded = getRelevantLegalTerms(normalizedText, bestMatch.id).map((termItem) => ({
      termKey: termItem.termKey,
      term: termItem.term[lang] || termItem.term.ur || termItem.term.en,
      definition: termItem.definition[lang] || termItem.definition.ur || termItem.definition.en,
    }));

    const nextSteps = bestMatch.nextSteps[lang] || bestMatch.nextSteps.ur || bestMatch.nextSteps.en;
    const title = bestMatch.title[lang] || bestMatch.title.ur || bestMatch.title.en;

    const practicalAdviceDict: Record<LanguageCode, string> = {
      ur: 'اہم ہدایت: اس سند کی پڑتال اور قانونی کارروائی سے پہلے تمام کاغذی اور تحریری ثبوت محفوظ رکھیں۔',
      sd: 'اهم هدايت: هن سند جي قانوني پورائيءَ لاءِ تحريري ثبوت محفوظ رکو.',
      pa: 'اہم ہدایت: اس سند دی قانونی کارروائی لئی سارے تحریری ثبوت سنبھال کے رکھو۔',
      ps: 'مهمه لارښوونه: د قانونی طی مراحلو لپاره ټول لیکلي اسناد له ځان سره خوندي وساتئ.',
      en: 'Critical Advice: Maintain written receipts and original copies of all legal notices and documentation.',
    };

    return {
      docTypeId: bestMatch.id,
      title,
      summary,
      extractedDetails,
      nextSteps,
      termsDecoded,
      statuteCitation: bestMatch.statute,
      practicalAdvice: practicalAdviceDict[lang] || practicalAdviceDict.ur,
    };
  }

  // 2. Generic Legal Document Extraction (if text doesn't fit specific pre-canned template)
  const dynamicDetails: ExtractedDetail[] = [];

  // Extract CNIC
  const cnicMatch = normalizedText.match(/\b\d{5}-\d{7}-\d{1}\b/);
  if (cnicMatch) {
    dynamicDetails.push({
      key: 'cnic',
      label: lang === 'en' ? 'Extracted CNIC' : 'اخذ کردہ شناختی کارڈ',
      value: cnicMatch[0],
      isExtracted: true,
    });
  }

  // Extract Dates
  const dateMatch = normalizedText.match(/\b(?:\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|جنوری|فروری|مارچ|اپریل|مئی|جون|جولائی|اگست|ستمبر|اکتوبر|نومبر|دسمبر)\s+\d{4})\b/i);
  if (dateMatch) {
    dynamicDetails.push({
      key: 'doc_date',
      label: lang === 'en' ? 'Document Date' : 'دستاویز کی تاریخ',
      value: dateMatch[0],
      isExtracted: true,
    });
  }

  // Extract Monetary Amounts
  const amountMatch = normalizedText.match(/(?:Rs\.?|PKR|روپے|روپيا)?\s*([0-9,]{3,10})/i);
  if (amountMatch && amountMatch[1] && amountMatch[1] !== '0') {
    dynamicDetails.push({
      key: 'amount',
      label: lang === 'en' ? 'Mentioned Amount' : 'درج شدہ رقم',
      value: `Rs. ${amountMatch[1]}`,
      isExtracted: true,
    });
  }

  if (dynamicDetails.length === 0) {
    dynamicDetails.push({
      key: 'doc_text_len',
      label: lang === 'en' ? 'Document Length' : 'تحریر کا حجم',
      value: `${normalizedText.length} ${lang === 'en' ? 'characters' : 'حروف'}`,
      isExtracted: true,
    });
  }

  const titles: Record<LanguageCode, string> = {
    ur: 'آپلوڈ کردہ قانونی دستاویز / تحریر',
    sd: 'آپلوڊ ٿيل قانوني دستاويز',
    pa: 'آپلوڈ کیتی گئی قانونی دستاویز',
    ps: 'پورته شوې قانوني دوتنه',
    en: 'Uploaded Legal Document Analysis',
  };

  const summaries: Record<LanguageCode, string> = {
    ur: 'آپ کی اپلوڈ کردہ تحریر کا بنیادی قانونی تجزئیہ۔ ذیل میں درج اہم تفصیلات، شرائط اور قانونی رہنمائی فراہم کی گئی ہے۔',
    sd: 'اوھان جي قانوني تحرير جو تجزيو. هيٺيون اهم تفصيلون ۽ رهنمائي ڏسي سگهو ٿا.',
    pa: 'تواڈی تحریر دا قانون جائزہ۔ ہیٹھاں دتی گئی معلومات ملاحظہ فرمائیں۔',
    ps: 'ستاسو د پورته شوې لیکنې قانوني تحلیل. لاندې مهمې پرېکړې او لارښوونې وګورئ.',
    en: 'Legal analysis of your uploaded document text. Review extracted details, rights, and recommended action steps below.',
  };

  const stepsList: Record<LanguageCode, string[]> = {
    ur: [
      'تحریر کے تمام مندرجات اور تمام فریقین کے نام و دستخط کی تصدیق کریں۔',
      'کسی بھی مالی لین دین یا معاہدے کی تحریری رسید اپنے پاس محفوظ رکھیں۔',
      'کسی عدالتی یا قانونی کارروائی سے قبل مستند وکیل سے مشورہ کریں۔',
    ],
    sd: [
      'دستاويز جي سڀني مندرجات ۽ دستخطن جي تصديق ڪريو.',
      'مالي ادائيگي جي رسيد وٺو.',
      'وڪيل سان قانوني مشورو ڪريو.',
    ],
    pa: [
      'دستاویز دے تمام مندرجات تے دستخط ویکھو۔',
      'مالی لین دین دی رسید سنبھال کے رکھو۔',
      'وکیل کولوں قانونی مشورہ لو۔',
    ],
    ps: [
      'د سند د ټولو متنونو او لاسلیکونو تصدیق وکړئ.',
      'د مالي راکړې ورکړې رسمي رسید له ځان سره وساتئ.',
      'د قانوني اقداماتو وړاندې له وکیل سره مشوره وکړئ.',
    ],
    en: [
      'Verify all names, signatures, and clauses mentioned in the document text.',
      'Keep original copies and payment receipts safely in your records.',
      'Consult a licensed advocate prior to executing any legal rights or court filings.',
    ],
  };

  return {
    docTypeId: 'uploaded_text_doc',
    title: titles[lang] || titles.ur,
    summary: summaries[lang] || summaries.ur,
    extractedDetails: dynamicDetails,
    nextSteps: stepsList[lang] || stepsList.ur,
    termsDecoded: getRelevantLegalTerms(normalizedText).map((item) => ({
      termKey: item.termKey,
      term: item.term[lang] || item.term.ur || item.term.en,
      definition: item.definition[lang] || item.definition.ur || item.definition.en,
    })),
    statuteCitation: 'Pakistan Contract Act 1872 / General Legal Provisions',
    practicalAdvice:
      lang === 'en'
        ? 'Notice: Always retain original documents and get agreements notarized on Stamp Paper by an Oath Commissioner.'
        : lang === 'sd'
        ? 'نوٽس: تمام تحريري معاهدن کي نوٽري پبلڪ يا اوٿ ڪمشنر مان تصديق ڪرايو.'
        : lang === 'pa'
        ? 'نوٹس: سارے تحریری معاہداں نوں نوٹری پبلک یا اوتھ کمشنر توں تصدیق کرواؤ۔'
        : lang === 'ps'
        ? 'یادونه: ټول لیکلي تړونونه باید د نوټري پبلک یا د حلف کمیشنر لخوا تصدیق شي.'
        : 'نوٹس: تمام تحریری معاہدوں کو نوٹری پبلک یا اوتھ کمشنر سے تصدیق کروانا قانوناً ضروری ہے۔',
  };
}

