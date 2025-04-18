import { Link } from "wouter";
import { motion } from "framer-motion";
import { Solution } from "@shared/schema";

interface SolutionCardProps {
  solution: Solution;
}

const SolutionCard = ({ solution }: SolutionCardProps) => {
  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 h-full"
      whileHover={{ 
        y: -5, 
        boxShadow: "0 10px 25px rgba(0, 31, 63, 0.1)" 
      }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={solution.imageUrl}
          alt={solution.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="text-[#E00000] font-medium mb-2">_{solution.order}_</div>
        <h3 className="text-xl font-bold mb-3">{solution.title}</h3>
        <p className="text-gray-600 mb-4">{solution.description}</p>
        <Link href={solution.link}>
          <a className="text-[#E00000] font-medium hover:underline flex items-center">
            Découvrir nos services
            <i className="fas fa-arrow-right ml-2 text-sm"></i>
          </a>
        </Link>
      </div>
    </motion.div>
  );
};

export default SolutionCard;
