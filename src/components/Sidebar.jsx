import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaTelegramPlane, FaPhone, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaUser } from "react-icons/fa6";
import { useState } from "react";

export default function Sidebar({ className, onCollapse }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    if (onCollapse) onCollapse(newCollapsedState);
  };

  // Content animation variants
  const contentVariants = {
    expanded: {
      opacity: 1,
      width: "100%",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    collapsed: {
      opacity: 0,
      width: 0,
      transition: {
        duration: 0.2,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  // Item animation for staggered effect
  const itemVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -10 }
  };

  return (
    <AnimatePresence mode="wait">
      {isCollapsed ? (
        <motion.aside
          key="collapsed"
          className={`flex flex-col justify-start items-center transition-all duration-300 relative ${className} md:w-18 md:min-w-[4.5rem] w-18 min-w-[4.5rem] p-0 backdrop-blur-sm`}
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{ 
            type: "spring", 
            stiffness: 250,
            damping: 25
          }}
        >
          <motion.div
            className="flex flex-col items-center w-full pt-4"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.img
              src="/self.webp"
              alt="Ahmed Elmasri"
              className="rounded-full border-2 border-[#1ED696] shadow-md object-cover cursor-pointer w-16 h-16"
              whileHover={{ 
                scale: 1.1, 
                boxShadow: "0 0 15px rgba(30, 214, 150, 0.6)",
                transition: { type: "spring", stiffness: 400, damping: 10 } 
              }}
              whileTap={{ scale: 0.92 }}
              onClick={handleToggle}
            />
          </motion.div>
        </motion.aside>
      ) : (
        <motion.aside
          key="expanded"
          className={`sidebar flex flex-col justify-between transition-all duration-500 relative ${className}`}
          initial={{ opacity: 0, x: -60, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -60, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 180, damping: 22 }}
        >
          <div className="p-6 relative">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 250, damping: 18 }}
              className="flex md:justify-start justify-center"
            >
              <motion.img
                src="/self.webp"
                alt="Ahmed Elmasri"
                className="rounded-full border-2 border-[#1ED696] shadow-lg object-cover transition-all duration-300 cursor-pointer w-24 h-24 mb-6"
                whileHover={{ scale: 1.10, boxShadow: "0 0 22px rgba(30, 214, 150, 0.7)" }}
                onClick={handleToggle}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
              />
            </motion.div>
            <AnimatePresence>
              <motion.div
                variants={contentVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                className="w-full overflow-hidden"
                transition={{ type: "spring", stiffness: 180, damping: 22 }}
              >
                <motion.h1 
                  className="text-2xl font-bold mb-2 text-[#FAF3DD] text-center md:text-left"
                  variants={itemVariants}
                >
                  ELMASRI Ahmed
                </motion.h1>
                
                <motion.h2 
                  className="text-base font-medium text-[#1ED696] mb-3 text-center md:text-left"
                  variants={itemVariants}
                >
                  Full Stack Developer & Server Engineer
                </motion.h2>
                
                <motion.p 
                  className="text-sm text-[#FCFFF0]/80 leading-relaxed mb-6 text-center md:text-left"
                  variants={itemVariants}
                >
                  Passionate about building scalable web applications and robust backend systems. 
                  Experienced with React, Node.js, and cloud infrastructure. 
                  Always learning, always building.
                </motion.p>
                
                {/* Contact Information Section */}
                <motion.div
                  variants={itemVariants}
                  className="border-t border-[#1A936F]/30 pt-3 mb-6"
                >
                  <h3 className="text-lg font-semibold mb-2 text-[#FAF3DD] text-center md:text-left">Contact Information</h3>
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center gap-2 text-[#FCFFF0]">
                      <FaUser className="text-[#8FE7C3]" /> 
                      <span>Elmasri Ahmed</span>
                    </div>
                    
                    <a href="mailto:foxdeath100@gmail.com" className="flex items-center gap-2 text-[#FCFFF0] hover:text-[#1ED696] transition">
                      <SiGmail className="text-[#8FE7C3]" /> 
                      foxdeath100@gmail.com
                    </a>
                    
                    <a href="tel:+213540430098" className="flex items-center gap-2 text-[#FCFFF0] hover:text-[#1ED696] transition">
                      <FaPhone className="text-[#8FE7C3]" /> 
                      +213540430098
                    </a>
                    
                    <a href="https://www.linkedin.com/in/ahmed-elmasri-149aa626b/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#FCFFF0] hover:text-[#1ED696] transition">
                      <FaLinkedin className="text-[#8FE7C3]" /> 
                      ahmed-elmasri
                    </a>
                    
                    <a href="https://github.com/0asaca0rum0" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#FCFFF0] hover:text-[#1ED696] transition">
                      <FaGithub className="text-[#8FE7C3]" /> 
                      0asaca0rum0
                    </a>
                    
                    <a href="https://t.me/karasuma_renya" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#FCFFF0] hover:text-[#1ED696] transition">
                      <FaTelegramPlane className="text-[#8FE7C3]" /> 
                      @karasuma_renya
                    </a>
                  </div>
                </motion.div>
                
                <motion.div
                  variants={itemVariants}
                  className="border-t border-[#1A936F]/30 pt-3 mb-6"
                >
                  <h3 className="text-lg font-semibold mb-2 text-[#FAF3DD] text-center md:text-left">Skills</h3>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {["React", "Node.js", "Next.js", "MongoDB", "Express", "Tailwind CSS"].map((skill) => (
                      <span key={skill} className="bg-[#1A936F]/20 text-[#8FE7C3] text-xs px-3 py-1 rounded-full transition-all hover:bg-[#1A936F]/40">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
