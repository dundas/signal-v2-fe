import mongoose from 'mongoose';

const PlatformPermissionSchema = new mongoose.Schema({
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

export default mongoose.models.PlatformPermission || mongoose.model('PlatformPermission', PlatformPermissionSchema);