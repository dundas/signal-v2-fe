const fs = require('fs');
const pdfParse = require('pdf-parse');

async function getTextFromPdf(filePath) {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdfParse(dataBuffer);
        return data.text;
    } catch (err) {
        console.error('Error extracting text from PDF:', err);
        throw err;
    }
}