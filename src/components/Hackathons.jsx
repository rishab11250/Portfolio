import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from './Projects';
import { certificates } from './Certificates';
import TiltCard from './TiltCard';
import { getSkillStyle } from '../utils/skills';

const CardSlideshow = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <AnimatePresence mode="wait">
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            </AnimatePresence>
            {images.length > 1 && (
                <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '4px',
                    zIndex: 2
                }}>
                    {images.map((_, i) => (
                        <div
                            key={i}
                            style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                background: currentIndex === i ? '#61DAFB' : 'rgba(255, 255, 255, 0.3)',
                                transition: 'all 0.3s ease'
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const hackathonEvents = [
    {
        name: "Dev Heat",
        organizer: "Unstop / IIIT Surat",
        badge: "Finalist",
        achievement: "Led a 3-member team to offline presentation finals at IIIT Surat",
        projectTitle: "StudyFlow AI",
        certTitle: "Dev Heat Hackathon"
    },
    {
        name: "HackCrux 2026",
        organizer: "LNMIIT Jaipur",
        badge: "Round 2 Advanced",
        achievement: "Spearheaded backend & web scraping in a 30-hour sprint",
        projectTitle: "Cura",
        certTitle: "HackCrux 2026"
    },
    {
        name: "OceanLab x Charusat Hacks 2026",
        organizer: "Charusat College",
        badge: "Round 2 Advanced",
        achievement: "Engineered AI-driven forecasting and real-time anomaly detection",
        projectTitle: "DataTime Machine", 
        certTitle: "TBD"     
    }
].map(event => {
    const project = projects.find(p => p.title === event.projectTitle) || {
        title: "Coming Soon",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
        description: "Details about the project developed during this hackathon will be updated soon.",
        skills: ["Upcoming"],
        codeLink: "#",
        demoLink: "#"
    };
    const certificate = certificates.find(c => c.title === event.certTitle) || {
        title: "Coming Soon",
        image: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&q=80&w=800",
        issuer: event.organizer
    };

    // Determine images for slideshow
    let eventImages = [project.image];
    if (event.name.includes("HackCrux")) {
        eventImages = [
            certificate.image,
            project.image,
            "https://res.cloudinary.com/dhr1jtyi2/image/upload/v1775735052/pdy4wpflndsrw2a2fofj.png",
            "https://res.cloudinary.com/dhr1jtyi2/image/upload/v1775735053/vmx1jrkps0kpp2w6tj7z.png"
        ];
    } else if (event.name.includes("Charusat")) {
        eventImages = [
            "https://res.cloudinary.com/dhr1jtyi2/image/upload/v1775736236/beygag2tbfhqmbaz3wpj.png",
            "https://res.cloudinary.com/dhr1jtyi2/image/upload/v1775736240/mbo57wfyemkejfqfegs7.png",
            "https://res.cloudinary.com/dhr1jtyi2/image/upload/v1775736239/id0wq7b9i5mdqs8whf1w.png",
            "https://res.cloudinary.com/dhr1jtyi2/image/upload/v1775736240/ei1crissgtgv4ttnrsrk.png"
        ];
    } else if (certificate.image && certificate.image !== project.image) {
        eventImages = [project.image, certificate.image];
    }

    return { ...event, project, certificate, images: eventImages };
});

const Hackathons = () => {
    const [selectedHackathon, setSelectedHackathon] = useState(null);

    return (
        <section className="page-section hackathons" id="hackathons" style={{ padding: '80px 2rem' }}>
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                style={{ textAlign: 'center', marginBottom: '3rem' }}
            >
                Hackathon Journey
            </motion.h1>

            <div className="hackathon-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2.5rem',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {hackathonEvents.map((event, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        onClick={() => setSelectedHackathon(event)}
                    >
                        <TiltCard className="hackathon-card-tilt">
                            <div className="hackathon-card" style={{
                                background: 'var(--card-bg)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '24px',
                                cursor: 'pointer',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                                overflow: 'hidden',
                                backdropFilter: 'blur(12px)',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}>
                                {/* Event Image Container */}
                                <div style={{
                                    width: '100%',
                                    height: '180px',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    borderBottom: '1px solid var(--glass-border)'
                                }}>
                                    <CardSlideshow images={event.images} />
                                    {/* Overlay Gradient */}
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(to bottom, transparent 0%, var(--bg-color) 100%)',
                                        pointerEvents: 'none'
                                    }} />
                                    
                                    {/* Event Badge - Hardware Tag Style */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '0',
                                        right: '1.5rem',
                                        padding: '0.4rem 0.8rem',
                                        background: 'rgba(140, 205, 235, 0.15)',
                                        border: '1px solid rgba(140, 205, 235, 0.3)',
                                        borderTop: 'none',
                                        borderRadius: '0 0 10px 10px',
                                        fontSize: '0.6rem',
                                        fontWeight: '800',
                                        color: 'var(--primary-color)',
                                        letterSpacing: '1px',
                                        textTransform: 'uppercase',
                                        fontFamily: 'Share Tech Mono, monospace',
                                        backdropFilter: 'blur(8px)',
                                        zIndex: 5
                                    }}>
                                        {event.badge}
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ 
                                        fontSize: '1.4rem', 
                                        marginBottom: '0.5rem', 
                                        color: 'var(--text-color)',
                                        fontWeight: '800',
                                        minHeight: '2.1em',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        {event.name}
                                    </h3>

                                    <div style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '0.5rem',
                                        marginBottom: '1rem'
                                    }}>
                                        <p style={{ 
                                            color: 'var(--primary-color)', 
                                            fontWeight: '600', 
                                            fontSize: '0.85rem',
                                            fontFamily: 'Share Tech Mono, monospace',
                                            opacity: 0.9
                                        }}>
                                            {event.organizer}
                                        </p>
                                    </div>

                                    <p style={{ 
                                        color: 'var(--text-color)', 
                                        opacity: 0.6,
                                        fontSize: '0.9rem', 
                                        lineHeight: '1.5',
                                        flexGrow: 1,
                                        marginBottom: '1.5rem'
                                    }}>
                                        {event.achievement}
                                    </p>

                                    <motion.div 
                                        whileHover={{ x: 5 }}
                                        style={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: '0.5rem', 
                                            color: 'var(--text-color)', 
                                            fontSize: '0.8rem', 
                                            fontWeight: '700',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px'
                                        }}
                                    >
                                        Explore Mission
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                    </motion.div>
                                </div>

                                {/* Background Decorative Code Text */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: '-5px',
                                    right: '-5px',
                                    fontSize: '3rem',
                                    fontWeight: '900',
                                    color: 'rgba(255, 255, 255, 0.02)',
                                    userSelect: 'none',
                                    pointerEvents: 'none',
                                    fontFamily: 'monospace',
                                    zIndex: 0
                                }}>
                                    {"</>"}
                                </div>
                            </div>
                        </TiltCard>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedHackathon && (
                    <HackathonModal 
                        event={selectedHackathon} 
                        onClose={() => setSelectedHackathon(null)} 
                        getSkillStyle={getSkillStyle}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

const HackathonModal = ({ event, onClose, getSkillStyle }) => {
    const [slideIndex, setSlideIndex] = useState(0);
    const images = event.images;

    useEffect(() => {
        const timer = setInterval(() => {
            setSlideIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [images.length]);

    const nextSlide = (e) => {
        e.stopPropagation();
        setSlideIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = (e) => {
        e.stopPropagation();
        setSlideIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(var(--bg-rgb, 0, 0, 0), 0.8)',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2000,
                padding: '1rem'
            }}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-modal-content"
                style={{
                    background: 'var(--card-bg)',
                    border: '1px solid var(--glass-border)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '28px',
                    maxWidth: '1100px',
                    width: '95%',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    position: 'relative',
                    boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.6)',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <motion.button 
                    whileHover={{ scale: 1.1, background: 'rgba(255, 255, 255, 0.2)' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1.25rem',
                        right: '1.25rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: 'var(--text-color)',
                        zIndex: 40,
                        backdropFilter: 'blur(4px)'
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </motion.button>

                <div className="modal-inner-layout" style={{ 
                    display: 'flex', 
                    flexDirection: window.innerWidth < 950 ? 'column' : 'row',
                    height: '100%',
                    minHeight: 'min-content'
                }}>
                    {/* Left Side: Slideshow */}
                    <div style={{ 
                        flex: '1.3',
                        position: 'relative', 
                        height: window.innerWidth < 950 ? '350px' : 'auto',
                        minHeight: '450px',
                        overflow: 'hidden', 
                        borderRight: window.innerWidth < 950 ? 'none' : '1px solid var(--glass-border)',
                        borderBottom: window.innerWidth < 950 ? '1px solid var(--glass-border)' : 'none',
                        background: 'var(--card-bg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={slideIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'absolute'
                                }}
                            >
                                <img
                                    src={images[slideIndex]}
                                    alt={`${event.project.title} project screenshot ${slideIndex + 1}`}
                                    loading="lazy"
                                    style={{ 
                                        width: '100%', 
                                        height: '100%', 
                                        objectFit: 'contain',
                                        padding: '1rem'
                                    }}
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        <motion.button
                            whileHover={{ scale: 1.1, x: -2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={prevSlide}
                            style={{
                                position: 'absolute',
                                left: '1rem',
                                background: 'var(--card-bg)',
                                border: '1px solid var(--glass-border)',
                                color: 'var(--text-color)',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                zIndex: 10,
                                backdropFilter: 'blur(4px)'
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1, x: 2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={nextSlide}
                            style={{
                                position: 'absolute',
                                right: '1rem',
                                background: 'var(--card-bg)',
                                border: '1px solid var(--glass-border)',
                                color: 'var(--text-color)',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                zIndex: 10,
                                backdropFilter: 'blur(4px)'
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </motion.button>
                        
                        {/* Slide Indicators */}
                        <div style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.6rem', zIndex: 10 }}>
                            {images.map((_, i) => (
                                <motion.div 
                                    key={i} 
                                    onClick={(e) => { e.stopPropagation(); setSlideIndex(i); }}
                                    whileHover={{ scale: 1.2 }}
                                    style={{
                                        width: slideIndex === i ? '20px' : '8px',
                                        height: '8px',
                                        borderRadius: '10px',
                                        background: slideIndex === i ? 'var(--primary-color)' : 'var(--glass-border)',
                                        cursor: 'pointer',
                                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Content */}
                    <div style={{ 
                        flex: '1',
                        padding: '2.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        maxHeight: window.innerWidth < 950 ? 'none' : '90vh',
                        overflowY: 'auto'
                    }} className="glass-modal-content">
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                <h2 style={{ fontSize: '1.8rem', color: 'var(--text-color)', margin: 0, lineHeight: 1.2 }}>{event.name}</h2>
                                <span style={{ 
                                    padding: '0.3rem 0.8rem', 
                                    background: 'rgba(97, 218, 251, 0.1)', 
                                    border: '1px solid rgba(97, 218, 251, 0.3)',
                                    borderRadius: '30px',
                                    color: 'var(--primary-color)',
                                    fontSize: '0.7rem',
                                    fontWeight: '700',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {event.badge}
                                </span>
                            </div>
                            <p style={{ 
                                fontFamily: 'Share Tech Mono, monospace', 
                                color: 'var(--primary-color)', 
                                fontSize: '1rem',
                                marginBottom: '0.5rem',
                                opacity: 0.9
                            }}>
                                {event.organizer}
                            </p>
                            <p style={{ color: 'var(--text-color)', opacity: 0.7, fontSize: '0.9rem', fontStyle: 'italic' }}>
                                {event.achievement}
                            </p>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <h4 style={{ color: 'var(--text-color)', opacity: 0.4, textTransform: 'uppercase', fontSize: '0.65rem', letterSpacing: '2px', marginBottom: '0.75rem' }}>PROJECT: {event.project.title}</h4>
                            <p style={{ color: 'var(--text-color)', opacity: 0.8, lineHeight: '1.6', fontSize: '0.9rem', marginBottom: '1.25rem' }}>{event.project.description}</p>
                            
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                                {event.project.skills.map((skill, i) => (
                                    <span key={i} style={{ 
                                        ...getSkillStyle(skill), 
                                        padding: '0.35rem 0.8rem', 
                                        borderRadius: '8px', 
                                        fontSize: '0.75rem', 
                                        fontWeight: '600',
                                        backdropFilter: 'blur(4px)'
                                    }}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
                            <motion.a 
                                whileHover={{ background: 'rgba(255, 255, 255, 0.15)', scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                href={event.project.codeLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{
                                    flex: 1,
                                    padding: '0.8rem',
                                    background: 'var(--card-bg)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '10px',
                                    color: 'var(--text-color)',
                                    textDecoration: 'none',
                                    textAlign: 'center',
                                    fontWeight: '700',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    fontSize: '0.85rem'
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                                GitHub
                            </motion.a>
                            {event.project.demoLink && (
                                <motion.a 
                                    whileHover={{ scale: 1.02, boxShadow: '0 10px 25px rgba(97, 218, 251, 0.4)' }}
                                    whileTap={{ scale: 0.98 }}
                                    href={event.project.demoLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    style={{
                                        flex: 1,
                                        padding: '0.8rem',
                                        background: 'linear-gradient(135deg, #61DAFB 0%, #4A90E2 100%)',
                                        borderRadius: '10px',
                                        color: '#fff',
                                        textDecoration: 'none',
                                        textAlign: 'center',
                                        fontWeight: '700',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        boxShadow: '0 8px 20px rgba(97, 218, 251, 0.3)',
                                        fontSize: '0.85rem'
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                    Live Demo
                                </motion.a>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Hackathons;
