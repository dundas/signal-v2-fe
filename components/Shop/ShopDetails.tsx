"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Flex } from '@radix-ui/themes';
import Link from "next/link";

const ShopDetails = ({ shop }) => {
    return (
        <div className="p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Shop Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-start space-x-4">
                        <Label htmlFor="shop" className="flex flex-col">
                            <span className="text-sm font-medium text-gray-500">Shop:</span>
                            <span className="text-lg font-semibold">{shop.shop}</span>
                        </Label>
                    </div>
                    <div className="flex items-start space-x-4">
                        <Label htmlFor="domain" className="flex flex-col">
                            <span className="text-sm font-medium text-gray-500">Domain:</span>
                            <span className="text-lg font-semibold">{shop.domain}</span>
                        </Label>
                    </div>
                    {shop.description && (
                        <div className="flex items-start space-x-4">
                            <Label htmlFor="description" className="flex flex-col">
                                <span className="text-sm font-medium text-gray-500">Description:</span>
                                <span className="text-lg font-semibold">{shop.description}</span>
                            </Label>
                        </div>
                    )}
                    {shop.bigQueryName && (
                        <div className="flex items-start space-x-4">
                            <Label htmlFor="bigQueryName" className="flex flex-col">
                                <span className="text-sm font-medium text-gray-500">Big Query Id:</span>
                                <span className="text-lg font-semibold">{shop.bigQueryName}</span>
                            </Label>
                        </div>
                    )}
                    {/* Repeat the above pattern for other fields */}
                </CardContent>
                <CardFooter>
                    <Flex direction="row" className="justify-end space-x-4">
                        <Link href={`/shop/${shop._id}/edit`}>
                            <Button variant="outline" className="w-full">
                                Edit
                            </Button>
                        </Link>
                    </Flex>
                </CardFooter>
            </Card>
        </div>
    );
};

export default ShopDetails;