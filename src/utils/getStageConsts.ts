import { stageConsts } from '../consts';
import { getStage } from './getStage';

export function getStageConsts() {
  const stage = getStage();
  return stageConsts[stage];
}
