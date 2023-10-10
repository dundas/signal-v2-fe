"use server";
import { connectDB } from "@/utils/db/mongoose/connect";
import User from "@/utils/db/mongoose/models/user";
import Brand from "@/utils/db/mongoose/models/brand";
export async function getUserSession(session) {

    // Connect to the database
    await connectDB();

    if (!session?.user?.email) {
        return null;
    }
    // Find the user by id
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
        throw new Error("User not found");
    }
   

    // Return the user object
    return JSON.parse(JSON.stringify({ userId: user._id, name: user.name, image: user.image }));

}