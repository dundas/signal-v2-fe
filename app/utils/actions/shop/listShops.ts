import { connectDB } from "@/utils/db/mongoose/connect";
import Shop from "@/utils/db/mongoose/models/shop";
import { listCollections } from "../../db/mongoose/listCollections";

export async function listShops() {
    await connectDB();

    const shops = await Shop.find();
    console.log("SHOPS: ", shops);
    await listCollections();

    if (!shops) {
        throw new Error("No active shops found");
    }

    return shops;
}