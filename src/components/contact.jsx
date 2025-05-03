import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@material-tailwind/react';
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
    
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, transition: { duration: 0.2 } }
    };
    
    const tabVariants = {
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
    
    return (
        <motion.section 
            className='w-full max-w-3xl mx-auto px-3 py-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            id='contact'
        >
            <motion.div 
                className="text-center mb-6"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <h2 className='text-2xl md:text-3xl font-bold text-[#FAF3DD] inline-flex items-center gap-2'>
                    <span className="text-[#1ED696]">📬</span> Get In Touch
                </h2>
                <p className="text-sm text-[#8FE7C3] mt-2">I'd love to hear from you!</p>
            </motion.div>
            
            {/* Tab Navigation - Enhanced with active indicator animation */}
            <div className="flex justify-center mb-6">
                <div className="bg-[#0a0a0a] rounded-full p-1 inline-flex relative">
                    <motion.div 
                        className="absolute h-full top-0 rounded-full bg-[#1A936F] z-0"
                        initial={false}
                        animate={{ 
                            left: activeTab === 'form' ? '0%' : '50%',
                            width: '50%'
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                    <button 
                        className={`px-4 py-2 text-sm rounded-full transition-all relative z-10 ${activeTab === 'form' ? 'text-white' : 'text-[#8FE7C3] hover:text-[#1ED696]'}`}
                        onClick={() => switchTab('form')}
                    >
                        Message Me
                    </button>
                    <button 
                        className={`px-4 py-2 text-sm rounded-full transition-all relative z-10 ${activeTab === 'info' ? 'text-white' : 'text-[#8FE7C3] hover:text-[#1ED696]'}`}
                        onClick={() => switchTab('info')}
                    >
                        Contact Info
                    </button>
                </div>
            </div>
            
            {/* Content Container with Animation */}
            <motion.div 
                className="bg-[#131313] rounded-xl border border-[#1A936F]/20 shadow-lg overflow-hidden"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <AnimatePresence mode="wait" custom={direction}>
                    {/* Contact Form Tab */}
                    {activeTab === 'form' && (
                        <motion.div
                            key="form"
                            custom={direction}
                            variants={tabVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="p-6"
                        >
                            <form
                                action="https://formspree.io/f/xgegpyra"
                                method="POST"
                                onSubmit={handleSubmit}
                                className="space-y-4"
                            >
                                <motion.div 
                                    variants={itemVariants}
                                    className='grid grid-cols-2 gap-4'
                                >
                                    <div className='relative group'>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder=" "
                                            className="peer w-full bg-[#0a0a0a] border border-[#1A936F]/30 text-[#FCFFF0] rounded-lg p-2 pt-4 focus:outline-none focus:border-[#1ED696] transition-all"
                                            required
                                        />
                                        <label 
                                            htmlFor="name" 
                                            className="absolute text-xs text-[#8FE7C3] top-1 left-3 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs"
                                        >
                                            Name
                                        </label>
                                    </div>
                                    
                                    <div className='relative group'>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder=" "
                                            className="peer w-full bg-[#0a0a0a] border border-[#1A936F]/30 text-[#FCFFF0] rounded-lg p-2 pt-4 focus:outline-none focus:border-[#1ED696] transition-all"
                                            required
                                        />
                                        <label 
                                            htmlFor="email" 
                                            className="absolute text-xs text-[#8FE7C3] top-1 left-3 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs"
                                        >
                                            Email
                                        </label>
                                    </div>
                                </motion.div>
                                
                                <motion.div 
                                    variants={itemVariants}
                                    className='relative group'
                                >
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        placeholder=" "
                                        className="peer w-full bg-[#0a0a0a] border border-[#1A936F]/30 text-[#FCFFF0] rounded-lg p-2 pt-4 focus:outline-none focus:border-[#1ED696] transition-all"
                                    />
                                    <label 
                                        htmlFor="subject" 
                                        className="absolute text-xs text-[#8FE7C3] top-1 left-3 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs"
                                    >
                                        Subject
                                    </label>
                                </motion.div>
                                
                                <motion.div 
                                    variants={itemVariants}
                                    className='relative group'
                                >
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="3"
                                        placeholder=" "
                                        className="peer w-full bg-[#0a0a0a] border border-[#1A936F]/30 text-[#FCFFF0] rounded-lg p-2 pt-4 focus:outline-none focus:border-[#1ED696] transition-all resize-none"
                                        required
                                    />
                                    <label 
                                        htmlFor="message" 
                                        className="absolute text-xs text-[#8FE7C3] top-1 left-3 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs"
                                    >
                                        Message
                                    </label>
                                </motion.div>
                                
                                <motion.div 
                                    variants={itemVariants}
                                    className='flex justify-between items-center pt-1'
                                >
                                    <div className="text-sm">
                                        {formStatus === 'success' && (
                                            <motion.span 
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                className="text-green-500"
                                            >
                                                Message sent successfully! ✓
                                            </motion.span>
                                        )}
                                        {formStatus === 'error' && (
                                            <motion.span 
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                className="text-red-500"
                                            >
                                                Error sending message ✗
                                            </motion.span>
                                        )}
                                    </div>
                                    
                                    <Button
                                        type="submit"
                                        className="bg-[#1A936F] hover:bg-[#1ED696] text-[#FCFFF0] font-medium flex items-center gap-2 py-2 px-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-[0_5px_15px_rgba(30,214,150,0.4)]"
                                        disabled={formStatus === 'sending'}
                                        ripple={true}
                                    >
                                        {formStatus === 'sending' ? (
                                            <>Sending<motion.span 
                                                animate={{ rotate: 360 }}
                                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                className="inline-block"
                                            >
                                                <FaRegPaperPlane size={14} />
                                            </motion.span></>
                                        ) : (
                                            <>Send<FaPaperPlane size={14} /></>
                                        )}
                                    </Button>
                                </motion.div>
                            </form>
                        </motion.div>
                    )}
                    
                    {/* Contact Info Tab */}
                    {activeTab === 'info' && (
                        <motion.div 
                            key="info"
                            custom={direction}
                            variants={tabVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            <div className="flex flex-col gap-4">
                                {[
                                    { 
                                        icon: <SiGmail className="text-[#8FE7C3]" size={20} />,
                                        text: "foxdeath100@gmail.com",
                                        href: "mailto:foxdeath100@gmail.com"
                                    },
                                    {
                                        icon: <FaPhone className="text-[#8FE7C3]" size={18} />,
                                        text: "+213 540 430 098",
                                        href: "tel:+213540430098"
                                    },
                                    {
                                        icon: <FaDownload className="text-[#8FE7C3]" size={18} />,
                                        text: "Download Resume/CV",
                                        href: "/cv.pdf",
                                        download: true
                                    }
                                ].map((item, index) => (
                                    <motion.div 
                                        key={index}
                                        variants={itemVariants}
                                        className="flex items-center gap-3 group"
                                        whileHover={{ x: 5 }}
                                    >
                                        <motion.div 
                                            className="w-10 h-10 rounded-full bg-[#1A936F]/20 flex items-center justify-center group-hover:bg-[#1A936F]/30 transition-all"
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                        >
                                            {item.icon}
                                        </motion.div>
                                        <a 
                                            href={item.href} 
                                            download={item.download}
                                            className="text-[#FCFFF0] hover:text-[#1ED696] transition-all duration-300"
                                        >
                                            {item.text}
                                        </a>
                                    </motion.div>
                                ))}
                            </div>
                            
                            <div className="flex flex-col gap-4">
                                {[
                                    {
                                        icon: <FaGithub className="text-[#8FE7C3]" size={20} />,
                                        text: "github.com/0asaca0rum0",
                                        href: "https://github.com/0asaca0rum0",
                                        external: true
                                    },
                                    {
                                        icon: <FaTelegramPlane className="text-[#8FE7C3]" size={20} />,
                                        text: "@karasuma_renya",
                                        href: "https://t.me/karasuma_renya",
                                        external: true
                                    },
                                    {
                                        icon: <FaUser className="text-[#8FE7C3]" size={18} />,
                                        text: "Elmasri Ahmed",
                                        isSpan: true
                                    }
                                ].map((item, index) => (
                                    <motion.div 
                                        key={index}
                                        variants={itemVariants}
                                        className="flex items-center gap-3 group"
                                        whileHover={{ x: 5 }}
                                    >
                                        <motion.div 
                                            className="w-10 h-10 rounded-full bg-[#1A936F]/20 flex items-center justify-center group-hover:bg-[#1A936F]/30 transition-all"
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                        >
                                            {item.icon}
                                        </motion.div>
                                        {item.isSpan ? (
                                            <span className="text-[#FCFFF0]">{item.text}</span>
                                        ) : (
                                            <a 
                                                href={item.href} 
                                                target={item.external ? "_blank" : undefined}
                                                rel={item.external ? "noopener noreferrer" : undefined}
                                                className="text-[#FCFFF0] hover:text-[#1ED696] transition-all duration-300"
                                            >
                                                {item.text}
                                            </a>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.section>
    );
};

export default Contact;