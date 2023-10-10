"use server";
import Shop from "@/utils/db/mongoose/models/shop";
import { connectDB } from "../../db/mongoose/connect";
import { createOpenAIEmbedding } from "../../ai/openai";

export const updateShopDetails = async (id, updatedData) => {

    try {
        await connectDB();
        // Only allow updates for specific fields
        const allowedUpdates = ['embedding', 'description', 'bigQueryName', 'companyName'];
        const updates = Object.keys(updatedData);
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return { success: false, message: 'Invalid updates!' };
        }

        // get shop details 
        const shopCheck = await Shop.findOne({ _id: id });
        if (!shopCheck) {
            throw new Error("No Shop found");
        }

        let embeddingString = `Shop Name: ${shopCheck.shop}`
        if (updatedData.description) {
            embeddingString += `\n\nDescription: ${updatedData.description}`
        }
        if (updatedData.bigQueryName) {
            embeddingString += `\n\nSQL Shop Name: ${updatedData.bigQueryName}`
        }
        if (updatedData.companyName) {
            embeddingString += `\n\nCompany Name: ${updatedData.companyName}`
        }

        const embeddingResponse = await createOpenAIEmbedding(embeddingString, null, false);
        updatedData.embedding = embeddingResponse.result[0].embedding;
        console.log("UPDATED DATA: ", updatedData);


        const updatedShop = await Shop.findByIdAndUpdate(id, updatedData, { new: true });
        console.log("UPDATED SHOP: ", updatedShop);
        return { success: true, message: "Shop details updated successfully", results: JSON.parse(JSON.stringify(updatedShop)) };
    } catch (error) {
        console.log(error);
        return { success: false, message: error.message };
    }
};