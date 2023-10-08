import { createOpenAIEmbedding } from "../ai/openai";
import { v4 as uuidv4 } from "uuid";
import ChainMemory from "../db/mongo/models/ChainMemory";
import { connectDB } from "../db/mongo/connect";

import { encode } from "gpt-tokenizer"

export const createMemory = async (memoryDetails) => {
  try {
    const currentTime = new Date().toISOString();
    const {
      chainId,
      taskId,
      projectId,
      taskStepId,
      currentFile,
      currentFunction,
      prompt,
      promptMessages,
      model,
      aiDetails,
      response,
      type,
      sequence,
      search
    } = memoryDetails;

    let embeddingText = search;

    if (!search && promptMessages && promptMessages.length > 0) {
      embeddingText = `PROMPT ${promptMessages[promptMessages.length - 1].content}\n\nRESPONSE ${response}`;
    }

    if (!embeddingText) {
      throw new Error("No embedding text provided");
    }

    console.log("EMBEDDING TEXT:", embeddingText);
    console.log("PROMPT:", prompt);

    const tokenCount = encode(embeddingText).length;

    if (tokenCount > 6000) {
      embeddingText = embeddingText.substring(0, 24000);
    }

    const { success, result: embeddingResult } = await createOpenAIEmbedding(embeddingText);
    const embedding = embeddingResult?.embedding;

    if (!success) {
      throw new Error("Failed to create embedding");
    }

    let shortPrompt = prompt ? (prompt.length > 40000 ? prompt.substring(0, 40000) : prompt) : embeddingText;

    const metaData = {
      chainId,
      taskId,
      projectId,
      taskStepId,
      currentFile,
      currentFunction,
      response,
      prompt: shortPrompt,
      model,
      type,
      timestamp: currentTime,
      aiDetails: JSON.stringify(aiDetails),
      sequence,
      search
    };

    const newSystemMemory = {
      ...metaData,
      embedding: embeddingResult,
      createdAt: currentTime,
      updatedAt: currentTime,
    };

    const vectorId = uuidv4();

    await connectDB();

    const newMemoryResult = await ChainMemory.create(newSystemMemory);
    metaData.memoryId = String(newMemoryResult._id);


    return { success: true };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create memory");
  }
};