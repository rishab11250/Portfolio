import ClientTerrain from '@/components/ClientTerrain';
import Cursor from '@/components/Cursor';
import ScrollToTop from '@/components/ScrollToTop';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Profile from '@/components/Profile';
import TechStack from '@/components/TechStack';
import Projects from '@/components/Projects';
import Certificates from '@/components/Certificates';
import Hackathons from '@/components/Hackathons';
import EducationTimeline from '@/components/EducationTimeline';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SessionLoader from '@/components/SessionLoader';

export default function Home() {
  return (
    <div className="app-container">
      <ClientTerrain />
      <Cursor />
      <ScrollToTop />
      <Navbar />
      <main className="content-container">
        <Hero />
        <Profile />
        <TechStack />
        <Projects />
        <Certificates />
        <Hackathons />
        <EducationTimeline />
        <Contact />
        <Footer />
      </main>
      <SessionLoader />
    </div>
  );
}
