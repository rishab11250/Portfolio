import React from 'react';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';

const EducationTimeline = () => {
    const timelineData = [
        {
            date: "2025 - Present",
            title: "Bachelor's",
            subtitle: "Coding Gita",
            desc: "Pursuing Bachelor of Engineering in Computer Engineering.",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>,
            color: "var(--primary-color)"
        },
        {
            date: "2013 - 2025",
            title: "Schooling",
            subtitle: "Shree Vasishtha Vidhyalaya",
            stats: [
                { label: "10th Score", value: "87.4%" },
                { label: "12th Score", value: "77%" }
            ],
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
            color: "var(--secondary-color)"
        }
    ];

    return (
        <section className="page-section" id="education" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                Education
            </motion.h1>
            <div className="custom-timeline" style={{ marginTop: '4rem', position: 'relative', maxWidth: '800px', margin: '4rem auto 0', padding: '0 1rem' }}>

                {/* Central Line */}
                <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '20px',
                    bottom: '20px',
                    width: '2px',
                    background: 'linear-gradient(to bottom, transparent, var(--glass-border), transparent)',
                    transform: 'translateX(-50%)',
                    zIndex: 0
                }}></div>

                {timelineData.map((item, index) => (
                    <div
                        key={index}
                        className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '6rem',
                            position: 'relative',
                            width: '100%'
                        }}
                    >
                        {/* Horizontal Connector Line (Left) */}
                        <div style={{
                            position: 'absolute',
                            right: '50%',
                            top: '50%',
                            width: '45px',
                            height: '2px',
                            background: `linear-gradient(to left, ${item.color}, transparent)`,
                            opacity: 0.5,
                            marginRight: '25px'
                        }}></div>

                        {/* Horizontal Connector Line (Right) */}
                        <div style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            width: '45px',
                            height: '2px',
                            background: `linear-gradient(to right, ${item.color}, transparent)`,
                            opacity: 0.5,
                            marginLeft: '25px'
                        }}></div>

                        {/* Left Side Component (Date or Card) */}
                        <div style={{ width: '42%', display: 'flex', justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start' }}>
                            {index % 2 === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    style={{ textAlign: 'right' }}
                                >
                                    <h2 style={{
                                        fontSize: '4rem',
                                        fontWeight: '900',
                                        color: item.color,
                                        opacity: 0.5,
                                        margin: 0,
                                        lineHeight: 0.8,
                                        fontFamily: 'monospace'
                                    }}>
                                        {item.date.split(' - ')[0]}
                                    </h2>
                                    <span style={{
                                        fontSize: '1.2rem',
                                        color: item.color,
                                        fontWeight: '600',
                                        letterSpacing: '2px',
                                        textTransform: 'uppercase'
                                    }}>{item.date.split(' - ')[1] || item.date}</span>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    style={{ width: '100%' }}
                                >
                                    <TiltCard>
                                        <div className="timeline-card-content" style={{
                                            background: 'rgba(255, 255, 255, 0.03)',
                                            borderRadius: '20px',
                                            border: '1px solid var(--glass-border)',
                                            textAlign: 'left',
                                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                                            backdropFilter: 'blur(10px)'
                                        }}>
                                            <h3 style={{ fontSize: '1.4rem', margin: '0 0 0.5rem 0', color: 'var(--text-color)', fontWeight: '700' }}>{item.title}</h3>
                                            <h4 style={{ fontSize: '1rem', color: item.color, marginBottom: '1rem', fontWeight: '500' }}>{item.subtitle}</h4>
                                            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{item.desc}</p>

                                            {item.stats && (
                                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                                                    {item.stats.map((stat, i) => (
                                                        <div key={i} style={{
                                                            border: `1px solid ${item.color}`,
                                                            padding: '0.5rem 1rem',
                                                            borderRadius: '12px',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center',
                                                            minWidth: '80px'
                                                        }}>
                                                            <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: item.color }}>{stat.value}</span>
                                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{stat.label}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </TiltCard>
                                </motion.div>
                            )}
                        </div>

                        {/* Center Icon */}
                        <div style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '60px',
                            height: '60px',
                            background: 'var(--bg-color)',
                            border: `2px solid ${item.color}`,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: item.color,
                            zIndex: 10,
                            boxShadow: `0 0 30px ${item.color}30`
                        }}>
                            {item.icon}
                        </div>

                        {/* Right Side Component (Card or Date) */}
                        <div style={{ width: '42%', display: 'flex', justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end' }}>
                            {index % 2 === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    style={{ width: '100%' }}
                                >
                                    <TiltCard>
                                        <div className="timeline-card-content" style={{
                                            background: 'rgba(255, 255, 255, 0.03)',
                                            borderRadius: '20px',
                                            border: '1px solid var(--glass-border)',
                                            textAlign: 'left',
                                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                                            backdropFilter: 'blur(10px)'
                                        }}>
                                            <h3 style={{ fontSize: '1.4rem', margin: '0 0 0.5rem 0', color: 'var(--text-color)', fontWeight: '700' }}>{item.title}</h3>
                                            <h4 style={{ fontSize: '1rem', color: item.color, marginBottom: '1rem', fontWeight: '500' }}>{item.subtitle}</h4>
                                            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{item.desc}</p>

                                            {item.stats && (
                                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                                                    {item.stats.map((stat, i) => (
                                                        <div key={i} style={{
                                                            border: `1px solid ${item.color}`,
                                                            padding: '0.5rem 1rem',
                                                            borderRadius: '12px',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center',
                                                            minWidth: '80px'
                                                        }}>
                                                            <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: item.color }}>{stat.value}</span>
                                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{stat.label}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </TiltCard>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    style={{ textAlign: 'left' }}
                                >
                                    <h2 style={{
                                        fontSize: '4rem',
                                        fontWeight: '900',
                                        color: item.color,
                                        opacity: 0.5,
                                        margin: 0,
                                        lineHeight: 0.8,
                                        fontFamily: 'monospace'
                                    }}>
                                        {item.date.split(' - ')[0]}
                                    </h2>
                                    <span style={{
                                        fontSize: '1.2rem',
                                        color: item.color,
                                        fontWeight: '600',
                                        letterSpacing: '2px',
                                        textTransform: 'uppercase'
                                    }}>{item.date.split(' - ')[1] || item.date}</span>
                                </motion.div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default EducationTimeline;
