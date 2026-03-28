
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TiltCard from './TiltCard';

const Certificates = () => {
    const [showAll, setShowAll] = useState(false);
    const [filter, setFilter] = useState("All");

    const categories = ["All", "Hackathons", "Courses"];

    const certificates = [
        {
            id: 4,
            title: "Doppelganger",
            issuer: "OpenPool",
            category: "Hackathons",
            description: "Led a 4-member team to successfully develop a working prototype in under 30 hours, demonstrating strong leadership and rapid execution.",
            image: "https://res.cloudinary.com/dhr1jtyi2/image/upload/v1773833685/Rishab_Chandgothia_page-0001_msjfri.jpg",
            link: "https://drive.google.com/file/d/1DaGek1zp2Jl61NEuCO-r3ogAcz_JGykP/view?usp=sharing"
        },
        {
            id: 5,
            title: "Dev Heat Hackathon",
            issuer: "Unstop",
            category: "Hackathons",
            description: "Led a 3-member team to successfully advance to the offline presentation finals at IIIT Surat, demonstrating strong leadership, collaborative problem-solving, and effective project execution.",
            image: "https://d8it4huxumps7.cloudfront.net/lambda-pdfs/certificate-images/bb93b606-96ef-4c9a-b60c-d5329fd7d5e3.jpg",
            link: "https://d8it4huxumps7.cloudfront.net/lambda-pdfs/certificate-images/bb93b606-96ef-4c9a-b60c-d5329fd7d5e3.jpg"
        },
        {
            id: 6,
            title: "Introduction to C",
            issuer: "Sololearn",
            category: "Courses",
            description: "Mastered the foundational concepts of C language, including user input handling, conditional flow control, loops, functions, and array manipulation.",
            image: "https://api2.sololearn.com/v2/certificates/CC-UAIY2UNI/image/png",
            link: "https://www.sololearn.com/certificates/CC-UAIY2UNI"
        },
        {
            id: 7,
            title: "Prompt Engineering",
            issuer: "Sololearn",
            category: "Courses",
            description: "Learned advanced techniques for crafting effective AI prompts, optimizing interactions with LLMs like ChatGPT and Gemini for high-quality results.",
            image: "https://api2.sololearn.com/v2/certificates/CC-UKVI1YP1/image/png",
            link: "https://www.sololearn.com/certificates/CC-UKVI1YP1"
        },
        {
            id: 8,
            title: "Introduction to SQL",
            issuer: "Sololearn",
            category: "Courses",
            description: "Gained proficiency in database management and manipulation using SQL, covering CRUD operations, filtering, and joining multiple interrelated tables.",
            image: "https://api2.sololearn.com/v2/certificates/CC-J5E1KEMT/image/png",
            link: "https://www.sololearn.com/certificates/CC-J5E1KEMT"
        },
        {
            id: 9,
            title: "Introduction to C++",
            issuer: "Sololearn",
            category: "Courses",
            description: "Developed a strong grasp of C++ fundamentals, mastering variables, complex control structures, and the basics of object-oriented programming.",
            image: "https://api2.sololearn.com/v2/certificates/CC-2NMPWLX4/image/png",
            link: "https://www.sololearn.com/certificates/CC-2NMPWLX4"
        },
        {
            id: 10,
            title: "Web Development",
            issuer: "Sololearn",
            category: "Courses",
            description: "Learned the core pillars of modern web development, focusing on structured HTML, stylized CSS layouts, and interactive JavaScript functionality.",
            image: "https://api2.sololearn.com/v2/certificates/CC-EB87KPA6/image/png",
            link: "https://www.sololearn.com/certificates/CC-EB87KPA6"
        },
        {
            id: 11,
            title: "Data Analytics with AI",
            issuer: "Sololearn",
            category: "Courses",
            description: "Integrated AI tools into the data analysis lifecycle, mastering data interpretation, visualization techniques, and automated insight generation.",
            image: "https://api2.sololearn.com/v2/certificates/CC-CXPPHOOM/image/png",
            link: "https://www.sololearn.com/certificates/CC-CXPPHOOM"
        },
        {
            id: 12,
            title: "JavaScript (Basic)",
            issuer: "HackerRank",
            category: "Courses",
            description: "Verified fundamental JavaScript proficiency, covering essential concepts like variable scope, hoisting, closures, inheritance, and error handling.",
            image: "https://res.cloudinary.com/dhr1jtyi2/image/upload/v1774602122/download_gc3rvx.png",
            link: "https://www.hackerrank.com/certificates/ede94602e84f"
        },
        {
            id: 13,
            title: "HackCrux 2026",
            issuer: "LNMIIT",
            category: "Hackathons",
            description: "Advanced to the second round of HackCrux at LNMIIT, collaborating with a 4-member team to deliver a functional prototype in under 30 hours. Spearheaded the project's backend by architecting the database and implementing web scraping solutions.",
            image: "https://res.cloudinary.com/dhr1jtyi2/image/upload/v1774687198/80f0f881-5dcb-40a6-8533-053bdb00573d.png",
            link: "https://drive.google.com/file/d/1urUKP_td7ItebMWJLDz7R8mC1ZnDN3w6/view?usp=sharing"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { y: 30, opacity: 0, scale: 0.9 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: { type: 'spring', stiffness: 100, damping: 15 }
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            transition: { duration: 0.2 }
        }
    };

    const filteredCerts = filter === "All"
        ? certificates
        : certificates.filter(cert => cert.category === filter);

    const displayedCerts = showAll ? filteredCerts : filteredCerts.slice(0, 3);

    return (
        <section className="page-section certificates" id="certificates" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
            <h1 data-aos="fade-down" style={{ textAlign: 'center', marginBottom: '2rem' }}>Certificates</h1>

            {/* Filter Buttons */}
            <div className="project-filters" style={{ marginBottom: '3rem' }}>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`filter-btn ${filter === cat ? 'active' : ''}`}
                        onClick={() => {
                            setFilter(cat);
                            setShowAll(false); // Reset showAll when filter changes
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <motion.div
                className="certificates-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '2.5rem',
                    padding: '0 2rem',
                    maxWidth: '1400px',
                    margin: '0 auto',
                    justifyContent: 'center'
                }}
            >
                <AnimatePresence mode="popLayout">
                    {displayedCerts.map((cert) => (
                        <motion.div
                            key={cert.id}
                            layout
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="certificate-card-wrapper"
                        >
                            <TiltCard>
                                <motion.a
                                    href={cert.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
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
                                        height: '100%',
                                        position: 'relative'
                                    }}
                                >
                                    <div 
                                        className="certificate-image-container"
                                        style={{
                                            width: '100%',
                                            height: '240px',
                                            overflow: 'hidden',
                                            background: '#fff',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderBottom: '1px solid var(--glass-border)',
                                            position: 'relative'
                                        }}
                                    >
                                        <img 
                                            src={cert.image} 
                                            alt={cert.title} 
                                            loading="lazy"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'fill'
                                            }}
                                        />
                                        
                                        {/* Hover Description Overlay */}
                                        <motion.div
                                            className="certificate-overlay"
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
                                                {cert.description}
                                            </p>
                                        </motion.div>
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
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredCerts.length > 3 && (
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
                        {showAll ? 'Show Less' : `View All ${filteredCerts.length} Certificates`}
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
