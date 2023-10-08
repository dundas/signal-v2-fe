const { google } = require('googleapis');
const AWS = require('aws-sdk');
const fs = require('fs');
const axios = require('axios');
import { v4 as uuidV4 } from 'uuid';

export async function uploadPresentationToS3(presentationId, accessToken, bucketName, s3Key = uuidV4()) {
    try {
        // Set up Google OAuth2 client
        const auth = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_CALLBACK_URI
        );
        auth.setCredentials({ access_token: accessToken });

        // Initialize the Drive API client
        const drive = google.drive({ version: 'v3', auth });

        // Export the presentation as a PDF
        const response = await drive.files.export({
            fileId: presentationId,
            mimeType: 'application/pdf',
        }, { responseType: 'stream' });

        // Ensure the /tmp directory exists
        fs.mkdirSync('/tmp', { recursive: true });

        // Write the PDF to a temporary file
        const tempFilePath = `/tmp/${presentationId}.pdf`;
        const writeStream = fs.createWriteStream(tempFilePath);
        await new Promise((resolve, reject) => {
            response.data
                .pipe(writeStream)
                .on('finish', resolve)
                .on('error', reject);
        });

        // Initialize the S3 client
        const s3 = new AWS.S3();

        // Upload the PDF to S3
        const s3Params = {
            Bucket: bucketName,
            Key: s3Key + '.pdf',
            Body: fs.createReadStream(tempFilePath),
            ContentType: 'application/pdf',
        };
        const uploadResult = await s3.upload(s3Params).promise();

        // Delete the temporary file
        fs.unlinkSync(tempFilePath);

        console.log(`Uploaded presentation ${presentationId} to S3 bucket ${bucketName} as ${s3Key}`);

        // Return the S3 link
        return uploadResult.Location;
    } catch (error) {
        console.error('Error uploading presentation to S3:', error);
        throw error;
    }
}