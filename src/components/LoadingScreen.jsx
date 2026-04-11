import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const starsRef = useRef([]);
  const speedRef = useRef(0);
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [done, setDone] = useState(false);

  const statuses = [
    'INITIATING WARP DRIVE...',
    'ACCELERATING TO LIGHTSPEED...',
    'TRAVERSING THE VOID...',
    'APPROACHING DESTINATION...',
    'DROPPING OUT OF WARP...',
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re-init stars on resize
      initStars();
    };

    const STAR_COUNT = 800;

    const initStars = () => {
      const W = canvas.width;
      const H = canvas.height;
      starsRef.current = Array.from({ length: STAR_COUNT }, () => ({
        x: (Math.random() - 0.5) * W * 2,
        y: (Math.random() - 0.5) * H * 2,
        z: Math.random() * W,
        pz: 0,
        hue: Math.random() > 0.7 ? 185 + Math.random() * 80 : 200,
      }));
      starsRef.current.forEach(s => { s.pz = s.z; });
    };

    resize();
    window.addEventListener('resize', resize);

    let startTime = null;
    const TOTAL_DURATION = 3200; // ms

    const draw = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const rawProgress = Math.min(elapsed / TOTAL_DURATION, 1);

      // Ease: accelerate fast, hold, then slow bloom at end
      let speed;
      if (rawProgress < 0.15) {
        speed = rawProgress / 0.15; // ramp up
      } else if (rawProgress < 0.8) {
        speed = 1; // full warp
      } else {
        speed = 1 - ((rawProgress - 0.8) / 0.2) * 0.85; // slow down
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

      // Trail fade — shorter trail = less fade = longer streaks
      const fadeAlpha = 0.18 + (1 - speed) * 0.55;
      ctx.fillStyle = `rgba(0, 0, 8, ${fadeAlpha})`;
      ctx.fillRect(0, 0, W, H);

      const warpStep = speed * 28 + 0.5;

      starsRef.current.forEach(star => {
        star.pz = star.z;
        star.z -= warpStep;

        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * W * 2;
          star.y = (Math.random() - 0.5) * H * 2;
          star.z = W;
          star.pz = star.z;
        }

        // Project to screen
        const sx = (star.x / star.z) * W + cx;
        const sy = (star.y / star.z) * H + cy;
        const px = (star.x / star.pz) * W + cx;
        const py = (star.y / star.pz) * H + cy;

        const size = Math.max(0.3, (1 - star.z / W) * 3.5);
        const brightness = Math.floor((1 - star.z / W) * 255);
        const alpha = Math.min(1, (1 - star.z / W) * 1.8);

        // At warp speed, draw streaks; at low speed, draw dots
        if (speed > 0.15) {
          const len = Math.hypot(sx - px, sy - py);
          if (len > 0.5) {
            const gradient = ctx.createLinearGradient(px, py, sx, sy);
            gradient.addColorStop(0, `hsla(${star.hue}, 100%, 75%, 0)`);
            gradient.addColorStop(1, `hsla(${star.hue}, 100%, 90%, ${alpha})`);
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
          ctx.fillStyle = `hsla(${star.hue}, 80%, 90%, ${alpha})`;
          ctx.fill();
        }
      });

      // Central bright core glow during warp
      if (speed > 0.3) {
        const coreSize = speed * 120;
        const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreSize);
        coreGrad.addColorStop(0, `rgba(200, 240, 255, ${speed * 0.35})`);
        coreGrad.addColorStop(0.3, `rgba(0, 180, 255, ${speed * 0.12})`);
        coreGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = coreGrad;
        ctx.fillRect(0, 0, W, H);
      }

      // Final flash — white bloom as we exit warp
      if (rawProgress > 0.88) {
        const flashAlpha = Math.pow((rawProgress - 0.88) / 0.12, 2) * 0.95;
        ctx.fillStyle = `rgba(220, 240, 255, ${flashAlpha})`;
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
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#000008',
            overflow: 'hidden',
          }}
        >
          <canvas
            ref={canvasRef}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'block' }}
          />

          {/* Scanlines */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'linear-gradient(transparent 50%, rgba(0,0,0,0.06) 50%)',
            backgroundSize: '100% 3px',
            zIndex: 2,
          }} />

          {/* Vignette */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,8,0.6) 100%)',
            zIndex: 2,
          }} />

          {/* HUD */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 10,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Share Tech Mono', monospace",
            pointerEvents: 'none',
            gap: '2rem',
          }}>
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
              style={{
                margin: 0,
                fontSize: 'clamp(2rem, 6vw, 4rem)',
                fontWeight: 900,
                letterSpacing: '0.35em',
                color: '#ffffff',
                textAlign: 'center',
                textShadow: '0 0 20px rgba(0,200,255,1), 0 0 50px rgba(0,150,255,0.7), 0 0 100px rgba(100,0,255,0.4)',
              }}
            >
              LIGHTSPEED
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                width: 'clamp(260px, 40vw, 460px)',
                display: 'flex', flexDirection: 'column', gap: '0.75rem',
              }}
            >
              {/* Status + percent */}
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                fontSize: '0.68rem', letterSpacing: '0.15em',
                color: 'rgba(0,210,255,0.8)',
              }}>
                <motion.span
                  key={statusIndex}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {statuses[statusIndex]}
                </motion.span>
                <span style={{ color: '#fff', fontWeight: 700 }}>
                  {Math.min(Math.round(progress), 100)}%
                </span>
              </div>

              {/* Bar */}
              <div style={{
                width: '100%', height: '2px',
                background: 'rgba(255,255,255,0.06)',
                borderRadius: '2px', overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  width: `${Math.min(progress, 100)}%`,
                  background: 'linear-gradient(90deg, #7b2fff, #00c8ff, #ffffff)',
                  boxShadow: '0 0 10px rgba(0,200,255,1), 0 0 20px rgba(0,150,255,0.5)',
                  transition: 'width 0.06s linear',
                }} />
              </div>

              {/* Pips */}
              <div style={{ display: 'flex', gap: '3px' }}>
                {[...Array(24)].map((_, i) => {
                  const lit = i / 24 <= progress / 100;
                  return (
                    <div key={i} style={{
                      flex: 1, height: '5px', borderRadius: '1px',
                      background: lit ? `hsl(${190 + (i / 24) * 70}, 100%, 68%)` : 'rgba(255,255,255,0.07)',
                      boxShadow: lit ? `0 0 5px hsl(${190 + (i / 24) * 70}, 100%, 68%)` : 'none',
                      transition: 'all 0.1s ease',
                    }} />
                  );
                })}
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.25, 0.85, 0.25] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              style={{
                margin: 0,
                fontSize: '0.58rem',
                letterSpacing: '0.5em',
                color: 'rgba(123,47,255,0.9)',
              }}
            >
              ◆ &nbsp;RISHAB.DEV&nbsp; ◆
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;