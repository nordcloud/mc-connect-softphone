import { Duration } from 'aws-cdk-lib';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import deepmerge from 'deepmerge';
import path from 'path';

import { APP_NAME } from '../consts';
import { getStage } from './getStage';

export function createLambda(
  scope: Construct,
  id: string,
  props: Partial<NodejsFunctionProps> = {}
) {
  const rootDir = path.join(__dirname, '..');
  const htmlDir = path.join(rootDir, 'html');
  const handlerDir = path.join(rootDir, 'handlers', id);

  const defaultProps: NodejsFunctionProps = {
    functionName: `${APP_NAME}-${id}`,
    memorySize: 256,
    entry: `${handlerDir}/handler.ts`,
    runtime: Runtime.NODEJS_18_X,
    environment: {
      STAGE: getStage(),
      NODE_OPTIONS: '--enable-source-maps',
    },
    bundling: {
      sourceMap: true,
      minify: true,
      commandHooks: {
        beforeBundling(_, outputDir) {
          const ephemeralDir = `${outputDir}/tmp`;
          return [
            `mkdir ${ephemeralDir}`,
            `cp ${htmlDir}/*.ejs ${ephemeralDir} || true`,
            `cp ${handlerDir}/*.ejs ${ephemeralDir} || true`,
          ];
        },
        afterBundling() {
          return [];
        },
        beforeInstall() {
          return [];
        },
      },
    },
  };

  return new NodejsFunction(scope, id, {
    timeout: Duration.seconds(20),
    ...deepmerge(defaultProps, props),
  });
}
