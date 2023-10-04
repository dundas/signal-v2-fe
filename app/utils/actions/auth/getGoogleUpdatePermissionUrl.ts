"use server";
import { google } from 'googleapis';
export async function getGoogleUpdatePermissionUrl(userId, scopes) {
   
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_SECRET_ID,
        process.env.GOOGLE_PERMISSION_CALLBACK_URL
    );

    // Generate a URL that asks permissions for Google Drive scopes
   
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        state: JSON.stringify({ userId })
    });

    return url;
};