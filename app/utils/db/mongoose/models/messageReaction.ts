import mongoose from 'mongoose';

const MessageReactionSchema = new mongoose.Schema({
    messageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        required: true
    },
    reaction: {
        type: String,
        required: true
    },
    user: {
        type: String 
    },
    slackUser: {
      type: String 
  }
}, {
    timestamps: true
});

const MessageReaction = mongoose.model('MessageReaction', MessageReactionSchema);

export default MessageReaction;