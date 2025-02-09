import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';
import Link from 'next/link';
import Image from 'next/image';

// Project Data
const projects = [
  { id: 1, title: "مجالس 67 حي الرمال", image: "/build1.png" },
  { id: 2, title: "مجالس 62 حي المنار", image: "/build2.png" },
  { id: 3, title: "مجالس 55 حي حطين", image: "/build3.png" },
  { id: 4, title: "مجالس 67 حي الرمال", image: "/build1.png" },
  { id: 5, title: "مجالس 62 حي المنار", image: "/build3.png" },
  { id: 6, title: "مجالس 55 حي حطين", image: "/build2.png" },
];

export default function Projects() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-[#20284D] font-cairo">
              مشاريعنا
            </h1>
            <div className="w-16 h-[3px] bg-[#AA9554] mx-auto mt-2 rounded-full" />
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link 
                href={`/projects/${project.id}`} 
                key={project.id}
                className="relative group h-[500px] rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02]"
              >
                {/* Project Image */}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Project Info (Centered at Bottom) */}
                <div className="absolute bottom-0 w-full text-center p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {project.title}
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
