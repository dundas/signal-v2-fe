"use server";
import { connectDB } from "@/app/utils/db/mongoose/connect";
import Shop from "@/app/utils/db/mongoose/models/shop";
import { listRules } from "@/app/utils/actions/rule/listRules";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import LoadOrder from "@/components/Orders/LoadOrder";
const BrowseOrders = async ({ params }) => {
  console.log("PARAMS", params);
  await connectDB();

  let shopDetails = await Shop.findOne({ _id: params.id });
  if (!shopDetails) {
    return {
      notFound: true,
    };
  }
  shopDetails = JSON.parse(JSON.stringify(shopDetails));
  const { id } = params;
  let ruleDetails = {};
  if (id) {
    // get rule details
  }

  return <LoadOrder shopDetails={shopDetails} />;
};

export default BrowseOrders;
