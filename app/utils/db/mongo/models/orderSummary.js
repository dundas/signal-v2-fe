const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema;

const orderSummarySchema = new Schema({


    orderId: {
        type: String
    },
    customer: {
        type: String
    },
    customerAmountSpent: {
        type: Number
    },
    customerEmail: {
        type: String
    },
    customerFirstName: {
        type: String
    },
    customerId: {
        type: String
    },
    customerLastName: {
        type: String
    },
    customerType: {
        type: String
    },
    customerJourney: {
        type: Object
    },

    dateAdded: {
        type: String
    },
    dateAddedString: {
        type: String
    },
    discountCodeList: {
        type: Object
    },
    discountsTotal: {
        type: Number
    },
    orderCreatedDatetime: {
        type: String
    },
    orderProcessedDatetime: {
        type: String
    },
    orderCreatedTimestamp: {
        type: Number
    },
    orderName: {
        type: String
    },
    orderUpdatedDatetime: {
        type: String
    },
    orderUpdatedTimestamp: {
        type: Number
    },
    priceSubTotal: {
        type: Number
    },
    priceTotal: {
        type: Number
    },
    productList: {
        type: Object
    },
    variantList: {
        type: Object
    },
    lineItemList: {
        type: Object
    },

    refundTotal: {
        type: Number
    },
    financialStatus: {
        type: String
    },
    shippingCountry: {
        type: String
    },
    shippingCountryCode: {
        type: String
    },
    shippingState: {
        type: String
    },
    shippingStateCode: {
        type: String
    },
    shippingZip: {
        type: String
    },
    shop: {
        type: String
    },
    importSource: {
        type: Object
    },
    taxTotal: {
        type: Number
    },
    totalCogs: {
        type: Number
    },
    totalItemCount: {
        type: Number
    },
    totalRefunds: {
        type: Number
    },
    totalShippingRevenue: {
        type: Number
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

    utmCampaignLast: {
        type: String
    },
    utmContentLast: {
        type: String
    },
    utmMediumLast: {
        type: String
    },
    utmSourceLast: {
        type: String
    },
    utmTermLast: {
        type: String
    },
    importBatchId: {
        type: String
    },
    errorInsert: {
        type: Boolean
    },
    errorData: {
        type: Object
    },
    transactions: {
        type: Object
    },
    source: {
        type: String
    },
    location: {
        type: Object
    },
    paymentGateways: {
        type: Object
    },
    syncStatus: {
        type: Boolean
    },

    attributionSync: {
        type: Boolean
    },
    lineItemSync: {
        type: Boolean
    },
  
    lastBatchId: {
        type: String
    },
    localBatchId: {
        type: String
    },
    lastUpdated: {
        type: String
    }

}, {
    collection: 'orderSummary'
});

module.exports = mongoose.models.OrderSummary || mongoose.model('OrderSummary', orderSummarySchema);