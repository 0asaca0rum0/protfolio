import React, { useEffect, useState } from 'react';
import { FaReact, FaNodeJs, FaServer, FaDatabase, FaLinux } from 'react-icons/fa';
import { TbBrandNextjs, TbBrandMysql } from 'react-icons/tb';
import { SiTailwindcss, SiNginx } from 'react-icons/si';

const techList = [
    { name: 'React', icon: FaReact, color: '#00D8FF' },
    { name: 'Next.js', icon: TbBrandNextjs, color: '#000000' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'Node.js', icon: FaNodeJs, color: '#8CC84B' },
    { name: 'Express', icon: FaServer, color: '#808080' },
    { name: 'MySQL', icon: TbBrandMysql, color: '#00758F' },
    { name: 'Nginx', icon: SiNginx, color: '#009639' },
    { name: 'Linux', icon: FaLinux, color: '#FCC624' }
];

const TechGrid = () => {
    const checkDarkMode = () => {
        const bgColor = window.getComputedStyle(document.documentElement).getPropertyValue('color');
        if (bgColor === 'rgb(51, 51, 51)') {
            return true;
        } else if (bgColor === 'rgb(255, 255, 255)') {
            return false;
        }
    };

    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        new MutationObserver(() => {
            setIsDarkMode(!checkDarkMode());
        }).observe(document.documentElement, { attributes: true });
    }, []);

    return (
        <div id='tech' className="min-h-screen w-full flex flex-col items-center justify-center py-16 px-4">
            <div className={`text-2xl md:text-4xl p-4 text-center font-mono font-light mb-12 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                <h2 className={`bg-${isDarkMode ? 'gray-600' : 'gray-100'} bg-opacity-5 backdrop-filter backdrop-blur-md rounded-lg shadow-lg inline-block px-8 py-4`} >
                    Technologies I've Mastered
                </h2>
            </div>
            <div className="w-full max-w-7xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {techList.map((tech, index) => (
                    <div
                        key={index}
                        className={`group relative bg-${isDarkMode ? 'gray-700' : 'gray-100'} bg-opacity-5 backdrop-filter backdrop-blur-md rounded-xl p-6 flex flex-col items-center justify-center transition-all duration-300 overflow-hidden hover:bg-opacity-20`}
                    >
                        <div
                            className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300"
                            style={{ color: isDarkMode ? tech.color : tech.color }}
                        >
                            <tech.icon size={60} />
                        </div>
                        <div
                            className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'} group-hover:text-[#00ffaa] transition-colors duration-300`}
                        >
                            {tech.name}
                        </div>
                        <div className={`absolute inset-0 border-2 border-transparent group-hover:border-[#00ffaa] rounded-xl transition-all duration-300`}></div>
                        <div className={`absolute inset-0 bg-gradient-to-br from-[#00ffaa] to-[#8a2be2] opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl`}></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TechGrid;
