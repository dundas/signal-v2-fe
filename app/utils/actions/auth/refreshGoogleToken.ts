"use server";
import { google } from 'googleapis';

export const refreshGoogleToken = async (refreshToken) => {
  console.log('UPDATING TOKEN: ', refreshToken);
  const oAuth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_PERMISSION_CALLBACK_URL);
  oAuth2Client.setCredentials({ refresh_token: refreshToken });

  return new Promise((resolve, reject) => {
    oAuth2Client.refreshAccessToken((err, tokens) => {
      if (err) {
        console.error('Error refreshing access token', err);
        reject(err);
      } else {
        console.log('Access token refreshed', tokens);
        oAuth2Client.setCredentials(tokens);
        resolve(tokens);
      }
    });
  });
}