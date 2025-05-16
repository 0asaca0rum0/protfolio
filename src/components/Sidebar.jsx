import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaTelegramPlane, FaPhone, FaLinkedin, FaArrowLeft } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaUser, FaCode, FaBars } from "react-icons/fa6";
import { useState, useEffect } from "react";

export default function Sidebar({ className, onCollapse }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);

  const handleToggle = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    if (onCollapse) onCollapse(newCollapsedState);
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

  return (
    <AnimatePresence mode="wait" initial={false}>
      {isCollapsed ? (
        <motion.aside
          key="collapsed"
          className={` flex flex-col relative ${className} md:w-18 md:min-w-[4.5rem] w-18 min-w-[4.5rem] p-0 backdrop-blur-md bg-[#0A0A0A]/80 border-r border-[#1ED696]/10 shadow-[0_0_15px_rgba(26,147,111,0.05),inset_0_0_20px_rgba(0,0,0,0.2)]`}
          initial={{ width: "280px", opacity: 0 }}
          animate={{ 
            width: "72px", 
            opacity: 1,
            boxShadow: "0 0 15px rgba(26,147,111,0.05), inset 0 0 20px rgba(0,0,0,0.2)"
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
            
            {/* Collapsed menu icons with hover effects */}
            <div className="flex flex-col items-center gap-5 mt-8">
             </div>
            <motion.button
              className="mt-8 bg-[#121212] p-2 rounded-full border border-[#1A936F]/40 text-[#8FE7C3] hover:text-[#1ED696] shadow-md"
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
          className={`sidebar flex flex-col relative  backdrop-blur-md bg-gradient-to-b from-[#0A0A0A]/95 via-[#0A0A0A]/90 to-[#0A0A0A]/95 border-r border-[#1A936F]/20 shadow-[0_0_30px_rgba(26,147,111,0.05),inset_0_0_30px_rgba(0,0,0,0.3)] ${className}`}
          initial={{ width: "72px", x: -30, opacity: 0 }}
          animate={{ 
            width: "280px",
            x: 0,
            opacity: 1 
          }}
          exit={{ 
            width: "280px", 
            x: -30, 
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
          
          <div className="p-6 relative">
            {/* Header section */}
            <div className="flex justify-between items-start mb-6">
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
                    className="rounded-full border-2 border-[#1ED696] shadow-[0_0_15px_rgba(30,214,150,0.3)] object-cover w-20 h-20 relative z-10"
                    whileHover={{ 
                      scale: 1.05, 
                      rotate: [0, 2, -2, 0],
                      borderColor: "#1ED696",
                      borderWidth: "3px",
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleToggle}
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
                className="relative overflow-hidden mb-2"
              >
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FAF3DD] to-[#FCFFF0] text-center md:text-left">
                  ELMASRI Ahmed
                </h1>
                <motion.div
                  className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-[#1ED696]/20 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 2, repeatDelay: 5 }}
                />
              </motion.div>
              
              {/* Job title with animated underline */}
              <motion.div variants={itemVariant} className="relative mb-3">
                <h2 className="text-base font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#1A936F] to-[#1ED696] text-center md:text-left">
                  Full Stack Developer & Server Engineer
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
                className="text-sm text-[#FCFFF0]/80 leading-relaxed mb-8 text-center md:text-left"
              >
                Passionate about building scalable web applications and robust backend systems. 
                Experienced with React, Node.js, and cloud infrastructure. 
                Always learning, always building.
              </motion.p>
              
              {/* Contact section with interactive elements */}
              <motion.div variants={itemVariant}>
                {/* Section header with animated accent */}
                <div className="flex items-center gap-2 mb-5 relative">
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
                    <h3 className="text-lg font-semibold text-[#FAF3DD]">Contact Information</h3>
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
                <div className="flex flex-wrap gap-2">
                  {["React", "Node.js", "Next.js", "MongoDB", "Express", "Tailwind CSS"].map((skill, index) => (
                    <SkillTag 
                      key={skill} 
                      text={skill} 
                      index={index} 
                    />
                  ))}
                </div>
              </motion.div>
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
                className="text-[10px] text-[#FCFFF0]/40 flex gap-1 items-center"
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
  );
}

// Animation variants
const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 30 } }
};

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
      className="bg-[#121212] border border-[#1A936F]/30 text-[#8FE7C3] text-xs px-3 py-1.5 rounded-full relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6 + (index * 0.1) }}
      whileHover={{ 
        scale: 1.08, 
        backgroundColor: "rgba(30, 214, 150, 0.1)",
        borderColor: "rgba(30, 214, 150, 0.5)",
        color: "#1ED696"
      }}
    >
      {text}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: index + 3 }}
      />
    </motion.div>
  );
};
