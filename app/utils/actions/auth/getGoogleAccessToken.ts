"use server";
import { google } from 'googleapis';

export async function getGoogleAccessToken(code: string) {
    console.log('getGoogleAccessToken', code);

    const oAuth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_PERMISSION_CALLBACK_URL);
    

    let tokens;

    try {
        const response = await oAuth2Client.getToken(code);
        tokens = response.tokens;
        console.log('tokens', tokens);
    } catch (err) {
        console.error('Error getting tokens:', err);
        throw err;
    }

    return tokens;
}