import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { LanguageCode } from '../types';

// Set worker source for pdfjs-dist
if (typeof window !== 'undefined' && pdfjsLib.GlobalWorkerOptions) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
}

export async function extractTextFromFile(file: File, lang: LanguageCode): Promise<string> {
  const fileName = file.name.toLowerCase();

  const errorMessageMap: Record<LanguageCode, { unreadable: string; scannedPdf: string; unsupported: string }> = {
    ur: {
      unreadable: 'فائل سے متن حاصل کرنے میں ناکامی۔ اگر یہ تصویر یا سکین شدہ فائل ہے تو "تصویر اپلوڈ کریں" کا آپشن استعمال کریں۔',
      scannedPdf: 'یہ پی ڈی ایف (PDF) ایک سکین شدہ تصویر لگتی ہے جس میں قابلِ انتخاب متن نہیں ہے۔ براہ کرم "تصویر اپلوڈ کریں" کا آپشن استعمال کریں یا متن خود پیسٹ کریں۔',
      unsupported: 'غیر معاوضہ فائل فارمیٹ۔ براہ کرم .txt, .docx, یا .pdf فائل اپلوڈ کریں۔',
    },
    sd: {
      unreadable: 'فائل مان متن پڙهڻ ۾ ناڪامي. اگر اها اسڪين ٿيل تصوير آهي ته "تصوير اپلوڊ" اختيار استعمال ڪريو.',
      scannedPdf: 'هي PDF هڪ اسڪين ٿيل تصوير لڳي ٿي جنهن ۾ متن شامل ناهي. مهرباني ڪري "تصوير اپلوڊ" اختيار استعمال ڪريو يا متن پيسٽ ڪريو.',
      unsupported: 'غير مدعو فائل فارميٽ. مهرباني ڪري .txt, .docx, يا .pdf فائل چونڊيو.',
    },
    pa: {
      unreadable: 'فائل توں متن پڑھن وچ ناکامی۔ اگر ایہہ سکین کیتی تصویر اے تے "تصویر اپلوڈ" ورتو۔',
      scannedPdf: 'ایہہ پی ڈی ایف (PDF) سکین شدہ تصویر اے جس وچ تحریر شامل نہیں اے۔ براہ کرم "تصویر اپلوڈ" ورتو یا متن پیسٹ کرو۔',
      unsupported: 'غیر معاوضہ فائل فارمیٹ۔ براہ کرم .txt, .docx, یا .pdf فائل ورتو۔',
    },
    ps: {
      unreadable: 'له دوتنې څخه د متن په لوستلو کې ناکامي. که دا سکین شوی عکس وي نو د عکس پورته کولو اختیار وکاروئ.',
      scannedPdf: 'دا PDF فایل سکین شوی عکس دی چې لیکلی متن نه لري. مهرباني وکړئ د عکس پورته کولو اختیار وکاروئ یا متن پېسټ کړئ.',
      unsupported: 'غیر ملاتړ شوی فایل فارمیټ. مهرباني وکړئ .txt, .docx, یا .pdf دوتنه پورته کړئ.',
    },
    en: {
      unreadable: 'Failed to extract text from file. If this is a scanned document, please use the Photo/Image Uploader tab.',
      scannedPdf: 'This PDF appears to be a scanned image with no selectable text. Please use the "Upload Photo" tab or paste text manually.',
      unsupported: 'Unsupported file format. Please upload a .txt, .docx, or .pdf file.',
    },
  };

  const msgs = errorMessageMap[lang] || errorMessageMap.ur;

  if (fileName.endsWith('.txt')) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const res = e.target?.result as string;
        if (res && res.trim()) {
          resolve(res.trim());
        } else {
          reject(new Error(msgs.unreadable));
        }
      };
      reader.onerror = () => reject(new Error(msgs.unreadable));
      reader.readAsText(file);
    });
  }

  if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      const extracted = result.value ? result.value.trim() : '';
      if (!extracted) {
        throw new Error(msgs.unreadable);
      }
      return extracted;
    } catch {
      throw new Error(msgs.unreadable);
    }
  }

  if (fileName.endsWith('.pdf')) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str || '')
          .join(' ');
        fullText += pageText + ' ';
      }
      const trimmed = fullText.trim();
      if (!trimmed || trimmed.length < 5) {
        throw new Error(msgs.scannedPdf);
      }
      return trimmed;
    } catch (err: any) {
      if (err && err.message && (err.message.includes('PDF') || err.message.includes('تصویر') || err.message.includes('scanned'))) {
        throw err;
      }
      throw new Error(msgs.scannedPdf);
    }
  }

  throw new Error(msgs.unsupported);
}
