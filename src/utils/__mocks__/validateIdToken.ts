export const validateIdToken = jest.fn().mockResolvedValue({
  active: true,
  sub: 'dummySub',
  name: 'dummyName',
  email: 'dummyEmail',
});
