import { APIGatewayProxyHandlerV2 } from 'aws-lambda';

import { getUser } from '../../utils/getUser';
import { loginRedirect } from '../../utils/loginRedirect';
import { renderHTML } from '../../utils/renderHTML';
import { getCustomers } from './getCustomers';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const user = await getUser(event);

  if (!user) {
    return loginRedirect();
  }

  return renderHTML('homepage', {
    user,
    customers: await getCustomers(event),
  });
};
