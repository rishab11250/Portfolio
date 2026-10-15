"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import TiltCard from './TiltCard';
import { certificates } from '../data/certificates';

const categories = ["All", "Hackathons", "Courses"];

const Certificates = () => {
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState("All");

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
    <section id="certificates" className="page-section-container page-section certificates">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Certificates
      </motion.h1>

      {/* Filter Buttons */}
      <div className="project-filters" style={{ marginBottom: '3rem' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => {
              setFilter(cat);
              setShowAll(false);
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
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      width={400}
                      height={240}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center top'
                      }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                        fontFamily: 'inherit'
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
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowAll(!showAll);
            }}
            className="btn-load-more"
          >
            {showAll ? 'Show Less' : `View All ${filteredCerts.length} Certificates`}
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
        </div>
      )}
    </section>
  );
};

export default Certificates;
