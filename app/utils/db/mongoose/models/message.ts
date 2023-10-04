import { Schema, model, models } from 'mongoose';

const MessageSchema = new Schema({

  context: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  direction: {
    type: String,
    enum: ['in', 'out'],
    required: [true, 'Direction is required.'],
  },
  message: {
    type: String,
    required: [true, 'Message is required.'],
  },
  user: {
    type: String,
    required: [true, 'User is required.'],
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  embedding: {
    type: [Number],
  },
  taskId: {
    type: String
  },
  threadId: {
    type: String
  },
  status: {
    type: String
  },
   
  replyMessageId: {
    type: String
  },
  originMessageId: {
    type: String
  },
  sqlQuery: {
    type: String
  },
  messageQueue: {
    type: Boolean
  },
  slackUser: {
    type: String
  },
  slackChannel: {
    type: String
  },
  slackMessageId: {
    type: String
  },
  slackEventId: {
    type: String
  },
  slackTs: {
    type: String
  }

}, {
  timestamps: true // This will add `createdAt` and `updatedAt` fields
});

const Message = models.Message || model('Message', MessageSchema);

export default Message;
