import Steering from "@/utils/db/mongoose/models/steering";

export const editSteering = async (id, updatedData) => {
    try {
        const updatedSteering = await Steering.findByIdAndUpdate(id, updatedData, { new: true });
        return { success: true, message: "Steering updated successfully", data: updatedSteering };
    } catch (error) {
        console.log(error);
        return { success: false, message: error.message };
    }
};