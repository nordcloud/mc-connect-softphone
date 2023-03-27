import { deleteCallerId } from '../../../utils/deleteCallerId';
import { handler } from '../handler';

jest.mock('../../../utils/deleteCallerId');

const args = [
  {
    Details: {
      Parameters: {
        Username: 'dummyUsername',
      },
    },
  },
] as unknown as Parameters<typeof handler>;

describe('connect-outbound-flow-handler', () => {
  it('calls deleteCallerId with correct args', async () => {
    await handler(...args);
    expect(jest.mocked(deleteCallerId).mock.calls).toMatchSnapshot();
  });

  it('resolves with a correct value', () => {
    return expect(handler(...args)).resolves.toMatchSnapshot();
  });

  it('resolves with a correct value when callerId returns a falsy value', () => {
    jest.mocked(deleteCallerId).mockResolvedValueOnce(undefined);
    return expect(handler(...args)).resolves.toMatchSnapshot();
  });

  it('rejects when Username is missing from event parameters', () => {
    const argsClone = structuredClone(args);
    delete argsClone[0].Details.Parameters.Username;
    return expect(handler(...argsClone)).rejects.toMatchSnapshot();
  });
});
