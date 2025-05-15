import { useEffect } from "react";
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";

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
        { label: "Desktop", value: "Desktop App" },
        { label: "AI", value: "AI" },
    ];

    const [activeCategory, setActiveCategory] = useState("all");
    const [currentIndex, setCurrentIndex] = useState(0);

    // Filter projects based on active category
    const filteredProjects = activeCategory === "all" 
        ? projects 
        : projects.filter(project => project.category === activeCategory);

    // Handle navigation through cards
    const nextCard = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === filteredProjects.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevCard = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? filteredProjects.length - 1 : prevIndex - 1
        );
    };

    // When category changes, reset to first card
    useEffect(() => {
        setCurrentIndex(0);
    }, [activeCategory]);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center font-['Comfortaa'] py-6">
            <motion.h2 
                className="text-lg md:text-xl lg:text-2xl font-bold mb-4 text-[#FAF3DD]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Projects
            </motion.h2>

            {/* Category Filter - Better positioning and sizing */}
            <motion.div 
                className="w-full max-w-xs md:max-w-sm lg:max-w-md px-4 mb-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >                
                {/* Filter Pills Container - Improved styling */}
                <div className="relative overflow-hidden rounded-lg p-1 bg-[#111111] border border-[#1A936F]/20 backdrop-blur-md shadow-inner">
                    {/* Active Background Pill */}
                    <motion.div 
                        className="absolute h-7 bg-gradient-to-r from-[#114E3C] to-[#1A936F] rounded-md shadow-md"
                        layoutId="filterBackground"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        style={{
                            width: `calc(${100 / categories.length}% - 2px)`,
                            x: `calc(${categories.findIndex(c => c.value === activeCategory) * 100}% + ${categories.findIndex(c => c.value === activeCategory) * 2}px)`
                        }}
                    />
                    
                    {/* Filter Buttons - Better spacing */}
                    <div className="relative flex justify-between z-10">
                        {categories.map((category) => {
                            const isActive = activeCategory === category.value;
                            
                            return (
                                <motion.button
                                    key={category.value}
                                    onClick={() => setActiveCategory(category.value)}
                                    className={`relative flex-1 py-1.5 px-0.5 text-center text-xs font-medium transition-all duration-300 ${
                                        isActive ? "text-[#FCFFF0]" : "text-[#FCFFF0]/60 hover:text-[#FCFFF0]/90"
                                    }`}
                                    whileHover={{ y: -1 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    {category.label}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
                
                {/* Stats Indicator - More subtle */}
                <div className="flex justify-center mt-2 text-[10px] text-[#FCFFF0]/50">
                    <span>
                        Showing <span className="text-[#1ED696] font-medium">{filteredProjects.length}</span> of {projects.length} projects
                    </span>
                </div>
            </motion.div>

            {/* Card Stack - Centered and better positioned */}
            <div className="w-full flex flex-col items-center">
                {/* Card Stack Container - Better centered */}
                <div className="relative w-full mx-auto max-w-[280px] md:max-w-[310px] lg:max-w-[330px] h-[300px] md:h-[330px] lg:h-[350px]">
                    {filteredProjects.map((project, idx) => {
                        // Calculate position in stack relative to current card
                        const position = (idx - currentIndex + filteredProjects.length) % filteredProjects.length;
                        // Only render visible cards (current + 4 behind)
                        const isVisible = position < 5;
                        
                        return isVisible && (
                            <AnimatedCard
                                key={`${project.title}-${idx}`}
                                project={project}
                                position={position}
                                isActive={position === 0}
                            />
                        );
                    })}
                </div>
                
                {/* Navigation Controls - Better positioning and spacing */}
                <div className="relative w-full max-w-xs md:max-w-sm lg:max-w-md flex flex-col items-center mt-5">
                    {/* Progress Bar - More subtle */}
                    <div className="w-full h-0.5 bg-[#111111] rounded-full overflow-hidden mb-3">
                        <motion.div 
                            className="h-full bg-gradient-to-r from-[#1A936F] to-[#1ED696]"
                            initial={{ width: '0%' }}
                            animate={{ 
                                width: filteredProjects.length > 1 
                                    ? `${(currentIndex / (filteredProjects.length - 1)) * 100}%` 
                                    : '100%'
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    </div>
                    
                    {/* Navigation Buttons - Better alignment */}
                    <div className="w-full flex items-center justify-between gap-2">
                        {/* Previous Button */}
                        <motion.button 
                            onClick={prevCard}
                            className="group flex items-center gap-1 py-1.5 px-2.5 rounded-md bg-[#111111] border border-[#1A936F]/20 text-[#8FE7C3]/90 hover:bg-[#1A936F]/10 transition-colors"
                            whileTap={{ scale: 0.95 }}
                            title="Previous project"
                            disabled={filteredProjects.length <= 1}
                        >
                            <FaChevronLeft className="text-xs" />
                            <span className="text-[9px] hidden sm:inline truncate max-w-[40px]">
                                {filteredProjects[(currentIndex - 1 + filteredProjects.length) % filteredProjects.length]?.title?.split(" ")[0]}
                            </span>
                        </motion.button>
                        
                        {/* Project Counter - Centered better */}
                        <div className="flex-1 text-center">
                            <motion.div 
                                key={currentIndex}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                transition={{ duration: 0.2 }}
                                className="text-[11px] text-[#FCFFF0]/70"
                            >
                                <span className="text-[#1ED696] font-medium">{currentIndex + 1}</span>
                                <span className="mx-0.5">/</span>
                                <span>{filteredProjects.length}</span>
                                <span className="hidden sm:inline ml-1 text-[#FCFFF0]/40">•</span>
                                <span className="hidden sm:inline ml-1 font-medium text-[#FCFFF0]/80 text-[10px]">
                                    {filteredProjects[currentIndex]?.category}
                                </span>
                            </motion.div>
                        </div>
                        
                        {/* Next Button */}
                        <motion.button 
                            onClick={nextCard}
                            className="group flex items-center gap-1 py-1.5 px-2.5 rounded-md bg-[#111111] border border-[#1A936F]/20 text-[#8FE7C3]/90 hover:bg-[#1A936F]/10 transition-colors"
                            whileTap={{ scale: 0.95 }}
                            title="Next project"
                            disabled={filteredProjects.length <= 1}
                        >
                            <span className="text-[9px] hidden sm:inline truncate max-w-[40px]">
                                {filteredProjects[(currentIndex + 1) % filteredProjects.length]?.title?.split(" ")[0]}
                            </span>
                            <FaChevronRight className="text-xs" />
                        </motion.button>
                    </div>
                    
                    {/* Dots Navigation - Only show if we have a reasonable number */}
                    {filteredProjects.length <= 8 && filteredProjects.length > 1 && (
                        <div className="flex justify-center gap-1 mt-3">
                            {filteredProjects.map((_, idx) => (
                                <SmartNavDot 
                                    key={idx} 
                                    isActive={idx === currentIndex}
                                    onClick={() => setCurrentIndex(idx)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Smart Navigation Dot Component - Slightly larger
const SmartNavDot = ({ isActive, onClick }) => (
    <motion.button
        onClick={onClick}
        className={`rounded-full transition-all ${
            isActive 
                ? "bg-[#1ED696] w-2.5 h-2.5" 
                : "bg-[#1A936F]/30 w-2 h-2 hover:bg-[#1A936F]/60"
        }`}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        initial={false}
        animate={isActive ? { 
            scale: [1, 1.2, 1],
            transition: { duration: 0.6, repeat: 0 }
        } : {}}
    />
);

function AnimatedCard({ project, position, isActive }) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Refined card positioning logic - Adjusted for larger cards
    const cardStyle = useMemo(() => {
        // Smoother, more subtle positioning
        const scale = 1 - position * 0.035;
        const yOffset = -10 * position;
        const zIndex = 10 - position;
        // Less extreme rotation for cleaner appearance
        const rotation = position > 0 ? (position % 2 === 0 ? -2 : 2) / (position + 1) : 0;

        return {
            position: "absolute",
            scale,
            y: yOffset,
            zIndex,
            rotate: rotation,
            opacity: position === 0 ? 1 : 0.95 - position * 0.15,
            top: 0,
            left: 0,
            right: 0,
        };
    }, [position]);

    return (
        <motion.div
            className="bg-[#131313] border border-[#1A936F]/30 rounded-lg overflow-hidden w-full shadow-lg group"
            initial={{ opacity: 0, y: 50 }}
            animate={cardStyle}
            transition={{ type: "spring", stiffness: 200, damping: 20, duration: 0.4 }}
            whileHover={isActive ? { scale: 1.02, y: -4 } : {}}
        >
            {/* Card content */}
            <div className="relative aspect-video overflow-hidden">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {isActive && (
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
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
                <h3 className="text-sm md:text-base font-bold mb-1.5 text-[#FAF3DD] group-hover:text-[#1ED696] transition-colors">
                    {project.title}
                </h3>
                <p
                    onClick={() => setIsExpanded((prev) => !prev)}
                    className={`text-xs leading-relaxed text-[#FCFFF0]/80 transition-all duration-300 cursor-pointer ${
                        !isExpanded && "line-clamp-2"
                    }`}
                >
                    {project.description}
                </p>
                <button
                    onClick={() => setIsExpanded((prev) => !prev)}
                    className="self-start mt-1.5 text-[10px] text-[#1ED696] hover:underline font-medium"
                >
                    {isExpanded ? "Show less" : "Read more"}
                </button>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {project.techstack.map((tech, i) => (
                        <span
                            key={i}
                            className="bg-[#1A936F]/10 text-[#8FE7C3] text-[9px] px-2 py-0.5 rounded-full"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

