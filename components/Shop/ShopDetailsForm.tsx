"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { updateShopDetails } from "@/app/utils/actions/shop/updateShopDetails";
import { useRouter } from "next/navigation";

const ShopDetailsForm = ({ shop }) => {
    const router = useRouter();
    const FormSchema = z.object({
        description: z.string(),
        bigQueryName: z.string(),
        companyName: z.string(),
    });
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: shop,
    });

    const handleSave = async (data) => {
        try {
            const updateResult = await updateShopDetails(shop._id, data);

            if (updateResult.success) {
                console.log("UPDATE RESULT", updateResult)
                router.push(`/shop/${updateResult.results._id}`)
            }
        } catch (error) {
            console.error("Error updating shop details:", error);
        }
    };

    return (
        <div className="px-8">
            <h2 className="text-2xl font-bold tracking-tight">Editing details for {shop.shop}</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter company name" {...field} />
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
                                    <Textarea placeholder="Enter description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="bigQueryName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>BigQuery Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter BigQuery name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end space-x-4">
                        <Button variant="outline" onClick={() => window.history.back()}>
                            Cancel
                        </Button>
                        <Button type="submit">Save</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default ShopDetailsForm;