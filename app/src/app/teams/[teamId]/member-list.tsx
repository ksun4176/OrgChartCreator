"use client"

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TeamMember } from "@/lib/types";
import { Plus, X } from "lucide-react";

interface MemberListProps {
  members: TeamMember[]
}
export function MemberList(props: MemberListProps) {
  const { members } = props;

  return (
    <div className="flex-1 flex flex-col gap-4">
      <div className="flex items-center h-8">
        <h2 className="text-xl">Members</h2>
        <Button variant="ghost" size="icon" className="size-8">
          <Plus color="green" />
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {members.map((member, index) => (
          <div key={member.id} className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <div className="font-semibold">{member.member.firstName} {member.member.lastName}</div>
              <div className="flex-1">{member.role.name}</div>
              <Button variant="ghost" size="icon" className="size-8">
                <X />
              </Button>
            </div>
            {index < members.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </div>
  )
}