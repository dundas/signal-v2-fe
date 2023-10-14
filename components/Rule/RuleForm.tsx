"use client";
import { Box, Container, Flex } from '@radix-ui/themes';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from '@radix-ui/react-select';
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createRule } from '@/app/utils/actions/rule/createRule';
import { updateRule } from '@/app/utils/actions/rule/updateRule';
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

const RuleForm = ({ rule = {} }) => {
    const router = useRouter()
    const FormSchema = z.object({
        name: z.string({ required_error: "Rule name is required." }),
        description: z.string({ required_error: "Description is required." }),
        correctQuery: z.string({ required_error: "Correct query is required." }),
    })
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: rule || {},
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {

        try {

            console.log("DATA", data)
            let response;
            if (rule._id) {
                console.log("UPDATE RULE", rule)

                response = await updateRule(rule._id, data);
            } else {
                console.log("CREATE RULE")
                response = await createRule(data);
                console.log("RESPONSE", response)
            }

            if (response.success) {
                router.push(`/rule/${response.results._id}`)
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
                    <h2 className="text-2xl font-bold tracking-tight">{rule._id ? 'Edit' : 'Add'} rule</h2>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <Flex direction="column">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Rule Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Rule Name"
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
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Description"
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
                            </Flex>

                            <Flex direction="row" className="justify-end space-x-4">
                                {rule._id ? (
                                    <Link href={`/rule/${rule._id}`}>
                                        <Button variant="outline">
                                            Cancel
                                        </Button>
                                    </Link>
                                ) : (
                                    <Link href={`/rule/`}>
                                        <Button variant="outline" >
                                            Cancel
                                        </Button>
                                    </Link>
                                )}

                                <Button type="submit">
                                    {rule._id ? 'Update' : 'Add'}
                                </Button>
                            </Flex>
                        </form>
                    </Form>
                </Flex>
            </Box>
        </Container>
    );
};

export default RuleForm;