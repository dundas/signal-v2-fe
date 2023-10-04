const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema;

const orderQueueSchema = new Schema({

    dateAdded: {
        type: String
    },
    data: {
        type: Object
    },
    status: {
        type: String
    },
    shop: {
        type: String
    },
    lastUpdated: {
        type: String
    },
    type: {
        type: String
    }

}, {
    collection: 'orderQueue'
});

module.exports = mongoose.models.OrderQueue || mongoose.model('OrderQueue', orderQueueSchema);