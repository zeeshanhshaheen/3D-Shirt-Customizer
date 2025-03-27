'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Image from 'next/image';
import ShirtModel from '@/components/ShirtModel';

export default function Home() {
  const [color, setColor] = useState('#ffffff');
  const [pattern, setPattern] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const patternOptions = [
    { label: 'None', value: null, src: null },
    {
      label: 'Knit 1',
      value: '/patterns/knit1.png',
      src: '/patterns/knit1.png',
    },
    {
      label: 'Knit 2',
      value: '/patterns/knit3.png',
      src: '/patterns/knit3.png',
    },
    {
      label: 'Knit 3',
      value: '/patterns/knit4.png',
      src: '/patterns/knit4.png',
    },
  ];

  const selectedPattern = patternOptions.find(opt => opt.value === pattern);

  return (
    <main className='min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4'>
      <h1 className='text-2xl font-bold mb-4 text-black'>
        3D Shirt Customizer
      </h1>

      <div className='w-full h-[500px] max-w-4xl bg-white rounded-xl shadow-md mb-4'>
        <Canvas camera={{ position: [0, 1.5, 3.5], fov: 50 }}>
          <ambientLight intensity={1} />
          <Environment preset='warehouse' />
          <ShirtModel shirtColor={color} shirtPattern={pattern} />
          <OrbitControls enablePan={false} />
        </Canvas>
      </div>

      <div className='flex items-center gap-6 mb-4'>
        <div className='flex flex-col items-center'>
          <label className='text-sm font-medium mb-1 text-black'>
            Shirt Color
          </label>
          <div className='w-16 h-16 rounded-full border cursor-pointer relative overflow-hidden'>
            <input
              type='color'
              value={color}
              onChange={e => setColor(e.target.value)}
              className='absolute top-0 left-0 w-full h-full p-0 m-0 border-none outline-none appearance-none'
            />
          </div>
        </div>

        <div className='flex flex-col items-center'>
          <label className='text-sm font-medium mb-1 text-black'>Pattern</label>
          <button
            onClick={() => setIsModalOpen(true)}
            className='flex items-center justify-center w-16 h-16 rounded-full border cursor-pointer overflow-hidden'
          >
            {selectedPattern && selectedPattern.value ? (
              <Image
                src={selectedPattern.src as string}
                alt={selectedPattern.label}
                width={64}
                height={64}
                className='object-cover'
              />
            ) : (
              <span className='text-black text-xs text-center w-full h-full flex items-center justify-center'>
                None
              </span>
            )}
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-transparent z-50'>
          <div className='bg-white rounded-lg p-4 w-80 shadow-xl'>
            <h2 className='text-lg font-bold mb-4 text-black'>
              Select Pattern
            </h2>
            <div className='grid grid-cols-2 gap-4'>
              {patternOptions.map(option => (
                <button
                  key={option.label}
                  onClick={() => {
                    setPattern(option.value);
                    setIsModalOpen(false);
                  }}
                  className='flex items-center justify-center p-2 border rounded-full hover:border-blue-500 w-16 h-16 overflow-hidden'
                >
                  {option.src ? (
                    <Image
                      src={option.src}
                      alt={option.label}
                      width={64}
                      height={64}
                      className='object-cover'
                    />
                  ) : (
                    <span className='text-black text-xs text-center w-full h-full flex items-center justify-center'>
                      None
                    </span>
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className='mt-4 block ml-auto text-blue-500'
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
