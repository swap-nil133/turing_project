/**
 * Validates the key format: Must start with one letter followed by a number
 * Valid examples: A5, B3, A28, z10
 */
export function validateKey(key: string): { valid: boolean; error?: string } {
  if (!key || key.length < 2) {
    return { valid: false, error: 'Key must start with one alphabet followed by a number. Example: A5' };
  }

  const firstChar = key[0];
  const restOfKey = key.slice(1);

  // Check if first character is a letter
  if (!/^[a-zA-Z]$/.test(firstChar)) {
    return { valid: false, error: 'Key must start with one alphabet followed by a number. Example: A5' };
  }

  // Check if rest is a number
  if (!/^\d+$/.test(restOfKey)) {
    return { valid: false, error: 'Key must start with one alphabet followed by a number. Example: A5' };
  }

  return { valid: true };
}

/**
 * Calculates the effective shift using the new formula:
 * EffectiveShift = (Lpos + k) % 26
 * Where:
 * - Lpos = alphabetical index of first letter (a=0, z=25)
 * - k = numeric part of key
 */
export function calculateEffectiveShift(key: string): number {
  const firstLetter = key[0].toLowerCase();
  const letterPos = firstLetter.charCodeAt(0) - 97; // a=0, b=1, ..., z=25
  const numericPart = parseInt(key.slice(1), 10);
  
  return (letterPos + numericPart) % 26;
}

/**
 * Encodes a message using Caesar cipher with the new formula
 * E(x) = (x - EffectiveShift + 26) % 26
 * - Preserves spaces
 * - Only shifts letters a-z (case insensitive)
 * - Wraps around using modulo 26
 */
export function encode(message: string, key: string): string {
  if (!validateKey(key).valid) {
    throw new Error('Invalid key format');
  }

  const effectiveShift = calculateEffectiveShift(key);
  const result: string[] = [];

  for (const char of message) {
    if (char === ' ') {
      result.push(' ');
      continue;
    }

    // Only process letters
    if (/^[a-zA-Z]$/.test(char)) {
      const code = char.toLowerCase().charCodeAt(0) - 97; // Convert to 0-25
      const shifted = (code - effectiveShift + 26) % 26; // LEFT shift with wrap
      const encoded = String.fromCharCode(shifted + 97);
      result.push(encoded);
    } else {
      // Preserve non-letter characters
      result.push(char);
    }
  }

  return result.join('');
}

/**
 * Decodes a message using Caesar cipher with the new formula
 * D(x) = (x + EffectiveShift) % 26
 * - Preserves spaces
 * - Only shifts letters a-z (case insensitive)
 * - Wraps around using modulo 26
 */
export function decode(message: string, key: string): string {
  if (!validateKey(key).valid) {
    throw new Error('Invalid key format');
  }

  const effectiveShift = calculateEffectiveShift(key);
  const result: string[] = [];

  for (const char of message) {
    if (char === ' ') {
      result.push(' ');
      continue;
    }

    // Only process letters
    if (/^[a-zA-Z]$/.test(char)) {
      const code = char.toLowerCase().charCodeAt(0) - 97; // Convert to 0-25
      const shifted = (code + effectiveShift) % 26; // RIGHT shift with wrap
      const decoded = String.fromCharCode(shifted + 97);
      result.push(decoded);
    } else {
      // Preserve non-letter characters
      result.push(char);
    }
  }

  return result.join('');
}
