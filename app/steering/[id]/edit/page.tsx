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
import SteeringForm from "@/components/Steering/SteeringForm";
import { getSteeringDetails } from "@/app/utils/actions/steering/getSteeringDetails";
const SteeringListPage = async ({ params }) => {
  console.log("PARAMS", params)
  await connectDB()

  const { id } = params
  let steeringDetails = {}
  if (id) {
    // get steering details
    const steeringDetailsResponse = await getSteeringDetails(id)
    if (steeringDetailsResponse.success) {
      steeringDetails = steeringDetailsResponse.result
    }

  }

  return (
    <SteeringForm steering={steeringDetails} />
  );
};

export default SteeringListPage;