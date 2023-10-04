import Steering from "@/utils/db/mongoose/models/steering";

export const archiveSteering = async (id) => {
    try {
        const archivedSteering = await Steering.findByIdAndUpdate(id, { status: "inactive" }, { new: true });
        return { success: true, message: "Steering archived successfully", data: archivedSteering };
    } catch (error) {
        console.log(error);
        return { success: false, message: error.message };
    }
};