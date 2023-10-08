import { SageMakerClient, CreateModelCommand, CreateEndpointConfigCommand, CreateEndpointCommand } from "@aws-sdk/client-sagemaker";
import { transformers } from "@huggingface/transformers";

export const createModelAndEndpoint = async (event) => {
  try {
    console.log('Event received:', event);
    const modelName = event.modelName || 'gpt2';
    const pipeline = await transformers.pipelines['text-generation'](modelName);
    console.log('Pipeline created:', pipeline);

    const sagemaker = new SageMakerClient({ region: "us-west-2" });
    console.log('SageMaker instance created:', sagemaker);

    // Create the model
    console.log('Creating model...');
    const createModelCommand = new CreateModelCommand({
      ModelName: modelName,
      PrimaryContainer: {
        Image: '763104351884.dkr.ecr.us-east-1.amazonaws.com/huggingface-pytorch-inference:1.7.1-transformers4.6.1',
        ModelDataUrl: `s3://your-bucket/${modelName}/model.tar.gz`,
        Environment: {
          HF_MODEL_ID: modelName,
          HF_TASK: 'text-generation'
        }
      },
      ExecutionRoleArn: 'arn:aws:iam::your-account-id:role/service-role/AmazonSageMaker-ExecutionRole-YYYYMMDDT000000'
    });
    const createModelResponse = await sagemaker.send(createModelCommand);
    console.log('Model created. Response:', createModelResponse);

    // Create the endpoint config
    console.log('Creating endpoint config...');
    const createEndpointConfigCommand = new CreateEndpointConfigCommand({
      EndpointConfigName: modelName,
      ProductionVariants: [
        {
          VariantName: 'default',
          ModelName: modelName,
          InitialInstanceCount: 1,
          InstanceType: 'ml.m5.large'
        }
      ]
    });
    const createEndpointConfigResponse = await sagemaker.send(createEndpointConfigCommand);
    console.log('Endpoint config created. Response:', createEndpointConfigResponse);

    // Create the endpoint
    console.log('Creating endpoint...');
    const createEndpointCommand = new CreateEndpointCommand({
      EndpointName: modelName,
      EndpointConfigName: modelName
    });
    const createEndpointResponse = await sagemaker.send(createEndpointCommand);
    console.log('Endpoint creation in progress. Response:', createEndpointResponse);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Endpoint creation in progress' })
    };
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
};