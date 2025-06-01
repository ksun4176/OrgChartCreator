"use client"

import { Separator } from "@/components/ui/separator";
import { Team } from "@/lib/types";
import { AddMemberButton } from "./add-member-button";
import { RemoveAssignmentButton } from "../../../components/remove-assignment-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface MemberListProps {
  team: Team;
}
export function MemberList(props: MemberListProps) {
  const { team } = props;

  return (
    <div className="flex-1 flex flex-col gap-4">
      <div className="flex items-center h-8 gap-2">
        <h2 className="text-xl">Members</h2>
        <AddMemberButton team={team} />
      </div>
      <div className="flex flex-col gap-2">
        {team.members.map((member, index) => (
          <div key={member.id} className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <Button variant="link" className="text-link font-semibold p-0 h-auto text-base">
                <Link href={`/members/${member.member.id}`}>{member.member.firstName} {member.member.lastName}</Link> 
              </Button>
              <div className="flex-1">{member.role.name}</div>
              <RemoveAssignmentButton assignment={member} />
            </div>
            {index < team.members.length - 1 && <Separator className="pt-1" />}
          </div>
        ))}
      </div>
    </div>
  )
}