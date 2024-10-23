import React, { useState, useEffect } from 'react';
import { Globe2 } from 'lucide-react';
import { LanguageSelector, languages } from './components/LanguageSelector';
import { TranslationArea } from './components/TranslationArea';
import { TranslationHistory } from './components/TranslationHistory';
import { ThemeToggle } from './components/ThemeToggle';
import { translateText } from './services/translator';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Language, TranslationEntry, Theme } from './types';

function App() {
  const [inputText, setInputText] = useState('');
  const [sourceLang, setSourceLang] = useState<Language>(languages[0]);
  const [targetLang, setTargetLang] = useState<Language>(languages[1]);
  const [translation, setTranslation] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useLocalStorage<TranslationEntry[]>('translationHistory', []);
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light');
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimer, setTypingTimer] = useState<NodeJS.Timeout | null>(null);

  // Theme effect
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const performTranslation = async () => {
      if (!inputText.trim()) {
        setTranslation('');
        return;
      }

      setLoading(true);
      try {
        const result = await translateText(
          inputText,
          sourceLang.value,
          targetLang.value
        );
        setTranslation(result);

        // Only add to history if user has stopped typing
        if (!isTyping) {
          const isDuplicate = history.some(
            entry => entry.originalText === inputText && 
                    entry.sourceLang.value === sourceLang.value && 
                    entry.targetLang.value === targetLang.value
          );

          if (!isDuplicate && inputText.trim().length > 0) {
            const newEntry: TranslationEntry = {
              id: Date.now().toString(),
              originalText: inputText,
              translatedText: result,
              sourceLang,
              targetLang,
              timestamp: Date.now(),
            };
            setHistory(prev => [newEntry, ...prev].slice(0, 10));
          }
        }
      } catch (error) {
        setTranslation('Error de traducción. Por favor, intente nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(performTranslation, 300);
    return () => clearTimeout(timeoutId);
  }, [inputText, sourceLang, targetLang, isTyping]);

  const handleInputChange = (text: string) => {
    setInputText(text);
    setIsTyping(true);
    
    if (typingTimer) {
      clearTimeout(typingTimer);
    }
    
    const newTimer = setTimeout(() => {
      setIsTyping(false);
    }, 1500);
    
    setTypingTimer(newTimer);
  };

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };

  const handleHistorySelect = (entry: TranslationEntry) => {
    setInputText(entry.originalText);
    setSourceLang(entry.sourceLang);
    setTargetLang(entry.targetLang);
    setTranslation(entry.translatedText);
  };

  const handleHistoryDelete = (entryId: string) => {
    setHistory(prev => prev.filter(entry => entry.id !== entryId));
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br transition-colors ${
      theme === 'light' 
        ? 'from-blue-50 to-indigo-50' 
        : 'from-gray-900 to-gray-800'
    } p-4 sm:p-6 md:p-8`}>
      <ThemeToggle theme={theme} onThemeChange={setTheme} />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Globe2 className={`w-8 h-8 ${
              theme === 'light' ? 'text-indigo-600' : 'text-indigo-400'
            }`} />
            <h1 className="text-3xl font-bold dark:text-white text-gray-800">
              Traductor Español-Inglés
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Traduce mientras escribes
          </p>
        </div>

        <div className={`${
          theme === 'light' 
            ? 'bg-white' 
            : 'bg-gray-800'
        } rounded-xl shadow-lg p-6`}>
          <LanguageSelector
            sourceLang={sourceLang}
            targetLang={targetLang}
            onSourceChange={setSourceLang}
            onTargetChange={setTargetLang}
            onSwap={handleSwapLanguages}
            theme={theme}
          />

          <TranslationArea
            inputText={inputText}
            translation={translation}
            onInputChange={handleInputChange}
            loading={loading}
            theme={theme}
          />

          <TranslationHistory 
            history={history}
            onSelect={handleHistorySelect}
            onDelete={handleHistoryDelete}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
}

export default App;