import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_ec2 } from "aws-cdk-lib";
import { MultiEnvStackProps } from "../bin/multi-env";

export class MultiEnvStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: MultiEnvStackProps) {
    super(scope, id, props);

    // VPC 作る
    const vpc = new aws_ec2.Vpc(this, 'Vpc', {
      vpcName: `multienv-${props.envName}-vpc`,
    });
  }
}
