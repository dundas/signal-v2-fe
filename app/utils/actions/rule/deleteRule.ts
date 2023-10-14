"use server";
import Rule from "@/utils/db/mongoose/models/rule";
import { connectDB } from "../../db/mongoose/connect";

export const deleteRule = async (id) => {
    try {
        console.log("RULE ID: ", id);
        await connectDB();
        const deletedRule = await Rule.findByIdAndDelete(id);
        console.log("DELETED RULE: ", deletedRule);

        if (!deletedRule) {
            return { success: false, message: "No rule found with this ID" };
        }

        return { success: true, message: "Rule deleted successfully", data: deletedRule };
    } catch (error) {
        console.log(error);
        return { success: false, message: error.message };
    }
};