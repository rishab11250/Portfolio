import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const footerLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Tech Stack', href: '#tech-stack' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Contact', href: '#contact' }
];

const Footer = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="footer-unique" style={{
            position: 'relative',
            padding: '4rem 2rem 1rem',
            background: 'var(--card-bg)', // Adapted to theme
            backdropFilter: 'blur(10px)',
            marginTop: '4rem',
            borderTop: '1px solid var(--glass-border)',
            overflow: 'hidden',
            color: 'var(--text-color)'
        }}>
            {/* Holographic Grid Background - Adaptive Opacity */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'linear-gradient(var(--glass-border) 1px, transparent 1px), linear-gradient(90deg, var(--glass-border) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
                zIndex: 0,
                pointerEvents: 'none',
                opacity: 0.3
            }}></div>

            <div className="footer-content" style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>

                {/* Main 3-Column Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: '3rem',
                    marginBottom: '3rem',
                    textAlign: 'left'
                }}>
                    {/* Col 1: Brand & Status */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <h2 style={{
                            fontSize: '2rem',
                            fontWeight: '900',
                            color: 'var(--text-color)',
                            margin: 0,
                            letterSpacing: '2px'
                        }}>RISHAB<span style={{ color: 'var(--primary-color)' }}>.DEV</span></h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                            Full Stack Developer building immersive web experiences.
                        </p>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'rgba(0, 243, 255, 0.05)',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            border: '1px solid var(--glass-border)',
                            width: 'fit-content'
                        }}>
                            <span style={{ width: '8px', height: '8px', background: '#00ff41', borderRadius: '50%', boxShadow: '0 0 5px #00ff41', animation: 'pulse 2s infinite' }}></span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--primary-color)', fontFamily: 'Share Tech Mono, monospace' }}>SYSTEM ONLINE</span>
                        </div>
                    </div>

                    {/* Col 2: Navigation */}
                    <div>
                        <h3 style={{ fontSize: '1.2rem', color: 'var(--text-color)', marginBottom: '1.5rem', borderLeft: '3px solid var(--primary-color)', paddingLeft: '10px' }}>Quick Access</h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.8rem' }}>
                            {footerLinks.map((link, i) => (
                                <li key={i}>
                                    <a href={link.href} style={{
                                        color: 'var(--text-secondary)',
                                        textDecoration: 'none',
                                        transition: 'color 0.3s',
                                        fontSize: '0.95rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px'
                                    }}
                                        onMouseEnter={(e) => {
                                            e.target.style.color = 'var(--primary-color)';
                                            e.target.style.paddingLeft = '5px';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.color = 'var(--text-secondary)';
                                            e.target.style.paddingLeft = '0px';
                                        }}
                                    >
                                        › {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3: Connect */}
                    <div>
                        <h3 style={{ fontSize: '1.2rem', color: 'var(--text-color)', marginBottom: '1.5rem', borderLeft: '3px solid var(--secondary-color)', paddingLeft: '10px' }}>Establish Uplink</h3>
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                            {[
                                { name: 'GitHub', url: 'https://github.com/rishab11250', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg> },
                                { name: 'LinkedIn', url: 'https://www.linkedin.com/in/rishab-chandgothia-8823112a4/', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg> },
                                { name: 'Email', url: 'mailto:rishab.chandgothia.cg@gmail.com', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> },
                                { name: 'LeetCode', url: 'https://leetcode.com/u/rishab11250', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" /></svg> }
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target={social.name === 'Email' ? '_self' : '_blank'}
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '8px',
                                        background: 'var(--card-bg)',
                                        border: '1px solid var(--glass-border)',
                                        color: 'var(--text-color)',
                                        transition: 'all 0.3s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'var(--primary-color)';
                                        e.currentTarget.style.color = '#fff';
                                        e.currentTarget.style.transform = 'translateY(-3px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'var(--card-bg)';
                                        e.currentTarget.style.color = 'var(--text-color)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            Have a project in mind?<br />
                            <a href="mailto:rishab.chandgothia.cg@gmail.com" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>rishab.chandgothia.cg@gmail.com</a>
                        </p>
                    </div>
                </div>

                {/* Bottom Bar: Copyright & Info */}
                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    paddingTop: '2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    fontFamily: 'Share Tech Mono, monospace'
                }}>
                    <div>
                        &copy; {new Date().getFullYear()} Rishab Chandgothia. All rights reserved.
                    </div>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <span className="location-easter-egg">
                            STATUS: <span className="location-text">LOC: EARTH-[C-137]</span>
                        </span>
                        <span>{time}</span>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes pulse {
                    0% { opacity: 1; box-shadow: 0 0 5px #00ff41; }
                    50% { opacity: 0.5; box-shadow: 0 0 2px #00ff41; }
                    100% { opacity: 1; box-shadow: 0 0 5px #00ff41; }
                }
            `}</style>
        </footer>
    );
};

export default Footer;
