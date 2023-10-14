"use server";
import Glossary from "@/utils/db/mongoose/models/glossary";

export const updateGlossary = async (id, updatedData) => {
    try {
        const updatedGlossary = await Glossary.findByIdAndUpdate(id, updatedData, { new: true });
        return { success: true, message: "Glossary entry updated successfully", results: JSON.parse(JSON.stringify(updatedGlossary)) };
    } catch (error) {
        console.log(error);
        return { success: false, message: error.message };
    }
};