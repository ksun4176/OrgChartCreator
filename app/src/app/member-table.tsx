"use client"

import { membersColumns } from "./columns";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useFetchMembers } from "@/lib/hooks/useFetchMembers";
import { DataTable } from "@/components/data-table";

export function MemberTable() {
  const { members, membersLoading } = useFetchMembers();

  const table = useReactTable({
    data: members,
    columns: membersColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (membersLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2 className="text-xl font-semibold tracking-tight text-balance">
        Members
      </h2>
      <DataTable table={table} />
    </div>
  )
}