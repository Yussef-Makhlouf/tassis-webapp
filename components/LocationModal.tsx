'use client';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import ClientOnly from './ClientOnly';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  unitId: string;
}

export default function LocationModal({ isOpen, onClose, unitId }: LocationModalProps) {
  const [unitData, setUnitData] = useState<any>(null);

  useEffect(() => {
    const fetchUnitLocation = async () => {
      try {
        const response = await fetch(`http://localhost:8080/unit/getunit/${unitId}`);
        const data = await response.json();
        setUnitData(data.returnedData);
      } catch (error) {
        console.error('Error fetching unit location:', error);
      }
    };

    if (isOpen && unitId) {
      fetchUnitLocation();
    }
  }, [isOpen, unitId]);

  const coordinates = unitData?.unit?.coordinates;
  const mapEmbedUrl = coordinates ? 
    `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3!2d${coordinates.longitude}!3d${coordinates.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sen!2s!4v1234567890!5m2!1sen!2s` 
    : '';

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
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                <div className="relative">
                  <iframe
                    src={mapEmbedUrl}
                    width="100%"
                    height="500"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-t-2xl"
                  />
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#20284D" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-bold text-[#20284D] mb-2">موقع المشروع</h3>
                  <p className="text-gray-600">{unitData?.unit?.title}</p>
                  <div className="mt-4 flex gap-4">
                    <a
                      href={unitData?.googleMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#20284D] text-white rounded-lg py-3 font-bold text-sm hover:bg-[#2a3761] transition-colors text-center"
                    >
                      فتح في خرائط قوقل
                    </a>
                    <button
                      onClick={onClose}
                      className="flex-1 border-2 border-[#20284D] text-[#20284D] rounded-lg py-3 font-bold text-sm hover:bg-gray-50 transition-colors"
                    >
                      إغلاق
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
    </ClientOnly>
  );
}
