import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full mt-10 flex flex-col items-center py-8 bg-inherit bg-opacity-20 backdrop-filter backdrop-blur-lg  shadow-lg border-t border-gray-400">
            <div className="w-full max-w-4xl flex flex-col md:flex-row justify-between mb-6">
                <div className="mb-6 md:mb-0">
                    <h3 className="text-inherit font-bold text-lg mb-2">Contact Information</h3>
                    <div className="text-inherit/50">
                        <p>Email: foxdeath100@gmail.com</p>
                        <p>Phone: +213540430098</p>
                    </div>
                </div>
                <div className="mb-6 md:mb-0">
                    <h3 className="text-inherit font-bold text-lg mb-2">Social Links</h3>
                    <div className="text-inherit/50">
                        <p className='hover:scale-110 transition-all'>
                            <a
                                href="https://github.com/0asaca0rum0"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:scale-105 font-light   transition-colors duration-300"
                            >
                                GitHub
                            </a>
                        </p>
                        <p>
                            <a
                                href="https://t.me/karasuma_renya"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:scale-105  font-light transition-colors duration-300"
                            >
                                Telegram
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <div className="text-inherit text-sm">
                <p>&copy; {new Date().getFullYear()} Elmasri ahmed. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;