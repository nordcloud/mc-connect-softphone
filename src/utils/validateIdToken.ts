import fetch from 'node-fetch';

import { OauthIntrospectResponse } from '../types';
import { getStageConsts } from './getStageConsts';

const { OAUTH_BASE_URL, OAUTH_CLIENT_ID } = getStageConsts();

export async function validateIdToken(idToken: string) {
  console.log('Validating ID token');

  const res = await fetch(`${OAUTH_BASE_URL}/introspect`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: OAUTH_CLIENT_ID,
      token: idToken,
      token_type_hint: 'id_token',
    }),
  });

  const data = (await res.json()) as OauthIntrospectResponse;

  if ('error' in data) {
    throw new Error(`${data.error}: ${data.error_description}`);
  }

  return data;
}
