"use server";
import Steering from "@/utils/db/mongoose/models/steering";
import { connectDB } from "@/utils/db/mongoose/connect";
import { createOpenAIEmbedding } from "../../ai/openai";
export const createSteering = async (steeringData) => {
    await connectDB();
    try {

        steeringData.status = "active";
        steeringData.embedding = [];

        const embeddingString = `Description: ${steeringData.description}\n\n 
        User Message: ${steeringData.exampleMessage}\n\n
        Incorrect Query:  ${steeringData.incorrectQuery}\n\n
        Correct Query: ${steeringData.correctQuery}`;

        const embeddingResponse = await createOpenAIEmbedding(embeddingString);
        steeringData.embedding = embeddingResponse.result[0].embedding;

        const newSteering = new Steering(steeringData);
        await newSteering.save();
        return { success: true, message: "Steering created successfully", data: newSteering };
    } catch (error) {
        console.log(error);
        return { success: false, message: error.message };
    }
};