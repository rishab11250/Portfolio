const projects = [
    {
        title: "Chewy Clone",
        image: 'https://res.cloudinary.com/dhr1jtyi2/image/upload/v1770453383/046bccdc-2b29-426c-8e0e-81a629726634.png',
        skills: ["HTML", "CSS"],
        codeLink: "https://github.com/rishab11250/chewy-clone",
        demoLink: "https://chewy-rishab.netlify.app/"
    },
    {
        title: "LoadShare Clone",
        image: "https://res.cloudinary.com/dhr1jtyi2/image/upload/v1770453402/loadshare_wex7g0.png",
        skills: ["HTML", "CSS"],
        codeLink: "https://github.com/rishab11250/loadshare-clone",
        demoLink: "https://loadshare-rishab.netlify.app/"
    },
    {
        title: "LiveCoinWatch Clone",
        image: "https://res.cloudinary.com/dhr1jtyi2/image/upload/v1770453397/livecoinwatch_opaip4.png",
        skills: ["HTML", "CSS"],
        codeLink: "https://github.com/rishab11250/livecoinwatch-clone",
        demoLink: "https://livecoinwatch-rishab.netlify.app/"
    },
    {
        title: "Master Quiz",
        image: "https://res.cloudinary.com/dhr1jtyi2/image/upload/v1770453394/cssquiz_fcpmfd.png",
        skills: ["AI Studio"],
        codeLink: "https://github.com/rishab11250/css-quiz",
        demoLink: "https://cssquizrishab.netlify.app/"
    }
];

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TiltCard from './TiltCard';

const Projects = () => {
    const [filter, setFilter] = useState("All");
    const [showAll, setShowAll] = useState(false);

    const categories = ["All", "Full Stack", "Frontend", "AI"];

    const getSkillStyle = (skill) => {
        const colors = {
            "HTML": { bg: "rgba(227, 79, 38, 0.15)", text: "#E34F26", border: "#E34F26" },
            "CSS": { bg: "rgba(21, 114, 182, 0.15)", text: "#1572B6", border: "#1572B6" },
            "JavaScript": { bg: "rgba(247, 223, 30, 0.15)", text: "#F7DF1E", border: "#F7DF1E" },
            "React": { bg: "rgba(97, 218, 251, 0.15)", text: "#61DAFB", border: "#61DAFB" },
            "Node.js": { bg: "rgba(51, 153, 51, 0.15)", text: "#339933", border: "#339933" },
            "MongoDB": { bg: "rgba(71, 162, 72, 0.15)", text: "#47A248", border: "#47A248" },
            "Firebase": { bg: "rgba(255, 202, 40, 0.15)", text: "#FFCA28", border: "#FFCA28" },
            "Tailwind": { bg: "rgba(56, 178, 172, 0.15)", text: "#38B2AC", border: "#38B2AC" },
            "AI Studio": { bg: "rgba(66, 133, 244, 0.15)", text: "#4285F4", border: "#4285F4" },
            "MERN Stack": { bg: "rgba(99, 102, 241, 0.15)", text: "#6366F1", border: "#6366F1" },
            "Socket.io": { bg: "var(--glass-border)", text: "var(--text-color)", border: "var(--text-color)" },
            "Express": { bg: "var(--glass-border)", text: "var(--text-color)", border: "var(--text-color)" },
            "OpenWeather API": { bg: "rgba(235, 110, 75, 0.15)", text: "#EB6E4B", border: "#EB6E4B" }
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
            if (filter === "Full Stack") return p.skills.includes("MERN Stack") || p.skills.includes("Node.js");
            if (filter === "Frontend") return p.skills.includes("HTML") || p.skills.includes("React");
            if (filter === "AI") return p.skills.includes("AI Studio");
            return true;
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
                                    <div className="project-img-container">
                                        <img src={project.image} alt={project.title} />
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
                                                Code
                                            </a>
                                            <a href={project.demoLink} className="btn-small btn-demo" target="_blank" rel="noopener noreferrer">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                                Live Demo
                                            </a>
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
