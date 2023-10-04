import { Schema, model, models } from 'mongoose';

const SteeringSchema = new Schema({
    exampleMessage: {
        type: String,
        required: [true, 'Example message is required.'],
    },
    referenceMessageId: {
        type: String 
    },
    userDescription: {
        type: String,
        required: [true, 'User description is required.'],
    },
    incorrectQuery: {
        type: String,
        required: [true, 'Incorrect query is required.'],
    },
    correctQuery: {
        type: String,
        required: [true, 'Correct query is required.'],
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    embedding: {
        type: [Number],
    },
    summary: {
        type: String,
    },
}, {
    timestamps: true // This will add `createdAt` and `updatedAt` fields
});

const Steering = models.Steering || model('Steering', SteeringSchema);

export default Steering;