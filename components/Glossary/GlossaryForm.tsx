"use client";
import { Box, Container, Flex } from '@radix-ui/themes';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from '@radix-ui/react-select';
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createGlossary } from '@/app/utils/actions/glossary/createGlossary';
import { updateGlossary } from '@/app/utils/actions/glossary/updateGlossary';
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

const GlossaryForm = ({ glossary = {} }) => {
    const router = useRouter()
    const FormSchema = z.object({
        term: z.string({ required_error: "Term is required." }),
        definition: z.string({ required_error: "Definition is required." }),
        examples: z.string(),
    })
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: glossary || {},
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {

        try {

            console.log("DATA", data)
            let response;
            if (glossary._id) {
                console.log("UPDATE GLOSSARY", glossary)

                response = await updateGlossary(glossary._id, data);
            } else {
                console.log("CREATE GLOSSARY")
                response = await createGlossary(data);
                console.log("RESPONSE", response)
            }

            if (response.success) {
                router.push(`/glossary/${response.results._id}`)
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
                    <h2 className="text-2xl font-bold tracking-tight">{glossary._id ? 'Edit' : 'Add'} glossary</h2>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <Flex direction="column">
                                <FormField
                                    control={form.control}
                                    name="term"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Term</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Term"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="definition"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Definition</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Definition"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="examples"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Examples</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Example 1, Example 2, Example 3"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </Flex>

                            <Flex direction="row" className="justify-end space-x-4">
                                {glossary._id ? (
                                    <Link href={`/glossary/${glossary._id}`}>
                                        <Button variant="outline">
                                            Cancel
                                        </Button>
                                    </Link>
                                ) : (
                                    <Link href={`/glossary/`}>
                                        <Button variant="outline" >
                                            Cancel
                                        </Button>
                                    </Link>
                                )}

                                <Button type="submit">
                                    {glossary._id ? 'Update' : 'Add'}
                                </Button>
                            </Flex>
                        </form>
                    </Form>
                </Flex>
            </Box>
        </Container>
    );
};

export default GlossaryForm;