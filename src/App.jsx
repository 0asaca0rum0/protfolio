import React, { Suspense, lazy, useState, useLayoutEffect, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { motion, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
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
const PageLoader = () => (
  <div className="flex items-center justify-center h-full w-full min-h-[200px]">
    <div className="w-10 h-10 border-4 border-[#1A936F] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const AnimatedRoutes = ({ isMobile }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <Suspense fallback={<PageLoader />}>
              <Carousel />
            </Suspense>
          }
        />
        <Route
          path="/projects"
          element={
            <Suspense fallback={<PageLoader />}>
              <Projects />
            </Suspense>
          }
        />
        <Route
          path="/tech"
          element={
            <Suspense fallback={<PageLoader />}>
              <Techno />
            </Suspense>
          }
        />
        <Route
          path="/contact"
          element={
            <Suspense fallback={<PageLoader />}>
              <Contact />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<PageLoader />}>
              <ErrorPage />
            </Suspense>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  useLayoutEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    // Create resize observer for more robust detection
    const resizeObserver = new ResizeObserver(updateHeaderHeight);
    const header = document.querySelector('header');
    if (header) resizeObserver.observe(header);

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowSidebar(true);
      } else {
        setShowSidebar(false);
      }
    };

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
      <LazyMotion features={domAnimation}>
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
              <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="1" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" />
            </filter>
          </svg>
        </div>
      </LazyMotion>
    </Router>
  );
}

export default App;
