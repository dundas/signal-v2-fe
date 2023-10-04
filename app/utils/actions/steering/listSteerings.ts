import Steering from "@/utils/db/mongoose/models/steering";
import { connectDB } from "@/utils/db/mongoose/connect";
 

export const listSteerings = async (startDate, endDate, page = 1, limit = 10) => {
    try {
        await connectDB();
        // calculate the number of documents to skip
        const skip = (page - 1) * limit;

        // set endDate to the end of the day
        endDate = new Date(endDate);
        endDate.setHours(23, 59, 59, 999);

        const steerings = await Steering.find({
            createdAt: {
                $gte: new Date(startDate),
                $lte: endDate
            }
        })
        .skip(skip)
        .limit(limit);

        return { success: true, message: "Steerings retrieved successfully", data: steerings };
    } catch (error) {
        console.log(error);
        return { success: false, message: error.message };
    }
};