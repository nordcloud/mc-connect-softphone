import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import cookie from 'cookie';
import { StatusCodes } from 'http-status-codes';

import { ID_TOKEN_COOKIE } from '../../consts';
import { getStage } from '../../utils/getStage';
import { fetchIdToken } from './fetchIdToken';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const responseCookies = [];
  const idTokenData = await fetchIdToken(event);

  if (idTokenData) {
    responseCookies.push(
      cookie.serialize(ID_TOKEN_COOKIE, idTokenData.id_token, {
        secure: getStage() !== 'local',
        httpOnly: true,
        expires: new Date(Date.now() + idTokenData.expires_in * 1000),
      })
    );
  }

  console.log('Redirecting to "/"');

  return {
    statusCode: StatusCodes.MOVED_TEMPORARILY,
    headers: { location: '/' },
    cookies: responseCookies,
  };
};
