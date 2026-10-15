import { ImageResponse } from 'next/og';

export const alt = 'Rishab Chandgothia | Full Stack Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 80px',
          background: 'linear-gradient(135deg, #090a0f 0%, #0B1D51 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '12px',
                border: '2px solid rgba(56, 189, 248, 0.6)',
                background: 'rgba(56, 189, 248, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 900,
                color: '#38bdf8',
              }}
            >
              RC
            </div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#94a3b8', letterSpacing: '2px' }}>
              WWW.ITSRISHAB.XYZ
            </div>
          </div>
          <div
            style={{
              padding: '8px 18px',
              borderRadius: '20px',
              background: 'rgba(52, 211, 153, 0.15)',
              border: '1px solid rgba(52, 211, 153, 0.4)',
              color: '#34d399',
              fontSize: '16px',
              fontWeight: 700,
            }}
          >
            ● AVAILABLE FOR HIRE
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '64px', fontWeight: 900, letterSpacing: '-1px' }}>
            Rishab Chandgothia
          </div>
          <div
            style={{
              fontSize: '32px',
              fontWeight: 700,
              background: 'linear-gradient(90deg, #38bdf8, #818cf8)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Full Stack Developer & Software Engineer
          </div>
          <div style={{ fontSize: '20px', color: '#94a3b8', maxWidth: '850px' }}>
            Crafting high-performance, modern web applications, interactive 3D experiences, and robust architectures.
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Tailwind CSS'].map((tech) => (
            <div
              key={tech}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                background: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                color: '#e0f2fe',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
