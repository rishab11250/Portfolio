import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Terrain = () => {
    const meshRef = useRef();
    // Animate the terrain to simulate flight
    useFrame((state) => {
        if (meshRef.current) {
            // Placeholder for potential terrain animation if needed future
        }
    });

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
            <planeGeometry args={[100, 100, 40, 40]} />
            <meshStandardMaterial
                color="#00bfff"
                wireframe={true}
                transparent={true}
                opacity={0.3}
            />
        </mesh>
    );
};

// More robust "Vaporwave" style grid
const MovingGrid = ({ isDarkMode }) => {
    const gridRef = useRef();
    useFrame((state, delta) => {
        if (gridRef.current) {
            // Move grid towards camera
            gridRef.current.position.z = (state.clock.elapsedTime * 10) % 10;
        }
    });

    const gridColor1 = isDarkMode ? 0x1f1f3d : 0x00bfff; // Dark Blue vs Deep Sky Blue
    const gridColor2 = isDarkMode ? 0x3d1f1f : 0xda70d6; // Dark Red vs Orchid

    return (
        <group ref={gridRef}>
            {/* Floor Grids */}
            <gridHelper args={[80, 40, gridColor1, gridColor1]} position={[0, -2, 0]} />
            <gridHelper args={[80, 40, gridColor1, gridColor1]} position={[0, -2, -80]} />

            {/* Ceiling Grids (Mirrored & Lowered) */}
            <gridHelper args={[80, 40, gridColor2, gridColor2]} position={[0, 4, 0]} />
            <gridHelper args={[80, 40, gridColor2, gridColor2]} position={[0, 4, -80]} />
        </group>
    );
}

const SciFiTerrain = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const checkTheme = () => {
            const theme = document.documentElement.getAttribute('data-theme');
            setIsDarkMode(theme !== 'light');
        };

        checkTheme(); // Initial check

        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

        return () => observer.disconnect();
    }, []);

    const bgColor = isDarkMode ? '#050510' : '#f0f8ff'; // Deep Dark vs Alice Blue
    const fogColor = isDarkMode ? '#050510' : '#f0f8ff';

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
            <Canvas camera={{ position: [0, 1, 5], fov: 75 }}>
                <fog attach="fog" args={[fogColor, 5, 30]} /> {/* Extended Fog for better visibility */}
                <ambientLight intensity={0.5} />

                {/* Moving Grid Floor & Ceiling */}
                <MovingGrid isDarkMode={isDarkMode} />

                {/* Floating "Data" Cubes */}
                <mesh position={[0, 0, -5]}>
                    <boxGeometry args={[100, 100, 100]} />
                    <meshBasicMaterial color={isDarkMode ? "#000" : "#fff"} side={THREE.BackSide} /> {/* Void container */}
                </mesh>
            </Canvas>
        </div>
    );
};

export default SciFiTerrain;
