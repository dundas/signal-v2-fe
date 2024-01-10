"use server";
import { v4 as uuidv4 } from "uuid";
import OrderQueue from "@/utils/db/mongoose/models/orderQueue";
import { dbConnect } from "@/utils/db/mongoose/db";

export const createBatchOrderQueue = async (
  shop: string,
  orderIds: string[]
) => {
  try {
    await dbConnect();

    // Generate a unique batchId using uuid
    const batchId = uuidv4();

    // Assemble the data for each orderId
    const orderQueueData = orderIds.map((orderId) => ({
      shop,
      batchId,
      orderId,
      status: "pending",
    }));
    console.log("orderQueueData", orderQueueData);

    // Insert the data into the order queue
    const createdOrderQueue = await OrderQueue.insertMany(orderQueueData);
    console.log("createdOrderQueue", createdOrderQueue);

    return JSON.parse(JSON.stringify(createdOrderQueue));
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to create batch order queue");
  }
};
