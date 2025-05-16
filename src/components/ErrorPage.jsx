import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center font-['Comfortaa'] py-8 px-4">
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Decorative line */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-[#1ED696]/40 to-transparent mb-4 mx-auto"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.2 }}
        />

        {/* Error Icon */}
        <motion.div 
          className="mb-6 mx-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <div className="w-20 h-20 rounded-full bg-[#121212] border border-[#1A936F]/30 flex items-center justify-center mx-auto relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#1A936F]/10 to-[#1ED696]/10 animate-pulse"></div>
            <FaExclamationTriangle className="text-[#1ED696] text-4xl" />
          </div>
        </motion.div>

        {/* Error Title */}
        <motion.h2
          className="text-2xl font-bold mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-[#1A936F] to-[#1ED696]">
            Page Not Found
          </span>
        </motion.h2>

        {/* Error Description */}
        <motion.p
          className="text-[#8FE7C3]/80 text-sm mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>

        {/* Action Button */}
        <motion.button
          onClick={() => navigate('/projects')}
          className="bg-gradient-to-r from-[#114E3C] to-[#1A936F] hover:from-[#1A936F] hover:to-[#1ED696] px-5 py-2.5 rounded-md text-[#FCFFF0] flex items-center gap-2 mx-auto transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <FaHome size={16} />
          <span>Back to Projects</span>
        </motion.button>

        {/* Decorative line */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-[#1ED696]/40 to-transparent mt-4 mx-auto"
          initial={{ width: 0 }}
          animate={{ width: "80%" }}
          transition={{ duration: 1.2, delay: 0.2 }}
        />
      </motion.div>
    </div>
  );
};

export default ErrorPage;
