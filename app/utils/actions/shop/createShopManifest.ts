import { connectDB } from "@/utils/db/mongoose/connect";
import ShopManifest from "@/utils/db/mongoose/models/ShopManifest";

export async function createShopManifest(shopManifestDetails) {
    await connectDB();

    const shopManifest = new ShopManifest(shopManifestDetails);

    await shopManifest.save();

    return shopManifest;
}