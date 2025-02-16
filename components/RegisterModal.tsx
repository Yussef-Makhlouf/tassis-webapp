'use client';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ClientOnly from './ClientOnly';
import { useTranslations } from 'next-intl';

const formSchema = z.object({
  fullName: z.string()
    .min(3, 'register.fullName.error')
    .max(50, 'register.fullName.error'),
  phone: z.string()
    .regex(/^(05)[0-9]{8}$/, 'register.phone.error'),
  email: z.string()
    .email('register.email.error'),
});

type FormData = z.infer<typeof formSchema>;

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  unitId: string;
  categoryId: string;
}

export default function RegisterModal({ isOpen, onClose, onSuccess, unitId, categoryId }: RegisterModalProps) {
  const t = useTranslations('register');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/interested/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          unitId,
          categoryId
        }),
      });

      const result = await response.json();
      if (result.message === "Interest registered successfully") {
        reset();
        onSuccess();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 shadow-xl transition-all">
                  <Dialog.Title className="text-2xl font-bold text-[#20284D] text-center mb-8">
                    {t('title')}
                  </Dialog.Title>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-[#20284D] font-bold text-sm">
                        {t('fullName.label')}
                      </label>
                      <input
                        {...register('fullName')}
                        type="text"
                        className="w-full p-3 rounded-lg border-2 border-[#20284D] focus:outline-none focus:border-[#AA9554] transition-colors"
                        placeholder={t('fullName.placeholder')}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-xs">{t(errors.fullName.message as string)}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[#20284D] font-bold text-sm">
                        {t('phone.label')}
                      </label>
                      <input
                        {...register('phone')}
                        type="tel"
                        className="w-full p-3 rounded-lg border-2 border-[#20284D] focus:outline-none focus:border-[#AA9554] transition-colors"
                        placeholder={t('phone.placeholder')}
                        dir="ltr"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs">{t(errors.phone.message as string)}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[#20284D] font-bold text-sm">
                        {t('email.label')}
                      </label>
                      <input
                        {...register('email')}
                        type="email"
                        className="w-full p-3 rounded-lg border-2 border-[#20284D] focus:outline-none focus:border-[#AA9554] transition-colors"
                        placeholder={t('email.placeholder')}
                        dir="ltr"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs">{t(errors.email.message as string)}</p>
                      )}
                    </div>

                    <div className="pt-6 flex gap-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-[#20284D] text-white rounded-lg py-3 font-bold text-sm hover:bg-[#2a3761] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {t('buttons.submitting')}
                          </span>
                        ) : (
                          t('buttons.submit')
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 border-2 border-[#20284D] text-[#20284D] rounded-lg py-3 font-bold text-sm hover:bg-gray-50 transition-colors"
                      >
                        {t('buttons.cancel')}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </ClientOnly>
  );
}
