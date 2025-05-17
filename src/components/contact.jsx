import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaGithub, FaTelegramPlane, FaPhone, FaRegPaperPlane, FaUser, FaDownload } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

const Contact = () => {
    const [activeTab, setActiveTab] = useState('form');
    const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success, error
    const [direction, setDirection] = useState(0); // -1 for left, 1 for right
    
    const switchTab = (tab) => {
        setDirection(tab === 'form' ? -1 : 1);
        setActiveTab(tab);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('sending');
        
        fetch(e.target.action, {
            method: e.target.method,
            body: new FormData(e.target),
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                setFormStatus('success');
                e.target.reset();
                setTimeout(() => setFormStatus('idle'), 3000);
            } else {
                setFormStatus('error');
            }
        })
        .catch(() => setFormStatus('error'));
    };
    
    return (
        <motion.section 
            className="w-full py-6 font-['Comfortaa'] bg-gradient-to-b from-[#0A0A0A]/80 to-[#0A0A0A]/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            id="contact"
        >
            <div className="max-w-3xl mx-auto px-4">
                {/* Section Header */}
                <motion.div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">
                        <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-[#1A936F] to-[#1ED696]">
                            Get In Touch
                        </span>
                    </h2>
                    <p className="text-[#8FE7C3]/80 text-sm">
                        Have a question or want to work together?
                    </p>
                </motion.div>

                {/* Improved Tab Navigation */}
                <div className="flex justify-center mb-5">
                    <div className="bg-[#131313] rounded-full p-1 inline-flex border border-[#1A936F]/20 w-auto max-w-[280px] relative">
                        <motion.div 
                            className="absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-[#114E3C] to-[#1A936F] shadow-sm"
                            layout
                            animate={{ 
                                left: activeTab === 'form' ? '2px' : '50%',
                                width: 'calc(50% - 4px)',
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                        <button 
                            className={`px-3 py-1.5 text-xs sm:text-sm rounded-full relative z-10 flex-1 text-center transition-colors ${
                                activeTab === 'form' ? 'text-white font-medium' : 'text-[#8FE7C3]/80 hover:text-[#8FE7C3]'
                            }`}
                            onClick={() => switchTab('form')}
                        >
                            Send Message
                        </button>
                        <button 
                            className={`px-3 py-1.5 text-xs sm:text-sm rounded-full relative z-10 flex-1 text-center transition-colors ${
                                activeTab === 'info' ? 'text-white font-medium' : 'text-[#8FE7C3]/80 hover:text-[#8FE7C3]'
                            }`}
                            onClick={() => switchTab('info')}
                        >
                            Contact Info
                        </button>
                    </div>
                </div>
                
                {/* Main Content */}
                <motion.div className="bg-[#131313]/90 rounded-xl border border-[#1A936F]/20 max-w-xl mx-auto">
                    <AnimatePresence mode="wait" custom={direction}>
                        {activeTab === 'form' ? (
                            <motion.div
                                key="form"
                                initial={{ x: direction > 0 ? 50 : -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: direction < 0 ? 50 : -50, opacity: 0 }}
                                className="p-5"
                            >
                                <form action="https://formspree.io/f/xgegpyra" method="POST" onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {/* Name Input */}
                                        <div className="relative">
                                            <input
                                                type="text" id="name" name="name" placeholder=" "
                                                className="peer w-full bg-[#0a0a0a] border border-[#1A936F]/30 text-[#FCFFF0] rounded-lg p-3 pt-5 focus:border-[#1ED696]"
                                                required
                                            />
                                            <label htmlFor="name" className="absolute text-xs text-[#8FE7C3] top-1.5 left-3 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-xs">
                                                Name
                                            </label>
                                        </div>
                                        
                                        {/* Email Input */}
                                        <div className="relative">
                                            <input
                                                type="email" id="email" name="email" placeholder=" "
                                                className="peer w-full bg-[#0a0a0a] border border-[#1A936F]/30 text-[#FCFFF0] rounded-lg p-3 pt-5 focus:border-[#1ED696]"
                                                required
                                            />
                                            <label htmlFor="email" className="absolute text-xs text-[#8FE7C3] top-1.5 left-3 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-xs">
                                                Email
                                            </label>
                                        </div>
                                    </div>
                                    
                                    {/* Message Textarea */}
                                    <div className="relative">
                                        <textarea
                                            id="message" name="message" rows="3" placeholder=" "
                                            className="peer w-full bg-[#0a0a0a] border border-[#1A936F]/30 text-[#FCFFF0] rounded-lg p-3 pt-5 focus:border-[#1ED696] resize-none"
                                            required
                                        />
                                        <label htmlFor="message" className="absolute text-xs text-[#8FE7C3] top-1.5 left-3 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-xs">
                                            Message
                                        </label>
                                    </div>
                                    
                                    {/* Form Footer */}
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm">
                                            {formStatus === 'success' && <span className="text-[#1ED696]">Message sent!</span>}
                                            {formStatus === 'error' && <span className="text-red-500">Something went wrong</span>}
                                        </div>
                                        
                                        <button
                                            type="submit"
                                            className="bg-gradient-to-r from-[#114E3C] to-[#1A936F] hover:from-[#1A936F] hover:to-[#1ED696] text-white flex items-center gap-2 py-2 px-4 rounded-full"
                                            disabled={formStatus === 'sending'}
                                        >
                                            {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                                            {formStatus === 'sending' ? 
                                                <FaRegPaperPlane className="text-sm" /> : 
                                                <FaPaperPlane className="text-sm" />
                                            }
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="info"
                                initial={{ x: direction > 0 ? 50 : -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: direction < 0 ? 50 : -50, opacity: 0 }}
                                className="p-5"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Contact Info */}
                                    <div>
                                        <h3 className="text-[#1ED696] font-semibold mb-3">Direct Contact</h3>
                                        <div className="space-y-3">
                                            <a href="mailto:foxdeath100@gmail.com" className="flex items-center gap-2 hover:text-[#1ED696]">
                                                <SiGmail className="text-[#1ED696]" /> foxdeath100@gmail.com
                                            </a>
                                            <a href="tel:+213540430098" className="flex items-center gap-2 hover:text-[#1ED696]">
                                                <FaPhone className="text-[#1ED696]" /> +213 540 430 098
                                            </a>
                                            <a href="https://t.me/karasuma_renya" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#1ED696]">
                                                <FaTelegramPlane className="text-[#1ED696]" /> @karasuma_renya
                                            </a>
                                        </div>
                                    </div>
                                    
                                    {/* Other Links */}
                                    <div>
                                        <h3 className="text-[#1ED696] font-semibold mb-3">Other Links</h3>
                                        <div className="space-y-3">
                                            <a href="https://github.com/0asaca0rum0" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#1ED696]">
                                                <FaGithub className="text-[#1ED696]" /> github.com/0asaca0rum0
                                            </a>
                                            <a href="/cv.pdf" download className="flex items-center gap-2 hover:text-[#1ED696]">
                                                <FaDownload className="text-[#1ED696]" /> Download CV
                                            </a>
                                            <div className="flex items-center gap-2">
                                                <FaUser className="text-[#1ED696]" /> Elmasri Ahmed
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Contact;
