import React, { Suspense, lazy, useState, useLayoutEffect, useEffect, useRef } from 'react';
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
const SnakeGame = lazy(() => import('./components/SnakeGame'));

// Robust Konami code hook using refs to avoid closure state issues
const useKonamiCode = (callback) => {
  const sequenceRef = useRef([]);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore modifier keys
      if (['Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) return;

      const key = e.key.toLowerCase();
      sequenceRef.current.push(key);

      // Keep only the last 8 strokes (length of our sequence)
      if (sequenceRef.current.length > 8) {
        sequenceRef.current.shift();
      }

      const konami = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright'];

      if (sequenceRef.current.join('') === konami.join('')) {
        callback();
        sequenceRef.current = [];
      }

      // Reset sequence if typing stops for 3 seconds
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        sequenceRef.current = [];
      }, 3000);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timeoutRef.current);
    };
  }, [callback]);
};

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
              <Projects />
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
              {isMobile ? <Techno /> : <Carousel />}
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
  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 768);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [showSnakeGame, setShowSnakeGame] = useState(false);

  // Easter egg listener
  useKonamiCode(() => {
    console.log("EASTER EGG TRIGGERED: Snake Game!");
    setShowSnakeGame(true);
  });

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

          {/* SVG Filter for Liquid Glass Refraction */}
          <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <defs>
              <filter id="liquid-glass" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.012 0.018"
                  numOctaves="3"
                  seed="2"
                  result="noise"
                >
                  <animate
                    attributeName="baseFrequency"
                    values="0.012 0.018; 0.022 0.010; 0.008 0.024; 0.018 0.014; 0.012 0.018"
                    dur="18s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="seed"
                    values="2;5;8;3;2"
                    dur="30s"
                    repeatCount="indefinite"
                  />
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="22" xChannelSelector="R" yChannelSelector="G" result="displaced" />
                <feComposite in="displaced" in2="SourceGraphic" operator="in" />
              </filter>
            </defs>
          </svg>

          {/* Easter Egg Game Overlay */}
          <AnimatePresence>
            {showSnakeGame && (
              <Suspense fallback={null}>
                <SnakeGame onClose={() => setShowSnakeGame(false)} />
              </Suspense>
            )}
          </AnimatePresence>
        </div>
      </LazyMotion>
    </Router>
  );
}

export default App;
