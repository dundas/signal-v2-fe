import { Schema, model, models } from 'mongoose';
 

const shopManifestSchema = new Schema({
    shopId: {
        type: String,
        required: true
    },
    content: {
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
    timestamps: true // adds createdAt and updatedAt fields
});

const ShopManifest = models.ShopManifest ||  model('ShopManifest', shopManifestSchema);

export default ShopManifest;