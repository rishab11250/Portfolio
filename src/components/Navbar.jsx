import React, { useState, useEffect } from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import Logo from './Logo';
import AnimatedNavLink from './AnimatedNavLink';

const Navbar = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} aria-label="Main navigation">
      <button className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to home">
        <Logo />
      </button>

      <button className={`nav-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={isOpen}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </button>

      <div className={`nav-right ${isOpen ? 'active' : ''}`}>
        <ul className="nav-links">
          <AnimatedNavLink href="#home" isActive={activeSection === 'home'} onClick={handleLinkClick}>Home</AnimatedNavLink>
          <AnimatedNavLink href="#about" isActive={activeSection === 'about'} onClick={handleLinkClick}>About</AnimatedNavLink>
          <AnimatedNavLink href="#tech-stack" isActive={activeSection === 'tech-stack'} onClick={handleLinkClick}>Tech Stack</AnimatedNavLink>
          <AnimatedNavLink href="#projects" isActive={activeSection === 'projects'} onClick={handleLinkClick}>Projects</AnimatedNavLink>
          <AnimatedNavLink href="#certificates" isActive={activeSection === 'certificates'} onClick={handleLinkClick}>Certificates</AnimatedNavLink>
          <AnimatedNavLink href="#education" isActive={activeSection === 'education'} onClick={handleLinkClick}>Education</AnimatedNavLink>
          <AnimatedNavLink href="#contact" isActive={activeSection === 'contact'} onClick={handleLinkClick}>Contact</AnimatedNavLink>
        </ul>
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default Navbar;
