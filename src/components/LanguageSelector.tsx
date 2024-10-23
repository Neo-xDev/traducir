import React from 'react';
import Select from 'react-select';
import { Languages } from 'lucide-react';
import { Language, Theme } from '../types';

interface LanguageSelectorProps {
  sourceLang: Language;
  targetLang: Language;
  onSourceChange: (lang: Language) => void;
  onTargetChange: (lang: Language) => void;
  onSwap: () => void;
  theme: Theme;
}

export const languages: Language[] = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' }
];

const selectStyles = (isDark: boolean) => ({
  control: (base: any) => ({
    ...base,
    background: isDark ? '#374151' : base.background,
    borderColor: isDark ? '#4B5563' : base.borderColor,
  }),
  menu: (base: any) => ({
    ...base,
    background: isDark ? '#374151' : base.background,
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: isDark 
      ? state.isFocused 
        ? '#4B5563' 
        : '#374151'
      : state.isFocused 
        ? base.backgroundColor 
        : base.background,
    color: isDark ? '#E5E7EB' : base.color,
  }),
  singleValue: (base: any) => ({
    ...base,
    color: isDark ? '#E5E7EB' : base.color,
  }),
});

export function LanguageSelector({ 
  sourceLang, 
  targetLang, 
  onSourceChange, 
  onTargetChange, 
  onSwap,
  theme 
}: LanguageSelectorProps) {
  const isDark = theme === 'dark';
  
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex-1">
        <Select
          value={sourceLang}
          onChange={(lang) => lang && onSourceChange(lang)}
          options={languages}
          className="text-sm"
          styles={selectStyles(isDark)}
        />
      </div>
      
      <button
        onClick={onSwap}
        className={`p-2 rounded-full transition-colors ${
          isDark 
            ? 'hover:bg-gray-700 text-indigo-400' 
            : 'hover:bg-gray-100 text-indigo-600'
        }`}
        aria-label="Swap languages"
      >
        <Languages className="w-5 h-5" />
      </button>

      <div className="flex-1">
        <Select
          value={targetLang}
          onChange={(lang) => lang && onTargetChange(lang)}
          options={languages}
          className="text-sm"
          styles={selectStyles(isDark)}
        />
      </div>
    </div>
  );
}