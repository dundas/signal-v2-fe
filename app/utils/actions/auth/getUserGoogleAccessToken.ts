"use server";

import { connectDB } from "@/utils/db/mongoose/connect";
import User from "@/utils/db/mongoose/models/User";
import PlatformPermission from "@/utils/db/mongoose/models/PlatformPermission";
import { Nunito } from "next/font/google";

export const getUserGoogleAccessToken = async (userId) => {
  // Connect to the database
  await connectDB();

  // Find the user by id
  const user = await User.findById(userId);

  console.log('user', user);

  if (!user) {
    throw new Error('User not found');
  }


  // Find the Google platform permission for this user
  const googlePlatformPermission = await PlatformPermission.findOne({
    userId,
    platform: "google"
  });


  // Check if the user has a Google access token
  if (!googlePlatformPermission.accessToken) {
    return null;
  }

  return googlePlatformPermission
};