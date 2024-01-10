"use server";
import OrderQueue from '@/utils/db/mongoose/models/orderQueue';
import { dbConnect } from '@/utils/db/mongoose/db';

const createOrderQueue = async (orderQueueData: any) => {
  try {
    await dbConnect();
    const newOrderQueue = new OrderQueue(orderQueueData);
    const createdOrderQueue = await newOrderQueue.save();
    return JSON.parse(JSON.stringify(createdOrderQueue));
  } catch (error) {
    throw new Error('Failed to create order queue');
  }
};

export default createOrderQueue;