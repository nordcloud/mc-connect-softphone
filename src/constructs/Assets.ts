import { RemovalPolicy } from 'aws-cdk-lib';
import { Distribution } from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import path from 'path';

export class Assets extends Construct {
  public readonly assetsUrl: string;

  constructor(scope: Construct) {
    super(scope, 'Assets');

    const bucket = new Bucket(this, 'Bucket', {
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const distro = new Distribution(this, 'Distro', {
      defaultBehavior: {
        origin: new S3Origin(bucket),
      },
    });

    this.assetsUrl = `https://${distro.domainName}`;

    new BucketDeployment(this, 'Deployment', {
      sources: [Source.asset(path.join(__dirname, '..', 'assets'))],
      destinationBucket: bucket,
    });
  }
}
