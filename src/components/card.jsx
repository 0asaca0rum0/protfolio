/**
 * v0 by Vercel.
 * @see https://v0.dev/t/6IxKale5DlG
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import React, { useState } from 'react';
import { FaReact, FaNodeJs, FaServer, FaLinux } from 'react-icons/fa';
import { TbBrandNextjs, TbBrandMysql } from 'react-icons/tb';
import { SiTailwindcss, SiNginx } from 'react-icons/si';
import { BiMailSend } from "react-icons/bi";
import { IoCloseCircleOutline } from "react-icons/io5";

import { ButtonGroup, Button } from "@material-tailwind/react";
import { BiHeart } from "react-icons/bi";
import { BsStar } from "react-icons/bs";
import { CiLink } from "react-icons/ci";
import { useEffect } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { GoZoomIn } from "react-icons/go";
import { SiMongodb } from "react-icons/si";
import { SiFlutter } from "react-icons/si";


const techList = [
    { name: 'React ', icon: <FaReact size={30} /> },
    { name: 'Next 13 ', icon: <TbBrandNextjs size={30} /> },
    { name: 'Tailwind CSS ', icon: <SiTailwindcss size={30} /> },
    { name: 'nodejs', icon: <FaNodeJs size={30} /> },
    { name: 'express ', icon: <FaServer size={30} /> },
    { name: 'mysql ', icon: <TbBrandMysql size={30} /> },
    { name: 'nginx ', icon: <SiNginx size={30} /> },
    { name: 'linux ', icon: <FaLinux size={30} /> },
    { name: 'mongodb ', icon: <SiMongodb size={30} /> },
    { name: 'flutter ', icon: <SiFlutter size={30} /> },
];



export default function Card({ project }) {
    const [bgColor, setBgColor] = useState(null);
    const [icons, setIcons] = useState([]);
    useEffect(() => {
        const x = window.getComputedStyle(document.documentElement).getPropertyValue('--bg-color');
        setBgColor(x);

    }, [bgColor]);
    useEffect(() => {
        const x = project.techstack ? techList.filter(tech => project.techstack.includes(tech.name)).map((tech, index) => <div key={index}>{tech.icon}</div>) : [];
        setIcons(x);
    }, [project.techstack]);
    const handleOpen = () => {
        setOpen(!open);
    }
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    return (
        <div className={`max-w-md min-w-60 flex flex-col items-center justify-between w-full overflow-hidden bg-opacity-80 backdrop-filter backdrop-blur-lg bg-inherit rounded-lg shadow-lg ${bgColor ? 'text-white' : 'text-gray-800'}`}>
            <img alt="Website Project" className="object-cover object-center w-full h-56" src={project.imageUrl} />
            <button onClick={onOpenModal} className={`absolute top-52 right-0 -mt-4 bg-blue-300 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 rounded-tl ${bgColor ? 'text-white' : 'text-gray-800'}`}><GoZoomIn size={"25px"} className='text-indigo-500 m-1' /></button>

            <div className={`p-6 bg-opacity-80 backdrop-filter backdrop-blur-lg bg-inherit ${!bgColor ? 'text-white' : 'text-gray-800'}`}>
                <Modal open={open} onClose={onCloseModal} center classNames={"w-full h-full flex flex-row items-center justify-center"} closeIcon={<IoCloseCircleOutline size={35} className='text-red-500'/>
} >
                    <img alt="Website Project" className="object-cover object-center w-full h-[700px] " src={project.imageUrl} />
                    
                </Modal>
                <div className="flex justify-between gap-2 items-center">
                    <span className={`text-lg font-semibold ${!bgColor ? 'text-white/90' : 'text-gray-400/80'}`}>{project.title}</span>
                    <BiHeart className="text-red-500" />
                </div>
                <div className="flex items-center mt-4 text-yellow-500">
                    <BsStar className="w-5 h-5" />
                    <span className="mx-2 text-lg font-semibold">5.0</span>
                </div>
                <p className={`mt-2 text-sm ${!bgColor ? "text-gray-400" : 'text-gray-800'}`}>
                    {project.description}
                </p>
                <div className="flex flex-row items-center w-full justify-between mt-4">
                    <div className="flex flex-row items-center gap-2">
                        {icons}
                    </div>
                    <Button className={`px-2 py-1 text-xs font-bold ${!bgColor ? "text-white bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 rounded-full bg-white hover:bg-opacity-40 transition-all " : 'text-gray-800'} rounded`}>
                        +20
                    </Button>
                </div>

            </div>
           <div className='w-full px-2 py-1 '>
                <Button className={`w-full p-2 mt-2 text-base flex flex-row items-center justify-center gap-4 bg-teal-400  hover:bg-teal-500 transition-all `} onClick={() => { window.location.href ="https://mail.google.com/mail/u/0/#inbox?compose=new"}}>Requset <BiMailSend size={25} />
                </Button>
                <Button className={`w-full p-2 mt-2 text-base flex flex-row items-center justify-center gap-4 ${project.link ? "bg-cyan-400  hover:bg-cyan-500" : "bg-gray-500"} transition-all`} disabled={project.link? false :true} onClick={() => {window.location.href = project.link? project.link :'#'  } }>View <CiLink size={25} /></Button>
           </div>
        </div>
    );
}
