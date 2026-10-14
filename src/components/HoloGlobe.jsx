import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { AdditiveBlending } from 'three';

// Seeded random for deterministic particle positions (pure function)
function seededRandom(seed) {
    let s = seed % 2147483647;
    if (s <= 0) s += 2147483646;
    return () => {
        s = (s * 16807) % 2147483647;
        return (s - 1) / 2147483646;
    };
}

const ParticleRing = ({ count, radius, color, speed, opacity, size }) => {
    const points = useRef();

    const particles = useMemo(() => {
        const rand = seededRandom(count + radius * 1000);
        const temp = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const angle = rand() * Math.PI * 2;
            const r = radius + (rand() - 0.5) * 1.5;
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;
            const z = (rand() - 0.5) * 0.2;

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
                blending={AdditiveBlending}
            />
        </points>
    );
};

const EventHorizon = ({ isLight }) => {
    return (
        <mesh>
            <sphereGeometry args={[1.2, 32, 32]} />
            <meshStandardMaterial
                color={isLight ? "#ffffff" : "#000000"}
                emissive={isLight ? "#00f3ff" : "#000000"}
                emissiveIntensity={isLight ? 2 : 0}
                roughness={0.1}
            />
        </mesh>
    );
};

const NativeStars = ({ radius = 100, depth = 50, count = 3000, speed = 0.5 }) => {
    const pointsRef = useRef();

    const positions = useMemo(() => {
        const rand = seededRandom(count + radius * 777 + depth);
        const coords = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const r = radius + (rand() - 0.5) * depth;
            const theta = 2 * Math.PI * rand();
            const phi = Math.acos(2 * rand() - 1);
            coords[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            coords[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            coords[i * 3 + 2] = r * Math.cos(phi);
        }
        return coords;
    }, [count, radius, depth]);

    useFrame((_, delta) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y -= delta * (speed * 0.05);
            pointsRef.current.rotation.x -= delta * (speed * 0.02);
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.06}
                color="#ffffff"
                transparent
                opacity={0.8}
                sizeAttenuation={true}
                depthWrite={false}
            />
        </points>
    );
};

const HoloGlobe = () => {
    const containerRef = useRef(null);
    const [isInView, setIsInView] = useState(true);
    const [theme, setTheme] = useState(() =>
        document.documentElement.getAttribute('data-theme') || 'dark'
    );
    const [isLowPerf] = useState(() => {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
        const isSlowConnection = navigator.connection?.effectiveType === '2g' || navigator.connection?.effectiveType === 'slow-2g';
        return isMobile || isLowMemory || isSlowConnection;
    });

    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new IntersectionObserver(([entry]) => {
            setIsInView(entry.isIntersecting);
        }, { threshold: 0.05 });

        observer.observe(containerRef.current);
        return () => observer.disconnect();
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
        return () => observer.disconnect();
    }, []);

    const isLight = theme === 'light';

    const particleCount1 = isLowPerf ? 400 : 2000;
    const particleCount2 = isLowPerf ? 600 : 3000;
    const particleCount3 = isLowPerf ? 150 : 800;
    const starCount = isLowPerf ? 500 : 2500;

    return (
        <div ref={containerRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
            <Canvas
                frameloop={isInView ? 'always' : 'never'}
                dpr={isLowPerf ? [1, 1] : [1, 1.5]}
                camera={{ position: [0, 0, 7], fov: 45 }}
                gl={{ alpha: true, antialias: !isLowPerf, powerPreference: 'high-performance', stencil: false }}
            >
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
                    <NativeStars radius={100} depth={50} count={starCount} speed={0.5} />
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
