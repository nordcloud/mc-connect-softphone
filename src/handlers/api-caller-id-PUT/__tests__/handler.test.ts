import { getUser } from '../../../utils/getUser';
import { handler } from '../handler';
import { putCallerId } from '../putCallerId';

jest.mock('../../../utils/getUser');
jest.mock('../putCallerId');

const args = [{ body: 'dummyEventBody' }] as unknown as Parameters<typeof handler>;

describe('api-caller-id-PUT', () => {
  it('calls getUser with correct args', async () => {
    await handler(...args);
    expect(jest.mocked(getUser).mock.calls).toMatchSnapshot();
  });

  it('calls putCallerId with correct args', async () => {
    await handler(...args);
    expect(jest.mocked(putCallerId).mock.calls).toMatchSnapshot();
  });

  it('resolves with a correct value', () => {
    return expect(handler(...args)).resolves.toMatchSnapshot();
  });

  it('resolves with a correct value when user is undefined', () => {
    jest.mocked(getUser).mockResolvedValueOnce(undefined);
    return expect(handler(...args)).resolves.toMatchSnapshot();
  });

  it('rejects with a correct value when event.body is missing', () => {
    const argsClone = structuredClone(args);
    delete argsClone[0].body;
    return expect(handler(...argsClone)).rejects.toMatchSnapshot();
  });
});
