"use client"

import { useFetchTeams } from "@/lib/hooks/useFetchTeams";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { teamsColumns } from "./columns";
import { DataTable } from "@/components/data-table";
import { TeamTableButton } from "./team-table-button";

export function TeamTable() {
  const { teams, teamsLoading } = useFetchTeams();

  const table = useReactTable({
    data: teams,
    columns: teamsColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (teamsLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex">
        <div className="flex-1" />
        <TeamTableButton teams={teams} />
      </div>
      <DataTable table={table} />
    </div>
  )
}