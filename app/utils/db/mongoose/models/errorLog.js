const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema;

const errorLogSchema = new Schema({

    shop: {
        type: String
    },
    sourceData: {
        type: Object
    },
    invokeData: {
        type: Object
    },
    errorMessage: {
        type: Object
    },
    calledFrom: {
        type: String
    },
    timestamp: {
        type: String
    }

}, {
    collection: 'errorLog'
});

module.exports = mongoose.models.ErrorLog || mongoose.model('ErrorLog', errorLogSchema);