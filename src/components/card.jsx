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
        <div className="group min-w-80 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-[550px] md:h-[450px] lg:h-[500px] rounded-lg shadow-lg overflow-hidden relative hover:scale-105 transition-all">
            <img
                alt="Website Project"
                className="object-cover object-center w-full h-full absolute inset-0"
                loading='lazy'
                src={project.image}
            />

            <div className="absolute inset-0 bg-black bg-opacity-30">
                <button onClick={onOpenModal} className="absolute top-2 right-2 bg-teal-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 rounded p-2">
                    <GoZoomIn size={24} className='text-white' />
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg text-white transition-all duration-500 ease-in group-hover:max-h-full max-h-24 overflow-hidden">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-semibold">{project.title}</span>
{
                            isclicked ?
                             <FaHeart className='text-red-500 ' size={'20'} onClick={() => { setIsclicked(!isclicked) }} /> 
                             : 
                                <BiHeart className='text-teal-500  ' size={'24'} onClick={ ()=>{setIsclicked(!isclicked)}   }/>
}
                    </div>
                    <div className="flex items-center mb-2 text-yellow-500">
                        <BsStar className="w-5 h-5" />
                        <span className="mx-2 text-lg font-semibold">5.0</span>
                    </div>
                    <p className="text-sm mb-4 line-clamp-none peer ">
                        {project.description}
                    </p>
                    <div className="flex flex-row items-center w-full justify-between mb-4">
                        <div className="flex flex-row items-center gap-2">
                            {project.techstack && project.techstack.slice(0, 3).map((tech, index) => {
                                const techIcon = techList.find(item => item.name === tech);
                                return techIcon && <div key={index}>{techIcon.icon}</div>;
                            })}
                        </div>
                        {project.techstack && project.techstack.length > 3 && (
                            <Button className="px-2 py-1 text-xs font-bold text-white bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all">
                                +{project.techstack.length - 3}
                            </Button>
                        )}
                    </div>
                    <div className='flex flex-col md:flex-row gap-2'>
                        <Button className="flex-1 p-2 text-base flex items-center justify-center gap-2 bg-teal-400 hover:bg-teal-500 transition-all" onClick={() => { window.location.href = "https://mail.google.com/mail/u/0/#inbox?compose=CllgCJqVNkTxBxJwvgjCpgvVWCPfrwfxSNQjwfHWWzQPHsnCzbFXGKZSDBjZrsHNFfGRmtFNdtL" }}>
                            Request <BiMailSend size={20} />
                        </Button>
                        <Button className={`flex-1 p-2 text-base flex items-center justify-center gap-2 ${project.link ? "bg-cyan-400 hover:bg-cyan-500" : "bg-gray-500"} transition-all`} disabled={!project.link} onClick={() => { window.location.href = project.link ? project.link : '#' }}>
                            View <CiLink size={20} />
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
