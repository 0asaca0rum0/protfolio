import React from 'react';
import { FaGithub } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { FaTelegramPlane } from "react-icons/fa";

const Hero = () => {
    return (
        <div
            id='home'
            className='container w-full mx-auto px-8 md:px-4 py-12 min-h-screen flex items-center'
        >
            <div className="w-full max-w-fu mx-auto p-8 bg-opacity-60 backdrop-filter backdrop-blur-lg border border-gray-600 shadow-lg rounded-xl">
                <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
                    <div className='flex flex-col justify-center items-center md:items-start text-center md:text-left md:w-1/2'>
                        <p className='text-xl mb-4'>Hello, welcome to my portfolio!</p>
                        <h1 className='text-3xl md:text-6xl font-bold mb-6'>I'm ELMASRI Ahmed</h1>
                        <h2 className='text-2xl md:text-4xl font-medium mb-4'>
                            <span className='bg-gradient-to-r from-teal-300 to-indigo-600 bg-clip-text text-transparent'>
                                Full Stack Developer
                            </span>
                        </h2>
                        <h2 className='text-xl md:text-4xl font-medium mb-8'>
                            <span className='bg-gradient-to-r from-pink-400 to-blue-600 bg-clip-text text-transparent'>
                                Server Engineer
                            </span>
                        </h2>
                        <ul className='flex flex-wrap justify-center md:justify-start gap-4 md:gap-6'>
                            {[
                                { icon: FaGithub, text: "Github", link: "https://github.com/0asaca0rum0" },
                                { icon: FaTelegramPlane, text: "Telegram", link: "https://t.me/karasuma_renya" },
                                { icon: SiGmail, text: "Gmail", link: "mailto:foxdeath100@gmail.com" }
                            ].map((item, index) => (
                                <li key={index}>
                                    <a
                                        href={item.link}
                                        className='flex items-center gap-3 px-4 py-2 rounded-full bg-gray-400 bg-opacity-10 backdrop-filter backdrop-blur-sm hover:bg-opacity-20 hover:text-teal-400 transition-all duration-200 '
                                    >
                                        <item.icon size={20} />
                                        <span>{item.text}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        <img
                            src="self.webp"
                            alt="Ahmed Elmasri"
                            loading='lazy'
                            className='h-96 md:h-[32rem] w-auto object-cover rounded-md shadow-lg hover:scale-105 transition-transform duration-300'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;