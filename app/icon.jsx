import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#090a0f',
          borderRadius: '7px',
          border: '1.5px solid rgba(56, 189, 248, 0.8)',
          color: '#38bdf8',
          fontSize: '17px',
          fontWeight: 900,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          letterSpacing: '0.5px',
        }}
      >
        RC
      </div>
    ),
    {
      ...size,
    }
  );
}
