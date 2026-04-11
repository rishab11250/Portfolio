import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

const WormholeTunnel = () => {
    const meshRef = useRef();
    const materialRef = useRef();
    
    // Create a much smoother, longer tunnel using a CatmullRomCurve3
    const curve = useMemo(() => {
        const points = [];
        for (let i = 0; i <= 20; i++) {
            points.push(new THREE.Vector3(
                Math.sin(i * 0.3) * 3,
                Math.cos(i * 0.3) * 3,
                -i * 10
            ));
        }
        return new THREE.CatmullRomCurve3(points);
    }, []);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color("#00f3ff") },
        uColor2: { value: new THREE.Color("#8000ff") },
    }), []);

    useFrame((state, delta) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value += delta * 0.5;
        }
    });

    return (
        <group>
            <mesh ref={meshRef}>
                <tubeGeometry args={[curve, 100, 4, 32, false]} />
                <shaderMaterial
                    ref={materialRef}
                    side={THREE.BackSide}
                    transparent
                    uniforms={uniforms}
                    vertexShader={`
                        varying vec2 vUv;
                        void main() {
                            vUv = uv;
                            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                        }
                    `}
                    fragmentShader={`
                        uniform float uTime;
                        uniform vec3 uColor1;
                        uniform vec3 uColor2;
                        varying vec2 vUv;

                        // Simplex 2D noise for organic flow
                        vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
                        float snoise(vec2 v){
                          const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                                   -0.577350269189626, 0.024390243902439);
                          vec2 i  = floor(v + dot(v, C.yy) );
                          vec2 x0 = v -   i + dot(i, C.xx);
                          vec2 i1;
                          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                          vec4 x12 = x0.xyxy + C.xxzz;
                          x12.xy -= i1;
                          i = mod(i, 289.0);
                          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                          + i.x + vec3(0.0, i1.x, 1.0 ));
                          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                            dot(x12.zw,x12.zw)), 0.0);
                          m = m*m ;
                          m = m*m ;
                          vec3 x = 2.0 * fract(p * C.www) - 1.0;
                          vec3 h = abs(x) - 0.5;
                          vec3 a0 = x - floor(x + 0.5);
                          vec3 g = a0 * vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw));
                          float n = 130.0 * dot(m, g);
                          return n;
                        }

                        void main() {
                            vec2 uv = vUv;
                            float speed = uTime * 0.4;
                            
                            // Scrolling noise pattern
                            float n = snoise(vec2(uv.x * 10.0, uv.y * 5.0 - speed));
                            float n2 = snoise(vec2(uv.x * 20.0 + speed, uv.y * 10.0));
                            
                            // Combine noises for energy flow
                            float energy = smoothstep(0.1, 0.9, n * 0.5 + n2 * 0.5 + 0.5);
                            
                            // Color mapping
                            vec3 color = mix(uColor1, uColor2, energy);
                            color += energy * vec3(0.1, 0.2, 0.3); // Bright highlights
                            
                            // Glowing streaks
                            float streaks = pow(abs(sin(uv.x * 30.0 + speed * 2.0)), 10.0);
                            color += streaks * uColor1 * 0.5;

                            // Distance fade (fog)
                            float distFade = smoothstep(0.0, 0.2, uv.y) * smoothstep(1.0, 0.8, uv.y);
                            
                            gl_FragColor = vec4(color, distFade * 0.9);
                        }
                    `}
                />
            </mesh>
            {/* Speed lines/particles */}
            <Sparkles count={400} scale={[15, 15, 100]} size={3} speed={0.8} opacity={0.4} color="#00f3ff" />
        </group>
    );
};

const LoadingScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState("INITIATING SYSTEMS");

    useEffect(() => {
        const statuses = [
            "CALIBRATING SENSORS...",
            "STABILIZING SINGULARITY...",
            "MAPPING VOID COORDINATES...",
            "SYNCING NEURAL INTERFACE...",
            "PREPARING FOR TRANSITION..."
        ];
        
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 1000);
                    return 100;
                }
                const newProgress = prev + (Math.random() * 2 + 0.5);
                
                // Update status based on progress
                const statusIdx = Math.floor((newProgress / 100) * statuses.length);
                if (statuses[statusIdx]) setStatusText(statuses[statusIdx]);
                
                return Math.min(newProgress, 100);
            });
        }, 30);
        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="hyper-loader-container"
        >
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                <color attach="background" args={["#000008"]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[0, 0, 10]} intensity={2} color="#00f3ff" />
                
                <Stars radius={150} depth={50} count={5000} factor={4} saturation={0.5} fade speed={2} />
                <fog attach="fog" args={['#000008', 5, 30]} />
                
                <WormholeTunnel />
                
                {/* Core light at the center */}
                <mesh position={[0, 0, -80]}>
                    <sphereGeometry args={[10, 32, 32]} />
                    <meshStandardMaterial 
                        emissive="#00f3ff" 
                        emissiveIntensity={15} 
                        toneMapped={false}
                    />
                </mesh>
            </Canvas>

            <div className="hyper-ui">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="loader-wrapper"
                >
                    <h1 className="hyper-title">WARP ENGAGED</h1>
                    
                    <div className="hyper-bar-container">
                        <motion.div 
                            className="hyper-bar-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                        />
                        <div className="hyper-bar-glow" style={{ width: `${progress}%` }} />
                    </div>
                    
                    <div className="status-container">
                        <span className="status-percent">{Math.round(progress)}%</span>
                        <span className="status-text">{statusText}</span>
                    </div>
                </motion.div>
            </div>

            <div className="vignette"></div>
            <div className="scanline-overlay"></div>
        </motion.div>
    );
};

export default LoadingScreen;
