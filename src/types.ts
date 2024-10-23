export interface Language {
  value: string;
  label: string;
}

export interface TranslationEntry {
  id: string;
  originalText: string;
  translatedText: string;
  sourceLang: Language;
  targetLang: Language;
  timestamp: number;
}

export type Theme = 'light' | 'dark';