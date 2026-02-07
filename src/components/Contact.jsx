import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import TiltCard from './TiltCard';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('');
    const form = useRef();

    const SERVICE_ID = 'service_u5kyq7a';
    const TEMPLATE_ID = 'template_riut535';
    const PUBLIC_KEY = 'QAVuEX1927cCkpG-u';

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
            .then((result) => {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            }, (error) => {
                setStatus('error');
                alert("Failed to send message. Please try again.");
            });
    };

    const contactMethods = [
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
            label: 'Email',
            value: 'rishab.chandgothia.cg@gmail.com',
            link: 'mailto:rishab.chandgothia.cg@gmail.com',
            color: '#EA4335'
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>,
            label: 'LinkedIn',
            value: 'rishab-chandgothia',
            link: 'https://www.linkedin.com/in/rishab-chandgothia-8823112a4/',
            color: '#0A66C2'
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>,
            label: 'GitHub',
            value: 'rishab11250',
            link: 'https://github.com/rishab11250',
            color: '#fff'
        }
    ];

    return (
        <section className="page-section" id="contact" style={{
            padding: '6rem 2rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Floating Orbs Background */}
            {/* Background Removed per user request */}

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '5rem' }}
                >
                    <h1 style={{
                        fontSize: '4rem',
                        marginBottom: '1.5rem',
                        background: 'var(--gradient-text)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        color: 'transparent', // Fallback
                        fontWeight: '900',
                        letterSpacing: '-2px',
                        display: 'inline-block' // Fix for some browsers
                    }}>Let's Connect</h1>
                    <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        I'm always excited to collaborate on new projects or just have a conversation about tech.
                    </p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
                    {/* Contact Methods Cards */}
                    {contactMethods.map((method, index) => (
                        <TiltCard key={index}>
                            <motion.a
                                href={method.link}
                                target={method.label === 'Email' ? '_self' : '_blank'}
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10, borderColor: method.color }}
                                style={{
                                    background: 'var(--card-bg)',
                                    border: '2px solid var(--glass-border)',
                                    borderRadius: '24px',
                                    padding: '2.5rem',
                                    textDecoration: 'none',
                                    color: 'var(--text-color)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '1.5rem',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    cursor: 'pointer'
                                }}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                                    <motion.div
                                        whileHover={{ rotate: 360, scale: 1.1 }}
                                        transition={{ duration: 0.6 }}
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                            borderRadius: '20px',
                                            background: `linear-gradient(135deg, ${method.color}20 0%, ${method.color}10 100%)`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: method.color
                                        }}
                                    >
                                        {method.icon}
                                    </motion.div>
                                    <div style={{ textAlign: 'center' }}>
                                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: '700' }}>{method.label}</h3>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', wordBreak: 'break-all', lineHeight: '1.4' }}>{method.value}</p>
                                    </div>
                                </div>
                            </motion.a>
                        </TiltCard>
                    ))}
                </div>

                {/* Quick Message Form */}
                {status === 'success' ? (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        style={{
                            background: 'var(--card-bg)',
                            border: '2px solid #4CAF50',
                            borderRadius: '24px',
                            padding: '4rem 2rem',
                            textAlign: 'center',
                            maxWidth: '600px',
                            margin: '0 auto'
                        }}
                    >
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                            transition={{ duration: 0.8 }}
                            style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 2rem',
                                boxShadow: '0 10px 40px rgba(76, 175, 80, 0.4)'
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </motion.div>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Awesome! 🎉</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem' }}>
                            Message received! I'll get back to you faster than you can say "Full Stack Developer".
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setStatus('')}
                            style={{
                                padding: '1rem 3rem',
                                background: 'linear-gradient(135deg, #61DAFB 0%, #4A90E2 100%)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '16px',
                                fontSize: '1.1rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                boxShadow: '0 8px 24px rgba(97, 218, 251, 0.3)'
                            }}
                        >Send Another</motion.button>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '24px',
                            padding: '3rem',
                            maxWidth: '700px',
                            margin: '0 auto',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', textAlign: 'center' }}>Quick Message</h2>
                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
                            Or drop me a message right here
                        </p>

                        <form ref={form} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <motion.div whileFocus={{ scale: 1.02 }}>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        autoComplete="name"
                                        style={{
                                            width: '100%',
                                            padding: '1.25rem',
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '2px solid var(--glass-border)',
                                            borderRadius: '16px',
                                            color: 'var(--text-color)',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            transition: 'all 0.3s ease'
                                        }}
                                    />
                                </motion.div>
                                <motion.div whileFocus={{ scale: 1.02 }}>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Your Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        autoComplete="email"
                                        style={{
                                            width: '100%',
                                            padding: '1.25rem',
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '2px solid var(--glass-border)',
                                            borderRadius: '16px',
                                            color: 'var(--text-color)',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            transition: 'all 0.3s ease'
                                        }}
                                    />
                                </motion.div>
                            </div>

                            <motion.div whileFocus={{ scale: 1.02 }}>
                                <textarea
                                    name="message"
                                    placeholder="Your message..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    style={{
                                        width: '100%',
                                        padding: '1.25rem',
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '2px solid var(--glass-border)',
                                        borderRadius: '16px',
                                        color: 'var(--text-color)',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        resize: 'vertical',
                                        fontFamily: 'inherit',
                                        transition: 'all 0.3s ease'
                                    }}
                                ></textarea>
                            </motion.div>

                            <motion.button
                                type="submit"
                                disabled={status === 'sending'}
                                whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(97, 218, 251, 0.4)' }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: '1.5rem',
                                    background: status === 'sending' ? '#666' : 'linear-gradient(135deg, #61DAFB 0%, #4A90E2 100%)',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '16px',
                                    fontSize: '1.2rem',
                                    fontWeight: '800',
                                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '1rem',
                                    transition: 'all 0.3s ease',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px'
                                }}
                            >
                                {status === 'sending' ? (
                                    <>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            style={{ width: '20px', height: '20px', border: '3px solid #fff', borderTopColor: 'transparent', borderRadius: '50%' }}
                                        />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Contact;
