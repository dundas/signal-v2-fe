"use client"
import React from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {  Input  } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from '@radix-ui/react-select';
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createSteering  } from '@/app/utils/actions/steering/createSteering';
import { updateSteering } from '@/app/utils/actions/steering/updateSteering';
import { useRouter } from 'next/router';
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const SteeringModal = ({ shop, steering }) => {
  const router = useRouter()
  const FormSchema = z.object({
    exampleMessage: z.string({ required_error: "Example message is required." }),
    referenceMessageId: z.string(),
    userDescription: z.string({ required_error: "User description is required." }) ,
    incorrectQuery: z.string({ required_error: "Incorrect query is required." }),
    correctQuery: z.string({ required_error: "Correct query is required." }),
    status: z.enum(['active', 'inactive']).default('active'),
    embedding: z.array(z.number()).optional(),
    summary: z.string().optional(),
  })
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: steering || {},
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    let response;
    if (steering) {
      response = await updateSteering(steering._id, data);
    } else {
      response = await createSteering({ shopId: shop._id, ...data });
    }

    if (response.success) {
      router.push(`/steering/${response.results._id}`)
    } else {
      // display error message
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="Button violet">{steering ? 'Edit' : 'Add'}</Button>
      </DialogTrigger>
      <DialogContent className="DialogContent">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <DialogHeader>
              <DialogTitle>{steering ? 'Edit' : 'Add'} Steering for {shop.domain}</DialogTitle>
            </DialogHeader>
            <FormField
              control={form.control}
              name="exampleMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Example Message</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter example message"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Add other fields here */}
            <DialogFooter>
              <Button type="submit">
                {steering ? 'Update' : 'Add'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SteeringModal;