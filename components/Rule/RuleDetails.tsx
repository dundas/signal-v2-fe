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
import DeleteRuleModal from "./DeleteRuleModal"

export default function RuleDetails({ rule }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle><Link href={`/rule`}>Rules </Link> &raquo; Rule Details</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="necessary" className="flex flex-col space-y-1">
                        <span>Rule Name:</span>
                        <span className="font-normal leading-snug text-muted-foreground">
                            {rule.name}
                        </span>
                    </Label>
                </div>
                <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="necessary" className="flex flex-col space-y-1">
                        <span>Description:</span>
                        <span className="font-normal leading-snug text-muted-foreground">
                            {rule.description}
                        </span>
                    </Label>
                </div>
                <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="performance" className="flex flex-col space-y-1">
                        <span>Correct Query:</span>
                        <span className="font-normal leading-snug text-muted-foreground">
                            {rule.correctQuery}
                        </span>
                    </Label>
                </div>
            </CardContent>
            <CardFooter>
                <Flex direction="row" className="justify-end space-x-4">
                    <Link href={`/rule/${rule._id}/edit`}>
                        <Button variant="outline" className="w-full">
                            Edit Rule
                        </Button>
                    </Link>
                    {rule._id && <DeleteRuleModal rule={rule} />}
                </Flex>
            </CardFooter>
        </Card>
    )
}