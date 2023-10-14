"use server";
import { connectDB } from "@/app/utils/db/mongoose/connect";
import Shop from "@/app/utils/db/mongoose/models/shop";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from "next/link";
import RuleDetails from "@/components/Rule/RuleDetails";
import { getRuleDetails } from "@/app/utils/actions/rule/getRuleDetails";

const RuleDetailsPage = async ({ params }) => {
    console.log("PARAMS", params)
    await connectDB()

    const { id } = params
    let ruleDetails = {}
    if (id) {
        // get rule details
        ruleDetails = await getRuleDetails(id)
        console.log("RULE DETAILS", ruleDetails)    
    } else {
        return null
    }

    return (
        <RuleDetails rule={ruleDetails.result} />
    );
};

export default RuleDetailsPage;