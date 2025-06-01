"use client"

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Member, PostMembersObj } from "@/lib/types";
import { updateMember } from "@/lib/apis";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";

const memberSchema = z.object({
  firstName: z.string().min(1, { message: 'Enter first name' }),
  lastName: z.string().min(1, { message: 'Enter last name' }),
  email: z.string().email(),
})

interface EditMemberButtonProps {
  member: Member;
}
export function EditMemberButton(props: EditMemberButtonProps) {
  const { member } = props;
  const [error, setError] = useState('');

  const form = useForm<z.infer<typeof memberSchema>>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      firstName: member.firstName,
      lastName: member.lastName,
      email: member.email,
    }
  })
 
  async function onSubmit(values: z.infer<typeof memberSchema>) {
    const updateProps: Partial<PostMembersObj> = {};
    if (values.firstName !== member.firstName) {
      updateProps.firstName = values.firstName;
    }
    if (values.lastName !== member.lastName) {
      updateProps.lastName = values.lastName
    }
    if (values.email !== member.email) {
      updateProps.email = values.email;
    }
    const response = await updateMember(member.id, updateProps);
    let errorMessage = '';
    if (response.success) {
      window.location.reload();
    }
    else {
      errorMessage = response.message ?? 'Could not edit member. Try again later.';
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
          <DialogTitle>Update Member Info</DialogTitle>
          <DialogDescription>Change information about the member</DialogDescription>
        </DialogHeader>
        {error.length > 0 && <p className="text-destructive text-sm">{error}</p>}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
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