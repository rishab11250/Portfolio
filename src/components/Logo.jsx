import React from 'react';

const Logo = () => {
    return (
        <div className="logo-container" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <svg
                width="180"
                height="50"
                viewBox="0 0 180 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Rishab Chandgothia Logo"
            >
                <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8CCDEB" />
                        <stop offset="100%" stopColor="#725CAD" />
                    </linearGradient>
                    <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Circuit Board Decor Left */}
                <path
                    d="M10 25 H 25 L 30 20"
                    stroke="url(#logoGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    filter="url(#neonGlow)"
                    opacity="0.8"
                />
                <circle cx="10" cy="25" r="2" fill="#8CCDEB" filter="url(#neonGlow)" />

                {/* Monogram 'RC' */}
                <text
                    x="45"
                    y="35"
                    fontFamily="'Orbitron', sans-serif"
                    fontWeight="900"
                    fontSize="32"
                    fill="url(#logoGradient)"
                    style={{ letterSpacing: '2px' }}
                    filter="url(#neonGlow)"
                >
                    RC
                </text>

                {/* Tech Dot */}
                <circle cx="105" cy="15" r="3" fill="#725CAD">
                    <animate attributeName="opacity" values="0;1;0" duration="2s" repeatCount="indefinite" />
                </circle>

                {/* Circuit Board Decor Right */}
                <path
                    d="M115 25 H 130 L 125 30"
                    stroke="url(#logoGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    filter="url(#neonGlow)"
                    opacity="0.8"
                />
                <circle cx="130" cy="25" r="2" fill="#725CAD" filter="url(#neonGlow)" />

                {/* Full Name Subtext (optional, visible on larger screens) */}
                {/* <text x="45" y="48" fontFamily="sans-serif" fontSize="8" fill="#a0aec0" letterSpacing="1">PORTFOLIO</text> */}
            </svg>
        </div>
    );
};

export default Logo;
