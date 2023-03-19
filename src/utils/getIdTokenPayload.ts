import { IdTokenPayload } from '../types';

export function getIdTokenPayload(idToken: string) {
  return JSON.parse(
    Buffer.from(idToken.split('.')[1], 'base64').toString()
  ) as IdTokenPayload;
}
