"use server";
import mongoose from 'mongoose';
import { connectDB } from '@/utils/db/mongoose/connect';
import PlatformPermission from '@/utils/db/mongoose/models/PlatformPermission';

export const savePlatformPermission = async (permissionOptions) => {
  // Connect to the MongoDB database
  const { userId, accessToken, accessTokenExpires, refreshToken, refreshTokenExpires, platform } = permissionOptions;
  await connectDB();

  // Upsert the document in the PlatformPermission collection
  try {
    await PlatformPermission.findOneAndUpdate(
      { userId, platform }, // find a document with this filter
      { userId, accessToken, accessTokenExpires, refreshToken, refreshTokenExpires, platform }, // document to insert when nothing was found
      { upsert: true, new: true, runValidators: true } // options
    );
    console.log('Platform permission saved successfully');
  } catch (error) {
    console.error('Error saving platform permission: ', error);
  }
};