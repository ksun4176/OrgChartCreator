"use client"

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Team } from "@/lib/types";
import Link from "next/link";
import { RemoveTeamButton } from "./remove-team-button";

interface TeamListProps {
  teams: Team[]
}
export function TeamList(props: TeamListProps) {
  const { teams } = props;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center h-8">
        <h2 className="text-xl">Teams</h2>
      </div>
      <div className="flex flex-col gap-2">
        {teams.map((team, index) => (
          <div key={team.id} className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <div className="flex-1 font-semibold">
                <Button variant="link" className="text-link p-0 h-auto text-base">
                  <Link href={`/teams/${team.id}`}>{team.name}</Link> 
                </Button>
              </div>
              <RemoveTeamButton team={team} />
            </div>
            {index < teams.length - 1 && <Separator className="pt-1" />}
          </div>
        ))}
      </div>
    </div>
    
  )
}