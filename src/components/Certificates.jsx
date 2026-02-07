
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';

const Certificates = () => {
    const [showAll, setShowAll] = useState(false);

    const certificates = [
        {
            id: 1,
            title: "MOSIP Decode Hackathon",
            issuer: "Digital Governance Summit 2026",
            image: "https://d8it4huxumps7.cloudfront.net/lambda-pdfs/certificate-images/53151819-9cbb-4e07-9609-56dbd74ca269.jpg",
            link: "https://d8it4huxumps7.cloudfront.net/lambda-pdfs/certificate-images/53151819-9cbb-4e07-9609-56dbd74ca269.jpg"
        },
        {
            id: 2,
            title: "CodeClash",
            issuer: "Unstop",
            image: "https://d8it4huxumps7.cloudfront.net/lambda-pdfs/certificate-images/c3267ae3-cfe1-4071-96e1-ebdf6f12eb82.jpg",
            link: "https://d8it4huxumps7.cloudfront.net/lambda-pdfs/certificate-images/c3267ae3-cfe1-4071-96e1-ebdf6f12eb82.jpg"
        },
        {
            id: 3,
            title: "TechFrontier 2025",
            issuer: "Unstop",
            image: "https://d8it4huxumps7.cloudfront.net/lambda-pdfs/certificate-images/ad6a9fd4-f0f4-4498-8002-8c35f58c268d.jpg",
            link: "https://d8it4huxumps7.cloudfront.net/lambda-pdfs/certificate-images/ad6a9fd4-f0f4-4498-8002-8c35f58c268d.jpg"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 }
        }
    };

    const displayedCerts = showAll ? certificates : certificates.slice(0, 3);

    return (
        <section className="page-section certificates" id="certificates">
            <h1 data-aos="fade-down" style={{ textAlign: 'center', marginBottom: '3rem' }}>Certifications</h1>

            <motion.div
                className="certificates-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '2rem',
                    padding: '0 1rem',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    justifyContent: 'center'
                }}
            >
                {displayedCerts.map((cert) => (
                    <TiltCard key={cert.id} className="certificate-card-wrapper">
                        <motion.a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={cardVariants}
                            whileHover={{
                                y: -10,
                                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                                borderColor: 'var(--primary-color)'
                            }}
                            className="certificate-card"
                            style={{
                                background: 'var(--card-bg)',
                                border: '2px solid var(--glass-border)',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                height: '100%'
                            }}
                        >
                            <div style={{
                                width: '100%',
                                height: '200px',
                                overflow: 'hidden',
                                background: '#f0f0f0'
                            }}>
                                <img
                                    src={cert.image}
                                    alt={cert.title}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.3s ease'
                                    }}
                                />
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <h3 style={{
                                    fontSize: '1.1rem',
                                    marginBottom: '0.5rem',
                                    color: 'var(--text-color)',
                                    fontWeight: '700'
                                }}>{cert.title}</h3>
                                <p style={{
                                    color: 'var(--text-secondary)',
                                    fontSize: '0.9rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                    {cert.issuer}
                                </p>
                            </div>
                        </motion.a>
                    </TiltCard>
                ))}
            </motion.div>

            {certificates.length > 3 && (
                <div style={{ textAlign: 'center', marginTop: '3rem', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setShowAll(!showAll);
                        }}
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
                            gap: '0.75rem',
                            zIndex: 100,
                            position: 'relative'
                        }}
                    >
                        {showAll ? 'Show Less' : `View All ${certificates.length} Certificates`}
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
                </div>
            )}
        </section>
    );
};

export default Certificates;
