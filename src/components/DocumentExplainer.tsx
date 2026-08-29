import React, { useState, useEffect, useRef } from 'react';
import { DocumentDiagnosisResult, ExtractedDetail, LanguageCode } from '../types';
import { DOC_TYPES_DATA } from '../data/docTypesData';
import { t } from '../data/uiStrings';
import { diagnoseDocument } from '../utils/documentExtractor';
import { speakText, stopTextToSpeech, isSpeaking } from '../utils/textToSpeech';
import { generateSampleDocumentImage } from '../utils/sampleImageGenerator';
import { extractTextFromFile } from '../utils/documentFileReader';
import { printLegalDocument } from '../utils/printHelper';
import { exportComplaintPDF } from '../utils/pdfExporter';
import { useSpeechToText } from '../hooks/useSpeechToText';
import {
  FileCheck2,
  Volume2,
  VolumeX,
  FileText,
  Upload,
  Download,
  Sparkles,
  ShieldCheck,
  BookOpenCheck,
  CheckCircle2,
  AlertCircle,
  Scale,
  Image as ImageIcon,
  X,
  Maximize2,
  Loader2,
  Eye,
  Printer,
  Trash2,
  MapPin,
  Mic,
  MicOff,
  ClipboardPaste,
  FileType,
} from 'lucide-react';

interface DocumentExplainerProps {
  currentLang: LanguageCode;
}

export const DocumentExplainer: React.FC<DocumentExplainerProps> = ({ currentLang }) => {
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text');
  
  // Text Input state
  const [inputText, setInputText] = useState<string>('');
  const [lastDiagnosedText, setLastDiagnosedText] = useState<string>('');
  const [isReadingFile, setIsReadingFile] = useState<boolean>(false);
  const [isAnalyzingText, setIsAnalyzingText] = useState<boolean>(false);
  const [fileReadError, setFileReadError] = useState<string | null>(null);

  // Speech Recognition for text input
  const {
    isListening,
    isSupported,
    errorMessage: speechError,
    startListening,
    stopListening,
  } = useSpeechToText({
    lang: currentLang,
    onTranscriptChange: (text) => {
      setInputText(text);
    },
  });

  // Image Upload state
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string>('image/png');
  const [isAnalyzingImage, setIsAnalyzingImage] = useState<boolean>(false);
  const [imageAnalysisError, setImageAnalysisError] = useState<string | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);

  // Diagnosis State
  const [diagnosisResult, setDiagnosisResult] = useState<DocumentDiagnosisResult | null>(null);
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});

  // Track previous language to update diagnosis when user switches language
  const prevLangRef = useRef<LanguageCode>(currentLang);

  useEffect(() => {
    if (prevLangRef.current !== currentLang) {
      prevLangRef.current = currentLang;
      if (diagnosisResult) {
        if (selectedImage) {
          handleAnalyzeImage();
        } else if (lastDiagnosedText.trim()) {
          handleDiagnoseText(lastDiagnosedText);
        }
      }
    }
  }, [currentLang]);

  // Text Diagnosis Handler
  const handleDiagnoseText = async (textToDiagnose?: string) => {
    const text = textToDiagnose !== undefined ? textToDiagnose : inputText;
    if (!text || !text.trim()) return;

    setLastDiagnosedText(text);
    setIsAnalyzingText(true);
    setImageAnalysisError(null);
    setFileReadError(null);

    try {
      const response = await fetch('/api/explain-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          lang: currentLang,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }

      const data = await response.json();

      const defaultTitles: Record<LanguageCode, string> = {
        ur: 'تحریر سے اخذ کردہ قانونی دستاویز',
        sd: 'متن مان حاصل ٿيل قانوني دستاويز',
        pa: 'تحریر توں اخذ کیتی گئی قانونی دستاویز',
        ps: 'له متن څخه استخراج شوې قانوني دوتنه',
        en: 'Analyzed Legal Document Text',
      };
      const defaultSummaries: Record<LanguageCode, string> = {
        ur: 'تحریر کا قانونی تجزئیہ مکمل ہو گیا ہے۔',
        sd: 'متن جو قانوني تجزيو مڪمل ٿي ويو.',
        pa: 'تحریر دا قانونی جائزہ مکمل ہو گیا اے۔',
        ps: 'د متن قانوني څېړنه بشپړه شوه.',
        en: 'Legal analysis of document text completed.',
      };
      const defaultStatutes: Record<LanguageCode, string> = {
        ur: 'پاکستانی قانون اور آئین',
        sd: 'پاڪستاني قانون ۽ آئين',
        pa: 'پاکستانی قانون تے آئین',
        ps: 'د پاکستان قانون او اساسي قانون',
        en: 'Pakistani Laws & Constitution',
      };
      const defaultAdvice: Record<LanguageCode, string> = {
        ur: 'کسی بھی قانونی کارروائی سے پہلے وکیل سے مشورہ کریں۔',
        sd: 'ڪنهن به قانوني ڪارروائي کان اڳ وڪيل سان مشورو ڪريو.',
        pa: 'کسے وی قانونی کارروائی توں پہلے وکیل نال مشورہ کرو۔',
        ps: 'د کوم قانوني اقدام دمخه له وکیل سره مشوره وکړئ.',
        en: 'Consult a licensed advocate prior to taking formal legal steps.',
      };

      const aiResult: DocumentDiagnosisResult = {
        docTypeId: 'text-scan',
        title: data.title || defaultTitles[currentLang] || defaultTitles.ur,
        summary: data.summary || defaultSummaries[currentLang] || defaultSummaries.ur,
        extractedDetails: Array.isArray(data.extractedDetails)
          ? data.extractedDetails.map((det: any, idx: number) => ({
              key: `ext-${idx}`,
              label: det.label,
              value: det.value,
              isExtracted: !!det.isExtracted,
            }))
          : [],
        nextSteps: Array.isArray(data.nextSteps) ? data.nextSteps : [],
        termsDecoded: Array.isArray(data.termsDecoded)
          ? data.termsDecoded.map((term: any) => ({
              term: term.term,
              definition: term.definition,
              termKey: term.termKey || term.term,
            }))
          : [],
        statuteCitation: data.statuteCitation || defaultStatutes[currentLang] || defaultStatutes.ur,
        practicalAdvice: data.practicalAdvice || defaultAdvice[currentLang] || defaultAdvice.ur,
      };

      setDiagnosisResult(aiResult);
      setCheckedSteps({});
    } catch (err: any) {
      console.warn('AI Text Analysis API notice:', err.message);
      // Fallback: Perform local rule-based extraction
      const fallbackResult = diagnoseDocument(text, currentLang);
      setDiagnosisResult(fallbackResult);
      setCheckedSteps({});
    } finally {
      setIsAnalyzingText(false);
      setTimeout(() => {
        const el = document.getElementById('diagnosis-results');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const handleSampleTextSelect = (docTypeId: string) => {
    const docType = DOC_TYPES_DATA.find((d) => d.id === docTypeId);
    if (docType) {
      const sample = docType.sampleText[currentLang] || docType.sampleText.ur || docType.sampleText.en;
      setInputText(sample);
      handleDiagnoseText(sample);
    }
  };

  const handleDocumentFileUpload = async (file: File) => {
    if (!file) return;
    setIsReadingFile(true);
    setFileReadError(null);
    setImageAnalysisError(null);
    setDiagnosisResult(null);
    setSelectedImage(null);
    setLastDiagnosedText('');

    try {
      const extractedText = await extractTextFromFile(file, currentLang);
      setInputText(extractedText);
      await handleDiagnoseText(extractedText);
    } catch (err: any) {
      setFileReadError(err.message || 'Error reading document file.');
    } finally {
      setIsReadingFile(false);
    }
  };

  const handlePasteFromClipboard = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text && text.trim()) {
          setSelectedImage(null);
          setDiagnosisResult(null);
          setInputText(text);
          await handleDiagnoseText(text);
        }
      }
    } catch {
      // Permission issues fall back to manual paste
    }
  };

  // Unified File Upload Handler for both images and documents
  const handleUnifiedFileUpload = async (file: File) => {
    if (!file) return;
    if (file.type.startsWith('image/')) {
      handleImageFileChange(file);
    } else {
      await handleDocumentFileUpload(file);
    }
  };
  const handleImageFileChange = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setImageAnalysisError('براہ کرم صحیح تصویر کی فائل منتخب کریں (.jpg, .png, .webp)');
      return;
    }
    setImageMimeType(file.type);
    setImageAnalysisError(null);
    setDiagnosisResult(null);
    setLastDiagnosedText('');
    setInputText('');

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setSelectedImage(result);
        handleAnalyzeImage(result, file.type);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSampleImageSelect = (type: 'rent' | 'nikah' | 'court' | 'affidavit' | 'police') => {
    const dataUrl = generateSampleDocumentImage(type);
    setSelectedImage(dataUrl);
    setImageMimeType('image/png');
    setImageAnalysisError(null);

    const sampleTextMap: Record<string, Record<LanguageCode, string>> = {
      rent: {
        en: `RESIDENTIAL TENANCY AGREEMENT (ISLAMABAD)
Landlord: Chaudhry Muhammad Tariq, CNIC: 61101-1234567-1, Resident of House # 124, Sector G-11/2, Islamabad.
Tenant: Syed Ali Raza Shah, CNIC: 35201-9876543-2.

1. PROPERTY: Flat # 4, Block B, Executive Apartments, Sector F-11/3, Islamabad.
2. MONTHLY RENT: Rs. 35,000/- per month.
3. SECURITY DEPOSIT: Rs. 70,000/- refundable security advance.
4. TENANCY DURATION: 11 Months commencing 1st July 2026.
5. NOTICE PERIOD: 1 Month prior written notice before eviction or termination.
6. REGISTRATION: Tenant verification at local Police Station required.`,
        ur: `معاہدہ کرایہ داری برائے رہائشی مکان (اسلام آباد)
مالک مکان: چوہدری محمد طارق، شناختی کارڈ: 61101-1234567-1
کرایہ دار: سید علی رضا شاہ، شناختی کارڈ: 35201-9876543-2

1۔ جائیداد: فلیٹ نمبر 4، بلاک B، ایگزیکٹو اپارٹمنٹس، سیکٹر F-11/3، اسلام آباد۔
2۔ ماہانہ کرایہ: 35,000 روپے ماہانہ۔
3۔ سیکیورٹی ڈپازٹ: 70,000 روپے (ضمانتی رقم)۔
4۔ مدت کرایہ داری: 11 ماہ۔
5۔ نوٹس کی مدت: 1 ماہ تحریری نوٹس۔
6۔ پولیس تصدیق: تھانہ میں کرایہ دار کی اندراجی لازم ہوگی۔`,
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
      nikah: {
        en: `OFFICIAL REGISTERED NIKAHNAMA (MARRIAGE CERTIFICATE)
Union Council: UC 45 Samanabad, Lahore.
Groom: Bilal Ahmad S/O Tanveer Ahmad, CNIC: 35202-1234567-1.
Bride: Sana Fatima D/O Tariq Mahmood, CNIC: 35202-7654321-2.
Haq Mehr (Dower): Rs. 500,000/- (Rs. 200,000 Paid, Rs. 300,000 Deferred).
Tafweez-e-Talaq: Right of divorce delegated to wife under Column 18: Yes.`,
        ur: `رجسٹرڈ نکاح نامہ (یونین کونسل سامن آباد، لاہور)
دولہا: بلال احمد ولد تنویر احمد، شناختی کارڈ: 35202-1234567-1
دلہن: ثناء فاطمہ بنت طارق محمود، شناختی کارڈ: 35202-7654321-2
حق مہر: 500,000 روپے (200,000 روپے معجل ادا شدہ، 300,000 روپے مؤجل)۔
تفویض طلاق (شق نمبر 18): جی ہاں، حق طلاق تفویض کیا گیا ہے۔`,
        sd: `رجسٽرڊ نڪاح نامو (سامن آباد، لاهور)
گهوٽ: بلال احمد ولد تنوير احمد، سڃاڻپ ڪارڊ: 35202-1234567-1
ڪنوار: ثناء فاطمه بنت طارق محمود، سڃاڻپ ڪارڊ: 35202-7654321-2
حق مهر: 500,000 روپيا.
تفويض طلاق (شق 18): جي ها.`,
        pa: `درج شدہ نکاح نامہ (سامن آباد، لاہور)
لاڑا: بلال احمد ولد تنویر احمد، شناختی کارڈ: 35202-1234567-1
کڑی: ثناء فاطمہ بنت طارق محمود، شناختی کارڈ: 35202-7654321-2
حق مہر: 500,000 روپے (200,000 روپے ادا، 300,000 روپے باقی)۔
تفویض طلاق (شق 18): جی ہاں۔`,
        ps: `رسمي ثبت شوی نکاح لیک (سامن اباد، لاهور)
زلمی: بلال احمد د تنویر احمد زوی، تذکره: 35202-1234567-1
ناوې: ثناء فاطمه د طارق محمود لور، تذکره: 35202-7654321-2
حق مهر: ۵۰۰,۰۰0 کلدارې.
د طلاق حق (۱۸ مه ماده): جی هو.`,
      },
      court: {
        en: `IN THE COURT OF SENIOR CIVIL JUDGE, KARACHI EAST
SUMMONS / NOTICE UNDER CODE OF CIVIL PROCEDURE 1908
Suit No. 452/2026 — Title: Ali Raza Vs. Zahid Khan

To Defendant: Zahid Khan S/O Shahnawaz, Resident of PECHS, Karachi.
WHEREAS Plaintiff Ali Raza has filed a suit against you for Permanent Injunction and Declaration.
YOU ARE HEREBY SUMMONED to appear in this Court on 10th February 2026 at 09:00 AM personally or through an Advocate with your Written Statement (Jawab Dawa).
TAKE NOTICE that in default of appearance, the case will be heard and decided EX-PARTE in your absence.
GIVEN UNDER MY HAND AND SEAL OF THE COURT ON 20th January 2026.`,
        ur: `بعدالت جناب سول جج صاحب، کراچی شرقی
سمن و نوٹس تنبیہ بحوالہ ضابطہ دیوانی 1908
دعویٰ نمبر: 452/2026 — عنوان: علی رضا بمقابلہ زاہد خان

بنام مدعا علیہ: زاہد خان ولد شاہنواز، سکنہ پی ای سی ایچ ایس، کراچی۔
بذریعہ اس تحریر آپ کو مطلع کیا جاتا ہے کہ مدعی علی رضا نے آپ کے خلاف دعویٰ استقرار حق و حکم امتناعی دائر کیا ہے۔
آپ کو حکم دیا جاتا ہے کہ مورخہ 10 فروری 2026 بوقت 09:00 بجے صبح بعدالت ہذا اصالتاً یا وکالتاً حاضر ہو کر جواب دعویٰ (Written Statement) داخل کریں۔
عدم حاضری کی صورت میں آپ کے خلاف یکطرفہ کارروائی (Ex-Parte) عمل میں لائی جائے گی۔
بتاریخ 20 جنوری 2026۔ دستخط و مہر سول جج۔`,
        sd: `بعدالت جناب سول جج صاحب، ڪراچي شرقي
سمن ۽ قانوني نوٽس ضابطه ديواني 1908
دعويٰ نمبر: 452/2026 — علي رضا بمقابلي زاهد خان

بنام مدعا عليه: زاهد خان ولد شاهنواز، سڪنه ڪراچي.
مدعي علي رضا پاران توهان خلاف دعويٰ دائر ڪئي وئي آهي.
10 فيبروري 2026 تي صبح 09:00 بجائي وڪيل يا اصالتاً حاضر ٿي جواب دعويٰ داخل ڪريو.
عدم حاضريءَ تي يڪطرفه (Ex-Parte) ڪارروائي ڪئي ويندي.
بتاريخ 20 جنوري 2026.`,
        pa: `بعدالت جناب سول جج، کراچی شرقی
سمن نوٹس تنبیہ بحوالہ ضابطہ دیوانی 1908
دعویٰ نمبر: 452/2026 — علی رضا بمقابلہ زاہد خان

بنام مدعا علیہ: زاہد خان ولد شاہنواز، سکنہ کراچی۔
10 فروری 2026 نوں پیش ہو کے اپنا جواب دعویٰ جمع کرو۔
پیش نہ ہون دی صورت وِچ یکطرفہ (Ex-Parte) کارروائی ہوئے گی۔
بتاریخ 20 جنوری 2026۔`,
        ps: `د د سند ایالت، کراچی شرقی محکمې لخوا رسمی جلب پاڼه
دوسیه نمبر: ۴۵۲/۲۰۲۶ — علی رضا د زاهد خان پر خلاف

مدعا علیه: زاهد خان د شاهنواز زوی، اوسېدونکی د کراچۍ.
تاو سو ته خبر درکول کیږی چی د ۲۰۲۶ کال د فبروري په ۱۰ نېټه سهار ۰۹:۰۰ بجې د خپل ځوابي بیان سره محکمې ته حاضر شئ.
د نه حاضریدو په صورت کې د قضیې پرېکړه په غیابي ډول (یکطرفه) کیږي.
نېټه: ۲۰ جنوري ۲۰۲۶.`,
      },
      affidavit: {
        en: 'SWORN AFFIDAVIT / BAYAN-E-HALFI (STAMP PAPER RS. 100)\nDeponent: Muhammad Usman Khan S/O Ahmad Khan, CNIC: 35202-1122334-5, Resident of House # 50, Lahore.\nI solemnly affirm on oath that I am the sole legal heir of deceased Ahmad Khan. All statements herein are true under Section 193 PPC.',
        ur: 'بیان حلفی (اسٹامپ پیپر 100 روپے، راولپنڈی)\nحلف دہندہ: محمد عثمان خان ولد احمد خان، شناختی کارڈ: 35202-1122334-5، ساکن مکان 50، لاہور۔\nبحلف بیان کرتا ہوں کہ میں متوفی احمد خان کا قانونی وارث ہوں۔ میرے تمام بیانات سچے ہیں اور غلط بیانی پر دفعہ 193 تعزیرات پاکستان لاگو ہوگی۔',
        sd: 'بيان حلفي (اسٽامپ پيپر 100 روپيا)\nحلف ڏيندڙ: محمد عثمان خان ولد احمد خان، سڃاڻپ ڪارڊ: 35202-1122334-5.\nمان بحلف بيان ڪريان ٿو ته مان متوفا جو وارث آهيان.',
        pa: 'بیان حلفی (اسٹامپ پیپر 100 روپے)\nحلف دہندہ: محمد عثمان خان ولد احمد خان، شناختی کارڈ: 35202-1122334-5۔\nبحلف بیان کردا واں کہ میں شرعی وارث واں۔',
        ps: 'بیان حلفي (سټامپ پاڼه ۱۰۰ کلدارې)\nبيان کوونکی: محمد عثمان خان د احمد خان زوی، تذکره: 35202-1122334-5.\nپه حلف اقرار کوم چې زه قانوني وارث یم.',
      },
      police: {
        en: 'APPLICATION FOR REGISTERING POLICE FIR (SECTION 154 CrPC)\nTo: The SHO, Police Station Civil Lines, Quetta.\nComplainant: Kamran Ahmed, CNIC: 54400-1234567-1.\nSubject: Application for FIR regarding theft of mobile phone & motor vehicle on 18th January 2026 under Section 380 PPC. Immediate registration requested.',
        ur: 'درخواست برائے اندراج ایف آئی آر (تھانہ سول لائنز، کوئٹہ)\nبخڈمت جناب ایس ایچ او صاحب، تھانہ سول لائنز کوئٹہ۔\nسائل: کامران احمد، شناختی کارڈ: 54400-1234567-1۔\nمضمون: درخواست برائے اندراج ایف آئی آر چوری (دفعہ 380 تعزیرات پاکستان)۔ مورخہ 18 جنوری کو چوری ہوئی۔ فوراً ایف آئی آر درج کی جائے۔',
        sd: 'درخواست برائي ايف آئي آر چوري (تھانو سول لائينز ڪوئٽه)\nسائل: ڪامران احمد، سڃاڻپ ڪارڊ: 54400-1234567-1.\nمورخه 18 جنوري تي چوري ٿي. ايف آئي آر داخل ڪئي وڃي.',
        pa: 'درخواست برائے اندراج ایف آئی آر (تھانہ سول لائنز کوئٹہ)\nسائل: کامران احمد، شناختی کارڈ: 54400-1234567-1۔\nفوری ایف آئی آر درج کی جائے۔',
        ps: 'د ۳۸۰ مادې له مخې د غلا د FIR غوښتنه (سول لاینز تاڼه، کوېټه)\nعریضه کوونکی: کامران احمد، تذکره: 54400-1234567-1.\nمهرباني وکړئ عاجل FIR درج کړئ.',
      },
    };

    const titleMap: Record<string, Record<LanguageCode, string>> = {
      rent: {
        en: 'Tenancy Deed (معاہدہ کرایہ داری)',
        ur: 'معاہدہ کرایہ داری (Tenancy Deed)',
        sd: 'ڪرايه نامو (Tenancy Deed)',
        pa: 'معاہدہ کرایہ داری (Tenancy Deed)',
        ps: 'د کرایې تړون (Tenancy Deed)',
      },
      nikah: {
        en: 'Nikahnama (نکاح نامہ)',
        ur: 'نکاح نامہ (Nikahnama)',
        sd: 'نڪاح نامو (Nikahnama)',
        pa: 'نکاح نامہ (Nikahnama)',
        ps: 'نکاح لیک (Nikahnama)',
      },
      court: {
        en: 'Court Summons (عدالتی سمن)',
        ur: 'عدالتی سمن (Court Summons)',
        sd: 'عدالتي سمن (Court Summons)',
        pa: 'عدالتی سمن (Court Summons)',
        ps: 'د محکمې جلب (Court Summons)',
      },
      affidavit: {
        en: 'Affidavit (بیان حلفی)',
        ur: 'بیان حلفی (Affidavit)',
        sd: 'بيان حلفي (Affidavit)',
        pa: 'بیان حلفی (Affidavit)',
        ps: 'بیان حلفي (Affidavit)',
      },
      police: {
        en: 'Police Report (تھانہ درخواست)',
        ur: 'تھانہ درخواست (Police Report)',
        sd: 'ٿاڻي درخواست (Police Report)',
        pa: 'تھانہ درخواست (Police Report)',
        ps: 'د پولیسو عریضه (Police Report)',
      },
    };

    const sampleText = sampleTextMap[type]?.[currentLang] || sampleTextMap[type]?.ur || 'قانونی دستاویز نمونہ';
    setLastDiagnosedText(sampleText);
    const fallbackResult = diagnoseDocument(sampleText, currentLang);
    const docTitle = titleMap[type]?.[currentLang] || titleMap[type]?.ur || 'نمونہ تصویری دستاویز';
    setDiagnosisResult({
      ...fallbackResult,
      title: `${docTitle} - ${t('doc.status_badge', currentLang)}`,
    });
  };

  // AI Multimodal Image Analysis via server.ts
  const handleAnalyzeImage = async (overrideImageBase64?: string, overrideMimeType?: string) => {
    const imgData = overrideImageBase64 || selectedImage;
    const mime = overrideMimeType || imageMimeType;
    if (!imgData) return;

    setIsAnalyzingImage(true);
    setImageAnalysisError(null);

    try {
      const response = await fetch('/api/explain-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: imgData,
          mimeType: mime,
          lang: currentLang,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }

      const data = await response.json();

      const defaultImgTitles: Record<LanguageCode, string> = {
        ur: 'تصویر سے اخذ کردہ قانونی دستاویز',
        sd: 'تصوير مان حاصل ٿيل قانوني دستاويز',
        pa: 'تصویر توں اخذ کیتی گئی قانونی دستاویز',
        ps: 'له عکس څخه استخراج شوې قانوني دوتنه',
        en: 'Analyzed Legal Document Image',
      };
      const defaultImgSummaries: Record<LanguageCode, string> = {
        ur: 'تصویر کا قانونی تجزئیہ مکمل ہو گیا ہے۔',
        sd: 'تصوير جو قانوني تجزيو مڪمل ٿي ويو.',
        pa: 'تصویر دا قانونی جائزہ مکمل ہو گیا اے۔',
        ps: 'د عکس قانوني څېړنه بشپړه شوه.',
        en: 'Legal image analysis completed successfully.',
      };
      const defaultStatutes: Record<LanguageCode, string> = {
        ur: 'پاکستانی قانون اور آئین',
        sd: 'پاڪستاني قانون ۽ آئين',
        pa: 'پاکستانی قانون تے آئین',
        ps: 'د پاکستان قانون او اساسي قانون',
        en: 'Pakistani Laws & Constitution',
      };
      const defaultAdvice: Record<LanguageCode, string> = {
        ur: 'کسی بھی قانونی کارروائی سے پہلے وکیل سے مشورہ کریں۔',
        sd: 'ڪنهن به قانوني ڪارروائي کان اڳ وڪيل سان مشورو ڪريو.',
        pa: 'کسے وی قانونی کارروائی توں پہلے وکیل نال مشورہ کرو۔',
        ps: 'د کوم قانوني اقدام دمخه له وکیل سره مشوره وکړئ.',
        en: 'Consult a licensed advocate prior to taking formal legal steps.',
      };

      // Format result into DocumentDiagnosisResult structure
      const aiResult: DocumentDiagnosisResult = {
        docTypeId: 'image-scan',
        title: data.title || defaultImgTitles[currentLang] || defaultImgTitles.ur,
        summary: data.summary || defaultImgSummaries[currentLang] || defaultImgSummaries.ur,
        extractedDetails: Array.isArray(data.extractedDetails)
          ? data.extractedDetails.map((det: any, idx: number) => ({
              key: det.key || `detail_${idx}`,
              label: det.label,
              value: det.value,
              isExtracted: !!det.isExtracted,
            }))
          : [],
        nextSteps: Array.isArray(data.nextSteps) ? data.nextSteps : [],
        termsDecoded: Array.isArray(data.termsDecoded)
          ? data.termsDecoded.map((term: any) => ({
              term: term.term,
              definition: term.definition,
              termKey: term.termKey || term.term,
            }))
          : [],
        statuteCitation: data.statuteCitation || defaultStatutes[currentLang] || defaultStatutes.ur,
        practicalAdvice: data.practicalAdvice || defaultAdvice[currentLang] || defaultAdvice.ur,
      };

      setDiagnosisResult(aiResult);
      setCheckedSteps({});
    } catch (err: any) {
      console.warn('AI Image Analysis API notice:', err.message);
      // Fallback: Perform local intelligent extraction from image title context or last diagnosed text
      const imgContextText = lastDiagnosedText || inputText || 'معاہدہ کرایہ داری یا قانونی سند تصویر۔ کرایہ دار اور مالک مکان کے حقوق و فرائض درج ہیں۔';
      const fallbackResult = diagnoseDocument(imgContextText, currentLang);
      setDiagnosisResult({
        ...fallbackResult,
        title: `${fallbackResult.title} (${currentLang === 'en' ? 'Offline Mode' : 'آف لائن تجزئیہ'})`,
      });

      const offlineNotices: Record<LanguageCode, string> = {
        ur: 'آف لائن موڈ: مقامی قانونی تجزئیہ کامیابی سے فراہم کر دیا گیا ہے۔ (Key Legal Terms Decoded updated)',
        sd: 'آف لائن موڊ: مقامي قانوني تجزيو ڪاميابيءَ سان ملي ويو.',
        pa: 'آف لائن موڈ: مقامی قانونی جائزہ کامیابی نال تیار کر دتا گیا اے۔',
        ps: 'افلاین موډ: سیمه ییز قانوني ځواب په بریالیتوب سره چمتو شو.',
        en: 'Offline Mode Active: Local legal document diagnosis generated successfully.',
      };
      setImageAnalysisError(offlineNotices[currentLang] || offlineNotices.ur);
    } finally {
      setIsAnalyzingImage(false);
      setTimeout(() => {
        const el = document.getElementById('diagnosis-results');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const toggleSpeak = (text: string, idx: number) => {
    if (speakingIndex === idx && isSpeaking()) {
      stopTextToSpeech();
      setSpeakingIndex(null);
    } else {
      setSpeakingIndex(idx);
      speakText(text, currentLang, () => setSpeakingIndex(null));
    }
  };

  const toggleCheckStep = (idx: number) => {
    setCheckedSteps((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const buildFormattedReportText = (res: DocumentDiagnosisResult): string => {
    const parts: string[] = [];
    parts.push(`=== ${res.title} ===\n`);
    parts.push(`【خلاصہ / Summary】\n${res.summary}\n`);

    if (res.extractedDetails && res.extractedDetails.length > 0) {
      parts.push(`【اہم نکات / Key Extracted Details】`);
      res.extractedDetails.forEach((d) => {
        parts.push(`• ${d.label}: ${d.value}`);
      });
      parts.push('');
    }

    if (res.nextSteps && res.nextSteps.length > 0) {
      parts.push(`【اگلے قانونی اقدامات / Next Steps Checklist】`);
      res.nextSteps.forEach((s, i) => {
        parts.push(`${i + 1}. ${s}`);
      });
      parts.push('');
    }

    if (res.termsDecoded && res.termsDecoded.length > 0) {
      parts.push(`【اصطلاحات کی وضاحت / Legal Terms Decoded】`);
      res.termsDecoded.forEach((t) => {
        parts.push(`• ${t.term}: ${t.definition}`);
      });
      parts.push('');
    }

    if (res.statuteCitation || res.practicalAdvice) {
      parts.push(`【متعلقہ قانون و مصلحت / Relevant Statute & Practical Advice】`);
      if (res.statuteCitation) parts.push(`قانون (Statute): ${res.statuteCitation}`);
      if (res.practicalAdvice) parts.push(`مشورہ (Advice): ${res.practicalAdvice}`);
    }

    return parts.join('\n');
  };

  const handlePrint = () => {
    printLegalDocument({
      title: 'پاکستان شہری قانونی امداد پورٹل - تحریری قانونی تجزیہ',
      subtitle: 'Official Legal Document Diagnostic Analysis & Explanation',
      content: diagnosisResult ? buildFormattedReportText(diagnosisResult) : inputText,
      lang: currentLang,
      imageUrl: selectedImage || undefined,
    });
  };

  const handleDownloadPDF = () => {
    const reportText = diagnosisResult
      ? buildFormattedReportText(diagnosisResult)
      : inputText;
    exportComplaintPDF(
      reportText,
      'پاکستان شہری قانونی امداد پورٹل - تحریری قانونی تجزیہ',
      'Citizen_Document_Analysis',
      currentLang,
      'diagnosis-results'
    );
  };

  const handlePrintImage = () => {
    if (!selectedImage) return;
    printLegalDocument({
      title: 'پاکستان شہری قانونی امداد پورٹل - باضابطہ قانونی تصویری دستاویز',
      subtitle: 'Citizen Legal Aid & Document Assistant - Official Copy',
      imageUrl: selectedImage,
      lang: currentLang,
    });
  };

  const handlePrintText = () => {
    if (!inputText.trim()) return;
    printLegalDocument({
      title: 'پاکستان شہری قانونی امداد پورٹل - تحریری قانونی دستاویز',
      subtitle: 'Citizen Legal Aid & Document Assistant - Physical Draft Copy',
      content: inputText,
      lang: currentLang,
    });
  };

  const handleClearAll = () => {
    stopTextToSpeech();
    setInputText('');
    setLastDiagnosedText('');
    setSelectedImage(null);
    setDiagnosisResult(null);
    setImageAnalysisError(null);
    setFileReadError(null);
    setIsReadingFile(false);
    setCheckedSteps({});
    setSpeakingIndex(null);
    setIsAnalyzingImage(false);
    setIsPreviewModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* 1. TOP PAGE HEADER BANNER */}
      <div className="bg-slate-900 backdrop-blur-xl bg-gradient-to-br from-slate-900 via-zinc-900 to-slate-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-amber-500/30 relative overflow-hidden no-print">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-3 bg-amber-500/20 border border-amber-400/30 text-amber-400 rounded-2xl shrink-0">
              <FileCheck2 className="w-6 h-6 text-amber-400" />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-amber-500/15 border border-amber-400/30 text-amber-300 rounded-full text-xs font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {currentLang === 'en'
                    ? 'AI Legal Document Diagnosis'
                    : currentLang === 'sd'
                    ? 'اے آئي قانوني دستاويز تجزيو'
                    : currentLang === 'ps'
                    ? 'د اسنادو قانوني څېړنه'
                    : 'اے آئی قانونی دستاویز تجزیہ'}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {currentLang === 'sd'
                  ? 'دستاويز جي تشريح ڪندڙ'
                  : currentLang === 'en'
                  ? 'Legal Document Explainer'
                  : currentLang === 'ps'
                  ? 'د اسنادو تشریح کوونکی'
                  : 'قانونی دستاویز تشریح کنندہ'}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-300 font-medium leading-relaxed max-w-2xl">
                {currentLang === 'sd'
                  ? 'پنهنجي قانوني دستاويزن جو تصوير يا متن ذريعي آسان تجزيو، اصطلاحن جي فہم ۽ آئيني رهنمائي حاصل ڪريو۔'
                  : currentLang === 'en'
                  ? 'Upload or paste legal documents to receive simplified legal analysis, decoded terms, and next steps.'
                  : currentLang === 'ps'
                  ? 'خپل قانوني اسناد تصویر یا متن پورته کړئ ترڅو اسانه توضیحات او لارښوونې ترلاسه کړئ.'
                  : 'اپنے کسی بھی قانونی معاہدے، نوٹس یا دستاویز کی تصویر اپلوڈ کریں یا متن درج کر کے اس کا آسان قانونی تجزئیہ اور رہنمائی حاصل کریں۔'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
            <button
              type="button"
              onClick={handleClearAll}
              className="px-3.5 py-2 rounded-xl font-bold text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-xs"
              title="ری سیٹ کریں / Clear Workspace"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
              <span>
                {currentLang === 'sd'
                  ? 'صاف ڪريو'
                  : currentLang === 'en'
                  ? 'Clear Workspace'
                  : 'ورک اسپیس صاف کریں'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start no-print">
        {/* LEFT COLUMN: SAMPLES, UPLOADER & TEXT EDITOR */}
        <div className="lg:col-span-5 w-full space-y-5">
          {/* A. SAMPLE LEGAL DOCUMENTS SELECTOR */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-amber-100 text-amber-800 rounded-lg shrink-0">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                </span>
                <div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-900">
                    {t('doc.sample_images_title', currentLang)}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {t('doc.sample_images_desc', currentLang)}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full shrink-0">
                ✨ Presets
              </span>
            </div>

            {/* Clean Sample Pills List */}
            <div className="grid grid-cols-1 gap-2">
              {[
                {
                  id: 'rent' as const,
                  docName: { en: 'Tenancy Deed', ur: 'کرایہ نامہ', sd: 'ڪرايه نامو', pa: 'کرایہ نامہ', ps: 'د کرایې سند' },
                  city: { en: 'Islamabad', ur: 'اسلام آباد', sd: 'اسلام آباد', pa: 'اسلام آباد', ps: 'اسلام آباد' },
                },
                {
                  id: 'nikah' as const,
                  docName: { en: 'Nikahnama Contract', ur: 'نکاح نامہ', sd: 'نڪاح نامو', pa: 'نکاح نامہ', ps: 'د نکاح لیک' },
                  city: { en: 'Lahore', ur: 'لاہور', sd: 'لاہور', pa: 'لاہور', ps: 'لاهور' },
                },
                {
                  id: 'court' as const,
                  docName: { en: 'Court Summons', ur: 'عدالتی سمن', sd: 'عدالتي سمن', pa: 'عدالتی سمن', ps: 'د محکمې احضارپاڼه' },
                  city: { en: 'Karachi', ur: 'کراچی', sd: 'ڪراچي', pa: 'کراچی', ps: 'کراچۍ' },
                },
                {
                  id: 'affidavit' as const,
                  docName: { en: 'Legal Affidavit', ur: 'بیان حلفی', sd: 'بيان حلفي', pa: 'بیان حلفی', ps: 'بیان حلفي' },
                  city: { en: 'Rawalpindi', ur: 'راولپنڈی', sd: 'راولپنڊي', pa: 'راولپنڈی', ps: 'راولپنڈي' },
                },
                {
                  id: 'police' as const,
                  docName: { en: 'Police Application', ur: 'تھانہ درخواست', sd: 'ٿاڻي درخواست', pa: 'تھانہ درخواست', ps: 'د پولیسو غوښتنه' },
                  city: { en: 'Quetta', ur: 'کوئٹہ', sd: 'ڪوئٽه', pa: 'کوئٹہ', ps: 'کوېټه' },
                },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSampleImageSelect(item.id)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-amber-50/80 border border-slate-200 hover:border-amber-300 transition-all flex items-center justify-between gap-2 group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                      <MapPin className="w-3.5 h-3.5 text-amber-700 group-hover:text-black" />
                    </span>
                    <div className="flex flex-col text-left rtl:text-right min-w-0">
                      <span className="text-xs font-bold text-slate-800 group-hover:text-amber-900 font-urdu truncate leading-tight">
                        {item.docName[currentLang] || item.docName.ur}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500 font-urdu leading-tight truncate">
                        {item.city[currentLang] || item.city.ur}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold text-amber-900 bg-amber-100 group-hover:bg-amber-500 group-hover:text-black px-2.5 py-1 rounded-lg transition-all shrink-0">
                    {t('doc.load_btn', currentLang)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* B. UNIFIED LEGAL DOCUMENT FILE UPLOADER */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200 space-y-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-amber-500 text-black rounded-lg shrink-0">
                <Upload className="w-4 h-4 text-black" />
              </span>
              <div>
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-900">
                  {currentLang === 'en'
                    ? 'Upload Document / Image Scan'
                    : currentLang === 'sd'
                    ? 'فائل يا تصوير اپلوڊ ڪريو'
                    : currentLang === 'ps'
                    ? 'سند یا عکس اپلوډ کړئ'
                    : 'فائل یا تصویر اپلوڈ کریں'}
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  {currentLang === 'en'
                    ? 'Supports images (JPG, PNG), PDF, Word, or TXT files'
                    : 'تصویر، پی ڈی ایف، ورڈ یا ٹیکسٹ فائل منتخب کریں'}
                </p>
              </div>
            </div>

            {/* Clean Dropzone */}
            <label className="border-2 border-dashed border-amber-300 hover:border-amber-500 bg-amber-50/40 hover:bg-amber-100/50 rounded-xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 group">
              <div className="w-10 h-10 bg-amber-500 text-black rounded-xl flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <Upload className="w-5 h-5 text-black" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs sm:text-sm font-bold text-slate-800">
                  {currentLang === 'en'
                    ? 'Click or Drag & Drop File Here'
                    : currentLang === 'sd'
                    ? 'فائل اپلوڊ ڪرڻ لاءِ هتي ڪلڪ ڪريو'
                    : currentLang === 'ps'
                    ? 'سند اپلوډ کولو لپاره کلیک وکړئ'
                    : 'فائل یا تصویر اپلوڈ کرنے کے لیے کلک کریں'}
                </p>
                <p className="text-[10px] font-semibold text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded-md inline-block">
                  JPG, PNG, WEBP, PDF, DOC, DOCX, TXT
                </p>
              </div>
              <input
                type="file"
                accept="image/*,.txt,.pdf,.doc,.docx"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUnifiedFileUpload(file);
                }}
                className="hidden"
              />
            </label>

            {isReadingFile && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center justify-center gap-2 text-amber-900 font-bold text-xs animate-pulse">
                <Loader2 className="w-4 h-4 animate-spin text-amber-700" />
                <span>{t('doc.file_reading', currentLang)}</span>
              </div>
            )}

            {fileReadError && (
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 flex items-start gap-2 text-rose-800 text-xs font-semibold">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <p>{fileReadError}</p>
              </div>
            )}

            {imageAnalysisError && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-900 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{imageAnalysisError}</span>
              </div>
            )}
          </div>

          {/* C. IMAGE PREVIEW CARD (If image uploaded/loaded) */}
          {selectedImage && (
            <div className="bg-emerald-50/80 rounded-2xl p-4 border border-emerald-300 space-y-3">
              <div className="relative group w-full h-44 bg-white rounded-xl overflow-hidden border border-emerald-200 flex items-center justify-center p-2">
                <img
                  src={selectedImage}
                  alt="Uploaded Legal Document"
                  className="max-h-full max-w-full object-contain"
                />
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPreviewModalOpen(true)}
                    className="p-2 bg-white text-slate-900 rounded-full hover:bg-slate-100 shadow-md cursor-pointer"
                    title="بڑا کریں"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handlePrintImage}
                    className="p-2 bg-amber-500 text-black rounded-full hover:bg-amber-400 shadow-md cursor-pointer"
                    title="پرنٹ کریں"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedImage(null)}
                    className="p-2 bg-rose-600 text-white rounded-full hover:bg-rose-700 shadow-md cursor-pointer"
                    title="ہٹائیں"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-emerald-700" />
                  <span>تصویری دستاویز (Scan Preview)</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleAnalyzeImage()}
                    disabled={isAnalyzingImage}
                    className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-extrabold text-xs px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    {isAnalyzingImage ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-black" />
                        <span>جانچ جاری ہے...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-black" />
                        <span>{t('doc.analyze_image_btn', currentLang)}</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedImage(null)}
                    className="text-xs font-semibold text-rose-700 hover:text-rose-900 px-2 py-1"
                  >
                    ہٹائیں
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* D. TEXT EDITOR & CONTROLS */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>دستاویز متن (Document Text Editor)</span>
              </label>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePasteFromClipboard}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition-all cursor-pointer shadow-2xs"
                  title="کلپ بورڈ سے پیسٹ کریں"
                >
                  <ClipboardPaste className="w-3.5 h-3.5 text-slate-700" />
                  <span>پیسٹ</span>
                </button>

                <button
                  type="button"
                  onClick={() => (isListening ? stopListening() : startListening(currentLang))}
                  disabled={!isSupported}
                  title="آواز سے ریکارڈ کریں"
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isListening
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
                  }`}
                >
                  {isListening ? (
                    <>
                      <MicOff className="w-3.5 h-3.5" />
                      <span>ریکارڈنگ...</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-3.5 h-3.5 text-amber-700" />
                      <span>مائیک</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {isListening && (
              <div className="bg-rose-50 border border-rose-200 rounded-lg p-2 flex items-center justify-between text-xs text-rose-800">
                <span className="font-bold">مائیکروفون فعال ہے... بولنا جاری رکھیں۔</span>
                <button type="button" onClick={stopListening} className="font-bold bg-rose-200 px-2 py-0.5 rounded text-[10px]">
                  بند کریں
                </button>
              </div>
            )}

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                  e.preventDefault();
                  if (inputText.trim()) handleDiagnoseText();
                }
              }}
              placeholder={t('doc.paste_placeholder', currentLang)}
              rows={6}
              className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-xl p-3.5 text-sm font-sans focus:outline-none focus:border-amber-500 transition-all shadow-inner leading-relaxed"
            />

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              {inputText.trim().length > 0 && (
                <button
                  type="button"
                  onClick={handlePrintText}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-3 py-2 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-700" />
                  <span>پرنٹ متن</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => handleDiagnoseText()}
                disabled={isAnalyzingText || isReadingFile || !inputText.trim()}
                className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer ml-auto"
              >
                {isAnalyzingText ? (
                  <>
                    <Loader2 className="w-4 h-4 text-black animate-spin" />
                    <span>تجزئیہ جاری ہے...</span>
                  </>
                ) : (
                  <>
                    <FileCheck2 className="w-4 h-4 text-black" />
                    <span>{t('btn.diagnose', currentLang)}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DIAGNOSIS & LEGAL ANALYSIS RESULTS */}
        <div className="lg:col-span-7 w-full space-y-5">
          {diagnosisResult ? (
            <div
              id="diagnosis-results"
              className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 space-y-6 animate-fadeIn text-slate-900 printable-area print:p-0 print:border-none"
            >
              {/* 1. Status Badge & Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full font-bold text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>{t('doc.status_badge', currentLang)}</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                    {diagnosisResult.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleDownloadPDF}
                    className="no-print bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-3 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>PDF</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePrint}
                    className="no-print bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs px-3.5 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5 text-black" />
                    <span>{t('btn.print', currentLang)}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="no-print bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs px-2.5 py-2 rounded-xl border border-rose-200 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                  </button>
                </div>
              </div>

              {/* 2. Plain Language Translation Box */}
              <div className="bg-gradient-to-r from-amber-50 via-amber-50/60 to-emerald-50/60 border-r-4 border-amber-500 p-4 sm:p-5 rounded-2xl border border-amber-200/80 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-amber-950 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>{t('doc.plain_translation_title', currentLang)}</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => toggleSpeak(diagnosisResult.summary, 999)}
                    className="no-print text-xs font-bold text-amber-900 bg-white hover:bg-amber-100/80 border border-amber-300 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                  >
                    {speakingIndex === 999 ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
                        <span>{t('btn.stop_audio', currentLang)}</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                        <span>{t('btn.read_aloud', currentLang)}</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
                  {diagnosisResult.summary}
                </p>
              </div>

              {/* 3. Extracted Details Grid */}
              {diagnosisResult.extractedDetails.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                    <BookOpenCheck className="w-4 h-4 text-amber-600" />
                    <span>{t('doc.extracted_details_title', currentLang)}</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {diagnosisResult.extractedDetails.map((detail, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 border border-slate-200 rounded-xl p-3 shadow-2xs hover:border-amber-400 transition-all flex flex-col justify-between"
                      >
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                          {detail.label}
                        </span>
                        <div className="mt-1 flex items-baseline justify-between gap-2">
                          <span className="text-xs sm:text-sm font-bold text-slate-900">
                            {detail.value}
                          </span>
                          {detail.isExtracted ? (
                            <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md shrink-0 border border-amber-300">
                              {t('doc.extracted_tag', currentLang)}
                            </span>
                          ) : (
                            <span className="text-[10px] font-semibold text-slate-600 bg-slate-200 px-2 py-0.5 rounded-md shrink-0">
                              {t('doc.standard_tag', currentLang)}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Next Steps Checklist */}
              {diagnosisResult.nextSteps.length > 0 && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>{t('doc.next_steps_title', currentLang)}</span>
                  </h3>

                  <div className="space-y-2">
                    {diagnosisResult.nextSteps.map((step, idx) => {
                      const isChecked = !!checkedSteps[idx];
                      return (
                        <label
                          key={idx}
                          onClick={() => toggleCheckStep(idx)}
                          className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                            isChecked
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-2xs'
                              : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="mt-0.5 w-4 h-4 text-amber-500 rounded border-slate-300 focus:ring-amber-500 bg-white"
                          />
                          <span className={`text-xs sm:text-sm font-medium leading-relaxed ${isChecked ? 'line-through text-slate-400' : ''}`}>
                            {step}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 5. Legal Terms Decoded Glossary Cards */}
              {diagnosisResult.termsDecoded.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Scale className="w-4 h-4 text-amber-600" />
                    <span>{t('doc.terms_decoded_title', currentLang)}</span>
                  </h3>

                  <div className="grid grid-cols-1 gap-2.5">
                    {diagnosisResult.termsDecoded.map((termObj, idx) => {
                      const isItemSpeaking = speakingIndex === idx;
                      return (
                        <div
                          key={idx}
                          className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 shadow-2xs hover:border-amber-400 transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <h4 className="text-xs sm:text-sm font-bold text-amber-950">
                                {termObj.term}
                              </h4>
                              <button
                                type="button"
                                onClick={() => toggleSpeak(`${termObj.term}. ${termObj.definition}`, idx)}
                                className="text-[10px] font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 border border-amber-300 px-2 py-0.5 rounded-md flex items-center gap-1 cursor-pointer"
                              >
                                {isItemSpeaking ? (
                                  <VolumeX className="w-3 h-3 text-rose-600 animate-pulse" />
                                ) : (
                                  <Volume2 className="w-3 h-3 text-amber-600" />
                                )}
                                <span>{isItemSpeaking ? t('doc.stop_btn', currentLang) : t('doc.listen_btn', currentLang)}</span>
                              </button>
                            </div>
                            <p className="text-xs text-slate-700 leading-relaxed">
                              {termObj.definition}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 6. Legal Context & Citation Footer */}
              <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs sm:text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{t('doc.statutes_title', currentLang)}</span>
                </div>
                <p className="text-xs font-medium text-emerald-400">
                  <strong className="text-amber-400">{t('doc.relevant_statute', currentLang)}</strong> {diagnosisResult.statuteCitation}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {diagnosisResult.practicalAdvice}
                </p>
              </div>
            </div>
          ) : (
            /* READY / PLACEHOLDER STATE ON RIGHT SIDE */
            <div
              id="diagnosis-results"
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col items-center justify-center text-center space-y-5 min-h-[420px]"
            >
              <div className="w-16 h-16 bg-amber-100 border border-amber-300 text-amber-800 rounded-2xl flex items-center justify-center shadow-xs">
                <FileCheck2 className="w-8 h-8 text-amber-600" />
              </div>

              <div className="space-y-1.5 max-w-md">
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  {t('doc.placeholder_title', currentLang)}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                  {t('doc.placeholder_subtitle', currentLang)}
                </p>
              </div>

              {/* Simple Clean Steps Guidance */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl text-left rtl:text-right pt-2">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-black text-xs font-black flex items-center justify-center">
                    1
                  </span>
                  <p className="text-xs font-bold text-slate-800">
                    {currentLang === 'en' ? 'Select or Upload' : 'اپلوڈ یا نمونہ منتخب کریں'}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {currentLang === 'en' ? 'Choose sample deed, photo scan, or file' : 'نمونہ کرایہ نامہ، تصویر یا فائل کا انتخاب کریں'}
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-black text-xs font-black flex items-center justify-center">
                    2
                  </span>
                  <p className="text-xs font-bold text-slate-800">
                    {currentLang === 'en' ? 'Run AI Diagnosis' : 'AI قانونی تجزئیہ'}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {currentLang === 'en' ? 'Click Diagnose to extract legal terms' : 'قانونی اصطلاحات اور نکات کے لیے بٹن دبائیں'}
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-black text-xs font-black flex items-center justify-center">
                    3
                  </span>
                  <p className="text-xs font-bold text-slate-800">
                    {currentLang === 'en' ? 'Get Advice & Export' : 'رہنمائی و پی ڈی ایف'}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {currentLang === 'en' ? 'View next steps, audio guide & PDF' : 'آڈیو وضاحت سنیں اور پی ڈی ایف ڈاؤن لوڈ کریں'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Preview Modal */}
      {isPreviewModalOpen && selectedImage && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 no-print">
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl p-4 overflow-auto border border-slate-200 shadow-2xl">
            <button
              type="button"
              onClick={() => setIsPreviewModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={selectedImage} alt="Expanded Legal Document Preview" className="w-full h-auto rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
};

