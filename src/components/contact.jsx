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

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { 
            opacity: 1, 
            y: 0,
            transition: { type: "spring", stiffness: 300, damping: 24 }
        }
    };
    
    return (
        <motion.section
            className="w-full py-6 sm:py-10 font-['Comfortaa'] relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            id="contact"
        >
            {/* Background floating orbs */}
            <motion.div
                className="absolute top-20 left-10 w-32 h-32 bg-[#1ED696]/10 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                    x: [0, 30, 0],
                    y: [0, -20, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-40 right-20 w-40 h-40 bg-[#1A936F]/10 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2],
                    x: [0, -40, 0],
                    y: [0, 30, 0],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div 
                    className="text-center mb-6 sm:mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div className="relative inline-block mb-3">
                        <motion.div
                            className="absolute -inset-2 bg-gradient-to-r from-[#1A936F]/20 via-[#1ED696]/20 to-[#8FE7C3]/20 rounded-full blur-xl"
                            animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.5, 0.8, 0.5],
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                        <h2 className="relative text-2xl sm:text-3xl font-bold tracking-tight">
                            <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-[#1A936F] via-[#1ED696] to-[#8FE7C3]">
                                Get In Touch
                            </span>
                        </h2>
                    </motion.div>
                    <motion.p 
                        className="mt-2 text-[#8FE7C3]/80 text-sm sm:text-base"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Have a question, project idea, or want to collaborate?
                    </motion.p>
                </motion.div>

                {/* Improved Tab Navigation */}
                <motion.div 
                    className="flex justify-center mb-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 20 }}
                >
                    <div className="bg-gradient-to-br from-[#050708]/90 to-[#0a0f0d]/85 backdrop-blur-sm rounded-full p-1 inline-flex border border-[#1A936F]/30 w-auto max-w-[320px] relative shadow-[0_10px_30px_rgba(0,0,0,0.55),inset_0_1px_1px_rgba(255,255,255,0.05)]">
                        <motion.div
                            className="absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-[#114E3C] to-[#1A936F] shadow-[0_0_20px_rgba(30,214,150,0.3)]"
                            layout
                            animate={{
                                left: activeTab === 'form' ? '2px' : '50%',
                                width: 'calc(50% - 4px)',
                            }}
                            transition={{ type: "spring", stiffness: 320, damping: 26 }}
                        />
                        <motion.button
                            className={`px-4 py-1.5 text-xs sm:text-sm rounded-full relative z-10 flex-1 text-center transition-colors ${
                                activeTab === 'form' ? 'text-white font-medium' : 'text-[#8FE7C3]/80 hover:text-[#8FE7C3]'
                            }`}
                            onClick={() => switchTab('form')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Send Message
                        </motion.button>
                        <motion.button
                            className={`px-4 py-1.5 text-xs sm:text-sm rounded-full relative z-10 flex-1 text-center transition-colors ${
                                activeTab === 'info' ? 'text-white font-medium' : 'text-[#8FE7C3]/80 hover:text-[#8FE7C3]'
                            }`}
                            onClick={() => switchTab('info')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Contact Info
                        </motion.button>
                    </div>
                </motion.div>
                
                {/* Main Content */}
                <motion.div 
                    className="relative bg-gradient-to-br from-[#0a0f0d]/95 to-[#050708]/90 backdrop-blur-md rounded-2xl max-w-2xl mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.75),inset_0_1px_1px_rgba(255,255,255,0.05)] overflow-hidden border border-[#1A936F]/25"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                >
                    {/* Enhanced corner glows */}
                    <motion.div 
                        className="pointer-events-none absolute -top-16 -right-10 w-40 h-40 bg-[#1ED696]/15 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.15, 0.25, 0.15],
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />
                    <motion.div 
                        className="pointer-events-none absolute -bottom-12 -left-10 w-40 h-40 bg-[#1A936F]/10 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.1, 0.2, 0.1],
                        }}
                        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                    />

                    {/* Animated border accent */}
                    <motion.div
                        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#1ED696]/50 to-transparent"
                        animate={{
                            opacity: [0.3, 0.7, 0.3],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                    
                    <AnimatePresence mode="wait" custom={direction}>
                        {activeTab === 'form' ? (
                            <motion.div
                                key="form"
                                custom={direction}
                                initial={{ x: direction > 0 ? 50 : -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: direction < 0 ? 50 : -50, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="p-5 sm:p-6 relative"
                            >
                                <motion.form 
                                    action="https://formspree.io/f/xgegpyra" 
                                    method="POST" 
                                    onSubmit={handleSubmit} 
                                    className="space-y-4"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="show"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {/* Name Input */}
                                        <motion.div 
                                            className="relative group"
                                            variants={itemVariants}
                                        >
                                            <motion.div
                                                className="absolute -inset-0.5 bg-gradient-to-r from-[#1A936F]/20 to-[#1ED696]/20 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"
                                            />
                                            <input
                                                type="text" 
                                                id="name" 
                                                name="name" 
                                                placeholder=" "
                                                className="peer relative w-full bg-[#0a0a0a]/80 backdrop-blur-sm border border-[#1A936F]/30 text-[#FCFFF0] rounded-lg p-3 pt-5 focus:border-[#1ED696] focus:shadow-[0_0_15px_rgba(30,214,150,0.2)] transition-all outline-none"
                                                required
                                            />
                                            <label htmlFor="name" className="absolute text-xs text-[#8FE7C3] top-1.5 left-3 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-[#1ED696]">
                                                Name
                                            </label>
                                        </motion.div>
                                        
                                        {/* Email Input */}
                                        <motion.div 
                                            className="relative group"
                                            variants={itemVariants}
                                        >
                                            <motion.div
                                                className="absolute -inset-0.5 bg-gradient-to-r from-[#1A936F]/20 to-[#1ED696]/20 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"
                                            />
                                            <input
                                                type="email" 
                                                id="email" 
                                                name="email" 
                                                placeholder=" "
                                                className="peer relative w-full bg-[#0a0a0a]/80 backdrop-blur-sm border border-[#1A936F]/30 text-[#FCFFF0] rounded-lg p-3 pt-5 focus:border-[#1ED696] focus:shadow-[0_0_15px_rgba(30,214,150,0.2)] transition-all outline-none"
                                                required
                                            />
                                            <label htmlFor="email" className="absolute text-xs text-[#8FE7C3] top-1.5 left-3 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-[#1ED696]">
                                                Email
                                            </label>
                                        </motion.div>
                                    </div>
                                    
                                    {/* Message Textarea */}
                                    <motion.div 
                                        className="relative group"
                                        variants={itemVariants}
                                    >
                                        <motion.div
                                            className="absolute -inset-0.5 bg-gradient-to-r from-[#1A936F]/20 to-[#1ED696]/20 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"
                                        />
                                        <textarea
                                            id="message" 
                                            name="message" 
                                            rows="4" 
                                            placeholder=" "
                                            className="peer relative w-full bg-[#0a0a0a]/80 backdrop-blur-sm border border-[#1A936F]/30 text-[#FCFFF0] rounded-lg p-3 pt-5 focus:border-[#1ED696] focus:shadow-[0_0_15px_rgba(30,214,150,0.2)] transition-all resize-none outline-none"
                                            required
                                        />
                                        <label htmlFor="message" className="absolute text-xs text-[#8FE7C3] top-1.5 left-3 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-[#1ED696]">
                                            Message
                                        </label>
                                    </motion.div>
                                    
                                    {/* Form Footer */}
                                    <motion.div 
                                        className="flex justify-between items-center pt-2"
                                        variants={itemVariants}
                                    >
                                        <AnimatePresence mode="wait">
                                            {formStatus === 'success' && (
                                                <motion.span 
                                                    className="text-sm text-[#1ED696] flex items-center gap-2"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 10 }}
                                                >
                                                    ✓ Message sent successfully!
                                                </motion.span>
                                            )}
                                            {formStatus === 'error' && (
                                                <motion.span 
                                                    className="text-sm text-red-400"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 10 }}
                                                >
                                                    ✗ Something went wrong
                                                </motion.span>
                                            )}
                                            {(formStatus === 'idle' || formStatus === 'sending') && (
                                                <div />
                                            )}
                                        </AnimatePresence>
                                        
                                        <motion.button
                                            type="submit"
                                            className="relative bg-gradient-to-r from-[#114E3C] to-[#1A936F] hover:from-[#1A936F] hover:to-[#1ED696] text-white flex items-center gap-2 py-2.5 px-5 rounded-full shadow-[0_0_20px_rgba(30,214,150,0.25),inset_0_1px_1px_rgba(255,255,255,0.1)] border border-[#1ED696]/20 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
                                            disabled={formStatus === 'sending'}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {/* Shimmer effect */}
                                            <motion.div
                                                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
                                                animate={formStatus !== 'sending' ? {
                                                    x: ['-100%', '200%'],
                                                } : {}}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    repeatDelay: 3,
                                                }}
                                            />
                                            <span className="relative">
                                                {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                                            </span>
                                            <motion.div
                                                animate={formStatus === 'sending' ? { rotate: 360 } : {}}
                                                transition={{ duration: 1, repeat: formStatus === 'sending' ? Infinity : 0, ease: "linear" }}
                                            >
                                                {formStatus === 'sending' ? 
                                                    <FaRegPaperPlane className="text-sm" /> : 
                                                    <FaPaperPlane className="text-sm" />
                                                }
                                            </motion.div>
                                        </motion.button>
                                    </motion.div>
                                </motion.form>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="info"
                                custom={direction}
                                initial={{ x: direction > 0 ? 50 : -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: direction < 0 ? 50 : -50, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="p-5 sm:p-6 relative"
                            >
                                <motion.div 
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="show"
                                >
                                    {/* Contact Info */}
                                    <motion.div variants={itemVariants}>
                                        <div className="flex items-center gap-2 mb-4">
                                            <motion.div
                                                className="h-1 w-8 bg-gradient-to-r from-[#1A936F] to-[#1ED696] rounded-full"
                                                animate={{
                                                    width: ['32px', '40px', '32px'],
                                                }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            />
                                            <h3 className="text-[#1ED696] font-semibold text-lg">Direct Contact</h3>
                                        </div>
                                        <div className="space-y-3">
                                            <ContactLink 
                                                href="mailto:elmasriahmed.dev@gmail.com"
                                                icon={<SiGmail />}
                                                text="elmasriahmed.dev@gmail.com"
                                                delay={0}
                                            />
                                            <ContactLink 
                                                href="tel:+33773225719"
                                                icon={<FaPhone />}
                                                text="+33 7 73 22 57 19"
                                                delay={0.1}
                                            />
                                            <ContactLink 
                                                href="https://t.me/karasuma_renya"
                                                icon={<FaTelegramPlane />}
                                                text="@karasuma_renya"
                                                external
                                                delay={0.2}
                                            />
                                        </div>
                                    </motion.div>
                                    
                                    {/* Other Links */}
                                    <motion.div variants={itemVariants}>
                                        <div className="flex items-center gap-2 mb-4">
                                            <motion.div
                                                className="h-1 w-8 bg-gradient-to-r from-[#1A936F] to-[#1ED696] rounded-full"
                                                animate={{
                                                    width: ['32px', '40px', '32px'],
                                                }}
                                                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                            />
                                            <h3 className="text-[#1ED696] font-semibold text-lg">Other Links</h3>
                                        </div>
                                        <div className="space-y-3">
                                            <ContactLink 
                                                href="https://github.com/0asaca0rum0"
                                                icon={<FaGithub />}
                                                text="github.com/0asaca0rum0"
                                                external
                                                delay={0}
                                            />
                                            <ContactLink 
                                                href="/cv.pdf"
                                                icon={<FaDownload />}
                                                text="Download CV"
                                                download
                                                delay={0.1}
                                            />
                                            <motion.div 
                                                className="flex items-center gap-3 text-[#FCFFF0]/80 px-3 py-2 rounded-lg bg-[#0a0a0a]/40 backdrop-blur-sm border border-[#1A936F]/20"
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                <span className="p-2 bg-[#1A936F]/20 rounded-full text-[#1ED696]">
                                                    <FaUser size={14} />
                                                </span>
                                                <span className="text-sm">Elmasri Ahmed</span>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.section>
    );
};

// Contact Link Component with animations
const ContactLink = ({ href, icon, text, external, download, delay = 0 }) => {
    return (
        <motion.a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            download={download}
            className="group flex items-center gap-3 text-[#FCFFF0]/80 hover:text-[#FCFFF0] px-3 py-2 rounded-lg bg-[#0a0a0a]/40 backdrop-blur-sm border border-[#1A936F]/20 hover:border-[#1ED696]/40 hover:bg-[#1A936F]/10 transition-all relative overflow-hidden"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
            whileHover={{ x: 4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Hover glow effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#1A936F]/0 via-[#1ED696]/10 to-[#1A936F]/0 opacity-0 group-hover:opacity-100"
                initial={false}
                transition={{ duration: 0.3 }}
            />
            
            <motion.span 
                className="relative p-2 bg-[#1A936F]/20 group-hover:bg-[#1A936F]/30 rounded-full text-[#1ED696] transition-colors"
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.4 }}
            >
                {React.cloneElement(icon, { size: 14 })}
            </motion.span>
            <span className="relative text-sm flex-1">{text}</span>
            
            {/* Arrow indicator */}
            <motion.span
                className="relative text-[#1ED696] opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ x: -5 }}
                whileHover={{ x: 0 }}
            >
                →
            </motion.span>
        </motion.a>
    );
};

export default Contact;