import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  userName: String,
  firstName: String,
  lastName: String,
  name: String,
  email: { type: String, unique: true },
  image: String,
  password: String,
  githubId: String,
  platform: String,
  credentialPass: Boolean,
  accessToken: String,
  refreshToken: String,
  accessTokenExpires: Number,
  refreshTokenExpires: Number,
  activeBrand: String,
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export default mongoose.models.user || mongoose.model('user', userSchema);