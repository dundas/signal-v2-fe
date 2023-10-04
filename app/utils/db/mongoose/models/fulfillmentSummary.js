const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema;

const fulfillmentSummarySchema = new Schema({


    orderId: {
        type: String
    },
    shop: {
        type: String
    },
    dateAdded: {
        type: String
    },
    createdAt: {
        type: String
    },
    cancelledAt: {
        type: String
    },
    orderName: {
        type: String
    },
     financialStatus: {
        type: String
    },
    fulfillmentStatus: {
        type: String
    },
    totalItemCount: {
        type: Number
    },
    lineItemList: {
        type: Object
    },

}, {
    collection: 'fulfillmentSummary'
});

module.exports = mongoose.models.FulfillmentSummary || mongoose.model('FulfillmentSummary',  fulfillmentSummarySchema);