import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus, Stars, Sparkles } from '@react-three/drei';

const WarpTunnel = ({ ringCount }) => {
    const groupRef = useRef();

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.position.z += delta * 40;
            if (groupRef.current.position.z > 20) {
                groupRef.current.position.z = -20;
            }
        }
    });

    const rings = Array.from({ length: ringCount }, (_, i) => ({
        z: -i * 1.5,
        scale: 1 + Math.random() * 1.5,
        color: i % 2 === 0 ? "#00f3ff" : "#ff00ff"
    }));

    return (
        <group ref={groupRef}>
            {rings.map((ring, i) => (
                <Torus key={i} args={[3, 0.05, 16, 100]} position={[0, 0, ring.z]} scale={ring.scale}>
                    <meshStandardMaterial
                        color={ring.color}
                        emissive={ring.color}
                        emissiveIntensity={4}
                        toneMapped={false}
                    />
                </Torus>
            ))}
        </group>
    );
};

const LoadingScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isLowPerf, setIsLowPerf] = useState(false);

    useEffect(() => {
        const checkPerformance = () => {
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            const isLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
            const isSlowConnection = navigator.connection?.effectiveType === '2g' || navigator.connection?.effectiveType === 'slow-2g';
            
            setIsLowPerf(isMobile || isLowMemory || isSlowConnection);
        };
        checkPerformance();
    }, []);

    const ringCount = isLowPerf ? 20 : 60;
    const starCount = isLowPerf ? 1500 : 7000;
    const sparkleCount = isLowPerf ? 200 : 1000;

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
        }, 20);
        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <div className="hyper-loader-container">
            <Canvas camera={{ position: [0, 0, 5], fov: 90 }}>
                <ambientLight intensity={0.5} />
                <Stars radius={100} depth={50} count={starCount} factor={4} saturation={0} fade speed={5} />
                <fog attach="fog" args={['#000000', 5, 20]} />
                <WarpTunnel ringCount={ringCount} />
                <Sparkles
                    count={sparkleCount}
                    scale={[10, 10, 20]}
                    size={isLowPerf ? 8 : 5}
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
