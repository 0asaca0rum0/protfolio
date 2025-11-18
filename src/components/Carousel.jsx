import React from "react";
import { motion } from "framer-motion";
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

/**
 * Tech data
 */
const techList = [
  {
    name: "React",
    icon: FaReact,
    lightColor: "#61DAFB",
    darkColor: "#00D8FF",
    level: 90,
    learning: false,
  },
  {
    name: "Next.js",
    icon: TbBrandNextjs,
    lightColor: "#000000",
    darkColor: "#FFFFFF",
    level: 85,
    learning: false,
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    lightColor: "#38BDF8",
    darkColor: "#06B6D4",
    level: 95,
    learning: false,
  },
  {
    name: "Node.js",
    icon: FaNodeJs,
    lightColor: "#68A063",
    darkColor: "#8CC84B",
    level: 80,
    learning: false,
  },
  {
    name: "Express",
    icon: FaServer,
    lightColor: "#808080",
    darkColor: "#CCCCCC",
    level: 75,
    learning: false,
  },
  {
    name: "MySQL",
    icon: TbBrandMysql,
    lightColor: "#00758F",
    darkColor: "#F29111",
    level: 70,
    learning: false,
  },
  {
    name: "Nginx",
    icon: SiNginx,
    lightColor: "#009639",
    darkColor: "#00FF00",
    level: 65,
    learning: false,
  },
  {
    name: "Linux",
    icon: FaLinux,
    lightColor: "#FCC624",
    darkColor: "#FFFFFF",
    level: 85,
    learning: false,
  },
  {
    name: "Python",
    icon: FaPython,
    lightColor: "#3776AB",
    darkColor: "#3776AB",
    level: 80,
    learning: false,
  },
  {
    name: "Go",
    icon: BiLogoGoLang,
    lightColor: "#00ADD8",
    darkColor: "#00ADD8",
    level: 40,
    learning: false,
    customColor: "#FFDD00",
  },
  {
    name: "NLP",
    icon: SiOpenai,
    lightColor: "#10A37F",
    darkColor: "#10A37F",
    level: 30,
    learning: false,
  },
  {
    name: "Image Processing",
    icon: SiNvidia,
    lightColor: "#76B900",
    darkColor: "#76B900",
    level: 25,
    learning: false,
  },
];

const getLevelLabel = (tech) => {
  if (tech.learning) return "Learning";
  if (tech.level >= 90) return "Expert";
  if (tech.level >= 75) return "Advanced";
  return "Intermediate";
};

const getLevelColor = (tech) => {
  if (tech.learning) {
    // learning stays orange
    return "linear-gradient(90deg, #F29111 0%, #FFB347 100%)";
  }
  if (tech.level >= 90) {
    // expert - bright green
    return "linear-gradient(90deg, #0E8A5F 0%, #1ED696 100%)";
  }
  if (tech.level >= 75) {
    // advanced - deep green
    return "linear-gradient(90deg, #114E3C 0%, #1A936F 100%)";
  }
  // intermediate (below 75 and not learning) - yellow bar
  return "linear-gradient(90deg, #FBBF24 0%, #FACC15 100%)";
};

const TechCard = ({ tech }) => {
  const Icon = tech.icon;
  const levelLabel = getLevelLabel(tech);

  return (
    <motion.div
      className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#0a0f0d] to-[#050807] border border-[#16A472]/30 shadow-lg hover:shadow-[0_8px_32px_rgba(31,225,167,0.15)] transition-shadow duration-300"
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Subtle glow effect */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(31,225,167,0.08),transparent_50%)] opacity-60" />

      <div className="relative z-10 p-5 sm:p-6 flex flex-col gap-4 sm:gap-5">
        {/* Icon + Title Row */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Icon with refined glow */}
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 blur-lg rounded-full bg-[#1FE1A7]/20" />
            <div className="relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-black/90 to-black/70 border border-[#1FE1A7]/40 shadow-inner">
              <Icon size={22} className="text-[#1FE1A7]" strokeWidth={1} />
            </div>
          </div>

          {/* Title and Level */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-[#F7FFF8] truncate mb-0.5">
              {tech.name}
            </h3>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-wider font-medium text-[#7DE5BE]/90">
              {levelLabel}
            </p>
          </div>

          {/* Percentage Badge */}
          <div className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-black/60 border border-[#1FE1A7]/20 backdrop-blur-sm">
            <span className="text-xs sm:text-sm font-semibold text-[#1FE1A7]">
              {tech.level}%
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full h-2 rounded-full bg-black/60 overflow-hidden border border-[#16A472]/20 shadow-inner">
            <motion.div
              className="h-full rounded-full relative"
              style={{
                background: tech.customColor || getLevelColor(tech),
              }}
              initial={{ width: 0 }}
              animate={{ width: `${tech.level}%` }}
              transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Hover border glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-[#1FE1A7]/40" />
    </motion.div>
  );
};

const TechGrid = () => {
  return (
   <section className="w-full font-['Comfortaa'] bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 space-y-8 sm:space-y-10 -mt-12 sm:-mt-16">
        {/* Heading */}
        <div className="text-center space-y-2 sm:space-y-3 max-w-2xl mx-auto">
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1FE1A7] tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Technology Orbit
          </motion.h2>
          <motion.p
            className="text-sm sm:text-base text-[#8FE7C3]/80 leading-relaxed"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            Explore my technology ecosystem — each card shows experience level
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {techList.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 * index }}
            >
              <TechCard tech={tech} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechGrid;
