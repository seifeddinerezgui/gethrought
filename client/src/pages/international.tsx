import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, fadeInUp } from "@/lib/animations";
import LocationCard from "@/components/ui/location-card";
import { Location } from "@shared/schema";

const International = () => {
  const { data: locations, isLoading } = useQuery<Location[]>({
    queryKey: ["/api/international"],
  });

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Gethrought à l'international</h1>
            <p className="text-xl text-gray-600">
              Notre présence internationale et notre réseau mondial nous permettent d'accompagner nos clients partout dans le monde.
            </p>
          </div>
        </div>
      </motion.section>

      {/* World Map Section */}
      <motion.section
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="py-16 md:py-24"
      >
        <div className="container mx-auto px-4">
          <div className="relative aspect-[2/1] mb-12 overflow-hidden rounded-lg shadow-lg">
            {/* Map Container */}
            <div className="w-full h-full bg-[#001F3F] bg-opacity-10">
              <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
                alt="Carte mondiale des bureaux Gethrought" 
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-[#001F3F] bg-white bg-opacity-80 p-6 rounded-lg max-w-md">
                  <h3 className="text-2xl font-bold mb-3">Présent dans plus de 130 pays</h3>
                  <p>Notre réseau global vous accompagne partout où votre entreprise a besoin d'expertise.</p>
                </div>
              </div>
              
              {/* Location Markers */}
              {locations?.map((location, index) => (
                <div 
                  key={location.id}
                  className="absolute h-3 w-3 bg-[#E00000] rounded-full animate-pulse" 
                  style={{ 
                    top: `${35 + (index * 2)}%`, 
                    left: `${45 + (index % 7)}%`
                  }}
                  title={location.title}
                ></div>
              ))}
            </div>
          </div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-5xl font-bold text-[#E00000] mb-4">8</div>
              <p className="text-lg">pôles principaux à Paris, Lyon, Rennes, Aix-en-Provence, Toulouse, Le Havre, Londres & Casablanca</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-5xl font-bold text-[#E00000] mb-4">130</div>
              <p className="text-lg">pays où nous sommes présents de part notre modèle Gethrought Global Alliance</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-5xl font-bold text-[#E00000] mb-4">+30</div>
              <p className="text-lg">missions réalisées à l'international</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Offices Section */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="py-16 md:py-24 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-bold mb-12 text-center"
          >
            Nos bureaux principaux
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading ? (
              // Loading state
              Array(8).fill(0).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 h-[200px] animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))
            ) : (
              locations?.map((location) => (
                <motion.div key={location.id} variants={fadeInUp}>
                  <LocationCard location={location} />
                </motion.div>
              ))
            )}
          </div>
        </div>
      </motion.section>

      {/* Global Alliance Section */}
      <motion.section
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="py-16 md:py-24"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl font-bold mb-6"
              >
                Gethrought Global Alliance
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                className="text-gray-600 mb-8"
              >
                Notre modèle unique d'alliance internationale nous permet de vous proposer un point de contact unique pour coordonner vos besoins partout dans le monde.
              </motion.p>
              
              <motion.div 
                variants={staggerContainer}
                className="space-y-6"
              >
                <motion.div variants={fadeInUp} className="flex items-start">
                  <div className="bg-[#E00000] rounded-full p-2 mr-4 flex-shrink-0">
                    <i className="fas fa-check text-white"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Un interlocuteur unique</h3>
                    <p className="text-gray-600">Votre contact Gethrought coordonne l'ensemble de vos besoins internationaux.</p>
                  </div>
                </motion.div>
                
                <motion.div variants={fadeInUp} className="flex items-start">
                  <div className="bg-[#E00000] rounded-full p-2 mr-4 flex-shrink-0">
                    <i className="fas fa-check text-white"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Des standards homogènes</h3>
                    <p className="text-gray-600">Nous garantissons une qualité de service constante sur tous les territoires.</p>
                  </div>
                </motion.div>
                
                <motion.div variants={fadeInUp} className="flex items-start">
                  <div className="bg-[#E00000] rounded-full p-2 mr-4 flex-shrink-0">
                    <i className="fas fa-check text-white"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Une approche multi-culturelle</h3>
                    <p className="text-gray-600">Notre réseau d'experts locaux comprend les spécificités de chaque marché.</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
            
            <motion.div variants={fadeInUp}>
              <img 
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Gethrought Global Alliance" 
                className="rounded-lg shadow-lg w-full"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="py-16 md:py-20 bg-[#001F3F] text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Un besoin à l'international ?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contactez-nous pour discuter de vos projets internationaux et découvrir comment notre réseau global peut vous accompagner.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-[#E00000] hover:bg-[#c00000] text-white py-3 px-8 rounded transition-all duration-300 transform hover:-translate-y-1 font-medium"
          >
            Nous contacter
          </a>
        </div>
      </motion.section>
    </>
  );
};

export default International;
