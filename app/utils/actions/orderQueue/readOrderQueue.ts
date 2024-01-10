"use server";
import OrderQueue from "@/utils/db/mongoose/models/orderQueue";
import { dbConnect } from "@/utils/db/mongoose/db";

const readOrderQueue = async (orderId: string) => {
  try {
    await dbConnect();
    const orderQueue = await OrderQueue.findById(orderId);
    return JSON.parse(JSON.stringify(orderQueue));
  } catch (error) {
    throw new Error("Failed to read order queue");
  }
};

export default readOrderQueue;
