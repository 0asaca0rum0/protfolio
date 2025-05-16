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
      className="bg-gradient-to-br from-[#101c1b] to-[#0A0A0A] border border-[#1A936F]/20 rounded-xl overflow-hidden shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03, border: "1px solid rgba(30, 214, 150, 0.4)" }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="p-4">
        <div className="flex items-center gap-4 mb-3">
          <div className="relative">
            <div className="absolute inset-0 blur-lg rounded-full bg-[#1ED696]/10"></div>
            <div
              className="relative z-10 p-3 rounded-full"
              style={{ color: tech.darkColor }}
            >
              <tech.icon size={28} />
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-[#FCFFF0]">{tech.name}</h3>
            <div className="flex items-center gap-2">
              <span className={`text-xs ${tech.learning ? "text-[#F29111]" : "text-[#8FE7C3]"}`}>
                {tech.learning
                  ? "Learning"
                  : tech.level >= 90
                  ? "Expert"
                  : tech.level >= 75
                  ? "Advanced"
                  : "Intermediate"}
              </span>
              <span className="bg-[#232323] px-1.5 py-0.5 rounded-full text-[10px] text-white/80">
                {tech.level}%
              </span>
            </div>
          </div>
        </div>
        
        <div className="w-full h-1.5 bg-[#181c1b] rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: tech.customColor || getLevelColor(tech),
            }}
            initial={{ width: 0 }}
            animate={{ width: `${tech.level}%` }}
            transition={{ duration: 0.7 }}
          />
        </div>
        
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="mt-3 pt-3 border-t border-[#1A936F]/10"
          >
            <div className="flex justify-center">
              <div className="relative w-16 h-16">
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
                    transition={{ duration: 1.2, ease: "easeOut" }}
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
                    className="text-base font-bold fill-[#FCFFF0]"
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
    <section className="w-full py-6 font-['Comfortaa'] bg-gradient-to-b from-[#0A0A0A]/80 to-[#0A0A0A]/30">
      <div className="max-w-lg mx-auto px-4">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-[#1ED696]/40 to-transparent mb-4"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.2 }}
          />
          <h2 className="text-2xl font-bold mb-2">
            <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-[#1A936F] to-[#1ED696]">
              Technology Stack
            </span>
          </h2>
          <p className="text-[#8FE7C3]/80 text-sm">
            The tools and technologies I work with
          </p>
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-[#1ED696]/40 to-transparent mt-4"
            initial={{ width: 0 }}
            animate={{ width: "80%" }}
            transition={{ duration: 1.2, delay: 0.2 }}
          />
        </motion.div>
        
        {/* Fixed Category Filter */}
        <div className="flex justify-center mb-6">
          <div 
            ref={containerRef}
            className="bg-[#131313] border border-[#1A936F]/20 rounded-full p-1 inline-flex relative"
          >
            {/* Animated indicator positioned based on selected button */}
            <motion.div 
              className="absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-[#114E3C] to-[#1A936F]"
              initial={false}
              animate={{
                width: indicatorDimensions.width - 8, // Subtract padding
                left: indicatorDimensions.left + 4  // Add padding
              }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
            
            {/* Category buttons - Use callback refs correctly */}
            {categories.map((category) => (
              <button
                key={category.value}
                ref={(el) => {
                  // Store the reference without causing re-renders
                  buttonRefs.current[category.value] = el;
                }}
                onClick={() => setFilter(category.value)}
                className={`relative z-10 px-4 py-1.5 rounded-full text-sm font-medium transition-colors 
                  ${filter === category.value ? 'text-white' : 'text-[#8FE7C3]/80 hover:text-[#8FE7C3]'}`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tech Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredTechs.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <TechCard tech={tech} />
            </motion.div>
          ))}
        </div>
        
        {/* Counter */}
        <motion.div 
          className="text-center mt-6 text-xs text-[#FCFFF0]/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span>Displaying <span className="text-[#1ED696]">{filteredTechs.length}</span> technologies</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Techno;
