import Message from '@/utils/db/mongoose/models/message'
import Feedback from '@/utils/db/mongoose/models/feedback'
import { connectDB } from '@/utils/db/mongoose/connect'

export async function getMessageDetails(messageId) {
    await connectDB();

    // Fetch the message details
    const message = await Message.findById(messageId);
    if (!message) {
        throw new Error(`No message found with id: ${messageId}`);
    }

    // Fetch the original message if originalMessageId is set
    let originalMessage = null;
    if (message.originalMessageId) {
        originalMessage = await Message.findById(message.originalMessageId);
    }

    // Fetch the reply message if replyMessageId is set
    let replyMessage = null;
    if (message.replyMessageId) {
        replyMessage = await Message.findById(message.replyMessageId);
    }

    // Fetch related feedback using the threadId or slackTs
    const feedback = await Feedback.find({
        $or: [
            { threadId: message.threadId },
            { slackEventId: message.slackTs }
        ]
    });

    return {
        message,
        originalMessage,
        replyMessage,
        feedback
    };
}