"use client"

import { Member } from "@/lib/types";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MemberReportProps {
  member: Member
}
export function MemberReport(props: MemberReportProps) {
  const { member } = props;
  const [selectedAssignment, setSelectedAssignment] = useState('');

  const selectedTeam = member.teams.find(assignment => assignment.id === parseInt(selectedAssignment));
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center">
        <h2 className="flex-1 text-xl">
          {selectedTeam ? 
            `${selectedTeam.team.name} Report` :
            'Report'
          }
        </h2>
        <Select onValueChange={setSelectedAssignment} value={selectedAssignment}>
          <SelectTrigger>
            <SelectValue placeholder="Team" />
          </SelectTrigger>
          <SelectContent>
            {member.teams.map(assignment => <SelectItem
              key={assignment.id}
              value={`${assignment.id}`}
            >
              {assignment.team.name}
            </SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="border-4 border-solid flex items-center justify-center text-lg min-h-160">
        {selectedTeam ? 
          `Report About ${member.firstName} ${member.lastName} for ${selectedTeam?.team.name}` :
          'No Team Selected'
        }
      </div>
    </div>
  )
}