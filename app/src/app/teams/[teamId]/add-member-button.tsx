"use client"

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Team } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { assignMember } from "@/lib/apis";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { useFetchMemberRoles } from "@/lib/hooks/useFetchMemberRoles";
import { useFetchMembers } from "@/lib/hooks/useFetchMembers";
import { useRouter } from "next/navigation";

const assignmentSchema = z.object({
  member: z.number({ required_error: 'Select a member to add to your team' }),
  role: z.number({ required_error: 'Select a role to assign to member' }),
})

interface AddMemberButtonProps {
  team: Team;
}
export function AddMemberButton(props: AddMemberButtonProps) {
  const { team } = props;
  const { memberRoles } = useFetchMemberRoles();
  const { members } = useFetchMembers();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const form = useForm<z.infer<typeof assignmentSchema>>({
    resolver: zodResolver(assignmentSchema),
  })
 
  async function onSubmit(values: z.infer<typeof assignmentSchema>) {
    const response = await assignMember(team.id, values);
    let errorMessage = '';
    if (response.success) {
      router.refresh();
      setOpen(false);
    }
    else {
      errorMessage = response.message ?? 'Could not assign member. Try again later.';
    }
    setError(errorMessage);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8">
          <Plus color="green" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-m">
        <DialogHeader>
          <DialogTitle>Assign Member</DialogTitle>
          <DialogDescription>Assign a member to your team.</DialogDescription>
        </DialogHeader>
        {error.length > 0 && <p className="text-destructive text-sm">{error}</p>}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="member"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Member</FormLabel>
                  <Select onValueChange={value => field.onChange(parseInt(value))} value={`${field.value}`}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Member" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {members
                        .filter(member => team.members.findIndex(tm => tm.member.id === member.id) === -1)
                        .map(member => <SelectItem
                          key={member.id}
                          value={`${member.id}`}
                        >
                          {`${member.firstName} ${member.lastName} | ${member.email}`}
                        </SelectItem>)
                      }
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={value => field.onChange(parseInt(value))} value={`${field.value}`}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Team" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {memberRoles.map(role => <SelectItem
                        key={role.id}
                        value={`${role.id}`}
                      >
                        {role.name}
                      </SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Assign</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}