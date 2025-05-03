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
        <div className="group min-w-80 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-[550px] md:h-[450px] lg:h-[500px] rounded-xl shadow-lg overflow-hidden relative hover:bg-black hover:bg-opacity-15 transition-all">
            <img
                alt="Website Project"
                className="object-cover object-center w-full h-full absolute inset-0"
                loading='lazy'
                src={project.image}
            />

            <div className="absolute inset-0 bg-black bg-opacity-10">
                <button 
                    onClick={handleModalToggle} 
                    className="absolute top-2 right-2 bg-white/20 hover:bg-white/80 backdrop-blur-sm rounded-full p-2 transition-all duration-300"
                    aria-label="Zoom image"
                >
                    <GoZoomIn size={24} className='text-black/70' />
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 via-black/60 to-black/10 backdrop-filter backdrop-blur-md text-white transition-all duration-500 ease-in group-hover:max-h-full max-h-[16%] md:max-h-[20%] overflow-hidden">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-lg text-white font-semibold">{project.title}</span>
                        <button 
                            onClick={handleLikeToggle} 
                            className="transition-transform duration-300 hover:scale-110"
                            aria-label={isLiked ? "Unlike project" : "Like project"}
                        >
                            <FaHeart className={`${isLiked ? 'text-red-500' : 'text-gray-300'}`} size={24} />
                        </button>
                    </div>
                    
                    <div className="flex items-center mb-3 text-yellow-400">
                        <BsStar className="w-5 h-5" />
                        <span className="ml-2 text-lg font-semibold">5.0</span>
                    </div>
                    
                    <p className="text-sm mb-4 text-gray-200 transition-all duration-300">
                        {project.description}
                    </p>
                    
                    {project.techstack && project.techstack.length > 0 && (
                        <div className="flex flex-wrap w-full items-center gap-1 mb-4 p-2">
                            {project.techstack.map((tech, index) => (
                                techList[tech] && (
                                    <Button 
                                        key={index} 
                                        className="bg-white/10 backdrop-blur rounded-full p-2 m-1 transition-all duration-300 hover:bg-white/20"
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
                            className="flex-1 py-2 px-4 text-sm font-medium flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 rounded-full transition-all duration-300"
                            onClick={() => window.open("https://mail.google.com/mail/u/0/#inbox?compose=new", "_blank")}
                        >
                            Request <BiMailSend size={18} />
                        </Button>
                        
                        <Button 
                            className={`flex-1 py-2 px-4 text-sm font-medium flex items-center justify-center gap-2 ${project.link ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-500"} rounded-full transition-all duration-300`}
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
