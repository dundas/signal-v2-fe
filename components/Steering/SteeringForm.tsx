"use client";
import { Box, Container, Flex } from '@radix-ui/themes';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from '@radix-ui/react-select';
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createSteering } from '@/app/utils/actions/steering/createSteering';
import { updateSteering } from '@/app/utils/actions/steering/updateSteering';
import { useRouter } from 'next/navigation';
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import Link from 'next/link';

const SteeringForm = ({ shop = {}, steering = {} }) => {
    const router = useRouter()
    const FormSchema = z.object({
        exampleMessage: z.string({ required_error: "Example message is required." }),
        referenceMessageId: z.string(),
        description: z.string({ required_error: "Steering description is required." }),
        incorrectQuery: z.string({ required_error: "SQL query is required." }),
        correctQuery: z.string({ required_error: "SQL query is required." })
    })
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: steering || {},
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {

        try {

            console.log("DATA", data)
            let response;
            if (steering._id) {
                console.log("UPDATE STEERING", steering)

                response = await updateSteering(steering._id, data);
            } else {
                console.log("CREATE STEERING")
                response = await createSteering(data);
                console.log("RESPONSE", response)
            }

            if (response.success) {
                router.push(`/steering/${response.results._id}`)
            } else {
                // display error message
            }
        } catch (err) {
            console.log("ERROR:", err)
        }

    }

    return (
        <Container className={'px-8'}>
            <Box className={'px-8'}>
                <Flex direction="column" gap="4">
                    <h2 className="text-2xl font-bold tracking-tight">{steering._id ? 'Edit' : 'Add'} steering feedback</h2>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <Flex direction="column">
                                <FormField
                                    control={form.control}
                                    name="incorrectQuery"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Incorrect Query</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="SELECT COUNT(order_id) as total_orders FROM data_store.orders_final WHERE shop_name = 'shop_name'"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="correctQuery"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Correct Query</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="SELECT COUNT(order_id) as total_orders FROM data_store.orders_final WHERE shop_name = 'shop_name' AND order_date = '2021-07-01"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="exampleMessage"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Example user message</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="'Show me yesterday's CAC'"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="referenceMessageId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Message Id of incorrect message</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="ex: 6209bd3a59a4b605ee40fd0e"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Summarization of Fix</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="'When a user asks for CAC the query should to include the date of the order.'"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </Flex>

                            <Flex direction="row" className="justify-end space-x-4">


                                {steering._id ? (
                                    <Link href={`/steering/${steering._id}`}>
                                        <Button variant="outline">
                                            Cancel
                                        </Button>
                                    </Link>
                                ) : (
                                    <Link href={`/steering/`}>
                                        <Button variant="outline" >
                                            Cancel
                                        </Button>
                                    </Link>
                                )}



                                <Button type="submit">
                                    {steering._id ? 'Update' : 'Add'}
                                </Button>
                            </Flex>
                        </form>
                    </Form>
                </Flex>
            </Box>
        </Container>
    );
};

export default SteeringForm;