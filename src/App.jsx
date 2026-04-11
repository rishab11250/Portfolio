import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Profile from './components/Profile';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Hackathons from './components/Hackathons';
import EducationTimeline from './components/EducationTimeline';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

import SciFiTerrain from './components/SciFiTerrain';
import ScrollToTop from './components/ScrollToTop';
import LoadingScreen from './components/LoadingScreen';
import Cursor from './components/Cursor';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: 'ease-in-out',
      once: true,
      offset: 50,
    });
  }, []);

  // Update active section on scroll for navbar sync
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'tech-stack', 'projects', 'certificates', 'hackathons', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="app-container">
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: 'var(--card-bg)',
            color: 'var(--text-color)',
            border: '1px solid var(--glass-border)',
          },
        }}
      />
      <SciFiTerrain />
      {typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches && <Cursor />}
      <ScrollToTop />
      <Navbar activeSection={activeSection} />
      <main className="content-container">
        <section id="home">
          <Hero />
        </section>
        <section id="about" data-aos="fade-up">
          <Profile />
        </section>
        <section id="tech-stack" data-aos="fade-up">
          <TechStack />
        </section>
        <section id="projects" data-aos="fade-up">
          <Projects />
        </section>
        <section id="certificates" data-aos="fade-up">
          <Certificates />
        </section>
        <section id="hackathons" data-aos="fade-up">
          <Hackathons />
        </section>
        <section id="education" data-aos="fade-up">
          <EducationTimeline />
        </section>
        <section id="contact" data-aos="fade-up">
          <Contact />
        </section>
        <Footer />
      </main>
    </div>
  );
}

export default App;
