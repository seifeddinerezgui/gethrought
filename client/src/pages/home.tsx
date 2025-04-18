import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, fadeInUp } from "@/lib/animations";
import SolutionCard from "@/components/ui/solution-card";
import NewsletterForm from "@/components/ui/newsletter-form";
import { Solution, News } from "@shared/schema";

const Home = () => {
  const { data: solutions, isLoading: isLoadingSolutions } = useQuery<Solution[]>({
    queryKey: ["/api/solutions"],
  });

  const { data: news, isLoading: isLoadingNews } = useQuery<{
    items: News[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>({
    queryKey: ["/api/news", { page: 1, limit: 3 }],
  });

  return (
    <>
      {/* Hero Section */}
      <motion.section
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="relative h-[70vh] overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            className="w-full h-full object-cover" 
            alt="Cabinet d'expertise comptable"
          />
          <div className="absolute inset-0 bg-[#001F3F] bg-opacity-50"></div>
        </div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-xl text-white">
            <motion.h1 
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            >
              Notre expertise au service de votre réussite
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-xl mb-8"
            >
              Gethrought accompagne l'entreprise, ses dirigeants et ses actionnaires dans leurs défis financiers et opérationnels.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link href="/contact">
                <a className="inline-block bg-[#E00000] hover:bg-[#c00000] text-white py-3 px-8 rounded transition-all duration-300 transform hover:-translate-y-1 font-medium">
                  Nous contacter
                </a>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Nos Solutions Section */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="py-16 md:py-24"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Notre <span className="italic">mission</span> : accompagner l'entreprise, ses dirigeants et ses actionnaires
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoadingSolutions ? (
              // Loading state
              Array(4).fill(0).map((_, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden h-[400px] animate-pulse">
                  <div className="bg-gray-200 h-48 w-full"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))
            ) : (
              solutions?.map((solution) => (
                <motion.div key={solution.id} variants={fadeInUp}>
                  <SolutionCard solution={solution} />
                </motion.div>
              ))
            )}
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeInUp}>
              <img 
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Des fondamentaux ancrés" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </motion.div>
            <div>
              <motion.div variants={fadeInUp} className="text-sm font-medium text-gray-500 mb-2">
                Des fondamentaux ancrés
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-6">
                Le <span className="italic">développement</span> de services à forte expertise
              </motion.h2>
              <motion.ul variants={staggerContainer} className="space-y-4">
                <motion.li variants={fadeInUp} className="flex items-start">
                  <i className="fas fa-check-circle text-[#E00000] mt-1 mr-3"></i>
                  <p>Une dynamique entrepreneuriale et d'innovation</p>
                </motion.li>
                <motion.li variants={fadeInUp} className="flex items-start">
                  <i className="fas fa-check-circle text-[#E00000] mt-1 mr-3"></i>
                  <p>Des équipes expérimentées intervenant sur des problématiques complexes</p>
                </motion.li>
                <motion.li variants={fadeInUp} className="flex items-start">
                  <i className="fas fa-check-circle text-[#E00000] mt-1 mr-3"></i>
                  <p>Une approche pluridisciplinaire et transversale</p>
                </motion.li>
                <motion.li variants={fadeInUp} className="flex items-start">
                  <i className="fas fa-check-circle text-[#E00000] mt-1 mr-3"></i>
                  <p>Des compétences et des outils adaptés en permanence</p>
                </motion.li>
                <motion.li variants={fadeInUp} className="flex items-start">
                  <i className="fas fa-check-circle text-[#E00000] mt-1 mr-3"></i>
                  <p>Des circuits courts de décision</p>
                </motion.li>
              </motion.ul>
              <motion.div variants={fadeInUp} className="mt-8">
                <Link href="/solutions">
                  <a className="inline-block bg-[#E00000] hover:bg-[#c00000] text-white py-3 px-8 rounded transition-all duration-300 transform hover:-translate-y-1 font-medium">
                    Découvrir le cabinet
                  </a>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center"
          >
            <motion.div variants={fadeInUp} className="p-6">
              <div className="text-4xl font-bold text-[#E00000] mb-3">320</div>
              <p>professionnels dont 115 associés et managers</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="p-6">
              <div className="text-4xl font-bold text-[#E00000] mb-3">11%</div>
              <p>de la masse salariale investis dans la formation, le développement de solutions et de méthodologies</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="p-6">
              <div className="text-4xl font-bold text-[#E00000] mb-3">80%</div>
              <p>des temps des associés et directeurs exécutifs consacrés à la conduite des missions</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="p-6">
              <div className="text-4xl font-bold text-[#E00000] mb-3">99/100</div>
              <p>notre index de l'égalité professionnelle F/H</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* News Section */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="py-16 md:py-24 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Actualités</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isLoadingNews ? (
              // Loading state
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden h-[400px] animate-pulse">
                  <div className="bg-gray-200 h-48 w-full"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))
            ) : (
              news?.items.map((newsItem) => (
                <motion.div 
                  key={newsItem.id} 
                  variants={fadeInUp}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={newsItem.imageUrl} 
                      alt={newsItem.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-0 left-0 bg-[#E00000] text-white px-3 py-1 text-sm">
                      {new Date(newsItem.publishDate).toLocaleDateString('fr-FR', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{newsItem.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{newsItem.excerpt}</p>
                    <Link href={`/actualites/${newsItem.id}`}>
                      <a className="text-[#E00000] font-medium hover:underline flex items-center">
                        Lire la suite
                        <i className="fas fa-arrow-right ml-2 text-sm"></i>
                      </a>
                    </Link>
                  </div>
                </motion.div>
              ))
            )}
          </div>
          
          <motion.div variants={fadeInUp} className="mt-10 text-center">
            <Link href="/actualites">
              <a className="inline-flex items-center text-[#E00000] font-medium hover:underline">
                Voir toutes les actualités
                <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Newsletter Section */}
      <motion.section
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="py-16 bg-[#001F3F] text-white"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Newsletter</h2>
            <p className="mb-8 text-lg">Informations comptable, financière, ESG, réglementaire : chaque mois notre décryptage des dernières actualités</p>
            <NewsletterForm />
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Home;
