const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema;

const shopImportSchema = new Schema({

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
    collection: 'shopImport'
});

module.exports = mongoose.models.ShopImport || mongoose.model('ShopImport', shopImportSchema);