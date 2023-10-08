
export const messageFunctions = [
    {
        name: "addBrandCorpus",
        description: "Add content to the brand corpus.",
        parameters: {
            type: "object",
            properties: {
                quickResponse: {
                    type: "string",
                    description: "Quick response to let the user know you are working on a reply.",
                },
                type: {
                    description: "Type of content that is being saved. Can be google drive file, folder or doc, a url, or social media link.",
                    type: "string",
                },
                content: {
                    description: "The content that is being saved. Can be a url or text.",
                    type: "string",
                },
                urlIncluded: {
                    description: "Boolean indicating if a valid url directly related to the command is included in the user message.",
                    type: "boolean",
                },
                command: {
                    type: "string",
                    description: "The command we are trying to complete.",
                },
                completionResponse: {
                    type: "string",
                    description: "Confirm to the user the request is complete, and ask the user what to do next in a friendly helpful tone. ",
                },
            },
            required: ["quickResponse", "type", "content", "command", "completionResponse", "urlIncluded"],
        },
    },
    {
        name: "reviewWebpage",
        description: "Review content and return an answer based on the user's command.",
        parameters: {
            type: "object",
            properties: {
                quickResponse: {
                    type: "string",
                    description: "Quick response to let the user know you are working on a reply.",
                },
                content: {
                    description: "The content that is being saved. Can be a url or text.",
                    type: "string",
                },
                urlIncluded: {
                    description: "Boolean indicating if a valid url directly related to the command is included in the user message.",
                    type: "boolean",
                },
                command: {
                    type: "string",
                    description: "The command we are trying to complete.",
                },
                completionResponse: {
                    type: "string",
                    description: "Confirm to the user the request is complete, and ask the user what to do next in a friendly helpful tone. ",
                },
            },
            required: ["quickResponse", "type", "content", "command", "completionResponse", "urlIncluded"],
        },
    },
    {
        name: "recallChatMessage",
        description: "User is asking to recall a previous chat message.",
        parameters: {
            type: "object",
            properties: {
                quickResponse: {
                    type: "string",
                    description: "Quick response to let the user know you are finding references to the messages.",
                },

                command: {
                    type: "string",
                    description: "The command we are trying to complete.",
                },
            },
            required: ["quickResponse", "command"],
        },
    },
    {
        name: "generalChat",
        description: "When a user sends a message that is not a command, we will use this function to respond.",
        parameters: {
            type: "object",
            properties: {
                quickResponse: {
                    type: "string",
                    description: "An engaging response to acknowledge the user's message and navigate the conversation in an interesting way.",
                },

            },
            required: ["quickResponse"],
        },
    },
    {
        name: "generalResponse",
        description: "Catch all for completions that don't fit into any other function.",
        parameters: {
            type: "object",
            properties: {
                quickResponse: {
                    type: "string",
                    description: "Quick response to let the user know you are working on a reply.",
                },

            },
            required: ["quickResponse"],
        },
    }
];
