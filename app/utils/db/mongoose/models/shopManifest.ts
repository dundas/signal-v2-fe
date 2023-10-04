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
        type: String,
        default: 'active' // default status is 'active'
    },
    archived: {
        type: Boolean,
        default: false // default is 'false', it will be 'true' when the manifest is archived
    }
}, {
    collection: 'shopManifest',
    timestamps: true // adds createdAt and updatedAt fields
});

module.exports = mongoose.models.ShopManifest || mongoose.model('ShopManifest', shopManifestSchema);