"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import TiltCard from './TiltCard';
import toast from 'react-hot-toast';

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
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>,
    label: 'X (Twitter)',
    value: '@Rishab25361722',
    link: 'https://x.com/Rishab25361722',
    color: '#1DA1F2'
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>,
    label: 'Phone',
    value: '+91 8469190331',
    link: 'tel:+918469190331',
    color: '#25D366'
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [honeypot, setHoneypot] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [status, setStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const form = useRef();

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const SERVICE_ID = process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID;
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID;
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (honeypot) {
      // Spam honeypot triggered; silently ignore
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      return;
    }

    if (cooldown > 0) {
      toast.error(`Please wait ${cooldown}s before sending another message.`);
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(() => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setCooldown(30);
        toast.success('Message sent successfully!');
      }, () => {
        setStatus('error');
        setErrorMessage('Failed to send message. Please try again or email me directly.');
      });
  };

  const handleCopy = (text) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      toast.success('Copied!');
    }
  };

  return (
    <section id="contact" className="page-section-container page-section" style={{
      padding: '6rem 2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <h1>Get in Touch</h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Have an opportunity, project, or question? Feel free to reach out directly or send a message below.
          </p>
        </motion.div>

        <div className="contact-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          {contactMethods.map((method, index) => {
            const isCopyable = method.label === 'Email' || method.label === 'Phone';
            const CardComponent = isCopyable ? motion.div : motion.a;

            return (
              <TiltCard key={index}>
                <CardComponent
                  href={!isCopyable ? method.link : undefined}
                  target={!isCopyable ? '_blank' : undefined}
                  rel={!isCopyable ? 'noopener noreferrer' : undefined}
                  onClick={isCopyable ? () => handleCopy(method.value) : undefined}
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
                    <motion.div className="contact-icon-box"
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
                </CardComponent>
              </TiltCard>
            );
          })}
        </div>

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
            <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem', fontWeight: '700' }}>Message Sent</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '2rem' }}>
              Thank you for reaching out. I'll review your message and get back to you shortly.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setStatus('')}
              className="btn-load-more"
            >
              Send Another
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              background: 'var(--card-bg)',
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

            {errorMessage && (
              <div style={{
                background: 'rgba(255, 82, 82, 0.1)',
                border: '1px solid #ff5252',
                borderRadius: '12px',
                padding: '1rem',
                marginBottom: '1.5rem',
                color: '#ff5252',
                textAlign: 'center'
              }}>
                {errorMessage}
              </div>
            )}

            <form ref={form} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <label htmlFor="name" style={{ display: 'none' }}>Your Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    aria-label="Your Name"
                    className="form-input"
                  />
                </motion.div>
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <label htmlFor="email" style={{ display: 'none' }}>Your Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    aria-label="Your Email"
                    className="form-input"
                  />
                </motion.div>
              </div>

              <motion.div whileFocus={{ scale: 1.02 }}>
                <label htmlFor="message" style={{ display: 'none' }}>Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  aria-label="Your Message"
                  className="form-input"
                ></textarea>
              </motion.div>

              {/* Hidden anti-spam honeypot */}
              <input
                type="text"
                name="user_hp"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0, width: 0, zIndex: -1 }}
                aria-hidden="true"
              />

              <motion.button
                type="submit"
                disabled={status === 'sending' || cooldown > 0}
                whileHover={status !== 'sending' && cooldown === 0 ? { scale: 1.05, boxShadow: '0 12px 40px rgba(97, 218, 251, 0.4)' } : {}}
                whileTap={status !== 'sending' && cooldown === 0 ? { scale: 0.98 } : {}}
                style={{
                  padding: '1.1rem 2rem',
                  background: (status === 'sending' || cooldown > 0) ? 'rgba(255, 255, 255, 0.1)' : 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
                  color: (status === 'sending' || cooldown > 0) ? 'var(--text-muted)' : '#04101d',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '700',
                  cursor: (status === 'sending' || cooldown > 0) ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.3s ease',
                  boxShadow: (status === 'sending' || cooldown > 0) ? 'none' : '0 8px 24px -6px rgba(56, 189, 248, 0.45)'
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
                ) : cooldown > 0 ? (
                  `Sent! Cooldown (${cooldown}s)`
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
