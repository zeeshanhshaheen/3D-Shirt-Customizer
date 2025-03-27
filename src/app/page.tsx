'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import ShirtModel from '@/components/ShirtModel';

export default function Home() {
  return (
    <main className='min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4'>
      <h1 className='text-2xl font-bold mb-4'>3D Shirt Customizer</h1>
      <div className='w-full h-[500px] max-w-4xl bg-white rounded-xl shadow-md'>
        <Canvas camera={{ position: [0, 1.5, 3.5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <Environment preset='warehouse' />
          <ShirtModel />
          <OrbitControls enablePan={false} />
        </Canvas>
      </div>
    </main>
  );
}
