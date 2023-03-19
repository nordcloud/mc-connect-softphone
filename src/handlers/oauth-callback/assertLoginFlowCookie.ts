export function assertLoginFlowCookie(data: unknown): asserts data is {
  stateNonce: string;
  idTokenNonce: string;
  codeVerifier: string;
} {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Bad loginFlowCookie data');
  }

  if (!('stateNonce' in data)) {
    throw new Error('Missing stateNonce in loginFlowCookie');
  }

  if (!('idTokenNonce' in data)) {
    throw new Error('Missing idTokenNonce in loginFlowCookie');
  }

  if (!('codeVerifier' in data)) {
    throw new Error('Missing codeVerifier in loginFlowCookie');
  }
}
