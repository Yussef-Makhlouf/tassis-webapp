'use client';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import ClientOnly from './ClientOnly';

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ThankYouModal({ isOpen, onClose }: ThankYouModalProps) {
  return (
    <ClientOnly>
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
          <div className="fixed inset-0 bg-black bg-opacity-50" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#20284D] p-8 text-center shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-3xl font-bold text-white mb-4"
                >
                  شكراً لك!
                </Dialog.Title>
                <p className="text-xl text-white/90 mb-8">
                  تم تسجيل اهتمامك بنجاح
                </p>
                <Link
                  href="/"
                  className="inline-block bg-[#AA9554] text-white rounded-lg px-8 py-3 font-bold text-lg hover:bg-[#8a7a44] transition-colors"
                  onClick={onClose}
                >
                  العودة للصفحة الرئيسية
                </Link>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
    </ClientOnly>
  );
} 