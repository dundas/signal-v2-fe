const mongoose = require('mongoose');
const { Schema } = mongoose;

const RulesSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Rule name.'],
    },
    description: {
        type: String,
        required: [true, 'Description is required.'],
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

const Rules = mongoose.models.Rules || mongoose.model('Rules', RulesSchema);

export default Rules;