"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import TiltCard from './TiltCard';
import { projects } from '../data/projects';
import { getSkillBadge } from '../data/skills';

const categories = ["All", "Full Stack", "Frontend", "AI", "Hackathon"];

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filteredProjects = filter === "All"
    ? projects
    : projects.filter(p => {
        if (filter === "Full Stack") return p.category === "Full Stack" || p.skills.includes("Node.js");
        if (filter === "Frontend") return p.category === "Frontend" || p.skills.includes("HTML") || p.skills.includes("React") || p.skills.includes("CSS");
        if (filter === "AI") return p.category === "AI" || p.skills.includes("AI");
        if (filter === "Hackathon") return p.category === "Hackathon";
        return p.category === filter;
      });

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3);

  return (
    <section id="projects" className="page-section-container page-section projects">
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
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={400}
                      height={220}
                      style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {project.category && (
                      <span className="project-category-tag">
                        {project.category}
                      </span>
                    )}
                  </div>
                  <div className="project-info">
                    <h2>{project.title}</h2>
                    <p className="project-desc">
                      {project.description}
                    </p>
                    <div className="project-skills">
                      {project.skills.map((skill, i) => (
                        <img
                          key={i}
                          src={getSkillBadge(skill)}
                          alt={skill}
                          className="skill-badge"
                          loading="lazy"
                        />
                      ))}
                    </div>
                    <div className="project-links">
                      {project.codeLink && (
                        <a href={project.codeLink} className="btn-small btn-code" target="_blank" rel="noopener noreferrer">
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                          Source
                        </a>
                      )}
                      {project.demoLink && (
                        <a href={project.demoLink} className="btn-small btn-demo" target="_blank" rel="noopener noreferrer">
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
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
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowAll(!showAll)}
            className="btn-load-more"
          >
            {showAll ? 'Show Less' : `View All ${filteredProjects.length} Projects`}
            <motion.svg
              animate={{ rotate: showAll ? 180 : 0 }}
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
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
