const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema;

const attributionQueueSchema = new Schema({

    shop: {
        type: String
    },
    status: {
        type: String
    },
    start: {
        type: String
    },
    end: {
        type: String
    },
    dateAdded: {
        type: String
    },
    lastUpdated: {
        type: String
    },
  
    dateImportComplete: {
        type: String
    },

}, {
    collection: 'attributionQueue'
});

module.exports = mongoose.models.AttributionQueue || mongoose.model('AttributionQueue', attributionQueueSchema);