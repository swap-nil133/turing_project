'use client';

import { useState } from 'react';
import BinaryBackground from '@/components/binary-background';
import LandingScreen from '@/components/landing-screen';
import EncodeScreen from '@/components/encode-screen';
import DecodeScreen from '@/components/decode-screen';

type Screen = 'landing' | 'encode' | 'decode';

export default function Home() {
  const [screen, setScreen] = useState<Screen>('landing');

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden flex flex-col">
      <BinaryBackground />
      <div className="relative z-10 flex-1">
        {screen === 'landing' && (
          <LandingScreen onEncode={() => setScreen('encode')} onDecode={() => setScreen('decode')} />
        )}
        {screen === 'encode' && <EncodeScreen onBack={() => setScreen('landing')} />}
        {screen === 'decode' && <DecodeScreen onBack={() => setScreen('landing')} />}
      </div>

      {/* Disclaimer and Credit Section */}
      <div className="relative z-10 flex flex-col items-center gap-3 px-4 py-6 pb-8">
        {/* Disclaimer */}
        <p className="text-xs font-mono text-[#7a9ab3] text-center opacity-70 max-w-md leading-relaxed">
          This application is not a recreation of the Enigma machine. It is a simplified modular shift cipher created to illustrate foundational principles of classical cryptography inspired by the era of Alan Turing.
        </p>

        {/* Credit */}
        <p className="text-xs font-mono text-[#00ff88] text-center animate-glow">
          © 2026 — Developed by Swapnil Sarker
        </p>
      </div>
    </div>
  );
}
