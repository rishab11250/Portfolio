import React, { useState, useEffect } from 'react';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { motion } from 'framer-motion';
import HoloGlobe from './HoloGlobe';

const Hero = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    const roles = ["Full Stack Developer", "Web Developer", "UI/UX Developer"];

    useEffect(() => {
        const handleType = () => {
            const i = loopNum % roles.length;
            const fullText = roles[i];

            setText(isDeleting
                ? fullText.substring(0, text.length - 1)
                : fullText.substring(0, text.length + 1)
            );

            setTypingSpeed(isDeleting ? 30 : 150);

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 2000); // Pause at end
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleType, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, typingSpeed, roles]);

    const startTour = () => {
        const driverObj = driver({
            showProgress: true,
            steps: [
                { element: '#home', popover: { title: 'Welcome!', description: 'Welcome to my portfolio. Let me show you around.' } },
                { element: '#about-section', popover: { title: 'About Me', description: 'Here is a little bit about myself and my journey.' } },
                { element: '#tech-stack', popover: { title: 'Tech Stack', description: 'These are the technologies and tools I work with.' } },
                { element: '#projects', popover: { title: 'Projects', description: 'Check out some of the cool things I have built.' } },
                { element: '#certificates', popover: { title: 'Certifications', description: 'My professional certifications and achievements.' } },
                { element: '#contact', popover: { title: 'Get in Touch', description: 'Feel free to reach out to me via email or social media.' } },
            ]
        });
        driverObj.drive();
    };

    return (
        <section className="page-section hero" id="home">
            <div className="hero-shapes">
                {/* Replaced Static Icons with 3D Holo */}
                <HoloGlobe />
            </div>

            <div className="hero-content" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>

                {/* Top Section: Split Layout */}
                <div className="hero-split-container">

                    {/* Left Side: Identity (Greeting + Name + Role) */}
                    <div className="hero-left-identity">
                        <motion.p
                            className="greeting"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Hi, I'm
                        </motion.p>

                        <motion.div
                            className="hero-name-wrapper"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h1 className="main-name">
                                Rishab Chandgothia
                            </h1>
                        </motion.div>

                        <motion.div
                            className="role-title-wrapper"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <span className="role-title">
                                {text}
                            </span>
                            <span className="cursor" style={{ fontSize: '1.5rem', color: 'var(--text-color)', marginLeft: '10px' }}>|</span>
                        </motion.div>
                    </div>

                    {/* Right Side: Description (Intro) */}
                    <div className="hero-right-info">
                        <motion.p
                            className="hero-description"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            Crafting beautiful and functional web experiences with modern technologies.
                            Turning ideas into reality through clean and efficient code.
                        </motion.p>
                    </div>
                </div>

                {/* Bottom Section: Buttons (Centered) */}
                <motion.div
                    className="hero-actions"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <button onClick={startTour} className="btn btn-tour">
                        Start Tour
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
                    </button>
                    <a href="#contact" className="btn btn-primary">Get in Touch</a>
                    <a href="#projects" className="btn btn-secondary">View Projects</a>
                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-resume">
                        Resume
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2H5a2 2 0 0 1-2-2 H5 a2 2 0 0 1-2-2 v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    </a>
                </motion.div>

                <div className="social-links">
                    <a href="https://github.com/rishab11250" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    </a>
                    <a href="https://www.linkedin.com/in/rishab-chandgothia-8823112a4/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BwKHIGV34T02PFLVIH%2B%2FuUQ%3D%3D" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </a>
                    <a href="https://leetcode.com/u/rishab11250" target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41C17.92 5.77 20 8.65 20 12c0 2.08-.81 3.98-2.1 5.39z"></path></svg>
                    </a>
                </div>
            </div>
            <div className="scroll-indicator" data-aos="fade-up" data-aos-delay="600" data-aos-offset="0">
                <a href="#about-section">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 13l5 5 5-5M7 6l5 5 5-5" /></svg>
                </a>
            </div>
        </section >
    );
};

export default Hero;
