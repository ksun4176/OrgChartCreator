"use client"

import { useFetchTeams } from "@/lib/hooks/useFetchTeams";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { teamsColumns } from "./columns";
import { DataTable } from "@/components/data-table";

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
    <div>
      <h2 className="text-xl font-semibold tracking-tight text-balance">
        Teams
      </h2>
      <DataTable table={table} />
    </div>
  )
}
