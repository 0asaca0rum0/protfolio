import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom'; // Import NavLink
import { TbFileCv } from "react-icons/tb";
import { FaUser, FaLaptopCode } from "react-icons/fa";

// Removed activeSection and onNavigate from props
const FloatingNav = ({ items, isMobile, showSidebar, toggleSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/cv.pdf';
    link.download = 'Ahmed Elmasri CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-['Comfortaa']">
      <motion.button
        className="bg-[#1A936F]/10 hover:bg-[#1A936F]/20 border border-[#1A936F]/30 text-white px-3 py-3.5 rounded-full shadow-lg flex items-center justify-center backdrop-blur-sm transition-all"
        onClick={toggleMenu}
        whileTap={{ scale: 0.95 }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 0 15px rgba(30, 214, 150, 0.5)" 
        }}
      >
        <div className="w-9 h-9 rounded-full bg-[#1A936F]/20 flex items-center justify-center">
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="#8FE7C3" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
          </svg>
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 bg-[#131313]/90 border border-[#1A936F]/30 backdrop-blur-md rounded-xl p-3 shadow-lg"
            initial={{ scale: 0.8, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <div className="flex flex-col gap-2.5">
              {/* Menu items with improved spacing and text size */}
              <motion.button
                onClick={handleDownloadCV}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-[#1A936F]/10 text-[#FCFFF0] hover:bg-[#1A936F]/20 transition-all duration-300 w-full text-left"
                whileHover={{ x: 5 }}
              >
                <span className="p-1.5 bg-[#1A936F]/20 rounded-full">
                  <TbFileCv size={16} className="text-[#8FE7C3]" />
                </span>
                <span className="text-sm">Download CV</span>
              </motion.button>
              
              {windowWidth < 768 && (
                <motion.button
                  onClick={() => {
                    toggleSidebar();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-[#1A936F]/10 text-[#FCFFF0] hover:bg-[#1A936F]/20 transition-all duration-300 w-full text-left"
                  whileHover={{ x: 5 }}
                >
                  <span className="p-1.5 bg-[#1A936F]/20 rounded-full">
                    {showSidebar ? 
                      <FaLaptopCode size={16} className="text-[#8FE7C3]" /> : 
                      <FaUser size={16} className="text-[#8FE7C3]" />
                    }
                  </span>
                  <span className="text-sm">{showSidebar ? "View Content" : "View Profile"}</span>
                </motion.button>
              )}
              
              {(!isMobile || (isMobile && !showSidebar)) && items.map((item, index) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-lg ${
                      isActive
                        ? "bg-[#1A936F]/40 text-[#FCFFF0]"
                        : "bg-[#1A936F]/10 text-[#FCFFF0]/70 hover:bg-[#1A936F]/20"
                    } transition-all duration-300 w-full text-left`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <motion.span 
                        className={`p-1.5 ${
                          isActive 
                            ? "bg-[#1A936F]/50" 
                            : "bg-[#1A936F]/20"
                        } rounded-full`}
                        whileHover={{ scale: 1.1 }}
                      >
                        {React.cloneElement(item.icon, { 
                          className: "text-[#8FE7C3]",
                          size: 16
                        })}
                      </motion.span>
                      <motion.span whileHover={{ x: 5 }} className="text-sm">{item.label}</motion.span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingNav;
