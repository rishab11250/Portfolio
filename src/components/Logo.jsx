import React from 'react';

const Logo = () => {
    return (
        <div className="logo-container" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <svg
                width="54"
                height="54"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Rishab Chandgothia Logo"
                style={{ transition: 'transform 0.25s ease' }}
            >
                <defs>
                    <linearGradient id="navLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#818cf8" />
                    </linearGradient>
                    <linearGradient id="navLogoBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#818cf8" stopOpacity="0.3" />
                    </linearGradient>
                    <filter id="navLogoGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2.5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>
                <rect width="64" height="64" rx="16" fill="var(--bg-surface, #10131d)" />
                <rect x="1.5" y="1.5" width="61" height="61" rx="14.5" fill="none" stroke="url(#navLogoBorderGrad)" strokeWidth="2" />
                <text
                    x="31"
                    y="43"
                    fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', 'Orbitron', sans-serif"
                    fontWeight="900"
                    fontSize="27"
                    fill="url(#navLogoGrad)"
                    textAnchor="middle"
                    letterSpacing="1"
                    filter="url(#navLogoGlow)"
                >
                    RC
                </text>
                <circle cx="50" cy="18" r="3" fill="#38bdf8" />
            </svg>
        </div>
    );
};

export default Logo;
