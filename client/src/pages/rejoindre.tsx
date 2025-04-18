import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, fadeInUp } from "@/lib/animations";
import JobCard from "@/components/ui/job-card";
import { Job } from "@shared/schema";

const Rejoindre = () => {
  const { data: jobs, isLoading } = useQuery<Job[]>({
    queryKey: ["/api/jobs"],
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Nous rejoindre</h1>
            <p className="text-xl text-gray-600">
              Rejoignez une équipe dynamique et passionnée qui valorise l'expertise, l'innovation et le développement personnel.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Company Culture Video Banner */}
      <motion.section
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="py-16 md:py-24"
      >
        <div className="container mx-auto px-4">
          <div className="relative h-80 rounded-xl overflow-hidden mb-16">
            <img 
              src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
              alt="Gethrought company culture" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#001F3F] bg-opacity-70 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Nos valeurs & notre culture</h3>
                <button className="bg-[#E00000] hover:bg-[#c00000] text-white px-6 py-3 rounded-full flex items-center mx-auto transition-all duration-300 transform hover:-translate-y-1">
                  <i className="fas fa-play mr-2"></i>
                  Voir la vidéo
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Job Listings */}
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
            Nos offres d'emploi
          </motion.h2>
          
          <div className="space-y-6">
            {isLoading ? (
              // Loading state
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="bg-white p-6 md:p-8 rounded-lg shadow-md h-[180px] animate-pulse">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="w-full">
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                      <div className="flex items-center mb-4">
                        <div className="h-4 bg-gray-200 rounded w-20 mr-6"></div>
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                      </div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <div className="h-10 w-24 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              jobs?.map((job) => (
                <motion.div key={job.id} variants={fadeInUp}>
                  <JobCard job={job} />
                </motion.div>
              ))
            )}
          </div>
          
          <motion.div 
            variants={fadeInUp}
            className="mt-8 text-center"
          >
            <a 
              href="#" 
              className="inline-flex items-center text-[#E00000] font-medium hover:underline"
            >
              Voir toutes nos offres
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="py-16 md:py-24"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-bold mb-12 text-center"
          >
            Pourquoi nous rejoindre ?
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              variants={fadeInUp}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="text-[#E00000] text-4xl mb-4">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Formation continue</h3>
              <p className="text-gray-600">
                Nous investissons 11% de notre masse salariale dans la formation de nos collaborateurs pour développer constamment leurs compétences.
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="text-[#E00000] text-4xl mb-4">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Progression de carrière</h3>
              <p className="text-gray-600">
                Un parcours de carrière structuré et transparent avec des perspectives d'évolution vers des postes de management.
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="text-[#E00000] text-4xl mb-4">
                <i className="fas fa-users"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Travail d'équipe</h3>
              <p className="text-gray-600">
                Une culture collaborative où l'entraide et le partage de connaissances sont valorisés au quotidien.
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="text-[#E00000] text-4xl mb-4">
                <i className="fas fa-globe"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Dimension internationale</h3>
              <p className="text-gray-600">
                Des opportunités de travailler sur des missions internationales et d'évoluer dans un environnement multiculturel.
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="text-[#E00000] text-4xl mb-4">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-gray-600">
                Un environnement qui favorise l'innovation et la créativité, avec des outils technologiques de pointe.
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="text-[#E00000] text-4xl mb-4">
                <i className="fas fa-balance-scale"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Équilibre de vie</h3>
              <p className="text-gray-600">
                Nous sommes attentifs à l'équilibre entre vie professionnelle et personnelle, avec des politiques de flexibilité.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Spontaneous Application */}
      <motion.section
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="py-16 md:py-24 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Candidature spontanée</h3>
                <p className="text-gray-600 mb-6">
                  Vous ne trouvez pas de poste correspondant à votre profil ? N'hésitez pas à nous envoyer votre candidature spontanée.
                </p>
                <a 
                  href="/contact" 
                  className="inline-block bg-[#E00000] hover:bg-[#c00000] text-white py-3 px-8 rounded transition-all duration-300 transform hover:-translate-y-1 font-medium"
                >
                  Postuler spontanément
                </a>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Candidature spontanée" 
                  className="w-full h-auto rounded-lg shadow"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Rejoindre;
