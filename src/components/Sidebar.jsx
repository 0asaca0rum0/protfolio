import { motion } from "framer-motion";
import { FaGithub, FaTelegramPlane, FaPhone, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaUser } from "react-icons/fa6";

export default function Sidebar({ className }) {
  return (
    <motion.aside 
      className={`sidebar flex flex-col justify-between p-6 ${className}`}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <img 
            src="/self.webp" 
            alt="Ahmed Elmasri" 
            className="w-24 h-24 rounded-full mb-6 border-2 border-[#1ED696] shadow-lg object-cover mx-auto md:mx-0" 
          />
        </motion.div>
        
        <motion.h1 
          className="text-3xl font-bold mb-2 text-[#FAF3DD]"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          ELMASRI Ahmed
        </motion.h1>
        
        <motion.h2 
          className="text-lg font-semibold text-[#1ED696] mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Full Stack Developer & Server Engineer
        </motion.h2>
        
        <motion.p 
          className="text-[#FCFFF0]/80 leading-relaxed mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Passionate about building scalable web applications and robust backend systems. 
          Experienced with React, Node.js, and cloud infrastructure. 
          Always learning, always building.
        </motion.p>
        
        {/* Contact Information Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="border-t border-[#1A936F]/30 pt-4 mb-8"
        >
          <h3 className="text-xl font-semibold mb-3 text-[#FAF3DD]">Contact Information</h3>
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2 text-[#FCFFF0]">
              <FaUser className="text-[#8FE7C3]" /> 
              <span>Elmasri Ahmed</span>
            </div>
            
            <a href="mailto:foxdeath100@gmail.com" className="flex items-center gap-2 text-[#FCFFF0] hover:text-[#1ED696] transition">
              <SiGmail className="text-[#8FE7C3]" /> 
              foxdeath100@gmail.com
            </a>
            
            <a href="tel:+213540430098" className="flex items-center gap-2 text-[#FCFFF0] hover:text-[#1ED696] transition">
              <FaPhone className="text-[#8FE7C3]" /> 
              +213540430098
            </a>
            
            <a href="https://www.linkedin.com/in/ahmed-elmasri-149aa626b/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#FCFFF0] hover:text-[#1ED696] transition">
              <FaLinkedin className="text-[#8FE7C3]" /> 
              ahmed-elmasri
            </a>
            
            <a href="https://github.com/0asaca0rum0" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#FCFFF0] hover:text-[#1ED696] transition">
              <FaGithub className="text-[#8FE7C3]" /> 
              0asaca0rum0
            </a>
            
            <a href="https://t.me/karasuma_renya" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#FCFFF0] hover:text-[#1ED696] transition">
              <FaTelegramPlane className="text-[#8FE7C3]" /> 
              @karasuma_renya
            </a>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="border-t border-[#1A936F]/30 pt-4 mb-8"
        >
          <h3 className="text-xl font-semibold mb-3 text-[#FAF3DD]">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {["React", "Node.js", "Next.js", "MongoDB", "Express", "Tailwind CSS"].map((skill) => (
              <span key={skill} className="bg-[#1A936F]/20 text-[#8FE7C3] text-xs px-3 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.aside>
  );
}
