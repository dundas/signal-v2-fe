const axios = require('axios');
const mammoth = require('mammoth');

export async function convertWordToPlainText(url) {
  try {
    console.log("URL", url)
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const wordArrayBuffer = new Uint8Array(response.data);

    const { value: text } = await mammoth.extractRawText({ arrayBuffer: wordArrayBuffer.buffer });

    return text;
  } catch (error) {
    console.error('Error converting Word document to plain text:', error);
    throw error;
  }
}