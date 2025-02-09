export const defaultLocale = 'ar';
export const locales = ['ar', 'en'] as const;

export type Locale = typeof locales[number];

export const localeNames: Record<Locale, string> = {
  ar: 'العربية',
  en: 'English',
}; 