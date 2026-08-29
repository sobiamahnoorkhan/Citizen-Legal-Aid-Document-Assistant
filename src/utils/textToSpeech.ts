import { LanguageCode } from '../types';

let currentUtterance: SpeechSynthesisUtterance | null = null;

export function speakText(text: string, lang: LanguageCode, onEnd?: () => void): boolean {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser');
    return false;
  }

  // Stop any ongoing speech
  window.speechSynthesis.cancel();

  // Strip Markdown / formatting
  const cleanText = text.replace(/[*_#`~[\]()]/g, ' ').replace(/\s+/g, ' ').trim();
  if (!cleanText) return false;

  const utterance = new SpeechSynthesisUtterance(cleanText);
  currentUtterance = utterance;

  // Language mapping for Web Speech API
  const langMap: Record<LanguageCode, string[]> = {
    ur: ['ur-PK', 'ur', 'ar-SA', 'hi-IN'],
    sd: ['sd-PK', 'ur-PK', 'ar-SA', 'hi-IN'],
    pa: ['pa-PK', 'ur-PK', 'hi-IN'],
    ps: ['ps-AF', 'ps-PK', 'ur-PK', 'ar-SA'],
    en: ['en-PK', 'en-GB', 'en-US'],
  };

  const targetLangs = langMap[lang] || ['en-US'];

  // Find matching voice if available
  const voices = window.speechSynthesis.getVoices();
  let matchedVoice = voices.find((v) => targetLangs.some((target) => v.lang.toLowerCase().includes(target.toLowerCase())));

  if (!matchedVoice && (lang === 'ur' || lang === 'sd' || lang === 'pa' || lang === 'ps')) {
    // Fallback to Hindi or Arabic or English if specific Pakistani language voice isn't installed
    matchedVoice = voices.find((v) => v.lang.toLowerCase().includes('hi') || v.lang.toLowerCase().includes('ar') || v.lang.toLowerCase().includes('ur'));
  }

  if (matchedVoice) {
    utterance.voice = matchedVoice;
    utterance.lang = matchedVoice.lang;
  } else {
    utterance.lang = targetLangs[0];
  }

  utterance.rate = 0.9; // Slightly slower for clear legal pronunciation
  utterance.pitch = 1.0;

  if (onEnd) {
    utterance.onend = () => {
      currentUtterance = null;
      onEnd();
    };
    utterance.onerror = () => {
      currentUtterance = null;
      onEnd();
    };
  }

  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopTextToSpeech(): void {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
}

export function isSpeaking(): boolean {
  return 'speechSynthesis' in window && window.speechSynthesis.speaking;
}
