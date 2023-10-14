"use server";
import Glossary from "@/utils/db/mongoose/models/glossary";
import { connectDB } from "@/utils/db/mongoose/connect";
import { createOpenAIEmbedding } from "../../ai/openai";

export const createGlossary = async (glossaryData) => {
    await connectDB();
    try {
        glossaryData.status = "active";
        glossaryData.embedding = [];

        const embeddingString = `Term: ${glossaryData.term}\n\n 
        Definition: ${glossaryData.definition}\n\n
        Example Usage:  ${glossaryData.exampleUsage}\n\n
        Synonyms: ${glossaryData.synonyms}`;

        const embeddingResponse = await createOpenAIEmbedding(embeddingString, null, false);
        glossaryData.embedding = embeddingResponse.result[0].embedding;

        const newGlossary = new Glossary(glossaryData);
        const glossaryResult = await newGlossary.save();

        return { success: true, message: "Glossary entry created successfully", results: JSON.parse(JSON.stringify(glossaryResult)) };
    } catch (error) {
        console.log(error);
        return { success: false, message: error.message };
    }
};