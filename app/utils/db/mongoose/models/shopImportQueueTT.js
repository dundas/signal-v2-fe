const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema;

const shopImportQueueTTSchema = new Schema({

    shop: {
        type: String
    },
    start: {
        type: String
    },
    end: {
        type: String
    },
    month: {
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

}, {
    collection: 'shopImportQueueTT'
});

module.exports = mongoose.models.ShopImportQueueTT || mongoose.model('ShopImportQueueTT', shopImportQueueTTSchema);