const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema;

const shopBatchLogSchema = new Schema({

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
    queueId: {
        type: String
    },
    status: {
        type: String
    },
    dataId: {
        type: String
    },
    errorData: {
        type: Object
    }

}, {
    collection: 'shopBatchLog'
});

module.exports = mongoose.models.ShopBatchLog || mongoose.model('ShopBatchLog', shopBatchLogSchema);