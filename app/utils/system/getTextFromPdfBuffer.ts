const pdfParse = require('pdf-parse');

export async function getTextFromPdfBuffer(buffer) {
    try {
        console.log('Extracting text from PDF buffer');
         
        const data = await pdfParse(buffer);
        return data.text;
    } catch (err) {
        console.error('Error extracting text from PDF:', err);
        //throw err;
    }
}