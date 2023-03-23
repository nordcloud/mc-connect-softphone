import { APIGatewayProxyEventV2 } from 'aws-lambda';
import fetch from 'node-fetch';
import { JsonValue } from 'type-fest';

import { LOGIN_FLOW_COOKIE } from '../../consts';
import { OauthAuthorizeResponse } from '../../types';
import { getCookie } from '../../utils/getCookie';
import { getIdTokenPayload } from '../../utils/getIdTokenPayload';
import { getStageConsts } from '../../utils/getStageConsts';
import { assertLoginFlowCookie } from './assertLoginFlowCookie';
import { checkOAuthUrlParams } from './checkOAuthUrlParams';

const { OAUTH_BASE_URL, OAUTH_CLIENT_ID } = getStageConsts();

export async function fetchIdToken(event: APIGatewayProxyEventV2) {
  const { LOGIN_CALLABCK_URL } = process.env;

  if (!LOGIN_CALLABCK_URL) {
    throw new Error('Missing LOGIN_CALLABCK_URL');
  }

  if (!checkOAuthUrlParams(event.queryStringParameters)) {
    console.log('Invalid OAuth callback url params');
    return undefined;
  }

  const { state, code } = event.queryStringParameters;

  const loginFlowCookieJSON = getCookie(event, LOGIN_FLOW_COOKIE);

  if (!loginFlowCookieJSON) {
    console.log('Missing loginFlowCookie');
    return undefined;
  }

  const loginFlowCookie = JSON.parse(loginFlowCookieJSON) as JsonValue;

  assertLoginFlowCookie(loginFlowCookie);

  if (state !== loginFlowCookie.stateNonce) {
    console.log('State nonce mismatch');
    return undefined;
  }

  console.log('Fetching ID token');

  const res = await fetch(`${OAUTH_BASE_URL}/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      code_verifier: loginFlowCookie.codeVerifier,
      grant_type: 'authorization_code',
      redirect_uri: LOGIN_CALLABCK_URL,
      client_id: OAUTH_CLIENT_ID,
    }),
  });

  const data = (await res.json()) as OauthAuthorizeResponse;

  if ('error' in data) {
    throw new Error(`${data.error}: ${data.error_description}`);
  }

  const { nonce } = getIdTokenPayload(data.id_token);

  if (nonce !== loginFlowCookie.idTokenNonce) {
    console.log('ID token nonce mismatch');
    return undefined;
  }

  return data;
}
