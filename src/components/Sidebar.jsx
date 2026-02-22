import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaTelegramPlane, FaPhone, FaLinkedin, FaArrowLeft } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaUser, FaCode, FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";

export default function Sidebar({ className, onCollapse }) {
  // Treat widths >= 720px as "desktop" for sidebar layout/collapse.
  // Below 720px (phones + small tablets) keep a full-width profile panel.
  const getIsDesktop = () =>
    (typeof window !== "undefined" ? window.innerWidth >= 720 : true);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [isDesktop, setIsDesktop] = useState(getIsDesktop);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Desktop-only collapse/expand logic
  useEffect(() => {
    const handleResize = () => {
      const desktop = getIsDesktop();
      setIsDesktop(desktop);

      // When leaving desktop, force expanded state so mobile/tablet
      // always see the full profile panel.
      if (!desktop) {
        setIsCollapsed(false);
        onCollapse && onCollapse(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [onCollapse]);

  const handleToggle = () => {
    if (!isDesktop) return; // collapse/expand only on large screens

    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    if (onCollapse) onCollapse(newCollapsedState);
  };

  const handleImageClick = (e) => {
    e.stopPropagation();
    if (!isCollapsed) {
      setIsModalOpen(true);
    } else {
      handleToggle();
    }
  };

  // Floating elements animation
  const floatingAnimation = {
    y: [0, -5, 0, 5, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    }
  };

  // Move variants INSIDE component (before return)
  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 30 } }
  };

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {isCollapsed ? (
          <motion.aside
            key="collapsed"
            className={`sidebar flex flex-col relative ${className} md:w-18 md:min-w-[4.5rem] w-18 min-w-[4.5rem] max-h-screen overflow-y-auto bg-[#0a0a0a]/90 border-r border-[#1A936F]/30 backdrop-blur-xl`}
            initial={{ width: "280px", opacity: 0 }}
            animate={{
              width: "72px",
              opacity: 1,
            }}
            exit={{ width: "72px", opacity: 0, x: -20 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
          >
            {/* Decorative elements */}
            <motion.div
              className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#1ED696]/30 to-transparent"
              animate={{
                opacity: [0.3, 0.7, 0.3],
                boxShadow: [
                  "0 0 10px rgba(30,214,150,0.1)",
                  "0 0 20px rgba(30,214,150,0.2)",
                  "0 0 10px rgba(30,214,150,0.1)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <motion.div className="flex flex-col items-center w-full pt-8">
              {/* Profile image with floating animation */}
              <motion.div
                className="relative cursor-pointer"
                whileTap={{ scale: 0.9 }}
                onClick={handleToggle}
                animate={floatingAnimation}
              >
                {/* Ambient glow */}
                <motion.div
                  className="absolute -inset-1.5 bg-gradient-to-br from-[#114E3C]/60 via-[#1ED696]/40 to-[#114E3C]/50 rounded-full blur-md"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.4, 0.6, 0.4],
                  }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                />

                {/* Orbiting dot */}
                <motion.div
                  className="absolute w-1.5 h-1.5 bg-[#1ED696] rounded-full shadow-[0_0_8px_rgba(30,214,150,0.8)]"
                  animate={{
                    x: [0, 8, 0, -8, 0],
                    y: [-8, 0, 8, 0, -8],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                <div className="relative">
                  <div className="rounded-full border-2 border-[#1ED696] shadow-[0_0_15px_rgba(30,214,150,0.3)] overflow-hidden w-12 h-12">
                    <img
                      src="/self.webp"
                      alt="Ahmed Elmasri"
                      className="w-full h-full object-cover"
                      fetchPriority="high"
                    />
                  </div>

                  {/* Menu icon overlay */}
                  <motion.div
                    className="absolute inset-0 bg-[#000]/60 rounded-full flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    whileHover={{ opacity: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 180] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <FaBars className="text-[#1ED696]" />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Menu dots */}
              <div className="flex flex-col items-center gap-1.5 mt-8">
                {[0, 1, 2].map(index => (
                  <motion.div
                    key={index}
                    className="w-1.5 h-1.5 bg-[#1A936F] rounded-full"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      delay: index * 0.3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                ))}
              </div>

              {/* Collapsed quick actions */}
              <div className="flex flex-col items-center gap-4 mt-10">
                {/* small vertical glass bar to hint profile */}
                <div className="h-20 w-[2px] bg-gradient-to-b from-[#1ED696]/40 via-[#1A936F]/20 to-transparent rounded-full" />

                {/* contact / social icons */}
                <motion.a
                  href="https://github.com/0asaca0rum0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#050b09] border border-[#1A936F]/40 flex items-center justify-center text-[#8FE7C3] hover:text-[#1ED696] hover:border-[#1ED696]/60 shadow-md"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub size={16} />
                </motion.a>

                <motion.a
                  href="https://t.me/karasuma_renya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#050b09] border border-[#1A936F]/40 flex items-center justify-center text-[#8FE7C3] hover:text-[#1ED696] hover:border-[#1ED696]/60 shadow-md"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaTelegramPlane size={16} />
                </motion.a>

                <motion.a
                  href="tel:+33773225719"
                  className="w-9 h-9 rounded-full bg-[#050b09] border border-[#1A936F]/40 flex items-center justify-center text-[#8FE7C3] hover:text-[#1ED696] hover:border-[#1ED696]/60 shadow-md"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPhone size={15} />
                </motion.a>
              </div>

              {/* expand button */}
              <motion.button
                className="mt-10 mb-4 bg-[#050b09] p-2 rounded-full border border-[#1A936F]/40 text-[#8FE7C3] hover:text-[#1ED696] shadow-md"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 15px rgba(30,214,150,0.2)",
                  borderColor: "rgba(30,214,150,0.5)"
                }}
                whileTap={{ scale: 0.9 }}
                onClick={handleToggle}
              >
                <motion.div
                  animate={{ rotate: 180 }}
                  transition={{ duration: 0.4 }}
                >
                  <FaArrowLeft size={16} />
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.aside>
        ) : (
          <motion.aside
            key="expanded"
            className={`sidebar flex flex-col relative w-full md:w-auto max-h-screen overflow-y-auto backdrop-blur-xl bg-[#0a0a0a]/90 border-r border-[#1A936F]/30 shadow-[0_0_40px_rgba(0,0,0,0.6),inset_0_0_20px_rgba(26,147,111,0.1)] ${className}`}
            initial={{ width: isDesktop ? "72px" : "100%", x: isDesktop ? -30 : 0, opacity: 0 }}
            animate={{
              width: isDesktop ? "280px" : "100%",
              x: 0,
              opacity: 1
            }}
            exit={{
              width: isDesktop ? "280px" : "100%",
              x: isDesktop ? -30 : 0,
              opacity: 0,
              transition: { duration: 0.2 }
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 1
            }}
          >
            {/* Animated decorative elements */}
            <motion.div
              className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#1ED696]/30 to-transparent"
              animate={{
                opacity: [0.3, 0.7, 0.3],
                boxShadow: [
                  "0 0 10px rgba(30,214,150,0.1)",
                  "0 0 20px rgba(30,214,150,0.2)",
                  "0 0 10px rgba(30,214,150,0.1)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <motion.div
              className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-[#1A936F]/5 to-transparent blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />

            <div className="p-3 relative">
              {/* Header section */}
              <div className="flex justify-between items-start mb-3">
                <motion.div
                  className="flex relative"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <motion.div
                    className="relative"
                    animate={floatingAnimation}
                  >
                    {/* Enhanced ambient glow */}
                    <motion.div
                      className="absolute -inset-3 bg-gradient-to-br from-[#114E3C]/40 via-[#1ED696]/20 to-[#114E3C]/30 rounded-full blur-xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />

                    {/* Micro-interaction for profile picture */}
                    <motion.img
                      src="/self.webp"
                      alt="Ahmed Elmasri"
                      className="rounded-full border-2 border-[#1ED696] shadow-[0_0_15px_rgba(30,214,150,0.3)] object-cover w-20 h-20 relative z-10 cursor-pointer"
                      fetchPriority="high"
                      width="80"
                      height="80"
                      decoding="async"
                      whileHover={{
                        scale: 1.05,
                        rotate: [0, 2, -2, 0],
                        borderColor: "#1ED696",
                        borderWidth: "3px",
                        transition: { duration: 0.3 }
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleImageClick}
                    />

                    {/* Animated orbit particles */}
                    {[45, 135, 225, 315].map((angle, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-[#1ED696]/80 rounded-full shadow-[0_0_5px_rgba(30,214,150,0.8)]"
                        style={{
                          top: "50%",
                          left: "50%",
                          margin: "-1px",
                        }}
                        animate={{
                          x: `${Math.cos((angle * Math.PI) / 180) * 30}px`,
                          y: `${Math.sin((angle * Math.PI) / 180) * 30}px`,
                          opacity: [0.6, 1, 0.6],
                          scale: [1, 1.3, 1],
                        }}
                        transition={{
                          duration: 3,
                          delay: i * 0.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </motion.div>

                  {/* Collapse button */}
                  <motion.button
                    className="absolute -right-4 top-0 bg-[#121212] p-1.5 rounded-full border border-[#1A936F]/40 text-[#8FE7C3] hover:text-[#1ED696] shadow-md"
                    whileHover={{
                      scale: 1.1,
                      rotate: 90,
                      boxShadow: "0 0 10px rgba(30,214,150,0.2)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleToggle}
                  >
                    <FaBars size={12} />
                  </motion.button>
                </motion.div>
              </div>

              {/* Main content with staggered animations */}
              <motion.div
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.2,
                    }
                  }
                }}
              >
                {/* Name with shimmer effect */}
                <motion.div
                  variants={itemVariant}
                  className="relative overflow-hidden mb-1"
                >
                  <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FAF3DD] to-[#FCFFF0] text-center md:text-left">
                    ELMASRI Ahmed
                  </h1>
                  <motion.div
                    className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-[#1ED696]/20 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ repeat: Infinity, duration: 2, repeatDelay: 5 }}
                  />
                </motion.div>

                {/* Job title with animated underline */}
                <motion.div variants={itemVariant} className="relative mb-2">
                  <h2 className="text-xs sm:text-sm md:text-base font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#1A936F] to-[#1ED696] text-center md:text-left">
                    Full Stack  & AI Research Engineer
                  </h2>
                  <motion.div
                    className="h-[1px] w-0 bg-gradient-to-r from-[#1A936F]/50 to-[#1ED696]/50"
                    animate={{ width: ["0%", "70%", "0%"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
                  />
                </motion.div>

                {/* Enhanced bio text */}
                <motion.p
                  variants={itemVariant}
                  className="text-xs sm:text-sm md:text-[13px] text-[#FCFFF0]/80 leading-relaxed mb-3 text-center md:text-left"
                >
                  Computer Science & Engineering graduate specializing in Intelligent Systems. Experienced in Edge AI pipelines and deployment on STM32 microcontrollers. Strong background in Machine Learning, Deep Learning, and NLP. Skilled in React, Next.js, TypeScript, and modern development tools. Hands-on with TPUs, TensorFlow, and hardware-accelerated model optimization. Passionate developer building web, mobile, and embedded solutions for real-world problems.
                </motion.p>

                {/* Contact section with interactive elements */}
                <motion.div variants={itemVariant}>
                  {/* Section header with animated accent */}
                  <div className="flex items-center gap-2 mb-2 relative">
                    <motion.div
                      className="flex items-center gap-2"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                    >
                      <motion.span
                        className="h-5 w-1 bg-gradient-to-b from-[#1A936F] to-[#1ED696] rounded-full"
                        animate={{
                          height: ["20px", "24px", "20px"],
                          background: [
                            "linear-gradient(to bottom, #1A936F, #1ED696)",
                            "linear-gradient(to bottom, #1ED696, #1A936F)",
                            "linear-gradient(to bottom, #1A936F, #1ED696)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <h3 className="text-base sm:text-lg font-semibold text-[#FAF3DD]">Tags</h3>
                      {/* add contact info */}
                    </motion.div>


                    <motion.div
                      className="ml-auto h-[1px] flex-1 bg-gradient-to-r from-[#1A936F]/50 to-transparent"
                      animate={{
                        opacity: [0.3, 0.7, 0.3],
                        width: ["20%", "40%", "20%"]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />

                  </div>


                  {/* Animated skill tags */}
                  <div className="flex flex-wrap gap-1">
                    {[
                      "React",
                      "Next.js",
                      "TypeScript",
                      "Machine Learning",
                      "Deep Learning",
                      "NLP",
                      "Edge AI",
                      "STM32",
                      "TensorFlow / TPU",
                      "Web Scraping",
                      "Automation",
                      "SaaS Platforms"
                    ].map((skill, index) => (
                      <SkillTag
                        key={skill}
                        text={skill}
                        index={index}
                      />
                    ))}
                  </div>
                </motion.div>
                                  <span className="text-[8px] text-[#1ED696]/50">up up down down left right left right</span>

              </motion.div>
            </div>

            {/* Footer with pulsing effect */}
            <motion.div
              className=" border-t border-[#1A936F]/10 py-3 px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="relative flex justify-center md:justify-start items-center">
                <motion.div
                  className="text-[10px] sm:text-[11px] text-[#FCFFF0]/40 flex gap-1 items-center"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <span>© 2023</span>
                  <span className="text-[#1ED696]/80">Elmasri</span>
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  >
                    Portfolio
                  </motion.span>
                </motion.div>

                {/* Subtle animation for footer */}
                <motion.div
                  className="absolute bottom-full left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#1A936F]/30 to-transparent"
                  animate={{
                    opacity: [0, 1, 0],
                    x: ["-10%", "110%"]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                />
              </div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Image Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal Content */}
            <motion.div
              className="relative z-10 max-w-2xl w-full"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                className="absolute -top-12 right-0 bg-[#121212] p-2 rounded-full border border-[#1A936F]/40 text-[#8FE7C3] hover:text-[#1ED696] hover:border-[#1ED696]/60 shadow-lg"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsModalOpen(false)}
              >
                <IoClose size={24} />
              </motion.button>

              {/* Image container */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#1ED696]/40 shadow-[0_0_50px_rgba(30,214,150,0.3)]">
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#1ED696]/20 via-transparent to-[#1A936F]/20"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                <img
                  src="/self.webp"
                  alt="Ahmed Elmasri - Full View"
                  className="w-full h-auto object-cover relative z-10"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


// Contact item component with animated interaction
const ContactItem = ({ icon, text, href, delay, type = "link" }) => {
  const [isHovered, setIsHovered] = useState(false);

  const Component = type === "link" ? motion.a : motion.div;
  const props = type === "link" ? { href, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Component
      {...props}
      className={`flex items-center gap-3 group ${type === "link" ? "text-[#FCFFF0] hover:text-[#1ED696]" : "text-[#FCFFF0]"} transition`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ x: 3 }}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
    >
      <motion.div
        className="w-8 h-8 rounded-full bg-[#121212] flex items-center justify-center border border-[#1A936F]/30"
        animate={isHovered ? {
          borderColor: "rgba(30, 214, 150, 0.6)",
          backgroundColor: "rgba(26, 147, 111, 0.1)",
          scale: 1.1,
        } : {}}
        transition={{ type: "spring", stiffness: 500, damping: 17 }}
      >
        <motion.div
          className="text-[#8FE7C3]"
          animate={isHovered ? {
            color: "#1ED696",
            scale: 1.15,
            rotate: [0, 10, -10, 0]
          } : {}}
          transition={{ type: "spring" }}
        >
          {icon}
        </motion.div>
      </motion.div>

      <div className="relative overflow-hidden">
        <span className={type === "link" ? "group-hover:text-[#1ED696] transition-colors" : ""}>
          {text}
        </span>
        {type === "link" && (
          <motion.div
            className="absolute bottom-0 left-0 h-[1px] bg-[#1ED696]"
            initial={{ width: 0 }}
            animate={isHovered ? { width: "100%" } : { width: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </div>

      {type === "link" && isHovered && (
        <motion.div
          className="absolute right-0 ml-2 text-[#1ED696]"
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 5 }}
        >
          →
        </motion.div>
      )}
    </Component>
  );
};

// Skill tag with pulse and hover animation
const SkillTag = ({ text, index }) => {
  return (
    <motion.div
      className="bg-[#121212] border border-[#1A936F]/30 text-[#8FE7C3] text-[11px] px-2.5 py-1 rounded-full relative overflow-hidden skill-tag"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 + (index * 0.05) }}
      whileHover={{
        scale: 1.08,
        backgroundColor: "rgba(30, 214, 150, 0.1)",
        borderColor: "rgba(30, 214, 150, 0.5)",
        color: "#1ED696"
      }}
    >
      {text}
    </motion.div>
  );
};