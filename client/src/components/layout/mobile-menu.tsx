import { Link } from "wouter";
import { motion } from "framer-motion";
import logoImage from "../../assets/logo.png";

interface MobileMenuProps {
  onClose: () => void;
}

const MobileMenu = ({ onClose }: MobileMenuProps) => {
  const menuVariants = {
    hidden: {
      x: "100%",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
  };

  const menuItems = [
    { href: "/solutions", label: "Nos solutions" },
    { href: "/solutions", label: "Le cabinet" },
    { href: "/international", label: "À l'international" },
    { href: "/nous-rejoindre", label: "Nous rejoindre" },
    { href: "/actualites", label: "Actualités" },
    { href: "/contact", label: "Contact" },
  ];

  const linkVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.05,
        duration: 0.3,
      },
    }),
  };

  return (
    <motion.div
      className="fixed inset-0 bg-white z-50 overflow-y-auto"
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <a className="flex items-center">
              <img
                src={logoImage}
                alt="GTAC Logo"
                className="h-12"
              />
            </a>
          </Link>
          <button
            className="text-[#001F3F] focus:outline-none"
            onClick={onClose}
            aria-label="Close mobile menu"
          >
            <i className="fas fa-times text-2xl"></i>
          </button>
        </div>
        <nav className="flex flex-col space-y-6">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.label}
              custom={index}
              variants={linkVariants}
              initial="hidden"
              animate="visible"
            >
              <Link href={item.href}>
                <a
                  className="text-gray-800 hover:text-[#c4121f] font-medium text-xl transition-colors"
                  onClick={onClose}
                >
                  {item.label}
                </a>
              </Link>
            </motion.div>
          ))}
          <motion.div
            className="pt-4 mt-4 border-t border-gray-300"
            variants={linkVariants}
            custom={menuItems.length}
            initial="hidden"
            animate="visible"
          >
            <div className="flex items-center space-x-2">
              <a href="#" className="text-[#c4121f] font-medium">
                FR
              </a>
              <span>/</span>
              <a href="#" className="text-gray-800 hover:text-[#c4121f] font-medium">
                EN
              </a>
            </div>
          </motion.div>
        </nav>
      </div>
    </motion.div>
  );
};

export default MobileMenu;
