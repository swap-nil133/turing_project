import { Lock, Unlock } from 'lucide-react';

interface LandingScreenProps {
  onEncode: () => void;
  onDecode: () => void;
}

export default function LandingScreen({ onEncode, onDecode }: LandingScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      {/* Title Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-mono mb-2 text-[#00ff88] drop-shadow-lg">
          TURING CIPHER
        </h1>
        <p className="text-base text-[#00ccff] font-mono">Inspired by Alan Turing</p>
        <div className="h-0.5 w-32 bg-gradient-to-r from-[#00ff88] to-[#00ccff] mx-auto mt-4 opacity-60" />
      </div>

      {/* Main Buttons */}
      <div className="w-full max-w-xs space-y-6">
        {/* Encode Button */}
        <button
          onClick={onEncode}
          className="w-full py-4 px-6 bg-[#0f2547] border-2 border-[#00ff88] rounded-lg font-mono text-lg font-semibold text-[#00ff88] relative group overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 animate-glow"
        >
          <div className="absolute inset-0 bg-[#00ff88] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          <div className="relative flex items-center justify-center gap-3">
            <Lock size={24} />
            <span>ENCODE</span>
          </div>
        </button>

        {/* Decode Button */}
        <button
          onClick={onDecode}
          className="w-full py-4 px-6 bg-[#0f2547] border-2 border-[#00ccff] rounded-lg font-mono text-lg font-semibold text-[#00ccff] relative group overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 animate-glow"
          style={{ animationDelay: '0.3s' }}
        >
          <div className="absolute inset-0 bg-[#00ccff] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          <div className="relative flex items-center justify-center gap-3">
            <Unlock size={24} />
            <span>DECODE</span>
          </div>
        </button>
      </div>

      {/* Footer Info */}
      <div className="mt-16 text-center text-xs text-[#7a9ab3] font-mono max-w-xs">
        <p className="opacity-70">Inspired by WWII Enigma Machines</p>
        <p className="opacity-70">Mobile-optimized for QR scanning</p>
      </div>
    </div>
  );
}
