import { motion } from "framer-motion";
import { fadeIn, staggerContainer, fadeInUp } from "@/lib/animations";
import ContactForm from "@/components/ui/contact-form";

const Contact = () => {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact</h1>
            <p className="text-xl text-gray-600">
              Besoin de plus d'informations ? Contactez-nous pour échanger sur vos projets et comment nous pouvons vous accompagner.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Contact Content */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="py-16 md:py-24"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div variants={fadeInUp}>
              <ContactForm />
            </motion.div>
            
            {/* Map and Contact Info */}
            <motion.div variants={fadeInUp}>
              <div className="h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-md">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3195.3147940971984!2d10.19271107678393!3d36.8220221471954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDQ5JzE5LjIiTiAxMMKwMTEnNDMuMCJF!5e0!3m2!1sfr!2sus!4v1692874072887!5m2!1sfr!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps - GTAC Tunis office"
                ></iframe>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-3">Siège Paris</h3>
                  <address className="not-italic text-gray-600 mb-3">
                    11, rue de Laborde<br />
                    75008 Paris<br />
                    France
                  </address>
                  <div className="flex flex-col space-y-2">
                    <a href="tel:+33140089950" className="text-[#c4121f] hover:underline">+33 (0) 1 40 08 99 50</a>
                    <a href="mailto:contact@gethrought.com" className="text-[#c4121f] hover:underline">contact@gethrought.com</a>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-3">Horaires d'ouverture</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex justify-between">
                      <span>Lundi - Jeudi</span>
                      <span>9h - 18h30</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Vendredi</span>
                      <span>9h - 18h</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Samedi - Dimanche</span>
                      <span>Fermé</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Other Locations */}
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
            Nos autres bureaux
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div 
              variants={fadeInUp}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h4 className="text-xl font-bold mb-3">Auvergne-Rhône-Alpes</h4>
              <address className="not-italic text-gray-600 mb-3">
                32, rue de la République<br />
                69002 Lyon
              </address>
              <div className="flex flex-col space-y-2">
                <a href="tel:+33140089950" className="text-[#c4121f] hover:underline">+33 (0) 1 40 08 99 50</a>
                <a href="mailto:contact@gethrought.com" className="text-[#c4121f] hover:underline">contact@gethrought.com</a>
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h4 className="text-xl font-bold mb-3">Royaume-Uni</h4>
              <address className="not-italic text-gray-600 mb-3">
                Exmouth House – 3-11 Pine St,<br />
                London EC1R 0JH, United Kingdom
              </address>
              <div className="flex flex-col space-y-2">
                <a href="tel:+447979313103" className="text-[#c4121f] hover:underline">+44 (0) 7979 3131 03</a>
                <a href="mailto:contact@gethrought.com" className="text-[#c4121f] hover:underline">contact@gethrought.com</a>
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h4 className="text-xl font-bold mb-3">Maroc</h4>
              <address className="not-italic text-gray-600 mb-3">
                23, rue El Amaraoui Brahim (Ex Nolly)<br />
                Casablanca
              </address>
              <div className="flex flex-col space-y-2">
                <a href="tel:+212522276372" className="text-[#c4121f] hover:underline">+212 (0) 5 22 27 63 72</a>
                <a href="mailto:contact@gethrought.com" className="text-[#c4121f] hover:underline">contact@gethrought.com</a>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            variants={fadeInUp}
            className="mt-12 text-center"
          >
            <a 
              href="/international" 
              className="inline-flex items-center text-[#c4121f] font-medium hover:underline"
            >
              Voir tous nos bureaux
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </motion.div>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Vous souhaitez nous rejoindre ?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Découvrez nos offres d'emploi et envoyez-nous votre candidature pour faire partie de notre équipe.
          </p>
          <a 
            href="/nous-rejoindre" 
            className="inline-block bg-[#c4121f] hover:bg-[#a50f1a] text-white py-3 px-8 rounded transition-all duration-300 transform hover:-translate-y-1 font-medium"
          >
            Nos offres d'emploi
          </a>
        </div>
      </motion.section>
    </>
  );
};

export default Contact;
