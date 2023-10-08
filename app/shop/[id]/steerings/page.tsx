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
import SteeringModal from "@/components/Steering/SteeringModal";

const SteeringListPage = async ({ params }) => {
  console.log("PARAMS", params)

  const { id } = params;

  await connectDB()

  let shopDetails = await getShopDetails(id)
  console.log("SHOP DETAILS", shopDetails)

  const steeringList = await listSteerings(id)
  console.log("STEERING LIST", steeringList)

  return (
    <Table>
      <TableCaption>Steering List</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Steering ID</TableHead>
          <TableHead>Steering Details</TableHead>
          <TableHead><SteeringModal shop={shopDetails}  /></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {steeringList.length > 0 ? steeringList.map((steering) => (
          <TableRow key={steering._id}>
            <TableCell className="font-medium">{steering._id}</TableCell>
            <TableCell>
              <Link href={`/steering/${steering._id}`}>
                <a>View Details</a>
              </Link>
            </TableCell>
          </TableRow>
        )) : (
          <TableRow>
            <TableCell colSpan={2}>No steerings found</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default SteeringListPage;