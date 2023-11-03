import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { Timeout } from 'aws-cdk-lib/aws-stepfunctions';
import { aws_iam as iam, aws_s3 as s3} from 'aws-cdk-lib'; 
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class SnoozeCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    
    const dockerFunc = new lambda.DockerImageFunction(this, "DockerFunc", {
      code: lambda.DockerImageCode.fromImageAsset("./image"),
      memorySize: 1024,
      timeout: cdk.Duration.seconds(10),
      architecture: lambda.Architecture.ARM_64
    });

    // Creates Easy to access URL endpoint, without authorization
    const functionUrl = dockerFunc.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
      cors: {
        allowedMethods: [lambda.HttpMethod.ALL],
        allowedHeaders: ["*"],
        allowedOrigins: ["*"]
      }
    });


    dockerFunc.addToRolePolicy(new iam.PolicyStatement({
        effect:  iam.Effect.ALLOW,
        actions: [
            's3:*',
         ],
        resources: [
            'arn:aws:s3:::rhymedust',
            'arn:aws:s3:::rhymedust/*',
        ],
      }))
      
    // See outputed URL
    new cdk.CfnOutput(this, "FunctionUrlValue", {
      value: functionUrl.url,
    });
  }
}
