export const fetchIdToken = jest.fn().mockResolvedValue({
  id_token: 'dummyIdToken',
  expires_in: 123456,
});
