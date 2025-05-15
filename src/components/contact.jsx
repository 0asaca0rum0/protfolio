import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaGithub, FaTelegramPlane, FaPhone, FaRegPaperPlane } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { FaUser, FaDownload } from 'react-icons/fa6';

const Contact = () => {
    const [activeTab, setActiveTab] = useState('form');
    const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success, error
    const [direction, setDirection] = useState(0); // -1 for left, 1 for right
    
    // Handle tab switching with direction
    const switchTab = (tab) => {
        setDirection(tab === 'form' ? -1 : 1);
        setActiveTab(tab);
    };
    
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('sending');
        
        // Get the form data
        const form = e.target;
        const formData = new FormData(form);
        
        // Submit to Formspree
        fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                setFormStatus('success');
                form.reset();
                // Reset status after 3 seconds
                setTimeout(() => setFormStatus('idle'), 3000);
            } else {
                setFormStatus('error');
            }
        })
        .catch(() => {
            setFormStatus('error');
        });
    };
    
    return (
        <motion.section 
            className="w-full py-8 font-['Comfortaa'] bg-gradient-to-b from-[#0A0A0A]/80 to-[#0A0A0A]/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            id="contact"
        >
            <div className="max-w-4xl mx-auto px-4">
                {/* Section Header */}
                <motion.div 
                    className="text-center mb-8"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                >
                    <motion.div
                        className="h-px w-[80%] mx-auto bg-gradient-to-r from-transparent via-[#1ED696]/40 to-transparent mb-4"
                        initial={{ width: 0 }}
                        animate={{ width: "80%" }}
                        transition={{ duration: 1.2 }}
                    />
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                        <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-[#1A936F] to-[#1ED696]">
                            Get In Touch
                        </span>
                    </h2>
                    <p className="text-[#8FE7C3]/80 text-sm md:text-base">
                        Have a question or want to work together? Let me know!
                    </p>
                    <motion.div
                        className="h-px w-[60%] mx-auto bg-gradient-to-r from-transparent via-[#1ED696]/40 to-transparent mt-4"
                        initial={{ width: 0 }}
                        animate={{ width: "60%" }}
                        transition={{ duration: 1.2, delay: 0.2 }}
                    />
                </motion.div>

                {/* Tab Navigation */}
                <div className="flex justify-center mb-8">
                    <div className="bg-[#131313]/80 backdrop-blur-sm rounded-full p-1 inline-flex relative border border-[#1A936F]/20 shadow-lg">
                        <motion.div 
                            className="absolute h-full top-0 rounded-full bg-gradient-to-r from-[#114E3C] to-[#1A936F]"
                            initial={false}
                            animate={{ 
                                left: activeTab === 'form' ? '0%' : '50%',
                                width: '50%'
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                        <button 
                            className={`px-6 py-2.5 text-sm rounded-full transition-all relative z-10 font-medium ${activeTab === 'form' ? 'text-white' : 'text-[#8FE7C3] hover:text-[#1ED696]'}`}
                            onClick={() => switchTab('form')}
                        >
                            Send Message
                        </button>
                        <button 
                            className={`px-6 py-2.5 text-sm rounded-full transition-all relative z-10 font-medium ${activeTab === 'info' ? 'text-white' : 'text-[#8FE7C3] hover:text-[#1ED696]'}`}
                            onClick={() => switchTab('info')}
                        >
                            Contact Info
                        </button>
                    </div>
                </div>
                
                {/* Main Content Container */}
                <motion.div 
                    className="bg-[#131313]/90 backdrop-blur-md rounded-2xl border border-[#1A936F]/20 shadow-xl overflow-hidden max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                >
                    <AnimatePresence mode="wait" custom={direction}>
                        {/* Contact Form Tab */}
                        {activeTab === 'form' && (
                            <motion.div
                                key="form"
                                custom={direction}
                                variants={pageVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="p-6 md:p-8"
                            >
                                <form
                                    action="https://formspree.io/f/xgegpyra"
                                    method="POST"
                                    onSubmit={handleSubmit}
                                    className="space-y-5"
                                >
                                    <motion.div 
                                        variants={itemVariants}
                                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                    >
                                        {/* Name Input */}
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                placeholder=" "
                                                className="peer w-full bg-[#0a0a0a] border border-[#1A936F]/30 text-[#FCFFF0] rounded-lg p-3 pt-5 focus:outline-none focus:border-[#1ED696] focus:shadow-[0_0_10px_rgba(30,214,150,0.15)] transition-all"
                                                required
                                            />
                                            <label 
                                                htmlFor="name" 
                                                className="absolute text-xs text-[#8FE7C3] top-1.5 left-3 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-xs"
                                            >
                                                Name
                                            </label>
                                        </div>
                                        
                                        {/* Email Input */}
                                        <div className="relative group">
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                placeholder=" "
                                                className="peer w-full bg-[#0a0a0a] border border-[#1A936F]/30 text-[#FCFFF0] rounded-lg p-3 pt-5 focus:outline-none focus:border-[#1ED696] focus:shadow-[0_0_10px_rgba(30,214,150,0.15)] transition-all"
                                                required
                                            />
                                            <label 
                                                htmlFor="email" 
                                                className="absolute text-xs text-[#8FE7C3] top-1.5 left-3 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-xs"
                                            >
                                                Email
                                            </label>
                                        </div>
                                    </motion.div>
                                    
                                    {/* Subject Input */}
                                    <motion.div 
                                        variants={itemVariants}
                                        className="relative group"
                                    >
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            placeholder=" "
                                            className="peer w-full bg-[#0a0a0a] border border-[#1A936F]/30 text-[#FCFFF0] rounded-lg p-3 pt-5 focus:outline-none focus:border-[#1ED696] focus:shadow-[0_0_10px_rgba(30,214,150,0.15)] transition-all"
                                        />
                                        <label 
                                            htmlFor="subject" 
                                            className="absolute text-xs text-[#8FE7C3] top-1.5 left-3 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-xs"
                                        >
                                            Subject
                                        </label>
                                    </motion.div>
                                    
                                    {/* Message Textarea */}
                                    <motion.div 
                                        variants={itemVariants}
                                        className="relative group"
                                    >
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows="4"
                                            placeholder=" "
                                            className="peer w-full bg-[#0a0a0a] border border-[#1A936F]/30 text-[#FCFFF0] rounded-lg p-3 pt-5 focus:outline-none focus:border-[#1ED696] focus:shadow-[0_0_10px_rgba(30,214,150,0.15)] transition-all resize-none"
                                            required
                                        />
                                        <label 
                                            htmlFor="message" 
                                            className="absolute text-xs text-[#8FE7C3] top-1.5 left-3 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-xs"
                                        >
                                            Message
                                        </label>
                                    </motion.div>
                                    
                                    {/* Form Footer */}
                                    <motion.div 
                                        variants={itemVariants}
                                        className="flex justify-between items-center pt-2"
                                    >
                                        {/* Status Messages */}
                                        <div className="text-sm h-6">
                                            {formStatus === 'success' && (
                                                <motion.div 
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    className="flex items-center text-[#1ED696] font-medium"
                                                >
                                                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                    </svg>
                                                    Message sent!
                                                </motion.div>
                                            )}
                                            
                                            {formStatus === 'error' && (
                                                <motion.div 
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    className="flex items-center text-red-500"
                                                >
                                                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                                    </svg>
                                                    Something went wrong
                                                </motion.div>
                                            )}
                                        </div>
                                        
                                        {/* Submit Button */}
                                        <motion.button
                                            type="submit"
                                            className="group bg-gradient-to-r from-[#114E3C] to-[#1A936F] hover:from-[#1A936F] hover:to-[#1ED696] text-[#FCFFF0] font-medium flex items-center gap-2 py-2.5 px-5 rounded-full transition-all duration-300 shadow-md hover:shadow-[0_5px_15px_rgba(30,214,150,0.3)]"
                                            disabled={formStatus === 'sending'}
                                            whileHover={{ y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {formStatus === 'sending' ? (
                                                <>
                                                    Sending
                                                    <motion.div 
                                                        animate={{ rotate: 360 }}
                                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                    >
                                                        <FaRegPaperPlane className="text-sm opacity-90" />
                                                    </motion.div>
                                                </>
                                            ) : (
                                                <>
                                                    Send Message
                                                    <FaPaperPlane className="text-sm opacity-90 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </>
                                            )}
                                        </motion.button>
                                    </motion.div>
                                </form>
                            </motion.div>
                        )}
                        
                        {/* Contact Info Tab */}
                        {activeTab === 'info' && (
                            <motion.div 
                                key="info"
                                custom={direction}
                                variants={pageVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="p-6 md:p-8"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Direct Contact */}
                                    <div className="space-y-5">
                                        <motion.h3 
                                            variants={itemVariants}
                                            className="text-[#1ED696] font-semibold text-lg flex items-center gap-2 pb-2 border-b border-[#1A936F]/20"
                                        >
                                            <span className="w-1.5 h-6 bg-[#1ED696] rounded-full block"></span>
                                            Direct Contact
                                        </motion.h3>
                                        
                                        {/* Contact Links */}
                                        <div className="space-y-4">
                                            {[
                                                {
                                                    icon: <SiGmail className="text-[#1ED696]" size={20} />,
                                                    label: "Email",
                                                    text: "foxdeath100@gmail.com",
                                                    href: "mailto:foxdeath100@gmail.com"
                                                },
                                                {
                                                    icon: <FaPhone className="text-[#1ED696]" size={18} />,
                                                    label: "Phone",
                                                    text: "+213 540 430 098",
                                                    href: "tel:+213540430098"
                                                },
                                                {
                                                    icon: <FaTelegramPlane className="text-[#1ED696]" size={20} />,
                                                    label: "Telegram",
                                                    text: "@karasuma_renya",
                                                    href: "https://t.me/karasuma_renya",
                                                    external: true
                                                }
                                            ].map((item, index) => (
                                                <motion.a
                                                    key={index}
                                                    variants={itemVariants}
                                                    href={item.href}
                                                    target={item.external ? "_blank" : undefined}
                                                    rel={item.external ? "noopener noreferrer" : undefined}
                                                    className="flex items-start gap-3 group p-3 rounded-lg hover:bg-[#1A936F]/10 transition-all"
                                                    whileHover={{ x: 3 }}
                                                >
                                                    <div className="mt-0.5">
                                                        <div className="w-10 h-10 rounded-full bg-[#0a0a0a] flex items-center justify-center border border-[#1A936F]/30 group-hover:border-[#1ED696]/50 transition-all">
                                                            {item.icon}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-xs text-[#8FE7C3]">{item.label}</div>
                                                        <div className="text-[#FCFFF0] font-medium group-hover:text-[#1ED696] transition-colors">
                                                            {item.text}
                                                        </div>
                                                    </div>
                                                </motion.a>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* Additional Information */}
                                    <div className="space-y-5">
                                        <motion.h3 
                                            variants={itemVariants}
                                            className="text-[#1ED696] font-semibold text-lg flex items-center gap-2 pb-2 border-b border-[#1A936F]/20"
                                        >
                                            <span className="w-1.5 h-6 bg-[#1ED696] rounded-full block"></span>
                                            Other Links
                                        </motion.h3>
                                        
                                            {[
                                                {
                                                    icon: <FaGithub className="text-[#1ED696]" size={20} />,
                                                    label: "GitHub",
                                                    text: "github.com/0asaca0rum0",
                                                    href: "https://github.com/0asaca0rum0",
                                                    external: true
                                                },
                                                {
                                                    icon: <FaDownload className="text-[#1ED696]" size={18} />,
                                                    label: "Resume",
                                                    text: "Download CV (PDF)",
                                                    href: "/cv.pdf",
                                                    download: true
                                                },
                                                {
                                                    icon: <FaUser className="text-[#1ED696]" size={18} />,
                                                    label: "Full Name",
                                                    text: "Elmasri Ahmed",
                                                    isSpan: true
                                                }
                                            ].map((item, index) => (
                                                <motion.div
                                                    key={index}
                                                    variants={itemVariants}
                                                    className="flex items-start gap-3 group p-3 rounded-lg hover:bg-[#1A936F]/10 transition-all"
                                                >
                                                    <div className="mt-0.5">
                                                        <div className="w-10 h-10 rounded-full bg-[#0a0a0a] flex items-center justify-center border border-[#1A936F]/30 group-hover:border-[#1ED696]/50 transition-all">
                                                            {item.icon}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-xs text-[#8FE7C3]">{item.label}</div>
                                                        {item.isSpan ? (
                                                            <div className="text-[#FCFFF0] font-medium">
                                                                {item.text}
                                                            </div>
                                                        ) : (
                                                            <a 
                                                                href={item.href} 
                                                                target={item.external ? "_blank" : undefined}
                                                                rel={item.external ? "noopener noreferrer" : undefined}
                                                                download={item.download}
                                                                className="text-[#FCFFF0] font-medium group-hover:text-[#1ED696] transition-colors flex items-center gap-1"
                                                            >
                                                                {item.text}
                                                                {item.external && (
                                                                    <svg className="w-3 h-3 opacity-70" viewBox="0 0 24 24" fill="currentColor">
                                                                        <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
                                                                    </svg>
                                                                )}
                                                            </a>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        {/* Remove the extra closing div here */}
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

// Animation variants
const pageVariants = {
    enter: (direction) => ({
        x: direction > 0 ? 50 : -50,
        opacity: 0
    }),
    center: {
        x: 0,
        opacity: 1,
        transition: { 
            duration: 0.3,
            when: "beforeChildren",
            staggerChildren: 0.1
        }
    },
    exit: (direction) => ({
        x: direction < 0 ? 50 : -50,
        opacity: 0,
        transition: { 
            duration: 0.2,
            when: "afterChildren",
            staggerChildren: 0.05,
            staggerDirection: -1
        }
    })
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { y: -10, opacity: 0, transition: { duration: 0.2 } }
};

export default Contact;