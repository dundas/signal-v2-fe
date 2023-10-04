const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const shopManifestSchema = new Schema({
    shopId: {
        type: String,
        required: true
    },
    manifest: {
        type: String,

    },
    status: {
        type: String
    }
}, {
    collection: 'shopManifest'
});

module.exports = mongoose.models.ShopManifest || mongoose.model('ShopManifest', shopManifestSchema);