const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema;

const shopSchema = new Schema({
    shop: {
        type: String
    },
    accessToken: {
        type: String
    },
    phone: {
        type: String
    },
    country_code: {
        type: String
    },
    country_name: {
        type: String
    },
    shop: {
        type: String
    },
    accessScope: {
        type: String
    },
    domain: {
        type: String
    },
    primmary_locale: {
        type: String
    },
    email: {
        type: String
    },
    customer_email: {
        type: String
    },
    money_format: {
        type: String
    },
    currency: {
        type: String
    },
    timezone: {
        type: String
    },
    appstatus: {
        type: String
    },
    address1: {
        type: String
    },
    address2: {
        type: String
    },
    zip: {
        type: String
    },
    city: {
        type: String
    },
    province: {
        type: String
    },
    shop_owner: {
        type: String
    },
    latitude: {
        type: Number
    },
    longitute: {
        type: Number
    },
    webhookArn: {
        type: String
    },
    importStatus: {
        type: String
    },
    status: {
        type: String
    },
    createdAt: {
        type: Number
    },
    updatedAt: {
        type: Number
    },
    signalId: {
        type: Number
    },
    bigQuerySync: {
        type: Boolean
    },
    reImportStatus: {
        type: String
    },
    embedding: {
        type: [Number]
    },
    description: {
        type: String
    },
    bigQueryName: {
        type: String
    },
    sqlName: {
        type: String
    },
    companyName: {
        type: String
    },



}, {
    collection: 'shop'
});

const Shop = mongoose.models.Shop || mongoose.model('Shop', shopSchema);
export default Shop;