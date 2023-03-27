import { JsonValue } from 'type-fest';

export function assertLoginFlowCookie(value: JsonValue): asserts value is {
  stateNonce: string;
  idTokenNonce: string;
  codeVerifier: string;
} {
  if (!value || Array.isArray(value) || typeof value !== 'object') {
    throw new Error('Bad loginFlowCookie value');
  }

  if (!value.stateNonce) {
    throw new Error('Missing stateNonce in loginFlowCookie');
  }

  if (!value.idTokenNonce) {
    throw new Error('Missing idTokenNonce in loginFlowCookie');
  }

  if (!value.codeVerifier) {
    throw new Error('Missing codeVerifier in loginFlowCookie');
  }
}

declare global {
  interface ArrayConstructor {
    isArray(arg: unknown): arg is unknown[] | readonly unknown[];
  }
}
