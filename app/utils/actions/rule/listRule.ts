"use server";
import Rule from "@/utils/db/mongoose/models/rule";
import { connectDB } from "@/utils/db/mongoose/connect";

export const listRules = async (term = null, startDate = null, endDate = null, page = 1, limit = 10) => {
    try {
        await connectDB();
        // calculate the number of documents to skip
        const skip = (page - 1) * limit;

        // Create base query
        let query = {};
        if (term) {
            query.term = term;
        }

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

        const rules = await Rule.find(query)
            .skip(skip)
            .limit(limit);

        return { success: true, result: rules };
    } catch (error) {
        console.log(error);
        return { success: false, message: error.message };
    }
};