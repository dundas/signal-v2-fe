const mongoose = require('mongoose');
const { Schema } = mongoose;

const GlossarySchema = new Schema({
    term: {
        type: String,
        required: [true, 'Term is required.'],
    },
    definition: {
        type: String,
        required: [true, 'Definition is required.'],
    },
    examples: {
        type: [String],
    },
    embedding: {
        type: [Number],
    },
    createdBy: {
        type: String
    }
});

const Glossary = mongoose.models.Glossary || mongoose.model('Glossary', GlossarySchema);

export default Glossary;