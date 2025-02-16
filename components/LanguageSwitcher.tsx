'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Locale } from '@/config/i18n';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale() as Locale;

  const handleLanguageChange = () => {
    const newLocale = currentLocale === 'ar' ? 'en' : 'ar';
    if (pathname) {
      const pathSegments = pathname.split('/');
      pathSegments[1] = newLocale;
      router.push(pathSegments.join('/'));
    }
  };

  return (
    <button 
      onClick={handleLanguageChange}
      className="px-4 py-2 rounded-md"
    >
      {currentLocale === 'ar' ? 'English' : 'العربية'}
    </button>
  );
}
