import Steering from "@/utils/db/mongoose/models/steering";

export const createSteering = async (steeringData) => {
    try {
        const newSteering = new Steering(steeringData);
        await newSteering.save();
        return { success: true, message: "Steering created successfully", data: newSteering };
    } catch (error) {
        console.log(error);
        return { success: false, message: error.message };
    }
};