import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoIosSwitch } from "react-icons/io";
import { TbFileCv } from "react-icons/tb";
import { FaUser, FaLaptopCode } from "react-icons/fa";

const FloatingNav = ({ items, activeSection, onNavigate, isMobile, showSidebar, toggleSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleDownloadCV = () => {
    // Create an anchor element and trigger the download
    const link = document.createElement('a');
    link.href = '/cv.pdf';
    link.download = 'Ahmed Elmasri CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsOpen(false);
  };

  return (
		<div className="fixed bottom-6 right-6 z-50">
			{/* Main toggle button */}
			<motion.button
				className="bg-[#1A936F] text-white p-4 rounded-full shadow-lg flex items-center justify-center"
				onClick={toggleMenu}
				whileTap={{ scale: 0.9 }}
				animate={{ rotate: isOpen ? 180 : 0 }}
				transition={{ duration: 0.3 }}
			>
				<IoIosSwitch size={24} />
			</motion.button>

			{/* Navigation items */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="absolute bottom-16 right-0"
						initial={{ scale: 0, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0, opacity: 0 }}
						transition={{ duration: 0.3 }}
					>
						<div className="flex flex-col gap-3 items-end">
							{/* CV Download Button */}
							<motion.button
								onClick={handleDownloadCV}
								className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A936F] text-[#FCFFF0] shadow-md hover:bg-[#1ED696] transition-all duration-300"
								initial={{ x: 30, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ delay: 0, duration: 0.3 }}
							>
								<TbFileCv size={20} />
								<span>Download CV</span>
							</motion.button>
							
              {/* Mobile-specific toggle between sidebar and content */}
              {windowWidth < 768 && (
                <motion.button
                  onClick={() => {
                    toggleSidebar();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#131313] text-[#FCFFF0] shadow-md hover:bg-[#1A936F]/20 transition-all duration-300"
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  {showSidebar ? <FaLaptopCode size={20} /> : <FaUser size={20} />}
                  <span>{showSidebar ? "View Content" : "View Profile"}</span>
                </motion.button>
              )}
							
							{/* Regular navigation items */}
              {(!isMobile || (isMobile && !showSidebar)) && items.map((item, index) => (
								<motion.button
									key={item.name}
									onClick={() => {
										onNavigate(item.name);
										setIsOpen(false);
									}}
									className={`flex items-center gap-2 px-4 py-2 rounded-full ${
										activeSection === item.name
											? "bg-[#1A936F] text-[#FCFFF0] shadow-md"
											: "bg-[#131313] text-[#FCFFF0]/70 hover:bg-[#1A936F]/20"
									} transition-all duration-300`}
									initial={{ x: 30, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									transition={{ delay: (index + (windowWidth < 768 ? 2 : 1)) * 0.1, duration: 0.3 }}
								>
									{item.icon}
									<span>{item.label}</span>
								</motion.button>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default FloatingNav;
