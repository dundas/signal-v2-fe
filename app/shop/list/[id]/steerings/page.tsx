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
import { Button } from "@/components/ui/button";
import { getShopDetails } from "@/app/utils/actions/shop/getShopDetails";
import Link from "next/link";
const SteeringListPage = async ({ params }) => {
  console.log("PARAMS", params)

  const { shopId } = params;


  await connectDB()
  try {
    let shopDetails = await getShopDetails(id)
    console.log("SHOP DETAILS", shopDetails)

    const steeringList = await listSteerings(id)
    console.log("STEERING LIST", steeringList)
  } catch (err) {
    console.log("ERROR", err)
  }


  return (
    <Table>
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Shop Name</TableHead>
          <TableHead>Manifest</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {steeringList.map((shop) => (
          <TableRow key={shop.shop._id}>
            <TableCell className="font-medium">{shop.shop.shop}</TableCell>
            <TableCell>
              Hello
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SteeringListPage;