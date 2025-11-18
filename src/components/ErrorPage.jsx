import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full  flex items-center justify-center font-['Comfortaa']  px-4 py-10">
      <motion.div
        className=" max-w-xl w-full bg-gradient-to-br from-[#050708] via-[#050A10] to-[#020608] border border-[#1A936F]/20 rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.85)] overflow-hidden"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* subtle gradient accents */}
        <div className="pointer-events-none absolute -top-24 -right-10 w-56 h-56 bg-[#1ED696]/12 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 w-56 h-56 bg-[#1A936F]/14 blur-3xl" />

        {/* top border glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#1ED696]/70 to-transparent" />

        <div className="relative px-6 sm:px-8 py-7 sm:py-8 text-center flex flex-col items-center gap-4">
          {/* Code + Icon */}
          <div className="flex flex-col items-center gap-3">
            <motion.div
              className="inline-flex items-center gap-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="relative">
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-[#050708] border border-[#1A936F]/40 flex items-center justify-center shadow-[0_0_24px_rgba(30,214,150,0.35)]">
                  <FaExclamationTriangle className="text-[#1ED696] text-3xl" />
                </div>
                <motion.div
                  className="absolute -inset-2 rounded-3xl border border-[#1ED696]/10"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2.3, repeat: Infinity }}
                />
              </div>

              <div className="text-left hidden sm:block">
                <p className="text-xs uppercase tracking-[0.3em] text-[#8FE7C3]/60">Error</p>
                <p className="text-3xl font-bold text-[#FAF3DD] leading-tight">404</p>
              </div>
            </motion.div>

            {/* 404 for mobile */}
            <motion.div
              className="sm:hidden text-center"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
            >
              <p className="text-xs uppercase tracking-[0.28em] text-[#8FE7C3]/60">Error</p>
              <p className="text-3xl font-bold text-[#FAF3DD] leading-tight">404</p>
            </motion.div>
          </div>

          {/* Title */}
          <motion.h1
            className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1A936F] via-[#1ED696] to-[#8FE7C3]">
              Looks like you're off the map
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-xs sm:text-sm text-[#CFFAEA]/75 max-w-md mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
          >
            The page you're trying to reach doesn't exist anymore or never did. You can head back to the
            projects page or return home to continue exploring the portfolio.
          </motion.p>

          {/* Divider */}
          <motion.div
            className="my-2 h-px w-full max-w-xs bg-gradient-to-r from-transparent via-[#1ED696]/40 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.32, duration: 0.5 }}
          />

          {/* Actions */}
          <motion.div
            className="mt-1 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.36 }}
          >
            <motion.button
              onClick={() => navigate('/projects')}
              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-[#FCFFF0] bg-gradient-to-r from-[#114E3C] to-[#1A936F] hover:from-[#1A936F] hover:to-[#1ED696] shadow-[0_10px_30px_rgba(30,214,150,0.35)] transition-all"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.96 }}
            >
              <FaHome size={14} />
              <span>Back to Projects</span>
            </motion.button>

            <motion.button
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-[#8FE7C3] bg-[#050708]/60 border border-[#1A936F]/35 hover:bg-[#050708]/90 hover:text-[#FCFFF0] transition-all"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#1ED696]" />
              <span>Go to Home</span>
            </motion.button>
          </motion.div>

          {/* Footer hint */}
          <motion.p
            className="mt-3 text-[11px] text-[#8FE7C3]/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            If you believe this is an error, please use the contact page to let me know.
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
