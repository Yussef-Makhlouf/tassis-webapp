'use client';
import { Search, Menu, X } from "lucide-react"
import Image from "next/image"
// import { Link, usePathname } from 'next-intl/client';
import { useState, useEffect } from "react"
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from "next/navigation";
import { Link, usePathname } from "@/i18n/navigation";
import ClientOnly from "./ClientOnly";
// import { useRouter } from 'next-intl/client';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { text: t('home'), href: "/", active: pathname === '/' },
    { text: t('about'), href: "/about", active: pathname === '/about' },
    { text: t('projects'), href: "/projects", active: pathname === '/projects' },
    { text: t('blog'), href: "/blogs", active: pathname === '/blogs' },
    { text: t('contact'), href: "/contact", active: pathname === '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLocale = locale === 'ar' ? 'en' : 'ar';
    router.push(`/${newLocale}`);
  };

  return (
    <ClientOnly>
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
    }`}>
      <div className={`container mx-auto px-4 lg:px-6 flex items-center justify-between h-20 ${
        locale === 'ar' ? 'flex-row' : 'flex-row-reverse'
      }`}>
        {/* Logo */}
        <Link href="/">
          <Image 
            src="/Group.svg" 
            alt="Logo" 
            width={120} 
            height={70} 
            className="object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className={`hidden md:flex items-center gap-1 border border-[#AA9554] rounded-full px-2 py-4`} 
            dir={locale === 'ar' ? 'rtl' : 'ltr'}>
          {navItems.map((item) => (
            <li key={item.text}>
              <Link 
                href={item.href}
                className={`text-lg font-medium px-6 py-3 rounded-full transition-all duration-300 ${
                  item.active 
                    ? "bg-[#20284D] text-[#AA9554]" 
                    : "text-[#20284D] hover:text-[#AA9554] hover:bg-[#20284D]/5"
                }`}
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side Controls */}
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleLanguage}
            className="border border-[#AA9554] text-[#AA9554] px-4 py-2 rounded-md text-sm font-medium hover:bg-[#AA9554] hover:text-white transition-all duration-300"
          >
            {locale === 'ar' ? 'EN' : 'عربي'}
          </button>
          <button className="border border-[#AA9554] p-2 rounded-md text-[#AA9554] hover:bg-[#AA9554] hover:text-white transition-all duration-300">
            <Search className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden border border-[#AA9554] p-2 rounded-md text-[#AA9554] hover:bg-[#AA9554] hover:text-white transition-all duration-300"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`} onClick={() => setIsOpen(false)} />

      {/* Mobile Menu */}
      <div className={`absolute top-20 ${locale === 'ar' ? 'right-0' : 'left-0'} w-4/5 max-w-sm bg-white shadow-xl ${
        locale === 'ar' ? 'rounded-l-2xl' : 'rounded-r-2xl'
      } transition-transform duration-300 ease-in-out transform md:hidden ${
        isOpen ? 'translate-x-0' : locale === 'ar' ? 'translate-x-full' : '-translate-x-full'
      }`}>
        <div className="p-6">
          <ul className="space-y-4" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            {navItems.map((item) => (
              <li key={item.text}>
                <Link 
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block text-lg font-medium px-6 py-4 rounded-xl transition-all duration-300 ${
                    item.active 
                      ? "bg-[#20284D] text-[#AA9554]" 
                      : "text-[#20284D] hover:bg-[#20284D]/5 hover:text-[#AA9554]"
                  }`}
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
    </ClientOnly>
  );
}
