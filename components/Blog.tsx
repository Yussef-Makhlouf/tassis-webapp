// 'use client'
// import Image from "next/image";
// import { Eye } from "lucide-react";
// import Link from "next/link";
// import { useState, useEffect } from 'react';

// interface Blog {
//   _id: string;
//   title: string;
//   content: string;
//   Image: {
//     secure_url: string;
//     public_id: string;
//   };
//   createdAt: string;
//   customId: string;
// }

// interface BlogResponse {
//   message: string;
//   blogs: Blog[];
// }

// export default function Blog() {
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/blog?page=1&size=3');
//         const data: BlogResponse = await response.json();
//         setBlogs(data.blogs.slice(0, 3)); // Show only 3 blogs
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching blogs:', error);
//         setLoading(false);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   if (loading) {
//     return (
//       <section className="py-24">
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="text-center">Loading...</div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-24">
//       <div className="container mx-auto px-4 lg:px-8">
//         {/* Section Title */}
//         <div className="text-center mb-20">
//           <h2 className="text-[40px] font-bold text-[#20284D] leading-[75px] mb-4">
//             المدونات
//           </h2>
//           <div className="w-[224px] h-1 bg-[#AA9554] mx-auto shadow-[0px_4px_4px_rgba(0,0,0,0.25)]" />
//         </div>

//         {/* Blog Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 max-w-[1400px] mx-auto">
//           {blogs.map((blog) => (
//             <div
//               key={blog._id}
//               className="bg-white rounded-[20px] overflow-hidden border-2 border-[#20284D] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transform transition-transform duration-300 hover:scale-[1.02]"
//             >
//               {/* Image Container */}
//               <div className="relative h-[300px] w-full overflow-hidden">
//                 <Image
//                   src={blog.Image.secure_url}
//                   alt={blog.title}
//                   fill
//                   className="object-cover transition-transform duration-500 hover:scale-110"
//                 />
//               </div>

//               {/* Content */}
//               <div className="p-8">
//                 {/* Meta Info */}
//                 <div className="flex justify-between items-center mb-6 text-base text-gray-600">
//                   <span dir="ltr" className="font-medium">
//                     {new Date(blog.createdAt).toLocaleDateString('ar-SA')}
//                   </span>
//                 </div>

//                 {/* Title */}
//                 <h3 className="text-2xl font-bold text-[#20284D] mb-6 text-right leading-relaxed">
//                   {blog.title}
//                 </h3>

//                 {/* Excerpt */}
//                 <p className="text-[#20284D] text-lg mb-8 text-right leading-relaxed">
//                   {blog.content.substring(0, 100)}...
//                 </p>
//                 <Link
//                   href={`/blogs/${blog.customId}`}
//                   className="block w-full py-4 text-xl border-2 border-[#AA9554] text-[#AA9554] rounded-full hover:bg-[#AA9554] hover:text-white transition-all duration-300 transform hover:scale-[1.02] text-center"
//                 >
//                   عرض المقال
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* View More Button */}
//         <div className="text-center mt-16">
//           <Link
//             className="px-16 py-4 text-xl border-2 border-[#20284D] text-[#20284D] rounded-[10px] hover:bg-[#20284D] hover:text-white transition-all duration-300 transform hover:scale-[1.02]"
//             href="/blogs"
//           >
//             عرض المزيد
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

'use client'
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface Blog {
  _id: string;
  title: string;
  content: string;
  Image: {
    secure_url: string;
    public_id: string;
  };
  createdAt: string;
  customId: string;
}

interface BlogResponse {
  message: string;
  blogs: Blog[];
  totalCount: number;
}

export default function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations('blog');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:8080/blog?page=1&size=3');
        const data: BlogResponse = await response.json();
        setBlogs(data.blogs.slice(0, 3));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#AA9554]"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-[40px] font-bold text-[#20284D] leading-[75px] mb-4">
            {t('title')}
          </h2>
          <div className="w-[224px] h-1 bg-[#AA9554] mx-auto shadow-[0px_4px_4px_rgba(0,0,0,0.25)]" />
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 max-w-[1400px] mx-auto">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-[20px] overflow-hidden border-2 border-[#20284D] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transform transition-transform duration-300 hover:scale-[1.02]"
            >
              {/* Image Container */}
              <div className="relative h-[300px] w-full overflow-hidden">
                <Image
                  src={blog.Image.secure_url}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Meta Info */}
                <div className="flex justify-between items-center mb-6 text-base text-gray-600">
                  <span dir="ltr" className="font-medium">
                    {new Date(blog.createdAt).toLocaleDateString('ar-SA')}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-[#20284D] mb-6 text-right line-clamp-2">
                  {blog.title}
                </h3>

                {/* Description */}
                <p className="text-[#20284D] text-lg mb-8 text-right leading-relaxed line-clamp-3">
                  {blog.content}
                </p>

                {/* Read More Button */}
                <Link
                  href={`/blogs/${blog.customId}`}
                  className="block w-full py-4 text-xl border-2 border-[#AA9554] text-[#AA9554] rounded-full hover:bg-[#AA9554] hover:text-white transition-all duration-300 text-center"
                >
                  {t('readMore')}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Link
            href="/blogs"
            className="inline-block px-16 py-4 text-xl border-2 border-[#20284D] text-[#20284D] rounded-[10px] hover:bg-[#20284D] hover:text-white transition-all duration-300 transform hover:scale-[1.02]"
          >
            {t('viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}