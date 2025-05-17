import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { TbFileCv } from "react-icons/tb";
import { FaUser, FaLaptopCode } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FaEnvelope, FaCode, FaBars } from "react-icons/fa6";


const Header = ({ items, isMobile, showSidebar, toggleSidebar }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeIndicator, setActiveIndicator] = useState({ left: 0, width: 0 });
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const headerRef = useRef(null);
  const location = useLocation();
  
  // Auto-hide header on scroll
  useEffect(() => {
    let timeout = null;
    let lastScrollTop = 0;
    const controlHeader = () => {
      const currentScrollY = window.scrollY;
      // Determine scroll direction
      if (currentScrollY > lastScrollTop) {
        // Scrolling down
        if (currentScrollY > 80) { // Only hide after scrolling a bit
          setHeaderVisible(false);
        }
      } else {
        // Scrolling up
        setHeaderVisible(true);
      }
      
      // Set scrolled state for styling
      if (currentScrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Auto-hide the header after 3 seconds of inactivity
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (currentScrollY > 80 && !isMenuOpen) {
          setHeaderVisible(false);
        }
      }, 3000);
      
      lastScrollTop = currentScrollY;
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlHeader);
    
    // Move mouse to top of screen to reveal header
    const handleMouseMove = (e) => {
      if (e.clientY < 60) {
        setHeaderVisible(true);
        // Reset the timeout when mouse is near the top
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          if (window.scrollY > 80 && !isMenuOpen) {
            setHeaderVisible(false);
          }
        }, 3000);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', controlHeader);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, [isMenuOpen]);
  
  // Update indicator position based on active route
  useEffect(() => {
    const updateActiveIndicator = () => {
      const activeItem = document.querySelector('.nav-link.active');
      if (activeItem) {
        const { left, width } = activeItem.getBoundingClientRect();
        const parent = activeItem.parentElement?.getBoundingClientRect();
        
        if (parent) {
          setActiveIndicator({
            left: left - parent.left,
            width: width
          });
        }
      }
    };
    
    // Wait for DOM to be ready
    setTimeout(updateActiveIndicator, 100);
    
    // Also update on window resize
    window.addEventListener('resize', updateActiveIndicator);
    return () => window.removeEventListener('resize', updateActiveIndicator);
  }, [location.pathname]);
  
  // Handle downloading CV
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/cv.pdf';
    link.download = 'Ahmed Elmasri CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsMenuOpen(false);
  };
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest('.mobile-menu') && !e.target.closest('.menu-button')) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);
  
  // Filter navigation items based on sidebar visibility on mobile
  const visibleItems = isMobile && showSidebar 
    ? [] // No navigation items when sidebar is visible on mobile
    : items;
  
  // Define content navigation items for when sidebar is visible on mobile
  const contentNavItems = [
    { name: 'projects', path: '/projects', icon: <FaCode size={16} />, label: 'Projects' },
    { name: 'contact', path: '/contact', icon: <FaEnvelope size={16} />, label: 'Contact' },
  ];
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4">
      <motion.header
        ref={headerRef}
        className={`font-['Comfortaa'] px-5 md:px-8 transition-all duration-300 rounded-full max-w-[94%] w-auto mx-auto ${
          scrolled 
            ? 'py-2 bg-[#0A0A0A] shadow-lg border border-[#1A936F]/20' 
            : 'py-3 bg-[#0A0A0A] border border-[#1A936F]/10'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: headerVisible ? 0 : -100, 
          opacity: headerVisible ? 1 : 0,
          transition: {
            duration: headerVisible ? 0.3 : 0.2,
            ease: "easeOut"
          }
        }}
      >
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <NavLink to="/" className="flex items-center gap-2">
              <div className="relative">
                <motion.div 
                  className="absolute -inset-1 bg-gradient-to-r from-[#114E3C]/50 to-[#1ED696]/50 rounded-full opacity-50 blur-sm"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.6, 0.4],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="w-8 h-8 bg-[#131313] rounded-full border-2 border-[#1ED696] flex items-center justify-center relative z-10">
                  <span className="text-[#1ED696] text-lg font-bold">E</span>
                </div>
              </div>
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FAF3DD] to-[#FCFFF0]">Elmasri</span>
            </NavLink>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <nav className="relative flex items-center">
              {/* Indicator for active link */}
              {activeIndicator.width > 0 && (
                <motion.div 
                  className="absolute h-0.5 -bottom-1 bg-gradient-to-r from-[#1A936F] to-[#1ED696] rounded-full"
                  initial={false}
                  animate={{ 
                    left: activeIndicator.left,
                    width: activeIndicator.width 
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              
              {items.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link relative px-4 py-2 text-sm transition-colors ${
                      isActive 
                        ? 'text-[#1ED696]' 
                        : 'text-[#FCFFF0]/80 hover:text-[#FCFFF0]'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            
            {/* CV Button */}
            <motion.button
              onClick={handleDownloadCV}
              className="ml-3 px-4 py-1.5 bg-gradient-to-r from-[#114E3C] to-[#1A936F] hover:from-[#1A936F] hover:to-[#1ED696] rounded-md text-sm text-[#FCFFF0] flex items-center gap-2 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <TbFileCv />
              <span>Resume</span>
            </motion.button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {isMobile && (
              <motion.button
                onClick={toggleSidebar}
                className={`p-2 rounded-full ${
                  showSidebar 
                    ? 'bg-[#1A936F]/20 text-[#1ED696]' 
                    : 'bg-[#1A936F]/10 text-[#8FE7C3]'
                } transition-all`}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle Sidebar"
              >
                {showSidebar ? <FaLaptopCode size={18} /> : <FaUser size={18} />}
              </motion.button>
            )}
            
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="menu-button p-2 bg-[#1A936F]/10 hover:bg-[#1A936F]/20 rounded-full text-[#8FE7C3] transition-colors"
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <IoClose size={20} /> : <HiMenuAlt3 size={20} />}
            </motion.button>
          </div>
          
          {/* Mobile Menu with adjusted position */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="mobile-menu absolute top-full right-0 w-56 mt-2 bg-[#131313] border border-[#1A936F]/20 rounded-lg shadow-xl overflow-hidden z-50"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-2.5 flex flex-col gap-1.5">
                  {/* Conditional rendering of navigation items based on sidebar visibility */}
                  {(isMobile && showSidebar ? contentNavItems : visibleItems).map((item, index) => (
                    <MobileNavLink
                      key={item.name}
                      to={item.path}
                      icon={item.icon}
                      label={item.label}
                      onClick={() => {
                        setIsMenuOpen(false);
                        // If showing sidebar and clicked a content item, toggle sidebar off
                        if (isMobile && showSidebar) {
                          toggleSidebar();
                        }
                      }}
                      delay={0.05 * index}
                    />
                  ))}
                  
                  {/* Download CV button */}
                  <motion.button
                    onClick={handleDownloadCV}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-md bg-gradient-to-r from-[#114E3C] to-[#1A936F] hover:from-[#1A936F] hover:to-[#1ED696] text-[#FCFFF0] transition-all w-full text-left mt-1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * (isMobile && showSidebar ? contentNavItems.length : visibleItems.length) }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="p-1.5 bg-[#0a0a0a]/20 rounded-full">
                      <TbFileCv size={16} className="text-[#8FE7C3]" />
                    </span>
                    <span className="text-sm">Download Resume</span>
                  </motion.button>
                </div>
                
                <motion.div 
                  className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#1ED696]/20 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.2 }}
                />
                
                {/* Toggle button: Show "View Content" or "View Profile" based on current state */}
                {isMobile && (
                  <motion.button
                    onClick={() => {
                      toggleSidebar();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 w-full hover:bg-[#1A936F]/10 text-[#FCFFF0]/80 transition-all"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="p-1.5 bg-[#1A936F]/20 rounded-full">
                      {showSidebar ? <FaLaptopCode size={16} className="text-[#8FE7C3]" /> : <FaUser size={16} className="text-[#8FE7C3]" />}
                    </span>
                    <span className="text-sm">{showSidebar ? "View Content" : "View Profile"}</span>
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Subtle floating effect for the header */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-[#1A936F]/5 to-[#1ED696]/5 rounded-full opacity-0 blur-xl pointer-events-none"
        animate={{ 
          opacity: [0.1, 0.2, 0.1],
          scale: [0.98, 1.02, 0.98],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

// Mobile navigation link with animation
const MobileNavLink = ({ to, icon, label, onClick, delay }) => {
  return (
    <NavLink 
      to={to} 
      onClick={onClick}
      className={({ isActive }) => 
        `flex items-center gap-3 px-4 py-2.5 rounded-md ${
          isActive 
            ? 'bg-[#1A936F]/30 text-[#FCFFF0]' 
            : 'hover:bg-[#1A936F]/10 text-[#FCFFF0]/80'
        } transition-all`
      }
    >
      {({ isActive }) => (
        <>
          <motion.span
            className={`p-1.5 ${
              isActive ? 'bg-[#1A936F]/40' : 'bg-[#1A936F]/20'
            } rounded-full`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
          >
            {React.cloneElement(icon, { className: "text-[#8FE7C3]", size: 16 })}
          </motion.span>
          <motion.span 
            className="text-sm"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.1 }}
          >
            {label}
          </motion.span>
        </>
      )}
    </NavLink>
  );
};

export default Header;
