import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaServer, FaLinux, FaPython } from 'react-icons/fa';
import { TbBrandNextjs, TbBrandMysql } from 'react-icons/tb';
import { SiTailwindcss, SiNginx, SiOpenai, SiNvidia } from 'react-icons/si';
import { BiLogoGoLang } from "react-icons/bi";

// Enhanced tech list with proficiency levels
const techList = [
    {
        name: 'React',
        icon: FaReact,
        lightColor: '#61DAFB',
        darkColor: '#00D8FF',
        level: 90,
    },
    {
        name: 'Next.js',
        icon: TbBrandNextjs,
        lightColor: '#000000',
        darkColor: '#FFFFFF',
        level: 85,
    },
    {
        name: 'Tailwind CSS',
        icon: SiTailwindcss,
        lightColor: '#38BDF8',
        darkColor: '#06B6D4',
        level: 95,
    },
    {
        name: 'Node.js',
        icon: FaNodeJs,
        lightColor: '#68A063',
        darkColor: '#8CC84B',
        level: 80,
    },
    {
        name: 'Express',
        icon: FaServer,
        lightColor: '#808080',
        darkColor: '#CCCCCC',
        level: 75,
    },
    {
        name: 'MySQL',
        icon: TbBrandMysql,
        lightColor: '#00758F',
        darkColor: '#F29111',
        level: 70,
    },
    {
        name: 'Nginx',
        icon: SiNginx,
        lightColor: '#009639',
        darkColor: '#00FF00',
        level: 65,
    },
    {
        name: 'Linux',
        icon: FaLinux,
        lightColor: '#FCC624',
        darkColor: '#FFFFFF',
        level: 85,
    },
    {
        name: 'Python',
        icon: FaPython,
        lightColor: '#3776AB',
        darkColor: '#3776AB',
        level: 80,
    },
    {
        name: 'Go',
        icon: BiLogoGoLang,
        lightColor: '#00ADD8',
        darkColor: '#00ADD8',
        level: 40,
        customColor: '#FFDD00',
    },
    {
        name: 'NLP (Learning)',
        icon: SiOpenai,
        lightColor: '#10A37F',
        darkColor: '#10A37F',
        level: 30,
        learning: true,
    },
    {
        name: 'Image Processing (Learning)',
        icon: SiNvidia,
        lightColor: '#76B900',
        darkColor: '#76B900',
        level: 25,
        learning: true,
    }
];

// Tech Card Component for consistency with other card elements
const TechCard = ({ tech, isDarkMode }) => {
    const iconRef = useRef(null);
    
    return (
        <motion.div
            className={`group relative bg-[#131313] border border-[#1A936F]/20 rounded-lg p-3 flex flex-col 
                items-center justify-center transition-all duration-300 overflow-hidden hover:border-[#1ED696]`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ y: -3, boxShadow: "0 8px 20px rgba(30, 214, 150, 0.2)" }}
        >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300"
                style={{ color: isDarkMode ? tech.darkColor : tech.lightColor }}>
                <tech.icon size={45} />
            </div>
            
            <div className="text-base font-semibold tracking-tight text-[#FAF3DD] group-hover:text-[#1ED696] transition-colors duration-300 text-center leading-tight">
                {tech.name}
            </div>
            
            {/* Skill level indicator */}
            <div className="mt-2 w-full">
                <div className="flex justify-between items-center mb-0.5 text-[10px]">
                    <span className="text-[#8FE7C3]">
                        {tech.learning ? "Learning Progress" : "Proficiency"}
                    </span>
                    <span className="text-[#8FE7C3]">{tech.level}%</span>
                </div>
                <div className="w-full bg-[#1A936F]/10 rounded-full h-1">
                    <motion.div 
                        className={`${tech.customColor ? '' : 'bg-gradient-to-r from-[#1ED696] to-[#8FE7C3]'} h-1 rounded-full`}
                        style={tech.customColor ? { backgroundColor: tech.customColor } : {}}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${tech.level}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                    />
                </div>
                {tech.learning && (
                    <span className="text-[10px] text-[#F29111] mt-0.5 block italic">
                        Currently learning
                    </span>
                )}
            </div>
            
            {/* Background gradient effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1A936F]/5 to-[#1ED696]/10 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl -z-10"></div>
        </motion.div>
    );
};

const TechGrid = () => {
    const checkDarkMode = () => {
        const bgColor = window.getComputedStyle(document.documentElement).getPropertyValue('color');
        return bgColor === 'rgb(51, 51, 51)';
    };

    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDarkMode(!checkDarkMode());
        });

        observer.observe(document.documentElement, { attributes: true });
        return () => observer.disconnect();
    }, []);

    return (
        <div id='tech' className="w-full py-5 font-['Comfortaa']">
            {/* Section Title - Styled consistently with other components */}
            <motion.div 
                className="mb-8 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                <h2 className="text-xl md:text-2xl font-bold text-[#FAF3DD] mb-2">
                    Technologies I've Mastered
                </h2>
                <p className="text-[#8FE7C3] text-sm max-w-lg mx-auto">
                    These are the technologies I specialize in and use regularly in my projects
                </p>
            </motion.div>

            {/* Tech Grid - Consistent grid layout with other components */}
            <div className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-auto">
                {techList.map((tech, index) => (
                    <TechCard key={index} tech={tech} isDarkMode={isDarkMode} />
                ))}
            </div>
        </div>
    );
};

export default TechGrid;
