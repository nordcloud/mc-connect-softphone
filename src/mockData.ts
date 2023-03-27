import { User } from './types';

export const userMock = {
  name: 'Mocked User',
  email: 'mocked.user@domain.com',
  sub: 'mockedUserSub',
} satisfies User;

export const customersMock = [
  {
    CustomerId: 'mockedCustomerId',
    CustomerName: 'mockedCustomerName',
    OutboundNumber: 'mockedCustomerOutboundNumber',
  },
];
