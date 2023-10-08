export const getFileTypeFromMimeType = (mimeType) => {
    // Define MIME type map
    const mimeTypes = {
        "text/plain": "text",
        "text/html": "text",
        "text/css": "text",
        "application/javascript": "text",
        "application/json": "text",
        "application/pdf": "document",
        "application/msword": "document",
        "application/vnd.google-apps.document": "document",
        "application/vnd.google-apps.presentation": "presentation",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "document",
        "application/vnd.ms-excel": "spreadsheet",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "spreadsheet",
        "application/vnd.ms-powerpoint": "presentation",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation": "presentation",
        "image/png": "image",
        "image/heic": "image",
        "image/heif": "image",
        "image/jpeg": "image",
        "image/gif": "image",
        "image/svg+xml": "image",
        "video/mp4": "video",
        "video/quicktime": "video",
        "audio/mpeg": "audio",
        "audio/wav": "audio",
        "application/octet-stream": "binary",
    };

    return mimeTypes[mimeType] || "unknown";
};