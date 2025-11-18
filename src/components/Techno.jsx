import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
// Use the same tech imports as Carousel
import {
  FaReact,
  FaNodeJs,
  FaServer,
  FaLinux,
  FaPython,
} from "react-icons/fa";
import { TbBrandNextjs, TbBrandMysql } from "react-icons/tb";
import { SiTailwindcss, SiNginx, SiOpenai, SiNvidia } from "react-icons/si";
import { BiLogoGoLang } from "react-icons/bi";

// Use the same tech list data from Carousel
const techList = [
  {
    name: "React",
    icon: FaReact,
    lightColor: "#61DAFB",
    darkColor: "#00D8FF",
    level: 90,
  },
  {
    name: "Next.js",
    icon: TbBrandNextjs,
    lightColor: "#000000",
    darkColor: "#FFFFFF",
    level: 85,
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    lightColor: "#38BDF8",
    darkColor: "#06B6D4",
    level: 95,
  },
  {
    name: "Node.js",
    icon: FaNodeJs,
    lightColor: "#68A063",
    darkColor: "#8CC84B",
    level: 80,
  },
  {
    name: "Express",
    icon: FaServer,
    lightColor: "#808080",
    darkColor: "#CCCCCC",
    level: 75,
  },
  {
    name: "MySQL",
    icon: TbBrandMysql,
    lightColor: "#00758F",
    darkColor: "#F29111",
    level: 70,
  },
  {
    name: "Nginx",
    icon: SiNginx,
    lightColor: "#009639",
    darkColor: "#00FF00",
    level: 65,
  },
  {
    name: "Linux",
    icon: FaLinux,
    lightColor: "#FCC624",
    darkColor: "#FFFFFF",
    level: 85,
  },
  {
    name: "Python",
    icon: FaPython,
    lightColor: "#3776AB",
    darkColor: "#3776AB",
    level: 80,
  },
  {
    name: "Go",
    icon: BiLogoGoLang,
    lightColor: "#00ADD8",
    darkColor: "#00ADD8",
    level: 40,
    customColor: "#FFDD00",
  },
  {
    name: "NLP (Learning)",
    icon: SiOpenai,
    lightColor: "#10A37F",
    darkColor: "#10A37F",
    level: 30,
    learning: true,
  },
  {
    name: "Image Processing (Learning)",
    icon: SiNvidia,
    lightColor: "#76B900",
    darkColor: "#76B900",
    level: 25,
    learning: true,
  },
];

// Helper function for determining level color
const getLevelColor = (tech) => {
  if (tech.learning) return "linear-gradient(90deg, #F29111 0%, #FFB347 100%)";
  if (tech.level >= 90)
    return "linear-gradient(90deg, #0E8A5F 0%, #1ED696 100%)";
  if (tech.level >= 70)
    return "linear-gradient(90deg, #114E3C 0%, #1A936F 100%)";
  if (tech.level >= 40)
    return "linear-gradient(90deg, #2B4B3E 0%, #5D9B84 100%)";
  return "linear-gradient(90deg, #31403B 0%, #588C7E 100%)";
};

const TechCard = ({ tech }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <motion.div
      className="bg-gradient-to-br from-[#101c1b] to-[#0A0A0A] border border-[#1A936F]/20 rounded-xl overflow-hidden shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ 
        scale: 1.03, 
        border: "1px solid rgba(30, 214, 150, 0.4)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(30, 214, 150, 0.15)",
        transition: { duration: 0.25 }
      }}
      whileTap={{ scale: 0.98, transition: { duration: 0.15 } }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="p-5">
        <div className="flex items-center gap-5 mb-4">
          <div className="relative">
            <motion.div 
              className="absolute inset-0 blur-lg rounded-full bg-[#1ED696]/10"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            />
            <div
              className="relative z-10 p-3.5 rounded-full"
              style={{ color: tech.darkColor }}
            >
              <tech.icon size={32} />
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg text-[#FCFFF0]">{tech.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-sm ${tech.learning ? "text-[#F29111]" : "text-[#8FE7C3]"}`}>
                {tech.learning
                  ? "Learning"
                  : tech.level >= 90
                  ? "Expert"
                  : tech.level >= 75
                  ? "Advanced"
                  : "Intermediate"}
              </span>
              <span className="bg-[#232323] px-2 py-0.5 rounded-full text-xs text-white/80">
                {tech.level}%
              </span>
            </div>
          </div>
        </div>
        
        <div className="w-full h-2 bg-[#181c1b] rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: tech.customColor || getLevelColor(tech),
            }}
            initial={{ width: 0 }}
            animate={{ width: `${tech.level}%` }}
            transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
          />
        </div>
        
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
            className="mt-5 pt-4 border-t border-[#1A936F]/10"
          >
            <div className="flex justify-center">
              <div className="relative w-20 h-20">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#232323"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={
                      tech.customColor ||
                      (tech.learning ? "#F29111" : "#1ED696")
                    }
                    strokeWidth="8"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: tech.level / 100 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      transformOrigin: "center",
                      rotate: "-90deg",
                      strokeDasharray: "251.2",
                    }}
                  />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dy=".3em"
                    className="text-lg font-bold fill-[#FCFFF0]"
                  >
                    {tech.level}%
                  </text>
                </svg>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const Techno = () => {
  const [filter, setFilter] = useState("all");
  // Replace buttonRefs state with useRef to avoid infinite updates
  const buttonRefs = useRef({});
  const containerRef = useRef(null);
  
  const filteredTechs = useMemo(() => {
    if (filter === "all") return techList;
    if (filter === "expert") return techList.filter(tech => tech.level >= 90);
    if (filter === "learning") return techList.filter(tech => tech.learning);
    return techList;
  }, [filter]);
  
  const categories = [
    { value: "all", label: "All" },
    { value: "expert", label: "Expert" },
    { value: "learning", label: "Learning" }
  ];
  
  // Get the current active button dimensions for accurate positioning of the indicator
  const [indicatorDimensions, setIndicatorDimensions] = useState({
    width: 0,
    left: 0
  });
  
  // Update indicator position whenever filter changes or on window resize
  useEffect(() => {
    const updateIndicator = () => {
      const activeButton = buttonRefs.current[filter];
      const containerPosition = containerRef.current?.getBoundingClientRect();
      
      if (activeButton && containerPosition) {
        const buttonPosition = activeButton.getBoundingClientRect();
        
        setIndicatorDimensions({
          width: buttonPosition.width,
          left: buttonPosition.left - containerPosition.left
        });
      }
    };
    
    // Delay the update to ensure DOM is ready
    const timeoutId = setTimeout(updateIndicator, 0);
    
    window.addEventListener('resize', updateIndicator);
    return () => {
      window.removeEventListener('resize', updateIndicator);
      clearTimeout(timeoutId);
    };
  }, [filter]);
  
  return (
    <section className="w-full py-6 sm:py-8 font-['Comfortaa'] bg-transparent">
      <div className="max-w-lg mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-[#1ED696]/40 to-transparent mb-4 sm:mb-5"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.6, ease: "easeOut" }}
          />
          <h2 className="text-2xl font-bold mb-3">
            <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-[#1A936F] to-[#1ED696]">
              Technology Stack
            </span>
          </h2>
          <p className="text-[#8FE7C3]/80 text-base">
            The tools and technologies I work with
          </p>
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-[#1ED696]/40 to-transparent mt-6"
            initial={{ width: 0 }}
            animate={{ width: "80%" }}
            transition={{ duration: 1.6, delay: 0.3, ease: "easeOut" }}
          />
        </motion.div>
        
        {/* Improved Category Filter with better spacing */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div 
            ref={containerRef}
            className="bg-[#131313] border border-[#1A936F]/20 rounded-full p-1.5 inline-flex relative shadow-lg"
          >
            {/* Animated indicator with smoother motion */}
            <motion.div 
              className="absolute top-1.5 bottom-1.5 rounded-full bg-gradient-to-r from-[#114E3C] to-[#1A936F]"
              initial={false}
              animate={{
                width: indicatorDimensions.width - 8,
                left: indicatorDimensions.left + 4
              }}
              transition={{ 
                type: "spring", 
                stiffness: 350, 
                damping: 30,
                mass: 1.1
              }}
            />
            
            {/* Category buttons with better spacing */}
            {categories.map((category) => (
              <button
                key={category.value}
                ref={(el) => {
                  buttonRefs.current[category.value] = el;
                }}
                onClick={() => setFilter(category.value)}
                className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors 
                  ${filter === category.value ? 'text-white' : 'text-[#8FE7C3]/80 hover:text-[#8FE7C3]'}`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tech Grid with better spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {filteredTechs.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <TechCard tech={tech} />
            </motion.div>
          ))}
        </div>
        
        {/* Counter with subtle animation */}
        <motion.div
          className="text-center mt-6 sm:mt-8 text-sm text-[#FCFFF0]/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <motion.span
            animate={{ 
              opacity: [0.7, 1, 0.7],
              y: [0, -2, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3,
              repeatType: "loop"
            }}
          >
            Displaying <span className="text-[#1ED696] font-medium">{filteredTechs.length}</span> technologies
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
};

export default Techno;
