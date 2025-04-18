import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import MobileMenu from "./mobile-menu";
import logoImage from "../../assets/logo.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className={`sticky top-0 z-50 bg-white ${
          isScrolled ? "shadow-md py-2" : "py-4"
        } transition-all duration-300`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/">
              <a className="flex items-center">
                <img
                  src={logoImage}
                  alt="GTAC Logo"
                  className="h-12"
                />
              </a>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <NavLink href="/solutions" active={location === "/solutions"}>
                Nos solutions
              </NavLink>
              <NavLink href="/solutions" active={location.startsWith("/le-cabinet")}>
                Le cabinet
              </NavLink>
              <NavLink href="/international" active={location === "/international"}>
                À l'international
              </NavLink>
              <NavLink href="/nous-rejoindre" active={location === "/nous-rejoindre"}>
                Nous rejoindre
              </NavLink>
              <NavLink href="/actualites" active={location === "/actualites"}>
                Actualités
              </NavLink>
              <NavLink href="/contact" active={location === "/contact"}>
                Contact
              </NavLink>
              <div className="border-l border-gray-300 h-5 mx-2"></div>
              <div className="flex items-center space-x-2">
                <NavLink href="#" active={true}>
                  FR
                </NavLink>
                <span>/</span>
                <NavLink href="#" active={false}>
                  EN
                </NavLink>
              </div>
            </nav>
            
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden text-[#001F3F] focus:outline-none" 
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile menu"
            >
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu onClose={() => setIsMobileMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

interface NavLinkProps {
  href: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink = ({ href, active, children }: NavLinkProps) => {
  return (
    <Link href={href}>
      <a className={`font-medium transition-colors ${
        active ? "text-[#c4121f]" : "text-gray-800 hover:text-[#c4121f]"
      }`}>
        {children}
      </a>
    </Link>
  );
};

export default Header;
