"use client"

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { GetTeamsObj } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFetchTeamTypes } from "@/lib/hooks/useFetchTeamTypes";
import { postTeam } from "@/lib/apis";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dispatch, SetStateAction, useState } from "react";

const teamSchema = z.object({
  name: z.string().min(1, { message: 'Select a name for your team' }),
  type: z.number({ required_error: 'Select a type for your team' }),
  parent: z.number().optional(),
})

interface TeamTableButtonProps {
  teams: GetTeamsObj[];
  setNumAdded?: Dispatch<SetStateAction<number>>;
}
export function TeamTableButton(props: TeamTableButtonProps) {
  const { teams, setNumAdded } = props;
  const { teamTypes } = useFetchTeamTypes();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const form = useForm<z.infer<typeof teamSchema>>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      name: ''
    }
  })
 
  async function onSubmit(values: z.infer<typeof teamSchema>) {
    const response = await postTeam({
      name: values.name,
      type: values.type,
      parent: values.parent
    });
    let errorMessage = '';
    if (response.success) {
      setOpen(false);
      if (setNumAdded) setNumAdded(old => old+1);
    }
    else {
      errorMessage = response.message ?? 'Could not create team. Try again later.';
    }
    setError(errorMessage);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus color="green" /> New Team
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-m">
        <DialogHeader>
          <DialogTitle>Add a New Team</DialogTitle>
          <DialogDescription>Create a new team.</DialogDescription>
        </DialogHeader>
        {error.length > 0 && <p className="text-destructive text-sm">{error}</p>}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={value => field.onChange(parseInt(value))} value={`${field.value}`}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {teamTypes.map(type => <SelectItem
                        key={type.id}
                        value={`${type.id}`}
                      >
                        {type.name}
                      </SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="parent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Belongs To</FormLabel>
                  <Select onValueChange={value => field.onChange(parseInt(value))} value={`${field.value}`}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Team" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {teams.map(team => <SelectItem
                        key={team.id}
                        value={`${team.id}`}
                      >
                        {team.name}
                      </SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Create Team</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}