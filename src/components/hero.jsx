import { Button, ButtonGroup, List, ListItem } from '@material-tailwind/react';
import React from 'react';
import { FaGithub } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { FaTelegramPlane } from "react-icons/fa";

const Hero = () => {
    return (
        <div id='home' className='w-11/12 mt-5   p-4   h-full flex flex-col justify-evenly items-center bg-inherit  rounded-3xl bg-opacity-80 backdrop-filter backdrop-blur-lg  border border-gray-600  shadow-lg'>

            <div className="flex md:flex-row-reverse flex-col items-center justify-around w-full h-full  ">
                <img src="self.webp" alt="" className='h-[480px] md:w-1/2 hover:scale-105 transition-all md:me-10  aspect-auto rounded-xl border border-white/60 ' />

                <div className='h-full  md:w-full flex flex-col justify-center m-2 items-center  md:text-left'>
                    <p className='text'>Hello, welcome to my portfolio!</p>
                    <h1 className='text-2xl md:text-5xl mb-2'>I'm ELMASRI Ahmed </h1>
                    <h1 className='text-2xl md:text-5xl font-medium bg-gradient-to-r from-teal-300 to-indigo-600 bg-clip-text text-transparent'>a full stack developer</h1>
                    <h1 className='text-2xl md:text-5xl '>  and  </h1>
                    <h1 className='text-2xl h-16 font-medium md:text-5xl bg-gradient-to-r from-pink-400 to-blue-600 bg-clip-text text-transparent'>  server engineer  </h1>

                </div>

            </div>
            <ul className='flex flex-row items-center md:justify-start justify-evenly   mt-5 gap-2 md:gap-5 md:w-1/2'>
                <li className='flex flex-row items-center justify-evenly md:gap-2 gap-1 p-2 rounded-lg  bg-gray-400 hover:text-teal-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 md:hover:scale-125 hover:scale-110 transition-all duration-200'>
                    <FaGithub size={"20"} />
                    <a href="https://github.com/0asaca0rum0" >Github</a>
                    </li>
                <li className='flex flex-row items-center justify-evenly md:gap-2 gap-1 p-2 rounded-lg  bg-gray-400 hover:text-teal-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 md:hover:scale-125 hover:scale-110 transition-all duration-200 '>
                    <FaTelegramPlane size={"20"} />
                    <a href="https://t.me/karasuma_renya" >Telegram</a>
                    </li>
                <li className='flex flex-row items-center justify-evenly md:gap-2 gap-1 p-2 rounded-lg  bg-gray-400 hover:text-teal-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 md:hover:scale-125 hover:scale-110 transition-all duration-200'>
                    <SiGmail size={"20"} />
                    <a href="mailto:foxdeath100@gmail.com" >Gmail</a>
                    </li>
            </ul>

        </div>
    );
};

export default Hero;