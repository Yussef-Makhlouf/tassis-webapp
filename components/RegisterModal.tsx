'use client';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  fullName: z.string()
    .min(3, 'الاسم يجب أن يكون 3 أحرف على الأقل')
    .max(50, 'الاسم يجب أن لا يتجاوز 50 حرف'),
  phone: z.string()
    .regex(/^(05)[0-9]{8}$/, 'رقم الجوال يجب أن يبدأ ب 05 ويتكون من 10 أرقام'),
  email: z.string()
    .email('البريد الإلكتروني غير صحيح'),
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
      const response = await fetch('http://localhost:8080/interested/create', {
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
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-bold text-[#20284D] text-center mb-8"
                >
                  تسجيل الاهتمام
                </Dialog.Title>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* الاسم الكامل */}
                  <div className="space-y-2">
                    <label className="block text-[#20284D] font-bold text-sm">
                      الاسم كامل
                    </label>
                    <input
                      {...register('fullName')}
                      type="text"
                      className="w-full p-3 rounded-lg border-2 border-[#20284D] focus:outline-none focus:border-[#AA9554] transition-colors"
                      placeholder="ادخل اسمك الكامل"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs">{errors.fullName.message}</p>
                    )}
                  </div>

                  {/* رقم الجوال */}
                  <div className="space-y-2">
                    <label className="block text-[#20284D] font-bold text-sm">
                      رقم الجوال
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      className="w-full p-3 rounded-lg border-2 border-[#20284D] focus:outline-none focus:border-[#AA9554] transition-colors"
                      placeholder="05xxxxxxxx"
                      dir="ltr"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* البريد الإلكتروني */}
                  <div className="space-y-2">
                    <label className="block text-[#20284D] font-bold text-sm">
                      البريد الالكتروني
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      className="w-full p-3 rounded-lg border-2 border-[#20284D] focus:outline-none focus:border-[#AA9554] transition-colors"
                      placeholder="example@domain.com"
                      dir="ltr"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs">{errors.email.message}</p>
                    )}
                  </div>

                  {/* اختيار نوع المشروع */}
                  {/* <div className="space-y-2">
                    <label className="block text-[#20284D] font-bold text-sm">
                      اختيار نوع المشروع
                    </label>
                    <select
                      {...register('projectType')}
                      className="w-full p-3 rounded-lg border-2 border-[#20284D] focus:outline-none focus:border-[#AA9554] transition-colors bg-white"
                    >
                      <option value="">اختر نوع المشروع</option>
                      <option value="residential">سكني</option>
                      <option value="commercial">تجاري</option>
                      <option value="mixed">متعدد الاستخدامات</option>
                    </select>
                    {errors.projectType && (
                      <p className="text-red-500 text-xs">{errors.projectType.message}</p>
                    )}
                  </div> */}

                  {/* اختيار نوع الشقة */}
                  {/* <div className="space-y-2">
                    <label className="block text-[#20284D] font-bold text-sm">
                      اختيار نوع الشقة
                    </label>
                    <select
                      {...register('apartmentType')}
                      className="w-full p-3 rounded-lg border-2 border-[#20284D] focus:outline-none focus:border-[#AA9554] transition-colors bg-white"
                    >
                      <option value="">اختر نوع الشقة</option>
                      <option value="studio">استوديو</option>
                      <option value="1bedroom">غرفة نوم</option>
                      <option value="2bedroom">غرفتين نوم</option>
                      <option value="3bedroom">ثلاث غرف نوم</option>
                      <option value="4bedroom">أربع غرف نوم</option>
                    </select>
                    {errors.apartmentType && (
                      <p className="text-red-500 text-xs">{errors.apartmentType.message}</p>
                    )}
                  </div> */}

                  {/* أزرار التحكم */}
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
                          جاري الإرسال...
                        </span>
                      ) : (
                        'تأكيد تسجيل الاهتمام'
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 border-2 border-[#20284D] text-[#20284D] rounded-lg py-3 font-bold text-sm hover:bg-gray-50 transition-colors"
                    >
                      إلغاء
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 