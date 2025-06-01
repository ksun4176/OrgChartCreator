"use client"

import { useFetchTeams } from "@/lib/hooks/useFetchTeams";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { teamsColumns } from "./columns";
import { DataTable } from "@/components/data-table";
import { TeamTableButton } from "./team-table-button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TeamTree } from "./team-tree";

export function TeamContent() {
  const [numAdded, setNumAdded] = useState(0);
  const { teams, teamsLoading } = useFetchTeams(numAdded);
  const router = useRouter();

  const table = useReactTable({
    data: teams,
    columns: teamsColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const onRowClicked = (rowId: string) => {
    router.push(`/teams/${table.getRow(rowId).original.id}`);
  }

  if (teamsLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div>
        <TeamTree teams={teams} />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex">
          <div className="flex-1" />
          <TeamTableButton teams={teams} setNumAdded={setNumAdded} />
        </div>
        <DataTable table={table} onRowClicked={onRowClicked} />
      </div>
    </div>
  )
}