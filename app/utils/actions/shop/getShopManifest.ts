"use server";
import { connectDB } from "@/utils/db/mongoose/connect";
import ShopManifest from "@/utils/db/mongoose/models/shopManifest";
import Shop from "@/utils/db/mongoose/models/Shop"; // Assuming you have a Shop model

export async function getShopManifest(shopId) {
    await connectDB();

    const shopManifest = await ShopManifest.findOne({ shopId: shopId });
    const shop = await Shop.findOne({ _id: shopId }); // Fetch shop details

    if (!shopManifest) {
        throw new Error("No Shop Manifest found");
    }

    if (!shop) {
        throw new Error("No Shop found");
    }

    // Combine shopManifest and shop into one object and stringify it
    const result = JSON.parse(JSON.stringify({
        shopManifest: shopManifest.toObject(),
        shop: shop.toObject()
    }));

    return result;
}