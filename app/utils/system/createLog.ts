
import { v4 as uuidv4 } from "uuid";
import Log from "../db/mongoose/models/Log";
import { connectDB } from "../db/mongoose/connect";
export const createLog = async (logDetails) => {
  const currentTime = new Date().toISOString();
  try {
    await connectDB();
    logDetails.end = currentTime;
    await Log.create(logDetails);

  } catch (error) {
    console.error(error);
    //throw new Error("Failed to save agent log");
  }
};
