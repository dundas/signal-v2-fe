"use client"
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createShopManifest } from '@/app/utils/actions/shop/createShopManifest';
import { useRouter } from 'next/navigation';
import * as z from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const AddManifestModal = ({ shop }) => {
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
    // do something with the data 
    console.log("DATA:", data)
    console.log("SHOP DETAILS", shop)
    const response = await createShopManifest({ shopId: shop._id, content: data.content })
    console.log("RESPONSE", response)

    // example data respose {success: true, results: manifestDocument}, {success: false, error: "error message"}

    if (response.success === true) {
      // redirect to the manifest page
      router.push(`/manifest/${response.results._id}`)
    } {
      // display error message

    }




  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="Button violet">Add</Button>
      </DialogTrigger>
      <DialogContent className="DialogContent">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <DialogHeader>
              <DialogTitle>Add Manifest for {shop.domain}</DialogTitle>

            </DialogHeader>


            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manifest Details</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add the first command to the manifest."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" >
                Add
              </Button>
            </DialogFooter>
          </form>



        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddManifestModal;