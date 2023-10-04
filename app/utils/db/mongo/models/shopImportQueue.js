const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema;

const shopImportQueueSchema = new Schema({

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
    collection: 'shopImportQueue'
});

module.exports = mongoose.models.ShopImportQueue || mongoose.model('ShopImportQueue', shopImportQueueSchema);