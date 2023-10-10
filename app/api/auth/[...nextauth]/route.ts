import { authorize } from "@/utils/actions/auth/authorize"
import NextAuth from "next-auth"
import type { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github"
import { connectDB } from "../../../utils/db/mongoose/connect"
import User from "../../../utils/db/mongoose/models/user"
import bcrypt from "bcrypt"

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        await connectDB();

        const existingUser = await User.findOne({ email: credentials.email });

        if (existingUser) {
          throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(credentials.password, 10);

        const newUser = new User({
          email: credentials.email,
          password: hashedPassword,
          // Add any other user properties you want to save
        });

        await newUser.save();

        return { id: newUser._id, email: newUser.email };
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    })
  ],
  callbacks: {

    async session({ session, user }) {
      await connectDB();
      console.log("SESSION: ", session);
      const sessionUser = await User.findOne({ email: session.user.email });
      console.log("SESSION USER: ", sessionUser);

      if (!sessionUser) {
        throw new Error("User not found");
      }

      console.log("SESSION USER ID: ", sessionUser._id);
      session.user.id = String(sessionUser._id);
      return {
        user: {
          name: sessionUser.name,
          image: sessionUser.image,
          userId: String(sessionUser._id),
        },
      };
    },
    async signIn({ profile, account, user }) {
      console.log("SIGN IN PROFILE: ", profile);

      // account
      console.log("ACCOUNT: ", account);
      // user
      console.log("USER: ", user);
      await connectDB();

      try {


        const existingUser = await User.findOne({ email: user.email });

        console.log("EXISTING USER: ", existingUser);
        if (!existingUser) {

          const newProfile = user
          newProfile.accessToken = account?.access_token
          newProfile.refreshToken = account?.refresh_token
          newProfile.accessTokenExpires = account?.expires_at
          newProfile.refreshTokenExpires = account?.refresh_token_expires_in


          if (account.provider === "github") {
            newProfile.password = await bcrypt.hash(user.email, 10);
            newProfile.githubId = user.id
            newProfile.image = user.image
            newProfile.platform = "github";
            newProfile.credentialPass = false;
          }
          delete newProfile.id;
          const userResult = new User(newProfile);
          await userResult.save();
        }

        return true
      } catch (error) {
        console.log(error);
      }

    },

  },
  session: { strategy: "jwt" },
  /*pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
    // Add any other custom pages you have
  },*/
  secret: process.env.NEXTHAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }