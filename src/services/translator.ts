const TRANSLATION_API_URL = 'https://api.mymemory.translated.net/get';

export async function translateText(text: string, sourceLang: string, targetLang: string): Promise<string> {
  try {
    const response = await fetch(
      `${TRANSLATION_API_URL}?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`
    );
    const data = await response.json();
    
    if (data.responseStatus === 200) {
      return data.responseData.translatedText;
    } else {
      throw new Error(data.responseDetails || 'Translation failed');
    }
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
}