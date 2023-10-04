const mongoose = require('mongoose');
const { Schema } = mongoose;

const bigQueryTableSchema = new Schema({
    tableId: {
        type: String,
        required: true,
    },
    dataStore: {
        type: String,
        required: true,
    },
    schema: {
        type: Object,
        required: true,
    },
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    },
    status: {
        type: String,
        required: true,
    },
}, {
    collection: 'bigQueryTable'
});

module.exports = mongoose.models.BigQueryTable || mongoose.model('BigQueryTable', bigQueryTableSchema);