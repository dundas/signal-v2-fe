"use server";
import OrderQueue from "@/utils/db/mongoose/models/orderQueue";
import { dbConnect } from "@/utils/db/mongoose/db";
export const getOrderQueue = async (filter: any) => {
  try {
    await dbConnect();
    const orderQueue = await OrderQueue.find(filter);
    return JSON.parse(JSON.stringify(orderQueue));
  } catch (error) {
    throw new Error('Failed to get order queue');
  }
};
 