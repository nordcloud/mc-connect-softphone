import deepmerge from 'deepmerge';
import { Options, renderFile } from 'ejs';
import { StatusCodes } from 'http-status-codes';

import packageJson from '../../package.json';
import { getStageConsts } from './getStageConsts';

const { OAUTH_BASE_URL } = getStageConsts();
const { ASSETS_URL } = process.env;

if (!ASSETS_URL) {
  throw new Error('Missing ASSETS_URL');
}

export async function renderHTML(
  filename: string,
  data: { [name: string]: any } = {},
  options: Options = {}
) {
  const defaultData = {
    appVersion: packageJson.version,
    ASSETS_URL,
    OAUTH_BASE_URL,
  };

  const defaultOptions = {};

  return {
    statusCode: StatusCodes.OK,
    headers: { 'Content-Type': 'text/html' },
    body: await new Promise<string>((resolve, reject) => {
      renderFile(
        `./tmp/${filename}.ejs`,
        deepmerge(defaultData, data),
        deepmerge(defaultOptions, options),
        (err, str) => {
          if (err) reject(err);
          resolve(str);
        }
      );
    }),
  };
}
