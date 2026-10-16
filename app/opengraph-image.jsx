import { ImageResponse } from 'next/og';

export const alt = 'Rishab Chandgothia | Full Stack Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const actualTechs = ['React', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 80px',
          backgroundColor: '#F1ECE0',
          color: '#17181C',
          fontFamily: 'serif',
          border: '16px solid #1E3A5F',
        }}
      >
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Red Seal */}
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '12px',
                backgroundColor: '#C91F37',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F1ECE0',
                fontSize: '22px',
                fontWeight: 900,
                fontFamily: 'sans-serif',
                border: '1.5px solid rgba(241, 236, 224, 0.5)',
              }}
            >
              RC
            </div>
            <div
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#5E636D',
                letterSpacing: '2px',
                fontFamily: 'sans-serif',
              }}
            >
              WWW.ITSRISHAB.XYZ
            </div>
          </div>
          <div
            style={{
              padding: '8px 20px',
              borderRadius: '9999px',
              backgroundColor: '#1E3A5F',
              color: '#F1ECE0',
              fontSize: '15px',
              fontWeight: 700,
              fontFamily: 'sans-serif',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Full Stack Developer
          </div>
        </div>

        {/* Center Title & One-Liner */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: '68px',
              fontWeight: 900,
              color: '#17181C',
              letterSpacing: '-1px',
              lineHeight: 1.1,
            }}
          >
            Rishab Chandgothia
          </div>
          <div
            style={{
              fontSize: '26px',
              color: '#1E3A5F',
              fontWeight: 700,
              fontFamily: 'sans-serif',
            }}
          >
            Crafting dependable web applications with modern frontend engineering and tested backend systems.
          </div>
        </div>

        {/* Tech Stack Pills (factual only, no PostgreSQL) */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {actualTechs.map((tech) => (
            <div
              key={tech}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                backgroundColor: 'rgba(30, 58, 95, 0.08)',
                border: '1px solid rgba(30, 58, 95, 0.25)',
                color: '#0B2545',
                fontSize: '16px',
                fontWeight: 600,
                fontFamily: 'sans-serif',
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
