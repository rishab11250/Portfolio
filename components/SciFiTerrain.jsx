"use client";
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

// Sleek ambient perspective horizon grid (Linear / Vercel dark style)
const MovingGrid = () => {
  const gridRef = useRef();
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.elapsedTime * 6) % 10;
    }
  });

  const gridColor = 0x1e293b;

  return (
    <group ref={gridRef}>
      <gridHelper args={[100, 50, gridColor, gridColor]} position={[0, -2.5, 0]} />
      <gridHelper args={[100, 50, gridColor, gridColor]} position={[0, -2.5, -100]} />
    </group>
  );
};

const SciFiTerrain = () => {
  const bgColor = '#090a0f';
  const fogColor = '#090a0f';

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: bgColor,
        transition: 'background 0.5s ease',
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 1, 5], fov: 75 }}
        gl={{ powerPreference: 'low-power', antialias: false, stencil: false }}
      >
        <color attach="background" args={[bgColor]} />
        <fog attach="fog" args={[fogColor, 4, 25]} />
        <ambientLight intensity={0.5} />

        <MovingGrid />
      </Canvas>
    </div>
  );
};

export default SciFiTerrain;
