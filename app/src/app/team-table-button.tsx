"use client"

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { GetTeamsObj } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TeamTableButtonProps {
  teams: GetTeamsObj[];
}
export function TeamTableButton(props: TeamTableButtonProps) {
  const { teams } = props;

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [parent, setParent] = useState('');

  return (
    <Dialog>
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
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="team-name">Name</Label>
            <Input
              id="team-name"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="team-type">Type</Label>
            <Select
              value={type}
              onValueChange={value => setType(value)}
            >
              <SelectTrigger id="team-type" className="w-full">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Company</SelectItem>
                <SelectItem value="dark">Divisional</SelectItem>
                <SelectItem value="system">Functional</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="team-parent">Belongs To</Label>
            <Select 
              value={parent}
              onValueChange={value => setParent(value)}
            >
              <SelectTrigger id="team-parent" className="w-full">
                <SelectValue placeholder="Team" />
              </SelectTrigger>
              <SelectContent>
                {teams.map(team => <SelectItem
                  key={team.id}
                  value={`${team.id}`}
                >
                  {team.name}
                </SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Create</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}