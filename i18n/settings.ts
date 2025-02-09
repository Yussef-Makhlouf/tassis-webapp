export const defaultLocale = 'ar';
export const locales = ['ar', 'en'];

export type Locale = (typeof locales)[number];

export const pathnames = {
  '/': '/',
  '/blogs': '/blogs',
  '/about': '/about',
  '/contact': '/contact',
  '/projects': '/projects',
} as const;