"use client"

import { useFetchTeams } from "@/lib/hooks/useFetchTeams";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { teamsColumns } from "./columns";
import { DataTable } from "@/components/data-table";
import { TeamTableButton } from "./team-table-button";
import { useState } from "react";

export function TeamTable() {
  const [numAdded, setNumAdded] = useState(0);
  const { teams, teamsLoading } = useFetchTeams(numAdded);

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
        <TeamTableButton teams={teams} setNumAdded={setNumAdded} />
      </div>
      <DataTable table={table} />
    </div>
  )
}