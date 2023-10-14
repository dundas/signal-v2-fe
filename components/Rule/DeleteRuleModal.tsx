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
import { deleteRule } from "@/app/utils/actions/rule/deleteRule";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

const DeleteRuleModal = ({ rule }) => {
  const { toast } = useToast();
  const router = useRouter()

  const handleDelete = async () => {
    try {
      console.log("RULE", rule)
       
      const result = await deleteRule(rule._id);
      console.log("DELETE RESULT", result)

      if (result.success) {
        // redirect user to rule list page
        //router.push(`/rule/`)
        router.refresh();
        toast({
          title: "Success",
          description: "Rule deleted successfully.",
        });

      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: result.message,
        });
      }
    } catch (error) {
      console.error("Error deleting rule:", error);
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
            This action cannot be undone. This will permanently delete the rule.
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

export default DeleteRuleModal;