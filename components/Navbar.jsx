"use client";
import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import AnimatedNavLink from './AnimatedNavLink';

const sections = [
  'home',
  'about',
  'tech-stack',
  'projects',
  'certificates',
  'hackathons',
  'education',
  'contact'
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const scrollPosition = window.scrollY + 160;

      if (window.innerHeight + Math.round(window.scrollY) >= document.documentElement.scrollHeight - 60) {
        setActiveSection('contact');
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = (id) => {
    setIsOpen(false);
    setActiveSection(id);
  };

  const handleLogoClick = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setActiveSection('home');
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} aria-label="Main navigation">
      <button className="logo" onClick={handleLogoClick} aria-label="Back to home">
        <Logo />
      </button>

      <button
        className={`nav-toggle ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </button>

      <div className={`nav-right ${isOpen ? 'active' : ''}`}>
        <ul className="nav-links">
          <AnimatedNavLink href="#home" isActive={activeSection === 'home'} onClick={() => handleLinkClick('home')}>
            Home
          </AnimatedNavLink>
          <AnimatedNavLink href="#about" isActive={activeSection === 'about'} onClick={() => handleLinkClick('about')}>
            About
          </AnimatedNavLink>
          <AnimatedNavLink href="#tech-stack" isActive={activeSection === 'tech-stack'} onClick={() => handleLinkClick('tech-stack')}>
            Tech Stack
          </AnimatedNavLink>
          <AnimatedNavLink href="#projects" isActive={activeSection === 'projects'} onClick={() => handleLinkClick('projects')}>
            Projects
          </AnimatedNavLink>
          <AnimatedNavLink href="#certificates" isActive={activeSection === 'certificates'} onClick={() => handleLinkClick('certificates')}>
            Certificates
          </AnimatedNavLink>
          <AnimatedNavLink href="#hackathons" isActive={activeSection === 'hackathons'} onClick={() => handleLinkClick('hackathons')}>
            Hackathons
          </AnimatedNavLink>
          <AnimatedNavLink href="#education" isActive={activeSection === 'education'} onClick={() => handleLinkClick('education')}>
            Education
          </AnimatedNavLink>
          <AnimatedNavLink href="#contact" isActive={activeSection === 'contact'} onClick={() => handleLinkClick('contact')}>
            Contact
          </AnimatedNavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
