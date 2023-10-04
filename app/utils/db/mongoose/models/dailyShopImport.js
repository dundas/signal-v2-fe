const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema;

const dailyShopImportSchema = new Schema({

    dateAdded: {
        type: String
    },
    start: {
        type: String
    },
    end: {
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

}, {
    collection: 'dailyShopImport'
});

module.exports = mongoose.models.DailyShopImport || mongoose.model('DailyShopImport', dailyShopImportSchema);