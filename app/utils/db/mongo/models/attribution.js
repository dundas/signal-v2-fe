const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema;

const attributionSchema = new Schema({

    shop: {
        type: String
    },
    orderId: {
        type: String
    },
    dateAdded: {
        type: String
    },
    orderCreatedDatetime: {
        type: String
    },
    orderProcessedDatetime: {
        type: String
    },
    orderName: {
        type: String
    },
   
    utmCampaign: {
        type: String
    },
    utmContent: {
        type: String
    },
    utmMedium: {
        type: String
    },
    utmSource: {
        type: String
    },
    utmTerm: {
        type: String
    },
    landingPage: {
        type: String
    },
    referrerUrl: {
        type: String
    },
    source: {
        type: String
    },
    lastUpdated: {
        type: String
    },
    moment: {
        type: Number
    },
    lastQueueId: {
        type: String
    }

}, {
    collection: 'attribution'
});

module.exports = mongoose.models.Attribution || mongoose.model('Attribution', attributionSchema);