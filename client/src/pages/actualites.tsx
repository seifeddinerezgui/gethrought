import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, fadeInUp } from "@/lib/animations";
import NewsCard from "@/components/ui/news-card";
import NewsletterForm from "@/components/ui/newsletter-form";
import { News } from "@shared/schema";

const Actualites = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const pageSize = 6;

  const { data, isLoading } = useQuery<{
    items: News[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>({
    queryKey: ["/api/news", { page: currentPage, limit: pageSize, category: selectedCategory }],
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Calculate total pages
  const totalPages = data?.totalPages || 1;

  // Generate pagination array
  const generatePagination = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // If we have fewer pages than the max to show, just return all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);
      
      // Calculate start and end of middle section
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if at edges
      if (currentPage <= 2) {
        end = 4;
      } else if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
      }
      
      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push("...");
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push("...");
      }
      
      // Always include last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pagination = generatePagination();

  return (
    <>
      {/* Hero Section */}
      <motion.section
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Actualités</h1>
            <p className="text-xl text-gray-600">
              Restez informé des dernières actualités comptables, financières, réglementaires et sectorielles.
            </p>
          </div>
        </div>
      </motion.section>

      {/* News Section */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="py-16 md:py-24"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isLoading ? (
                  // Loading state
                  Array(6).fill(0).map((_, index) => (
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
                  data?.items.map((newsItem) => (
                    <motion.div key={newsItem.id} variants={fadeInUp}>
                      <NewsCard news={newsItem} />
                    </motion.div>
                  ))
                )}
              </div>
              
              {/* Pagination */}
              {data && data.totalPages > 1 && (
                <motion.div 
                  variants={fadeInUp}
                  className="mt-12 flex justify-center"
                >
                  <nav aria-label="Pagination" className="inline-flex">
                    <button 
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-medium text-[#001F3F] bg-white border border-gray-300 rounded-l-md ${
                        currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                      }`}
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    
                    {pagination.map((page, index) => (
                      page === "..." ? (
                        <span 
                          key={`ellipsis-${index}`}
                          className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300"
                        >
                          ...
                        </span>
                      ) : (
                        <button
                          key={`page-${page}`}
                          onClick={() => handlePageChange(page as number)}
                          className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                            currentPage === page 
                              ? 'text-white bg-[#E00000] border border-[#E00000]' 
                              : 'text-[#001F3F] bg-white border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    ))}
                    
                    <button 
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-medium text-[#001F3F] bg-white border border-gray-300 rounded-r-md ${
                        currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                      }`}
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </nav>
                </motion.div>
              )}
            </div>
            
            <div className="lg:col-span-1">
              {/* Newsletter Signup */}
              <motion.div 
                variants={fadeInUp}
                className="bg-[#001F3F] text-white p-8 rounded-lg mb-8"
              >
                <h3 className="text-2xl font-bold mb-4">Newsletter</h3>
                <p className="mb-6">
                  Informations comptable, financière, ESG, réglementaire : chaque mois notre décryptage des dernières actualités
                </p>
                <NewsletterForm buttonFullWidth />
              </motion.div>
              
              {/* Categories Filter */}
              <motion.div 
                variants={fadeInUp}
                className="bg-white p-8 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-bold mb-4">Catégories</h3>
                <ul className="space-y-3">
                  <li>
                    <button 
                      onClick={() => handleCategorySelect(null)}
                      className={`flex items-center justify-between w-full text-left ${
                        selectedCategory === null ? 'text-[#E00000]' : 'text-gray-700 hover:text-[#E00000]'
                      }`}
                    >
                      <span>Toutes les catégories</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => handleCategorySelect('Audit et Certification')}
                      className={`flex items-center justify-between w-full text-left ${
                        selectedCategory === 'Audit et Certification' ? 'text-[#E00000]' : 'text-gray-700 hover:text-[#E00000]'
                      }`}
                    >
                      <span>Audit et Certification</span>
                      <span className="bg-gray-100 px-2 py-1 rounded text-sm">12</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => handleCategorySelect('Comptabilité & Normes IFRS')}
                      className={`flex items-center justify-between w-full text-left ${
                        selectedCategory === 'Comptabilité & Normes IFRS' ? 'text-[#E00000]' : 'text-gray-700 hover:text-[#E00000]'
                      }`}
                    >
                      <span>Comptabilité & Normes IFRS</span>
                      <span className="bg-gray-100 px-2 py-1 rounded text-sm">8</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => handleCategorySelect('Fiscalité')}
                      className={`flex items-center justify-between w-full text-left ${
                        selectedCategory === 'Fiscalité' ? 'text-[#E00000]' : 'text-gray-700 hover:text-[#E00000]'
                      }`}
                    >
                      <span>Fiscalité</span>
                      <span className="bg-gray-100 px-2 py-1 rounded text-sm">15</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => handleCategorySelect('ESG & Développement Durable')}
                      className={`flex items-center justify-between w-full text-left ${
                        selectedCategory === 'ESG & Développement Durable' ? 'text-[#E00000]' : 'text-gray-700 hover:text-[#E00000]'
                      }`}
                    >
                      <span>ESG & Développement Durable</span>
                      <span className="bg-gray-100 px-2 py-1 rounded text-sm">10</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => handleCategorySelect('Banque & Assurance')}
                      className={`flex items-center justify-between w-full text-left ${
                        selectedCategory === 'Banque & Assurance' ? 'text-[#E00000]' : 'text-gray-700 hover:text-[#E00000]'
                      }`}
                    >
                      <span>Banque & Assurance</span>
                      <span className="bg-gray-100 px-2 py-1 rounded text-sm">7</span>
                    </button>
                  </li>
                </ul>
              </motion.div>
              
              {/* Featured Article */}
              <motion.div 
                variants={fadeInUp}
                className="bg-white p-8 rounded-lg shadow-md mt-8"
              >
                <h3 className="text-xl font-bold mb-4">Article à la une</h3>
                <div className="mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                    alt="Article à la une" 
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <h4 className="font-bold text-lg mb-2">
                  Les enjeux de la transformation numérique pour les directions financières
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  La numérisation des processus financiers représente un levier majeur de performance pour les entreprises...
                </p>
                <a href="#" className="text-[#E00000] font-medium hover:underline flex items-center">
                  Lire l'article
                  <i className="fas fa-arrow-right ml-2 text-sm"></i>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Actualites;
