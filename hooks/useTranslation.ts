import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';

// نوع البيانات المترجمة
type TranslatedData = {
  [key: string]: string;
};

export function useTranslation() {
  const params = useParams();
  const locale = params?.locale as string;
  const [translations, setTranslations] = useState<TranslatedData>({});
  const [loading, setLoading] = useState(true);

  // تخزين مؤقت للترجمات
  const translationCache: { [key: string]: TranslatedData } = {};

  const translateText = async (text: string): Promise<string> => {
    if (!text) return '';
    if (locale === 'ar') return text;

    // التحقق من وجود الترجمة في التخزين المؤقت
    if (translationCache[text]) {
      return translationCache[text][locale as string];
    }

    try {
      // يمكنك استخدام Google Cloud Translation API أو أي خدمة ترجمة أخرى
      const response = await axios.post('YOUR_TRANSLATION_API_ENDPOINT', {
        text,
        targetLanguage: locale,
        sourceLanguage: 'ar'
      });

      // تخزين الترجمة في الكاش
      translationCache[text] = {
        [locale as string]: response.data.translatedText
      };

      return response.data.translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  };

  // ترجمة كائن كامل
  const translateObject = async <T extends object>(obj: T): Promise<T> => {
    if (locale === 'ar') return obj;

    const translated: any = {};
    
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        translated[key] = await translateText(value);
      } else if (Array.isArray(value)) {
        translated[key] = await Promise.all(
          value.map(async (item) => {
            if (typeof item === 'string') {
              return await translateText(item);
            } else if (typeof item === 'object') {
              return await translateObject(item);
            }
            return item;
          })
        );
      } else if (typeof value === 'object' && value !== null) {
        translated[key] = await translateObject(value);
      } else {
        translated[key] = value;
      }
    }

    return translated as T;
  };

  return {
    translateText,
    translateObject,
    loading
  };
} 