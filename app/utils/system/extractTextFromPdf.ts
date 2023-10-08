const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_SAFE,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_SAFE,
    region: process.env.AWS_REGION_SAFE,
});

export async function extractTextFromPdf(bucket, key) {
    console.log("BUCKET", bucket)
    console.log("KEY", key)
    const textract = new AWS.Textract();

    const params = {
        DocumentLocation: {
            S3Object: {
                Bucket: bucket,
                Name: key
            }
        }
    };

    try {
        const response = await textract.startDocumentTextDetection(params).promise();
        const jobId = response.JobId;

        console.log(`Started text detection job with ID: ${jobId}`);

        let result;
        do {
            result = await textract.getDocumentTextDetection({ JobId: jobId }).promise();
            if (result.JobStatus === 'SUCCEEDED') {
                break;
            }
            // If the job hasn't succeeded yet, wait a second and then check again
            await new Promise(resolve => setTimeout(resolve, 1000));
        } while (result.JobStatus !== 'FAILED');

        if (result.JobStatus === 'SUCCEEDED') {
            const blocks = result.Blocks;
            const text = blocks
                .filter(block => block.BlockType === 'LINE')
                .map(block => block.Text)
                .join('\n');

            console.log('Text extraction completed successfully');
            return text;
        } else {
            console.error('Text extraction job failed');
            throw new Error('Text extraction job failed');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

