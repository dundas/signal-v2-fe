import { connectDB } from "@/utils/db/mongoose/connect";
import User from "@/utils/db/mongoose/models/User";
export async function authorize(credentials) {
    await connectDB();

    const user = await User.findOne({ username: credentials.username });

    if (user) {
        const isValid = await bcrypt.compare(
            credentials.password,
            user.password
        );

        if (isValid) {
            return { id: user._id, name: user.name, email: user.email };
        } else {
            throw new Error("Invalid password");
        }
    } else {
        throw new Error("No user found");
    }
}
