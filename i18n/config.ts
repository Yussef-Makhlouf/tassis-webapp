import { getRequestConfig } from 'next-intl/server';
import { getLocale } from 'next-intl/server';

export default getRequestConfig(async () => {
  const locale = await getLocale();
  return {
    messages: (await import(`../messages/${locale}.ts`)).default
  };
});

export const locales = ['ar', 'en'] as const
export const defaultLocale = 'ar' as const

export type Locale = (typeof locales)[number]
