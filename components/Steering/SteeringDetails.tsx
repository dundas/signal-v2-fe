"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Container, Box, Flex } from '@radix-ui/themes'
import Link from "next/link"
import DeleteSteeringModal from "./DeleteSteeringModal"

export default function SteeringDetails({ steering }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle><Link href={`/steering`}>Steerings </Link> &raquo; Steering Details</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="necessary" className="flex flex-col space-y-1">
                        <span>Steering Description:</span>
                        <span className="font-normal leading-snug text-muted-foreground">
                            {steering.description}
                        </span>
                    </Label>

                </div>
                <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="necessary" className="flex flex-col space-y-1">
                        <span>User Message:</span>
                        <span className="font-normal leading-snug text-muted-foreground">
                            {steering.exampleMessage}
                        </span>
                    </Label>

                </div>
                <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="functional" className="flex flex-col space-y-1">
                        <span>Incorrect Query:</span>
                        <span className="font-normal leading-snug text-muted-foreground">
                            {steering.incorrectQuery}
                        </span>
                    </Label>

                </div>
                <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="performance" className="flex flex-col space-y-1">
                        <span>Correct Query:</span>
                        <span className="font-normal leading-snug text-muted-foreground">
                            {steering.correctQuery}
                        </span>
                    </Label>
                </div>
            </CardContent>
            <CardFooter>
                <Flex direction="row" className="justify-end space-x-4">
                    <Link href={`/steering/${steering._id}/edit`}>
                        <Button variant="outline" className="w-full">
                            Edit Steering
                        </Button>
                    </Link>
                    {steering._id && <DeleteSteeringModal steering={steering} />}
                </Flex>
            </CardFooter>
        </Card>
    )
}