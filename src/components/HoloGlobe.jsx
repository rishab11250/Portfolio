import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';

const ParticleRing = ({ count, radius, color, speed, opacity, size }) => {
    const points = useRef();

    const particles = useMemo(() => {
        const temp = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const r = radius + (Math.random() - 0.5) * 1.5;
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;
            const z = (Math.random() - 0.5) * 0.2;

            temp[i * 3] = x;
            temp[i * 3 + 1] = y;
            temp[i * 3 + 2] = z;
        }
        return temp;
    }, [count, radius]);

    useFrame((state, delta) => {
        if (points.current) {
            points.current.rotation.z -= delta * speed;
        }
    });

    return (
        <points ref={points} rotation={[Math.PI / 2.5, 0, 0]}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.length / 3}
                    array={particles}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={size}
                color={color}
                transparent
                opacity={opacity}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

const EventHorizon = ({ isLight }) => {
    return (
        <Sphere args={[1.2, 32, 32]}>
            <meshStandardMaterial
                color={isLight ? "#ffffff" : "#000000"}
                emissive={isLight ? "#00f3ff" : "#000000"}
                emissiveIntensity={isLight ? 2 : 0}
                roughness={0.1}
            />
        </Sphere>
    );
};

const HoloGlobe = () => {
    const [theme, setTheme] = useState('dark');
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

    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    setTheme(document.documentElement.getAttribute('data-theme'));
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });
        setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
        return () => observer.disconnect();
    }, []);

    const isLight = theme === 'light';

    const particleCount1 = isLowPerf ? 400 : 2000;
    const particleCount2 = isLowPerf ? 600 : 3000;
    const particleCount3 = isLowPerf ? 150 : 800;
    const starCount = isLowPerf ? 500 : 3000;

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 7], fov: 45 }} gl={{ alpha: true, antialias: !isLowPerf }}>
                <ambientLight intensity={isLight ? 1 : 0.2} />

                <group position={[0, 0, -1]}>
                    <EventHorizon isLight={isLight} />

                    <ParticleRing
                        count={particleCount1}
                        radius={2.2}
                        color={isLight ? "#00f3ff" : "#ffaa00"}
                        speed={0.2}
                        opacity={0.8}
                        size={0.04}
                    />

                    <ParticleRing
                        count={particleCount2}
                        radius={3.5}
                        color={isLight ? "#0066ff" : "#cc3300"}
                        speed={0.1}
                        opacity={0.4}
                        size={0.03}
                    />

                    <group rotation={[Math.PI / 2, 0, 0]}>
                        <ParticleRing
                            count={particleCount3}
                            radius={2.5}
                            color={isLight ? "#ffffff" : "#ffffff"}
                            speed={0.05}
                            opacity={0.1}
                            size={0.02}
                        />
                    </group>
                </group>

                {!isLight && (
                    <Stars radius={100} depth={50} count={starCount} factor={4} saturation={0} fade speed={0.5} />
                )}

                {isLight && (
                    <points>
                        <sphereGeometry args={[100, 64, 64]} />
                        <pointsMaterial color="#000000" size={0.5} transparent opacity={0.2} sizeAttenuation={false} />
                    </points>
                )}
            </Canvas>
        </div>
    );
};

export default HoloGlobe;
