"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteGlossary } from "@/app/utils/actions/glossary/deleteGlossary";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

const DeleteGlossaryModal = ({ glossary }) => {
  const { toast } = useToast();
  const router = useRouter()

  const handleDelete = async () => {
    try {
      console.log("GLOSSARY", glossary)
       
      const result = await deleteGlossary(glossary._id);
      console.log("DELETE RESULT", result)

      if (result.success) {
        // redirect user to glossary list page
        //router.push(`/glossary/`)
        router.refresh();
        toast({
          title: "Success",
          description: "Glossary deleted successfully.",
        });

      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: result.message,
        });
      }
    } catch (error) {
      console.error("Error deleting glossary:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger><Button> Delete</Button></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the glossary.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} >
              Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteGlossaryModal;