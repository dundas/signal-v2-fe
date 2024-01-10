"use client";
"use client";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Flex, Container, Box } from "@radix-ui/themes";
import { use, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { importOrderByOrderId } from "@/app/utils/actions/orders/importOrderByOrderId";
import OrderDetailsTable from "./OrderDetailsTable";
import { formatDelimitedString } from "@/app/utils/system/formatDelimitedString";
import { createBatchOrderQueue } from "@/app/utils/actions/orderQueue/createBatchOrderQueue";
import { getOrderQueue } from "@/app/utils/actions/orderQueue/getOrderQueue";
import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "Load Orders",
  description: "Load an order for a shop.",
};

function LoadOrderBatch({ shopDetails }) {
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [orderDetails, setOrderDetails] = useState({});
  const [shop, setShop] = useState(shopDetails);
  const [pendingOrderQueue, setPendingOrderQueue] = useState([]);
  const [pendingQueueCount, setPendingQueueCount] = useState(0);
  const { toast } = useToast();
  const FormSchema = z.object({
    orderIds: z.string(),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    getOrderQueueCount();
  }, [shopDetails]);

  async function getOrderQueueCount() {
    try {
      const orderQueue = await getOrderQueue({
        shop: shop.shop,
        status: "pending",
      });
      setPendingOrderQueue(orderQueue);
      setPendingQueueCount(orderQueue.length);
    } catch (error) {
      console.error("Error getting order queue count:", error);
    }
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true);

      console.log("DATA", data.orderIds);
      const orderIdArray = await formatDelimitedString(data.orderIds);
      console.log("ORDER ID ARRAY", orderIdArray);
      const orderResult = await createBatchOrderQueue(shop.shop, orderIdArray);
      console.log("ORDER RESULT", orderResult);
      await getOrderQueueCount();

      setIsLoading(false);

      // Reset the form after successful submission
      form.reset({ orderIds: "" });
    } catch (error) {
      console.error("Error submitting order batch:", error);
    }
  }

  return (
    <>
      <Container>
        <Flex className="w-full" grow={"1"} direction={"row"}>
          <Box className="mt" grow={"1"}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <Flex grow={"1"} direction={"column"} gap={"4"}>
                  <Flex grow={"1"} direction={"column"}>
                    <FormField
                      control={form.control}
                      name="orderIds"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Order List</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Add list of order ids. One per line."
                              className="w-full min-h-[300px] mt-4"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </Flex>
                  <Flex className="mt-4">
                    <Button type="submit">Submit</Button>
                  </Flex>
                </Flex>
              </form>
            </Form>
          </Box>
          <Box className="w-m-[600px] ml-8" grow={"1"}>
            <Flex direction={"column"}>
              Pending Orders: {pendingQueueCount}
            </Flex>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Order Id</TableHead>
                  <TableHead>Date Added</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingOrderQueue.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.orderId}</TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Flex>
      </Container>
    </>
  );
}

export default LoadOrderBatch;