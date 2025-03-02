'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import ClientOnly from './ClientOnly';

const socialLinks = [
  { icon: '/Facebook.svg', name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61573462054108' },
  { icon: '/Instagram.svg', name: 'Instagram', url: 'https://www.instagram.com/tasisalbina' },
  { icon: '/Twitter Bird.svg', name: 'Twitter', url: 'https://x.com/tasisalbina' },
  { icon: '/TikTok.svg', name: 'TikTok', url: 'https://www.tiktok.com/@tasisalbina' },
  { icon: '/snap.svg', name: 'snap', url: 'https://www.snapchat.com/add/tasisalbina' }
];

const quickLinks = [
  { text: 'nav.home', href: '/' },
  { text: 'nav.projects', href: '/projects' },
  { text: 'nav.about', href: '/about' },
  { text: 'nav.contact', href: '/contact' }
];

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(t('footer.emailError'));
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://tasis-al-bina.onrender.com/newsletter/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      setIsModalOpen(true);
      setEmail('');
    } catch (error) {
      setError(t('footer.subscribeError'));
    } finally {
      setIsSubmitting(false);
    }
  };



  const directionClass = locale === 'ar' ? 'text-right' : 'text-left';

  return (
    <ClientOnly>
    <footer className="bg-[#20284D] py-16 text-[#AA9554]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold mb-8">{t('footer.newsletter')}</h3>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0 max-w-2xl mx-auto">
            <div className="w-full sm:w-auto flex flex-col sm:flex-row border-2 border-[#AA9554] rounded-full overflow-hidden">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('footer.emailPlaceholder')}
                className={`w-full sm:w-96 bg-transparent text-lg text-[#99999A] px-6 py-4 focus:outline-none ${directionClass}`}
              />
              <button 
                type="submit"
                className="w-full sm:w-auto bg-[#AA9554] text-[#20284D] px-12 py-4 font-bold hover:bg-[#8B7B45] transition-all duration-300"
              >
                {t('footer.subscribe')}
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>

        {/* Success Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl text-center relative max-w-md w-full mx-4">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
              <Image 
                src="/curved/check.svg"	
                alt="Success" 
                width={60} 
                height={60} 
                className="mx-auto mb-4"
              />
              <h3 className="text-2xl font-bold text-[#20284D] mb-2">{t('footer.thankYou')}</h3>
              <p className="text-gray-600">{t('footer.subscribeSuccess')}</p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & Description */}
          <div className={directionClass}>
            <Image
              src="/Group.svg"
              alt={t('footer.companyName')}
              width={242}
              height={221}
              className={`mb-8 mx-auto ${locale === 'ar' ? 'lg:mr-0' : 'lg:ml-0'}`}
            />
            <h4 className="text-2xl font-bold mb-4">{t('footer.companyName')}</h4>
            <p className="text-lg leading-8 opacity-90">
              {t('footer.companyDescription')}
            </p>
          </div>

          {/* Quick Links */}
          <div className={directionClass}>
            <h4 className="text-2xl font-bold mb-8">{t('footer.quickLinks')}</h4>
            <ul className="space-y-5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-lg hover:text-white transition-colors duration-300 inline-flex items-center gap-2 group"
                  >
                    <span className={`transform group-hover:${locale === 'ar' ? 'translate-x-2' : '-translate-x-2'} transition-transform`}>
                      {t(link.text)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-8 border-t border-[#AA9554]/20">
              <p className="font-bold mb-2">{t('footer.commercialRecord')}</p>
              <p className="text-lg opacity-90">1010762193</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className={directionClass}>
            <h4 className="text-2xl font-bold mb-8 relative inline-block">
              {t('footer.contactUs')}
              <span className={`absolute bottom-0 ${locale === 'ar' ? 'right-0' : 'left-0'} w-full h-0.5 bg-[#AA9554]`}></span>
            </h4>
            <ul className="space-y-6">
              <li>
                <Link
                  href="tel:0558880867"
                  className="flex items-center gap-4 group hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#AA9554]/10 flex items-center justify-center group-hover:bg-[#AA9554] transition-colors">
                    <Phone className="w-6 h-6 group-hover:text-white transition-colors" />
                  </div>
                  <div className={directionClass}>
                    <span dir="ltr" className="text-lg group-hover:text-white transition-colors block">
                      0558880867
                    </span>
                    <span className="text-sm text-[#AA9554]/70">{t('footer.mainNumber')}</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:info@tasisalbina.com"
                  className="flex items-center gap-4 group hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#AA9554]/10 flex items-center justify-center group-hover:bg-[#AA9554] transition-colors">
                    <Mail className="w-6 h-6 group-hover:text-white transition-colors" />
                  </div>
                  <div className={directionClass}>
                    <span className="text-lg group-hover:text-white transition-colors block">
                      info@tasisalbina.com
                    </span>
                    <span className="text-sm text-[#AA9554]/70">{t('footer.email')}</span>
                  </div>
                </Link>
              </li>
              <li className="flex items-center gap-4 group hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#AA9554]/10 flex items-center justify-center group-hover:bg-[#AA9554] transition-colors">
                  <MapPin className="w-6 h-6 group-hover:text-white transition-colors" />
                </div>
                <div className={directionClass}>
                  <span className="text-lg group-hover:text-white transition-colors block">
                    {t('footer.address')}
                  </span>
                  <span className="text-sm text-[#AA9554]/70">{t('footer.country')}</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="w-full rounded-2xl overflow-hidden shadow-lg border-2 border-[#20284D]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.8661796873164!2d46.81644022!3d24.67303022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQwJzIyLjkiTiA0NsKwNDgnNTkuMiJF!5e0!3m2!1sen!2s!4v1646484800000!5m2!1sen!2s"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="h-px bg-[#AA9554]/20 mb-10" />

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-10">
          {socialLinks.map((social) => (
            <Link
              key={social.name}
              href={social.url}
              className="w-12 h-12 border-2 border-[#AA9554] rounded-xl flex items-center justify-center hover:bg-[#AA9554] transition-all duration-300 group"
            >
              <Image
                src={social.icon}
                alt={social.name}
                width={24}
                height={24}
                className="w-6 h-6 group-hover:scale-110 transition-transform"
              />
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center space-y-3 text-lg opacity-90">
          <p>{t('footer.copyright')}</p>
          <a href="https://www.tarmeeztech.com/ar">{t('footer.madeBy')}</a>
        </div>
      </div>
    </footer>
    </ClientOnly>
  );
}
function setIsSubmitting(arg0: boolean) {
  throw new Error('Function not implemented.');
}
