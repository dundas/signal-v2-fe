const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema;

const shopBatchQueueSchema = new Schema({

    shop: {
        type: String
    },
    status: {
        type: String
    },
    dateAdded: {
        type: String
    },
    lastUpdated: {
        type: String
    },
    type: {
        type: String
    },
    start: {
        type: String
    },
    end: {
        type: String
    },
    localBatchId: {
        type: String
    },
    query: {
        type: Object
    },
    shopifyBulkOperation: {
        type: Object
    },
    shopifyBatchId: {
        type: String
    },
    shopifyBatchUrl: {
        type: String
    },
    shopifyBatchComplete: {
        type: Boolean
    },
    shopifyBatchData: {
        type: Object
    },
    batchLines: {
        type: Number
    },
    batchProcessCursor: {
        type: Number
    },
    orderCount: {
        type: String
    },
    importStatus: {
        type: String
    },

    dateImportComplete: {
        type: String
    },
    throttleExpires: {
        type: String
    },
    error: {
        type: Boolean
    },


}, {
    collection: 'shopBatchQueue'
});

module.exports = mongoose.models.ShopBatchQueue || mongoose.model('ShopBatchQueue', shopBatchQueueSchema);