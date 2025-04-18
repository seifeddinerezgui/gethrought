import { Link } from "wouter";
import { motion } from "framer-motion";
import { News } from "@shared/schema";

interface NewsCardProps {
  news: News;
}

const NewsCard = ({ news }: NewsCardProps) => {
  // Format the date
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden h-full"
      whileHover={{ 
        y: -3, 
        boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)" 
      }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={news.imageUrl} 
          alt={news.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-0 left-0 bg-[#E00000] text-white px-3 py-1 text-sm">
          {formatDate(news.publishDate)}
        </div>
        <div className="absolute top-0 right-0 bg-[#001F3F] text-white px-3 py-1 text-sm">
          {news.category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3">{news.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{news.excerpt}</p>
        <Link href={`/actualites/${news.id}`}>
          <a className="text-[#E00000] font-medium hover:underline flex items-center">
            Lire la suite
            <i className="fas fa-arrow-right ml-2 text-sm"></i>
          </a>
        </Link>
      </div>
    </motion.div>
  );
};

export default NewsCard;
