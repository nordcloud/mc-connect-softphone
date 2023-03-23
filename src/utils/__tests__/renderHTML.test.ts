import { Options, renderFile } from 'ejs';

import { renderHTML } from '../renderHTML';

const args = ['dummyFileName', undefined, undefined] as unknown as Parameters<
  typeof renderHTML
>;

beforeEach(() => {
  process.env.ASSETS_URL = 'dummyAssetsUrl';
});

describe('renderHTML', () => {
  it('calls renderFile with correct arguments', async () => {
    await renderHTML(...args);
    expect(jest.mocked(renderFile).mock.calls).toMatchSnapshot();
  });

  it('resolves with a correct value when second arg is present', async () => {
    const argsClone = structuredClone(args);
    argsClone[1] = { dummyDataKey: 'dummyDataValue' };
    renderHTML(...argsClone);
    expect(jest.mocked(renderFile).mock.calls).toMatchSnapshot();
  });

  it('resolves with a correct value when third arg is present', () => {
    const argsClone = structuredClone(args);
    argsClone[2] = { dummyOption: 'dummyOptionVaue' } as Options;
    renderHTML(...argsClone);
    expect(jest.mocked(renderFile).mock.calls).toMatchSnapshot();
  });

  it('resolves with a correct value', () => {
    return expect(renderHTML(...args)).resolves.toMatchSnapshot();
  });

  it('rejects with correct value when ASSETS_URL is missing', () => {
    delete process.env.ASSETS_URL;
    return expect(renderHTML(...args)).rejects.toMatchSnapshot();
  });

  it('rejects with a correct value when renderFile rejects', async () => {
    // @ts-ignore
    jest.mocked(renderFile).mockImplementationOnce((a, b, c, callback) => {
      callback('dummyRenderFileError');
    });
    return expect(renderHTML(...args)).rejects.toMatchSnapshot();
  });
});
