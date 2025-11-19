import React, { Suspense, lazy, useState, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { motion, AnimatePresence } from 'framer-motion';
import { FaProjectDiagram, FaCode } from 'react-icons/fa';
import { BiMailSend } from 'react-icons/bi';
import './index.css';

// Lazy load components
const Projects = lazy(() => import('./components/projects'));
const Carousel = lazy(() => import('./components/Carousel'));
const Techno = lazy(() => import('./components/Techno'));
const Contact = lazy(() => import('./components/contact'));
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
          <div className="w-full max-w-5xl mx-auto space-y-6 pt-1 pb-6 sm:pt-2 sm:pb-8">
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
          </div>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  // Keep breakpoint logic consistent with Sidebar/Header and CSS:
  // treat widths < 768px as "mobile / small tablet" for route and layout decisions.
  const getIsMobile = () => (typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  const [isMobile, setIsMobile] = useState(getIsMobile);
  const [showSidebar, setShowSidebar] = useState(getIsMobile);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  // Handle responsive breakpoints and header height
  useLayoutEffect(() => {
    const handleResize = () => {
      // Update mobile state
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // Update sidebar visibility
      if (mobile) {
        setShowSidebar(true);
        setSidebarCollapsed(false);
      } else {
        setShowSidebar(false);
      }

      // Update header height
      const header = document.querySelector('header');
      if (header) {
        setHeaderHeight(header.offsetHeight);
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
      <div className="main-container font-['Comfortaa']">
        <Header
          items={navItems}
          isMobile={isMobile}
          showSidebar={showSidebar}
          toggleSidebar={toggleSidebar}
        />

        <div className="flex flex-col md:flex-row md:gap-6 w-full h-full">
          {(!isMobile || (isMobile && showSidebar)) && (
            <Sidebar
              className={`${isMobile ? 'mobile-sidebar' : ''}`}
              onCollapse={handleSidebarCollapse}
            />
          )}

          {(!isMobile || (isMobile && !showSidebar)) && (
            <motion.main
              className={`content-container ${isMobile ? 'mobile-content' : ''}`}
              style={{ paddingTop: headerHeight ? `${headerHeight + 24}px` : '5rem' }}
              initial={false}
            >
              <AnimatedRoutes isMobile={isMobile} />
            </motion.main>
          )}
        </div>

        {/* SVG Filter for Liquid Glass Effect */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <filter id="liquid-glass">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" />
          </filter>
        </svg>
      </div>
    </Router>
  );
}

export default App;
