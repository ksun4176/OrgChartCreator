"use client"

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Team } from "@/lib/types";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { updateTeam } from "@/lib/apis";

interface RemoveTeamButtonProps {
  team: Team;
}
export function RemoveTeamButton(props: RemoveTeamButtonProps) {
  const { team } = props;
  const router = useRouter()
  const [open, setOpen] = useState(false);

  async function onConfirm() {
    const response = await updateTeam(team.id, {
      parent: null
    });
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
            {`Are you sure you want to remove ${team.name} from under this team?`}
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