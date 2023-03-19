import { stageConsts } from '../consts';
import { StageName } from '../types';

export function getStage() {
  const { STAGE } = process.env;

  if (STAGE === undefined) {
    throw new Error('Missing STAGE');
  }

  if (!checkStageName(STAGE)) {
    throw new Error('Invalid STAGE name');
  }

  return STAGE;
}

function checkStageName(name?: string): name is StageName {
  return Object.keys(stageConsts).includes(name as StageName);
}
