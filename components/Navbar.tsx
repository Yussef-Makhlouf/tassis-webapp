'use client';
import { Search, Menu, X } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from "next/navigation"
import { Link, usePathname } from "@/i18n/navigation"
import ClientOnly from "./ClientOnly"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { text: t('home'), href: "/", active: pathname === '/' },
    { text: t('about'), href: "/about", active: pathname === '/about' },
    { text: t('projects'), href: "/projects", active: pathname === '/projects' },
    { text: t('blog'), href: "/blogs", active: pathname === '/blogs' },
    { text: t('contact'), href: "/contact", active: pathname === '/contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLanguage = () => {
    const newLocale = locale === 'ar' ? 'en' : 'ar'
    router.push(`/${newLocale}`)
  }

  return (
    <ClientOnly>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}>
        <div className={`container mx-auto px-4 lg:px-6 flex items-center justify-between h-20 ${
          locale === 'ar' ? 'flex-row' : 'flex-row-reverse'
        }`}>
          <Link href="/" className="flex-shrink-0">
            <Image 
              src="/Group.png" 
              alt="Logo" 
              width={180} 
              height={150} 
              className="object-contain w-auto h-[60px] sm:h-[70px] lg:h-[80px] xl:h-[90px]"
            />
          </Link>

          <ul className={`hidden md:flex items-center gap-2 lg:gap-3 border-2 border-[#AA9554] rounded-full px-4 py-3 lg:py-4 flex-wrap justify-center`} 
              dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            {navItems.map((item) => (
              <li key={item.text} className="whitespace-nowrap">
                <Link 
                  href={item.href}
                  className={`text-lg xl:text-xl font-semibold px-4 lg:px-6 py-2.5 lg:py-3 rounded-full transition-all duration-300 ${
                    item.active 
                      ? "bg-[#AA9554] text-[#20284D]" 
                      : "text-[#AA9554] hover:text-[#20284D] hover:bg-[#20284D]/5"
                  }`}
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={toggleLanguage}
              className="border-2 border-[#AA9554] text-[#AA9554] px-4 sm:px-5 py-2 sm:py-2.5 rounded-md text-base font-semibold hover:bg-[#AA9554] hover:text-white transition-all duration-300"
            >
              {locale === 'ar' ? 'EN' : 'عربي'}
            </button>
            
            {/* Mobile Menu Button - Enhanced */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex items-center gap-2 border-2 border-[#AA9554] px-4 py-2.5 rounded-lg text-[#AA9554] hover:bg-[#AA9554] hover:text-white transition-all duration-300"
              aria-label="Toggle menu"
            >
              <span className="text-sm font-medium hidden sm:inline">القائمة</span>
              {isOpen ? 
                <X className="w-5 h-5" /> : 
                <Menu className="w-5 h-5" />
              }
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay - Enhanced */}
        <div 
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 md:hidden ${
            isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`} 
          onClick={() => setIsOpen(false)}
        />

        {/* Mobile Menu Panel - Enhanced */}
        <div 
          className={`fixed top-0 ${locale === 'ar' ? 'right-0' : 'left-0'} h-screen w-[85%] max-w-sm bg-white shadow-2xl ${
            locale === 'ar' ? 'rounded-l-3xl' : 'rounded-r-3xl'
          } transition-transform duration-300 ease-out transform md:hidden ${
            isOpen ? 'translate-x-0' : locale === 'ar' ? 'translate-x-full' : '-translate-x-full'
          }`}
        >
          <div className="p-6 pt-24">
            {/* Close button for mobile menu */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-[#20284D]" />
            </button>
            
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
  )
}
