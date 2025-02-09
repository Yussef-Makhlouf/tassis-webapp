// "use client";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import Contact from "@/components/Contact";
// import Image from "next/image";
// import Link from "next/link";
// import Pagination from "@/components/Pagination";
// import { useState, useEffect } from "react";
// import { Search } from "lucide-react";

// interface Blog {
//   _id: string;
//   title: string;
//   content: string;
//   Image: {
//     secure_url: string;
//   };
//   createdAt: string;
//   customId: string;
// }

// interface BlogResponse {
//   message: string;
//   blogs: Blog[];
//   totalCount: number; // Add total count

// }

// const categories = [
//   { id: 'all', name: 'الكل' },
//   { id: 'real-estate', name: 'العقارات' },
//   { id: 'projects', name: 'المشاريع' },
//   { id: 'development', name: 'التطوير' }
// ];

// export default function BlogsPage() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [totalCount, setTotalCount] = useState(0);
//   const blogsPerPage = 9;

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const response = await fetch(`http://localhost:8080/blog/?page=${currentPage}&size=${blogsPerPage}`);
//         const data: BlogResponse = await response.json();
//         setBlogs(data.blogs);
//         setTotalCount(data.totalCount);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching blogs:', error);
//         setLoading(false);
//       }
//     };

//     fetchBlogs();
//   }, [currentPage]);
//   const totalPages = Math.ceil(totalCount / blogsPerPage);

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('ar-SA', {
//       year: 'numeric',
//       month: 'numeric',
//       day: 'numeric',
//       hour: 'numeric',
//       minute: 'numeric',
//     });
//   };

//   return (
//     <main className="min-h-screen bg-white">
//    {/* Navbar - Completely Separate */}
//       <header className="bg-white  top-0 left-0 right-0 shadow-md">
//         <Navbar />
//       </header>

//       {/* Hero Section - Starts Below Navbar */}
//       <section className="relative mt-[90px] h-[285px] bg-[url('/about-hero.jpg')] bg-cover bg-center">
//         <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
//           <h1 className="text-4xl md:text-5xl font-bold text-white"> المدونات</h1>
//         </div>
//       </section>
//       {/* Search & Filter Section */}
//       <section className="py-12 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="max-w-4xl mx-auto">
//             {/* Search Bar */}
//             <div className="relative mb-8">
//               <input
//                 type="text"
//                 placeholder="ابحث عن المقالات..."
//                 className="w-full py-4 px-6 pr-12 rounded-full border-2 border-[#20284D] focus:outline-none focus:border-[#AA9554] transition-colors"
//               />
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#20284D]" />
//             </div>

//             {/* Categories */}
//             <div className="flex flex-wrap gap-4 justify-center">
//               {categories.map((category) => (
//                 <button
//                   key={category.id}
//                   onClick={() => setActiveCategory(category.id)}
//                   className={`px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 ${
//                     activeCategory === category.id
//                       ? "bg-[#20284D] text-[#AA9554]"
//                       : "border-2 border-[#20284D] text-[#20284D] hover:bg-[#20284D] hover:text-[#AA9554]"
//                   }`}
//                 >
//                   {category.name}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Blog Grid */}
//       <section className="py-20">
//         <div className="container mx-auto px-4">
//           {loading ? (
//             <div className="text-center">جاري التحميل...</div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {blogs.map((blog) => (
//                 <div
//                   key={blog._id}
//                   className="group bg-white rounded-2xl overflow-hidden border-2 border-[#20284D] shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
//                 >
//                   <div className="relative">
//                     <div className="relative h-72 overflow-hidden">
//                       <Image
//                         src={blog.Image.secure_url}
//                         alt={blog.title}
//                         fill
//                         className="object-cover transition-transform duration-700 group-hover:scale-110"
//                       />
//                     </div>
//                     <div className="absolute top-4 right-4 bg-[#20284D] text-[#AA9554] px-4 py-1 rounded-full text-sm">
//                       جديد
//                     </div>
//                   </div>

//                   <div className="p-8 space-y-4">
//                     <div className="flex justify-between items-center text-gray-600 text-sm">
//                       <span dir="ltr">{formatDate(blog.createdAt)}</span>
//                     </div>

//                     <h3 className="text-2xl font-bold text-[#20284D] leading-tight text-right">
//                       {blog.title}
//                     </h3>

//                     <p className="text-gray-600 leading-relaxed text-right line-clamp-3">
//                       {blog.content}
//                     </p>

//                     <Link
//                       href={`/blogs/${blog.customId}`}
//                       className="block text-center py-4 border-2 border-[#AA9554] text-[#AA9554] rounded-xl font-medium hover:bg-[#AA9554] hover:text-white transition-all duration-300"
//                     >
//                       عرض المقال
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
        
//       </section>

//       <Pagination
//         currentPage={currentPage}
//         totalPages={5}
//         onPageChange={setCurrentPage}
//       />

//       <Contact />
//       <Footer />
//     </main>
//   );
// }
'use client';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Image from "next/image";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import { useState, useEffect, Suspense } from "react";
import { useTranslations } from 'next-intl';
import { Eye } from 'lucide-react'; // Add this import for the views icon
import Loading from "@/app/loading";

interface Blog {
  _id: string;
  title: string;
  description: string;
  Image: {
    secure_url: string;
  };
  createdAt: string;
  customId: string;
Keywords: string[];
views: number;
}

interface BlogResponse {
  message: string;
  blogs: Blog[];
  totalCount: number;
}


export default function BlogsPage() {
  const t = useTranslations('blog');
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const blogsPerPage = 9;
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`http://localhost:8080/blog/?page=${currentPage}&size=${blogsPerPage}`);
        const data: BlogResponse = await response.json();
        setBlogs(data.blogs);
        setTotalCount(data.totalCount);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage]);

  const totalPages = Math.ceil(totalCount / blogsPerPage);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(t('dateLocale'), {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  return (
    <main className="min-h-screen bg-white">
      <header className="bg-white top-0 left-0 right-0 shadow-md">
        <Navbar />
      </header>
      <Suspense fallback={<Loading />}>
    

      <section className="relative mt-[90px] h-[285px] bg-[url('/Header1.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">{t('title')}</h1>
        </div>
      </section>



      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center">{t('loading')}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="group bg-white rounded-2xl overflow-hidden border-2 border-[#20284D] shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="relative">
                    <div className="relative h-72 overflow-hidden">
                      <Image
                        src={blog.Image.secure_url}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute top-4 left-4 bg-[#20284D] text-[#AA9554] px-4 py-1 rounded-full text-sm">
                      {t('newLabel')}
                    </div>
                  </div>

                  <div className="p-8 space-y-4">
                    <div className="flex justify-between items-center text-gray-600 text-sm">
                      <span>{formatDate(blog.createdAt)}</span>
                      <div className="flex items-center gap-1">
                        <Eye size={16} className="text-gray-600" />
                        <span> {blog.views}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-[#20284D] leading-tight text-left">
                      {blog.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed text-left line-clamp-3">
                      {blog.description}
                    </p>

                    <Link
                      href={`/blogs/${blog._id}`}
                      className="block text-center py-4 border-2 border-[#AA9554] text-[#AA9554] rounded-xl font-medium hover:bg-[#AA9554] hover:text-white transition-all duration-300"
                    >
                      {t('readMore')}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      </Suspense>
      <Contact />
      <Footer />
    </main>
  );
}
