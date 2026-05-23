import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TiltCard from './TiltCard';
import { getSkillStyle } from '../utils/skills';
import { projects } from '../data';

const categories = ["All", "Full Stack", "Frontend", "AI", "Hackathon"];

const Projects = () => {
    const [filter, setFilter] = useState("All");
    const [showAll, setShowAll] = useState(false);
    const filteredProjects = filter === "All"
        ? projects
        : projects.filter(p => {
            if (filter === "Full Stack") return p.category === "Full Stack" || p.skills.includes("Node.js");
            if (filter === "Frontend") return p.category === "Frontend" || p.skills.includes("HTML") || p.skills.includes("React")|| p.skills.includes("CSS");
            if (filter === "AI") return p.category === "AI" || p.skills.includes("AI");
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
