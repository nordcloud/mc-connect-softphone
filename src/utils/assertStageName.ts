import { stageConsts } from '../consts';
import { Stage } from '../types';

export function assertStageName(stage?: string): asserts stage is Stage {
  if (stage === undefined) {
    throw new Error('Missing STAGE');
  }

  if (!Object.keys(stageConsts).includes(stage as Stage)) {
    throw new Error('Invalid STAGE stage');
  }
}
