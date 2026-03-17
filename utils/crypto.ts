
/**
 * Simple secure hashing utility for frontend demonstration.
 * In a real production app, this would happen on a secure backend.
 */

export async function hashPassword(password: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(salt + password);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function generateSalt(): string {
  const array = new Uint32Array(4);
  window.crypto.getRandomValues(array);
  return Array.from(array).map(n => n.toString(16)).join('');
}
