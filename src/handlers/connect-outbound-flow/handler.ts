import { ConnectContactFlowHandler } from 'aws-lambda';

import { getCallerId } from '../../utils/getCallerId';

export const handler: ConnectContactFlowHandler = async (event) => {
  const username = event.Details.Parameters.Username;

  if (!username) {
    throw new Error('Missing username');
  }

  const callerId = await getCallerId(username);

  return {
    caller_id: callerId || null,
  };
};
