import { motion } from "framer-motion";
import { Job } from "@shared/schema";

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <motion.div 
      className="bg-white p-6 md:p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
      whileHover={{ y: -3 }}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h4 className="text-xl font-bold mb-2">{job.title}</h4>
          <div className="flex items-center text-gray-600 mb-4">
            <i className="fas fa-map-marker-alt text-[#E00000] mr-2"></i>
            <span>{job.location}</span>
            <span className="mx-3">|</span>
            <i className="fas fa-briefcase text-[#E00000] mr-2"></i>
            <span>{job.contractType}</span>
          </div>
          <p className="text-gray-600 mb-4 md:mb-0">{job.description}</p>
        </div>
        <div className="flex-shrink-0 mt-4 md:mt-0">
          <a 
            href={`/nous-rejoindre/postuler/${job.id}`}
            className="inline-block bg-[#E00000] hover:bg-[#c00000] text-white py-2 px-6 rounded transition-all duration-300 transform hover:-translate-y-1 font-medium"
          >
            Postuler
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;
