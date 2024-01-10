"use strict";
import OrderQueue from "@/utils/db/mongoose/models/orderQueue";
import { dbConnect } from "@/utils/db/mongoose/db";

const updateOrderQueue = async (orderId: string, updateData: any) => {
  try {
    await dbConnect();
    const updatedOrderQueue = await OrderQueue.findByIdAndUpdate(
      orderId,
      updateData,
      { new: true }
    );
    return JSON.parse(JSON.stringify(updatedOrderQueue));
  } catch (error) {
    throw new Error("Failed to update order queue");
  }
};

export default updateOrderQueue;
