"use server";
import Steering from "@/utils/db/mongoose/models/steering";
import { connectDB } from "../../db/mongoose/connect";
export const deleteSteering = async (id) => {
    try {
        await connectDB();
        const deletedSteering = await Steering.findByIdAndDelete(id);

        if (!deletedSteering) {
            return { success: false, message: "No steering found with this ID" };
        }

        return { success: true, message: "Steering deleted successfully", data: deletedSteering };
    } catch (error) {
        console.log(error);
        return { success: false, message: error.message };
    }
};