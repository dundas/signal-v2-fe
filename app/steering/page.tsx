"use server";
import { connectDB } from "@/app/utils/db/mongoose/connect";
import Shop from "@/app/utils/db/mongoose/models/shop";
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
import { Flex, Container, Box } from "@radix-ui/themes";

const SteeringListPage = async ({ params }) => {
  console.log("PARAMS", params)
  await connectDB()

  const steeringList = await listSteerings()
  console.log("STEERING LIST", steeringList)
  const steeringResults = JSON.parse(JSON.stringify(steeringList.result))

  return (
    <Container className={'px-8'}>

      <Box className={'px-8'}>
        <Flex direction="row" justify="between" align="center" gap="4">
          <h2 className="text-2xl font-bold">Steering List</h2>
          <Link href={`/steering/create`}><Button>New</Button></Link>
        </Flex>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead></TableHead>
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
                <TableCell colSpan={3}>No steerings found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
};

export default SteeringListPage;