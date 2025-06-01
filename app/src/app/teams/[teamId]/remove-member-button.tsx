"use client"

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { TeamMember } from "@/lib/types";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { removeAssignment } from "@/lib/apis";

interface RemoveMemberButtonProps {
  assignment: TeamMember;
}
export function RemoveMemberButton(props: RemoveMemberButtonProps) {
  const { assignment } = props;
  const router = useRouter()
  const [open, setOpen] = useState(false);

  async function onConfirm() {
    const response = await removeAssignment(assignment);
    if (response.success) {
      router.refresh();
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <Button
        variant="ghost"
        size="icon"
        className="size-8"
        onClick={() => setOpen(true)}
      >
        <X />
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmation</AlertDialogTitle>
          <AlertDialogDescription>
            {`Are you sure you want to remove ${assignment.member.firstName} ${assignment.member.lastName} from the team?`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onConfirm()}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}