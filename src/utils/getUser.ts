import { APIGatewayProxyEventV2 } from 'aws-lambda';

import { ID_TOKEN_COOKIE } from '../consts';
import { userMock } from '../mockData';
import { User } from '../types';
import { getCookie } from './getCookie';
import { getStage } from './getStage';
import { validateIdToken } from './validateIdToken';

export async function getUser(event: APIGatewayProxyEventV2): Promise<User | undefined> {
  const isMockMode =
    getStage() === 'local' &&
    Object.keys(Object(event.queryStringParameters)).includes('mock_login');

  if (isMockMode) {
    return userMock;
  }

  const idToken = getCookie(event, ID_TOKEN_COOKIE);

  if (!idToken) {
    console.log('Missing ID Token');
    return undefined;
  }

  const validationResult = await validateIdToken(idToken);

  if (!validationResult.active) {
    console.log('ID Token is inactive');
    return undefined;
  }

  const { sub, name, email } = validationResult;

  return { sub, name, email };
}
