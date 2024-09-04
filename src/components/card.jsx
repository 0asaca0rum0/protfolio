import React, { useState, useEffect } from 'react';
import { FaReact, FaNodeJs, FaServer, FaLinux } from 'react-icons/fa';
import { TbBrandNextjs, TbBrandMysql, TbBrandReactNative } from 'react-icons/tb';
import { SiTailwindcss, SiNginx, SiMongodb, SiExpo } from 'react-icons/si';
import { BiMailSend, BiHeart } from "react-icons/bi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Button } from "@material-tailwind/react";
import { BsStar } from "react-icons/bs";
import { CiLink } from "react-icons/ci";
import { Modal } from 'react-responsive-modal';
import { SiOpenai } from "react-icons/si";
import { GoZoomIn } from "react-icons/go";
import 'react-responsive-modal/styles.css';
import { FaJava, FaPython } from 'react-icons/fa6';
import { FaHeart } from "react-icons/fa6";

const techList = [
    { name: 'React ', icon: <FaReact size={30} /> },
    { name: 'Next 13 ', icon: <TbBrandNextjs size={30} /> },
    { name: 'Tailwind CSS ', icon: <SiTailwindcss size={30} /> },
    { name: 'Node.js', icon: <FaNodeJs size={30} /> },
    { name: 'Express ', icon: <FaServer size={30} /> },
    { name: 'MySQL ', icon: <TbBrandMysql size={30} /> },
    { name: 'Nginx ', icon: <SiNginx size={30} /> },
    { name: 'Linux ', icon: <FaLinux size={30} /> },
    { name: 'MongoDB ', icon: <SiMongodb size={30} /> },
    { name: 'React Native ', icon: <TbBrandReactNative size={30} /> },
    { name: 'Expo', icon: <SiExpo size={30} /> },
    { name: 'Java', icon: <FaJava size={30} /> },
    { name: 'Python', icon: <FaPython size={30} /> },
    { name: 'AI', icon: <SiOpenai size={30} /> },
];

export default function Card({ project }) {
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const [isclicked , setIsclicked] = useState(false);

    return (
        <div className="group min-w-80 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-[550px] md:h-[450px] lg:h-[500px] rounded-xl shadow-lg overflow-hidden relative hover:bg-black hover:bg-opacity-15 transition-all">
            <img
                alt="Website Project"
                className="object-cover object-center w-full h-full absolute inset-0"
                loading='lazy'
                src={project.image}
            />

            <div className="absolute inset-0 bg-black bg-opacity-10">
                <button onClick={onOpenModal} className="absolute top-2 right-2 bg-white/20 hover:bg-white/80 backdrop-blur-sm rounded-full p-2 transition-all duration-300">
                    <GoZoomIn size={24} className='text-black/70' />
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 via-black/60 to-black/10 bg-opacity-5 backdrop-filter backdrop-blur-md text-white delay-75 transition-all duration-500 ease-in group-hover:max-h-full max-h-[16%] md:max-h-[20%] overflow-hidden">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-lg text-white font-semibold">{project.title}</span>
                        <button onClick={() => setIsclicked(!isclicked)} className="transition-transform duration-300 hover:scale-110">
                            <FaHeart className={`${isclicked ? 'text-red-500' : 'text-gray-300'}`} size={24} />
                        </button>
                    </div>
                    <div className="flex items-center mb-3 text-yellow-400">
                        <BsStar className="w-5 h-5" />
                        <span className="ml-2 text-lg font-semibold">5.0</span>
                    </div>
                    <p className="text-sm mb-4 text-gray-200  transition-all duration-300">
                        {project.description}
                    </p>
                    <div className="flex flex-wrap w-full items-center gap-1 mb-4 p-2">
                        {project.techstack && project.techstack.map((tech, index) => {
                            const techIcon = techList.find(item => item.name === tech);
                            return techIcon && (
                                <Button key={index} className="bg-white/10 backdrop-blur rounded-full p-2 m-1 transition-all duration-300 hover:bg-white/20">
                                    {techIcon.icon}
                                </Button>
                            );
                        })}
                    </div>
                    <div className='flex gap-3'>
                        <Button className="flex-1 py-2 px-4 text-sm font-medium flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 rounded-full transition-all duration-300" onClick={() => { window.location.href = "https://mail.google.com/mail/u/0/#inbox?compose=new" }}>
                            Request <BiMailSend size={18} />
                        </Button>
                        <Button className={`flex-1 py-2 px-4 text-sm font-medium flex items-center justify-center gap-2 ${project.link ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-500"} rounded-full transition-all duration-300`} disabled={!project.link} onClick={() => { window.location.href = project.link ? project.link : '#' }}>
                            View <CiLink size={18} />
                        </Button>
                    </div>
                </div>
            </div>

            <Modal
                open={open}
                onClose={onCloseModal}
                center
                classNames={{
                    modal: ' h-1/2 md:h-full w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl',
                    overlay: '2 bg-black bg-opacity-50 flex flex-col items-center justify-center',
                    modalContainer: '1 flex justify-center items-center bg-black bg-opacity-10 backdrop-filter backdrop-blur-sm p-4',
                }}
                closeIcon={<IoCloseCircleOutline size={25} className='text-red-500' />}
            >
                <img
                    alt="Website Project"
                    className="object-contain object-center md:object-cover w-full h-full  md:max-h-[80vh] md:max-w-none"
                    loading='lazy'
                    src={project.image}
                />
            </Modal>
        </div>
    );
}
