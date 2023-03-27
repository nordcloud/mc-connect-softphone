import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';

import { getUser } from '../../utils/getUser';
import { putCallerId } from './putCallerId';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const user = await getUser(event);

  if (!user) {
    return {
      statusCode: StatusCodes.UNAUTHORIZED,
    };
  }

  if (!event.body) {
    throw new Error('Missing event body');
  }

  await putCallerId({
    user,
    callerId: event.body,
  });

  return {
    statusCode: StatusCodes.NO_CONTENT,
  };
};
