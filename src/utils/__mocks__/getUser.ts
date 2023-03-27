export const getUser = jest.fn().mockResolvedValue({
  name: 'dummyName',
  email: 'dummyEmail',
  sub: 'dummySub',
});
