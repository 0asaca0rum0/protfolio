import { useEffect } from "react";
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Projects() {
    const projects = [
        {
            title: "E-commerce Dashboard",
            description: "A comprehensive dashboard for managing an e-commerce platform, was meant for fri7a, a local shop in Algeria.",
            image: "project-1.webp",
            techstack: ['Next 13', "Node.js", "Express"],
            link: "",
            category: "Web App",
        },
        {
            title: "E-commerce (fri7a)",
            description: "A comprehensive website for an e-commerce platform, was meant for fri7a, a local shop in Algeria. The website has a feature for uploading short videos of the products or other content.",
            image: "fri7a.png",
            techstack: ['Next 13', "Node.js", "Express"],
            link: "https://fri7a.pages.dev",
            category: "Web App",
        },
        {
            title: "E-commerce (bilwafi)",
            description: "A responsive e-commerce website for selling products online, intended for bilwafi, a local cosmetic shop in Algeria. Integrated with a payment gateway and a product management dashboard.",
            image: "project-3.webp",
            techstack: ['Next 13', "Node.js", "Express"],
            link: "https://bilwafi.netlify.app/",
            category: "Web App",
        },
        {
            title: "Student Attendance System",
            description: "A system for tracking student attendance using QR codes and a mobile app. Developed as a bachelor's project at the University of Ahmed Draia, Adrar, Algeria.",
            image: "project-2.webp",
            techstack: ["React", "Node.js", "Express", "MongoDB"],
            link: "https://qr-attend.netlify.app/",
            category: "Web App",
        },
        {
            title: "Faculty Website",
            description: "A responsive faculty website for displaying academic resources. Made for the Faculty of Materials Science, Computer Science, and Mathematics at the University of Ahmed Draia, Adrar, Algeria.",
            image: "project-4.webp",
            techstack: ['Next 13', 'Tailwind CSS'],
            link: "",
            category: "Web App",
        },
        {
            title: "7awasli App",
            description: "A mobile app for connecting users with local service providers (plumbers, electricians, etc.) using location data to show the nearest workers.",
            image: "7awasli.webp",
            techstack: ["React Native", "Expo"],
            link: "",
            category: "Mobile App",
        },
        {
            title: "Library System",
            description: "A library management system with a sleek UI. Allows the admin to add, delete, and update books and users, and to search for books by title or author.",
            image: "library.jpg",
            techstack: ["Java", "MySQL"],
            link: "",
            category: "Desktop App",
        },
        {
            title: "Digit Recognition App",
            description: "A desktop app for recognizing handwritten digits using a neural network. Users draw digits on a canvas, and the app predicts the digit.",
            image: "digits.png",
            techstack: ["Custom Tkinter", "Python", "AI"],
            link: "",
            category: "AI",
        },
        {
            title: "Savr",
            description: "A browser extension and platform that helps users find better deals by comparing product prices across different sites using product URLs, images, or price values.",
            image: "savr.png",
            techstack: ["Next.js", "TypeScript", "Tailwind", "Puppeteer", "Chrome Extension API"],
            link: "https://savr.pro",
            category: "Web App",
        },
        {
            title: "AgentSphere",
            description: "An AI-powered multi-agent SaaS platform that allows companies to deploy agents trained on their internal data to automate business workflows.",
            image: "agentsphere.png",
            techstack: ["Next.js", "TypeScript", "LangChain", "OpenAI", "Vercel AI SDK"],
            link: "https://v0-agent-sphere.vercel.app/",
            category: "AI",
        },
    ];

    const categories = [
        { label: "All", value: "all" },
        { label: "Web Apps", value: "Web App" },
        { label: "Mobile", value: "Mobile App" },
        { label: "AI", value: "AI" },
    ];

    const [activeCategory, setActiveCategory] = useState("all");
    const [currentIndex, setCurrentIndex] = useState(0);
    
    // Track direction to drive slide animations
    const [slideDirection, setSlideDirection] = useState(null);
    
    // Filter projects based on active category
    const filteredProjects = activeCategory === "all"
        ? projects
        : projects.filter(project => project.category === activeCategory);

    // Derived values to avoid repetition
    const totalProjects = filteredProjects.length;
    const hasProjects = totalProjects > 0;
    const currentProject = hasProjects ? filteredProjects[currentIndex] : null;

    // Card navigation driven by slideDirection (no timeouts)
    const nextCard = () => {
        if (totalProjects <= 1) return;

        setSlideDirection("left");
        setCurrentIndex((prevIndex) => {
            const lastIndex = totalProjects - 1;
            return prevIndex === lastIndex ? 0 : prevIndex + 1;
        });
    };

    const prevCard = () => {
        if (totalProjects <= 1) return;

        setSlideDirection("right");
        setCurrentIndex((prevIndex) => {
            const lastIndex = totalProjects - 1;
            return prevIndex === 0 ? lastIndex : prevIndex - 1;
        });
    };

    // When category changes, reset to first card and clear any slide direction
    useEffect(() => {
        setCurrentIndex(0);
        setSlideDirection(null);
    }, [activeCategory]);

    const slideVariants = {
        enter: (direction) => ({
            x: direction === "left" ? 40 : -40,
            opacity: 0,
            scale: 0.98,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction) => ({
            x: direction === "left" ? -40 : 40,
            opacity: 0,
            scale: 0.98,
        }),
    };

    return (
        <div className="w-full flex flex-col items-center font-['Comfortaa'] gap-6 sm:gap-8 lg:gap-10 ">
            <motion.h2
                className="text-xl md:text-2xl lg:text-3xl font-bold text-[#FAF3DD] text-center sm:text-left px-4"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
                Projects
            </motion.h2>

            {/* Category Filter with creative glassmorphic design */}
            <motion.div
                className="w-full flex flex-col items-center gap-4"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* Modern Filter Container with glassmorphic style */}
                <div
                    className="flex justify-center gap-3"
                >
                    {/* Evenly distributed category buttons with creative styling */}
                    {categories.map((category) => (
                        <motion.button
                            key={category.value}
                            onClick={() => setActiveCategory(category.value)}
                            className={`relative py-2.5 px-6 text-center text-sm font-medium transition-all duration-300 rounded-xl touch-feedback ${
                                activeCategory === category.value
                                    ? 'text-[#1ED696] font-semibold bg-[#1A936F]/15 border border-[#1A936F]/40'
                                    : 'text-[#8FE7C3]/70 hover:text-[#8FE7C3] border border-transparent'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {category.label}
                     
                        </motion.button>
                    ))}
                </div>
                
                {/* Enhanced Stats Indicator with improved animation */}
                {/* Removed - stats shown in counter */}
            </motion.div>

            {/* Card Stack with improved spacing and animation */}
            <div className="w-full flex flex-col items-center">
                {/* Card Container with better height based on card content */}
                <div
                    className="relative w-full mx-auto max-w-[280px] md:max-w-[300px] lg:max-w-[320px] h-[300px] md:h-[310px] lg:h-[330px] m-1"
                >
                    {/* Current active card with smoother slide animations */}
                    <AnimatePresence
                        mode="wait"
                        initial={false}
                        custom={slideDirection || "left"}
                    >
                        {hasProjects && (
                            <motion.div
                                key={currentProject?.title ?? currentIndex}
                                className="w-full h-full"
                                variants={slideVariants}
                                custom={slideDirection || "left"}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    duration: 0.35,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                <AnimatedCard
                                    project={currentProject}
                                    isActive={true}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Background cards (no change) */}
                    {filteredProjects.map((project, idx) => {
                        // Calculate position in stack relative to current card
                        const position = (idx - currentIndex + filteredProjects.length) % filteredProjects.length;
                        
                        // Only render background cards (positions 1-4)
                        if (position === 0 || position >= 5) return null;
                        
                        return (
                            <AnimatedCard
                                key={`bg-${project.title}-${idx}`}
                                project={project}
                                position={position}
                                isActive={false}
                            />
                        );
                    })}
                </div>
                
                {/* Touch navigation hint - improved styling and animation */}
                <motion.div 
                    className="flex justify-center gap-3 items-center mt-4 sm:hidden"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                >
                    <motion.div
                        animate={{ x: [-2, 0, -2] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                        <FaChevronLeft size={10} className="text-[#1ED696]/70" />
                    </motion.div>
                    <span className="text-xs text-[#8FE7C3]/70 font-light">Tap sides to navigate</span>
                    <motion.div
                        animate={{ x: [2, 0, 2] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                        <FaChevronRight size={10} className="text-[#1ED696]/70" />
                    </motion.div>
                </motion.div>
                
                {/* Improved navigation controls with better spacing */}
                <div className="relative w-full max-w-xs md:max-w-sm lg:max-w-md flex flex-col items-center mt-8">
                    {/* Enhanced Progress Bar with smoother animation */}
                    <div className="w-full h-1.5 bg-[#0F0F0F] rounded-full overflow-hidden mb-6 shadow-inner">
                        <motion.div
                            className="h-full bg-gradient-to-r from-[#1A936F] to-[#1ED696] shadow-[0_0_6px_rgba(30,214,150,0.3)]"
                            initial={{ width: '0%' }}
                            animate={{
                                width: totalProjects > 0
                                    ? `${((currentIndex + 1) / totalProjects) * 100}%`
                                    : '0%'
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 30,
                                mass: 1
                            }}
                        />
                    </div>
                    
                    {/* Side-clickable navigation areas */}
                    <div className="absolute top-[-300px] left-0 right-0 bottom-0 pointer-events-none">
                        <div className="relative w-full h-full">
                            <div 
                                className="absolute left-0 w-1/3 h-full pointer-events-auto cursor-pointer opacity-0"
                                onClick={prevCard}
                            />
                            <div 
                                className="absolute right-0 w-1/3 h-full pointer-events-auto cursor-pointer opacity-0"
                                onClick={nextCard}
                            />
                        </div>
                    </div>
                    
                    {/* Improved Navigation Buttons with better spacing and press feedback */}
                    <div className="w-full flex items-center justify-between gap-6">
                        <ProjectNavButton
                            variant="prev"
                            onClick={prevCard}
                            disabled={totalProjects <= 1}
                        />

                        {/* Project Counter - Improved typography */}
                        <div className="flex-1 text-center">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                transition={{ duration: 0.2 }}
                                className="text-sm text-[#FCFFF0]/80"
                            >
                                <span className="text-[#1ED696] font-semibold">{currentIndex + 1}</span>
                                <span className="mx-1">/</span>
                                <span>{totalProjects}</span>
                            </motion.div>
                        </div>

                        <ProjectNavButton
                            variant="next"
                            onClick={nextCard}
                            disabled={totalProjects <= 1}
                        />
                    </div>
                    
                    {/* Dots Navigation - Hidden */}
                </div>
            </div>
        </div>
    );
}

function ProjectNavButton({ variant, onClick, disabled }) {
   const isPrev = variant === "prev";
   const label = isPrev ? "Prev" : "Next";
   const title = isPrev ? "Previous project" : "Next project";
   const hoverX = isPrev ? -3 : 3;

   return (
       <motion.button
           onClick={onClick}
           className="group flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-[#0F0F0F] border border-[#1A936F]/20 text-[#8FE7C3] hover:bg-[#1A936F]/10 transition-colors min-w-[80px] shadow-md touch-feedback disabled:opacity-50 disabled:cursor-not-allowed"
           whileHover={{ x: hoverX, transition: { duration: 0.2 } }}
           whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
           title={title}
           disabled={disabled}
       >
           {isPrev && (
               <>
                   <FaChevronLeft className="text-xs group-hover:text-[#1ED696]" />
                   <span className="text-sm hidden sm:inline truncate max-w-[50px] font-medium">
                       {label}
                   </span>
               </>
           )}
           {!isPrev && (
               <>
                   <span className="text-sm hidden sm:inline truncate max-w-[50px] font-medium">
                       {label}
                   </span>
                   <FaChevronRight className="text-xs group-hover:text-[#1ED696]" />
               </>
           )}
       </motion.button>
   );
}

function AnimatedCard({ project, position = 0, isActive }) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Card styling based on position
    const cardStyle = useMemo(() => {
        // Only apply position styling for background cards
        if (!isActive) {
            const scale = 1 - position * 0.035;
            const yOffset = -10 * position;
            const zIndex = 10 - position;
            const rotation = position > 0 ? (position % 2 === 0 ? -2 : 2) / (position + 1) : 0;

            return {
                position: "absolute",
                scale,
                y: yOffset,
                zIndex,
                rotate: rotation,
                opacity: 0.95 - position * 0.15,
                top: 0,
                left: 0,
                right: 0,
            };
        }
        
        // Active card
        return {
            position: "relative",
            scale: 1,
            y: 0,
            zIndex: 20,
            rotate: 0,
            opacity: 1,
            top: 0,
            left: 0,
            right: 0,
        };
    }, [position, isActive]);

    return (
        <motion.div
            className="relative rounded-xl overflow-hidden w-full bg-gradient-to-b from-[#04110C] via-[#050A14] to-[#050708] border border-white/5 shadow-[0_10px_28px_rgba(0,0,0,0.55)] group"
            initial={false}
            animate={cardStyle}
            transition={{ type: "spring", stiffness: 230, damping: 24 }}
            whileHover={isActive ? { scale: 1.01 } : {}}
            style={{ pointerEvents: isActive ? "auto" : "none" }}
        >
            {/* Gradient and accent layers */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#1A936F]/22 via-transparent to-[#1ED696]/12" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#1ED696]/80 to-transparent" />
            <div className="relative">
                {/* Card content */}
                <div className="relative aspect-video overflow-hidden">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-102"
                    />
                    {isActive && (
                        <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-250">
                            <div className="flex gap-3.5">
                                <a
                                    href="https://github.com/0asaca0rum0"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 bg-[#1A936F] text-white rounded-full hover:bg-[#1ED696] transition-colors"
                                >
                                    <FaGithub size={18} />
                                </a>
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2.5 bg-[#1A936F] text-white rounded-full hover:bg-[#1ED696] transition-colors"
                                    >
                                        <FaExternalLinkAlt size={18} />
                                    </a>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-3.5 flex flex-col">
                    <div className="flex items-center mb-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#1A936F]/10 text-[10px] uppercase tracking-[0.18em] text-[#8FE7C3]/80">
                            {project.category}
                        </span>
                    </div>
                    <h3 className="text-[13px] md:text-[15px] font-semibold mb-1.5 text-[#FDFCF7] group-hover:text-[#1ED696] tracking-tight transition-colors">
                        {project.title}
                    </h3>
                    <p
                        onClick={() => setIsExpanded((prev) => !prev)}
                        className={`text-xs leading-relaxed text-[#D1FAE5]/80 transition-all duration-300 cursor-pointer ${
                            !isExpanded && "line-clamp-2"
                        }`}
                    >
                        {project.description}
                    </p>
                    <button
                        onClick={() => setIsExpanded((prev) => !prev)}
                        className="self-start mt-1.5 text-[10px] text-[#34D399] hover:underline font-medium"
                    >
                        {isExpanded ? "Show less" : "Read more"}
                    </button>
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {project.techstack.map((tech, i) => (
                            <span
                                key={i}
                                className="bg-[#071B14] border border-[#1A936F]/30 text-[#C4F3DA] text-[9px] px-2.5 py-0.5 rounded-full tracking-wide"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

