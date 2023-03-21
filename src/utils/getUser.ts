import { APIGatewayProxyEventV2 } from 'aws-lambda';

import { ID_TOKEN_COOKIE } from '../consts';
import { userMock } from '../mockData';
import { getCookie } from './getCookie';
import { getStage } from './getStage';
import { validateIdToken } from './validateIdToken';

export async function getUser(event: APIGatewayProxyEventV2) {
  const isMockMode =
    getStage() === 'local' &&
    Object.keys(Object(event.queryStringParameters)).includes('mock_login');

  if (isMockMode) {
    return userMock;
  }

  const idToken = getCookie(event, ID_TOKEN_COOKIE);

  if (!idToken) {
    return undefined;
  }

  const validationResult = await validateIdToken(idToken);

  if (!validationResult.active) {
    return undefined;
  }

  const { sub, name, email } = validationResult;

  return {
    sub,
    name,
    email,
  };
}
