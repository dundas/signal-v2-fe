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
import DeleteSteeringModal from "@/components/Steering/DeleteSteeringModal";
const SteeringListPage = async ({ params }) => {
  console.log("PARAMS", params)
  await connectDB()

  const steeringList = await listSteerings()
  console.log("STEERING LIST", steeringList)
  const steeringResults = JSON.parse(JSON.stringify(steeringList.result))

  return (
    <Table>
      <TableCaption>Steering List</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Steering ID</TableHead>
          <TableHead>Steering Details</TableHead>
          <TableHead></TableHead>
          <TableHead><Link href={`/steering/create`}><Button>New</Button></Link></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {steeringResults.length > 0 ? steeringResults.map((steering) => (
          <TableRow key={steering._id}>
            <TableCell className="font-medium">{steering.description}</TableCell>
            <TableCell>
              <Link href={`/steering/${steering._id}`}>
                <Button>
                  View Details
                </Button>

              </Link>
            </TableCell>
            <TableCell>
              <DeleteSteeringModal steering={steering} />
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