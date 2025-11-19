import React, { useState, useMemo, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
import { FaMicrochip } from "react-icons/fa6";

// Use the same tech list data from Carousel
const techList = [
  {
    name: "React",
    icon: FaReact,
    color: "#61DAFB",
    level: 90,
  },
  {
    name: "Next.js",
    icon: TbBrandNextjs,
    color: "#FFFFFF",
    level: 85,
  },
  {
    name: "Tailwind",
    icon: SiTailwindcss,
    color: "#38BDF8",
    level: 95,
  },
  {
    name: "Node.js",
    icon: FaNodeJs,
    color: "#68A063",
    level: 80,
  },
  {
    name: "Express",
    icon: FaServer,
    color: "#808080",
    level: 75,
  },
  {
    name: "MySQL",
    icon: TbBrandMysql,
    color: "#00758F",
    level: 70,
  },
  {
    name: "Nginx",
    icon: SiNginx,
    color: "#009639",
    level: 65,
  },
  {
    name: "Linux",
    icon: FaLinux,
    color: "#FCC624",
    level: 85,
  },
  {
    name: "Python",
    icon: FaPython,
    color: "#3776AB",
    level: 80,
  },
  {
    name: "Go",
    icon: BiLogoGoLang,
    color: "#00ADD8",
    level: 40,
  },
  {
    name: "NLP",
    icon: SiOpenai,
    color: "#10A37F",
    level: 40,
  },
  {
    name: "Image Proc",
    icon: SiNvidia,
    color: "#76B900",
    level: 50,
  },
  {
    name: "Embedded",
    icon: FaMicrochip,
    color: "#E53935",
    level: 40, // Intermediate
  },
];
// Helper function for determining level status and color
const getLevelStatus = (level) => {
  if (level >= 80) return { label: "Mastered", color: "#1ED696", textColor: "text-[#1ED696]" };
  if (level >= 50) return { label: "Intermediate", color: "#38BDF8", textColor: "text-[#38BDF8]" };
  return { label: "Learning", color: "#F29111", textColor: "text-[#F29111]" };
};

const TechCard = ({ tech }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const status = getLevelStatus(tech.level);

  return (
    <motion.div
      className="bg-gradient-to-br from-[#0a0a0a]/95 to-[#050505]/95 border border-[#1A936F]/20 rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.4 }
      }}
      whileHover={{
        y: -5,
        borderColor: "rgba(30, 214, 150, 0.5)",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(30, 214, 150, 0.1)",
      }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Floating Glow Effect */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-[#1A936F]/20 to-[#1ED696]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      <div className="p-5 relative z-10">
        <div className="flex items-center gap-5 mb-4">
          <div className="relative">
            <motion.div
              className="absolute inset-0 blur-md rounded-full bg-[#1ED696]/20"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            />
            <div
              className="relative z-10 p-3.5 rounded-xl bg-[#131313] border border-[#1A936F]/30 group-hover:border-[#1ED696]/60 transition-colors"
              style={{ color: tech.color }}
            >
              <tech.icon size={28} />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="font-bold text-lg text-[#FCFFF0] group-hover:text-[#1ED696] transition-colors">{tech.name}</h3>
            <div className="flex items-center justify-between mt-1">
              <span className={`text-xs font-medium ${status.textColor}`}>
                {status.label}
              </span>
              <span className="font-mono text-xs text-[#1ED696]">{tech.level}%</span>
            </div>
          </div>
        </div>

        <div className="w-full h-1.5 bg-[#1A936F]/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full relative overflow-hidden"
            style={{
              background: status.color,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${tech.level}%` }}
            transition={{ duration: 1, ease: "circOut" }}
          >
            <motion.div
              className="absolute inset-0 bg-white/30"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>

        <AnimatePresence >
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 20 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-[#1A936F]/10 pt-4"
            >
              <div className="flex justify-center items-center gap-6">
                <div className="relative w-16 h-16">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#1A936F" strokeOpacity="0.2" strokeWidth="8" />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke={status.color}
                      strokeWidth="8"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: tech.level / 100 }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                    {tech.level}%
                  </div>
                </div>
                <div className="text-xs text-[#8FE7C3]/60 max-w-[120px]">
                  {status.label === "Mastered" ? "Production-ready expertise." :
                    status.label === "Intermediate" ? "Solid understanding and practical experience." :
                      "Currently exploring advanced concepts."}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const Techno = () => {
  const [filter, setFilter] = useState("all");
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

  const [indicatorDimensions, setIndicatorDimensions] = useState({
    width: 0,
    left: 0
  });

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
          className="text-center mb-8 sm:mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-[#1ED696]/60 to-transparent mb-5"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "circOut" }}
          />
          <h2 className="text-3xl font-bold mb-3 relative inline-block">
            <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-[#1A936F] to-[#1ED696] drop-shadow-[0_0_10px_rgba(30,214,150,0.3)]">
              Technology Stack
            </span>
            <motion.span
              className="absolute -top-1 -right-4 text-[#1ED696]"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              ✦
            </motion.span>
          </h2>
          <p className="text-[#8FE7C3]/70 text-sm tracking-wide uppercase">
            Arsenal & Tools
          </p>
        </motion.div>

        {/* Filter */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div
            ref={containerRef}
            className="bg-[#0a0a0a]/80 border border-[#1A936F]/30 rounded-full p-1.5 inline-flex relative shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-xl"
          >
            <motion.div
              className="absolute top-1.5 bottom-1.5 rounded-full bg-gradient-to-r from-[#114E3C] to-[#1A936F] shadow-[0_0_15px_rgba(26,147,111,0.5)]"
              initial={false}
              animate={{
                width: indicatorDimensions.width - 8,
                left: indicatorDimensions.left + 4
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            {categories.map((category) => (
              <button
                key={category.value}
                ref={(el) => { buttonRefs.current[category.value] = el; }}
                onClick={() => setFilter(category.value)}
                className={`relative z-10 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors 
                  ${filter === category.value ? 'text-white' : 'text-[#8FE7C3]/60 hover:text-[#8FE7C3]'}`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredTechs.map((tech, index) => (
              <motion.div
                key={tech.name}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
              >
                <TechCard tech={tech} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="text-center mt-10 text-xs text-[#FCFFF0]/30 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
            // SYSTEM READY
        </motion.div>
      </div>
    </section>
  );
};

export default Techno;
