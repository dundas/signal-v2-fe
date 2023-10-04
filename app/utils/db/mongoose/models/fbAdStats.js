const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema;

const fbAdStatsSchema = new Schema({
    fbAdId: {
        type: String
    },
    fbCampaignId: {
        type: String
    },
    fbCampaignMame: {
        type: String
    },
    fbAdAccountId: {
        type: String
    },
    fbAdsetName: {
        type: String
    },
    fbAdsetId: {
        type: String
    },
    creative: {
        type: Object
    },
    targeting: {
        type: Object
    },
    adName: {
        type: String
    },
    previewLink: {
        type: String
    }, 
    impressions: {
        type: Number
    },
    spend: {
        type: Number
    },
    linkClicks: {
        type: Number
    },
    purchases: {
        type: Number
    },
    videoViews: {
        type: Number
    },
    contentViews: {
        type: Number
    },
    postSaves: {
        type: Number
    },
    postEngagements: {
        type: Number
    },
    landingPageViews: {
        type: Number
    },
    addToCarts: {
        type: Number
    },
    postReactions: {
        type: Number
    },
    dateStart: {
        type: String
    },
    dateEnd: {
        type: String
    },
    dateAdded: {
        type: String
    },
    snapshot: {
        type: Boolean
    }

}, {
    collection: 'fbAdStats'
});

module.exports = mongoose.models.FbAdStats || mongoose.model('FbAdStats', fbAdStatsSchema);