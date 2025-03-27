'use client';

import { useGLTF } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ShirtProps {
  shirtColor: string;
}

export default function ShirtModel({ shirtColor }: ShirtProps) {
  const shirtRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/tshirt.glb');

  // Apply new material color to all meshes
  useEffect(() => {
    scene.traverse(child => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
          color: shirtColor,
        });
      }
    });
  }, [scene, shirtColor]);

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
