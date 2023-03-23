import { getCustomers } from '../../../utils/getCustomers';
import { getUser } from '../../../utils/getUser';
import { loginRedirect } from '../../../utils/loginRedirect';
import { renderHTML } from '../../../utils/renderHTML';
import { handler } from '../handler';

jest.mock('../../../utils/getCustomers');
jest.mock('../../../utils/getUser');
jest.mock('../../../utils/loginRedirect');
jest.mock('../../../utils/renderHTML');

const args = ['dummyEvent'] as unknown as Parameters<typeof handler>;

describe('web-root handler', () => {
  it('calls getUser with correct args', async () => {
    await handler(...args);
    expect(jest.mocked(getUser).mock.calls).toMatchSnapshot();
  });

  it('calls renderHTML with correct args', async () => {
    await handler(...args);
    expect(jest.mocked(renderHTML).mock.calls).toMatchSnapshot();
  });

  it('calls getCustomers with correct args', async () => {
    await handler(...args);
    expect(jest.mocked(getCustomers).mock.calls).toMatchSnapshot();
  });

  it('resolves with a correct value', () => {
    return expect(handler(...args)).resolves.toMatchSnapshot();
  });

  describe('when user is undefined', () => {
    beforeEach(() => {
      jest.mocked(getUser).mockResolvedValueOnce(undefined);
    });

    it('calls loginRedirect with correct args', async () => {
      await handler(...args);
      expect(jest.mocked(loginRedirect).mock.calls).toMatchSnapshot();
    });

    it('resolves with a correct value', () => {
      return expect(handler(...args)).resolves.toMatchSnapshot();
    });
  });
});
