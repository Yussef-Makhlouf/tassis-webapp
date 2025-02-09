'use client';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const contactMethods = [
    {
      icon: "/icons/phone.svg",
      label: "اتصل بنا",
      value: "+966 50 000 0000",
      action: "tel:+966500000000"
    },
    {
      icon: "/icons/whatsapp.svg",
      label: "واتساب",
      value: "+966 50 000 0000",
      action: "https://wa.me/966500000000"
    },
    {
      icon: "/icons/email.svg",
      label: "البريد الإلكتروني",
      value: "info@example.com",
      action: "mailto:info@example.com"
    }
  ];

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-bold text-[#20284D] text-center mb-8"
                >
                  تواصل معنا
                </Dialog.Title>

                <div className="space-y-6">
                  {contactMethods.map((method, index) => (
                    <a
                      key={index}
                      href={method.action}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-lg border-2 border-[#20284D] hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#20284D]/10 flex items-center justify-center">
                        <Image
                          src={method.icon}
                          alt={method.label}
                          width={24}
                          height={24}
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#20284D]">{method.label}</h4>
                        <p className="text-gray-600">{method.value}</p>
                      </div>
                    </a>
                  ))}
                </div>

                <button
                  onClick={onClose}
                  className="mt-8 w-full border-2 border-[#20284D] text-[#20284D] rounded-lg py-3 font-bold text-sm hover:bg-gray-50 transition-colors"
                >
                  إغلاق
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 