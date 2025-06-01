"use client"

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Team } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFetchTeamTypes } from "@/lib/hooks/useFetchTeamTypes";
import { updateTeam } from "@/lib/apis";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { useFetchTeams } from "@/lib/hooks/useFetchTeams";

const teamSchema = z.object({
  name: z.string().min(1, { message: 'Select a name for your team' }),
  type: z.number({ required_error: 'Select a type for your team' }),
  parent: z.number().optional(),
})

interface EditTeamButtonProps {
  team: Team;
}
export function EditTeamButton(props: EditTeamButtonProps) {
  const { team } = props;
  const { teamTypes } = useFetchTeamTypes();
  const { teams } = useFetchTeams();
  const [error, setError] = useState('');

  const form = useForm<z.infer<typeof teamSchema>>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      name: team.name,
      type: team.type.id,
      parent: team.parent?.id
    }
  })
 
  async function onSubmit(values: z.infer<typeof teamSchema>) {
    let parent = values.parent ?? null;
    if (parent === 0) {
      parent = null;
    }
    const response = await updateTeam(team.id, {
      name: values.name,
      type: values.type,
      parent: parent
    });
    let errorMessage = '';
    if (response.success) {
      window.location.reload();
    }
    else {
      errorMessage = response.message ?? 'Could not edit team. Try again later.';
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
          <DialogTitle>Update Team Info</DialogTitle>
          <DialogDescription>Change information about the team</DialogDescription>
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
                      <SelectItem
                        value={`0`}
                      >
                        None
                      </SelectItem>
                      <SelectSeparator />
                      {teams
                        .filter(t => t.id !== team.id)
                        .map(team => <SelectItem
                          key={team.id}
                          value={`${team.id}`}
                        >
                          {team.name}
                        </SelectItem>)
                      }
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