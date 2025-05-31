"use client"

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function MemberTableButton() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <Dialog>
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
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="member-firstname">First Name</Label>
            <Input
              id="member-firstname"
              name="firstname"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="member-lastname">Last Name</Label>
            <Input
              id="member-lastname"
              name="lastname"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="member-email">Email</Label>
            <Input
              id="member-email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
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