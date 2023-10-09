import { Schema, model, models } from 'mongoose';

const LogSchema = new Schema({
  projectId: {
    type: String
  },
  taskId: {
    type: String
  },
  taskStepId: {
    type: String
  },
  jobQueueId: {
    type: String
  },
  functionContext: {
    type: Object
  },

  invokeFunction: {
    type: String
  },
  currentFunction: {
    type: String
  },
  start: {
    type: Date
  },
  localStart: {
    type: Date
  },
  end: {
    type: Date
  },
  chainId: {
    type: String
  },
  createdAt: {
    type: Date
  },
  logType: {
    type: String
  },
  description: {
    type: String
  },
  resultDescription: {
    type: String
  },
  prompt: {
    type: String
  },
  promptTokens: {
    type: Number
  },
  completionTokens: {
    type: Number
  },
  aiPlatform: {
    type: String
  },
  aiModel: {
    type: String
  },
  input: {
    type: String
  },
  inputType: {
    type: String
  },
  output: {
    type: String
  },
  promptMessages: {
    type: Array
  },
  promptResponse: {
    type: String
  },
  currentFile: {
    type: String
  },
  success: {
    type: Boolean
  },
  error: {
    type: String
  },
  tokens: {
    type: Number
  },

}, {
  timestamps: true // This will add `createdAt` and `updatedAt` fields
});

const Log = models.Log || model('Log', LogSchema);

export default Log;
