'use client';

import { useEffect, useState } from 'react';

interface BinaryDigit {
  id: number;
  left: number;
  top: number;
  fontSize: number;
  digit: '0' | '1';
}

export default function BinaryBackground() {
  const [digits, setDigits] = useState<BinaryDigit[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Generate random binary digits only on the client after hydration
    const newDigits: BinaryDigit[] = [...Array(12)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      fontSize: 12 + Math.random() * 8,
      digit: Math.random() > 0.5 ? '1' : '0',
    }));
    setDigits(newDigits);
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0f2847] to-[#051020]" />

      {/* Animated binary digits */}
      {mounted && (
        <div className="absolute inset-0">
          {digits.map((digit) => (
            <div
              key={digit.id}
              className="absolute text-[#00ff88] opacity-20 font-mono text-sm animate-float"
              style={{
                left: `${digit.left}%`,
                top: `${digit.top}%`,
                animationDelay: `${digit.id * 0.5}s`,
                fontSize: `${digit.fontSize}px`,
              }}
            >
              {digit.digit}
            </div>
          ))}
        </div>
      )}

      {/* Cipher wheel - rotating background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-5 animate-spin-slow">
        <div className="absolute inset-0 border-4 border-[#00ff88] rounded-full" />
        <div className="absolute inset-8 border-2 border-[#00ccff] rounded-full" />
        <div className="absolute inset-16 border border-[#00ff88] rounded-full" />
      </div>

      {/* Glow orbs */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-[#00ff88] rounded-full blur-3xl opacity-10" />
      <div className="absolute bottom-32 left-5 w-40 h-40 bg-[#00ccff] rounded-full blur-3xl opacity-5" />
    </div>
  );
}
