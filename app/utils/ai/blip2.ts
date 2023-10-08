import AWS from 'aws-sdk';
import axios from 'axios';

export const blip2 = async (imageUrl, promptText, endpointName) => {
    // Configure AWS SDK
    AWS.config.update({ region: 'us-east-1' });

    // Initialize the SageMaker runtime client
    const sagemakerRuntime = new AWS.SageMakerRuntime();

    // Fetch the image data from the URL
    let base64Image;
    if (!imageUrl) {
        return { success: false, message: 'No image url provided' }
    }
    try {
        const imageResponse = await axios.get(imageUrl, {
            responseType: 'arraybuffer'
        });
        const imageBuffer = Buffer.from(imageResponse.data, 'binary');
        base64Image = imageBuffer.toString('base64');
    } catch (error) {
        console.error('Error fetching the image:', error);
        throw error;
    }

    // Context and question setup
    /*const context = [
        ["What is in the foreground?", "Foreground: A person wearing a turban"],
        ["What is in the background?", "Background: A white backdrop"]
    ];*/
    const context = [];
    const question = promptText;
    const template = "Question: {} Answer: {}.";

    const promptParts = context.map(item => template.replace("{}", item[0]).replace("{}", item[1]));
    const prompt = [...promptParts, "Question: " + question + " Answer:"].join(" ");

    // Generation strategy parameters
    const genStrategyParams = {
        do_sample: false,
        num_beams: 2,
        num_beam_groups: 1,
        use_cache: true,
        max_new_tokens: 1000,
        min_new_tokens: 5,
        early_stopping: true
    };

    // Define the endpoint name and the payload
    const payload = JSON.stringify({
        prompt: prompt,
        image: base64Image,
        parameters: genStrategyParams
    });

    // Invoke the endpoint
    try {
        const response = await sagemakerRuntime.invokeEndpoint({
            EndpointName: endpointName,
            ContentType: 'application/json',
            Body: payload
        }).promise();

        const responseData = response.Body.toString('utf-8'); // Convert the response body to a string
        console.log('API response:', responseData);
        return responseData;
    } catch (error) {
        console.error('Error sending request:', error);
        throw error;
    }
};
