import { encode } from "gpt-tokenizer";

export async function fitTokenWindow(text, maxTokens) {
    //console.log("MAX TOKENS:", maxTokens);
    let summaryTokenCount = await encode(text).length;
    //console.log("SUMMARY TOKEN COUNT:", summaryTokenCount);

    while (summaryTokenCount > maxTokens) {
        const summaryCharacterCount = text.length;
        //console.log("SUMMARY CHARACTER COUNT:", summaryCharacterCount);

        // Reduce text length by 10%
        const reducedCharacterLength = Math.floor(summaryCharacterCount * 0.9);
        //console.log("REDUCED CHARACTER LENGTH:", reducedCharacterLength);

        text = text.substring(0, reducedCharacterLength);
        summaryTokenCount = await encode(text).length;
        //console.log("UPDATED SUMMARY TOKEN COUNT:", summaryTokenCount);
    }

    return text;
}
