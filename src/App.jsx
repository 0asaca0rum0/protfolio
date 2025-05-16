import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Contact from './components/contact';
import Header from './components/Header';
import { motion, AnimatePresence } from 'framer-motion';
import { FaProjectDiagram, FaCode } from 'react-icons/fa';
import { BiMailSend } from 'react-icons/bi';
import './index.css';

// Lazy load components
const Projects = lazy(() => import('./components/projects'));
const Carousel = lazy(() => import('./components/Carousel'));
const Techno = lazy(() => import('./components/Techno'));
const ErrorPage = lazy(() => import('./components/ErrorPage'));

// Loading component
const LoadingFallback = () => (
  <div className="min-h-[600px] flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-t-[#1ED696] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
  </div>
);

// Component to handle animated routes
const AnimatedRoutes = ({ isMobile }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full h-full"
      >
        <Suspense fallback={<LoadingFallback />}>
          <Routes location={location}>
            <Route path="/" element={<Navigate replace to="/projects" />} />
            <Route 
              path="/projects" 
              element={
                <div className={`${isMobile ? 'mobile-projects' : ''} w-full h-full`}>
                  <Projects />
                </div>
              } 
            />
            <Route 
              path="/tech" 
              element={
                isMobile ? <Techno /> : <Carousel />
              } 
            />
            <Route path="/contact" element={<Contact />} />
            {/* Add catch-all route for unknown paths */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
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

  // Toggle sidebar visibility for mobile
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // Handle sidebar collapse with animation
  const handleSidebarCollapse = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  const navItems = [
    { name: 'projects', label: 'Projects', icon: <FaProjectDiagram />, path: '/projects' },
    { name: 'tech', label: 'Technologies', icon: <FaCode />, path: '/tech' },
    { name: 'contact', label: 'Contact', icon: <BiMailSend />, path: '/contact' },
  ];

  return (
    <Router>
      <Header 
        items={navItems}
        isMobile={isMobile}
        showSidebar={showSidebar}
        toggleSidebar={toggleSidebar}
      />
      
      <div className="main-container font-['Comfortaa']">
        {(!isMobile || (isMobile && showSidebar)) && (
          <Sidebar 
            className={`${isMobile ? 'mobile-sidebar' : ''}`} 
            onCollapse={handleSidebarCollapse}
          />
        )}
        
        {(!isMobile || (isMobile && !showSidebar)) && (
          <motion.main 
            className={`content-container ${isMobile ? 'mobile-content' : ''}`}
            initial={false}
            animate={{ 
              marginLeft: !isMobile && sidebarCollapsed ? "5rem" : !isMobile ? "1.5rem" : "0",
              width: !isMobile && sidebarCollapsed ? "calc(100% - 6.5rem)" : !isMobile ? "calc(100% - 23rem)" : "100%",
              marginTop: "4rem"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <AnimatedRoutes isMobile={isMobile} />
          </motion.main>
        )}
      </div>
    </Router>
  );
}

export default App;
