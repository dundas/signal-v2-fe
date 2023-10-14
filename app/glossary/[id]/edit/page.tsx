"use server";
import { connectDB } from "@/app/utils/db/mongoose/connect";
import Glossary from "@/app/utils/db/mongoose/models/glossary";
import { getGlossaryDetails } from "@/app/utils/actions/glossary/getGlossaryDetails";
import GlossaryForm from "@/components/Glossary/GlossaryForm";

const GlossaryEditPage = async ({ params }) => {
  console.log("PARAMS", params)
  await connectDB()

  const { id } = params
  let glossaryDetails = {}
  if (id) {
    // get glossary details
    const glossaryDetailsResponse = await getGlossaryDetails(id)
    if (glossaryDetailsResponse.success) {
      glossaryDetails = glossaryDetailsResponse.result
    }
  }

  return (
    <GlossaryForm glossary={glossaryDetails} />
  );
};

export default GlossaryEditPage;