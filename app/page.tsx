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

    </div>
  );
}
