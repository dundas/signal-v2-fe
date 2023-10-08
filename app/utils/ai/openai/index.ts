import axios from "axios";
const fs = require("fs"); 
import { encode  } from 'gpt-tokenizer'
import { createLog } from "@/utils/system/createLog";
import { resetLog } from "@/utils/system/resetLog";
import { localizeLog } from "@/utils/system/localizeLog";
import { fitTokenWindow } from "@/utils/system/fitTokenWindow";

const keyArray = [process.env.OPENAI_API_KEY];

const randomKey = keyArray[Math.floor(Math.random() * keyArray.length)];
 
const countTokens = (text) => {
  const tokens = text.split(/(\W+)/).filter((t) => t.trim().length > 0);
  return tokens.length * 1.375;
};


export const chatResponse = async (messages, temp = .7, functions = [], functionCall = null, model = "gpt-3.5-turbo", currentLog = null) => {
  const currentFunction = chatResponse.name;
  console.log("CURRENT FUNCTION", currentFunction)
  if (currentLog) {
    currentLog = await localizeLog(chatResponse.name, currentLog);
  }
  try {
    console.log("INSIDE CHAT RESPONSE")
    if (model === 'gpt-3.5') {
      model = 'gpt-3.5-turbo';
    }
    const maxTokens = 4096;
    const responseReserve = 2500;

    const chatTokens = await encode(JSON.stringify(messages));
    console.log("CHAT TOKENS", chatTokens.length)
    const inputTokens = chatTokens.length;
    const availableTokens = Math.max(0, maxTokens - chatTokens.length);
 
    if (availableTokens < responseReserve) {

      if (model !== "gpt-4") {
        model = "gpt-3.5-turbo-16k";
      }

    }
    if (inputTokens > 7500) {
      model = "gpt-3.5-turbo-16k";
    }
    /*if (functions.length > 0) {
      model = "gpt-3.5-turbo-16k";
    }*/
    console.log("MODEL", model)

    const completionSettings = {
      model,
      messages,
      temperature: temp,
      //max_tokens: finalResponseReserve,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    }

    if (functionCall) {
      completionSettings.function_call = functionCall;
    }
    if (functions.length > 0) {
      completionSettings.functions = functions;
    }

    //console.log("COMPLETION SETTINGS", completionSettings)
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      completionSettings, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${randomKey}`,
      },
    }
    );
    



    if (response.data && response.data.choices && response.data.choices.length > 0) {
      console.log("RESPONSE DATA", response.data.choices[0])

      let responseData = response.data.choices[0].message.content;


      // Check if the response is cut-off
      if (response.data.choices[0].finish_reason === "length") {
        // Recursive call to handle the remaining content
        const remainingMessages = [...messages, {
          role: "user",
          content: responseData
        }];
        const remainingResponse = await chatResponse(remainingMessages, temp);

        // Combine the current response with the remaining response
        return responseData + remainingResponse;
      }

      if (response.data.choices[0].finish_reason === "function_call") {

        responseData = response.data.choices[0].message.function_call;
      }
      if (response.data.choices[0].finish_reason === "stop") {

        if (response.data.choices[0].message.content) {

          responseData = response.data.choices[0].message.content;
        }
        else {
          responseData = response.data.choices[0].message.function_call.arguments;
          responseData = JSON.parse(JSON.stringify(responseData));
        }

      }
      if (currentLog) {

        const promptTokens = await encode(JSON.stringify(messages));
        const completionTokens = await encode(JSON.stringify(responseData));
        currentLog.promptTokens = promptTokens.length;
        currentLog.completionTokens = completionTokens.length;
        currentLog.totalTokens = promptTokens.length + completionTokens.length;
        currentLog.promptResponse = JSON.stringify(responseData);
        currentLog.promptMessages = messages;
        currentLog.aiPlatform = "openai";
        currentLog.aiModel = model;
        currentLog.end = new Date();
        currentLog.success = true;
        currentLog.logType = "ai_response";
        currentLog.input = JSON.stringify(messages);
        await createLog(currentLog);
        currentLog = await resetLog(currentLog);
        currentLog.currentFunction = currentLog.lastFunction;

      }
      console.log("RESPONSE DATA", responseData)
       
      return responseData;
    }
  } catch (err) {
    console.error("Error calling OpenAI API:", err.response.data);
    currentLog.success = false;
    currentLog.error = JSON.stringify(err);
    await createLog(currentLog);
    currentLog = await resetLog(currentLog);
    currentLog.currentFunction = currentLog.lastFunction;
    return null;
  }
};

export const createOpenAIEmbedding = async (text, currentLog=null, retry = true) => {
  const currentFunction = createOpenAIEmbedding.name;
  console.log("CURRENT FUNCTION", currentFunction);

  if (currentLog) {
    currentLog = await localizeLog(createOpenAIEmbedding.name, currentLog);
  }

  try {
    const tokens = await countTokens(text);
    //console.log("TOKENS", tokens);

    const apiKey = process.env.OPENAI_API_KEY;
    const model = 'text-embedding-ada-002';

    const result = await axios.post(
      'https://api.openai.com/v1/embeddings', {
      input: text,
      model,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    console.log("EMBEDDING RESULT: ", result.data);

    if (currentLog) {
      const totalTokens = await encode(JSON.stringify(text));
      currentLog.totalTokens = totalTokens.length;
      currentLog.aiPlatform = "openai";
      currentLog.aiModel = model;
      currentLog.end = new Date();
      currentLog.success = true;
      currentLog.logType = "create_embedding";
      currentLog.input = JSON.stringify(text);
      await createLog(currentLog);
      currentLog = await resetLog(currentLog);
      currentLog.currentFunction = currentLog.lastFunction;
    }

    return {
      success: true,
      result: result.data.data
    };
  } catch (err) {
    console.log("Error:", err.response.data);

    // If retry is true and the error message indicates a token limit problem, retry with shortened text
    if (retry && err.response.data && err.response.data.message && err.response.data.message.includes('maximum context length')) {
      console.log("Attempting to retry with shortened text...");
      const shortenedText = await fitTokenWindow(text, 8000); // You might want to adjust this number as needed
      return await createOpenAIEmbedding(shortenedText, currentLog, false); // Passing false to prevent infinite retries
    }

    if (currentLog) {
      console.log('Error:', err.response.data);
      currentLog.success = false;
      currentLog.error = JSON.stringify(err);
      await createLog(currentLog);
      currentLog = await resetLog(currentLog);
      currentLog.currentFunction = currentLog.lastFunction;
    }

    return {
      success: false,
      err,
    };
  }
};