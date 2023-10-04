const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema;

const fbAdAccountSchema = new Schema({

    dateAdded: {
        type: String
    },
    lastUpdated: {
        type: String
    },
    shop: {
        type: String
    },
    fbAdAccountId: {
        type: String
    },
    shortTermToken: {
        type: String
    },
    longTermToken: {
        type: String
    },
    status: {
        type: String
    },
    tokenExpires: {
        type: Number
    },
    importComplete: {
        type: Boolean
    },
    

}, {
    collection: 'fbAdAccount'
});

module.exports = mongoose.models.FbAdAccount || mongoose.model('FbAdAccount', fbAdAccountSchema);