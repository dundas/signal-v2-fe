export const getDetailsFromS3Link = (s3Link) => {
    // Extract the bucket and key from the URL
    const url = new URL(s3Link);
    const bucket = url.hostname.split('.')[0];
    const key = url.pathname.slice(1);
    return {
        bucket,
        key
    };
}