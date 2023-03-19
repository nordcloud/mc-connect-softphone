import crypto from 'crypto';
import { promisify } from 'util';

export async function randomBase64(size: number) {
  const cryptoRandomBytes = promisify(crypto.randomBytes);
  const bytes = await cryptoRandomBytes(size);

  return bytes.toString('base64url');
}
