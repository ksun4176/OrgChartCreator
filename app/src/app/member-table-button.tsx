"use client"

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { postMember } from "@/lib/apis";
import { AxiosError } from "axios";

const memberSchema = z.object({
  firstName: z.string().min(1, { message: 'Enter first name' }),
  lastName: z.string().min(1, { message: 'Enter last name' }),
  email: z.string().email(),
})

interface MemberTableButtonProps {
  setNumAdded?: Dispatch<SetStateAction<number>>;
}
export function MemberTableButton(props: MemberTableButtonProps) {
  const { setNumAdded } = props;
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const form = useForm<z.infer<typeof memberSchema>>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    }
  })

  async function onSubmit(values: z.infer<typeof memberSchema>) {
    try {
      await postMember({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email
      });
      setError('');
      setOpen(false);
      if (setNumAdded) setNumAdded(old => old+1);
    }
    catch (error) {
      const axiosError = error as AxiosError<Error>;
      let errorMessage = 'Could not create member. Try again later.'
      console.log(axiosError.status);
      if (axiosError.status === 409 && axiosError.response?.data.message) {
        errorMessage = axiosError.response.data.message;
      }
      setError(errorMessage);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus color="green" /> New Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-m">
        <DialogHeader>
          <DialogTitle>Add a New Member</DialogTitle>
          <DialogDescription>Add the new hire to the system so you can add them into teams.</DialogDescription>
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
              <Button type="submit">Create Member</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}