import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaReact, FaNodeJs, FaServer, FaLinux, FaPython, FaMicrochip,
} from "react-icons/fa";
import { TbBrandNextjs, TbBrandMysql } from "react-icons/tb";
import { SiTailwindcss, SiNginx, SiOpenai, SiNvidia } from "react-icons/si";
import { BiLogoGoLang } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

const techList = [
  { name: "React", icon: FaReact, color: "#61DAFB", level: 90, description: "Building dynamic, interactive user interfaces with modern React patterns, hooks, and state management." },
  { name: "Next.js", icon: TbBrandNextjs, color: "#FFFFFF", level: 85, description: "Developing server-side rendered and statically generated web applications for optimal performance and SEO." },
  { name: "Tailwind", icon: SiTailwindcss, color: "#38BDF8", level: 95, description: "Rapidly styling responsive designs with a utility-first approach and custom design systems." },
  { name: "Node.js", icon: FaNodeJs, color: "#68A063", level: 80, description: "Creating scalable backend services and RESTful APIs using the Node.js runtime." },
  { name: "Express", icon: FaServer, color: "#808080", level: 75, description: "Architecting robust web servers and middleware for seamless request handling." },
  { name: "MySQL", icon: TbBrandMysql, color: "#00758F", level: 70, description: "Designing normalized database schemas and writing efficient queries for data persistence." },
  { name: "Nginx", icon: SiNginx, color: "#009639", level: 65, description: "Configuring reverse proxies, load balancers, and web servers for high-traffic deployments." },
  { name: "Linux", icon: FaLinux, color: "#FCC624", level: 85, description: "Proficient in shell scripting, system administration, and deploying applications in Linux environments." },
  { name: "Python", icon: FaPython, color: "#3776AB", level: 80, description: "Leveraging Python for scripting, automation, data analysis, and backend development." },
  { name: "Go", icon: BiLogoGoLang, color: "#00ADD8", level: 40, description: "Building high-performance, concurrent system tools and microservices." },
  { name: "NLP", icon: SiOpenai, color: "#10A37F", level: 40, description: "Exploring Natural Language Processing techniques and integrating LLMs into applications." },
  { name: "Image  Processing", icon: SiNvidia, color: "#76B900", level: 50, description: "Working with computer vision libraries and hardware acceleration for image processing tasks." },
  { name: "Embedded", icon: FaMicrochip, color: "#E53935", level: 40, description: "Programming microcontrollers and interfacing with hardware sensors for IoT solutions." },
];

const getPosition = (index, total, radius = 220) => {
  const phi = Math.acos(-1 + (2 * index) / total);
  const theta = Math.sqrt(total * Math.PI) * phi;
  return {
    x: radius * Math.cos(theta) * Math.sin(phi),
    y: radius * Math.sin(theta) * Math.sin(phi),
    z: radius * Math.cos(phi),
  };
};

const Orbit = () => {
  const [selectedTech, setSelectedTech] = useState(null);

  const rotX = useRef(10);
  const rotY = useRef(0);
  const velX = useRef(0);
  const velY = useRef(0.15);

  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const innerRef = useRef(null);
  const rafRef = useRef(null);
  const pendingTech = useRef(null);  // tech tapped, cleared if dragged
  const pointerMoved = useRef(false);

  const applyRotation = useCallback(() => {
    if (!innerRef.current || !containerRef.current) return;
    innerRef.current.style.transform =
      `rotateX(${rotX.current}deg) rotateY(${rotY.current}deg)`;
    // Scope to container so only children recalculate (not the whole document)
    containerRef.current.style.setProperty('--crx', `${-rotX.current}deg`);
    containerRef.current.style.setProperty('--cry', `${-rotY.current}deg`);
  }, []);

  useEffect(() => {
    const loop = () => {
      if (!isDragging.current) {
        rotY.current += velY.current;
        velX.current *= 0.94;
        velY.current += (0.15 - velY.current) * 0.025;
        rotX.current += velX.current;
        rotX.current = Math.max(-40, Math.min(40, rotX.current));
      }
      applyRotation();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [applyRotation]);

  const onPointerDown = (e) => {
    if (selectedTech) return;
    isDragging.current = true;
    pointerMoved.current = false;
    pendingTech.current = null;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    velX.current = 0;
    velY.current = 0;
  };

  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) pointerMoved.current = true;
    // +dx = drag right → sphere turns right; -dy = drag up → top tilts away (natural trackball)
    rotY.current += dx * 0.4;
    rotX.current -= dy * 0.4;
    velY.current = dx * 0.4;
    velX.current = -dy * 0.4;
    rotX.current = Math.max(-40, Math.min(40, rotX.current));
    lastPointer.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerUp = () => {
    isDragging.current = false;
    // Trigger modal only if pointer barely moved (tap, not drag)
    if (!pointerMoved.current && pendingTech.current) {
      setSelectedTech(pendingTech.current);
    }
    pendingTech.current = null;
  };

  // Called from TechItem on pointerDown — registers which tech was tapped
  const onItemPointerDown = (e, tech) => {
    pendingTech.current = tech;
  };

  return (
    <section className="w-full h-full min-h-[680px] flex flex-col items-center justify-center font-['Comfortaa'] overflow-hidden relative select-none">
      {/* Ambient glow — static layer, no backdrop-filter */}
      <div className="absolute inset-0 pointer-events-none" style={{ contain: "strict" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-[#1A936F]/8 rounded-full" style={{ filter: "blur(60px)", willChange: "auto" }} />
      </div>

      <p className="text-[#8FE7C3]/40 text-xs mb-4 tracking-widest uppercase z-10">
        Drag to rotate · Click to explore
      </p>

      {/* Orbit container */}
      <div
        ref={containerRef}
        className="relative w-[500px] h-[500px] cursor-grab active:cursor-grabbing touch-none"
        style={{ perspective: "1000px" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {/* Rotating sphere of icons + core ball */}
        <div
          ref={innerRef}
          className="w-full h-full relative"
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        >
          {/* Core Ball — z=0 so depth sorting puts it between front and back icons */}
          <div
            className="absolute top-1/2 left-1/2"
            style={{
              transform: "translate(-50%, -50%) translateZ(0px)",
              width: "96px",
              height: "96px",
              borderRadius: "50%",
              background: `
                radial-gradient(circle at 35% 32%,
                  rgba(100,255,200,0.35) 0%,
                  rgba(30,214,150,0.55) 30%,
                  rgba(26,147,111,0.8) 60%,
                  rgba(10,60,40,1) 100%)
              `,
              boxShadow: `
                0 0 0 1px rgba(30,214,150,0.3),
                0 0 30px rgba(30,214,150,0.4),
                inset 0 2px 6px rgba(255,255,255,0.15),
                inset 0 -4px 10px rgba(0,0,0,0.5)
              `,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              className="text-white font-bold text-base tracking-wider drop-shadow"
              style={{ display: "block", transform: "rotateX(var(--crx,0deg)) rotateY(var(--cry,0deg))" }}
            >TECH</span>
            {/* Specular highlight */}
            <div
              style={{
                position: "absolute",
                width: "36px", height: "18px",
                top: "10px", left: "16px",
                borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(255,255,255,0.28) 0%, transparent 100%)",
                filter: "blur(2px)",
                pointerEvents: "none",
              }}
            />
          </div>
          {techList.map((tech, index) => {
            const pos = getPosition(index, techList.length);
            return (
              <TechItem
                key={tech.name}
                tech={tech}
                x={pos.x}
                y={pos.y}
                z={pos.z}
                onPointerDown={(e) => onItemPointerDown(e, tech)}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-10 text-center z-10">
        <h2 className="text-3xl font-bold text-[#1ED696] mb-2">Tech Universe</h2>
        <p className="text-[#8FE7C3]/60 text-sm">Interactive 3D Skill System</p>
      </div>

      {/* Fullscreen Tech Detail Modal */}
      <AnimatePresence>
        {selectedTech && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedTech(null)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-lg" />

            <motion.div
              className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-8 p-8"
              initial={{ scale: 0.9, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 24 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedTech(null)}
                className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all"
              >
                <IoClose size={24} />
              </button>

              <motion.div
                className="w-44 h-44 rounded-full flex items-center justify-center"
                style={{
                  background: `radial-gradient(circle at 38% 33%, ${selectedTech.color}22 0%, ${selectedTech.color}08 55%, transparent 75%)`,
                  border: `1.5px solid ${selectedTech.color}50`,
                  boxShadow: `0 0 80px ${selectedTech.color}30, inset 0 0 40px ${selectedTech.color}08`,
                }}
                initial={{ scale: 0.5, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 240, damping: 20 }}
              >
                <selectedTech.icon size={80} color={selectedTech.color} />
              </motion.div>

              <motion.h2
                className="text-5xl md:text-7xl font-bold text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.07 }}
              >
                {selectedTech.name}
              </motion.h2>

              <motion.div
                className="flex flex-col items-center gap-2 w-full max-w-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.12 }}
              >
                <div className="flex justify-between w-full text-sm mb-1">
                  <span className="text-[#8FE7C3]/60">Proficiency</span>
                  <span className="font-mono" style={{ color: selectedTech.color }}>{selectedTech.level}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: selectedTech.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedTech.level}%` }}
                    transition={{ duration: 0.9, delay: 0.18, ease: "easeOut" }}
                  />
                </div>
              </motion.div>

              <motion.p
                className="text-lg md:text-xl text-gray-300 text-center leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                {selectedTech.description}
              </motion.p>

              <motion.p
                className="absolute bottom-8 text-white/25 text-xs tracking-widest uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Click anywhere to close
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const TechItem = ({ tech, x, y, z, onPointerDown }) => {
  const Icon = tech.icon;
  return (
    <div
      className="absolute top-1/2 left-1/2 flex items-center justify-center group cursor-pointer tech-item"
      style={{
        transform: `translate3d(${x}px, ${y}px, ${z}px)`,
        transformStyle: "preserve-3d",
      }}
      onPointerDown={onPointerDown}
    >
      {/* Counter-rotated inner so content always faces camera */}
      <div
        className="relative flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[#0a0a0a] border border-[#1A936F]/10 hover:border-[#1ED696] hover:bg-[#0d0d0d] transition-colors duration-150 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        style={{ transform: "rotateX(var(--crx,0deg)) rotateY(var(--cry,0deg))" }}
      >
        <Icon size={26} color={tech.color} />
        <span className="text-[12px] text-white/80 font-medium whitespace-nowrap text-">
          {tech.name}
        </span>
      </div>
    </div>
  );
};

export default Orbit;
