import { vectorSearch } from '../db/mongo/vectorSearch'
import { createOpenAIEmbedding } from '../ai/openai'
import { fitTokenWindow } from './fitTokenWindow';

export async function executeSearch(options) {
    try {
        const embeddingResponse = await createOpenAIEmbedding(options.message);
        const embedding = embeddingResponse.result[0].embedding;

        let limit = 3;
        if (options.limit) {
            limit = options.limit;
        }
     

        const searchPromises = options.searches.flatMap(search =>
            vectorSearch(options.message, search.collection, search.filter || {}, limit, embedding, options.page)
        );
        const searchResults = await Promise.all(searchPromises);

        const formattedResults = await Promise.all(searchResults.flatMap(resultArray =>
            resultArray.map(async (result) => {
                //console.log("RESULT", result)
                result = JSON.parse(JSON.stringify(result));
                try {

                    const formattedResult = {
                        score: result.score,
                        collection: result.collection
                    };
                    if (result.document) {
                        const fields = ['summary', 'documentation', 'brandId', 'transcription', 'videoTranscription', 'content', 'title', '_id', 'sourceLocation', 'createdAt', 'updatedAt', 'message', 'threadId', 'direction', 'replyMessageId', 'originMesssageId', 'source', 'userId'];
                        await Promise.all(fields.map(async (field) => {
                            if (result.document[field]) {
                                //console.log("FIELD", field)
                                //console.log("RESULT", result.document[field])
                                if (field === '_id') {
                                    formattedResult[field] = result.document[field];
                                } else {
                                    formattedResult[field] = await fitTokenWindow(result.document[field], 2500);
                                }
                            }
                        }));
                    }
                    return formattedResult;

                } catch (e) {
                    console.log("ERROR", e)
                }

            })
        ));

        const sortedResults = formattedResults.sort((a, b) => b.score - a.score);
        const topResults = sortedResults

        return topResults;
    } catch (error) {
        console.error("Error encountered during search:", error);
        return [];
    }
}