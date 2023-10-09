"use server";
import Steering from "@/utils/db/mongoose/models/steering";
import { connectDB } from "@/utils/db/mongoose/connect";

export const getSteeringDetails = async (id) => {
    try {
        await connectDB();
        const steering = await Steering.findById(id);
        if (!steering) {
            return { success: false, message: "No steering found with this ID." };
        }
        return { success: true, result: JSON.parse(JSON.stringify(steering)) };
    } catch (error) {
        console.log(error);
        return { success: false, message: error.message };
    }
};