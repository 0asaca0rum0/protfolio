import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
// Split icon imports into dynamic imports
import {
	FaReact,
	FaNodeJs,
	FaServer,
	FaLinux,
	FaPython,
    FaChevronCircleRight,
    FaChevronCircleLeft,
} from "react-icons/fa";
import { TbBrandNextjs, TbBrandMysql } from "react-icons/tb";
import { SiTailwindcss, SiNginx, SiOpenai, SiNvidia } from "react-icons/si";
import { BiLogoGoLang } from "react-icons/bi";

// --- Tech list data (unchanged) ---
const techList = [
	{
		name: "React",
		icon: FaReact,
		lightColor: "#61DAFB",
		darkColor: "#00D8FF",
		level: 90,
	},
	{
		name: "Next.js",
		icon: TbBrandNextjs,
		lightColor: "#000000",
		darkColor: "#FFFFFF",
		level: 85,
	},
	{
		name: "Tailwind CSS",
		icon: SiTailwindcss,
		lightColor: "#38BDF8",
		darkColor: "#06B6D4",
		level: 95,
	},
	{
		name: "Node.js",
		icon: FaNodeJs,
		lightColor: "#68A063",
		darkColor: "#8CC84B",
		level: 80,
	},
	{
		name: "Express",
		icon: FaServer,
		lightColor: "#808080",
		darkColor: "#CCCCCC",
		level: 75,
	},
	{
		name: "MySQL",
		icon: TbBrandMysql,
		lightColor: "#00758F",
		darkColor: "#F29111",
		level: 70,
	},
	{
		name: "Nginx",
		icon: SiNginx,
		lightColor: "#009639",
		darkColor: "#00FF00",
		level: 65,
	},
	{
		name: "Linux",
		icon: FaLinux,
		lightColor: "#FCC624",
		darkColor: "#FFFFFF",
		level: 85,
	},
	{
		name: "Python",
		icon: FaPython,
		lightColor: "#3776AB",
		darkColor: "#3776AB",
		level: 80,
	},
	{
		name: "Go",
		icon: BiLogoGoLang,
		lightColor: "#00ADD8",
		darkColor: "#00ADD8",
		level: 40,
		customColor: "#FFDD00",
	},
	{
		name: "NLP (Learning)",
		icon: SiOpenai,
		lightColor: "#10A37F",
		darkColor: "#10A37F",
		level: 30,
		learning: true,
	},
	{
		name: "Image Processing (Learning)",
		icon: SiNvidia,
		lightColor: "#76B900",
		darkColor: "#76B900",
		level: 25,
		learning: true,
	},
];

// --- getLevelColor function (unchanged) ---
const getLevelColor = (tech) => {
	if (tech.learning) return "linear-gradient(90deg, #F29111 0%, #FFB347 100%)";
	if (tech.level >= 90)
		return "linear-gradient(90deg, #0E8A5F 0%, #1ED696 100%)";
	if (tech.level >= 70)
		return "linear-gradient(90deg, #114E3C 0%, #1A936F 100%)";
	if (tech.level >= 40)
		return "linear-gradient(90deg, #2B4B3E 0%, #5D9B84 100%)";
	return "linear-gradient(90deg, #31403B 0%, #588C7E 100%)";
};

const OrbitalTechCard = ({
	tech,
	isDarkMode,
	rotation,
	distance,
	isFocused,
	isTransitioning,
	onClick,
}) => {
	const orbitRadius = distance;
	const spacingFactor = 2; // Keep this value
	
	// Modify the position calculation to focus the active card in center
    // To move the center of the circle to the left, subtract a fixed offset from positionX.
    // Responsive offset based on screen width
    let offset = 100;

    const positionX = Math.cos(rotation) * orbitRadius * spacingFactor - offset;
    const positionZ = Math.sin(rotation) * orbitRadius * spacingFactor;
	
	// Keep existing scale/opacity/zIndex calculations
	const scale = isFocused
		? 1
		: 0.65 + ((positionZ + orbitRadius) / (2 * orbitRadius)) * 0.15;

	// More dramatic opacity difference for better depth perception
	const opacity = isFocused
		? 1
		: 0.5 + ((positionZ + orbitRadius) / (2 * orbitRadius)) * 0.4;

	// Increased z-index contrast to prevent conflicts
	const zIndex = isFocused ? 100 : Math.floor((positionZ + orbitRadius) * 5);

	return (
		<motion.div
			className="absolute left-1/2 top-1/2"
			style={{
				x: positionX,
				zIndex,
				transform: `translate(-50%, -50%) translateZ(${positionZ}px) scale(${scale})`,
				opacity,
				transition: isTransitioning ? 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.8s ease' : 'none',
			}}
			whileHover={{ scale: isTransitioning ? scale : scale * 1.05 }}
			onClick={onClick}
		>
			<div
				className={`
                bg-[#121212] backdrop-blur-sm border rounded-xl overflow-hidden 
                transition-all duration-300 w-[180px] h-[220px] md:w-[210px] md:h-[250px] 
                flex flex-col shadow-lg
                ${
									isFocused
										? "border-[#1ED696] shadow-[0_0_32px_rgba(30,214,150,0.25)]"
										: "border-[#1A936F]/20"
								}
            `}
			>
				<div className="relative flex flex-col items-center justify-center h-full p-4 space-y-3">
					{" "}
					{/* Changed to justify-between for better spacing if needed */}
					{isFocused && (
						<div className="absolute inset-0 pointer-events-none">
							<div className="absolute top-1/2 left-1/2 w-[220px] h-[220px] -translate-x-1/2 -translate-y-1/2">
								<div className="absolute inset-0 border border-[#1ED696]/20 rounded-full animate-spin-slow"></div>
								<div className="absolute inset-3 border border-[#1ED696]/10 rounded-full animate-spin-slow-reverse"></div>
							</div>
						</div>
					)}
					<div className="relative mb-2 mt-1 text-center">
						{" "}
						{/* Added text-center for icon alignment */}
						<div
							className={`absolute inset-0 blur-lg rounded-full ${
								isFocused ? "bg-[#1ED696]/10" : "bg-[#1A936F]/10"
							}`}
						></div>
						<motion.div
							className="relative z-10 inline-block" // Added inline-block
							style={{ color: isDarkMode ? tech.darkColor : tech.lightColor }}
						>
							<tech.icon size={isFocused ? 40 : 32} />
						</motion.div>
					</div>
					<h3
						className={`text-base font-semibold text-center ${
							isFocused ? "text-[#1ED696]" : "text-[#FAF3DD]"
						}`}
					>
						{tech.name}
					</h3>
					<div className="w-full mt-auto">
						{isFocused ? (
							<div className="relative w-16 h-16 mx-auto mb-2">
								<svg className="w-full h-full" viewBox="0 0 100 100">
									<circle
										cx="50"
										cy="50"
										r="40"
										fill="none"
										stroke="#232323"
										strokeWidth="8"
									/>
									<motion.circle
										cx="50"
										cy="50"
										r="40"
										fill="none"
										stroke={
											tech.customColor ||
											(tech.learning ? "#F29111" : "#1ED696")
										}
										strokeWidth="8"
										strokeLinecap="round"
										initial={{ pathLength: 0 }}
										animate={{ pathLength: tech.level / 100 }}
										transition={{ duration: 1.2, ease: "easeOut" }}
										style={{
											transformOrigin: "center",
											rotate: "-90deg",
											strokeDasharray: "251.2", // Circumference of a circle with r=40 (2 * PI * 40)
											// strokeDashoffset is implicitly animated by pathLength
										}}
									/>
									<text
										x="50%"
										y="50%"
										textAnchor="middle"
										dy=".3em"
										className="text-base font-bold fill-[#FCFFF0]"
									>
										{tech.level}%
									</text>
								</svg>
							</div>
						) : (
							<div className="space-y-2">
								<div className="w-full h-1 bg-[#232323] rounded-full overflow-hidden">
									<motion.div
										className="h-full rounded-full"
										style={{
											background: tech.customColor || getLevelColor(tech),
										}}
										initial={{ width: 0 }}
										animate={{ width: `${tech.level}%` }}
										transition={{ duration: 0.7 }}
									/>
								</div>
								<div className="flex justify-between items-center text-xs">
									<span
										className={
											tech.learning ? "text-[#F29111]" : "text-[#8FE7C3]"
										}
									>
										{tech.learning
											? "Learning"
											: tech.level >= 90
											? "Expert"
											: tech.level >= 75
											? "Advanced"
											: "Intermediate"}
									</span>
									<span className="bg-[#232323] px-1.5 py-0.5 rounded-full text-white/80">
										{tech.level}%
									</span>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</motion.div>
	);
};

const OrbitalTechShowcase = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isDarkMode, setIsDarkMode] = useState(true);
	const [rotationAngle, setRotationAngle] = useState(0);
	const [isAutoRotating, setIsAutoRotating] = useState(true);
	const [orbitRadius, setOrbitRadius] = useState(300);
	// Add this new state for animation
	const [isTransitioning, setIsTransitioning] = useState(false);
	
	useEffect(() => {
		const match = window.matchMedia("(prefers-color-scheme: dark)");
		setIsDarkMode(match.matches);
		const listener = (e) => setIsDarkMode(e.matches);
		match.addEventListener("change", listener);
		return () => match.removeEventListener("change", listener);
	}, []);

	useEffect(() => {
		const handleResize = () => {
			const w = window.innerWidth;
			// Increased all radius values for better spacing
			if (w < 480) setOrbitRadius(120);      // Was 120
			else if (w < 640) setOrbitRadius(160); // Was 160
			else if (w < 768) setOrbitRadius(200); // Was 200
			else if (w < 1024) setOrbitRadius(240); // Was 240
			else setOrbitRadius(280);              // Was 280
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Modified auto-rotation effect with smooth transitions
	useEffect(() => {
		let animationFrame;
		const autoRotate = () => {
			if (isAutoRotating && !isTransitioning) {
				setRotationAngle(prev => (prev + 0.002) % (Math.PI * 2));
				animationFrame = requestAnimationFrame(autoRotate);
			}
		};
		if (isAutoRotating && !isTransitioning) {
			animationFrame = requestAnimationFrame(autoRotate);
		}
		return () => cancelAnimationFrame(animationFrame);
	}, [isAutoRotating, isTransitioning]);

	// Positions remain the same
	const techPositions = techList.map((_, i) => {
		const angle = rotationAngle + (i * (Math.PI * 2)) / techList.length;
		return { angle, isFocused: i === currentIndex };
	});

	// Smooth transition to a tech card
	const goToTech = (index) => {
		if (isTransitioning || index === currentIndex) return;
		
		setIsAutoRotating(false);
		setIsTransitioning(true);
		
		// Calculate current and target angles
		const currentAngle = rotationAngle;
		const targetAngle = -(index * (Math.PI * 2)) / techList.length + Math.PI / 2;
		
		// Determine shortest path to rotate (clockwise or counterclockwise)
		let deltaAngle = (targetAngle - currentAngle) % (Math.PI * 2);
		if (deltaAngle > Math.PI) deltaAngle -= Math.PI * 2;
		if (deltaAngle < -Math.PI) deltaAngle += Math.PI * 2;
		
		// Animation variables
		const duration = 800; // ms
		const startTime = Date.now();
		
		// Animate rotation
		const animateRotation = () => {
			const elapsed = Date.now() - startTime;
			const progress = Math.min(elapsed / duration, 1);
			
			// Easing function for smoother animation (ease-out)
			const easeProgress = 1 - Math.pow(1 - progress, 3);
			
			// Calculate new angle
			const newAngle = currentAngle + deltaAngle * easeProgress;
			setRotationAngle(newAngle);
			
			if (progress < 1) {
				requestAnimationFrame(animateRotation);
			} else {
				// Animation complete
				setCurrentIndex(index);
				setIsTransitioning(false);
				setTimeout(() => setIsAutoRotating(true), 3000);
			}
		};
		
		requestAnimationFrame(animateRotation);
	};

	// Initialize rotation so that the first card is at the front
	useEffect(() => {
		goToTech(0);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // Run once on mount

	const goNext = () => goToTech((currentIndex + 1) % techList.length);
	const goPrev = () =>
		goToTech((currentIndex - 1 + techList.length) % techList.length);

    return (
        <section className="w-full my-10  font-['Comfortaa'] bg-gradient-to-b from-[#0A0A0A]/80 to-[#0A0A0A]/30  overflow-clip">
            {/* Added overflow-hidden to section */}
            <div className="relative -my-5 max-w-lg mx-auto text-center px-2">
                {/* ... (header motion elements unchanged) ... */}
                <motion.div
                    className="h-px bg-gradient-to-r from-transparent via-[#1ED696]/40 to-transparent mb-4"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.2 }}
                />
                <motion.h2
                    className="text-2xl md:text-3xl font-bold mb-3"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-[#1A936F] to-[#1ED696]">
                        Technology Orbit
                    </span>
                </motion.h2>
                <motion.p
                    className="text-[#8FE7C3]/80 text-sm md:text-base leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    Explore my technology ecosystem — click any tech to focus
                </motion.p>
                <motion.div
                    className="h-px bg-gradient-to-r from-transparent via-[#1ED696]/40 to-transparent mt-4"
                    initial={{ width: 0 }}
                    animate={{ width: "80%" }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                />
            </div>
            <div className="relative max-w-4xl mx-auto flex flex-col justify-center items-center">
                {/* Center the orbit and arrows */}
                <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] flex items-center justify-center">
                    {/* Navigation arrows */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 z-50 pointer-events-none">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (!isTransitioning) goNext();
                            }}
                            className="pointer-events-auto p-2.5 rounded-full bg-[#181c1b]/90 border border-[#1A936F]/20 
                                text-[#8FE7C3] hover:text-[#1ED696] hover:border-[#1ED696]/40 transition-all shadow-lg"
                        >
                            <FaChevronCircleLeft size={18} className="" />
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation(); 
                                if (!isTransitioning) goPrev();
                            }}
                            className="pointer-events-auto p-2.5 rounded-full bg-[#181c1b]/90 border border-[#1A936F]/20 
                                text-[#8FE7C3] hover:text-[#1ED696] hover:border-[#1ED696]/40 transition-all shadow-lg"
                        >
                            <FaChevronCircleRight size={18} className="" />
                        </button>
                    </div>

                    {/* orbit container: Ensure this height is adequate for cards + perspective*/}
                    <div
                        className="mx-auto w-full h-full relative perspective-[1000px] transform-style-preserve-3d"
                        style={{ perspectiveOrigin: "center center" }}
                        onMouseDown={(e) => {
                            e.stopPropagation();
                            if (!isTransitioning) setIsAutoRotating(false);
                        }}
                        onTouchStart={(e) => {
                            e.stopPropagation();
                            if (!isTransitioning) setIsAutoRotating(false);
                        }}
                        onMouseUp={(e) => {
                            e.stopPropagation();
                            if (!isTransitioning) setTimeout(() => setIsAutoRotating(true), 2000);
                        }}
                        onTouchEnd={(e) => {
                            e.stopPropagation();
                            if (!isTransitioning) setTimeout(() => setIsAutoRotating(true), 2000);
                        }}
                    >
                        {/* orbital rings */}
                        <div className="absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-x-70 opacity-15 pointer-events-none">
                            <div className="absolute w-[90%] h-[90%] top-[5%] left-[5%] border border-[#1ED696]/10 rounded-full"></div>
                            <div className="absolute w-[72%] h-[72%] top-[14%] left-[14%] border border-[#1ED696]/20 rounded-full"></div>
                            <div className="absolute w-[54%] h-[54%] top-[23%] left-[23%] border border-[#1ED696]/30 rounded-full"></div>
                            <div className="absolute w-[36%] h-[36%] top-[32%] left-[32%] border border-[#1ED696]/40 rounded-full"></div>
                            <div className="absolute w-[18%] h-[18%] top-[41%] left-[41%] border border-[#1ED696]/50 rounded-full"></div>
                        </div>
                        {/* Render cards inside a centered container */}
                        <div className="absolute inset-0 origin-center">
                            {/* FIX: Don't use reverse() directly in render as it mutates the array */}
                            {[...techList].map((tech, i) => (
                                <OrbitalTechCard
                                    key={tech.name}
                                    tech={tech}
                                    isDarkMode={isDarkMode}
                                    rotation={techPositions[i].angle}
                                    distance={orbitRadius}
                                    isFocused={techPositions[i].isFocused}
                                    isTransitioning={isTransitioning}
                                    onClick={(e) => {
                                        if (e) {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }
                                        if (!isTransitioning) goToTech(i);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Update navigation buttons to respect transitions */}
                <div className="flex justify-center items-center mt-8 gap-2">
                    {techList.map((tech, i) => (
                        <button
                            key={i}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (!isTransitioning) goToTech(i);
                            }}
                            disabled={isTransitioning}
                            className={`transition-all duration-300 rounded-full ${
                                i === currentIndex
                                    ? "w-6 h-1.5 bg-[#1ED696]"
                                    : "w-2 h-1.5 bg-[#1A936F]/40 hover:bg-[#1A936F]/70"
                            }`}
                            aria-label={`Navigate to ${tech.name}`}
                        >
                            <span className="sr-only">Navigate to {tech.name}</span>
                        </button>
                    )).reverse() /* Reverse the order of the pagination buttons */}
                </div>

                <div className="text-center mt-3">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-[#1ED696] font-medium text-sm md:text-base"
                    >
                        {techList[currentIndex]?.name || ""}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default OrbitalTechShowcase;
