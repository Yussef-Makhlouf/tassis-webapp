'use client'
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useState, useEffect } from 'react';

interface Category {
  _id: string;
  title: string;
  Image: {
    secure_url: string;
    public_id: string;
  };
}

export default function Projects() {
  const locale = useLocale();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const apiUrl = locale === 'ar'
          ? 'http://localhost:8080/category/getAllCategoryTitleImageAR/?page=1&size=9'
          : 'http://localhost:8080/category/getAllCategoryTitleImageEN?page=1&size=9';

        const response = await fetch(apiUrl);
        const data = await response.json();
        setCategories(data.category);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [locale]);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-[#20284D] font-cairo">
              مشاريعنا
            </h1>
            <div className="w-16 h-[3px] bg-[#AA9554] mx-auto mt-2 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                href={`/projects/${category._id}`}
                key={category._id}
                className="relative group h-[500px] rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02]"
              >
                <Image
                  src={category.Image.secure_url}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-black/50" />

                <div className="absolute bottom-0 w-full text-center p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {category.title}
                  </h3>
                  <button className="bg-[#AA9554] text-white px-5 py-2 text-sm rounded-lg shadow-md hover:bg-[#8B7B45] transition-all duration-300">
                    عرض التفاصيل
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQ />
      <Footer />
    </main>
  );
}
