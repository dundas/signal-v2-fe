import { connectDB } from "@/utils/db/mongoose/connect";
import ShopManifest from "@/utils/db/mongoose/models/ShopManifest";

export async function getShopManifest(shopId) {
    await connectDB();

    const shopManifest = await ShopManifest.findOne({ shopId: shopId });

    if (!shopManifest) {
        throw new Error("No Shop Manifest found");
    }

    return shopManifest;
}