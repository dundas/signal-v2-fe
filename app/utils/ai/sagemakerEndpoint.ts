import AWS from 'aws-sdk';

// Configure AWS SDK
AWS.config.update({
    region: process.env.AWS_REGION_SAFE,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_SAFE,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_SAFE
});

// Initialize the SageMaker runtime client
const sagemakerRuntime = new AWS.SageMakerRuntime();

export async function invokeSageMakerEndpoint(endpointName, payload) {
    try {
        const response = await sagemakerRuntime.invokeEndpoint({
            EndpointName: endpointName,
            ContentType: 'application/json',
            Body: JSON.stringify(payload)
        }).promise();

        const responseData = response.Body.toString('utf-8'); // Convert the response body to a string
        console.log('API response:', responseData);
        return responseData;
    } catch (error) {
        console.error('Error sending request:', error);
        throw error;
    }
}