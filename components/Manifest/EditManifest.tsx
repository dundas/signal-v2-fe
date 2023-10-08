"use client";
import { Metadata } from "next"
import Image from "next/image"
import { CounterClockwiseClockIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

import { useState } from "react"
import { ToastAction } from "@/components/ui/toast"
import { udpateShopManifest } from "@/app/utils/actions/shop/updateShopManifest";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useRouter } from 'next/navigation';

export const metadata: Metadata = {
  title: "Manifest Editor",
  description: "Edit a shop's manifest.",
}

export default function EditManifest({ manifest, shop }) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const FormSchema = z.object({
    content: z
      .string()
      .min(10, {
        message: "Manifest must be at least 10 characters.",
      }),
  })
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true)

    try {
      const result = await udpateShopManifest(manifest._id, { content: data.content })

      if (result.success) {
        toast({
          title: "Success",
          description: "Manifest updated successfully.",
        })
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <Button>Try again</Button>,
        })
      }
    } catch (error) {
      console.error("Error updating manifest:", error)
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <Button>Try again</Button>,
      })
    }

    setIsLoading(false)
  }

  return (
    <>
      <div className="hidden h-full flex-col md:flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">
            Edit Manifest for {shop.domain}
          </h2>
        </div>
        <Separator />
        <Tabs defaultValue="complete" className="flex-1">
          <div className="container h-full py-6">
            <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
              <div className="md:order-1">

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                    <TabsContent value="complete" className="mt-0 border-0 p-0">
                      <div className="flex h-full flex-col space-y-4">
                        <FormField
                          control={form.control}
                          name="content"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Manifest Details</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Write a tagline for an ice cream shop"
                                  className="min-h-[300px] flex-1 p-4 md:min-h-[500px] lg:min-h-[500px]"
                                  defaultValue={manifest.content} // Set default value to manifest.content
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex items-center space-x-2">
                          <Button>Submit</Button>
                        </div>
                      </div>
                    </TabsContent>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </>
  )
}