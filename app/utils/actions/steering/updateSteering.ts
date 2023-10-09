"use server";
import Steering from "@/utils/db/mongoose/models/steering";

export const updateSteering = async (id, updatedData) => {
    try {
        const updatedSteering = await Steering.findByIdAndUpdate(id, updatedData, { new: true });
        return { success: true, message: "Steering updated successfully", results: JSON.parse(JSON.stringify(updatedSteering)) };
    } catch (error) {
        console.log(error);
        return { success: false, message: error.message };
    }
};