"use client";
import { connectDB } from "@/utils/db/mongoose/connect";
import ShopManifest from "@/utils/db/mongoose/models/shopManifest";

export async function archiveShopManifest(shopId) {
    await connectDB();

    const shopManifest = await ShopManifest.findOneAndUpdate(
        { shopId: shopId },
        { archived: true },
        { new: true }
    );

    if (!shopManifest) {
        throw new Error("No Shop Manifest found");
    }

    return shopManifest;
}