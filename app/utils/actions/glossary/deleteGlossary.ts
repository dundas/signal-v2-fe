"use server";
import Glossary from "@/utils/db/mongoose/models/glossary";
import { connectDB } from "../../db/mongoose/connect";

export const deleteGlossary = async (id) => {
    try {
        console.log("GLOSSARY ID: ", id);
        await connectDB();
        const deletedGlossary = await Glossary.findByIdAndDelete(id);
        console.log("DELETED GLOSSARY: ", deletedGlossary);

        if (!deletedGlossary) {
            return { success: false, message: "No glossary entry found with this ID" };
        }

        return { success: true, message: "Glossary entry deleted successfully", data: deletedGlossary };
    } catch (error) {
        console.log(error);
        return { success: false, message: error.message };
    }
};