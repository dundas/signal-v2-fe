"use server";
import Glossary from "@/utils/db/mongoose/models/glossary";
import { connectDB } from "@/utils/db/mongoose/connect";

export const getGlossaryDetails = async (id) => {
    try {
        await connectDB();
        const glossary = await Glossary.findById(id);
        if (!glossary) {
            return { success: false, message: "No glossary entry found with this ID." };
        }
        return { success: true, result: JSON.parse(JSON.stringify(glossary)) };
    } catch (error) {
        console.log(error);
        return { success: false, message: error.message };
    }
};