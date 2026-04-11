import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const statuses = [
  'INITIALIZING SYSTEMS...',
  'LOADING MODULES...',
  'COMPILING ASSETS...',
  'ESTABLISHING CONNECTION...',
  'READY FOR LAUNCH...',
];

const LoadingScreen = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const starsRef = useRef([]);
  const speedRef = useRef(0);
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [typedText, setTypedText] = useState('');
  const tagline = 'Full Stack Developer';

  useEffect(() => {
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i <= tagline.length) {
        setTypedText(tagline.slice(0, i));
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 80);
    return () => clearInterval(typeInterval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const STAR_COUNT = 900;

    const initStars = () => {
      const W = canvas.width;
      const H = canvas.height;
      starsRef.current = Array.from({ length: STAR_COUNT }, () => {
        const rand = Math.random();
        let hue;
        if (rand > 0.85) {
          hue = 42 + Math.random() * 10; // gold accent (#FFE3A9 ≈ 42°)
        } else if (rand > 0.5) {
          hue = 197 + Math.random() * 15; // primary blue (#8CCDEB ≈ 200°)
        } else {
          hue = 260 + Math.random() * 20; // secondary purple (#725CAD ≈ 266°)
        }
        return {
          x: (Math.random() - 0.5) * W * 2,
          y: (Math.random() - 0.5) * H * 2,
          z: Math.random() * W,
          pz: 0,
          hue,
        };
      });
      starsRef.current.forEach(s => { s.pz = s.z; });
    };

    resize();
    window.addEventListener('resize', resize);

    let startTime = null;
    const TOTAL_DURATION = 3200;

    const draw = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const rawProgress = Math.min(elapsed / TOTAL_DURATION, 1);

      let speed;
      if (rawProgress < 0.15) {
        speed = rawProgress / 0.15;
      } else if (rawProgress < 0.8) {
        speed = 1;
      } else {
        speed = 1 - ((rawProgress - 0.8) / 0.2) * 0.85;
      }
      speedRef.current = speed;

      const displayProgress = Math.min(rawProgress * 105, 100);
      progressRef.current = displayProgress;
      setProgress(Math.round(displayProgress));
      setStatusIndex(Math.min(Math.floor(rawProgress * statuses.length), statuses.length - 1));

      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 2;

      const fadeAlpha = 0.15 + (1 - speed) * 0.5;
      ctx.fillStyle = `rgba(11, 29, 81, ${fadeAlpha})`;
      ctx.fillRect(0, 0, W, H);

      const warpStep = speed * 30 + 0.5;

      starsRef.current.forEach(star => {
        star.pz = star.z;
        star.z -= warpStep;

        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * W * 2;
          star.y = (Math.random() - 0.5) * H * 2;
          star.z = W;
          star.pz = star.z;
        }

        const sx = (star.x / star.z) * W + cx;
        const sy = (star.y / star.z) * H + cy;
        const px = (star.x / star.pz) * W + cx;
        const py = (star.y / star.pz) * H + cy;

        const size = Math.max(0.3, (1 - star.z / W) * 3.5);
        const alpha = Math.min(1, (1 - star.z / W) * 1.8);

        if (speed > 0.15) {
          const len = Math.hypot(sx - px, sy - py);
          if (len > 0.5) {
            const gradient = ctx.createLinearGradient(px, py, sx, sy);
            gradient.addColorStop(0, `hsla(${star.hue}, 80%, 70%, 0)`);
            gradient.addColorStop(1, `hsla(${star.hue}, 85%, 85%, ${alpha})`);
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(sx, sy);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = size;
            ctx.stroke();
          }
        } else {
          ctx.beginPath();
          ctx.arc(sx, sy, size * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${star.hue}, 70%, 85%, ${alpha})`;
          ctx.fill();
        }
      });

      // Central warp core glow — primary→secondary gradient
      if (speed > 0.3) {
        const coreSize = speed * 140;
        const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreSize);
        coreGrad.addColorStop(0, `rgba(140, 205, 235, ${speed * 0.3})`);
        coreGrad.addColorStop(0.4, `rgba(114, 92, 173, ${speed * 0.12})`);
        coreGrad.addColorStop(1, 'rgba(11, 29, 81, 0)');
        ctx.fillStyle = coreGrad;
        ctx.fillRect(0, 0, W, H);
      }

      // Warm gold exit flash
      if (rawProgress > 0.88) {
        const flashAlpha = Math.pow((rawProgress - 0.88) / 0.12, 2) * 0.9;
        ctx.fillStyle = `rgba(255, 227, 169, ${flashAlpha})`;
        ctx.fillRect(0, 0, W, H);
      }

      if (rawProgress < 1) {
        animRef.current = requestAnimationFrame(draw);
      } else {
        setDone(true);
        setTimeout(onComplete, 600);
      }
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#0B1D51',
            overflow: 'hidden',
          }}
        >
          <canvas
            ref={canvasRef}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'block' }}
          />

          {/* Hex Grid Overlay */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            opacity: 0.04,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%238CCDEB' fill-opacity='1'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            zIndex: 2,
          }} />

          {/* Vignette */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at center, transparent 35%, rgba(11, 29, 81, 0.7) 100%)',
            zIndex: 2,
          }} />

          {/* HUD */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 10,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none',
            gap: '1.5rem',
          }}>
            {/* RC Monogram */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: 'easeOut' }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <h1 style={{
                margin: 0,
                fontSize: 'clamp(3rem, 8vw, 5.5rem)',
                fontWeight: 900,
                fontFamily: "'Orbitron', sans-serif",
                letterSpacing: '0.2em',
                background: 'linear-gradient(135deg, #8CCDEB 0%, #725CAD 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
                textShadow: 'none',
                filter: 'drop-shadow(0 0 30px rgba(140, 205, 235, 0.5)) drop-shadow(0 0 60px rgba(114, 92, 173, 0.3))',
              }}>
                RC
              </h1>

              {/* Typed tagline */}
              <div style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)',
                letterSpacing: '0.3em',
                color: '#FFE3A9',
                opacity: 0.9,
                minHeight: '1.2em',
                textTransform: 'uppercase',
              }}>
                {typedText}
                <span style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '1em',
                  background: '#8CCDEB',
                  marginLeft: '2px',
                  verticalAlign: 'text-bottom',
                  animation: 'cursorBlink 1s step-end infinite',
                }} />
              </div>
            </motion.div>

            {/* Progress Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              style={{
                width: 'clamp(260px, 38vw, 420px)',
                display: 'flex', flexDirection: 'column', gap: '0.6rem',
              }}
            >
              {/* Status text */}
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '0.65rem', letterSpacing: '0.12em',
                color: 'rgba(140, 205, 235, 0.7)',
              }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={statusIndex}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {statuses[statusIndex]}
                  </motion.span>
                </AnimatePresence>
                <span style={{
                  color: '#FFE3A9',
                  fontWeight: 700,
                  fontSize: '0.72rem',
                }}>
                  {Math.min(Math.round(progress), 100)}%
                </span>
              </div>

              {/* Progress Bar */}
              <div style={{
                width: '100%',
                height: '3px',
                background: 'rgba(140, 205, 235, 0.08)',
                borderRadius: '4px',
                overflow: 'hidden',
                position: 'relative',
              }}>
                <div style={{
                  height: '100%',
                  width: `${Math.min(progress, 100)}%`,
                  background: 'linear-gradient(90deg, #725CAD, #8CCDEB, #FFE3A9)',
                  borderRadius: '4px',
                  boxShadow: '0 0 12px rgba(140, 205, 235, 0.8), 0 0 24px rgba(114, 92, 173, 0.4)',
                  transition: 'width 0.06s linear',
                }} />
              </div>

              {/* Segment indicators */}
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(30)].map((_, i) => {
                  const lit = i / 30 <= progress / 100;
                  const hue = 197 + (i / 30) * 70;
                  return (
                    <div key={i} style={{
                      flex: 1,
                      height: '2px',
                      borderRadius: '1px',
                      background: lit
                        ? `hsl(${hue}, 70%, 65%)`
                        : 'rgba(140, 205, 235, 0.06)',
                      boxShadow: lit ? `0 0 4px hsla(${hue}, 80%, 65%, 0.6)` : 'none',
                      transition: 'all 0.08s ease',
                    }} />
                  );
                })}
              </div>
            </motion.div>

            {/* Bottom branding */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              style={{
                margin: 0,
                fontSize: '0.55rem',
                letterSpacing: '0.5em',
                color: 'rgba(114, 92, 173, 0.9)',
                fontFamily: "'Share Tech Mono', monospace",
              }}
            >
              ◆ &nbsp;RISHAB.DEV&nbsp; ◆
            </motion.p>
          </div>

          <style>{`
            @keyframes cursorBlink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;