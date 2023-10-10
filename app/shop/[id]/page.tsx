"use server";
import { connectDB } from "@/app/utils/db/mongoose/connect";
import Shop from "@/app/utils/db/mongoose/models/Shop";
import { listSteerings } from "@/app/utils/actions/steering/listSteerings";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from "next/link";
import ShopDetails from "@/components/Shop/ShopDetails";
import { getShopDetails } from "@/app/utils/actions/shop/getShopDetails";
const ShopDetailsPage = async ({ params }) => {
    console.log("PARAMS", params)
    await connectDB()

    const { id } = params
    let shopDetails = {}
    if (id) {
        // get steering details
        shopDetails = await getShopDetails(id)
        if (!shopDetails.success) {
            return <div>Shop not found</div>
        }

    } else {
        return null
    }

    return (
        <ShopDetails shop={shopDetails.result} />
    );
};

export default ShopDetailsPage;