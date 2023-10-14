"use server";
import { connectDB } from "@/app/utils/db/mongoose/connect";
import { listGlossaries } from "@/app/utils/actions/glossary/listGlossaries";
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
import DeleteGlossaryModal from "@/components/Glossary/DeleteGlossaryModal";
import { Flex, Container, Box } from "@radix-ui/themes";

const GlossaryListPage = async ({ params }) => {
  console.log("PARAMS", params)
  await connectDB()

  const glossaryList = await listGlossaries()
  console.log("GLOSSARY LIST", glossaryList)
  const glossaryResults = JSON.parse(JSON.stringify(glossaryList.result))

  return (
    <Container className={'px-8'}>

      <Box className={'px-8'}>
        <Flex direction="row" justify="between" align="center" gap="4">
          <h2 className="text-2xl font-bold">Glossary</h2>
          <Link href={`/glossary/create`}><Button>New</Button></Link>
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
            {glossaryResults.length > 0 ? glossaryResults.map((glossary) => (
              <TableRow key={glossary._id}>
                <TableCell className="font-medium">{glossary.term}</TableCell>
                <TableCell>
                  <Link href={`/glossary/${glossary._id}`}>
                    <Button>
                      View Details
                    </Button>
                  </Link>
                </TableCell>
                <TableCell>
                  <DeleteGlossaryModal glossary={glossary} />
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={3}>No glossaries found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
};

export default GlossaryListPage;