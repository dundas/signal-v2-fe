"use server"; 
import Steering from "@/utils/db/mongoose/models/steering";
import { connectDB } from "@/utils/db/mongoose/connect";

export const listSteerings = async (shopId, startDate=null, endDate=null, page = 1, limit = 10) => {
    try {
        await connectDB();
        // calculate the number of documents to skip
        const skip = (page - 1) * limit;

        // Create base query
        let query = { shopId };

        // If both startDate and endDate are provided, add date range to query
        if (startDate && endDate) {
            // set endDate to the end of the day
            endDate = new Date(endDate);
            endDate.setHours(23, 59, 59, 999);

            query.createdAt = {
                $gte: new Date(startDate),
                $lte: endDate
            };
        }

        const steerings = await Steering.find(query)
            .skip(skip)
            .limit(limit);

        return { success: true, result: steerings };
    } catch (error) {
        console.log(error);
        return { success: false, message: error.message };
    }
};