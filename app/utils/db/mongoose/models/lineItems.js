const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema;

const lineItemSchema = new Schema({

    shop: {
        type: String
    },
    orderId: {
        type: String
    },
 
    orderName: {
        type: String
    },
   
    lineItemId: {
        type: String
    },
    name: {
        type: String
    },
    tags: {
        type: String
    },
    sku: {
        type: String
    },
    type: {
        type: String
    },
    lineItemPrice: {
        type: String
    },
    lineItemDiscount: {
        type: String
    },
    productType: {
        type: String
    },
    cost: {
        type: String
    },
    quantity: {
        type: Number
    },
    variantTitle: {
        type: String
    },
    productTitle: {
        type: String
    },
    variantId: {
        type: String
    },
    productId: {
        type: String
    },
    inventoryItemId: {
        type: String
    },
    lastUpdated: {
        type: String
    },
    orderCreatedDatetime: {
        type: String
    },
    orderProcessedDatetime: {
        type: String
    },

}, {
    collection: 'lineItem'
});

module.exports = mongoose.models.LineItem || mongoose.model('LineItem', lineItemSchema);