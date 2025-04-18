import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, fadeInUp } from "@/lib/animations";
import SolutionCard from "@/components/ui/solution-card";
import { Solution } from "@shared/schema";

const Solutions = () => {
  const { data: solutions, isLoading } = useQuery<Solution[]>({
    queryKey: ["/api/solutions"],
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos solutions</h1>
            <p className="text-xl text-gray-600">
              Gethrought accompagne l'entreprise, ses dirigeants et ses actionnaires avec des solutions adaptées à leurs besoins spécifiques.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Solutions Grid */}
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
            {isLoading ? (
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
        </div>
      </motion.section>

      {/* More About Services */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="py-16 md:py-24 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl font-bold mb-6">Des solutions <span className="italic">dédiées</span> pour vos besoins spécifiques</h2>
              <p className="text-gray-600 mb-8">
                Chez Gethrought, nous avons développé des offres spécifiques pour répondre aux enjeux particuliers de certains secteurs ou de certaines typologies d'entreprises.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-[#E00000] rounded-full p-2 mr-4 flex-shrink-0">
                    <i className="fas fa-leaf text-white"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Développement durable</h3>
                    <p className="text-gray-600">Nous vous accompagnons dans vos démarches ESG et vos obligations de reporting extra-financier.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#E00000] rounded-full p-2 mr-4 flex-shrink-0">
                    <i className="fas fa-university text-white"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Banque & Assurance</h3>
                    <p className="text-gray-600">Notre expertise sectorielle vous aide à naviguer dans un environnement réglementaire complexe.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#E00000] rounded-full p-2 mr-4 flex-shrink-0">
                    <i className="fas fa-rocket text-white"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Start-Up & Scale-Up</h3>
                    <p className="text-gray-600">Un accompagnement sur mesure pour les entreprises innovantes en phase de croissance.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="relative">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Solutions dédiées" 
                className="rounded-lg shadow-lg w-full"
              />
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-lg shadow-lg max-w-xs hidden md:block">
                <p className="font-bold text-[#E00000]">" Une plateforme d'expertises mutualisées pour vous offrir un accompagnement complet et cohérent. "</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Innovation Section */}
      <motion.section
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="py-16 md:py-24 bg-[#001F3F] text-white"
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Innovation by Gethrought</h2>
            <p className="text-xl mb-10">
              Des technologies au service de nos experts et de nos clients pour une meilleure efficacité et des insights plus pertinents.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="p-6 border border-white border-opacity-20 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-300">
                <div className="text-4xl mb-4">
                  <i className="fas fa-chart-line"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Data Analytics</h3>
                <p className="text-white text-opacity-80">
                  Transformez vos données en décisions stratégiques grâce à nos outils d'analyse avancés.
                </p>
              </div>
              
              <div className="p-6 border border-white border-opacity-20 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-300">
                <div className="text-4xl mb-4">
                  <i className="fas fa-robot"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Process Automation</h3>
                <p className="text-white text-opacity-80">
                  Automatisez vos processus comptables et financiers pour gagner en efficacité.
                </p>
              </div>
              
              <div className="p-6 border border-white border-opacity-20 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-300">
                <div className="text-4xl mb-4">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Risk Intelligence</h3>
                <p className="text-white text-opacity-80">
                  Anticipez et maîtrisez vos risques grâce à notre plateforme de veille et d'analyse.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Solutions;
