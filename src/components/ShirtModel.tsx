'use client';

import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ShirtModel() {
  const shirtRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/tshirt.glb');

  useFrame(() => {
    if (shirtRef.current) {
      shirtRef.current.rotation.y += 0.003;
    }
  });

  return (
    <primitive
      ref={shirtRef}
      object={scene}
      scale={[2.5, 2.5, 2.5]}
      position={[0, -3, 0]}
      rotation={[0, Math.PI, 0]}
    />
  );
}
