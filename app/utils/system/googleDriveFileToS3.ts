import AWS from 'aws-sdk';
import stream from 'stream';
import { v4 as uuidv4 } from 'uuid';
import { getExtensionFromMimeType } from './getExtensionFromMimeType';
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_SAFE,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_SAFE,
    region: process.env.AWS_REGION_SAFE,
});

const s3 = new AWS.S3();

const uploadStream = ({ Bucket, Key, ContentType }) => {
    const pass = new stream.PassThrough();
    return {
        writeStream: pass,
        promise: s3.upload({ Bucket, Key, Body: pass, ContentType }).on('httpUploadProgress', function(evt) {
            const percentage = Math.round((evt.loaded / evt.total) * 100);
            console.log(`Upload progress: ${percentage}%`);
        }).promise(),
    };
}

export const googleDriveFileToS3 = async (fileData, fileMetadata, bucketName, filePath = '') => {
    if (!fileData ) {
        throw new Error('No file data provided');
    }
    if (!fileMetadata) {
        throw new Error('No file metadata provided');
    }
    const mimeType = fileMetadata.mimeType;
    const extension = await getExtensionFromMimeType(mimeType);
    const fileName = `${filePath}${filePath ? '/' : ''}${uuidv4()}.${extension}`;

    console.log(`Starting upload to ${bucketName}/${fileName}`);

    const { writeStream, promise } = uploadStream({ Bucket: bucketName, Key: fileName, ContentType: mimeType });

    // Create a readable stream from the file data and pipe it to the write stream
    let readableStream;
    if (Buffer.isBuffer(fileData)) {
        readableStream = new stream.PassThrough();
        readableStream.end(fileData);
    } else if (typeof fileData === 'string') {
        readableStream = new stream.Readable();
        readableStream._read = () => {}; // _read is required but you can noop it
        readableStream.push(Buffer.from(fileData, 'utf-8'));
        readableStream.push(null);
    } else {
        throw new Error('Invalid file data type');
    }
    readableStream.pipe(writeStream);

    const result = await promise;

    console.log(`Upload completed: ${result.Location}`);

    return result.Location;
}