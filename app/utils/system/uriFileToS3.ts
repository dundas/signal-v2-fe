import axios from 'axios';
import AWS from 'aws-sdk';
import stream from 'stream';
import mime from 'mime-types';
import { v4 as uuidv4 } from 'uuid';

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY_SAFE,
    region: process.env.AWS_REGION_SAFE,
});

const s3 = new AWS.S3();

const uploadStream = ({ Bucket, Key }) => {
    const pass = new stream.PassThrough();
    return {
        writeStream: pass,
        promise: s3.upload({ Bucket, Key, Body: pass }).on('httpUploadProgress', function(evt) { 
            const percentage = Math.round((evt.loaded / evt.total) * 100);
            console.log(`Upload progress: ${percentage}%`);
        }).promise(),
    };
}

export const uriFileToS3 = async (fileUrl, bucketName, filePath = '') => {
    console.log(`Starting download of ${fileUrl}`);
    const response = await axios({
        url: fileUrl,
        method: 'GET',
        responseType: 'stream',
    });

    const mimeType = response.headers['content-type'];
    const extension = mime.extension(mimeType);
    const fileName = `${filePath}${filePath ? '/' : ''}${uuidv4()}.${extension}`;

    console.log(`Starting upload to ${bucketName}/${fileName}`);
    const { writeStream, promise } = uploadStream({ Bucket: bucketName, Key: fileName });

    response.data.pipe(writeStream);

    const result = await promise;
    console.log(`Upload completed: ${result.Location}`);

    return result;
}