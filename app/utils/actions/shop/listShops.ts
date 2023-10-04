import { connectDB } from "@/utils/db/mongoose/connect";
import Shop from "@/utils/db/mongoose/models/Shop";

export async function listShops() {
    await connectDB();

    const shops = await Shop.find({ status: 'active' });

    if (!shops) {
        throw new Error("No active shops found");
    }

    return shops;
}