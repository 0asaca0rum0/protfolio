import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaServer, FaLinux, FaArrowUp, FaPython } from 'react-icons/fa';
import { TbBrandNextjs, TbBrandMysql } from 'react-icons/tb';
import { SiTailwindcss, SiNginx, SiOpenai, SiNvidia } from 'react-icons/si';
import { BiLogoGoLang } from "react-icons/bi";

const techList = [
	{
		name: "React",
		icon: FaReact,
		color: "#00D8FF",
		level: 80, // Updated to 80
	},
	{
		name: "Next.js",
		icon: TbBrandNextjs,
		color: "#FFFFFF",
		level: 85,
	},
	{
		name: "Tailwind CSS",
		icon: SiTailwindcss,
		color: "#06B6D4",
		level: 95,
	},
	{
		name: "Node.js",
		icon: FaNodeJs,
		color: "#8CC84B",
		level: 88,
	},
	{
		name: "Express",
		icon: FaServer,
		color: "#CCCCCC",
		level: 85,
	},
	{
		name: "MySQL",
		icon: TbBrandMysql,
		color: "#F29111",
		level: 80,
	},
	{
		name: "Nginx",
		icon: SiNginx,
		color: "#00FF00",
		level: 75,
	},
	{
		name: "Linux",
		icon: FaLinux,
		color: "#FCC624",
		level: 70, // Updated to 70
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
		customColor: "#FFDD00", // Custom yellow color for Go level indicator
	},
	{
		name: "NLP (Learning)",
		icon: SiOpenai,
		color: "#10A37F",
		level: 30,
		learning: true,
	},
	{
		name: "Image Processing (Learning)",
		icon: SiNvidia,
		color: "#76B900",
		level: 25,
		learning: true,
	},
];

// Extracted Tech Card component for cleaner code
const TechCard = ({ tech }) => (
    <motion.div
        className="group relative bg-[#131313] border border-[#1A936F]/20 rounded-xl p-6 flex flex-col 
            items-center justify-center transition-all duration-300 overflow-hidden hover:border-[#1ED696]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.3 }}
        whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(30, 214, 150, 0.2)" }}
    >
        <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300"
            style={{ color: tech.color }}>
            <tech.icon size={60} />
        </div>
        
        <div className="text-xl font-bold text-[#FAF3DD] group-hover:text-[#1ED696] transition-colors duration-300 text-center">
            {tech.name}
        </div>
        
        {/* Skill level indicator */}
        <div className="mt-3 w-full">
            <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-[#8FE7C3]">
                    {tech.learning ? "Learning Progress" : "Proficiency"}
                </span>
                <span className="text-xs text-[#8FE7C3]">{tech.level}%</span>
            </div>
            <div className="w-full bg-[#1A936F]/10 rounded-full h-2">
                <motion.div 
                    className={`${tech.customColor ? '' : 'bg-gradient-to-r from-[#1ED696] to-[#8FE7C3]'} h-2 rounded-full`}
                    style={tech.customColor ? { backgroundColor: tech.customColor } : {}}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.level}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                />
            </div>
            {tech.learning && (
                <span className="text-xs text-[#F29111] mt-1 block italic">
                    Currently learning
                </span>
            )}
        </div>
        
        {/* Background gradient effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A936F]/5 to-[#1ED696]/10 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl -z-10"></div>
    </motion.div>
);

const TechGrid = () => {
    return (
        <div className="w-full py-8">
            {/* Section Title */}
            <motion.div 
                className="mb-12 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                <h2 className="text-2xl md:text-3xl font-bold text-[#FAF3DD] mb-3">
                    Technologies I've Mastered
                </h2>
                <p className="text-[#8FE7C3] text-sm md:text-base max-w-xl mx-auto">
                    These are the technologies I specialize in and use regularly in my projects
                </p>
            </motion.div>

            {/* Tech Grid */}
            <div className="w-full max-w-7xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mx-auto">
                {techList.map((tech, index) => (
                    <TechCard key={index} tech={tech} />
                ))}
            </div>
        </div>
    );
};

export default TechGrid;
