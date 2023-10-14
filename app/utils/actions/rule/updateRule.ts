"use server";
import Rule from "@/utils/db/mongoose/models/rule";

export const updateRule = async (id, updatedData) => {
    try {
        const updatedRule = await Rule.findByIdAndUpdate(id, updatedData, { new: true });
        return { success: true, message: "Rule updated successfully", results: JSON.parse(JSON.stringify(updatedRule)) };
    } catch (error) {
        console.log(error);
        return { success: false, message: error.message };
    }
};