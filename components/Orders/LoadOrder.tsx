"use client";
import { Metadata } from "next";
import Image from "next/image";
import { CounterClockwiseClockIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Flex, Container, Box } from "@radix-ui/themes";
import { useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { udpateShopManifest } from "@/app/utils/actions/shop/updateShopManifest";
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
import Link from "next/link";
import { Input } from "../ui/input";
import { importOrderByOrderId } from "@/app/utils/actions/orders/importOrderByOrderId";
import OrderDetailsTable from "./OrderDetailsTable";

export const metadata: Metadata = {
  title: "Load Orders",
  description: "Load an order for a shop.",
};

function LoadOrder({ shopDetails }) {
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [orderDetails, setOrderDetails] = useState({});
  const [shop, setShop] = useState(shopDetails);
  const { toast } = useToast();
  const FormSchema = z.object({
    orderId: z.string(),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    try {
      const orderResult = await importOrderByOrderId({
        orderId: data.orderId,
        shop: shop.shop,
      });
      console.log("ORDER RESULT", orderResult);
      setOrderDetails(orderResult?.data.result);
    } catch (error) {
      console.error("Error updating manifest:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <Button>Try again</Button>,
      });
    }

    setIsLoading(false);
  }

  return (
    <>
      <Container>
        
        <Tabs defaultValue="complete" className="flex-1">
          <Flex className="w-full" grow={"1"}>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                <TabsContent value="complete" className="mt-0 border-0 p-0">
                  <Flex
                    className="w-full m-8"
                    grow={"1"}
                    direction={"row"}
                    gap={"4"}
                  >
                    <Flex>
                      <FormField
                        control={form.control}
                        name="orderId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Order Id</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Add the order id to check."
                                className="w-full"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </Flex>
                    <Flex className="pt-8 ml-8">
                      <Button type="submit">Submit</Button>
                    </Flex>
                  </Flex>
                </TabsContent>
              </form>
            </Form>
          </Flex>
        </Tabs>
        {orderDetails?.orderId && (
          <OrderDetailsTable orderDetails={orderDetails} />
        )}
      </Container>
    </>
  );
}
export default LoadOrder;
