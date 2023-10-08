"use server";
import { connectDB } from "@/utils/db/mongoose/connect";
import ShopManifest from "@/utils/db/mongoose/models/shopManifest";

export async function udpateShopManifest(manifestId, updatedDetails) {
    try {
        await connectDB();

        const shopManifest = await ShopManifest.findOneAndUpdate(
            { _id: manifestId },
            updatedDetails,
            { new: true }
        );

        if (!shopManifest) {
            return { success: false, message: "No Shop Manifest found" }
           
        }

        return { success: true, result: JSON.parse(JSON.stringify(shopManifest)) };
    } catch (err) {
        console.log("ERROR:", err)
        return { success: false, message: err.message }
    }

}