import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import cookie from 'cookie';
import { StatusCodes } from 'http-status-codes';

import { ID_TOKEN_COOKIE } from '../../consts';
import { getCookie } from '../../utils/getCookie';
import { getStageConsts } from '../../utils/getStageConsts';

const { OAUTH_BASE_URL } = getStageConsts();

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const { API_URL } = process.env;

  if (!API_URL) {
    throw new Error('Missing API_URL');
  }

  const idToken = getCookie(event, ID_TOKEN_COOKIE);
  let location = `${OAUTH_BASE_URL}/logout?id_token_hint=${idToken}&post_logout_redirect_uri=${API_URL}`;

  if (!idToken) {
    console.log('Missing idToken cookie');
    location = '/';
  }

  console.log(`Redirecting to ${location}`);

  return {
    statusCode: StatusCodes.MOVED_TEMPORARILY,
    headers: { location },
    cookies: [cookie.serialize(ID_TOKEN_COOKIE, '')],
  };
};
