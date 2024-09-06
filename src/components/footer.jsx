import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full mt-10 flex flex-col items-center py-10 bg-gray-800 bg-opacity-5 backdrop-filter backdrop-blur md:backdrop-blur-md shadow-xl border-t border-gray-300 border-opacity-20">
            <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between mb-8 px-4">
                <div className="mb-8 md:mb-0">
                    <h3 className="text-inherit font-semibold text-xl mb-4">Contact Information</h3>
                    <div className="text-inherit/60 space-y-2">
                        <p>Email: <a href="mailto:foxdeath100@gmail.com" className="hover:underline">foxdeath100@gmail.com</a></p>
                        <p>Phone: <a href="tel:+213540430098" className="hover:underline">+213540430098</a></p>
                    </div>
                </div>
                <div className="mb-8 md:mb-0">
                    <h3 className="text-inherit font-semibold text-xl mb-4">Social Links</h3>
                    <div className="text-inherit/60 space-y-2">
                        <p className='hover:scale-105 transition-transform'>
                            <a
                                href="https://github.com/0asaca0rum0"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-light transition-transform duration-300"
                            >
                                GitHub
                            </a>
                        </p>
                        <p className='hover:scale-105 transition-transform'>
                            <a
                                href="https://t.me/karasuma_renya"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-light transition-transform duration-300"
                            >
                                Telegram
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <div className="text-inherit text-sm text-center px-4">
                <p>&copy; {new Date().getFullYear()} Elmasri Ahmed. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
