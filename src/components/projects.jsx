import { useEffect } from "react";
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Projects() {
    const projects = [
        {
            title: "internship Docs LS2N",
            description: "Documentation of my internship at LS2N laboratory, where I worked on signal processing and embedded systems, with a focus on computer vision applications.",
            image: "docs.png",
            techstack: ['python', "Signal proccessing", "embedded systems", "Computer Vision"],
            link: "https://github.com/0asaca0rum0/writings-ls2n-str",
            category: "AI",
        },
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
            x: direction === "left" ? 100 : -100,
            opacity: 0,
            scale: 0.9,
            zIndex: 10,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            zIndex: 20,
        },
        exit: (direction) => ({
            x: direction === "left" ? -100 : 100,
            opacity: 0,
            scale: 0.9,
            zIndex: 10,
        }),
    };

    return (
        <div className="w-full flex flex-col items-center font-['Comfortaa'] gap-6 sm:gap-8 lg:gap-10 -mt-10">
            <motion.h2
                className="text-xl md:text-2xl lg:text-3xl font-bold text-[#FAF3DD] text-center sm:text-left px-4 drop-shadow-[0_0_10px_rgba(30,214,150,0.5)]"
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
                    className="flex justify-center gap-3 flex-wrap"
                >
                    {/* Evenly distributed category buttons with creative styling */}
                    {categories.map((category) => (
                        <motion.button
                            key={category.value}
                            onClick={() => setActiveCategory(category.value)}
                            className={`relative py-2 px-5 text-center text-sm font-medium transition-all duration-300 rounded-full touch-feedback ${activeCategory === category.value
                                ? 'text-[#0F0F0F] font-bold bg-[#1ED696] shadow-[0_0_20px_rgba(30,214,150,0.4)]'
                                : 'text-[#8FE7C3]/70 hover:text-[#8FE7C3] bg-[#1A936F]/10 border border-[#1A936F]/20'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {category.label}
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            {/* Card Stack with improved spacing and animation */}
            <div className="w-full flex flex-col items-center">
                {/* Card Container with better height based on card content */}
                <div
                    className="relative w-full mx-auto max-w-[300px] md:max-w-[340px] lg:max-w-[380px] h-[340px] md:h-[360px] lg:h-[380px] m-6 perspective-[1000px]"
                >
                    {/* Current active card with smoother slide animations */}
                    <AnimatePresence
                        mode="popLayout"
                        initial={false}
                        custom={slideDirection || "left"}
                    >
                        {hasProjects && (
                            <motion.div
                                key={currentProject?.title ?? currentIndex}
                                className="w-full h-full absolute top-0 left-0"
                                variants={slideVariants}
                                custom={slideDirection || "left"}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    duration: 0.8,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                style={{ zIndex: 20 }}
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
                        if (position === 0 || position >= 4) return null;

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
                    <div className="w-full h-1 bg-[#1A936F]/20 rounded-full overflow-hidden my-6">
                        <motion.div
                            className="h-full bg-[#1ED696] shadow-[0_0_10px_rgba(30,214,150,0.5)]"
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
                    <div className="absolute top-[-350px] left-[-20px] right-[-20px] bottom-0 pointer-events-none">
                        <div className="relative w-full h-full">
                            <div
                                className="absolute left-0 w-1/4 h-full pointer-events-auto cursor-pointer opacity-0"
                                onClick={prevCard}
                            />
                            <div
                                className="absolute right-0 w-1/4 h-full pointer-events-auto cursor-pointer opacity-0"
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
                                className="text-sm text-[#FCFFF0]/80 font-mono"
                            >
                                <span className="text-[#1ED696] font-bold text-lg">{(currentIndex + 1).toString().padStart(2, '0')}</span>
                                <span className="mx-2 text-[#1A936F]">/</span>
                                <span>{totalProjects.toString().padStart(2, '0')}</span>
                            </motion.div>
                        </div>

                        <ProjectNavButton
                            variant="next"
                            onClick={nextCard}
                            disabled={totalProjects <= 1}
                        />
                    </div>
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
            className="group flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#1A936F]/10 border border-[#1A936F]/30 text-[#8FE7C3] hover:bg-[#1A936F]/20 hover:border-[#1ED696]/50 transition-all min-w-[100px] shadow-lg backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ x: hoverX, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
            title={title}
            disabled={disabled}
        >
            {isPrev && (
                <>
                    <FaChevronLeft className="text-xs group-hover:text-[#1ED696]" />
                    <span className="text-sm hidden sm:inline font-medium">
                        {label}
                    </span>
                </>
            )}
            {!isPrev && (
                <>
                    <span className="text-sm hidden sm:inline font-medium">
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

    // Calculate rotation for counter-rotation logic
    const rotation = isActive ? 0 : (position > 0 ? (position % 2 === 0 ? -3 : 3) : 0);

    // Card styling based on position
    const cardStyle = useMemo(() => {
        // Only apply position styling for background cards
        if (!isActive) {
            const scale = 1 - position * 0.05;
            const yOffset = -15 * position;
            const zIndex = 10 - position;

            return {
                position: "absolute",
                scale,
                y: yOffset,
                zIndex,
                rotate: rotation,
                opacity: 0.6 - position * 0.15,
                filter: `blur(${position * 2}px)`,
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
            filter: "blur(0px)",
            top: 0,
            left: 0,
            right: 0,
        };
    }, [position, isActive, rotation]);

    return (
        <motion.div
            className="relative rounded-2xl overflow-hidden w-full bg-[#0a0a0a] border border-[#1A936F]/30 shadow-[0_20px_50px_rgba(0,0,0,0.7)] group "
            initial={false}
            animate={cardStyle}
            transition={{ type: "spring", stiffness: 230, damping: 24 }}
            whileHover={isActive ? { scale: 1.02, rotate: 0 } : {}}
            style={{ pointerEvents: isActive ? "auto" : "none" }}
        >
            {/* Glass effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-10" />

            <div className="relative z-0">
                {/* Card content */}
                <div className="relative aspect-video overflow-hidden">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {isActive && (
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 backdrop-blur-[2px]">
                            <div className="flex gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <a
                                    href="https://github.com/0asaca0rum0"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-[#1A936F] text-white rounded-full hover:bg-[#1ED696] hover:scale-110 transition-all shadow-lg"
                                >
                                    <FaGithub size={20} />
                                </a>
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 bg-white text-[#0a0a0a] rounded-full hover:bg-[#FAF3DD] hover:scale-110 transition-all shadow-lg"
                                    >
                                        <FaExternalLinkAlt size={20} />
                                    </a>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <motion.div
                    className="p-5 flex flex-col bg-[#0F0F0F]/90 backdrop-blur-md"
                    animate={{ rotate: -rotation }}
                    transition={{ type: "spring", stiffness: 230, damping: 24 }}
                >
                    <div className="flex items-center justify-between mb-2">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#1A936F]/20 text-[10px] uppercase tracking-wider font-bold text-[#1ED696]">
                            {project.category}
                        </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-[#FDFCF7] group-hover:text-[#1ED696] transition-colors">
                        {project.title}
                    </h3>
                    <p
                        onClick={() => setIsExpanded((prev) => !prev)}
                        className={`text-sm leading-relaxed text-[#A0A0A0] transition-all duration-300 cursor-pointer ${!isExpanded && "line-clamp-2"
                            }`}
                    >
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4">
                        {project.techstack.map((tech, i) => (
                            <span
                                key={i}
                                className="bg-black/40 border border-[#1A936F]/20 text-[#C4F3DA] text-[10px] px-3 py-1 rounded-full"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

