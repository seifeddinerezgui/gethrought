import { Link } from "wouter";
import NewsletterForm from "../ui/newsletter-form";

const Footer = () => {
  return (
    <footer className="bg-[#001F3F] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <img
              src="https://placehold.co/150x40/e00000/FFFFFF?text=GETHROUGHT"
              alt="Gethrought Logo"
              className="h-12 mb-6"
            />
            <p className="mb-6">
              Cabinet d'expertise comptable, d'audit et de conseil spécialisé dans l'accompagnement des entreprises et de leurs dirigeants.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#E00000] transition-colors">
                <i className="fab fa-linkedin-in text-xl"></i>
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#E00000] transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#E00000] transition-colors">
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">Nos solutions</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/solutions">
                  <a className="text-gray-300 hover:text-white transition-colors">
                    Audit légal et contractuel
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/solutions">
                  <a className="text-gray-300 hover:text-white transition-colors">
                    Conseil financier
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/solutions">
                  <a className="text-gray-300 hover:text-white transition-colors">
                    Conseil et support opérationnels
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/solutions">
                  <a className="text-gray-300 hover:text-white transition-colors">
                    Maîtrise des risques et compliance
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/solutions">
                  <a className="text-gray-300 hover:text-white transition-colors">
                    Développement durable
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">Liens rapides</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/solutions">
                  <a className="text-gray-300 hover:text-white transition-colors">
                    Le cabinet
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/international">
                  <a className="text-gray-300 hover:text-white transition-colors">
                    À l'international
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/nous-rejoindre">
                  <a className="text-gray-300 hover:text-white transition-colors">
                    Nous rejoindre
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/actualites">
                  <a className="text-gray-300 hover:text-white transition-colors">
                    Actualités
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-300 hover:text-white transition-colors">
                    Contact
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">Newsletter</h3>
            <p className="mb-4">
              Inscrivez-vous à notre newsletter pour recevoir nos dernières actualités
            </p>
            <NewsletterForm buttonFullWidth />
          </div>
        </div>
        
        <div className="border-t border-white border-opacity-20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} Gethrought. Tous droits réservés.
          </div>
          <div className="flex space-x-6">
            <Link href="/mentions-legales">
              <a className="text-gray-400 hover:text-white transition-colors">
                Mentions légales
              </a>
            </Link>
            <Link href="/politique-confidentialite">
              <a className="text-gray-400 hover:text-white transition-colors">
                Politique de confidentialité
              </a>
            </Link>
            <Link href="/cookies">
              <a className="text-gray-400 hover:text-white transition-colors">
                Cookies
              </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
