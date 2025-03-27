'use client';

import { useGLTF } from '@react-three/drei';
import { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';

interface ShirtProps {
  shirtColor: string;
  shirtPattern: string | null;
}

export default function ShirtModel({ shirtColor, shirtPattern }: ShirtProps) {
  const shirtRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/tshirt.glb');

  const texture = useMemo(() => {
    if (!shirtPattern) return null;

    const loader = new THREE.TextureLoader();
    const tex = loader.load(shirtPattern);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(6, 6);
    tex.flipY = false;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [shirtPattern]);

  useEffect(() => {
    scene.traverse(child => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          map: texture || null,
          color: texture
            ? new THREE.Color('#ffffff')
            : new THREE.Color(shirtColor),
          roughness: 0.7,
          metalness: 0.1,
        });
        mesh.material.needsUpdate = true;
      }
    });
  }, [scene, shirtColor, texture]);

  return (
    <primitive
      ref={shirtRef}
      object={scene}
      scale={[2.5, 2.5, 2.5]}
      position={[0, -1, 0]}
      rotation={[0, Math.PI, 0]}
    />
  );
}
