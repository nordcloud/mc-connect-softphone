export const renderFile = jest.fn((arg1, arg2, arg3, callback) => {
  callback(undefined, 'dummyRenderFileHTML');
});
