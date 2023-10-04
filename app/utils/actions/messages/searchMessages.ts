import Message from '@/utils/db/mongoose/models/message'
import { connectDB } from '@/utils/db/mongoose/connect'

export async function searchMessages(searchOptions) {
    await connectDB();
    const query = {};

    if (searchOptions.startDate && searchOptions.endDate) {
        query.createdAt = {
            $gte: new Date(searchOptions.startDate),
            $lte: new Date(searchOptions.endDate),
        };
    } else if (searchOptions.startDate) {
        query.createdAt = {
            $gte: new Date(searchOptions.startDate),
        };
    } else if (searchOptions.endDate) {
        query.createdAt = {
            $lte: new Date(searchOptions.endDate),
        };
    }

    if (searchOptions.threadId) {
        query.threadId = searchOptions.threadId;
    }

    if (searchOptions.slackChannel) {
        query.slackChannel = searchOptions.slackChannel;
    }

    if (searchOptions.slackUser) {
        query.slackUser = searchOptions.slackUser;
    }

    // Default skip to 0 and limit to 10 if they are not provided
    const skip = searchOptions.skip !== undefined ? searchOptions.skip : 0;
    const limit = searchOptions.limit !== undefined ? searchOptions.limit : 10;

    const messages = await Message.find(query)
        .skip(skip)
        .limit(limit);

    return messages;
}