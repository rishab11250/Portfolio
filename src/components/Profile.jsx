import React from 'react';

import { motion } from 'framer-motion';

const Profile = () => {
    return (
        <section className="page-section profile" id="about">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                About Me
            </motion.h1>
            <div className="profile-container-split">
                <motion.div
                    className="profile-image-section"
                    initial={{ opacity: 0, x: -100, rotate: -10 }}
                    whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                >
                    <img src="https://res.cloudinary.com/dhr1jtyi2/image/upload/v1770223273/IMG-20251109-WA0007_jybgmw.jpg" alt="Profile" className="profile-img-large" style={{ width: '300px', objectFit: 'cover', borderRadius: '25%' }} />
                </motion.div>
                <div className="profile-text-section">
                    <motion.p
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Hello! I'm an aspiring Full-Stack Developer with a passion for building functional and beautiful web applications.
                        I am constantly learning new technologies and honing my skills to create seamless user experiences.
                        Currently diving deep into the world of React and modern web development.
                    </motion.p>
                </div>
            </div>
        </section>
    );
};

export default Profile;
