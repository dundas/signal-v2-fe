const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema;

const deleteRequestSchema = new Schema({

    dateAdded: {
        type: String
    },

    shop: {
        type: String
    },
    data: {
        type: Object
    },

}, {
    collection: 'deleteRequest'
});

module.exports = mongoose.models.DeleteRequest || mongoose.model('DeleteRequest', deleteRequestSchema);