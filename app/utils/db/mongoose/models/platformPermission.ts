import mongoose from 'mongoose';

const platformPermissionSchema = new mongoose.Schema({
    userId: String,
    accessToken: String,
    refreshToken: String,
    accessTokenExpires: Number,
    refreshTokenExpires: Number,
    platform: String,
    scope: String,
    tokenType: String
}, {
    timestamps: true // This will add `createdAt` and `updatedAt` fields
});

export default mongoose.models.platformPermission || mongoose.model('platformPermission', platformPermissionSchema);