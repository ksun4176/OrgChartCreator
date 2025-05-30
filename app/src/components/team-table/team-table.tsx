"use client"

import { useFetchTeams } from "@/lib/hooks/useFetchTeams";
import { teamTableColumns } from "./columns";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useState } from "react";
import { DataTable } from "../data-table";

export function TeamTable() {
  const { teams, teamsLoading } = useFetchTeams();
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data: teams,
    columns: teamTableColumns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  })

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
