import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaServer,
  FaLinux,
  FaPython,
  FaMicrochip,
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
    color: "#61DAFB",
    level: 90,
    description: "Building dynamic, interactive user interfaces with modern React patterns, hooks, and state management.",
  },
  {
    name: "Next.js",
    icon: TbBrandNextjs,
    color: "#FFFFFF",
    level: 85,
    description: "Developing server-side rendered and statically generated web applications for optimal performance and SEO.",
  },
  {
    name: "Tailwind",
    icon: SiTailwindcss,
    color: "#38BDF8",
    level: 95,
    description: "Rapidly styling responsive designs with a utility-first approach and custom design systems.",
  },
  {
    name: "Node.js",
    icon: FaNodeJs,
    color: "#68A063",
    level: 80,
    description: "Creating scalable backend services and RESTful APIs using the Node.js runtime.",
  },
  {
    name: "Express",
    icon: FaServer,
    color: "#808080",
    level: 75,
    description: "Architecting robust web servers and middleware for seamless request handling.",
  },
  {
    name: "MySQL",
    icon: TbBrandMysql,
    color: "#00758F",
    level: 70,
    description: "Designing normalized database schemas and writing efficient queries for data persistence.",
  },
  {
    name: "Nginx",
    icon: SiNginx,
    color: "#009639",
    level: 65,
    description: "Configuring reverse proxies, load balancers, and web servers for high-traffic deployments.",
  },
  {
    name: "Linux",
    icon: FaLinux,
    color: "#FCC624",
    level: 85,
    description: "Proficient in shell scripting, system administration, and deploying applications in Linux environments.",
  },
  {
    name: "Python",
    icon: FaPython,
    color: "#3776AB",
    level: 80,
    description: "Leveraging Python for scripting, automation, data analysis, and backend development.",
  },
  {
    name: "Go",
    icon: BiLogoGoLang,
    color: "#00ADD8",
    level: 40,
    description: "Building high-performance, concurrent system tools and microservices.",
  },
  {
    name: "NLP",
    icon: SiOpenai,
    color: "#10A37F",
    level: 40,
    description: "Exploring Natural Language Processing techniques and integrating LLMs into applications.",
  },
  {
    name: "Image processing",
    icon: SiNvidia,
    color: "#76B900",
    level: 50,
    description: "Working with computer vision libraries and hardware acceleration for image processing tasks.",
  },
  {
    name: "Embedded",
    icon: FaMicrochip,
    color: "#E53935",
    level: 40, // Intermediate
    description: "Programming microcontrollers and interfacing with hardware sensors for IoT solutions.",
  },
];

const Orbit = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedTech, setSelectedTech] = useState(null);

  // Calculate positions for a spherical/orbital distribution
  const getPosition = (index, total) => {
    const phi = Math.acos(-1 + (2 * index) / total);
    const theta = Math.sqrt(total * Math.PI) * phi;
    const radius = 220; // Orbit radius

    return {
      x: radius * Math.cos(theta) * Math.sin(phi),
      y: radius * Math.sin(theta) * Math.sin(phi),
      z: radius * Math.cos(phi),
    };
  };

  return (
    <section className="w-full h-full min-h-[680px] flex flex-col items-center justify-center font-['Comfortaa'] overflow-hidden relative">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1A936F]/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative w-[500px] h-[500px] perspective-[1000px]" style={{ transformStyle: "preserve-3d" }}>
        {/* Central Core - Static */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-[#1A936F] to-[#1ED696] rounded-full shadow-[0_0_50px_rgba(30,214,150,0.6)] flex items-center justify-center z-10 backdrop-blur-md border border-white/20"
          style={{ transform: "translate(-50%, -50%) translateZ(0)" }}
        >
          <div className="text-white font-bold text-xl tracking-wider">TECH</div>
        </div>

        <div
          className="w-full h-full relative animate-orbit"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Orbiting Items */}
          {techList.map((tech, index) => {
            const pos = getPosition(index, techList.length);
            return (
              <TechItem
                key={tech.name}
                tech={tech}
                x={pos.x}
                y={pos.y}
                z={pos.z}
                onClick={() => setSelectedTech(tech)}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-12 text-center z-10">
        <h2 className="text-3xl font-bold text-[#1ED696] mb-2">Tech Universe</h2>
        <p className="text-[#8FE7C3]/80">Interactive 3D Skill System</p>
      </div>

      {/* Tech Detail Modal */}
      {selectedTech && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedTech(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="relative w-full max-w-md bg-[#0a0a0a]/90 border border-[#1A936F]/50 rounded-2xl p-6 shadow-[0_0_30px_rgba(30,214,150,0.2)] flex flex-col items-center text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedTech(null)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              ✕
            </button>

            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1A936F]/20 to-[#1ED696]/20 flex items-center justify-center mb-4 border border-[#1A936F]/30 shadow-inner">
              <selectedTech.icon size={40} color={selectedTech.color} />
            </div>

            <h3 className="text-2xl font-bold text-white mb-1">{selectedTech.name}</h3>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1.5 w-24 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1ED696] rounded-full"
                  style={{ width: `${selectedTech.level}%` }}
                />
              </div>
              <span className="text-xs text-[#1ED696] font-mono">{selectedTech.level}%</span>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed">
              {selectedTech.description}
            </p>
          </motion.div>
        </div>
      )}
    </section>
  );
};

const TechItem = ({ tech, x, y, z, onClick }) => {
  const Icon = tech.icon;

  return (
    <div
      className="absolute top-1/2 left-1/2 flex items-center justify-center group cursor-pointer tech-item"
      style={{
        transform: `translate3d(${x}px, ${y}px, ${z}px)`,
        transformStyle: "preserve-3d",
      }}
      onClick={onClick}
    >
      <div
        className="relative flex flex-col items-center gap-2 p-3 rounded-xl bg-[#0a0a0a]/90 border border-[#1A936F]/30 hover:border-[#1ED696] hover:bg-black transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.5)] animate-counter-orbit"
      >
        <Icon size={28} color={tech.color} />
        <span className="text-[10px] text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-6 whitespace-nowrap bg-black/80 px-2 py-1 rounded">
          {tech.name}
        </span>
      </div>
    </div>
  );
};

export default Orbit;
