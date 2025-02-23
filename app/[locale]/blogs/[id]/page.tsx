"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from 'next-intl';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Eye, Calendar, Mail, X } from "lucide-react";
import ClientOnly from "@/components/ClientOnly";

interface BlogData {
  Image: {
    secure_url: string;
    public_id: string;
  };
  _id: string;
  title: string;
  description: string;
  Keywords: string[];
  lang: string;
  views: number;
  customId: string;
  createdAt: string;
  updatedAt: string;

}

interface BlogResponse {
  message: string;
  blog: BlogData;
}
interface RecentBlogsResponse {
  message: string;
  blogs: BlogData[];
}

export default function BlogPost() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Specify type for error
  const [blog, setBlog] = useState<BlogData | null>(null);
  const params = useParams();
  const t = useTranslations('blog');
  const locale = useLocale();
  const [recentBlogs, setRecentBlogs] = useState<BlogData[]>([]);
  const [recentBlogsLoading, setRecentBlogsLoading] = useState(true);
  useEffect(() => {
    const fetchBlog = async () => {
      try {

        if (!params?.id) return;
        const response = await fetch(`https://tasis-al-bina.onrender.com/blog/findOne/${params?.id}`);
        const data: BlogResponse = await response.json();
        setBlog(data.blog);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog:', error);
        setLoading(false);
      }
    };
    const fetchRecentBlogs = async () => {
      try {
        const response = await fetch('https://tasis-al-bina.onrender.com/blog/getLastThree');
        const data: RecentBlogsResponse = await response.json();
        setRecentBlogs(data.blogs);
        setRecentBlogsLoading(false);
      } catch (error) {
        console.error('Error fetching recent blogs:', error);
        setRecentBlogsLoading(false);
      }
    };
    fetchBlog();
    fetchRecentBlogs();
  }, [params?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(error); // Reset error before request

    try {
      const response = await fetch("https://tasis-al-bina.onrender.com/newsletter/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      setShowModal(true); // Show modal on success
      setEmail(""); // Clear input field on success
    }
    catch (err) {  // Ensure error is properly typed
      // setError(err);
      console.log(err);
    }
  }

  if (loading) {
    return (
      <ClientOnly>
        <main className="min-h-screen bg-white w-full">
          <Navbar />
          <div className="pt-32 px-4">
            <div className="animate-pulse max-w-7xl mx-auto">
              <div className="h-[400px] bg-gray-200 rounded-2xl mb-8" />
              <div className="h-8 bg-gray-200 w-2/3 mb-4" />
              <div className="h-4 bg-gray-200 w-1/4 mb-8" />
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 w-full" />
                <div className="h-4 bg-gray-200 w-full" />
                <div className="h-4 bg-gray-200 w-3/4" />
              </div>
            </div>
          </div>
        </main>
      </ClientOnly>
    );
  }

  if (!blog) return null;

  return (
    <ClientOnly>
      <main className="min-h-screen bg-white w-full" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <header className="bg-white/95 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 shadow-lg w-full">
          <Navbar />
        </header>

        {/* Hero Section - Full Width */}
        <section className="relative h-[50vh] md:h-[60vh] w-full bg-[url('/features.png')] bg-cover bg-fixed bg-center">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40" />
          <div className="w-full max-w-[2000px] mx-auto px-4 h-full flex items-center justify-center relative z-10">
            <div className="text-center space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
                {t('blogDetails')}
              </h1>
              <div className="w-[150px] sm:w-[224px] h-[3px] bg-[#AA9554] mx-auto rounded-full shadow-lg" />
            </div>
          </div>
        </section>

        {/* Breadcrumb - Full Width */}
        <div className="bg-gray-50 border-b w-full">
          <div className="w-full max-w-[2000px] mx-auto px-4 py-4">
            <div className="flex items-center justify-end gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-[#AA9554] transition-colors">
                {t('home')}
              </Link>
              <span>/</span>
              <Link href="/blogs" className="hover:text-[#AA9554] transition-colors">
                {t('blog')}
              </Link>
              <span>/</span>
              <span className="text-[#20284D]">{t('details')}</span>
            </div>
          </div>
        </div>

        {/* Main Content Section - Full Width */}
        <section className="py-8 sm:py-12 md:py-16 px-4 w-full">
          <div className="w-full max-w-[2000px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Main Content */}
              <article className={`w-full lg:w-3/4 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                  <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full">
                    <Image
                      src={blog.Image.secure_url}
                      alt={blog.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                  <div className="p-4 sm:p-6 md:p-8 lg:p-12">
                    <div className="flex items-center justify-end gap-4 sm:gap-8 text-gray-600 mb-6 sm:mb-10 flex-wrap">
                      <span className="flex items-center gap-3">
                        <span dir="ltr" className="text-base">
                          {new Date(blog.createdAt).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
                        </span>
                        <Calendar className="w-5 h-5 text-[#AA9554]" />
                      </span>
                      <span className="flex items-center gap-3">
                        <span className="text-base">{blog.views} {t('views')}</span>
                        <Eye className="w-5 h-5 text-[#AA9554]" />
                      </span>
                    </div>

                    <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-[#20284D] mb-6 sm:mb-10 leading-relaxed`}>
                      {blog.title}
                    </h1>

                    <div className="space-y-6 sm:space-y-10">
                      <p className={`text-gray-700 text-base sm:text-lg leading-loose ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                        {blog.description}
                      </p>

                      {/* Keywords */}
                      <div className={`flex flex-wrap gap-2 ${locale === 'ar' ? 'justify-end' : 'justify-start'}`}>
                        {blog?.Keywords && Array.isArray(blog.Keywords) && blog.Keywords.map((keyword, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 bg-gray-100 text-[#20284D] rounded-full text-sm"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* Sidebar */}
              <aside className="w-full lg:w-1/4 space-y-6 sm:space-y-8">
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border-t-4 border-[#AA9554]">
                  <h5 className="text-2xl font-bold text-[#20284D] mb-6 text-right">
                    {t('recentPosts')}
                  </h5>
                  <div className="space-y-6">
                    {recentBlogsLoading ? (
                      // Loading skeleton
                      [...Array(3)].map((_, idx) => (
                        <div key={idx} className="animate-pulse flex gap-4">
                          <div className="bg-gray-200 h-20 w-20 rounded-lg flex-shrink-0" />
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-3/4" />
                            <div className="h-3 bg-gray-200 rounded w-1/2" />
                          </div>
                        </div>
                      ))
                    ) : (
                      recentBlogs.map((recentBlog) => (
                        <Link
                          href={`/blogs/${recentBlog._id}`}
                          key={recentBlog._id}
                          className="group block"
                        >
                          <div className="flex gap-4" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
                            <div className="relative h-20 w-20 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={recentBlog.Image.secure_url}
                                alt={recentBlog.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            </div>
                            <div className="flex-grow">
                              <h4 className={`font-semibold text-[#20284D] group-hover:text-[#AA9554] transition-colors line-clamp-2 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                                {recentBlog.title}
                              </h4>
                              <div className={`flex items-center gap-2 mt-2 text-sm text-gray-500 ${locale === 'ar' ? 'justify-end' : 'justify-start'}`}>
                                <span dir="ltr">
                                  {new Date(recentBlog.createdAt).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
                                </span>
                                <Calendar className="w-4 h-4 text-[#AA9554]" />
                              </div>
                            </div>
                          </div>
                        </Link>

                      ))
                    )}
                  </div>
                </div>
                {/* Newsletter Section */}
                <div className="bg-[#20284D] rounded-2xl shadow-lg p-8 text-white">
                  <div className="flex items-center justify-center mb-8">
                    <div className="bg-[#AA9554]/20 p-4 rounded-full">
                      <Mail className="w-10 h-10 text-[#AA9554]" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-4">
                    {t('newsletter')}
                  </h3>
                  <p className="text-gray-300 text-center mb-8 text-sm leading-relaxed">
                    {t('newsletterDesc')}
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('emailPlaceholder')}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#AA9554] transition-colors text-center"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#AA9554] text-white rounded-xl hover:bg-[#8B7B45] transition-all duration-300 font-semibold"
                    >
                      {t('subscribe')}
                    </button>
                  </form>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Newsletter Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 left-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="text-center space-y-6">
                <div className="bg-[#AA9554]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="w-8 h-8 text-[#AA9554]" />
                </div>
                <h3 className="text-2xl font-bold text-[#20284D]">
                  {t('subscribeSuccess')}
                </h3>
                <p className="text-gray-600">
                  {t('subscribeMessage')}
                </p>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-8 py-3 bg-[#20284D] text-white rounded-xl hover:bg-[#AA9554] transition-all duration-300"
                >
                  {t('ok')}
                </button>
              </div>
            </div>
          </div>
        )}

        <Partners />
        <Contact />
        <Footer />

      </main>
    </ClientOnly>
  );
}
