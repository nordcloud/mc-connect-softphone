export default jest.fn().mockResolvedValue({
  json: () => Promise.resolve(`dummyNodeFetchJsonParsedResponse`),
});
