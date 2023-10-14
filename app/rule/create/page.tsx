"use server";
import { connectDB } from "@/app/utils/db/mongoose/connect";
import Shop from "@/app/utils/db/mongoose/models/Shop";
import { listRules } from "@/app/utils/actions/rule/listRules";
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
import RuleForm from "@/components/Rule/RuleForm";

const RuleListPage = async ({ params }) => {
  console.log("PARAMS", params)
  await connectDB()

  const { id } = params
  let ruleDetails = {}
  if (id) {
    // get rule details
  }

  return (
    <RuleForm rule={ruleDetails} />
  );
};

export default RuleListPage;