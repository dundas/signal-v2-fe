const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema;

const shopBatchRawSchema = new Schema({

    shop: {
        type: String
    },
    dateAdded: {
        type: String
    },
    lastUpdated: {
        type: String
    },
    batchId: {
        type: String
    },
    data: {
        type: Object 
    },
   
}, {
    collection: 'shopBatchRaw'
});

module.exports = mongoose.models.ShopBatchRaw || mongoose.model('ShopBatchRaw', shopBatchRawSchema);