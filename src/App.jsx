import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Profile from './components/Profile';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

import SciFiTerrain from './components/SciFiTerrain';
import ScrollToTop from './components/ScrollToTop';
import LoadingScreen from './components/LoadingScreen';
import Cursor from './components/Cursor';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="app-container">
      <SciFiTerrain />
      <Cursor />
      <ScrollToTop />
      <Navbar />
      <div className="content-container">
        <Hero />
        <div id="about"><Profile /></div>
        <div id="tech-stack"><TechStack /></div>
        <div id="projects"><Projects /></div>
        <div id="certificates"><Certificates /></div>
        <div id="contact"><Contact /></div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
