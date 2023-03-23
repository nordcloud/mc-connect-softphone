import cookie from 'cookie';
import crypto from 'crypto';
import { StatusCodes } from 'http-status-codes';

import { LOGIN_FLOW_COOKIE } from '../consts';
import { getStage } from './getStage';
import { getStageConsts } from './getStageConsts';
import { randomBase64 } from './randomBase64';

const { OAUTH_BASE_URL, OAUTH_CLIENT_ID } = getStageConsts();

export function loginRedirect() {
  return oauthRedirect();
}

async function oauthRedirect() {
  const { LOGIN_CALLABCK_URL } = process.env;

  if (!LOGIN_CALLABCK_URL) {
    throw new Error('Missing LOGIN_CALLABCK_URL');
  }

  const oauthUrl = new URL(`${OAUTH_BASE_URL}/authorize`);

  const stateNonce = await randomBase64(128);
  const idTokenNonce = await randomBase64(128);
  const codeVerifier = await randomBase64(96);
  const codeChallenge = crypto
    .createHash('sha256')
    .update(codeVerifier)
    .digest('base64url');

  const params = new URLSearchParams({
    client_id: OAUTH_CLIENT_ID,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
    nonce: idTokenNonce,
    redirect_uri: LOGIN_CALLABCK_URL,
    response_type: 'code',
    scope: 'openid profile email',
    state: stateNonce,
  });

  oauthUrl.search = params.toString();

  const loginFlowCookie = cookie.serialize(
    LOGIN_FLOW_COOKIE,
    JSON.stringify({
      stateNonce,
      idTokenNonce,
      codeVerifier,
    }),
    {
      httpOnly: true,
      secure: getStage() !== 'local',
      sameSite: 'lax',
    }
  );

  console.log(`Redirecting to OAuth ${oauthUrl.href}`);

  return {
    statusCode: StatusCodes.MOVED_TEMPORARILY,
    headers: { location: oauthUrl.href },
    cookies: [loginFlowCookie],
  };
}
