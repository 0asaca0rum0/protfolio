import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Projects from './components/projects';
import Carousel from './components/Carousel';
import Contact from './components/contact';
import FloatingNav from './components/FloatingNav';
import { motion, AnimatePresence } from 'framer-motion';
import { FaProjectDiagram, FaCode } from 'react-icons/fa';
import { BiMailSend } from 'react-icons/bi';
import './index.css';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeSection, setActiveSection] = useState('projects');
  const [showSidebar, setShowSidebar] = useState(window.innerWidth < 768);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Handle responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Set sidebar visibility when transitioning between mobile and desktop
      if (mobile) {
        setShowSidebar(true); // Make profile view default on mobile
        setSidebarCollapsed(false); // Ensure sidebar is expanded on mobile
      } else {
        setShowSidebar(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation handlers
  const handleNavigation = (section) => {
    setActiveSection(section);
  };

  // Toggle sidebar visibility for mobile
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // Handle sidebar collapse with animation
  const handleSidebarCollapse = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  const navItems = [
    { name: 'projects', label: 'Projects', icon: <FaProjectDiagram /> },
    { name: 'tech', label: 'Technologies', icon: <FaCode /> },
    { name: 'contact', label: 'Contact', icon: <BiMailSend /> },
  ];

  return (
    <div className="main-container font-['Comfortaa']">
      {/* Show sidebar based on screen size and state */}
      {(!isMobile || (isMobile && showSidebar)) && (
        <Sidebar 
          className={` ${isMobile ? 'mobile-sidebar' : ''}`} 
          onCollapse={handleSidebarCollapse}
        />
      )}
      
      {/* Show content based on screen size and state with smooth transition */}
      {(!isMobile || (isMobile && !showSidebar)) && (
        <motion.main 
          className={`content-container ${isMobile ? 'mobile-content' : ''}`}
          initial={false}
          animate={{ 
            marginLeft: !isMobile && sidebarCollapsed ? "5rem" : !isMobile ? "1.5rem" : "0",
            width: !isMobile && sidebarCollapsed ? "calc(100% - 6.5rem)" : !isMobile ? "calc(100% - 23rem)" : "100%"
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex items-center justify-center"
            >
              {activeSection === 'projects' && 
                <div className={`${isMobile ? 'mobile-projects' : ''} w-full h-full flex items-center justify-center`}>
                  <Projects />
                </div>
              }
              {activeSection === 'tech' && <Carousel />}
              {activeSection === 'contact' && <Contact />}
            </motion.div>
          </AnimatePresence>
        </motion.main>
      )}

      {/* Floating Navigation */}
      <FloatingNav 
        items={navItems} 
        activeSection={activeSection} 
        onNavigate={handleNavigation}
        isMobile={isMobile}
        showSidebar={showSidebar}
        toggleSidebar={toggleSidebar}
      />
    </div>
  );
}

export default App;
