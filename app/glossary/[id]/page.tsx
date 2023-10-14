"use server";
import { connectDB } from "@/app/utils/db/mongoose/connect";
import Glossary from "@/app/utils/db/mongoose/models/glossary";
import Link from "next/link";
import GlossaryDetails from "@/components/Glossary/GlossaryDetails";
import { getGlossaryDetails } from "@/app/utils/actions/glossary/getGlossaryDetails";

const GlossaryDetailsPage = async ({ params }) => {
    console.log("PARAMS", params)
    await connectDB()

    const { id } = params
    let glossaryDetails = {}
    if (id) {
        // get glossary details
        glossaryDetails = await getGlossaryDetails(id)
        console.log("GLOSSARY DETAILS", glossaryDetails)    
    } else {
        return null
    }

    return (
        <GlossaryDetails glossary={glossaryDetails.result} />
    );
};

export default GlossaryDetailsPage;