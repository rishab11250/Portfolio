import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

// Sleek ambient perspective horizon grid (Linear / Vercel dark style)
const MovingGrid = ({ isDarkMode }) => {
    const gridRef = useRef();
    useFrame((state) => {
        if (gridRef.current) {
            gridRef.current.position.z = (state.clock.elapsedTime * 6) % 10;
        }
    });

    const gridColor = isDarkMode ? 0x1e293b : 0xcbd5e1;
    const centerColor = isDarkMode ? 0x38bdf8 : 0x0284c7;

    return (
        <group ref={gridRef}>
            <gridHelper args={[100, 50, centerColor, gridColor]} position={[0, -2.5, 0]} />
            <gridHelper args={[100, 50, centerColor, gridColor]} position={[0, -2.5, -100]} />
        </group>
    );
};

const SciFiTerrain = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const checkTheme = () => {
            const theme = document.documentElement.getAttribute('data-theme');
            setIsDarkMode(theme !== 'light');
        };

        checkTheme();

        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

        return () => observer.disconnect();
    }, []);

    const bgColor = isDarkMode ? '#090a0f' : '#f8fafc';
    const fogColor = isDarkMode ? '#090a0f' : '#f8fafc';

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            background: bgColor,
            transition: 'background 0.5s ease'
        }}>
            <Canvas
                dpr={[1, 1.5]}
                camera={{ position: [0, 1, 5], fov: 75 }}
                gl={{ powerPreference: 'low-power', antialias: false, stencil: false }}
            >
                <color attach="background" args={[bgColor]} />
                <fog attach="fog" args={[fogColor, 4, 25]} />
                <ambientLight intensity={0.5} />

                <MovingGrid isDarkMode={isDarkMode} />
            </Canvas>
        </div>
    );
};

export default SciFiTerrain;
