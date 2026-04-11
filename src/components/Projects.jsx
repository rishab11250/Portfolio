export const projects = [
    {
        title: "Chewy Clone",
        image: 'https://res.cloudinary.com/dhr1jtyi2/image/upload/v1770453383/046bccdc-2b29-426c-8e0e-81a629726634.png',
        skills: ["HTML", "CSS"],
        category: "Frontend",
        description: "A high-fidelity frontend clone of the Chewy e-commerce platform, focusing on pixel-perfect responsive design and complex CSS layouts.",
        codeLink: "https://github.com/rishab11250/chewy-clone",
        demoLink: "https://chewy-rishab.netlify.app/"
    },
    {
        title: "LoadShare Clone",
        image: "https://res.cloudinary.com/dhr1jtyi2/image/upload/v1770453402/loadshare_wex7g0.png",
        skills: ["HTML", "CSS"],
        category: "Frontend",
        description: "A functional landing page clone of LoadShare, showcasing modern UI components and fluid navigation transitions using vanilla web technologies.",
        codeLink: "https://github.com/rishab11250/loadshare-clone",
        demoLink: "https://loadshare-rishab.netlify.app/"
    },
    {
        title: "LiveCoinWatch Clone",
        image: "https://res.cloudinary.com/dhr1jtyi2/image/upload/v1770453397/livecoinwatch_opaip4.png",
        skills: ["HTML", "CSS"],
        category: "Frontend",
        description: "An interactive cryptocurrency tracking dashboard that mimics LiveCoinWatch, featuring real-time-like data visualization and sleek dark mode UI.",
        codeLink: "https://github.com/rishab11250/livecoinwatch-clone",
        demoLink: "https://livecoinwatch-rishab.netlify.app/"
    },
    {
        title: "Master Quiz",
        image: "https://res.cloudinary.com/dhr1jtyi2/image/upload/v1770453394/cssquiz_fcpmfd.png",
        skills: ["React", "AI Studio", "Framer Motion"],
        category: "AI",
        description: "An AI-powered quiz application that generates dynamic questions about CSS, featuring smooth animations and real-time score tracking.",
        codeLink: "https://github.com/rishab11250/css-quiz",
        demoLink: "https://cssquizrishab.netlify.app/"
    },
    {
        title: "StudyFlow AI",
        image: "https://res.cloudinary.com/dhr1jtyi2/image/upload/v1773835083/Screenshot_2026-03-18_172743_sea9ak.png",
        skills: ["React", "Gemini AI", "Three.js", "Zustand"],
        category: "Hackathon",
        description: "A comprehensive learning platform combining Gemini AI with real-time analytics to help students optimize study habits and manage tasks.",
        codeLink: "https://github.com/rishab11250/qBit-Coders",
        demoLink: "https://studyflow-neon.vercel.app/"
    },
    {
        title: "AadhaarPulse",
        image: "https://res.cloudinary.com/dhr1jtyi2/image/upload/v1774686811/6831c009-d80c-4e08-a996-c3a47695e0aa.png",
        skills: ["MERN Stack", "Recharts", "Tailwind CSS"],
        category: "Hackathon",
        description: "A data-driven monitoring system for Aadhaar metrics, providing deep insights through interactive charts and secure authentication.",
        codeLink: "https://github.com/rishab11250/UDAI",
        demoLink: "https://udai-n6dk.onrender.com/"
    },
    {
        title: "Cura",
        image: "https://res.cloudinary.com/dhr1jtyi2/image/upload/v1774686272/Screenshot_2026-03-28_135327_vy2dz6.png",
        skills: ["MERN Stack", "AI", "Python", "Tailwind CSS"],
        category: "Hackathon",
        description: "A cutting-edge AI-powered health assistant designed to help users monitor and manage their well-being with personalized recommendations.",
        codeLink: "https://github.com/rishab11250",
        demoLink: "https://cura-nu-six.vercel.app/"
    },
    {
        title: "DataTime Machine",
        image: "https://res.cloudinary.com/dhr1jtyi2/image/upload/v1775736236/beygag2tbfhqmbaz3wpj.png",
        skills: ["MERN Stack", "Groq AI", "Custom Scheduler", "Tailwind CSS"],
        category: "Hackathon",
        description: "Engineered a full-stack monitoring system with AI-driven forecasting and real-time change detection. Features a 'Time Machine' historical scrubbing tool using a custom timeline slider and snapshots.",
        codeLink: "https://github.com/rishab11250",
        demoLink: "https://github.com/rishab11250"
    }
];

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TiltCard from './TiltCard';

const Projects = () => {
    const [filter, setFilter] = useState("All");
    const [showAll, setShowAll] = useState(false);

    const categories = ["All", "Full Stack", "Frontend", "AI", "Hackathon"];

    const getSkillStyle = (skill) => {
        const colors = {
            "HTML": { bg: "rgba(227, 79, 38, 0.15)", text: "#E34F26", border: "#E34F26" },
            "CSS": { bg: "rgba(21, 114, 182, 0.15)", text: "#1572B6", border: "#1572B6" },
            "CSS3": { bg: "rgba(21, 114, 182, 0.15)", text: "#1572B6", border: "#1572B6" },
            "JavaScript": { bg: "rgba(247, 223, 30, 0.15)", text: "#F7DF1E", border: "#F7DF1E" },
            "React": { bg: "rgba(97, 218, 251, 0.15)", text: "#61DAFB", border: "#61DAFB" },
            "Node.js": { bg: "rgba(51, 153, 51, 0.15)", text: "#339933", border: "#339933" },
            "MongoDB": { bg: "rgba(71, 162, 72, 0.15)", text: "#47A248", border: "#47A248" },
            "Firebase": { bg: "rgba(255, 202, 40, 0.15)", text: "#FFCA28", border: "#FFCA28" },
            "Tailwind CSS": { bg: "rgba(56, 189, 248, 0.15)", text: "#38BDF8", border: "#38BDF8" },
            "AI Studio": { bg: "rgba(66, 133, 244, 0.15)", text: "#4285F4", border: "#4285F4" },
            "MERN Stack": { bg: "rgba(99, 102, 241, 0.15)", text: "#6366F1", border: "#6366F1" },
            "Gemini AI": { bg: "rgba(66, 133, 244, 0.15)", text: "#4285F4", border: "#4285F4" },
            "Three.js": { bg: "rgba(0, 0, 0, 0.15)", text: "#ffffff", border: "#ffffff" },
            "Zustand": { bg: "rgba(68, 63, 53, 0.15)", text: "#443f35", border: "#443f35" },
            "GSAP": { bg: "rgba(136, 206, 2, 0.15)", text: "#88CE02", border: "#88CE02" },
            "Framer Motion": { bg: "rgba(255, 0, 255, 0.15)", text: "#ff00ff", border: "#ff00ff" },
            "JWT Auth": { bg: "rgba(0, 185, 241, 0.15)", text: "#00b9f1", border: "#00b9f1" },
            "Recharts": { bg: "rgba(34, 187, 187, 0.15)", text: "#22BBBB", border: "#22BBBB" },
            "HealthTech": { bg: "rgba(16, 185, 129, 0.15)", text: "#10B981", border: "#10B981" },
            "AI": { bg: "rgba(100, 100, 255, 0.15)", text: "#6464FF", border: "#6464FF" }
        };

        const style = colors[skill] || { bg: "rgba(114, 92, 173, 0.15)", text: "#dcd6f7", border: "rgba(114, 92, 173, 0.3)" };

        return {
            backgroundColor: style.bg,
            color: style.text,
            border: `1px solid ${style.border}`,
        };
    };

    const filteredProjects = filter === "All"
        ? projects
        : projects.filter(p => {
            if (filter === "Full Stack") return p.category === "Full Stack" || p.skills.includes("MERN Stack") || p.skills.includes("Node.js");
            if (filter === "Frontend") return p.category === "Frontend" || p.skills.includes("HTML") || p.skills.includes("React")|| p.skills.includes("CSS");
            if (filter === "AI") return p.category === "AI" || p.skills.includes("AI Studio") || p.skills.includes("AI") || p.skills.includes("Gemini AI");
            if (filter === "Hackathon") return p.category === "Hackathon";
            return p.category === filter;
        });

    const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3);

    return (
        <section className="page-section projects" id="projects">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                Projects
            </motion.h1>

            {/* Filter Buttons */}
            <div className="project-filters">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`filter-btn ${filter === cat ? 'active' : ''}`}
                        onClick={() => setFilter(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <motion.div className="project-list" layout>
                <AnimatePresence>
                    {displayedProjects.map((project) => (
                        <motion.div
                            key={project.title}
                            className="project-card-wrapper"
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                        >
                            <TiltCard>
                                <div className="project-card" style={{ transform: "translateZ(20px)" }}>
                                    <div className="project-img-container" style={{ position: 'relative' }}>
                                        <img src={project.image} alt={project.title} loading="lazy" />
                                        
                                        {/* Hover Description Overlay */}
                                        <motion.div
                                            className="project-overlay"
                                            initial={{ opacity: 0 }}
                                            whileHover={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                background: 'rgba(10, 10, 20, 0.95)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: '1.5rem',
                                                textAlign: 'center',
                                                backdropFilter: 'blur(4px)'
                                            }}
                                        >
                                            <p style={{
                                                color: '#fff',
                                                fontSize: '0.95rem',
                                                lineHeight: '1.6',
                                                margin: 0,
                                                fontWeight: '500',
                                                fontFamily: 'Share Tech Mono, monospace'
                                            }}>
                                                {project.description}
                                            </p>
                                        </motion.div>
                                    </div>
                                    <div className="project-info">
                                        <h2>{project.title}</h2>
                                        <div className="project-skills">
                                            {project.skills.map((skill, i) => (
                                                <span
                                                    key={i}
                                                    className="skill-pill"
                                                    style={getSkillStyle(skill)}
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="project-links">
                                            <a href={project.codeLink} className="btn-small btn-code" target="_blank" rel="noopener noreferrer">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                                                GitHub
                                            </a>
                                            {project.demoLink && (
                                                <a href={project.demoLink} className="btn-small btn-demo" target="_blank" rel="noopener noreferrer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                                    Live Demo
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredProjects.length > 3 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ textAlign: 'center', marginTop: '3rem' }}
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowAll(!showAll)}
                        style={{
                            padding: '1rem 3rem',
                            background: 'linear-gradient(135deg, #61DAFB 0%, #4A90E2 100%)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '1.1rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            boxShadow: '0 4px 20px rgba(97, 218, 251, 0.3)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.75rem'
                        }}
                    >
                        {showAll ? 'Show Less' : `View All ${filteredProjects.length} Projects`}
                        <motion.svg
                            animate={{ rotate: showAll ? 180 : 0 }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </motion.svg>
                    </motion.button>
                </motion.div>
            )}
        </section>
    );
};

export default Projects;
