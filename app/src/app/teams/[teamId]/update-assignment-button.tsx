"use client"

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TeamMember } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateAssignment } from "@/lib/apis";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { useFetchMemberRoles } from "@/lib/hooks/useFetchMemberRoles";

const assignmentSchema = z.object({
  role: z.number({ required_error: 'Select a role to assign to member' }),
})

interface UpdateAssignmentButtonProps {
  assignment: TeamMember;
}
export function UpdateAssignmentButton(props: UpdateAssignmentButtonProps) {
  const { assignment } = props;
  const { memberRoles } = useFetchMemberRoles();
  const [error, setError] = useState('');

  const form = useForm<z.infer<typeof assignmentSchema>>({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      role: assignment.role.id
    }
  })
 
  async function onSubmit(values: z.infer<typeof assignmentSchema>) {
    const response = await updateAssignment(assignment.team.id, assignment.member.id, values.role);
    let errorMessage = '';
    if (response.success) {
      window.location.reload();
    }
    else {
      errorMessage = response.message ?? 'Could not change role. Try again later.';
    }
    setError(errorMessage);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-m">
        <DialogHeader>
          <DialogTitle>Update Role</DialogTitle>
          <DialogDescription>{`Update member's role in the team.`}</DialogDescription>
        </DialogHeader>
        {error.length > 0 && <p className="text-destructive text-sm">{error}</p>}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={value => field.onChange(parseInt(value))} value={`${field.value}`}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Role" />
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
              <Button type="submit">Update</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}