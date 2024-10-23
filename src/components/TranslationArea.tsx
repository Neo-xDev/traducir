import React from 'react';
import { Theme } from '../types';

interface TranslationAreaProps {
  inputText: string;
  translation: string;
  onInputChange: (text: string) => void;
  loading?: boolean;
  theme: Theme;
}

export function TranslationArea({ 
  inputText, 
  translation, 
  onInputChange, 
  loading = false,
  theme 
}: TranslationAreaProps) {
  const isDark = theme === 'dark';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className={`block text-sm font-medium ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Texto Original
        </label>
        <textarea
          value={inputText}
          onChange={(e) => onInputChange(e.target.value)}
          className={`w-full h-48 p-3 rounded-lg resize-none transition-colors border-2 ${
            isDark 
              ? 'bg-gray-700 border-gray-600 text-gray-100 focus:ring-indigo-500 focus:border-indigo-500' 
              : 'bg-gray-50 border-gray-200 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
          }`}
          placeholder="Escribe o pega tu texto aquí..."
        />
      </div>

      <div className="space-y-2">
        <label className={`block text-sm font-medium ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Traducción
        </label>
        <div className={`w-full h-48 p-3 rounded-lg overflow-auto border-2 ${
          isDark 
            ? 'bg-gray-700 border-gray-600 text-gray-100' 
            : 'bg-white border-gray-200 text-gray-900'
        }`}>
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className={`animate-pulse ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Traduciendo...
              </div>
            </div>
          ) : translation ? (
            translation
          ) : (
            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
              La traducción aparecerá aquí...
            </span>
          )}
        </div>
      </div>
    </div>
  );
}