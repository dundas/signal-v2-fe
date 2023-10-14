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
import DeleteGlossaryModal from "./DeleteGlossaryModal"

export default function GlossaryDetails({ glossary }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle><Link href={`/glossary`}>Glossaries </Link> &raquo; Glossary Details</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="term" className="flex flex-col space-y-1">
                        <span>Term:</span>
                        <span className="font-normal leading-snug text-muted-foreground">
                            {glossary.term}
                        </span>
                    </Label>
                </div>
                <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="definition" className="flex flex-col space-y-1">
                        <span>Definition:</span>
                        <span className="font-normal leading-snug text-muted-foreground">
                            {glossary.definition}
                        </span>
                    </Label>
                </div>
                <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="examples" className="flex flex-col space-y-1">
                        <span>Examples:</span>
                        <span className="font-normal leading-snug text-muted-foreground">
                            {glossary.examples.join(', ')}
                        </span>
                    </Label>
                </div>
            </CardContent>
            <CardFooter>
                <Flex direction="row" className="justify-end space-x-4">
                    <Link href={`/glossary/${glossary._id}/edit`}>
                        <Button variant="outline" className="w-full">
                            Edit Glossary
                        </Button>
                    </Link>
                    {glossary._id && <DeleteGlossaryModal glossary={glossary} />}
                </Flex>
            </CardFooter>
        </Card>
    )
}