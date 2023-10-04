const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const klaviyoKeySchema = new Schema({
    shop: { type: String, required: true },
    klaviyoApiKey: { type: String, required: true },
}, { collection: 'klaviyoKey' });

module.exports = mongoose.models.KlaviyoKey || mongoose.model('KlaviyoKey', klaviyoKeySchema);