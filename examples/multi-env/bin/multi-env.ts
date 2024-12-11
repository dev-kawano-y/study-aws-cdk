#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { MultiEnvStack } from '../lib/multi-env-stack';
import { StackProps } from "aws-cdk-lib";

const app = new cdk.App();


type EnvNameType = 'production' | 'dev';

export type MultiEnvStackProps = {
    envName: EnvNameType;
} & StackProps;

const productionProps: MultiEnvStackProps = {
    'envName': 'production',
};
const devProps: MultiEnvStackProps = {
    'envName': 'dev',
};

const envName = app.node.tryGetContext('environment');

const getEnvProps = (envName: EnvNameType): MultiEnvStackProps => {
    switch (envName) {
        case 'production':
            return productionProps;
        case 'dev':
            return devProps;
        default:
            throw new Error('Unsupported environment');
    }
};

const multiEnvProps= getEnvProps(envName);


new MultiEnvStack(app, 'MultiEnvStack', {
    env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
    ...multiEnvProps,
});
