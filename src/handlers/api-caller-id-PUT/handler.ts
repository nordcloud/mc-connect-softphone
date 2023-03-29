import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';

import { deleteCallerId } from '../../utils/deleteCallerId';
import { getUser } from '../../utils/getUser';
import { putCallerId } from './putCallerId';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const user = await getUser(event);

  if (!user) {
    return {
      statusCode: StatusCodes.UNAUTHORIZED,
    };
  }

  if (event.body) {
    await putCallerId({ user, callerId: event.body });
  } else {
    await deleteCallerId(user.email);
  }

  return {
    statusCode: StatusCodes.NO_CONTENT,
  };
};
