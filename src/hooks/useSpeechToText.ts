import { useState, useEffect, useRef, useCallback } from 'react';
import { LanguageCode } from '../types';

export interface UseSpeechToTextOptions {
  lang?: LanguageCode | string;
  onTranscriptChange?: (text: string, isFinal: boolean) => void;
  onEnd?: () => void;
  onError?: (error: string) => void;
}

export const useSpeechToText = (options: UseSpeechToTextOptions = {}) => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [interimTranscript, setInterimTranscript] = useState<string>('');
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
    }
  }, []);

  const getLangCode = (lang?: LanguageCode | string): string => {
    if (!lang) return 'ur-PK';
    const langMap: Record<string, string> = {
      ur: 'ur-PK',
      sd: 'ur-PK',
      pa: 'pa-PK',
      ps: 'ps-PK',
      en: 'en-US',
    };
    return langMap[lang] || lang;
  };

  const startListening = useCallback(
    (customLang?: LanguageCode | string) => {
      setErrorMessage(null);
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (!SpeechRecognition) {
        setIsSupported(false);
        const err = 'آواز ریکارڈنگ کی سہولت اس براؤزر میں دستیاب نہیں ہے۔';
        setErrorMessage(err);
        options.onError?.(err);
        return;
      }

      try {
        if (recognitionRef.current) {
          recognitionRef.current.abort();
        }

        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;

        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = getLangCode(customLang || options.lang);

        recognition.onstart = () => {
          setIsListening(true);
          setInterimTranscript('');
        };

        recognition.onresult = (event: any) => {
          let currentFinal = '';
          let currentInterim = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            if (result.isFinal) {
              currentFinal += result[0].transcript + ' ';
            } else {
              currentInterim += result[0].transcript;
            }
          }

          if (currentFinal) {
            setTranscript((prev) => {
              const newText = prev ? `${prev} ${currentFinal}` : currentFinal;
              options.onTranscriptChange?.(newText, true);
              return newText;
            });
          }

          setInterimTranscript(currentInterim);
          if (currentInterim && options.onTranscriptChange) {
            setTranscript((prev) => {
              const fullText = prev ? `${prev} ${currentInterim}` : currentInterim;
              options.onTranscriptChange?.(fullText, false);
              return prev; // keep state as pure final
            });
          }
        };

        recognition.onerror = (event: any) => {
          console.warn('Speech recognition error:', event.error);
          let userMsg = 'آواز ریکارڈ کرنے میں دشواری پیش آئی۔';
          if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            userMsg = 'مائیکروفون کی اجازت نہیں ملی۔ براہ کرم براؤزر میں مائیک کی اجازت دیں۔';
          } else if (event.error === 'no-speech') {
            userMsg = 'کوئی آواز محسوس نہیں ہوئی۔ دوبارہ بولیں۔';
          }
          setErrorMessage(userMsg);
          setIsListening(false);
          options.onError?.(userMsg);
        };

        recognition.onend = () => {
          setIsListening(false);
          setInterimTranscript('');
          options.onEnd?.();
        };

        recognition.start();
      } catch (err: any) {
        console.error('Failed to start speech recognition:', err);
        setIsListening(false);
        setErrorMessage('ریکارڈنگ شروع نہیں ہو سکی۔');
      }
    },
    [options]
  );

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
    setErrorMessage(null);
  }, []);

  return {
    isListening,
    transcript,
    interimTranscript,
    isSupported,
    errorMessage,
    startListening,
    stopListening,
    resetTranscript,
    setTranscript,
  };
};
