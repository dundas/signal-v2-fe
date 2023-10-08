export const getExtensionFromMimeType = async (mimeType) => {
    // Define MIME type map
    const mimeTypes = {
        "text/plain": "txt",
        "text/html": "html",
        "text/css": "css",
        "application/javascript": "js",
        "application/json": "json",
        "application/pdf": "pdf",
        "application/msword": "doc",
        "application/vnd.google-apps.document": "doc",
        "application/vnd.google-apps.presentation": "ppt",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
        "application/vnd.ms-excel": "xls",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
        "application/vnd.ms-powerpoint": "ppt",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
        "image/png": "png",
        "image/jpeg": "jpg",
        "image/gif": "gif",
        "image/svg+xml": "svg",
        "application/octet-stream": "bin",
        "audio/mpeg": "mp3",
        "audio/wav": "wav",
        "audio/ogg": "ogg",
        "audio/aac": "aac",
        "audio/flac": "flac",
        "video/mp4": "mp4",
        "video/quicktime": "mov",
        "video/x-msvideo": "avi",
        "video/x-ms-wmv": "wmv",
        "video/webm": "webm",
    };

    return mimeTypes[mimeType] || "bin";
};