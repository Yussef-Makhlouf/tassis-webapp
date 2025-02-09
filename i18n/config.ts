export const locales = ['ar', 'en'] as const;
export const defaultLocale = 'ar' as const;

export const pathnames = {
  '/': '/',
  '/blogs': '/blogs',
  '/about': '/about',
  '/contact': '/contact',
  '/projects': '/projects'
} as const;

export type Locale = (typeof locales)[number];