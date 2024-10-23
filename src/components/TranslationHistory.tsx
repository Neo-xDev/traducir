import React from 'react';
import { Clock, Edit, Trash2 } from 'lucide-react';
import { TranslationEntry, Theme } from '../types';

interface TranslationHistoryProps {
  history: TranslationEntry[];
  onSelect: (entry: TranslationEntry) => void;
  onDelete: (id: string) => void;
  theme: Theme;
}

export function TranslationHistory({ 
  history, 
  onSelect, 
  onDelete, 
  theme 
}: TranslationHistoryProps) {
  if (history.length === 0) {
    return null;
  }

  const isDark = theme === 'dark';

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement>, 
    entryId: string
  ) => {
    e.stopPropagation();
    onDelete(entryId);
  };

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <Clock className={`w-5 h-5 ${
          isDark ? 'text-indigo-400' : 'text-indigo-600'
        }`} />
        <h2 className={`text-lg font-semibold ${
          isDark ? 'text-gray-200' : 'text-gray-800'
        }`}>
          Historial de Traducciones
        </h2>
      </div>
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {history.map((entry) => (
          <div
            key={entry.id}
            className={`group flex items-start gap-4 p-3 rounded-lg transition-colors cursor-pointer ${
              isDark 
                ? 'hover:bg-gray-700' 
                : 'hover:bg-gray-50'
            }`}
            onClick={() => onSelect(entry)}
          >
            <div className="flex-1">
              <p className={`text-sm ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {entry.originalText}
              </p>
              <p className={`text-sm font-medium ${
                isDark ? 'text-gray-100' : 'text-gray-800'
              }`}>
                {entry.translatedText}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {entry.sourceLang.label} → {entry.targetLang.label}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                className={`opacity-0 group-hover:opacity-100 p-1 rounded transition-all ${
                  isDark 
                    ? 'hover:bg-gray-600 text-gray-400 hover:text-gray-200' 
                    : 'hover:bg-gray-200 text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => onSelect(entry)}
                aria-label="Edit translation"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                className={`opacity-0 group-hover:opacity-100 p-1 rounded transition-all ${
                  isDark 
                    ? 'hover:bg-red-900/50 text-gray-400 hover:text-red-400' 
                    : 'hover:bg-red-100 text-gray-600 hover:text-red-600'
                }`}
                onClick={(e) => handleDelete(e, entry.id)}
                aria-label="Delete translation"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}