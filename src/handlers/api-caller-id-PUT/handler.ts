import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';

import { getUser } from '../../utils/getUser';
import { putCallerId } from './putCallerId';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const user = await getUser(event);

  if (!user) {
    return { statusCode: StatusCodes.UNAUTHORIZED };
  }

  const callerId = event.body || '';
  const { expiresTimestampSeconds } = await putCallerId({ user, callerId });

  return {
    statusCode: StatusCodes.OK,
    body: JSON.stringify({ expiresTimestampSeconds }),
  };
};
