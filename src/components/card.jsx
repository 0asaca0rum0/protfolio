import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaReact, FaNodeJs, FaServer, FaLinux, FaHeart, FaJava, FaPython } from 'react-icons/fa';
import { TbBrandNextjs, TbBrandMysql, TbBrandReactNative } from 'react-icons/tb';
import { SiTailwindcss, SiNginx, SiMongodb, SiExpo, SiOpenai } from 'react-icons/si';
import { BiMailSend } from "react-icons/bi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Button } from "@material-tailwind/react";
import { BsStar } from "react-icons/bs";
import { CiLink } from "react-icons/ci";
import { GoZoomIn } from "react-icons/go";

// Tech icons mapping - moved outside component for better performance
const techList = {
    'React ': <FaReact size={30} />,
    'Next 13 ': <TbBrandNextjs size={30} />, // Corrected from Next 15 to Next 13
    'Tailwind CSS ': <SiTailwindcss size={30} />,
    'Node.js': <FaNodeJs size={30} />,
    'Express ': <FaServer size={30} />,
    'MySQL ': <TbBrandMysql size={30} />,
    'Nginx ': <SiNginx size={30} />,
    'Linux ': <FaLinux size={30} />,
    'MongoDB ': <SiMongodb size={30} />,
    'React Native ': <TbBrandReactNative size={30} />,
    'Expo': <SiExpo size={30} />,
    'Java': <FaJava size={30} />,
    'Python': <FaPython size={30} />,
    'AI': <SiOpenai size={30} />
};

const Card = memo(({ project }) => {
    const [open, setOpen] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const handleModalToggle = () => setOpen(!open);
    const handleLikeToggle = () => setIsLiked(!isLiked);
    
    return (
        <div className="group min-w-80 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-[550px] md:h-[450px] lg:h-[500px] rounded-xl shadow-lg overflow-hidden relative hover:bg-black/20 transition-all">
            <img
                alt="Website Project"
                className="object-cover object-center w-full h-full absolute inset-0"
                loading='lazy'
                src={project.image}
            />

            {/* Glass overlay layer */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#020405]/80 via-[#020908]/45 to-[#050708]/75 backdrop-blur-[10px] transition-all duration-500">
                <button
                    onClick={handleModalToggle}
                    className="absolute top-3 right-3 bg-black/35 hover:bg-black/65 border border-white/20 backdrop-blur-md rounded-full p-2.5 transition-all duration-300 shadow-[0_0_16px_rgba(0,0,0,0.6)]"
                    aria-label="Zoom image"
                >
                    <GoZoomIn size={22} className='text-[#E5FFF5]' />
                </button>

                {/* Glass info panel */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-[#020405]/96 via-[#020b08]/86 to-transparent border-t border-[#1ED696]/20 backdrop-blur-[18px] text-white transition-all duration-500 ease-in group-hover:max-h-full max-h-[18%] md:max-h-[22%] overflow-hidden">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-lg text-white font-semibold drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
                            {project.title}
                        </span>
                        <button
                            onClick={handleLikeToggle}
                            className="transition-transform duration-300 hover:scale-110"
                            aria-label={isLiked ? "Unlike project" : "Like project"}
                        >
                            <FaHeart className={`${isLiked ? 'text-red-500' : 'text-gray-300'}`} size={24} />
                        </button>
                    </div>
                    
                    <div className="flex items-center mb-3 text-yellow-400/90">
                        <BsStar className="w-5 h-5" />
                        <span className="ml-2 text-lg font-semibold">5.0</span>
                    </div>
                    
                    <p className="text-sm mb-4 text-gray-100/90 transition-all duration-300">
                        {project.description}
                    </p>
                    
                    {project.techstack && project.techstack.length > 0 && (
                        <div className="flex flex-wrap w-full items-center gap-1 mb-4 p-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                            {project.techstack.map((tech, index) => (
                                techList[tech] && (
                                    <Button
                                        key={index}
                                        className="bg-white/10 hover:bg-white/20 text-white/90 backdrop-blur rounded-full p-2 m-1 transition-all duration-300 border border-white/15"
                                        aria-label={`Technology: ${tech}`}
                                    >
                                        {techList[tech]}
                                    </Button>
                                )
                            ))}
                        </div>
                    )}
                    
                    <div className='flex gap-3'>
                        <Button
                            className="flex-1 py-2 px-4 text-sm font-medium flex items-center justify-center gap-2 bg-[#1ED696]/90 hover:bg-[#1ED696] text-[#020405] rounded-full transition-all duration-300 shadow-[0_0_18px_rgba(30,214,150,0.45)]"
                            onClick={() => window.open("https://mail.google.com/mail/u/0/#inbox?compose=new", "_blank")}
                        >
                            Request <BiMailSend size={18} />
                        </Button>
                        
                        <Button
                            className={`flex-1 py-2 px-4 text-sm font-medium flex items-center justify-center gap-2 rounded-full transition-all duration-300 ${
                                project.link
                                    ? "bg-[#0EA5E9]/90 hover:bg-[#0284C7] text-white shadow-[0_0_16px_rgba(14,165,233,0.45)]"
                                    : "bg-gray-600/80 text-gray-200 cursor-not-allowed"
                            }`}
                            disabled={!project.link}
                            onClick={() => project.link && window.open(project.link, "_blank")}
                        >
                            View <CiLink size={18} />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Custom Modal Implementation */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-filter backdrop-blur-sm p-4"
                        onClick={handleModalToggle}
                    >
                        <motion.div 
                            className="relative max-w-5xl max-h-[90vh] overflow-hidden"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="absolute top-4 right-4 bg-red-500/80 hover:bg-red-500 p-2 rounded-full z-10 transition-all"
                                onClick={handleModalToggle}
                                aria-label="Close modal"
                            >
                                <IoCloseCircleOutline size={28} className="text-white" />
                            </button>
                            
                            <motion.img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-contain md:object-cover md:max-h-[80vh]"
                                loading="lazy"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
});

export default Card;
