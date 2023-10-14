"use server";
import { connectDB } from "@/app/utils/db/mongoose/connect";
import Rule from "@/app/utils/db/mongoose/models/rule";
import { getRuleDetails } from "@/app/utils/actions/rule/getRuleDetails";
import RuleForm from "@/components/Rule/RuleForm";

const RuleEditPage = async ({ params }) => {
  console.log("PARAMS", params)
  await connectDB()

  const { id } = params
  let ruleDetails = {}
  if (id) {
    // get rule details
    const ruleDetailsResponse = await getRuleDetails(id)
    if (ruleDetailsResponse.success) {
      ruleDetails = ruleDetailsResponse.result
    }
  }

  return (
    <RuleForm rule={ruleDetails} />
  );
};

export default RuleEditPage;