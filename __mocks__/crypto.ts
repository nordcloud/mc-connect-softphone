export default {
  randomBytes: jest.fn().mockReturnValue({
    toString: jest.fn().mockReturnValue('dummyRandomBytesToString'),
  }),

  createHash: jest.fn().mockReturnValue({
    update: jest.fn().mockReturnValue({
      digest: jest.fn().mockReturnValue('dummyCreateHashUpdateDigest'),
    }),
  }),
  randomUUID: jest.fn().mockReturnValue('dummyUUID'),
};
