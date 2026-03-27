import React, { useState, useEffect } from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import Logo from './Logo';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    const sections = document.querySelectorAll('section');
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -35% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} aria-label="Main navigation">
      <button className="logo" onClick={() => window.scrollTo(0, 0)} aria-label="Scroll to top">
        <Logo />
      </button>

      <button className={`nav-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={isOpen}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </button>

      <div className={`nav-right ${isOpen ? 'active' : ''}`}>
        <ul className="nav-links">
          <li><a href="#home" className={activeSection === 'home' ? 'active' : ''} onClick={() => setIsOpen(false)}>Home</a></li>
          <li><a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={() => setIsOpen(false)}>About</a></li>
          <li><a href="#tech-stack" className={activeSection === 'tech-stack' ? 'active' : ''} onClick={() => setIsOpen(false)}>Tech Stack</a></li>
          <li><a href="#projects" className={activeSection === 'projects' ? 'active' : ''} onClick={() => setIsOpen(false)}>Projects</a></li>
          <li><a href="#certificates" className={activeSection === 'certificates' ? 'active' : ''} onClick={() => setIsOpen(false)}>Certificates</a></li>
          <li><a href="#education" className={activeSection === 'education' ? 'active' : ''} onClick={() => setIsOpen(false)}>Education</a></li>
          <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''} onClick={() => setIsOpen(false)}>Contact</a></li>
        </ul>
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default Navbar;
