'use client';

import { useState } from 'react';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { encode, validateKey } from '@/lib/cipher';

interface EncodeScreenProps {
  onBack: () => void;
}

export default function EncodeScreen({ onBack }: EncodeScreenProps) {
  const [message, setMessage] = useState('');
  const [key, setKey] = useState('');
  const [encoded, setEncoded] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setError('');
    setCopied(false);

    // Validate inputs
    if (!message.trim()) {
      setError('Please enter a message to encode');
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
      const result = encode(message, key.trim());
      setEncoded(result);
    } catch (err) {
      setError('An error occurred during encoding');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(encoded);
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
        <h1 className="text-3xl font-bold font-mono text-[#00ff88] mb-2">ENCODE MESSAGE</h1>
        <p className="text-sm text-[#7a9ab3] font-mono">Transform your message into cipher text</p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md space-y-6">
        {/* Message Input */}
        <div>
          <label className="block text-sm font-mono text-[#00ccff] mb-2">Enter your message</label>
          <textarea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setError('');
            }}
            onKeyPress={handleKeyPress}
            placeholder="Type your secret message here..."
            className="w-full h-24 px-4 py-3 bg-[#0f2547] border-2 border-[#1a3a52] rounded-lg text-[#e0e0e0] font-mono text-sm placeholder-[#7a9ab3] focus:outline-none focus:border-[#00ff88] transition-colors duration-200 resize-none"
          />
        </div>

        {/* Key Input */}
        <div>
          <label className="block text-sm font-mono text-[#00ccff] mb-2">Enter Encryption Key</label>
          <input
            type="text"
            value={key}
            onChange={(e) => {
              setKey(e.target.value.toUpperCase());
              setError('');
            }}
            onKeyPress={handleKeyPress}
            placeholder="e.g.,A5,E19..."
            className="w-full px-4 py-3 bg-[#0f2547] border-2 border-[#1a3a52] rounded-lg text-[#e0e0e0] font-mono text-base placeholder-[#7a9ab3] focus:outline-none focus:border-[#00ff88] transition-colors duration-200"
          />
          <p className="text-xs text-[#7a9ab3] font-mono mt-2">Please keep your key secure. It is required to decrypt the message.</p>
        </div>

        {/* Error Message */}
        {error && <div className="p-3 bg-red-500/15 bg-opacity-20 border border-red-500/40 rounded-lg text-red-400 text-sm font-mono">{error}</div>}

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          className="w-full py-3 px-4 bg-[#00ff88] text-[#0a1628] font-mono font-semibold rounded-lg hover:bg-[#00dd77] transition-colors duration-200 active:scale-95 animate-glow"
        >
          GENERATE
        </button>

        {/* Output Section */}
        {encoded && (
          <div className="space-y-3 p-4 bg-[#0f2547] border-2 border-[#00ff88] rounded-lg animate-typewriter">
            <div>
              <p className="text-xs font-mono text-[#00ccff] mb-2">Encoded message:</p>
              <div className="relative p-3 bg-[#0a1628] border border-[#1a3a52] rounded text-[#00ff88] font-mono text-sm break-words min-h-12 flex items-center pr-12">
                {encoded}
                <button
                  onClick={handleCopy}
                  title="Copy"
                  className="absolute bottom-2 right-2 p-2 text-[#00ccff] hover:text-[#00ff88] transition-colors duration-200 animate-glow"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
            </div>

            <div>
              <p className="text-xs font-mono text-[#00ccff]">Key used: {key}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
