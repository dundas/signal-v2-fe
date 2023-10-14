"use server";
import Rule from "@/utils/db/mongoose/models/rule";
import { connectDB } from "@/utils/db/mongoose/connect";
import { createOpenAIEmbedding } from "../../ai/openai";

export const createRule = async (ruleData) => {
    await connectDB();
    try {
        ruleData.status = "active";
        ruleData.embedding = [];

        const embeddingString = `Rule: ${ruleData.name}\n\n 
        Description: ${ruleData.description}\n\n 
        Example Query: ${ruleData.correctQuery}`;

        const embeddingResponse = await createOpenAIEmbedding(embeddingString, null, false);
        ruleData.embedding = embeddingResponse.result[0].embedding;

        const newRule = new Rule(ruleData);
        const ruleResult = await newRule.save();

        return { success: true, message: "Rule created successfully", results: JSON.parse(JSON.stringify(ruleResult)) };
    } catch (error) {
        console.log(error);
        return { success: false, message: error.message };
    }
};