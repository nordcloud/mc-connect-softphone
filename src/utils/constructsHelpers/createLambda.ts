import { Duration } from 'aws-cdk-lib';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import deepmerge from 'deepmerge';

import { APP_NAME, HANDLERS_DIR, HTML_DIR } from '../../consts';
import { getStage } from '../getStage';

export function createLambda(
  scope: Construct,
  id: string,
  props: Partial<NodejsFunctionProps> = {}
) {
  const handlerDir = `${HANDLERS_DIR}/${id}`;

  const defaultProps: NodejsFunctionProps = {
    functionName: `${APP_NAME}-${id}`,
    entry: `${handlerDir}/handler.ts`,
    memorySize: 256,
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
            `rm -rf ${ephemeralDir} && mkdir ${ephemeralDir} && cp ${HTML_DIR}/*.ejs ${ephemeralDir} || true && cp ${handlerDir}/*.ejs ${ephemeralDir} || true`,
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
