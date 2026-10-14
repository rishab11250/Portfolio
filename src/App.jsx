import React, { Suspense, lazy, useEffect, useState } from 'react';
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

const SciFiTerrain = lazy(() => import('./components/SciFiTerrain'));
import ScrollToTop from './components/ScrollToTop';
import LoadingScreen from './components/LoadingScreen';
import Cursor from './components/Cursor';
import AOS from 'aos';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import 'aos/dist/aos.css';
import { Toaster } from 'react-hot-toast';


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
    if (isLoading) return;

    const sections = ['home', 'about', 'tech-stack', 'projects', 'certificates', 'hackathons', 'education', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      // Bottom of page check -> activate last section
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
  }, [isLoading]);

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
      <Suspense fallback={<div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, background: 'var(--bg-color)' }} />}>
        <SciFiTerrain />
      </Suspense>
      {typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches && <Cursor />}
      <ScrollToTop />
      <Navbar activeSection={activeSection} onSelectSection={setActiveSection} />
      <main className="content-container">
        <section id="home" className="page-section-container">
          <Hero />
        </section>
        <section id="about" className="page-section-container" data-aos="fade-up">
          <Profile />
        </section>
        <section id="tech-stack" className="page-section-container" data-aos="fade-up">
          <TechStack />
        </section>
        <section id="projects" className="page-section-container" data-aos="fade-up">
          <Projects />
        </section>
        <section id="certificates" className="page-section-container" data-aos="fade-up">
          <Certificates />
        </section>
        <section id="hackathons" className="page-section-container" data-aos="fade-up">
          <Hackathons />
        </section>
        <section id="education" className="page-section-container" data-aos="fade-up">
          <EducationTimeline />
        </section>
        <section id="contact" className="page-section-container" data-aos="fade-up">
          <Contact />
        </section>
        <Footer />
      </main>
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

export default App;
