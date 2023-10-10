import { connectDB } from "@/utils/db/mongoose/connect";
import Shop from "@/utils/db/mongoose/models/shop";

export async function getShopDetails(shopId) {
    try {
        await connectDB();
        const shop = await Shop.findOne({ _id: shopId });

        if (!shop) {
            throw new Error("No Shop found");
        }

        return { success: true, result: JSON.parse(JSON.stringify(shop)) };
    } catch (error) {
        console.log(error);
        return { success: false, message: error.message };
    }
}