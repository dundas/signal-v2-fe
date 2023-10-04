const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema;

const shopImportTTSchema = new Schema({

    dateAdded: {
        type: String
    },
    lastMonthImport: {
        type: String
    },
    firstOrderDate: {
        type: String
    },
    lastUpdated: {
        type: String
    },
    shop: {
        type: String
    },
    status: {
        type: String
    },
    type: {
        type: String
    },

}, {
    collection: 'shopImportTT'
});

module.exports = mongoose.models.ShopImportTT || mongoose.model('ShopImportTT', shopImportTTSchema);