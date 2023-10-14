"use server";
import Rule from "@/utils/db/mongoose/models/rule";
import { connectDB } from "@/utils/db/mongoose/connect";

export const getRuleDetails = async (id) => {
    try {
        await connectDB();
        const rule = await Rule.findById(id);
        if (!rule) {
            return { success: false, message: "No rule found with this ID." };
        }
        return { success: true, result: JSON.parse(JSON.stringify(rule)) };
    } catch (error) {
        console.log(error);
        return { success: false, message: error.message };
    }
};