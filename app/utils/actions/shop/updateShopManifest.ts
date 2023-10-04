"use client";
import { connectDB } from "@/utils/db/mongoose/connect";
import ShopManifest from "@/utils/db/mongoose/models/ShopManifest";

export async function updateShopManifest(shopId, updatedDetails) {
    await connectDB();

    const shopManifest = await ShopManifest.findOneAndUpdate(
        { shopId: shopId },
        updatedDetails,
        { new: true }
    );

    if (!shopManifest) {
        throw new Error("No Shop Manifest found");
    }

    return shopManifest;
}