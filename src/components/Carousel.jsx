import React, { useEffect, useState } from 'react';
import { FaReact, FaNodeJs, FaServer, FaLinux } from 'react-icons/fa';
import { TbBrandNextjs, TbBrandMysql } from 'react-icons/tb';
import { SiTailwindcss, SiNginx } from 'react-icons/si';

const techList = [
    {
        name: 'React',
        icon: FaReact,
        lightColor: '#61DAFB',
        darkColor: '#00D8FF',
    },
    {
        name: 'Next.js',
        icon: TbBrandNextjs,
        lightColor: '#000000',
        darkColor: '#FFFFFF',
    },
    {
        name: 'Tailwind CSS',
        icon: SiTailwindcss,
        lightColor: '#38BDF8',
        darkColor: '#06B6D4',
    },
    {
        name: 'Node.js',
        icon: FaNodeJs,
        lightColor: '#68A063',
        darkColor: '#8CC84B',
    },
    {
        name: 'Express',
        icon: FaServer,
        lightColor: '#808080',
        darkColor: '#CCCCCC',
    },
    {
        name: 'MySQL',
        icon: TbBrandMysql,
        lightColor: '#00758F',
        darkColor: '#F29111',
    },
    {
        name: 'Nginx',
        icon: SiNginx,
        lightColor: '#009639',
        darkColor: '#00FF00',
    },
    {
        name: 'Linux',
        icon: FaLinux,
        lightColor: '#FCC624',
        darkColor: '#FFFFFF',
    }
];

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
        <div id='tech' className="min-h-screen w-full flex flex-col items-center justify-center py-16 px-4">
            <div className={`text-2xl md:text-4xl p-4 text-center font-mono font-light mb-12 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                <h2 className={`${isDarkMode ? 'bg-gradient-to-tr from-gray-600/5 via-gray-800/5 to-gray-700/10 shadow-sm shadow-white/10' : 'bg-gray-400'} bg-opacity-5 backdrop-filter backdrop-blur rounded-lg shadow-lg inline-block px-8 py-4`}>
                    Technologies I've Mastered
                </h2>
            </div>
            <div className="w-full max-w-7xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {techList.map((tech, index) => (
                    <div
                        key={index}
                        className={`group relative ${isDarkMode ? 'bg-gradient-to-tr from-gray-600/5 via-gray-800/5 to-gray-700/10 shadow shadow-white/10' : 'bg-gray-400 shadow-black/10 shadow-lg'}   bg-opacity-5 backdrop-filter backdrop-blur md:backdrop-blur-md rounded-xl p-6 flex flex-col items-center justify-center transition-all duration-300 overflow-hidden hover:bg-opacity-20`}
                        
                    >
                        <div
                            className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300"
                            style={{ color: isDarkMode ? tech.darkColor : tech.lightColor }}
                        >
                            <tech.icon size={60} />
                        </div>
                        <div
                            className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'} group-hover:text-[#00ffaa] transition-colors duration-300 text-center`}
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
