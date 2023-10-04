import { connectDB } from "@/utils/db/mongoose/connect";
import ShopManifest from "@/utils/db/mongoose/models/ShopManifest";

export async function readShopManifest(manifestId) {
    await connectDB();

    const shopManifest = await ShopManifest.findById(manifestId);

    if (!shopManifest) {
        throw new Error("No Shop Manifest found");
    }

    return shopManifest;
}