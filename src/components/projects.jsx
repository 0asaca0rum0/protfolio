import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
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
        <div className="w-full py-2 md:py-3 flex flex-col items-center justify-center">
            <motion.h2 
                className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-3 text-[#FAF3DD]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Projects
            </motion.h2>

            {/* Category Filter */}
            <motion.div 
                className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-6 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {categories.map((category) => (
                    <button
                        key={category.value}
                        onClick={() => setActiveCategory(category.value)}
                        className={`px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-sm rounded-full font-medium transition-all ${
                            activeCategory === category.value 
                                ? "bg-[#1A936F] text-[#FCFFF0]" 
                                : "bg-[#131313] text-[#FCFFF0]/70 border border-[#1A936F]/20 hover:border-[#1A936F]/50"
                        }`}
                    >
                        {category.label}
                    </button>
                ))}
            </motion.div>

            {/* Improved Stacked Card Display with Navigation */}
            <div className="w-full flex flex-col items-center mt-2 md:mt-4">
                {/* Card Stack Container */}
                <div className="relative w-full max-w-xs md:max-w-sm lg:max-w-md h-[350px] md:h-[400px] lg:h-[450px] mb-2 md:mb-4">
                    {filteredProjects.map((project, idx) => {
                        // Calculate position in stack relative to current card
                        const position = (idx - currentIndex + filteredProjects.length) % filteredProjects.length;
                        // Only render visible cards (current + 3 behind)
                        const isVisible = position < 4;
                        
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
                
                {/* Navigation Controls - More compact for mobile */}
                <div className="flex justify-center mt-1 gap-4 md:gap-6">
                    <button 
                        onClick={prevCard}
                        className="p-2 md:p-3 rounded-full bg-[#1A936F]/20 hover:bg-[#1A936F] text-[#8FE7C3] hover:text-[#FCFFF0] transition-colors"
                    >
                        <FaChevronLeft className="text-sm md:text-base" />
                    </button>
                    <div className="flex gap-1 md:gap-2 items-center">
                        {filteredProjects.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-1.5 md:w-2 h-1.5 md:h-2 rounded-full transition-all ${
                                    idx === currentIndex 
                                    ? "bg-[#1ED696] w-3 md:w-4" 
                                    : "bg-[#1A936F]/40"
                                }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                    <button 
                        onClick={nextCard}
                        className="p-2 md:p-3 rounded-full bg-[#1A936F]/20 hover:bg-[#1A936F] text-[#8FE7C3] hover:text-[#FCFFF0] transition-colors"
                    >
                        <FaChevronRight className="text-sm md:text-base" />
                    </button>
                </div>
            </div>
        </div>
    );
}

function AnimatedCard({ project, position, isActive }) {
    // Different styles based on position in stack
    const getCardStyles = () => {
        const baseScale = 1 - (position * 0.05); // Decrease size for cards deeper in stack
        const yOffset = position * -15; // Stack cards with slight vertical offset
        const zIndex = 10 - position; // Higher z-index for top cards
        
        // Alternate rotation for stacked effect
        let rotation = 0;
        if (position > 0) {
            rotation = position % 2 === 0 ? -5 : 5;
            rotation = rotation / (position + 1); // Reduce rotation for deeper cards
        }

        return {
            position: "absolute",
            scale: baseScale,
            zIndex: zIndex,
            y: yOffset,
            rotate: rotation,
            opacity: position === 0 ? 1 : 0.9 - (position * 0.2),
            top: 0,
            left: 0,
            right: 0,
        };
    };

    return (
        <motion.div
            className="bg-[#131313] border border-[#1A936F]/30 rounded-xl overflow-hidden w-full shadow-lg group"
            initial={{ opacity: 0, y: 50 }}
            animate={getCardStyles()}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                duration: 0.4
            }}
            whileHover={isActive ? { scale: 1.02, y: -5 } : {}}
        >
            {/* Project Image - Adjusted for better fit */}
            <div className="relative aspect-video overflow-hidden">
                <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {isActive && (
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                        <div className="flex gap-4">
                            <a 
                                href="https://github.com/0asaca0rum0" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="p-3 bg-[#1A936F] text-white rounded-full hover:bg-[#1ED696] transition-colors"
                            >
                                <FaGithub size={20} />
                            </a>
                            {project.link && (
                                <a 
                                    href={project.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="p-3 bg-[#1A936F] text-white rounded-full hover:bg-[#1ED696] transition-colors"
                                >
                                    <FaExternalLinkAlt size={20} />
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </div>
            
            {/* Project Content - More compact for better fit */}
            <div className="p-3 md:p-4">
                <h3 className="text-sm md:text-base lg:text-lg font-bold mb-1 md:mb-2 text-[#FAF3DD] group-hover:text-[#1ED696] transition-colors">
                    {project.title}
                </h3>
                
                <p className="text-xs md:text-sm text-[#FCFFF0]/70 mb-2 md:mb-3 line-clamp-2 group-hover:opacity-30 transition-opacity duration-300">
                    {project.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mt-auto">
                    {project.techstack.map((tech, i) => (
                        <span 
                            key={i} 
                            className="bg-[#1A936F]/10 text-[#8FE7C3] text-[8px] md:text-xs px-1.5 py-0.5 rounded-full group-hover:bg-opacity-30 transition-all duration-300"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
