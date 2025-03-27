'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export default function ShirtModel() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} scale={[1.5, 2, 0.8]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color='#8ac926' />
    </mesh>
  );
}
