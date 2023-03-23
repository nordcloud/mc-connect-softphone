import { APIGatewayProxyHandlerV2 } from 'aws-lambda';

import { AWS_CONNECT_URL } from '../../consts';
import { getCustomers } from '../../utils/getCustomers';
import { getUser } from '../../utils/getUser';
import { loginRedirect } from '../../utils/loginRedirect';
import { renderHTML } from '../../utils/renderHTML';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const user = await getUser(event);

  if (!user) {
    return loginRedirect();
  }

  return renderHTML('homepage', {
    AWS_CONNECT_URL,
    user,
    customers: await getCustomers(event),
  });
};
