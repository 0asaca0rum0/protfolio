import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaGithub, FaTelegramPlane, FaPhone, FaDownload } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
};

const Contact = () => {
    const [formStatus, setFormStatus] = useState('idle');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('sending');
        const formData = new FormData(e.target);
        formData.append('access_key', '3d2c2f6f-f1ae-4a0b-b8c1-8ed16903f2d9');
        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                setFormStatus('success');
                e.target.reset();
                setTimeout(() => setFormStatus('idle'), 4000);
            } else {
                setFormStatus('error');
                setTimeout(() => setFormStatus('idle'), 4000);
            }
        } catch {
            setFormStatus('error');
            setTimeout(() => setFormStatus('idle'), 4000);
        }
    };

    return (
        <section className="w-full py-10 px-4 font-['Comfortaa'] relative overflow-hidden" id="contact">
            {/* Static ambient glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#1A936F]/6 rounded-full" style={{ filter: 'blur(80px)' }} />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1ED696]/5 rounded-full" style={{ filter: 'blur(60px)' }} />
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    className="mb-10 text-center"
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        Get In{' '}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1A936F] to-[#1ED696]">
                            Touch
                        </span>
                    </h2>
                    <p className="text-[#8FE7C3]/60 text-sm">
                        Have a project in mind or want to collaborate? I'd love to hear from you.
                    </p>
                </motion.div>

                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Contact Form — wider column */}
                    <motion.div
                        className="lg:col-span-3 bg-[#0c0c0c] border border-[#1A936F]/20 rounded-2xl p-6 sm:p-8"
                        variants={fadeUp}
                        custom={1}
                        initial="hidden"
                        animate="show"
                    >
                        <h3 className="text-[#1ED696] font-semibold text-base mb-5">Send a message</h3>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            <input type="hidden" name="access_key" value="3d2c2f6f-f1ae-4a0b-b8c1-8ed16903f2d9" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Field id="name" name="name" label="Name" type="text" required />
                                <Field id="email" name="email" label="Email" type="email" required />
                            </div>
                            <Field id="message" name="message" label="Message" textarea rows={5} required />

                            <div className="flex items-center justify-between pt-1">
                                <AnimatePresence mode="wait">
                                    {formStatus === 'success' && (
                                        <motion.span
                                            key="ok"
                                            className="text-sm text-[#1ED696]"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            ✓ Message sent!
                                        </motion.span>
                                    )}
                                    {formStatus === 'error' && (
                                        <motion.span
                                            key="err"
                                            className="text-sm text-red-400"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            ✗ Something went wrong
                                        </motion.span>
                                    )}
                                    {(formStatus === 'idle' || formStatus === 'sending') && (
                                        <span key="empty" />
                                    )}
                                </AnimatePresence>

                                <motion.button
                                    type="submit"
                                    disabled={formStatus === 'sending'}
                                    className="flex items-center gap-2 bg-[#1A936F] hover:bg-[#1ED696] text-white hover:text-[#0a0a0a] font-semibold py-2.5 px-6 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    {formStatus === 'sending' ? 'Sending…' : 'Send'}
                                    <FaPaperPlane size={12} />
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>

                    {/* Contact Info — narrower column */}
                    <motion.div
                        className="lg:col-span-2 flex flex-col gap-4"
                        variants={fadeUp}
                        custom={2}
                        initial="hidden"
                        animate="show"
                    >
                        <div className="bg-[#0c0c0c] border border-[#1A936F]/20 rounded-2xl p-6 flex-1">
                            <h3 className="text-[#1ED696] font-semibold text-base mb-5">Direct contact</h3>
                            <div className="space-y-3">
                                <ContactLink
                                    href="mailto:elmasriahmed.dev@gmail.com"
                                    icon={<SiGmail />}
                                    label="elmasriahmed.dev@gmail.com"
                                />
                                <ContactLink
                                    href="tel:+33773225719"
                                    icon={<FaPhone />}
                                    label="+33 7 73 22 57 19"
                                />
                                <ContactLink
                                    href="https://t.me/karasuma_renya"
                                    icon={<FaTelegramPlane />}
                                    label="@karasuma_renya"
                                    external
                                />
                            </div>
                        </div>

                        <div className="bg-[#0c0c0c] border border-[#1A936F]/20 rounded-2xl p-6">
                            <h3 className="text-[#1ED696] font-semibold text-base mb-5">Links</h3>
                            <div className="space-y-3">
                                <ContactLink
                                    href="https://github.com/0asaca0rum0"
                                    icon={<FaGithub />}
                                    label="github.com/0asaca0rum0"
                                    external
                                />
                                <ContactLink
                                    href="/cv.pdf"
                                    icon={<FaDownload />}
                                    label="Download CV"
                                    download
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

/* Floating-label text input / textarea */
const Field = ({ id, name, label, type = 'text', textarea, rows, required }) => {
    const base =
        'peer w-full bg-[#0a0a0a] border border-[#1A936F]/25 text-[#FCFFF0] rounded-xl px-4 pt-6 pb-2.5 text-sm focus:border-[#1ED696] focus:outline-none transition-colors placeholder-transparent';

    return (
        <div className="relative">
            {textarea ? (
                <textarea
                    id={id}
                    name={name}
                    rows={rows}
                    className={`${base} resize-none`}
                    placeholder=" "
                    required={required}
                />
            ) : (
                <input
                    id={id}
                    name={name}
                    type={type}
                    className={base}
                    placeholder=" "
                    required={required}
                />
            )}
            <label
                htmlFor={id}
                className="absolute left-4 top-1.5 text-[10px] text-[#1ED696]/70 tracking-wide uppercase pointer-events-none transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#8FE7C3]/50 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-1.5 peer-focus:-translate-y-0 peer-focus:text-[10px] peer-focus:text-[#1ED696]/70 peer-focus:uppercase peer-focus:tracking-wide"
            >
                {label}
            </label>
        </div>
    );
};

/* Contact link row */
const ContactLink = ({ href, icon, label, external, download }) => (
    <motion.a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        download={download}
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-transparent hover:border-[#1A936F]/30 hover:bg-[#1A936F]/8 transition-colors duration-150 group"
        whileHover={{ x: 3 }}
        transition={{ duration: 0.15 }}
    >
        <span className="text-[#1ED696] text-sm flex-shrink-0">
            {React.cloneElement(icon, { size: 15 })}
        </span>
        <span className="text-[#FCFFF0]/70 group-hover:text-[#FCFFF0] text-sm transition-colors duration-150 truncate">
            {label}
        </span>
    </motion.a>
);

export default Contact;