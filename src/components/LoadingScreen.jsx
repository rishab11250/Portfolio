import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus, Stars, Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';

const WarpTunnel = () => {
    const groupRef = useRef();

    useFrame((state, delta) => {
        if (groupRef.current) {
            // INCREASED SPEED: 15 -> 40
            groupRef.current.position.z += delta * 40;
            if (groupRef.current.position.z > 20) {
                groupRef.current.position.z = -20;
            }
        }
    });

    // MORE RINGS: 30 -> 60 for density
    const rings = Array.from({ length: 60 }, (_, i) => ({
        z: -i * 1.5,
        scale: 1 + Math.random() * 1.5, // More random sizing
        color: i % 2 === 0 ? "#00f3ff" : "#ff00ff"
    }));

    return (
        <group ref={groupRef}>
            {rings.map((ring, i) => (
                <Torus key={i} args={[3, 0.05, 16, 100]} position={[0, 0, ring.z]} scale={ring.scale}>
                    <meshStandardMaterial
                        color={ring.color}
                        emissive={ring.color}
                        emissiveIntensity={4} // BRIGHTER
                        toneMapped={false}
                    />
                </Torus>
            ))}
        </group>
    );
};

const LoadingScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return Math.min(prev + 1, 100);
            });
        }, 20); // Faster updates
        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <div className="hyper-loader-container">
            <Canvas camera={{ position: [0, 0, 5], fov: 90 }}> {/* FOV 90 for speed */}
                <ambientLight intensity={0.5} />
                <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={5} />
                <fog attach="fog" args={['#000000', 5, 20]} />
                <WarpTunnel />

                {/* WARP LINES via Scaled Sparkles */}
                <Sparkles
                    count={1000}
                    scale={[10, 10, 20]} // Stretch in Z
                    size={5}
                    speed={2}
                    opacity={0.8}
                    color="#ffffff"
                />
            </Canvas>

            <div className="hyper-ui">
                <div className="title-wrapper">
                    <h1 className="hyper-title">ENTERING HYPERSPACE</h1>
                </div>
                <div className="hyper-bar-wrapper">
                    <div className="hyper-bar" style={{ width: `${progress}%`, boxShadow: '0 0 30px #00f3ff' }}></div>
                </div>
                <div className="hyper-status" style={{ fontSize: '1.5rem', letterSpacing: '3px' }}>WARP VELOCITY: {progress}%</div>
            </div>

            <div className="scanlines"></div>
        </div>
    );
};

export default LoadingScreen;
