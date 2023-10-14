"use server";
import { connectDB } from "@/app/utils/db/mongoose/connect"; 
import GlossaryForm from "@/components/Glossary/GlossaryForm";

const GlossaryCreatePage = async ({ params }) => {
  console.log("PARAMS", params)
  await connectDB()

  const { id } = params
  let glossaryDetails = {}
  if (id) {
    // get glossary details
  }

  return (
    <GlossaryForm glossary={glossaryDetails} />
  );
};

export default GlossaryCreatePage;