const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema;

const refundSummarySchema = new Schema({


    orderId: {
        type: String
    },
    shop: {
        type: String
    },

    dateAdded: {
        type: String
    },
    lastUpdated: {
        type: String
    },

    orderUpdatedDatetime: {
        type: String
    },

    orderCreatedDatetime: {
        type: String
    },
    orderName: {
        type: String
    },
    orderProcessedDatetime: {
        type: String
    },
     financialStatus: {
        type: String
    },

    lineItems: {
        type: Object
    },
    transactions: {
        type: Object
    },
    refundDetails: {
        type: Object
    },
    refundAmount: {
        type: Number
    },
    type: {
        type: String
    },
    lastBatchId: {
        type: String
    }


}, {
    collection: 'refundSummary'
});

module.exports = mongoose.models.RefundSummary || mongoose.model('RefundSummary', refundSummarySchema);