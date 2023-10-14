"use server";
import { connectDB } from "@/app/utils/db/mongoose/connect";
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
import { Button } from "@/components/ui/button";
import Link from "next/link"; 
import DeleteRuleModal from "@/components/Rule/DeleteRuleModal";
import { Flex, Container, Box } from "@radix-ui/themes";

const RuleListPage = async ({ params }) => {
  console.log("PARAMS", params)
  await connectDB()

  const ruleList = await listRules()
  console.log("RULE LIST", ruleList)
  const ruleResults = JSON.parse(JSON.stringify(ruleList.result))

  return (
    <Container className={'px-8'}>

      <Box className={'px-8'}>
        <Flex direction="row" justify="between" align="center" gap="4">
          <h2 className="text-2xl font-bold">Rule List</h2>
          <Link href={`/rule/create`}><Button>New</Button></Link>
        </Flex>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ruleResults.length > 0 ? ruleResults.map((rule) => (
              <TableRow key={rule._id}>
                <TableCell className="font-medium">{rule.description}</TableCell>
                <TableCell>
                  <Link href={`/rule/${rule._id}`}>
                    <Button>
                      View Details
                    </Button>
                  </Link>
                </TableCell>
                <TableCell>
                  <DeleteRuleModal rule={rule} />
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={3}>No rules found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
};

export default RuleListPage;