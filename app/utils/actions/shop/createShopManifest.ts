"use server";
import { connectDB } from "@/utils/db/mongoose/connect";
import ShopManifest from "@/utils/db/mongoose/models/shopManifest";

export async function createShopManifest(shopManifestDetails) {

    try {
        await connectDB();

        // check to see if manifest already exists
        const manifestCheck = await ShopManifest.find({ shopId: shopManifestDetails.shopId });
        if (manifestCheck.length > 0) {
            return { success: false, message: "Shop Manifest already exists" };
        }

        const shopManifest = new ShopManifest(shopManifestDetails);
        console.log("shopManifest: ", shopManifestDetails);
        await shopManifest.save();
        return { success: true, results: JSON.parse(JSON.stringify(shopManifest)) }
    } catch (err) {
        console.log("ERROR:", err)
    }

}