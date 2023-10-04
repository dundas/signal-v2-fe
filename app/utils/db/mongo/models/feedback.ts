import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
    originalMessage: {
        type: String,
    },
    message: {
        type: String,
        required: true
    },
    threadId: {
        type: String,
        required: true
    },
    userId: {
        type: String 
    },
    slackUserId: {
        type: String 
    },
    slackEventId: {
        type: String 
    },

}, {
    timestamps: true
});

const Feedback = mongoose.models.Feedback || mongoose.model('Feedback', FeedbackSchema);

export default Feedback;