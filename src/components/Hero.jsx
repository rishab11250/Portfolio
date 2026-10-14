import React, { Suspense, lazy, useState, useEffect } from 'react';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { motion } from 'framer-motion';
import resumeFile from '../assets/Rishab Chandgothia - Resume.pdf';

const HoloGlobe = lazy(() => import('./HoloGlobe'));

const roles = ["Full Stack Developer", "Web Developer", "UI/UX Developer"];

const Hero = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

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
    }, [text, isDeleting, loopNum, typingSpeed]);

    const startTour = () => {
        const driverObj = driver({
            showProgress: true,
            steps: [
                { element: '#home', popover: { title: 'Welcome!', description: 'Welcome to my portfolio. Let me show you around.' } },
                { element: '#about', popover: { title: 'About Me', description: 'Here is a little bit about myself and my journey.' } },
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
                <Suspense fallback={null}>
                    <HoloGlobe />
                </Suspense>
            </div>

            <div className="hero-content" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>

                {/* Top Section: Split Layout */}
                <div className="hero-split-container">

                    {/* Left Side: Identity (Greeting + Name + Role) */}
                    <div className="hero-left-identity">
                        <motion.p
                            className="greeting"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                        >
                            Hi, I'm
                        </motion.p>

                        <motion.div
                            className="hero-name-wrapper"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                        >
                            <h1 className="main-name">
                                Rishab Chandgothia
                            </h1>
                        </motion.div>

                        <motion.div
                            className="role-title-wrapper"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.25 }}
                        >
                            <span className="role-title">
                                {text}
                            </span>
                            <span className="cursor">|</span>
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
                            Crafting high-performance web applications, interactive 3D interfaces, and scalable full-stack software with clean code and modern design.
                        </motion.p>
                    </div>
                </div>

                {/* Bottom Section: Buttons (Centered) */}
                <motion.div
                    className="hero-actions"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.55 }}
                >
                    <a href="#projects" className="btn btn-primary">
                        View Projects
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </a>
                    <a href="#contact" className="btn btn-secondary">
                        Get in Touch
                    </a>
                    <a href={resumeFile} target="_blank" rel="noopener noreferrer" className="btn btn-resume">
                        Resume
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                    <button onClick={startTour} className="btn btn-tour">
                        Guided Tour
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
                    </button>
                </motion.div>

                <div className="social-links">
                    <a href="https://github.com/rishab11250" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    </a>
                    <a href="https://www.linkedin.com/in/rishab-chandgothia-8823112a4/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BwKHIGV34T02PFLVIH%2B%2FuUQ%3D%3D" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </a>
                    <a href="https://leetcode.com/u/rishab11250" target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" /></svg>
                    </a>
                    <a href="https://x.com/Rishab25361722" target="_blank" rel="noopener noreferrer" aria-label="X">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>
                    </a>
                    <a href="https://www.youtube.com/@RishabChandgothia" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                    </a>
                </div>
            </div>
            <div className="scroll-indicator" data-aos="fade-up" data-aos-delay="600" data-aos-offset="0">
                <a href="#about" aria-label="Scroll to About section">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 13l5 5 5-5M7 6l5 5 5-5" /></svg>
                </a>
            </div>
        </section >
    );
};

export default Hero;
