import { ConnectContactFlowHandler } from 'aws-lambda';

import { deleteCallerId } from '../../utils/deleteCallerId';

export const handler: ConnectContactFlowHandler = async (event) => {
  const username = event.Details.Parameters.Username;

  if (!username) {
    throw new Error('Missing Username');
  }

  const callerId = await deleteCallerId(username);

  return {
    caller_id: callerId || null,
  };
};
