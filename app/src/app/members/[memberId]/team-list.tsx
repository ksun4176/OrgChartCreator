"use client"

import { RemoveAssignmentButton } from "@/components/remove-assignment-button";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TeamMember } from "@/lib/types";
import Link from "next/link";

interface TeamListProps {
  assignments: TeamMember[]
}
export function TeamList(props: TeamListProps) {
  const { assignments } = props;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center h-8">
        <h2 className="text-xl">Teams</h2>
      </div>
      <div className="flex flex-col gap-2">
        {assignments.map((assignment, index) => (
          <div key={assignment.id} className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <Button variant="link" className="text-link font-semibold p-0 h-auto text-base">
                  <Link href={`/teams/${assignment.team.id}`}>{assignment.team.name}</Link> 
                </Button>
              </div>
              <RemoveAssignmentButton assignment={assignment} />
            </div>
            {index < assignments.length - 1 && <Separator className="pt-1" />}
          </div>
        ))}
      </div>
    </div>
    
  )
}