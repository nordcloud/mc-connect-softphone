import { Stage } from '../types';
import { assertStageName } from './assertStageName';

export function getStage(): Stage {
  const { STAGE } = process.env;

  assertStageName(STAGE);

  return STAGE;
}
