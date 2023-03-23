import { assertStageName } from '../assertStageName';
import { getStage } from '../getStage';

jest.mock('../assertStageName');

process.env.STAGE = 'dummyStageName';

describe('getStage', () => {
  it('calls assertStageName with correct args', () => {
    getStage();
    expect(jest.mocked(assertStageName).mock.calls).toMatchSnapshot();
  });

  it('returns a correct value', () => {
    expect(getStage()).toMatchSnapshot();
  });
});
