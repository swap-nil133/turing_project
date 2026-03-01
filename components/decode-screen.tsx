'use client';

import { useState } from 'react';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { decode, validateKey } from '@/lib/cipher';

interface DecodeScreenProps {
  onBack: () => void;
}

export default function DecodeScreen({ onBack }: DecodeScreenProps) {
  const [message, setMessage] = useState('');
  const [key, setKey] = useState('');
  const [decoded, setDecoded] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setError('');
    setCopied(false);

    // Validate inputs
    if (!message.trim()) {
      setError('Please enter a secret message to decode');
      return;
    }

    if (!key.trim()) {
      setError('Please enter a key');
      return;
    }

    // Validate key format
    const validation = validateKey(key.trim());
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    try {
      const result = decode(message, key.trim());
      setDecoded(result);
    } catch (err) {
      setError('An error occurred during decoding');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(decoded);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleGenerate();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 p-2 text-[#00ccff] hover:text-[#00ff88] transition-colors duration-200"
      >
        <ArrowLeft size={24} />
      </button>

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold font-mono text-[#00ccff] mb-2">DECODE MESSAGE</h1>
        <p className="text-sm text-[#7a9ab3] font-mono">Reveal the hidden message</p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md space-y-6">
        {/* Secret Message Input */}
        <div>
          <label className="block text-sm font-mono text-[#00ccff] mb-2">Enter secret message</label>
          <textarea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setError('');
            }}
            onKeyPress={handleKeyPress}
            placeholder="Paste the cipher text here..."
            className="w-full h-24 px-4 py-3 bg-[#0f2547] border-2 border-[#1a3a52] rounded-lg text-[#e0e0e0] font-mono text-sm placeholder-[#7a9ab3] focus:outline-none focus:border-[#00ccff] transition-colors duration-200 resize-none"
          />
        </div>

        {/* Key Input */}
        <div>
          <label className="block text-sm font-mono text-[#00ccff] mb-2">Enter key</label>
          <input
            type="text"
            value={key}
            onChange={(e) => {
              setKey(e.target.value.toUpperCase());
              setError('');
            }}
            onKeyPress={handleKeyPress}
            placeholder="Your secret Key"
            className="w-full px-4 py-3 bg-[#0f2547] border-2 border-[#1a3a52] rounded-lg text-[#e0e0e0] font-mono text-base placeholder-[#7a9ab3] focus:outline-none focus:border-[#00ccff] transition-colors duration-200"
          />
          <p className="text-xs text-[#7a9ab3] font-mono mt-2">Enter the encryption key (e.g., E7)</p>
        </div>

        {/* Error Message */}
        {error && <div className="p-3 bg-red-500/15 bg-opacity-20 border border-red-500/40 rounded-lg text-red-400 text-sm font-mono">{error}</div>}

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          className="w-full py-3 px-4 bg-[#00ccff] text-[#0a1628] font-mono font-semibold rounded-lg hover:bg-[#00bbee] transition-colors duration-200 active:scale-95 animate-glow"
          style={{ animationDelay: '0.4s' }}
        >
          GENERATE
        </button>

        {/* Output Section */}
        {decoded && (
          <div className="space-y-3 p-4 bg-[#0f2547] border-2 border-[#00ccff] rounded-lg animate-typewriter">
            <div>
              <p className="text-xs font-mono text-[#00ccff] mb-2">Decoded message:</p>
              <div className="relative p-3 bg-[#0a1628] border border-[#1a3a52] rounded text-[#00ccff] font-mono text-sm break-words min-h-12 flex items-center pr-12">
                {decoded}
                <button
                  onClick={handleCopy}
                  title="Copy"
                  className="absolute bottom-2 right-2 p-2 text-[#00ff88] hover:text-[#00ccff] transition-colors duration-200 animate-glow"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
            </div>

            <div>
              <p className="text-xs font-mono text-[#00ccff]">Key used: {key}</p>
              <p className="text-xs text-muted-foreground opacity-70 font-mono mt-2">
                If the result appears incorrect, please double-check your decryption key.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
