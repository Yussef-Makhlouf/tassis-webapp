import { locales } from './i18n/settings';
import { defaultLocale } from './i18n/config';
import createMiddleware from 'next-intl/middleware';
// import {locales, defaultLocale} from './app/i18n/settings';
 
export default createMiddleware({
  defaultLocale,
  locales,
  localePrefix: 'always'
});
 
export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};