import { APIGatewayProxyHandlerV2 } from 'aws-lambda';

import { AWS_CONNECT_URL } from '../../consts';
import { deleteCallerId } from '../../utils/deleteCallerId';
import { getCustomers } from '../../utils/getCustomers';
import { getUser } from '../../utils/getUser';
import { loginRedirect } from '../../utils/loginRedirect';
import { renderHTML } from '../../utils/renderHTML';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const user = await getUser(event);

  if (!user) {
    return loginRedirect();
  }

  await deleteCallerId(user.email);

  const customers = await getCustomers();

  return renderHTML('homepage', {
    AWS_CONNECT_URL,
    user,
    customers,
  });
};
