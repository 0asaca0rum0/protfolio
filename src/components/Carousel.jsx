import React from 'react';
import { FaReact, FaNodeJs, FaServer, FaDatabase, FaLinux } from 'react-icons/fa';
import { TbBrandNextjs, TbBrandMysql } from 'react-icons/tb';
import { SiTailwindcss, SiNginx } from 'react-icons/si';

const techList = [
    { name: 'React', icon: <FaReact size={30} /> },
    { name: 'Next 13', icon: <TbBrandNextjs size={30} /> },
    { name: 'tailwindcss', icon: <SiTailwindcss size={30} /> },
    { name: 'nodejs', icon: <FaNodeJs size={30} /> },
    { name: 'express', icon: <FaServer size={30} /> },
    { name: 'mysql', icon: <TbBrandMysql size={30} /> },
    { name: 'nginx', icon: <SiNginx size={30} /> },
    { name: 'linux', icon: <FaLinux size={30} /> }
];

const TechGrid = () => {

    return (
        <div id='tech' className="h-full w-11/12 flex flex-col mt-5 items-center justify-center">
            <div className='text-xl md:text-2xl p-2 text-center flex flex-row items-center justify-center font-mono font-extralight  w-full'>  <p className=' bg-opacity-80 backdrop-filter backdrop-blur-lg bg-inherit rounded-lg shadow-lg w-fit p-4'> The Technology I mastered</p> </div>
            <br className='h-1  w-24 ' color='white'/>
            <div className="w-full grid grid-cols-1 md:grid-cols-3   lg:grid-cols-4 xl:grid-cols-4 gap-6 max-w-6xl mx-auto p-6">
                {techList.map((tech, index) => (
                    <div
                        key={index}
                        
                        className={`bg-gray-700/15 bg-opacity-80  backdrop-filter backdrop-blur-md rounded p-6 flex flex-col items-center hover:bg-opacity-75 hover:scale-110 hover:text-teal-300 transition-all duration-200`}

                    >
                        <div className="text-6xl mb-4 text-inherit">{tech.icon}</div>
                        <div className="text-xl font-bold text-inherit">{tech.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TechGrid;