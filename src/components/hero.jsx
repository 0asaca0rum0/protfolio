import React, { useEffect, useState } from 'react';
import { FaGithub } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { FaTelegramPlane } from "react-icons/fa";

const Hero = () => {
    const checkDarkMode = () => {
        const bgColor = window.getComputedStyle(document.documentElement).getPropertyValue('color');
        return bgColor === 'rgb(51, 51, 51)';
    };

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const observer = new MutationObserver(() => {
            const newIsDarkMode = checkDarkMode();
            console.log(newIsDarkMode ? 'dark' : 'light');
            setIsDarkMode(newIsDarkMode);
        });
        observer.observe(document.documentElement, { attributes: true });
        return () => observer.disconnect();
    }, []);

    return (
        <div
            id='home'
            className='w-full min-h-screen flex items-center'
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-screen-2xl">
                <div className={`w-full mx-auto p-8 ${!isDarkMode
                    ? 'bg-gray-800 bg-opacity-5'
                    : 'bg-gray-400 bg-opacity-15'} backdrop-filter backdrop-blur shadow-2xl rounded-xl transition-colors duration-300`}>
                    <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
                        <div className={`flex flex-col justify-center items-center lg:items-start text-center lg:text-left lg:w-1/2 ${!isDarkMode
                            ? 'text-white'
                            : 'text-gray-800'}`}>
                            <p className='text-xl mb-4 opacity-90'>Hello, welcome to my portfolio!</p>
                            <h1 className='text-3xl sm:text-4xl lg:text-6xl font-bold mb-6'>I'm ELMASRI Ahmed</h1>
                            <h2 className='text-2xl sm:text-3xl lg:text-4xl font-medium mb-4'>
                                <span className='bg-gradient-to-r from-[#00ffaa] to-[#8a2be2] bg-clip-text text-transparent'>
                                    Full Stack Developer
                                </span>
                            </h2>
                            <h2 className='text-xl sm:text-2xl lg:text-4xl font-medium mb-8'>
                                <span className='bg-gradient-to-r from-[#8a2be2] to-[#00ffaa] bg-clip-text text-transparent'>
                                    Server Engineer
                                </span>
                            </h2>
                            <ul className='flex flex-wrap justify-center lg:justify-start gap-4 lg:gap-6'>
                                {[
                                    { icon: FaGithub, text: "Github", link: "https://github.com/0asaca0rum0" },
                                    { icon: FaTelegramPlane, text: "Telegram", link: "https://t.me/karasuma_renya" },
                                    { icon: SiGmail, text: "Gmail", link: "mailto:foxdeath100@gmail.com" }
                                ].map((item, index) => (
                                    <li key={index}>
                                        <a
                                            href={item.link}
                                            className={`flex items-center gap-3 px-4 py-2 rounded-full ${!isDarkMode
                                                ? 'bg-white bg-opacity-10 text-white hover:bg-opacity-20 hover:text-[#00ffaa]'
                                                : 'bg-gray-800 bg-opacity-10 text-gray-800 hover:bg-opacity-20 hover:text-[#8a2be2]'} backdrop-filter backdrop-blur-sm transition-all duration-200`}
                                        >
                                            <item.icon size={20} />
                                            <span>{item.text}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="lg:w-1/2 flex justify-center">
                            <img
                                src="self.webp"
                                alt="Ahmed Elmasri"
                                loading='lazy'
                                className='h-80 sm:h-96 lg:h-[32rem] w-auto object-cover rounded-md shadow-lg hover:scale-105 transition-transform duration-300 border-2 border-opacity-20'
                                style={{ borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;