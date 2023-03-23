import { IdTokenPayload } from '../types';

export function getIdTokenPayload(idToken: string) {
  const decodedToken = Buffer.from(idToken.split('.')[1], 'base64').toString();
  return JSON.parse(decodedToken) as IdTokenPayload;
}
