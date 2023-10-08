"use server";
import { connectDB } from "@/utils/db/mongoose/connect";
import Shop from "@/utils/db/mongoose/models/shop";
import ShopManifest from "@/utils/db/mongoose/models/shopManifest";
import { listCollections } from "../../db/mongoose/listCollections";

export async function listShops() {
    await connectDB();

    const shops = await Shop.find();
    console.log("SHOPS: ", shops);

    if (!shops) {
        throw new Error("No active shops found");
    }

    // get shop ids 
    const shopIds = shops.map(shop => shop._id);

    // get shop manifests
    const shopManifests = await ShopManifest.find({ shopId: { $in: shopIds } });

    // match shop manifests to shops return stringified object
    const result = JSON.parse(JSON.stringify(
        shops.map(shop => {
            const shopManifest = shopManifests.find(shopManifest => shopManifest.shopId === String(shop._id));
            return {
                shop: shop.toObject(),
                shopManifest: shopManifest ? shopManifest.toObject() : null
            }
        })
    ));

    console.log("RESULT: ", result);

    return result;
}