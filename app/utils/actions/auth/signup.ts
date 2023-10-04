// app/auth/signup.server.ts
import bcrypt from 'bcrypt';
import { connectDB } from "@/utils/db/mongoose/connect"
import User from "@/utils/db/mongoose/models/User"

export async function signUp({ email, password }) {
  await connectDB();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    email,
    password: hashedPassword,
  });

  await newUser.save();

  // Here you can also add code to sign the user in right after sign-up
  // by creating a session and returning a session token

  return { message: 'User created' };
}