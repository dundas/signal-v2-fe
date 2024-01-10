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
import LoadOrderBatch from "@/components/Orders/LoadOrderBatch";
import { Box, Separator, Container } from "@radix-ui/themes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  return (
    <>
      <Box className="ml-8 mt-4">
        <h2 className="text-lg font-semibold">
          Load Orders for {shopDetails.shop}
        </h2>
      </Box>
      <Separator />
      <Container>
        <Tabs defaultValue="single" className="w-[1000px]">
          <TabsList>
            <TabsTrigger value="single">Single</TabsTrigger>
            <TabsTrigger value="batch">Batch</TabsTrigger>
          </TabsList>
          <TabsContent value="single">
            <LoadOrder shopDetails={shopDetails} />
          </TabsContent>
          <TabsContent value="batch" className="">
            {" "}
            <LoadOrderBatch shopDetails={shopDetails} />
          </TabsContent>
        </Tabs>
      </Container>
    </>
  );
};

export default BrowseOrders;
